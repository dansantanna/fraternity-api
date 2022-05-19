import { Router } from 'express';

import auth from './auth';
import user from './user';
import profile from './profile';
import post from './post';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/profile', profile);
router.use('/post', post);

export default router;
