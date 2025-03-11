"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const attendanceSchema = new mongoose_1.default.Schema({
    student: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    present: {
        type: Boolean,
        required: true,
        default: false,
    },
});
const AttendanceSheet = mongoose_1.default.model("Attendance", attendanceSchema);
exports.default = AttendanceSheet;
