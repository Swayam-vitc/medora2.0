// backend/controllers/notificationController.js
import Notification from "../models/Notification.js";

// GET /api/notifications - Get notifications for logged-in user
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipientId: req.user.id })
            .sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        console.error("Get notifications error:", error);
        res.status(500).json({ message: "Error fetching notifications" });
    }
};

// PATCH /api/notifications/:id/read - Mark notification as read
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        res.json(notification);
    } catch (error) {
        console.error("Mark read error:", error);
        res.status(500).json({ message: "Error updating notification" });
    }
};
