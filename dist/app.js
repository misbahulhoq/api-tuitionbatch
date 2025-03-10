"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnect_1 = require("./config/dbConnect");
const routes_1 = __importDefault(require("./config/routes"));
const app = (0, express_1.default)();
// connect database
(0, dbConnect_1.dbConnect)();
let origin;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
    origin = "http://localhost:3000";
}
else {
    origin = ["https://tuitionbatch.vercel.app"];
}
// middlewares
app.use((0, cors_1.default)({
    origin,
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
        "Authorization",
        "authToken",
        "Content-Type",
        "authtoken",
        "email",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express_1.default.json());
// routes
(0, routes_1.default)(app);
exports.default = app;
