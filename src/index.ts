import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import scrappingAPI from './routes/scrapping';
import downloadAPI from './routes/download';
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/api/status', (req: Request, res: Response) => {
  res.send('Ok');
});

scrappingAPI(app);
downloadAPI(app);

app.listen(process.env.PORT || 3000, () => {
  console.log('Running');
});
