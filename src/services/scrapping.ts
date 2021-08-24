import request from 'request';
import cheerio from 'cheerio';

type HrefType = 'url' | 'server-folder' | 'without-protocol';

const checkIsTrkPixel = (imgNodeAttrs: {
  src: string;
  width: string;
  height: string;
}): boolean => {
  const gifExtension = new RegExp(/\.(gif)$/);
  if (gifExtension.test(imgNodeAttrs.src)) {
    if (imgNodeAttrs.width != '' || imgNodeAttrs.height != '') {
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
  return str.replace(/\..\//g, '/');
};

const checkHref = (str: string): HrefType => {
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

const prepareImageURL = () => {};

const checkImageNode = (
  requestedURL: string,
  imgNode: cheerio.Cheerio
): string | null => {
  const { protocol, host } = new URL(requestedURL);
  const imageLink = imgNode.attr('src');
  const imageWidth = imgNode.attr('width');
  const imageHeight = imgNode.attr('height');
  let finalImageURL = '';

  if (checkExtension(imageLink)) {
    const imgInfo: { src: string; width: string; height: string } = {
      src: imageLink,
      width: imageWidth,
      height: imageHeight,
    };
    if (!checkIsTrkPixel(imgInfo)) {
      const hrefType = checkHref(imageLink);
      console.log('imageLink', imageLink, hrefType);
      if (hrefType == 'without-protocol') {
        finalImageURL = `http:${imageLink}`;
      } else if (hrefType == 'server-folder') {
        const cleanLink = cleanServerFolder(imageLink);
        finalImageURL = `${protocol}//${host}${cleanLink}`;
      } else {
        finalImageURL = imageLink;
      }
    }

    return finalImageURL;
  }

  return null;
};

const getAllImages = (url: string): Promise<Array<string>> => {
  return new Promise((resolve, reject) => {
    request(url, (error, res, body) => {
      if (!error) {
        const $ = cheerio.load(body);
        const imgs: Array<string> = [];

        const webImgs = $('img');
        webImgs.each((i, img) => {
          const $node = $(img);
          const checkedImage = checkImageNode(url, $node);
          if (checkedImage != null) {
            imgs.push(checkedImage);
          }
        });
        resolve(imgs);
      } else {
        reject(error);
      }
    });
  });
};

export default getAllImages;
