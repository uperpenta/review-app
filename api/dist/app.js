"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("./db/mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const process_1 = __importDefault(require("process"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
//import cors from 'cors'; TODO
const port = process_1.default.env.PORT;
const app = (0, express_1.default)();
(0, mongoose_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST'],
    },
});
exports.io = io;
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => console.log('user disconnected'));
});
app.use(express_1.default.json());
app.use(index_1.default);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
//Faci asta pentru un website pentru cineva care lucrează în construcții și își oferă serviciile pe website, freelancer. Și scrie niște endpoint uri care fac următoarele chestii: 
//- POST review (gen între o stea și 5 stele, plus comentarii) 
//- ⁠POST/PATCH sau ce crezi tu ca e mai bine, like la review 
//- ⁠POST request de servicii, gen un quote 
//Și încearcă să te mai gândești tu ce ar fi folositor pentru un website de genul.
//# sourceMappingURL=app.js.map