import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.MONGODB_NAME as string;
const dbUser = process.env.MONGODB_USER as string;
const dbPassword = process.env.MONGODB_PASSWORD as string;
const dbUrl = `mongodb://${dbUser}:${dbPassword}@localhost:27017/${dbName}`;

mongoose
    .connect(dbUrl, { 
        family: 4,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error Connecting: " + err);
    });

    process.on('SIGINT', async () => {
        try {
          await mongoose.connection.close();
          console.log('MongoDB connection closed');
          process.exit(0);
        } catch (err) {
          console.error('Error closing MongoDB connection', err);
          process.exit(1);
        }
      });
