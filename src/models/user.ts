import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { composeMongoose } from 'graphql-compose-mongoose';

const modelName = 'User';

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      validate: {
        validator: async (value: string) =>
          !(await model(modelName).countDocuments({
            email: value,
          })),
        message: 'Email already exists',
      },
      required: [true, 'Email address is required'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      set: (password: string) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
      },
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model(modelName, UserSchema);
export const UserTC = composeMongoose(User, { removeFields: ['password'] });

export default User;
