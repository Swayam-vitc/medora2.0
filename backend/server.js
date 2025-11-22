import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Routes
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// -----------------------------------------
// 🌍 UNIVERSAL CORS (NO ERRORS, NO BLOCKING)
// -----------------------------------------
app.use(cors()); // allow all origins, headers, methods automatically

// Optional: add custom CORS headers (safe)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// express.json
app.use(express.json());

// DB connect
connectDB();

// Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Test
app.get("/", (req, res) => {
  res.send("API running with full CORS");
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));