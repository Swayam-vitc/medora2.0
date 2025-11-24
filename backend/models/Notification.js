// backend/models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        recipientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        message: { type: String, required: true },
        type: {
            type: String,
            enum: ['appointment_request', 'appointment_status', 'system'],
            default: 'system'
        },
        read: { type: Boolean, default: false },
        relatedId: { type: mongoose.Schema.Types.ObjectId } // e.g., Appointment ID
    },
    { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
