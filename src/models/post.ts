import { Schema, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { UserTC } from './user';

const modelName = 'Post';

const PostSchema = new Schema(
  {
    text: { type: String, trim: true },
    media: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { collection: 'posts', timestamps: true },
);

const Post = model(modelName, PostSchema);

export const PostTC = composeMongoose(Post);

PostTC.addRelation('author', {
  resolver: () => UserTC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source.author || null,
  },
  projection: { author: true },
});

PostTC.addRelation('likes', {
  resolver: () => UserTC.mongooseResolvers.dataLoaderMany(),
  prepareArgs: {
    _ids: (source) => source.likes,
  },
  projection: { likes: 1 },
});

export default Post;
