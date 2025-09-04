import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["MONGO_URL", "AUTH_GOOGLE_SECRET", "AUTH_GOOGLE_ID"];

requiredEnvVars.map((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable, ${envVar}`);
  }
});

export const envVars = {
  MONGO_URL: process.env.MONGO_URL,
  AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
  AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
};
