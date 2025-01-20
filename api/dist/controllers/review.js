"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const review_1 = __importDefault(require("../models/review"));
const clientInfo_1 = __importDefault(require("../models/clientInfo"));
const reviewController = {
    createReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.body === null) {
                res.status(400).json({ error: "Request body is missing" });
                return;
            }
            const reviewData = req.body;
            const newReview = yield review_1.default.create(reviewData);
            res.status(201).json(newReview);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to create review" });
        }
    }),
    getReviews: (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviews = yield review_1.default.find();
            if (reviews.length === 0) {
                res.status(404).json({ error: "No reviews found" });
                return;
            }
            res.status(200).json(reviews);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to get reviews" });
        }
    }),
    getReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviewId = req.params.id;
            const review = yield review_1.default.findById(reviewId);
            if (!review) {
                res.status(404).json({ error: "Review not found" });
                return;
            }
            res.status(200).json(review);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to get review" });
        }
    }),
    updateReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviewId = req.params.id;
            const review = yield review_1.default.findById(reviewId);
            if (!review) {
                res.status(404).json({ error: "Review not found" });
                return;
            }
            const updatedReview = yield review_1.default.findByIdAndUpdate(reviewId, req.body, { new: true });
            res.status(200).json(updatedReview);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to update review" });
        }
    }),
    deleteReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviewId = req.params.id;
            const review = yield review_1.default.findById(reviewId);
            if (!review) {
                res.status(404).json({ error: "Review not found" });
                return;
            }
            yield review.deleteOne();
            res.status(200).json({ message: "Review deleted" });
        }
        catch (error) {
            res.status(500).json({ error: "Failed to delete review" });
        }
    }),
    likeReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviewId = req.params.id;
            const review = yield review_1.default.findById(reviewId);
            const clientIp = req.headers['x-forwarded-for'];
            const clientUserAgent = req.headers['user-agent'];
            const client = {
                ip: clientIp,
                userAgent: clientUserAgent,
            };
            let clientInfo = yield clientInfo_1.default.findOne(client);
            if (!review) {
                res.status(404).json({ error: "Review not found" });
                return;
            }
            if (!clientInfo) {
                clientInfo = new clientInfo_1.default(Object.assign(Object.assign({}, client), { likedReviews: [] }));
                yield clientInfo.save();
            }
            if (clientInfo.likedReviews.includes(reviewId)) {
                res.status(400).json({ error: "You already liked this review" });
                return;
            }
            review.likesCount++;
            yield review.save();
            yield clientInfo_1.default.updateOne(client, { $push: { likedReviews: reviewId } });
            res.status(200).json(review);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to like review" });
        }
    }),
};
exports.default = reviewController;
//# sourceMappingURL=review.js.map