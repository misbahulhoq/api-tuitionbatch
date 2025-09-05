"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_route_1 = __importDefault(require("../routes/student.route"));
const attendance_route_1 = __importDefault(require("../routes/attendance.route"));
const routes = (app) => {
    app.use("/students", student_route_1.default);
    app.use("/attendance", attendance_route_1.default);
};
exports.default = routes;
