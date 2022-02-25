import { SchemaComposer } from 'graphql-compose';

import { postMutation, postQuery } from './post';
import { userMutation, userQuery } from './user';

const schema = new SchemaComposer();

schema.Query.addFields({ ...postQuery, ...userQuery });

schema.Mutation.addFields({ ...postMutation, ...userMutation });

export default schema.buildSchema();
