import {model, Schema} from "mongoose";

const clientInfo = new Schema({
    ip: {
        type: String,
        required: true,
        index: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    likedReviews: {
        type: [String],
        required: true,
    },
});

const ClientInfo = model("ClientInfo", clientInfo);

export default ClientInfo;