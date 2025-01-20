"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = __importDefault(require("../controllers/review"));
//Review Routes
const reviewRouter = express_1.default.Router();
//CRUD ENDPOINTS
reviewRouter.get('/reviews', review_1.default.getReviews);
reviewRouter.post('/reviews', review_1.default.createReview);
reviewRouter.get('/reviews/:id', review_1.default.getReview);
reviewRouter.patch('/reviews/:id', review_1.default.updateReview);
reviewRouter.delete('/reviews/:id', review_1.default.deleteReview);
//LIKE RELATED ENDPOINTS
reviewRouter.post('/reviews/:id/like', review_1.default.likeReview);
exports.default = reviewRouter;
//# sourceMappingURL=index.js.map