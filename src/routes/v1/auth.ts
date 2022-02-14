import { Router } from 'express';
import { authentication } from 'controllers/auth';

const router = Router();

router.post('/token', authentication);

export default router;
