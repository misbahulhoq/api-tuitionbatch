import express from "express";
import AttendanceSheet from "../models/Attendancesheet";
import { getMonthAndYear } from "../utils/getMonthAndYear";

const attendanceRouter = express.Router();

attendanceRouter.post("/", async (req, res) => {
  // date is coming is ISO format.
  const { sheet, date } = req.body;
  const { email } = req.headers;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const sheetExists = await AttendanceSheet.findOne({
    teacher: email,
    formattedDate,
  });
  if (sheetExists) {
    return res.status(208).send({ message: "Sheet already exists" });
  }
  const attendance = await new AttendanceSheet({
    sheet,
    date: new Date(date),
    teacher: email,
    formattedDate,
  }).save();
  res.send(attendance);
});

attendanceRouter.get("/current-date", async (req, res) => {
  const { email } = req.headers;
  // The formatted date would be passed from the front-end as a query param.
  const formattedDate = req.query.date;
  const attendance = await AttendanceSheet.findOne({
    teacher: email,
    formattedDate,
  })
    .populate("sheet.student")
    .lean();
  res.send(attendance);
});

attendanceRouter.get("/history", async (req, res) => {
  const { email } = req.headers;
  const { limit = 10, month } = req.query;
  const attendance = await AttendanceSheet.find({
    teacher: email,
  })
    .sort({ date: -1 })
    .populate("sheet.student")
    .limit(Number(limit));
  const monthFilter: string[] = [];

  attendance.forEach((a) => {
    const monthAndYear = getMonthAndYear(a.date);
    if (!monthFilter.includes(monthAndYear)) monthFilter.push(monthAndYear);
  });

  res.send({
    monthFilter,
    attendance: month
      ? attendance.filter((a) => {
          const monthAndYear = getMonthAndYear(a.date);
          return monthAndYear === month;
        })
      : attendance,
  });
});

attendanceRouter.put("/:attendanceId/:studentId", async (req, res) => {
  const { sheet, date } = req.body;
  const { email } = req.headers;
  const { attendanceId, studentId } = req.params;

  try {
    const attendance = await AttendanceSheet.findOne({
      _id: attendanceId,
      "sheet.student": studentId,
    });
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    const studentIndex = attendance.sheet.findIndex(
      (s) => s.student.toString() === studentId
    );
    if (studentIndex === -1) {
      return res
        .status(404)
        .send({ message: "Student not found in attendance" });
    }
    attendance.sheet[studentIndex].present =
      !attendance.sheet[studentIndex].present;
    await attendance.save();
    res.send({ message: "Attendance updated successfully", attendance });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
});

export default attendanceRouter;
