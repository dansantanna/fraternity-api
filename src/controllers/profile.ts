import { Request, Response } from 'express';
import { IUser } from 'models/user';

const getProfile = async (id: string) => {
  return { id };
};

export const currentProfile = async (req: Request, res: Response) => {
  const user = req.user as IUser;
  const profile = await getProfile(user?._id);
  res.status(200).json({ ...profile });
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const profile = await getProfile(id);
  res.status(200).json({ ...profile });
};
