import { Request, Response } from 'express';
import UserModel, { IUser } from 'models/user';
import ExperienceModel from 'models/experience';

export const addExperience = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const experience = await ExperienceModel.create(req.body);
  await UserModel.findByIdAndUpdate(user._id, {
    $push: { experiences: experience._id },
  });
  res.send(experience);
};

export const removeExperience = async () => {};
export const updateExperience = async () => {};
