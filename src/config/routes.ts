import { Express } from "express";
import students from "../routes/student";
import attendanceRouter from "../routes/attendance";
const routes = (app: Express) => {
  app.use("/api/students", students);
  app.use("/api/attendance", attendanceRouter);
};

export default routes;
