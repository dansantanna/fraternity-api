import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import swagger from 'swagger-ui-express';

import routes from 'routes';
import connectDB from 'config/database';
import swaggerDoc from 'config/swagger.json';

// Load envs
dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

app.use(express.json());

// logger
app.use(morgan('dev'));

// cors
app.use(cors());

// Routes
app.use(routes);

// Swagger
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));

const { PORT } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server running on port ${PORT}`);
});

app.use((req: Request, res: Response) => {
  if (req.headers.accept?.includes('text/html'))
    res.status(404).sendFile(path.join(`${__dirname}/public/404.html`));
  else res.status(404).send({ status: 'error', message: 'Page not found' });
});
