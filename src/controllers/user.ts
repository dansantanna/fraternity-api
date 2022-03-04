import { Request, Response } from 'express';
import UserModel, { IUser } from 'models/user';

export const register = async (req: Request, res: Response) => {
  try {
    await new UserModel(req.body).save();
    res
      .status(201)
      .json({ status: 'success', message: 'Successfully registered' });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const user = req.user as IUser;
    if (!password) throw new Error('Password is required');
    if (!user?._id) throw new Error('User is required');
    await UserModel.findByIdAndUpdate(user?._id, { password });
    res.send({ status: 'success', message: 'Password changed' });
  } catch (error) {
    res.status(400).send({ status: 'error', error });
  }
};
