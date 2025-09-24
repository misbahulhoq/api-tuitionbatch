import e from "express";
import Student from "../models/Student";
import AttendanceSheet from "../models/Attendancesheet";

const students = e.Router();

students.get("/", async (req, res) => {
  const email = req.headers["email"];
  const students = await Student.find({
    teacher: email,
    isDeleted: false,
  }).lean();
  res.send(students);
});

// TODO: when a new student is added, that should also be added to attendance sheet.
students.post("/", async (req, res) => {
  const { name, level, uid, teacher } = req.body;

  const studentExists = await Student.findOne({ uid, teacher });
  if (studentExists) {
    return res.status(400).send({ message: "Student already exists" });
  }
  const student = await new Student({
    name,
    level,
    teacher,
    uid,
  }).save();
  const attendance = await AttendanceSheet.findOne({
    teacher,
    formattedDate: new Date().toLocaleDateString(),
  });
  if (attendance) {
    attendance.sheet.push({ student: student._id, present: false });
    await attendance.save();
  }
  res.send(student);
});

// TODO: when a student is deleted that should also be deleted from attendance sheet
students.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { email } = req.headers;
  const found = await Student.findById(id);
  if (!found) {
    return res.status(404).send({ message: "Student not found" });
  }
  const student = await Student.findByIdAndUpdate(id, { isDeleted: true });
  const attendance = await AttendanceSheet.findOne({
    teacher: email,
    formattedDate: new Date().toLocaleDateString(),
  });
  if (attendance) {
    attendance.sheet.pull({ student: id });
    await attendance.save();
  }

  res.send(student);
});

students.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, level } = req.body;
  const student = await Student.findByIdAndUpdate(
    id,
    { name, level },
    { new: true }
  );
  res.send(student);
});

export default students;
