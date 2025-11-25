import Reminder from "../models/Reminder.js";
import Prescription from "../models/Prescription.js";

// POST /api/reminders - Create a new reminder
export const createReminder = async (req, res) => {
    try {
        const { patientId, prescriptionId, medicationName, reminderTimes, frequency, startDate, endDate, notes, reminderType } = req.body;

        // Validate required fields
        if (!patientId || !medicationName || !reminderTimes || !frequency) {
            return res.status(400).json({
                message: "Missing required fields: patientId, medicationName, reminderTimes, frequency"
            });
        }

        // Only validate prescription if it's not a custom reminder
        if (prescriptionId && prescriptionId !== "custom") {
            // Verify prescription exists
            const prescription = await Prescription.findById(prescriptionId);
            if (!prescription) {
                return res.status(404).json({ message: "Prescription not found" });
            }

            // Verify prescription belongs to patient
            if (prescription.patientId.toString() !== patientId) {
                return res.status(403).json({ message: "Prescription does not belong to this patient" });
            }
        }

        const newReminder = await Reminder.create({
            patientId,
            prescriptionId: prescriptionId || "custom",
            medicationName,
            reminderTimes,
            frequency,
            startDate: startDate || new Date(),
            endDate,
            notes,
            reminderType: reminderType || "medication",
            isActive: true,
            completedDates: []
        });

        res.status(201).json(newReminder);
    } catch (error) {
        console.error("Create reminder error:", error);
        res.status(400).json({ message: "Error creating reminder", error: error.message });
    }
};

// GET /api/reminders/patient/:patientId - Get all reminders for a patient
export const getPatientReminders = async (req, res) => {
    try {
        const { patientId } = req.params;
        const { active } = req.query; // Optional filter for active reminders only

        const query = { patientId };
        if (active === 'true') {
            query.isActive = true;
        }

        const reminders = await Reminder.find(query)
            .sort({ createdAt: -1 });

        res.json(reminders);
    } catch (error) {
        console.error("Get patient reminders error:", error);
        res.status(500).json({ message: "Error fetching reminders" });
    }
};

// GET /api/reminders/today/:patientId - Get today's active reminders for a patient
export const getTodayReminders = async (req, res) => {
    try {
        const { patientId } = req.params;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const reminders = await Reminder.find({
            patientId,
            isActive: true,
            startDate: { $lte: new Date() },
            $or: [
                { endDate: { $exists: false } },
                { endDate: null },
                { endDate: { $gte: today } }
            ]
        })
            .sort({ reminderTimes: 1 });

        // Format today's date for comparison
        const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD

        // Add completion status for today
        const remindersWithStatus = reminders.map(reminder => {
            const reminderObj = reminder.toObject();
            const todayCompletion = reminder.completedDates.find(cd => cd.date === todayString);

            reminderObj.todayCompleted = todayCompletion ? todayCompletion.times.map(t => t.time) : [];

            return reminderObj;
        });

        res.json(remindersWithStatus);
    } catch (error) {
        console.error("Get today's reminders error:", error);
        res.status(500).json({ message: "Error fetching today's reminders" });
    }
};

// PATCH /api/reminders/:id/done - Mark a reminder as completed for a specific time
export const markReminderDone = async (req, res) => {
    try {
        const { id } = req.params;
        const { time } = req.body; // Time in HH:MM format

        if (!time) {
            return res.status(400).json({ message: "Time is required" });
        }

        const reminder = await Reminder.findById(id);
        if (!reminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Find or create today's completion entry
        let todayCompletion = reminder.completedDates.find(cd => cd.date === today);

        if (todayCompletion) {
            // Check if this time is already marked done
            const timeAlreadyDone = todayCompletion.times.find(t => t.time === time);
            if (!timeAlreadyDone) {
                todayCompletion.times.push({ time, completedAt: new Date() });
            }
        } else {
            // Create new completion entry for today
            reminder.completedDates.push({
                date: today,
                times: [{ time, completedAt: new Date() }]
            });
        }

        await reminder.save();
        res.json(reminder);
    } catch (error) {
        console.error("Mark reminder done error:", error);
        res.status(400).json({ message: "Error marking reminder as done" });
    }
};

// DELETE /api/reminders/:id - Delete a reminder
export const deleteReminder = async (req, res) => {
    try {
        const { id } = req.params;

        const reminder = await Reminder.findByIdAndDelete(id);

        if (!reminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }

        res.json({ message: "Reminder deleted successfully", reminder });
    } catch (error) {
        console.error("Delete reminder error:", error);
        res.status(400).json({ message: "Error deleting reminder" });
    }
};

// PATCH /api/reminders/:id/toggle - Toggle reminder active status
export const toggleReminderStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const reminder = await Reminder.findById(id);
        if (!reminder) {
            return res.status(404).json({ message: "Reminder not found" });
        }

        reminder.isActive = !reminder.isActive;
        await reminder.save();

        res.json(reminder);
    } catch (error) {
        console.error("Toggle reminder status error:", error);
        res.status(400).json({ message: "Error toggling reminder status" });
    }
};
