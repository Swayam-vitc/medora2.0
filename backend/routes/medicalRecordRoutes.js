import express from "express";
import { createRecord, getPatientRecords } from "../controllers/medicalRecordController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createRecord);
router.get("/patient/:patientId", protect, getPatientRecords);

export default router;
