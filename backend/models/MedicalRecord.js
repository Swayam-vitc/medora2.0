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
        recordType: {
            type: String,
            enum: ["Lab Report", "X-Ray", "Consultation Notes", "Prescription", "Other"],
            default: "Consultation Notes",
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
        attachments: [
            {
                type: {
                    type: String,
                    enum: ["prescription", "xray", "lab_report", "other"],
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
                uploadDate: {
                    type: Date,
                    default: Date.now,
                },
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
