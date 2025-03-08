import { Express } from "express";
import students from "../routes/student";
const routes = (app: Express) => {
  app.use("/api/students", students);
};

export default routes;
