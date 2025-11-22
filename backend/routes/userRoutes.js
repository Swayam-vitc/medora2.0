// backend/routes/userRoutes.js
import express from "express";
import {
  getAllUsers,
  getDoctors,
  getPatients,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// You can wrap these with `protect` if you want them authenticated
router.get("/", protect, getAllUsers);
router.get("/doctors", protect, getDoctors);
router.get("/patients", protect, getPatients);

export default router;