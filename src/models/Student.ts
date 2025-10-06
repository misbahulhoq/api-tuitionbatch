import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  level: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  descriptions: {
    type: [[Number]],
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
