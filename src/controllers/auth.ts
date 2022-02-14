import { Request, Response } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const authentication = (req: Request, res: Response) => {
  res.json({ message: 'Hello Fraternity', body: req.body });
};
