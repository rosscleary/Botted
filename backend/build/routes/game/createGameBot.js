"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_model_1 = __importDefault(require("../../models/bot.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const createGameBot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { botName, userId, gameName } = req.body;
    if (typeof botName != 'string' ||
        typeof userId != 'string' ||
        typeof gameName != 'string') {
        res
            .status(400)
            .json({ error: 'Validation failed, variable types are incorrect.' });
        return;
    }
    const bot = new bot_model_1.default({
        name: botName,
        versions: [],
        user: userId,
        game: gameName,
        rank: 1,
        winPercentage: 0,
    });
    yield bot.save();
    const user = yield user_model_1.default.findOne({ _id: userId });
    if (user) {
        user.bots.push(bot._id);
        yield user.save();
    }
    else {
        res.status(400).json({ error: 'Could not find user with given id.' });
        return;
    }
    res.status(200).json({ bot: bot });
});
exports.default = createGameBot;
