import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URL as string);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}
