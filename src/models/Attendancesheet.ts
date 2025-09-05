import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: new Date(),
    },
    formattedDate: {
      type: String,
      required: true,
      default: new Date().toLocaleDateString(),
    },
    sheet: {
      type: [
        {
          student: {
            type: mongoose.Schema.Types.ObjectId,
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
  },
  { timestamps: true }
);

const AttendanceSheet = mongoose.model("Attendance", attendanceSchema);

export default AttendanceSheet;
