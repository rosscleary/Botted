"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createGameBot_1 = __importDefault(require("./game/createGameBot"));
const updateGameBots_1 = __importDefault(require("./game/updateGameBots"));
const getGameBots_1 = __importDefault(require("./game/getGameBots"));
const getGameBotVersionsByUserId_1 = __importDefault(require("./game/getGameBotVersionsByUserId"));
const getGameBotByUserId_1 = __importDefault(require("./game/getGameBotByUserId"));
const router = (0, express_1.Router)();
router.post('/createGameBot', createGameBot_1.default);
router.post('/getGameBots', getGameBots_1.default);
router.post('/getGameBotVersionsByUserId', getGameBotVersionsByUserId_1.default);
router.post('/getGameBotByUserId', getGameBotByUserId_1.default);
router.use('/updateGameBot', updateGameBots_1.default);
exports.default = router;
