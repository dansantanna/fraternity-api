import { Router, Request, Response } from 'express';
import { authentication, recoveryPassword } from 'controllers/auth';
import auth from 'middlewares/auth';

const router = Router();

router.post('/token', authentication);
router.post('/recovery-password', recoveryPassword);
router.all('/validate-token', auth(), (req: Request, res: Response) => {
  res.send({ status: 'succes', message: 'Token valid' });
});

export default router;
