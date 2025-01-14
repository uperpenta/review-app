import mongoose from "mongoose";
import { Schema } from "mongoose";


const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        required: true,

    }
    
});