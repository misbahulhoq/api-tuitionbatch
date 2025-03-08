import express from "express";
import cors from "cors";
import { dbConnect } from "./config/dbConnect";
import routes from "./config/routes";
const app = express();

// connect database
dbConnect();

let origin;
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  origin = "http://localhost:3000";
} else {
  origin = ["https://tuitionbatch.vercel.app"];
}
// middlewares

app.use(
  cors({
    origin,
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: [
      "Authorization",
      "authToken",
      "Content-Type",
      "authtoken",
      "email",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
// routes
routes(app);

export default app;
