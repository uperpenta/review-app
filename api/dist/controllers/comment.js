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
const comment_1 = __importDefault(require("../models/comment"));
const commentController = {
    createComment: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.body) {
                res.status(400).json({ error: "Request body is missing" });
                return;
            }
            const commentData = req.body;
            if (!commentData.createdAt) {
                commentData.createdAt = new Date();
            }
            const newComment = yield comment_1.default.create(commentData);
            res.status(201).json(newComment);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create comment" });
        }
    }),
    getCommentsByReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviewId = req.params.id;
            if (!reviewId) {
                res.status(404).json({ error: "No review found" });
                return;
            }
            const comments = yield comment_1.default.find({ reviewId: reviewId });
            if (!comments) {
                res.status(404).json({ error: "No comments found for this review" });
                return;
            }
            res.status(200).json(comments);
        }
        catch (error) {
            res.status(500).json({ error: "Failed to get comments" });
        }
    })
};
exports.default = commentController;
//# sourceMappingURL=comment.js.map