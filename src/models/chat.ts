import { Schema, model } from 'mongoose';

const modelName = 'Chat';

export const ChatSchema = new Schema({
  text: { type: String, trim: true },
  media: { type: String },
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Chat = model(modelName, ChatSchema);
export default Chat;
