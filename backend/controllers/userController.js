// backend/controllers/userController.js
import User from "../models/User.js";

// GET /api/users
export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

// GET /api/users/doctors
export const getDoctors = async (_req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (error) {
    console.error("Get doctors error:", error);
    res.status(500).json({ message: "Server error fetching doctors" });
  }
};

// GET /api/users/patients
export const getPatients = async (_req, res) => {
  try {
    const patients = await User.find({ role: "patient" }).select("-password");
    res.json(patients);
  } catch (error) {
    console.error("Get patients error:", error);
    res.status(500).json({ message: "Server error fetching patients" });
  }
};

// POST /api/users/patients
export const createPatient = async (req, res) => {
  try {
    const { name, email, phone, age } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user with default password
    const user = await User.create({
      name,
      email,
      password: "password123", // Default password, should be changed by user
      role: "patient",
      phone,
      age,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Create patient error:", error);
    res.status(500).json({ message: "Server error creating patient" });
  }
};