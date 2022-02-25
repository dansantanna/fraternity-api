import { schemaComposer } from 'graphql-compose';
import { PostTC } from 'models/post';

export const postQuery = {
  postById: PostTC.mongooseResolvers.findById(),
  postByIds: PostTC.mongooseResolvers.findByIds(),
  postOne: PostTC.mongooseResolvers.findOne(),
  postMany: PostTC.mongooseResolvers.findMany(),
  postDataLoader: PostTC.mongooseResolvers.dataLoader(),
  postDataLoaderMany: PostTC.mongooseResolvers.dataLoaderMany(),
  postConnection: PostTC.mongooseResolvers.connection(),
  postPagination: PostTC.mongooseResolvers.pagination(),
};

export const postMutation = {
  postCreateOne: PostTC.mongooseResolvers.createOne(),
  postCreateMany: PostTC.mongooseResolvers.createMany(),
  postUpdateById: PostTC.mongooseResolvers.updateById(),
  postUpdateOne: PostTC.mongooseResolvers.updateOne(),
  postRemoveById: PostTC.mongooseResolvers.removeById(),
};

export default schemaComposer;
