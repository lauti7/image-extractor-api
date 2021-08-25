import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import scrappingAPI from './routes/scrapping';
import downloadAPI from './routes/download';
dotenv.config();

const app = express();

app.use(express.json());

app.get('/api/status', (req: Request, res: Response) => {
  res.send('Ok');
});

scrappingAPI(app);
downloadAPI(app);

app.listen(process.env.PORT, () => {
  console.log('Running');
});
