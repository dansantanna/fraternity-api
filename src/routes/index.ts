import { Router, Request, Response } from 'express';

import sendMail from 'config/sendMail';
import v1 from './v1';

const router = Router();
router.use('/v1', v1);

if (process.env.NODE_ENV === 'development') {
  // Endpoint to test send mail, just work locally
  router.post('/mail', async (req: Request, res: Response) => {
    await sendMail(req.body.to, req.body.subject, req.body.content);
    res.send({ status: 'success', message: 'Email sent' });
  });
}

export default router;
