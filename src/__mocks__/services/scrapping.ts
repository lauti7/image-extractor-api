import { ImageResponse } from '../../utils/interfaces';

export const HTMLresponseMock = {
  data: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Mocking html response</h1>
  <img src="https://google.com/images/image_1.png" alt="">
  <img src="https://google.com/images/image_2.jpg" alt="">

  <div>
    <img src="//google.com/images/image_3.svg" alt="">
  </div>

  <a href="">
    <img src="../../static/images/thegif.gif"  alt="">
  </a>

  <img src="https://google.com/images/image_4.webp" alt="">

  <img src="https://google.com/noimage.noimage" >


  <img src="https://trackingpixel.com/pixel.gif" width="1" height="1" alt="">
  <img src="https://trackingpixel.com/pixel2.gif" width="1" alt="">
  <img src="https://trackingpixel.com/pixel3.gif" height="1" alt="">

</body>
</html>
`,
};

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
