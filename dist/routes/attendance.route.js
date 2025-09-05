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
const Attendancesheet_1 = __importDefault(require("../models/Attendancesheet"));
const attendanceRouter = express_1.default.Router();
attendanceRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // date is coming is ISO format.
    const { sheet, date } = req.body;
    const { email } = req.headers;
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const sheetExists = yield Attendancesheet_1.default.findOne({
        teacher: email,
        formattedDate,
    });
    if (sheetExists) {
        return res.status(208).send({ message: "Sheet already exists" });
    }
    const attendance = yield new Attendancesheet_1.default({
        sheet,
        date: new Date(date),
        teacher: email,
        formattedDate,
    }).save();
    res.send(attendance);
}));
attendanceRouter.get("/current-date", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.headers;
    // The formatted date would be passed from the front-end as a query param.
    const formattedDate = req.query.date;
    const attendance = yield Attendancesheet_1.default.find({
        teacher: email,
        formattedDate,
    }).populate("sheet.student");
    res.send(attendance);
}));
attendanceRouter.get("/history", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.headers;
    const attendance = yield Attendancesheet_1.default.find({
        teacher: email,
    })
        .sort({ date: -1 })
        .populate("sheet.student");
    res.send(attendance);
}));
attendanceRouter.put("/:attendanceId/:studentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sheet, date } = req.body;
    const { email } = req.headers;
    const { attendanceId, studentId } = req.params;
    try {
        const attendance = yield Attendancesheet_1.default.findOne({
            _id: attendanceId,
            "sheet.student": studentId,
        });
        if (!attendance) {
            return res.status(404).json({ message: "Attendance record not found" });
        }
        const studentIndex = attendance.sheet.findIndex((s) => s.student.toString() === studentId);
        if (studentIndex === -1) {
            return res
                .status(404)
                .send({ message: "Student not found in attendance" });
        }
        attendance.sheet[studentIndex].present =
            !attendance.sheet[studentIndex].present;
        yield attendance.save();
        res.send({ message: "Attendance updated successfully", attendance });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error", error });
    }
}));
exports.default = attendanceRouter;
