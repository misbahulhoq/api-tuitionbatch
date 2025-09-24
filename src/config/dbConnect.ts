import mongoose from "mongoose";
import { envVars } from "./env.config";

export async function dbConnect() {
  try {
    mongoose.connect(envVars.MONGO_URL as string);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}
