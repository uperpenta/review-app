import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use('/',() => {
    console.log('App is running');
});

const port = process.env.PORT;
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});



