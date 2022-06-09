import { Router } from 'express';
import * as chat from 'controllers/chat';
import auth from 'middlewares/auth';

const router = Router();
router.use('/', auth());

router.get('/', chat.listChats);

export default router;
