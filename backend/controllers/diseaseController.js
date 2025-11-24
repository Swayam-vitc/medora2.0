// backend/controllers/diseaseController.js
import {
    diseases,
    findDiseaseByName,
    findDiseasesBySymptom,
    getAllDiseaseNames,
} from "../data/diseaseData.js";

// GET /api/diseases - Get all diseases (summary)
export const getAllDiseases = async (req, res) => {
    try {
        const diseaseList = getAllDiseaseNames();
        res.json({
            success: true,
            count: diseaseList.length,
            data: diseaseList,
        });
    } catch (error) {
        console.error("Get all diseases error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching diseases",
        });
    }
};

// GET /api/diseases/:name - Get specific disease by name
export const getDiseaseByName = async (req, res) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Disease name is required",
            });
        }

        const disease = findDiseaseByName(name);

        if (!disease) {
            return res.status(404).json({
                success: false,
                message: `Disease '${name}' not found`,
            });
        }

        res.json({
            success: true,
            data: disease,
        });
    } catch (error) {
        console.error("Get disease by name error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching disease information",
        });
    }
};

// GET /api/diseases/search?q=symptom - Search diseases by symptom
export const searchDiseasesBySymptom = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                success: false,
                message: "Search query parameter 'q' is required",
            });
        }

        const matchingDiseases = findDiseasesBySymptom(q);

        if (matchingDiseases.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No diseases found with symptom: '${q}'`,
            });
        }

        res.json({
            success: true,
            count: matchingDiseases.length,
            searchTerm: q,
            data: matchingDiseases,
        });
    } catch (error) {
        console.error("Search diseases by symptom error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while searching diseases",
        });
    }
};

// GET /api/diseases/full - Get all diseases with full details
export const getAllDiseasesDetailed = async (req, res) => {
    try {
        res.json({
            success: true,
            count: diseases.length,
            data: diseases,
        });
    } catch (error) {
        console.error("Get all diseases detailed error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching detailed disease information",
        });
    }
};
