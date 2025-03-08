import e from "express";
import Student from "../models/Student";

const students = e.Router();

students.get("/", (req, res) => {
  res.send("student");
});

students.post("/", async (req, res) => {
  const { name, teacher, level } = req.body;
  console.log(req.body);
  // const studentExists = await Student.findOne({ email });
  // if (studentExists) {
  //   return res.status(400).send({ message: "student already exists." });
  // }
  const student = await new Student({ name, level, teacher }).save();
  res.send(student);
});

students.get("/all", async (req, res) => {
  const students = await Student.find({});
  res.send(students);
});

export default students;
