import { Router } from 'express';
import * as profile from 'controllers/profile';
import * as address from 'controllers/address';
import * as experience from 'controllers/experience';
import * as academy from 'controllers/academy';
import * as mentorship from 'controllers/mentorship';
import auth from 'middlewares/auth';

const router = Router();

router.use('/', auth());

router.get('/', profile.currentProfile);
router.get('/:id', profile.getById);

router.put('/address', address.saveAddress);

router.post('/experience', experience.addExperience);
router.delete('/experience', experience.removeExperience);
router.put('/experience/:id', experience.removeExperience);

router.post('/academy', academy.addAcademy);
router.delete('/academy', academy.removeAcademy);
router.put('/academy/:id', academy.removeAcademy);

router.post('/mentorship/request/:id', mentorship.request);
router.post('/mentorship/accept/:id', mentorship.accept);
router.get('/mentorships', mentorship.getMentorships);

export default router;
