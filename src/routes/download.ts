import express, { Application, Request, Response } from 'express';
import { PassThrough } from 'stream';
import { downloadImage } from '../services/download';

const downloadAPI = (app: Application): void => {
  const router = express.Router();
  app.use('/api/download', router);

  router.get('/single', (req: Request, res: Response) => {
    const weburl = req.query.weburl as string;

    if (!weburl) {
      return res
        .status(400)
        .json({ error: true, message: 'weburl parameter is missing' });
    }

    downloadImage(weburl)
      .then((downloadedImage) => {
        if (!req.query.forceDownload) {
          res.set({ 'Content-Type': downloadedImage.contentType });
          res.set({ 'Content-Length': downloadedImage.image.length });
          return res.send(downloadedImage.image);
        } else {
          const { type, fileName, name, image } = downloadedImage;

          const readStream = new PassThrough();
          readStream.end(image);

          res.set(
            'Content-disposition',
            'attachment; filename=' + `${name}.${type}`
          );
          res.set('Content-Type', 'text/plain');

          readStream.pipe(res);
        }
      })
      .catch((error) => {
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({
          error: true,
          message:
            'something went wrong while getting your image. Is it the correct url?',
        });
      });
  });
};

export default downloadAPI;
