import { Schema, model } from 'mongoose';

const modelName = 'Comment';

export const CommentSchema = new Schema({
  text: { type: String, trim: true },
  media: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
});

const Comment = model(modelName, CommentSchema);
export default Comment;
