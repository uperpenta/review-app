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
            const newComment = await Comment.create(commentData);

            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({error: "Failed to create comment"});
        }
    },
    
    //todo
    getCommentsByReview: async (req: express.Request, res: express.Response) => {
        try {
            const reviewId = req.params.id; 
        } catch (error) {

        }    
    }
}


export default commentController;