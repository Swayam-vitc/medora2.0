import express from "express";
import {
  createPrescription,
  getDoctorPrescriptions,
  getPatientPrescriptions,
} from "../controllers/prescriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPrescription);
router.get("/doctor/:doctorId", protect, getDoctorPrescriptions);
router.get("/patient/:patientId", protect, getPatientPrescriptions);

export default router;
