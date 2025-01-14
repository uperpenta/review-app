import Review, {IReview, TReview} from "../models/review";


const reviewController = {
    createReview: async (req: any, res: any) => {
        try {
            const reviewData: IReview = req.body;
            const newReview = await Review.create(reviewData);
            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({error: "Failed to create review"});
        }
    },

    getReviews: async (req: any, res: any) => {
        try {

        } catch (error) {
            res.status(500).json({error: "Failed to get reviews"});
        }
    }

    addLike

    removeLike
}