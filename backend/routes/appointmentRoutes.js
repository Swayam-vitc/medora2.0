// backend/routes/appointmentRoutes.js
import express from "express";
import {
  getAppointments,
  getPatientAppointments,
  getDoctorAppointments,
  createAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Get all appointments (admin)
router.get("/", getAppointments);

// Get appointments for a specific patient
router.get("/patient/:patientId", getPatientAppointments);

// Get appointments for a specific doctor
router.get("/doctor/:doctorId", getDoctorAppointments);

// Create new appointment
router.post("/", createAppointment);

// Update appointment status
router.patch("/:id/status", updateAppointmentStatus);

export default router;