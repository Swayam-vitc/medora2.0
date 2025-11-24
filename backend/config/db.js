// backend/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // MongoDB connection options for better reliability with cloud databases
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    console.error("\nTroubleshooting tips:");
    console.error("1. Check your MONGO_URI in the .env file");
    console.error("2. Ensure you replaced <password> with your actual password");
    console.error("3. Verify Network Access is set to 'Allow Access from Anywhere' in MongoDB Atlas");
    console.error("4. Check if your MongoDB Atlas cluster is active\n");
    process.exit(1);
  }
};