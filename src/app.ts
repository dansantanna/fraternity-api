import express, { Router, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

const route = Router();

app.use(express.json());

// logger
app.use(morgan('dev'));

// cors
app.use(cors());

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello Fraternity' });
});

app.use(route);

const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});
