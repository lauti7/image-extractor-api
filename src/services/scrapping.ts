import puppeteer from 'puppeteer';
import { ImageResponse, ImageNodeInfo } from '../utils/interfaces';

type srcType = 'url' | 'server-folder' | 'without-protocol';

const checkIsTrkPixel = (imgNodeAttrs: ImageNodeInfo): boolean => {
  const pixelExtension = new RegExp(/\.(gif|png)$/);
  if (pixelExtension.test(imgNodeAttrs.src)) {
    if (imgNodeAttrs.width || imgNodeAttrs.height) {
      const widthInt =
        imgNodeAttrs.width != '' ? parseInt(imgNodeAttrs.width) : null;
      const heightInt =
        imgNodeAttrs.height != '' ? parseInt(imgNodeAttrs.height) : null;
      if (widthInt || heightInt) {
        if (widthInt <= 2 && heightInt <= 2) {
          return true;
        } else if (widthInt <= 2) {
          return true;
        } else if (heightInt <= 2) {
          return true;
        }
      }
    }
  }

  return false;
};

const cleanServerFolder = (str: string): string => {
  return str.replace(/\..\//g, '');
};

const checkSource = (str: string): srcType => {
  const regularURLRegex = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  );

  if (regularURLRegex.test(str)) {
    return 'url';
  }

  const outOfProtocol = new RegExp(/^\/\//);

  if (outOfProtocol.test(str)) {
    return 'without-protocol';
  }

  return 'server-folder';
};

const checkExtension = (str: string): boolean => {
  const extensionRegex = new RegExp(/\.(jpg|jpeg|png|gif|svg|webp)$/);
  if (extensionRegex.test(str)) {
    return true;
  }
  return false;
};

const prepareImageLink = (
  websiteURL: string,
  imageSource: srcType,
  imageLink: string
): string => {
  const { protocol, host } = new URL(websiteURL);
  let finalImageURL = '';

  switch (imageSource) {
    case 'without-protocol':
      finalImageURL = `${protocol}${imageLink}`;
      break;
    case 'server-folder':
      const cleanLink = cleanServerFolder(imageLink);
      finalImageURL = `${protocol}//${host}/${cleanLink}`;
      break;
    default:
      finalImageURL = imageLink;
      break;
  }

  return finalImageURL;
};

const getImageType = (imageLink: string): string => {
  const extensionRegex = new RegExp(/\.(jpg|jpeg|png|gif|svg|webp)$/);

  const matches = imageLink.match(extensionRegex);

  if (matches.length > 0) {
    return matches[0];
  }
};

export const getImageInfo = (
  imageLink: string
): { name: string; fileName: string; type: string } => {
  const type = getImageType(imageLink);
  const splittedLink = imageLink.split('/');
  const fileName = splittedLink[splittedLink.length - 1];

  const imageName = fileName.split(type)[0];

  return {
    name: imageName,
    fileName: fileName,
    type: type,
  };
};

const getImage = (imageLink: string): ImageResponse => {
  const { type, name, fileName } = getImageInfo(imageLink);

  const image: ImageResponse = {
    type: type,
    url: imageLink,
    name: name,
    fileName: fileName,
  };

  return image;
};

const checkImageNode = (
  requestedURL: string,
  imgNode: ImageNodeInfo
): ImageResponse | null => {
  const imageLink = imgNode.src;

  if (checkExtension(imageLink)) {
    if (!checkIsTrkPixel(imgNode)) {
      const imageSource = checkSource(imageLink);

      const imagePreparedLink = prepareImageLink(
        requestedURL,
        imageSource,
        imageLink
      );

      const image = getImage(imagePreparedLink);

      return image;
    }
  }

  return null;
};

export const getAllImages = async (url: string): Promise<ImageResponse[]> => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();

    const response = await page.goto(url);

    if (response.status() >= 400) {
      throw new Error('there was an error while requesting your entered URL');
    }

    const websiteImages: Element[] = await page.$$eval(
      'img[src]',
      (imgs) => imgs
    );

    const websiteImagesNodes: ImageNodeInfo[] = websiteImages.map((img) => ({
      src: img.getAttribute('src'),
      width: img.getAttribute('width'),
      height: img.getAttribute('height'),
    }));

    await browser.close();

    const images: Array<ImageResponse> = [];
    const checkedLinks: string[] = [];
    websiteImagesNodes.forEach((imgNode) => {
      if (checkedLinks.indexOf(imgNode.src) === -1) {
        const checkedImage = checkImageNode(url, imgNode);
        if (checkedImage != null) {
          images.push(checkedImage);
        }
        checkedLinks.push(imgNode.src);
      }
    });

    return images;
  } catch (error) {
    throw new Error(error.message);
  }
};
