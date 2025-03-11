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
  // email: {
  //   type: String,
  //   required: false,
  //   unique: true,
  // },
  level: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
