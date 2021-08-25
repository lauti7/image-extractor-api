import express, { Application, Request, Response } from 'express';
import { PassThrough } from 'stream';
import { downloadImage } from '../services/download';

const downloadAPI = (app: Application): void => {
  const router = express.Router();
  app.use('/api/download', router);

  router.get('/single', (req: Request, res: Response) => {
    const weburl = req.query.weburl as string;
    downloadImage(weburl)
      .then((downloadedImage) => {
        console.log('Downloaded Image: ', downloadedImage);
        res.set({ 'Content-Type': downloadedImage.contentType });
        res.set({ 'Content-Length': downloadedImage.image.length });
        return res.send(downloadedImage.image);
      })
      .catch((error) => {
        return res.status(500);
      });
  });
};

export default downloadAPI;
