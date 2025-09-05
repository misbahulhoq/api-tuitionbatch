import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["MONGO_URL"];

requiredEnvVars.map((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable, ${envVar}`);
  }
});

export const envVars = {
  MONGO_URL: process.env.MONGO_URL,
};
