import express, { Router } from 'express';
import reviewController from '../controllers/review';

//Review Routes
const reviewRouter: Router = express.Router();

//CRUD ENDPOINTS
reviewRouter.get('/reviews', reviewController.getReviews);
reviewRouter.post('/reviews', reviewController.createReview);
reviewRouter.get('/reviews/:id', reviewController.getReview);
reviewRouter.patch('/reviews/:id', reviewController.updateReview);
reviewRouter.delete('/reviews/:id', reviewController.deleteReview);

//LIKE RELATED ENDPOINTS
reviewRouter.post('/reviews/:id/like', reviewController.likeReview);

export default reviewRouter;
