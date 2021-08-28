import request from 'request';
import { getImageInfo } from './scrapping';
import { DownloadedImage } from '../utils/interfaces';

const contentRegex = /image\//;

export const downloadImage = (url: string): Promise<DownloadedImage> => {
  return new Promise((resolve, reject) => {
    request({ url: url, encoding: null }, (error, res, body) => {
      if (!error && res.statusCode == 200) {
        if (contentRegex.test(res.headers['content-type'])) {
          const imageInfo = getImageInfo(url);
          resolve({
            image: body,
            contentType: res.headers['content-type'],
            type: imageInfo.type,
            name: imageInfo.name,
            fileName: imageInfo.fileName,
          });
        } else {
          reject(new Error('No image in given url'));
        }
      } else {
        reject(error);
      }
    });
  });
};
