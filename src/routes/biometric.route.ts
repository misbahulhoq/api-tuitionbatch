import { Router } from "express";
import Student from "../models/Student";
const router = Router();

router.post("/register-face", async (req, res) => {
  const { id, descriptions } = req.body;
  if (!id) {
    return res.status(400).send({
      message: "Id is required",
    });
  }
  const student = await Student.findById(id);
  if (!student) {
    return res.status(404).send({
      message: "Student not found.",
    });
  }
  student.descriptions = descriptions;
  await student.save();
});
export const biometricRouter = router;
