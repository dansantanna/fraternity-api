import { Request, Response } from 'express';
import UserModel, { IUser } from 'models/user';
import AcademyModel from 'models/academy';

export const addAcademy = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const academy = await AcademyModel.create(req.body);
  await UserModel.findByIdAndUpdate(user._id, {
    $push: { academics: academy._id },
  });
  res.send(academy);
};

export const removeAcademy = async () => {};

export const updateAcademy = async () => {};
