"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = exports.reviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const review_1 = __importDefault(require("../controllers/review"));
const comment_1 = __importDefault(require("../controllers/comment"));
//Review Routes
const reviewRouter = express_1.default.Router();
exports.reviewRouter = reviewRouter;
const commentRouter = express_1.default.Router();
exports.commentRouter = commentRouter;
//REVIEW ENDPOINTS
reviewRouter.get('/reviews', review_1.default.getReviews);
reviewRouter.post('/reviews', review_1.default.createReview);
reviewRouter.get('/reviews/:id', review_1.default.getReview);
reviewRouter.patch('/reviews/:id', review_1.default.updateReview);
reviewRouter.delete('/reviews/:id', review_1.default.deleteReview);
//LIKE RELATED ENDPOINTS
reviewRouter.post('/reviews/:id/like', review_1.default.likeReview);
//COMMENT ENDPOINTS
commentRouter.get('/comments/:id', comment_1.default.getCommentsByReview);
commentRouter.post('/comments', comment_1.default.createComment);
//# sourceMappingURL=index.js.map