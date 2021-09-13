import axios from 'axios';
import cheerio from 'cheerio';
import { ImageResponse } from '../utils/interfaces';

type srcType = 'url' | 'server-folder' | 'without-protocol';

interface ImageInfo {
  src: string;
  width: string;
  height: string;
}

const checkIsTrkPixel = (imgNodeAttrs: ImageInfo): boolean => {
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
  imgNode: cheerio.Cheerio
): ImageResponse | null => {
  const imageLink = imgNode.attr('src');
  const imageWidth = imgNode.attr('width');
  const imageHeight = imgNode.attr('height');

  if (checkExtension(imageLink)) {
    const imgInfo: ImageInfo = {
      src: imageLink,
      width: imageWidth,
      height: imageHeight,
    };
    if (!checkIsTrkPixel(imgInfo)) {
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

export const getAllImages = (url: string): Promise<Array<ImageResponse>> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        const body = response.data;
        const $ = cheerio.load(body);
        const images: Array<ImageResponse> = [];
        const checkedLinks: string[] = [];

        const webImgs = $('img');
        webImgs.each((i, img) => {
          const $node = $(img);
          const $nodeSource = $node.attr('src');
          if (checkedLinks.indexOf($nodeSource) === -1) {
            const checkedImage = checkImageNode(url, $node);
            if (checkedImage != null) {
              images.push(checkedImage);
            }
            checkedLinks.push($nodeSource);
          }
        });
        resolve(images);
      })
      .catch((responseError) => {
        if (responseError.response.status >= 400) {
          reject(new Error('there was an error with your entered URL'));
        } else {
          reject(responseError);
        }
      });
  });
};
