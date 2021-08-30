import express, { Application, Request, Response } from 'express';
import { getAllImages } from '../services/scrapping';

const extractAPI = (app: Application): void => {
  const router = express.Router();
  app.use('/api/extract', router);

  router.post('/', (req: Request, res: Response) => {
    const weburl = req.body.weburl;
    if (weburl) {
      getAllImages(weburl)
        .then((images) => {
          if (images.length > 0) {
            return res.status(200).json({ images, message: '' });
          } else {
            return res
              .status(200)
              .json({ images: [], message: 'no image on your entered URL' });
          }
        })
        .catch((error: Error) => {
          return res
            .status(500)
            .json({ images: [], error: true, message: error.message });
        });
    } else {
      return res
        .status(400)
        .json({ images: [], error: true, message: 'weburl is missing' });
    }
  });
};

export default extractAPI;
