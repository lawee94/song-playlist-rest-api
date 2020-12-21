import mongoose from "mongoose";

mongoose.Promise = global.Promise;

export const connect = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost/music_api");

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
