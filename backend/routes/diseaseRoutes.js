// backend/routes/diseaseRoutes.js
import express from "express";
import {
    getAllDiseases,
    getDiseaseByName,
    searchDiseasesBySymptom,
    getAllDiseasesDetailed,
} from "../controllers/diseaseController.js";

const router = express.Router();

// GET /api/diseases - Get all diseases (summary)
router.get("/", getAllDiseases);

// GET /api/diseases/full - Get all diseases with full details
router.get("/full", getAllDiseasesDetailed);

// GET /api/diseases/search?q=symptom - Search diseases by symptom
router.get("/search", searchDiseasesBySymptom);

// GET /api/diseases/:name - Get specific disease by name
router.get("/:name", getDiseaseByName);

export default router;
