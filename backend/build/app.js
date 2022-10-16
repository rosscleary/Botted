"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
mongoose_1.default
    .connect('mongodb+srv://botted:Zmbuu3dvJfNCu3nO@cluster0.dsnzu.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
    console.log('Successfully connected to MongoDB database');
    const app = (0, express_1.default)();
    const port = 3001;
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use('/api', routes_1.default);
    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    app.listen(port, () => {
        console.log('Connected successfully on port ' + port);
    });
})
    .catch((e) => {
    console.log(`Failed to connect to MongoDB database: ${e}`);
});
