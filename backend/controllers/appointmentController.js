// backend/controllers/appointmentController.js
import Appointment from "../models/Appointment.js";

export const getAppointments = async (_req, res) => {
  try {
    const data = await Appointment.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

export const createAppointment = async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(400).json({ message: "Error creating appointment" });
  }
};