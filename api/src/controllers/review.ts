import Review, {IReview} from "../models/review";
import ClientInfo from "../models/clientInfo";
import express from "express";


const getClientIp = (req: express.Request): string | null => {
    const clientIp = req.headers['x-forwarded-for'] as string;
    return clientIp ? clientIp : null;
};

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
            if(reviews.length === 0){
                res.status(404).json({error: "No reviews found"});
                return;
            }
            res.status(200).json(reviews);   
        } catch (error) {
            res.status(500).json({error: "Failed to get reviews"});
        }
    },

    getReview: async (req: express.Request, res: express.Response) => {
        try {
            const reviewId = req.params.id;
            const review = await Review.findById(reviewId);
            if(!review){
                res.status(404).json({error: "Review not found"});
                return;
            }
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({error: "Failed to get review"});
        }
    },

    updateReview: async( req: express.Request, res: express.Response) => {
        try {
            const reviewId=req.params.id;
            const review = await Review.findById(reviewId);
            if (!review){
                res.status(404).json({error: "Review not found"});
                return;
            }
            const updatedReview = await Review.findByIdAndUpdate(reviewId, req.body, {new: true});
            res.status(200).json(updatedReview);
        } catch (error) {
            res.status(500).json({error: "Failed to update review"});
        }
    },

    deleteReview: async (req: express.Request, res: express.Response) => {
        try {
            const reviewId = req.params.id;
            const review = await Review.findById(reviewId);
            if (!review) {
                res.status(404).json({error: "Review not found"});
                return;
            }
            await review.deleteOne();
            res.status(200).json({message: "Review deleted"});
        } catch (error) {
            res.status(500).json({error: "Failed to delete review"});
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

            const clientIp = getClientIp(req);
            if(!clientIp){
                res.status(400).json({error: "Header 'x-forwarded-for' missing"})
                return;
            }

            const clientUserAgent = req.headers['user-agent'] as string;
            const client = { ip: clientIp, userAgent: clientUserAgent }; 

            let clientInfo = await ClientInfo.findOne(client);

            if (!clientInfo) {
                clientInfo = new ClientInfo({ ...client, likedReviews: [] });
                await clientInfo.save();
            }

            if (clientInfo.likedReviews.includes(reviewId)) {
                res.status(400).json({error: "You already liked this review"});
                return;
            } 

            review.likesCount++;
            await review.save();
            await ClientInfo.updateOne(client, { $push: { likedReviews: reviewId } });

            res.status(200).json(review);
        } catch (error) {
            console.error("Error in likeReview:", error);
            res.status(500).json({error: "Failed to like review"});
        }
    },

    getLikes: async (req: express.Request, res: express.Response) => {
        try {
            const clientIp = req.headers['x-forwarded-for'] as string;
            if(!clientIp){
                res.status(404).json({error: "Header missing: 'x-forwarded-for'"})
                return;
            }

            const clientLikes = await ClientInfo.findOne({ ip: clientIp }, { likes: 1, _id: 0 });

            if(!clientLikes){
                res.status(404).json({error: "Client info not found"});
                return;
            }

            res.status(200).json(clientLikes);
        } catch (error) {
            console.error("Error in getlikes:", error);
            res.status(500).json({error: "Failed to get client info"});
        }
    },
}

export default reviewController;