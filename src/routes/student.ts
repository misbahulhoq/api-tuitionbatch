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
  let teacher = "test";
  const { name, level } = req.body;
  console.log(req.body);
  // const studentExists = await Student.findOne({ email });
  // if (studentExists) {
  //   return res.status(400).send({ message: "student already exists." });
  // }
  const student = await new Student({ name, level, teacher }).save();
  res.send(student);
});

export default students;
