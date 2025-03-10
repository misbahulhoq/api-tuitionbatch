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
const express_1 = __importDefault(require("express"));
const Student_1 = __importDefault(require("../models/Student"));
const students = express_1.default.Router();
students.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.headers;
    console.log(email);
    const students = yield Student_1.default.find({ teacher: email });
    res.send(students);
}));
students.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, level, teacher } = req.body;
    const student = yield new Student_1.default({ name, level, teacher }).save();
    res.send(student);
}));
exports.default = students;
