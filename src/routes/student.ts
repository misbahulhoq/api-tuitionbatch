import e from "express";
import Student from "../models/Student";

const students = e.Router();

students.get("/", async (req, res) => {
  const { email } = req.headers;
  console.log(email);
  const students = await Student.find({ teacher: email });
  res.send(students);
});

students.post("/", async (req, res) => {
  const { name, level, teacher } = req.body;
  const student = await new Student({ name, level, teacher }).save();
  res.send(student);
});

export default students;
