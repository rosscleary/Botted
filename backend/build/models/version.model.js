"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const versionSchema = new mongoose_1.Schema({
    language: String,
    sourceCode: String,
    date: Date,
});
const version = (0, mongoose_1.model)('Version', versionSchema);
exports.default = version;
