import * as dotenv from 'dotenv';
import jwt from 'jwt-simple';

dotenv.config();

const config = {
  secret: process.env.JWT_SECRET ?? '',
  session: false,
};

export const generateJwtToken = (_id: string): string => {
  const exp = new Date().setDate(new Date().getDate() + 1);
  const token = jwt.encode({ _id, exp }, config.secret);
  return token;
};

export default config;
