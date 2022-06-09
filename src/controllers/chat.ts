/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import UserModel, { IUser } from 'models/user';

export const listChats = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const data = await UserModel.find({ _id: { $ne: user._id } });
  res.send(data);
};

export const getActiveChat = async (req: Request, res: Response) => {
  const data = await UserModel.findOne({ email: 'gabriel@admin.com' });
  res.send(data);
};
