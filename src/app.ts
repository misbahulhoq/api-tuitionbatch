import express from "express";
import cors from "cors";
import { dbConnect } from "./config/dbConnect";
import routes from "./config/routes";
const app = express();
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      title: "Tuition batch api.",
      version: "1.0.0",
      description: "API documentation for tuition batch app.",
    },
  },
  apis: ["./routes/*.ts", "./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// connect database
dbConnect();

let origin;

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
      "authToken",
      "email",
      "X-User-Email",
      "x-user-email",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(express.json());
// routes
routes(app);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
