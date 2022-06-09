import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import swagger from 'swagger-ui-express';
import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import * as socketio from 'socket.io';

import routes from 'routes';
import connectDB from 'config/database';
import swaggerDoc from 'config/swagger.json';
import auth from 'middlewares/auth';
import schema from './schemas';

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

const graphqlPath = '/graphql';
const server = new ApolloServer({ schema });

server.start().then(() => {
  server.applyMiddleware({ app, path: graphqlPath });
});

// Swagger
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));

if (process.env.NODE_ENV !== 'development') app.use(graphqlPath, auth());

app.use((req: Request, res: Response, next) => {
  if (req.originalUrl !== graphqlPath) {
    if (req.headers.accept?.includes('text/html'))
      res.status(404).sendFile(path.join(`${__dirname}/templates/404.html`));
    else res.status(404).send({ status: 'error', message: 'Page not found' });
  } else {
    next();
  }
});

const { PORT } = process.env;
const serverApi = http.createServer(app);
const io = new socketio.Server(serverApi, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
io.on('connection', (socket) => {
  socket.on('send-message', ({ to, content }) => {
    // eslint-disable-next-line no-console
    console.log('emmit', { to, content });

    if (content.trim()) {
      io.emit(to, content?.trim());
    }
  });
  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log('User disconnected');
  });
});

serverApi.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on port ${PORT}`);
});
