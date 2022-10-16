"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: String,
    email: String,
    bots: [mongoose_1.Types.ObjectId],
    password: String,
});
const user = (0, mongoose_1.model)('User', userSchema);
exports.default = user;
