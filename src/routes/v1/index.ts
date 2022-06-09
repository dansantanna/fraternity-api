import { Router } from 'express';

import auth from './auth';
import user from './user';
import profile from './profile';
import post from './post';
import chat from './chat';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/profile', profile);
router.use('/post', post);
router.use('/chat', chat);

export default router;
