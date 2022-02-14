import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'users',
  },
);

UserSchema.index({ createdAt: 1, updatedAt: 1 });

const User = mongoose.model('User', UserSchema);

export default User;
