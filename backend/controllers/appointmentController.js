// backend/controllers/appointmentController.js
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

// GET /api/appointments - Get all appointments (admin use)
export const getAppointments = async (_req, res) => {
  try {
    const data = await Appointment.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    console.error("Get appointments error:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};

// GET /api/appointments/patient/:patientId - Get appointments for a specific patient
export const getPatientAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error("Get patient appointments error:", error);
    res.status(500).json({ message: "Error fetching patient appointments" });
  }
};

// GET /api/appointments/doctor/:doctorId - Get appointments for a specific doctor
export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointments = await Appointment.find({ doctorId }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    console.error("Get doctor appointments error:", error);
    res.status(500).json({ message: "Error fetching doctor appointments" });
  }
};

// POST /api/appointments - Create new appointment
export const createAppointment = async (req, res) => {
  try {
    const { patientId, patientName, doctorId, doctorName, date, time, location, type } = req.body;

    // Validate required fields
    if (!patientId || !patientName || !doctorId || !doctorName || !date || !time) {
      return res.status(400).json({
        message: "Missing required fields: patientId, patientName, doctorId, doctorName, date, time"
      });
    }

    // Verify patient exists and is a patient
    const patient = await User.findById(patientId);
    if (!patient || patient.role !== 'patient') {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    // Verify doctor exists and is a doctor
    const doctor = await User.findById(doctorId);
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(400).json({ message: "Invalid doctor ID" });
    }

    const newAppointment = await Appointment.create({
      patientId,
      patientName,
      doctorId,
      doctorName,
      date,
      time,
      location: location || "Hospital",
      type: type || "Consultation",
      status: "pending"
    });

    // Notify Doctor
    await Notification.create({
      recipientId: doctorId,
      message: `New appointment request from ${patientName} for ${date} at ${time}`,
      type: 'appointment_request',
      relatedId: newAppointment._id
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Create appointment error:", error);
    res.status(400).json({ message: "Error creating appointment" });
  }
};

// PATCH /api/appointments/:id/status - Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Notify Patient
    await Notification.create({
      recipientId: appointment.patientId,
      message: `Your appointment with ${appointment.doctorName} on ${appointment.date} has been ${status}`,
      type: 'appointment_status',
      relatedId: appointment._id
    });

    res.json(appointment);
  } catch (error) {
    console.error("Update appointment status error:", error);
    res.status(400).json({ message: "Error updating appointment status" });
  }
};