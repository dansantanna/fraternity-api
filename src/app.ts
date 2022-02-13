import express, { Router, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import connectDB from './config/database';

// Load envs
dotenv.config();

// Connect MongoDB
connectDB();

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

const { PORT } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});
