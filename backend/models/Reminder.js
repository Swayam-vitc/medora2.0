import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        prescriptionId: {
            type: String, // Changed to String to support "custom" value
            required: false, // Made optional for custom reminders
        },
        medicationName: {
            type: String,
            required: true,
        },
        reminderTimes: {
            type: [String], // Array of time strings like ["08:00", "20:00"]
            required: true,
            validate: {
                validator: function (times) {
                    return times && times.length > 0;
                },
                message: "At least one reminder time is required"
            }
        },
        frequency: {
            type: String,
            required: true,
            enum: ["once daily", "twice daily", "three times daily", "four times daily", "custom"],
        },
        startDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        endDate: {
            type: Date, // Optional - for finite duration medications
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        completedDates: [
            {
                date: {
                    type: String, // Format: YYYY-MM-DD
                    required: true,
                },
                times: [{
                    time: String, // Format: HH:MM
                    completedAt: {
                        type: Date,
                        default: Date.now,
                    }
                }]
            }
        ],
        notes: {
            type: String,
        },
        reminderType: {
            type: String, // yoga, break, water, medication, etc.
            default: "medication"
        },
    },
    { timestamps: true }
);

// Index for efficient querying
reminderSchema.index({ patientId: 1, isActive: 1 });

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
