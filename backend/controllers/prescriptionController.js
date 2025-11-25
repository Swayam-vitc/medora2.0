import Prescription from "../models/Prescription.js";
import User from "../models/User.js";

// POST /api/prescriptions
export const createPrescription = async (req, res) => {
  try {
    const { patientId, medication, dosage, frequency, duration, instructions } = req.body;
    const doctorId = req.user.id; // From auth middleware

    if (!patientId || !medication || !dosage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prescription = await Prescription.create({
      patientId,
      doctorId,
      medication,
      dosage,
      frequency,
      duration,
      instructions,
    });

    res.status(201).json(prescription);
  } catch (error) {
    console.error("Create prescription error:", error);
    res.status(500).json({ message: "Server error creating prescription" });
  }
};

// GET /api/prescriptions/doctor/:doctorId
export const getDoctorPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ doctorId: req.params.doctorId })
      .populate("patientId", "name email")
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    console.error("Get doctor prescriptions error:", error);
    res.status(500).json({ message: "Server error fetching prescriptions" });
  }
};

// GET /api/prescriptions/patient/:patientId
export const getPatientPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.patientId })
      .populate("doctorId", "name")
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    console.error("Get patient prescriptions error:", error);
    res.status(500).json({ message: "Server error fetching prescriptions" });
  }
};
