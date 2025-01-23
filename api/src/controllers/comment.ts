import Comment, {IComment} from "../models/comment";
import express from "express";

const commentController = {
    createComment: async (req: express.Request, res: express.Response) => {
        try {
            if(!req.body) {
                res.status(400).json({error: "Request body is missing"});
                return;
            }

            const commentData: IComment = req.body;

            if(!commentData.createdAt){
                commentData.createdAt = new Date();
            }

            const newComment = await Comment.create(commentData);

            res.status(201).json(newComment);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Failed to create comment"});
        }
    },
    
    getCommentsByReview: async (req: express.Request, res: express.Response) => {
        try {
            const reviewId = req.params.id;
            if(!reviewId){
                res.status(404).json({error: "No review found"});
                return;
            }

            const comments = await Comment.find({reviewId: reviewId});

            if(!comments){
                res.status(404).json({error: "No comments found for this review"});
                return;
            }

            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({error: "Failed to get comments"});
        }    
    }
}


export default commentController;