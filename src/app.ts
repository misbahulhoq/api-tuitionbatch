import express from "express";
import { dbConnect } from "./config/dbConnect";
const app = express();

dbConnect();
app.use(express.json());
export default app;
