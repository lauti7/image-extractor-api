import { DownloadedImage } from '../../utils/interfaces';
import { imageBuffer } from '../imagesMock';

export const ImageDownloadResponseMock = {
  data: imageBuffer,
  headers: {
    'content-type': 'image/jpeg',
  },
};

export const NotImageresponseMock = {
  data: null,
  headers: {
    'content-type': 'application/json',
  },
};

export const downloadImageMock: DownloadedImage = {
  image: imageBuffer,
  name: 'image_mock_1',
  fileName: 'image_mock_1.jpg',
  contentType: 'image/jpeg',
  type: '.jpg',
};

export const downloadedImageURL: string =
  'https://google.com/images/image_mock_1.jpg';
