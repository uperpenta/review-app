"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const clientInfo = new mongoose_1.Schema({
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
const ClientInfo = (0, mongoose_1.model)("ClientInfo", clientInfo);
exports.default = ClientInfo;
//# sourceMappingURL=clientInfo.js.map