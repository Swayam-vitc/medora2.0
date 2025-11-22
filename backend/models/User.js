// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["patient", "doctor"],
      required: [true, "Role is required"],
    },
    specialization: {
      type: String, // only relevant for doctors
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;