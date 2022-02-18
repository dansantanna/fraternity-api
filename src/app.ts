import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import swagger from 'swagger-ui-express';
import { ApolloServer, gql } from 'apollo-server-express';

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

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
const graphqlPath = '/graphql';
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app, path: graphqlPath });
});

// Swagger
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDoc));

app.use((req: Request, res: Response, next) => {
  if (req.originalUrl !== graphqlPath) {
    if (req.headers.accept?.includes('text/html'))
      res.status(404).sendFile(path.join(`${__dirname}/public/404.html`));
    else res.status(404).send({ status: 'error', message: 'Page not found' });
  } else {
    next();
  }
});

const { PORT } = process.env;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on port ${PORT}`);
});
