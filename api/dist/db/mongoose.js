"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbName = process.env.MONGODB_NAME;
const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbUrl = `mongodb://${dbUser}:${dbPassword}@localhost:27017/${dbName}?authSource=${dbName}`;
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(dbUrl);
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.log(process.env.MONGODB_PASSWORD);
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
});
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    }
    catch (error) {
        console.error('Error closing MongoDB connection', error);
        process.exit(1);
    }
}));
exports.default = connectDb;
//# sourceMappingURL=mongoose.js.map