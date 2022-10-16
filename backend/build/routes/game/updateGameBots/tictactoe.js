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
const version_model_1 = __importDefault(require("../../../models/version.model"));
const bot_model_1 = __importDefault(require("../../../models/bot.model"));
const axios_1 = __importDefault(require("axios"));
const callPiston = (sourceCode, language, input) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield axios_1.default.post('https://emkc.org/api/v2/piston/execute', {
        language: language,
        version: '10.2.0',
        files: [
            {
                content: sourceCode,
            },
        ],
        stdin: input,
    });
    return result.data.run.stdout;
});
const gameOver = (gameStateString) => {
    // Check rows
    for (let i = 0; i <= 6; i += 3) {
        if (gameStateString[i] == gameStateString[i + 1] &&
            gameStateString[i + 1] == gameStateString[i + 2] &&
            gameStateString[i] != 'E') {
            return true;
        }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
        if (gameStateString[i] == gameStateString[i + 3] &&
            gameStateString[i + 3] == gameStateString[i + 6] &&
            gameStateString[i] != 'E') {
            return true;
        }
    }
    return false;
};
const newGameString = (currGameString, move, player) => {
    if (move.length != 3 || move[1] != ' ') {
        return 'Loss';
    }
    const row = Number(move[0]);
    const column = Number(move[2]);
    const index = (row - 1) * 3 + column - 1;
    if (currGameString[index] !== 'E') {
        return 'Loss';
    }
    currGameString =
        currGameString.substring(0, index) +
            player +
            currGameString.substring(index + 1);
    return currGameString;
};
const flipGameString = (gameString) => {
    let flippedGameString = '';
    for (let i = 0; i < gameString.length; i++) {
        if (gameString[i] === 'E') {
            flippedGameString += 'E';
        }
        else {
            flippedGameString += gameString[i] === 'X' ? 'O' : 'X';
        }
    }
    return flippedGameString;
};
const playGame = (player1Version, player2Version) => __awaiter(void 0, void 0, void 0, function* () {
    let gameStateString = 'EEEEEEEEE';
    while (true) {
        const player1Move = yield callPiston(player1Version.sourceCode, player1Version.language, gameStateString);
        gameStateString = newGameString(gameStateString, player1Move, 'X');
        if (gameStateString === 'Loss') {
            return 2;
        }
        if (gameOver(gameStateString)) {
            return 1;
        }
        const player2Move = yield callPiston(player2Version.sourceCode, player2Version.language, flipGameString(gameStateString));
        gameStateString = newGameString(gameStateString, player2Move, 'O');
        if (gameStateString === 'Loss') {
            return 1;
        }
        if (gameOver(gameStateString)) {
            return 2;
        }
    }
});
const tictactoe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { botId, language, sourceCode } = req.body;
    const newVersion = yield version_model_1.default.create({
        language: language,
        sourceCode: sourceCode,
        date: Date.now(),
    });
    const bot = yield bot_model_1.default.findOne({ _id: botId });
    if (!bot) {
        res.status(400).json({ error: 'Bot with given id does not exist.' });
        return;
    }
    bot.versions.push(newVersion._id);
    yield bot.save();
    const gameBots = (yield bot_model_1.default.find({ game: 'tictactoe' })).map((result) => {
        return result;
    });
    let winCounts = [];
    for (let i = 0; i < gameBots.length; i++) {
        winCounts.push({ count: 0, index: i });
    }
    for (let i = 0; i < gameBots.length - 1; i++) {
        for (let j = i + 1; j < gameBots.length; j++) {
            const bot1 = gameBots[i];
            const bot2 = gameBots[j];
            const bot1Version = (yield version_model_1.default.findOne({
                _id: bot1.versions[bot1.versions.length - 1],
            }));
            const bot2Version = (yield version_model_1.default.findOne({
                _id: bot2.versions[bot2.versions.length - 1],
            }));
            const gameResult = yield playGame(bot1Version, bot2Version);
            if (gameResult === 1) {
                winCounts[i].count++;
            }
            else {
                winCounts[j].count++;
            }
        }
    }
    winCounts.sort((a, b) => {
        return a.count - b.count;
    });
    let rank = 1;
    for (let i = winCounts.length - 1; i >= 0; i--) {
        gameBots[winCounts[i].index].rank = rank;
        gameBots[winCounts[i].index].winPercentage =
            winCounts[i].count / (gameBots.length - 1);
        yield gameBots[winCounts[i].index].save();
        if (i != 0 && winCounts[i - 1].count < winCounts[i].count) {
            rank++;
        }
    }
    res.status(200).json({ message: 'Successfully updated bot version' });
});
exports.default = tictactoe;
