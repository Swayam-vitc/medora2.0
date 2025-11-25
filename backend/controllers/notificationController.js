// backend/controllers/notificationController.js
import Notification from "../models/Notification.js";

// GET /api/notifications - Get notifications for logged-in user
export const getNotifications = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const notifications = await Notification.find({ recipientId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50); // Limit to 50 most recent

        res.json(notifications);
    } catch (error) {
        console.error("Get notifications error:", error);
        // Return empty array instead of error to prevent frontend crashes
        res.json([]);
    }
};

// PATCH /api/notifications/:id/read - Mark notification as read
export const markAsRead = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        res.json(notification);
    } catch (error) {
        console.error("Mark read error:", error);
        res.status(500).json({ message: "Error updating notification" });
    }
};
