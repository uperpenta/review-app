import express, { Router } from 'express';
import reviewController from '../controllers/review';
import commentController from '../controllers/comment';

//Review Routes
const reviewRouter: Router = express.Router();
const commentRouter: Router = express.Router();


//REVIEW ENDPOINTS
reviewRouter.get('/reviews', reviewController.getReviews);
reviewRouter.post('/reviews', reviewController.createReview);
reviewRouter.get('/reviews/:id', reviewController.getReview);
reviewRouter.patch('/reviews/:id', reviewController.updateReview);
reviewRouter.delete('/reviews/:id', reviewController.deleteReview);

//LIKE RELATED ENDPOINTS

reviewRouter.post('/reviews/:id/like', reviewController.likeReview);

//COMMENT ENDPOINTS

commentRouter.get('/comments/:id',commentController.getCommentsByReview);
commentRouter.post('/comments',commentController.createComment);

export {reviewRouter, commentRouter};
