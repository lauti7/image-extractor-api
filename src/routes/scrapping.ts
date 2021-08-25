import express, { Application, Request, Response } from 'express';
import getAllImages from '../services/scrapping';

const scrappingAPI = (app: Application): void => {
  const router = express.Router();
  app.use('/api/extract', router);

  app.post('/', (req: Request, res: Response) => {
    const weburl = req.body.weburl;
    getAllImages(weburl)
      .then((imgs) => {
        return res.status(200).json({ images: imgs });
      })
      .catch((error) => {
        console.log(error);
        return res.json({ images: [], error: true });
      });
  });
};

export default scrappingAPI;
