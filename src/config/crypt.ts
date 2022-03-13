import bcrypt from 'bcrypt';

export const encrypt = (value: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
};

export const compare = (value: string, encrypted: string): Promise<boolean> => {
  return bcrypt.compare(value, encrypted);
};
