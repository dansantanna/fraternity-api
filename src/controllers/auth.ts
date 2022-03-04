import { Request, Response } from 'express';

import { generateJwtToken } from 'config/jwt';
import User from 'models/user';
import sendMail, { applyDataToTemplate } from 'config/sendMail';

// eslint-disable-next-line import/prefer-default-export
export const authentication = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!(await user.comparePassword(password))) throw Error();

    const token = generateJwtToken(user._id);
    res.status(200).json({ token, _id: user._id });
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
    const link = `${req.protocol}://${req.get(
      'host',
    )}/change-password/${token}`;
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
