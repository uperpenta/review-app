"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const commentSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: false,
        default: "Anonymous"
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: false,
    },
    reviewId: {
        type: String,
        required: true
    },
});
const Comment = (0, mongoose_1.model)("Comment", commentSchema);
exports.default = Comment;
//# sourceMappingURL=comment.js.map