import express, { Router } from 'express';
import commentController from '../controllers/comment';

const commentRouter: Router = express.Router();

commentRouter.get('/comments/:id',commentController.getCommentsByReview);
commentRouter.post('/comments',commentController.createComment);

export default commentRouter;
