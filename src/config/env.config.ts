import dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["MONGO_URL", "rpID", "rpName"];

requiredEnvVars.map((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing environment variable, ${envVar}`);
  }
});

export const envVars = {
  MONGO_URL: process.env.MONGO_URL,
  rpID: process.env.rpID as string,
  rpName: process.env.rpName as string,
};
