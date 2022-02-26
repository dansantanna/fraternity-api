import { Request, Response } from 'express';
import jwt from 'jwt-simple';

import jwtConfig from 'config/jwt';
import User from 'models/user';

// eslint-disable-next-line import/prefer-default-export
export const authentication = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!(await user.comparePassword(password))) throw Error();

    const exp = new Date().setDate(new Date().getDate() + 1);
    const token = jwt.encode({ _id: user._id, exp }, jwtConfig.secret);
    res.status(200).json({ exp, token, _id: user._id });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'invalid credentials',
    });
  }
};
