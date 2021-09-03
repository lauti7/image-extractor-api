import axios from 'axios';
import { getImageInfo } from './scrapping';
import { DownloadedImage } from '../utils/interfaces';

const contentRegex = /image\//;

export const downloadImage = (url: string): Promise<DownloadedImage> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        responseType: 'arraybuffer',
      })
      .then((response) => {
        if (contentRegex.test(response.headers['content-type'])) {
          const body = response.data;
          const imageInfo = getImageInfo(url);
          resolve({
            image: body,
            contentType: response.headers['content-type'],
            type: imageInfo.type,
            name: imageInfo.name,
            fileName: imageInfo.fileName,
          });
        } else {
          reject(new Error('No image in given url'));
        }
      })
      .catch((responseError) => {
        if (responseError.response && responseError.response.status >= 400) {
          reject(new Error('there was an error with your entered URL'));
        } else {
          reject(new Error('unexpected server error'));
        }
      });
  });
};
