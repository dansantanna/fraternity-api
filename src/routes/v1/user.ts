import { Router } from 'express';
import { register } from 'controllers/user';

const router = Router();

router.post('/', register);

export default router;
