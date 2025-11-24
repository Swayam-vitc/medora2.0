import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Appointment {
  _id?: string;
  id?: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  location: string;
  type: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface AppointmentsContextType {
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, '_id' | 'id' | 'status'>) => Promise<void>;
  refreshAppointments: () => Promise<void>;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider = ({ children }: { children: ReactNode }) => {
  // API URL from environment variable
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Fetch appointments based on user role
  const fetchAppointments = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;

      const user = JSON.parse(userStr);
      const userId = user._id;
      const userRole = user.role;

      let endpoint = `${API_URL}/api/appointments`;

      // Fetch role-specific appointments
      if (userRole === 'patient') {
        endpoint = `${API_URL}/api/appointments/patient/${userId}`;
      } else if (userRole === 'doctor') {
        endpoint = `${API_URL}/api/appointments/doctor/${userId}`;
      }

      const res = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Fetch on mount and when user changes
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Add new appointment to DB
  const addAppointment = async (apt: Omit<Appointment, '_id' | 'id' | 'status'>) => {
    try {
      const res = await fetch(`${API_URL}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").token}`,
        },
        body: JSON.stringify(apt),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create appointment");
      }

      const data = await res.json();
      setAppointments((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Error creating appointment:", error);
      throw error;
    }
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, refreshAppointments: fetchAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) {
    throw new Error("useAppointments must be used within AppointmentsProvider");
  }
  return context;
};