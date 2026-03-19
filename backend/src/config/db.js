import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (!/^mongodb(\+srv)?:\/\//.test(env.mongoUri)) {
    throw new Error(
      `Invalid MONGO_URI: "${env.mongoUri}". Use a connection string starting with mongodb:// or mongodb+srv://`
    );
  }

  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
};

export default connectDB;
