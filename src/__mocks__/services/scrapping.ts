import { Browser, Page, HTTPResponse } from 'puppeteer';
import { ImageResponse } from '../../utils/interfaces';

export const URLProblemResponseMock = {
  response: {
    data: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Problem</title>
    </head>
    <body>
      <h1>Internal server errror</h1>
    </body>
    </html>`,
    status: 404,
  },
};

export const imagesMock: ImageResponse[] = [
  {
    type: '.png',
    url: 'https://google.com/images/image_1.png',
    name: 'image_1',
    fileName: 'image_1.png',
  },
  {
    type: '.jpg',
    url: 'https://google.com/images/image_2.jpg',
    name: 'image_2',
    fileName: 'image_2.jpg',
  },
  {
    type: '.svg',
    url: 'https://google.com/images/image_3.svg',
    name: 'image_3',
    fileName: 'image_3.svg',
  },
  {
    type: '.gif',
    url: 'https://google.com/static/images/thegif.gif',
    name: 'thegif',
    fileName: 'thegif.gif',
  },
  {
    type: '.webp',
    url: 'https://google.com/images/image_4.webp',
    name: 'image_4',
    fileName: 'image_4.webp',
  },
];

export const puppetteerSuccessResponse = {
  status: () => 200,
} as HTTPResponse;

export const puppetteerErrorResponse = {
  status: () => 500,
} as HTTPResponse;

export const mockedPuppeteerBrowser = {
  newPage() {
    return Promise.resolve(mockedPuppeteerPage);
  },
  close() {
    return Promise.resolve();
  },
} as unknown as Browser;

export const mockedPuppeteerPage = {
  goto(url: string) {
    return Promise.resolve();
  },
  $$eval(selector: string, pageFunction: any) {
    return Promise.resolve([]);
  },
} as unknown as Page;

export const mockedImagesPuppeteer = [
  {
    src: 'https://google.com/images/image_1.png',
    width: '550',
    height: '150',
    getAttribute(prop) {
      return this[prop];
    },
  },
  {
    src: 'https://google.com/images/image_2.jpg',
    width: '350',
    height: '50',
    getAttribute(prop) {
      return this[prop];
    },
  },
  {
    src: '//google.com/images/image_3.svg',
    width: '150',
    height: '250',
    getAttribute(prop) {
      return this[prop];
    },
  },
  {
    src: '../../static/images/thegif.gif',
    width: '530',
    height: '153',
    getAttribute(prop) {
      return this[prop];
    },
  },
  {
    src: '../images/image_4.webp',
    width: '530',
    height: '153',
    getAttribute(prop) {
      return this[prop];
    },
  },
  {
    src: 'https://google.com/images/trkpixel.png',
    width: '1',
    height: '1',
    getAttribute(prop) {
      return this[prop];
    },
  },
  {
    src: 'https://google.com/images/trkpixel2.gif',
    width: '1',
    height: '',
    getAttribute(prop) {
      return this[prop];
    },
  },
  {
    src: 'https://google.com/images/trkpixel3.gif',
    width: '',
    height: '1',
    getAttribute(prop) {
      return this[prop];
    },
  },
  {
    src: 'https://google.com/images/noimage.noimage',
    width: '',
    height: '',
    getAttribute(prop) {
      return this[prop];
    },
  },
];
