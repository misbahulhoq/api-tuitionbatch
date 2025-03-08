import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  teacher: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
