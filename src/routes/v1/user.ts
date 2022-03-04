import { Router } from 'express';
import { register, changePassword } from 'controllers/user';
import auth from 'middlewares/auth';

const router = Router();

router.post('/', register);
router.post('/change-password', auth(), changePassword);

export default router;
