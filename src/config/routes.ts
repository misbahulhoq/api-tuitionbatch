import { Express } from "express";
import students from "../routes/student.route";
import attendanceRouter from "../routes/attendance.route";
import { biometricRouter } from "../routes/biometric.route";

const routes = (app: Express) => {
  app.use("/students", students);
  app.use("/attendance", attendanceRouter);
  app.use("/biometric", biometricRouter);
};

export default routes;
