// backend/routes/userRoutes.js
import express from "express";
import {
  getAllUsers,
  getDoctors,
  getPatients,
  getPatientsWithAppointments,
  createPatient,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// IMPORTANT: More specific routes MUST come before general ones
router.get("/patients/with-appointments", protect, getPatientsWithAppointments);
router.get("/patients", protect, getPatients);
router.post("/patients", protect, createPatient);
router.get("/doctors", protect, getDoctors);
router.get("/", protect, getAllUsers);

export default router;