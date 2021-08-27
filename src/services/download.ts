import request from 'request';
import { getImageInfo } from './scrapping';

interface DownloadedImage {
  image: any;
  contentType: string;
  type: string;
  name: string;
  fileName: string;
}

export const downloadImage = (url: string): Promise<DownloadedImage> => {
  return new Promise((resolve, reject) => {
    request({ url: url, encoding: null }, (error, res, body) => {
      const imageInfo = getImageInfo(url);
      if (!error && res.statusCode == 200) {
        resolve({
          image: body,
          contentType: res.headers['content-type'],
          type: imageInfo.type,
          name: imageInfo.name,
          fileName: imageInfo.fileName,
        });
      } else {
        reject(error);
      }
    });
  });
};
