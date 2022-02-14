import { Router, Request, Response } from 'express';

const router = Router();

router.post('/token', (req: Request, res: Response) => {
  res.json({ message: 'Hello Fraternity' });
});

export default router;
