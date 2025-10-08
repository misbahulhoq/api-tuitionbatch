"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const attendanceSchema = new mongoose_1.default.Schema({
    date: {
        type: Date,
        required: true,
    },
    formattedDate: {
        type: String,
        required: true,
    },
    sheet: {
        type: [
            {
                student: {
                    type: mongoose_1.default.Schema.Types.ObjectId,
                    ref: "Student",
                    required: true,
                },
                present: {
                    type: Boolean,
                    required: true,
                    default: false,
                },
            },
        ],
    },
    teacher: {
        type: String,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
        required: true,
    },
}, { timestamps: true });
const AttendanceSheet = mongoose_1.default.model("Attendance", attendanceSchema);
exports.default = AttendanceSheet;
