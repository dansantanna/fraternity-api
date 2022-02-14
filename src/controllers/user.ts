import { Request, Response } from 'express';
import UserModel from 'models/user';

// eslint-disable-next-line import/prefer-default-export
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
