import e from "express";

const students = e.Router();

students.get("/", (req, res) => {
  res.send("student");
});

students.post("/", (req, res) => {
  res.send("student");
});
