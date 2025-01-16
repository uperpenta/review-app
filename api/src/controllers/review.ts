import Review, {IReview, TReview} from "../models/review";
import express from "express";


const reviewController = {
    createReview: async (req: express.Request, res: express.Response) => {
        try {
            if (req.body === null) {
                res.status(400).json({error: "Request body is missing"});
                return;
            }
            const reviewData: IReview = req.body;
            const newReview = await Review.create(reviewData);
            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({error: "Failed to create review"});
        }
    },

    getReviews: async (_req: express.Request, res: express.Response) => {
        try {
            const reviews = await Review.find();
            res.status(200).json(reviews);   
        } catch (error) {
            res.status(500).json({error: "Failed to get reviews"});
        }
    },

    getReview: async (req: express.Request, res: express.Response) => {
        try {
            const reviewId = req.params.id;
            const review = await Review.findById(reviewId);
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({error: "Failed to get review"});
        }
    },

    likeReview: async (req: express.Request, res: express.Response) => {
        try {
            const reviewId = req.params.id;
            const review = await Review.findById(reviewId);
            if (!review) {
                res.status(404).json({error: "Review not found"});
                return;
            }
            review.likesCount++;
            await review.save();
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({error: "Failed to like review"});
        }
    },

    

}

export default reviewController;