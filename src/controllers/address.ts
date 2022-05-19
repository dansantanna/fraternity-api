import { Request, Response } from 'express';
import UserModel, { IUser } from 'models/user';

// eslint-disable-next-line import/prefer-default-export
export const saveAddress = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  await UserModel.findByIdAndUpdate(user._id, { address: req.body });
  res.send({ status: 'success', message: 'address updated' });
};
