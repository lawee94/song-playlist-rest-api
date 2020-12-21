import mongoose from "mongoose";
import { number } from "joi";

export const STANDARD_ROLE = 2;
export const ARTIST_ROLE = 1;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },

  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  role: {
    default: STANDARD_ROLE,
    type: Number,
    required: true,
  },
});

export default mongoose.model("User", userSchema);
