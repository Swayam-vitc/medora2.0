import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        diagnosis: {
            type: String,
            required: true,
        },
        medications: [
            {
                name: { type: String, required: true },
                dosage: { type: String, required: true },
                frequency: { type: String, required: true },
                startDate: { type: Date },
                endDate: { type: Date },
            },
        ],
        description: {
            type: String, // For basic info, notes, time, etc.
        },
        visitDate: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["active", "history"],
            default: "active",
        },
    },
    { timestamps: true }
);

const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
export default MedicalRecord;
