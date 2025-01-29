import express from 'express';

import connectDb from './db/mongoose';
import router from './routes/index';

import process from 'process';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { Redis } from 'ioredis';
import { createAdapter } from '@socket.io/redis-streams-adapter';
//import cors from 'cors'; TODO

const port = process.env.PORT;

const app = express();

connectDb();

const server = createServer(app);

const redisClient = new Redis();
const io = new Server(server, {
  adapter: createAdapter(redisClient),
  cors: {
    origin:"*",
    methods:['GET','POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => console.log('user disconnected'));
});

app.use(express.json());

app.use(router);

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});

export {io};

// Cerinte Vali
//Faci asta pentru un website pentru cineva care lucrează în construcții și își oferă serviciile pe website, freelancer. Și scrie niște endpoint uri care fac următoarele chestii: 
//- POST review (gen între o stea și 5 stele, plus comentarii) 
//- ⁠POST/PATCH sau ce crezi tu ca e mai bine, like la review 
//- ⁠POST request de servicii, gen un quote 
//Și încearcă să te mai gândești tu ce ar fi folositor pentru un website de genul.


