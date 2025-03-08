"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnect_1 = require("./config/dbConnect");
const app = (0, express_1.default)();
(0, dbConnect_1.dbConnect)();
app.use(express_1.default.json());
exports.default = app;
