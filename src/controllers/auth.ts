import { Request, Response } from 'express';

import { generateJwtToken } from 'config/jwt';
import User, { IUser } from 'models/user';
import sendMail, { applyDataToTemplate } from 'config/sendMail';

export const authentication = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!(await user.comparePassword(password))) throw Error();

    const token = generateJwtToken(user._id);
    res.status(200).json({
      token,
      _id: user._id,
      name: `${user?.firstName} ${user.lastName}`,
      photo: user.photo,
      role: user.role,
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'invalid credentials',
    });
  }
};

export const recoveryPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    const token = generateJwtToken(user._id);
    const link = `${process.env.CLIENT_URL}/change-password/${token}`;
    const content = await applyDataToTemplate('recovery-password', {
      ...user.toObject(),
      link,
    });
    sendMail(email, 'Recovery Password', content);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error to recovery password', error);
  }
  res.json({
    status: 'succes',
    message: 'request processed',
  });
};

export const newPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const user = req.user as IUser;
    if (!password) throw new Error('Password is required');
    if (!user?._id) throw new Error('User is required');
    await User.findByIdAndUpdate(user?._id, { password });
    res.send({ status: 'success', message: 'Password changed' });
  } catch (error) {
    res.status(400).send({ status: 'error', error });
  }
};
