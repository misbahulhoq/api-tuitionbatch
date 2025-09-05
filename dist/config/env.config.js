"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVars = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const requiredEnvVars = ["MONGO_URL"];
requiredEnvVars.map((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`Missing environment variable, ${envVar}`);
    }
});
exports.envVars = {
    MONGO_URL: process.env.MONGO_URL,
};
