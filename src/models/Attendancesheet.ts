import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
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
