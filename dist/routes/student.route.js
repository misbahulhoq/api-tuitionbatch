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
const Attendancesheet_1 = __importDefault(require("../models/Attendancesheet"));
const students = express_1.default.Router();
students.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.headers;
    const students = yield Student_1.default.find({ teacher: email, isDeleted: false });
    res.send(students);
}));
// TODO: when a new student is added, that should also be added to attendance sheet.
students.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, level, uid, teacher } = req.body;
    const studentExists = yield Student_1.default.findOne({ uid, teacher });
    if (studentExists) {
        return res.status(400).send({ message: "Student already exists" });
    }
    const student = yield new Student_1.default({
        name,
        level,
        teacher,
        uid,
    }).save();
    const attendance = yield Attendancesheet_1.default.findOne({
        teacher,
        formattedDate: new Date().toLocaleDateString(),
    });
    if (attendance) {
        attendance.sheet.push({ student: student._id, present: false });
        yield attendance.save();
    }
    res.send(student);
}));
// TODO: when a student is deleted that should also be deleted from attendance sheet
students.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email } = req.headers;
    const found = yield Student_1.default.findById(id);
    if (!found) {
        return res.status(404).send({ message: "Student not found" });
    }
    const student = yield Student_1.default.findByIdAndUpdate(id, { isDeleted: true });
    const attendance = yield Attendancesheet_1.default.findOne({
        teacher: email,
        formattedDate: new Date().toLocaleDateString(),
    });
    if (attendance) {
        attendance.sheet.pull({ student: id });
        yield attendance.save();
    }
    res.send(student);
}));
students.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, level } = req.body;
    const student = yield Student_1.default.findByIdAndUpdate(id, { name, level }, { new: true });
    res.send(student);
}));
exports.default = students;
