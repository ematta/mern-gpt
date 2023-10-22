import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL || "");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to database");
  }
}

export async function disconnect() {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Error disconnecting from database");
  }
}
