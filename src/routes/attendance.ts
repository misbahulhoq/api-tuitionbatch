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
  const attendance = await AttendanceSheet.find({
    teacher: email,
    formattedDate: new Date().toLocaleDateString(),
  }).populate("sheet.student");
  res.send(attendance);
});

attendanceRouter.put("/", async (req, res) => {
  const { sheet, date } = req.body;
  const { email } = req.headers;
  const formattedDate = new Date(date).toLocaleDateString();
  const attendance = await AttendanceSheet.findOneAndUpdate(
    {
      teacher: email,
      formattedDate,
    },
    { sheet }
  );
  res.send(attendance);
});

export default attendanceRouter;
