import {model, Schema} from "mongoose";


export type TComment = {
    name: string;
    text: string;
    createdAt: Date;
    reviewId: number;
}

export interface IComment extends TComment, Document{};

const commentSchema = new Schema({
    name:{
        type: String,
        required: false,
        default: "Anonymous"
    },
    text:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true
    },
    reviewId: {
        type: Number,
        required: true
    }
});

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;

