import express, { Router } from 'express';
import commentRouter from './comment';
import reviewRouter from './review';

const router: Router =  express.Router();

router.use(commentRouter);
router.use(reviewRouter);

export default router;