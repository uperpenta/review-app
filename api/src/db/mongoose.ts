import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.MONGODB_NAME as string;
const dbUser = process.env.MONGODB_USER as string;
const dbPassword = process.env.MONGODB_PASSWORD as string;
const dbUrl = `mongodb://${dbUser}:${dbPassword}@localhost:27017/${dbName}?authSource=${dbName}`;
const connectDb = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error closing MongoDB connection', error);
        process.exit(1);
    }
});

export default connectDb;