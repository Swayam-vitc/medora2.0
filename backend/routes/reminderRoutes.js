import express from "express";
import {
    createReminder,
    getPatientReminders,
    getTodayReminders,
    markReminderDone,
    deleteReminder,
    toggleReminderStatus,
} from "../controllers/reminderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new reminder
router.post("/", protect, createReminder);

// Get all reminders for a patient
router.get("/patient/:patientId", protect, getPatientReminders);

// Get today's active reminders for a patient
router.get("/today/:patientId", protect, getTodayReminders);

// Mark a reminder as done for specific time
router.patch("/:id/done", protect, markReminderDone);

// Toggle reminder active status
router.patch("/:id/toggle", protect, toggleReminderStatus);

// Delete a reminder
router.delete("/:id", protect, deleteReminder);

export default router;
