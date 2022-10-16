"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getBots_1 = __importDefault(require("./user/getBots"));
const newUser_1 = __importDefault(require("./user/newUser"));
const login_1 = __importDefault(require("./user/login"));
const getUserById_1 = __importDefault(require("./user/getUserById"));
const router = (0, express_1.Router)();
router.get('/getBots', getBots_1.default);
router.post('/newUser', newUser_1.default);
router.post('/login', login_1.default);
router.post('/getUserById', getUserById_1.default);
exports.default = router;
