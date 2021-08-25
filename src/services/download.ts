import request from 'request';
import fs from 'fs';

interface DownloadedImage {
  image: any;
  contentType: string;
}

export const downloadImage = (url: string): Promise<DownloadedImage> => {
  return new Promise((resolve, reject) => {
    request({ url: url, encoding: null }, (error, res, body) => {
      if (!error && res.statusCode == 200) {
        resolve({ image: body, contentType: res.headers['content-type'] });
      } else {
        reject(error);
      }
    });
  });
};

export const test = (url: string) => {
  request(url).pipe(fs.createWriteStream('test1.png'));
};
