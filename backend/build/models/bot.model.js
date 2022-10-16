"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const botSchema = new mongoose_1.Schema({
    name: String,
    versions: [mongoose_1.Types.ObjectId],
    user: mongoose_1.Types.ObjectId,
    game: String,
    rank: Number,
    winPercentage: Number,
});
const bot = (0, mongoose_1.model)('Bot', botSchema);
exports.default = bot;
