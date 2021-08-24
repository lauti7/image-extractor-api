import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import getAllImages from './services/scrapping';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/api/status', (req: Request, res: Response) => {
  res.send('Ok');
});

app.post('/api/scrape', (req: Request, res: Response) => {
  const weburl = req.body.weburl;
  getAllImages(weburl)
    .then((imgs) => {
      res.status(200).json({ images: imgs });
    })
    .catch((error) => {
      console.log(error);
      res.json({ images: [], error: true });
    });
});

app.listen(process.env.PORT, () => {
  console.log('Running');
});
