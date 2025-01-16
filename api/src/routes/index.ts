import express, { Router } from 'express';
import reviewController from '../controllers/review';

const reviewRouter: Router = express.Router();

reviewRouter.get('/reviews', reviewController.getReviews);
reviewRouter.post('/reviews', reviewController.createReview);
reviewRouter.get('/reviews/:id', reviewController.getReview);

export default reviewRouter;
