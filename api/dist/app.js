"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("./db/mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
(0, mongoose_1.default)();
app.use(express_1.default.json());
app.get('/test', (_req, res) => {
    res.send('test');
});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.use(index_1.default);
//Faci asta pentru un website pentru cineva care lucrează în construcții și își oferă serviciile pe website, freelancer. Și scrie niște endpoint uri care fac următoarele chestii: 
//- POST review (gen între o stea și 5 stele, plus comentarii) 
//- ⁠POST/PATCH sau ce crezi tu ca e mai bine, like la review 
//- ⁠POST request de servicii, gen un quote 
//Și încearcă să te mai gândești tu ce ar fi folositor pentru un website de genul.
//# sourceMappingURL=app.js.map