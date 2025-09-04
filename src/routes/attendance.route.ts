import e from "express";
import AttendanceSheet from "../models/Attendancesheet";

const attendanceRouter = e.Router();

attendanceRouter.post("/", async (req, res) => {
  const { sheet, date } = req.body;
  const { email } = req.headers;
  const formattedDate = new Date(date).toLocaleDateString();
  const sheetExists = await AttendanceSheet.findOne({
    teacher: email,
    formattedDate,
  });
  if (sheetExists) {
    return res.status(208).send({ message: "Sheet already exists " });
  }
  const attendance = await new AttendanceSheet({
    sheet,
    date: date ? date : Date.now,
    teacher: email,
  }).save();
  res.send(attendance);
});

attendanceRouter.get("/current-date", async (req, res) => {
  const { email } = req.headers;
  console.log(email);
  const attendance = await AttendanceSheet.find({
    teacher: email,
    formattedDate: new Date().toLocaleDateString(),
  }).populate("sheet.student");
  res.send(attendance);
});

attendanceRouter.get("/history", async (req, res) => {
  const { email } = req.headers;
  const attendance = await AttendanceSheet.find({
    teacher: email,
  }).populate("sheet.student");
  console.log(attendance);
  console.log(attendance[0]?.sheet);
  res.send(attendance);
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
