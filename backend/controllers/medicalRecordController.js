import MedicalRecord from "../models/MedicalRecord.js";

// POST /api/medical-records
export const createRecord = async (req, res) => {
    try {
        const { patientId, diagnosis, medications, description, visitDate } = req.body;
        const doctorId = req.user.id; // From auth middleware

        if (!patientId || !diagnosis) {
            return res.status(400).json({ message: "Patient ID and Diagnosis are required" });
        }

        const record = await MedicalRecord.create({
            patientId,
            doctorId,
            diagnosis,
            medications,
            description,
            visitDate: visitDate || Date.now(),
        });

        res.status(201).json(record);
    } catch (error) {
        console.error("Create record error:", error);
        res.status(500).json({ message: "Server error creating record" });
    }
};

// GET /api/medical-records/patient/:patientId
export const getPatientRecords = async (req, res) => {
    try {
        const records = await MedicalRecord.find({ patientId: req.params.patientId })
            .sort({ visitDate: -1 })
            .populate("doctorId", "name specialization"); // Populate doctor info if needed
        res.json(records);
    } catch (error) {
        console.error("Get records error:", error);
        res.status(500).json({ message: "Server error fetching records" });
    }
};
