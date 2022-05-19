import { Request, Response } from 'express';
import UserModel, { IUser } from 'models/user';

const getProfile = async (id: string) => {
  const profile = await UserModel.findById(id)
    .select('-password')
    .populate('experiences')
    .populate('academics');
  return profile;
};

export const currentProfile = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const profile = await getProfile(user?._id);
  res.send(profile);
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await getProfile(id);
    res.status(200).send(profile);
  } catch (error) {
    res.status(404).json({ status: 'error', message: 'user not exist' });
  }
};
