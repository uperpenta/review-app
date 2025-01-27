import express from 'express';
import connectDb from './db/mongoose';
import {reviewRouter, commentRouter } from './routes/index';
import process from 'process';

const port = process.env.PORT;

const app = express();

connectDb();

app.use(express.json());

app.use(reviewRouter);
app.use(commentRouter);

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});


//Faci asta pentru un website pentru cineva care lucrează în construcții și își oferă serviciile pe website, freelancer. Și scrie niște endpoint uri care fac următoarele chestii: 
//- POST review (gen între o stea și 5 stele, plus comentarii) 
//- ⁠POST/PATCH sau ce crezi tu ca e mai bine, like la review 
//- ⁠POST request de servicii, gen un quote 
//Și încearcă să te mai gândești tu ce ar fi folositor pentru un website de genul.


