import express from 'express';
import connectDb from './db/mongoose';
import {reviewRouter, commentRouter } from './routes/index';
import { createReadStream } from 'fs';
import path from 'path';
import process from 'process';
import google from 'googleapis';

import pkey from './review-app-448709-3f9d4deb4441.json';



//TODO upload in google drive
//const SCOPES = [process.env.DRIVE];

// async function authorize() {
//     const jwtClient = new google.auth.JWT(
//       pkey.client_email,
//       null,
//       pkey.private_key,
//       SCOPES
//     )
//     await jwtClient.authorize();
//     return jwtClient;
//   }

  /**
 * Create a new file on google drive.
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
// async function uploadFile(authClient) {
//     const drive = google.drive({ version: 'v3', auth: authClient });
  
//       const file = await drive.files.create({
//         media: {
//           body: createReadStream('filename')
//         },
//         fields: 'id',
//         requestBody: {
//           name: path.basename('filename'),
//         },
//       });
//       console.log(file.data.id)
//   }

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


