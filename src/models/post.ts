import { Schema, model, SchemaTypes } from 'mongoose';

const modelName = 'Post';

const PostSchema = new Schema(
  {
    text: { type: String, trim: true },
    media: { type: String },
    author: { type: SchemaTypes.ObjectId, ref: 'User' },
    likes: [{ type: SchemaTypes.ObjectId, ref: 'User' }],
  },
  { collection: 'posts', timestamps: true },
);

const Post = model(modelName, PostSchema);

export default Post;
