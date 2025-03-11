import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
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

const AttendanceSheet = mongoose.model("Attendance", attendanceSchema);

export default AttendanceSheet;
