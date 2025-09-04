import { Express } from "express";
import students from "../routes/student.route";
import attendanceRouter from "../routes/attendance.route";

const routes = (app: Express) => {
  app.use("/students", students);
  app.use("/attendance", attendanceRouter);
};

export default routes;
