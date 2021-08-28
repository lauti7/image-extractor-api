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
          return res.status(200).json({ images });
        })
        .catch((error) => {
          console.log(error);
          return res.json({ images: [], error: true });
        });
    } else {
      return res.status(400).json({ images: [], error: true });
    }
  });
};

export default extractAPI;
