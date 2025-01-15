import express, { Router } from 'express';
import reviewController from '../controllers/review';

const router: Router = express.Router();

router.get('/api/reviews', reviewController.getReviews);
router.post('/api/reviews', reviewController.createReview);
router.get('/api/reviews/:id', reviewController.getReview);

export const reviewRouter = router;
