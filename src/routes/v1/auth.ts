import { Router, Response } from 'express';
import * as auth from 'controllers/auth';
import authMiddleware from 'middlewares/auth';

const router = Router();

router.post('/token', auth.authentication);
router.post('/recovery-password', auth.recoveryPassword);
router.post('/new-password', authMiddleware(), auth.newPassword);
router.all('/validate-token', authMiddleware(), (_, res: Response) => {
  res.send({ status: 'succes', message: 'Token valid' });
});

export default router;
