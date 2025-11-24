// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// Routes
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

// Use express.json to parse JSON bodies
app.use(express.json());

// Use default CORS (allows all origins, handles preflight automatically)
app.use(cors());

// Optional: additional CORS headers fallback (safe)
app.use((req, res, next) => {
  // Only set these if not already set by cors()
  if (!res.getHeader("Access-Control-Allow-Origin")) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  if (!res.getHeader("Access-Control-Allow-Methods")) {
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
  }
  if (!res.getHeader("Access-Control-Allow-Headers")) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  }
  next();
});

// Connect DB (prints error if can't connect)
try {
  connectDB();
} catch (err) {
  console.error("Error calling connectDB():", err);
}

// API routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/notifications", notificationRoutes);

// Health-check / base route
app.get("/", (req, res) => {
  res.send("API running with full CORS");
});

// Simple 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Extra safety: log unhandled rejections / exceptions
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
  // Optionally exit: process.exit(1);
});
