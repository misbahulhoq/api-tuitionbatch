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
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "Tuition batch api.",
            version: "1.0.0",
            description: "API documentation for tuition batch app.",
        },
    },
    apis: ["./routes/*.ts", "./routes/*.js"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
// connect database
(0, dbConnect_1.dbConnect)();
let origin;
if (process.env.NODE_ENV === "development") {
    origin = "http://localhost:3000";
}
else {
    origin = ["https://tuitionbatch.vercel.app", "http://localhost:3000"];
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
        "authToken",
        "email",
        "X-User-Email",
        "x-user-email",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));
app.use(express_1.default.json());
// routes
(0, routes_1.default)(app);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
exports.default = app;
