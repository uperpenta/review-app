import {Document, model , Schema} from "mongoose";
//import { z } from "zod"; TODO VALIDATION

export type TReview = {
    name: string;
    email: string;
    content: string;
    rating: number;
    likesCount: number;
};

export interface IReview extends TReview, Document {};

const reviewSchema = new Schema({  
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    likesCount: {
        type: Number,
        default: 0,
    },
});

const Review = model<IReview>("Review", reviewSchema);

export default Review;

