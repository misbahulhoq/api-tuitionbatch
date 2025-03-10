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

students.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const found = await Student.findById(id);
  if (!found) {
    return res.status(404).send({ message: "Student not found" });
  }
  const student = await Student.findByIdAndDelete(id);
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
