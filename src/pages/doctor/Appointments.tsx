import { useState } from "react";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video, CheckCircle, XCircle, Plus } from "lucide-react";
import { useAppointments } from "@/context/AppointmentsContext";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const formatTime = (time: string) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
};

const Appointments = () => {
  const { appointments } = useAppointments();
  const [open, setOpen] = useState(false);

  // Filter to ensure we only show appointments where this user is the doctor
  // (Though the backend/context should already filter this, it's good for UI consistency if context is shared)
  // Actually, context already filters based on role/ID.

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleStatusUpdate = async (id: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      const res = await fetch(`${API_URL}/api/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        window.location.reload();
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    date: "",
    time: "",
    type: "Check-up",
    location: "Clinic",
  });

  const [patients, setPatients] = useState<any[]>([]);

  // Fetch patients for the dropdown
  const fetchPatients = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;
      const res = await fetch(`${API_URL}/api/users/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const handleCreateAppointment = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;
      const doctorId = userStr ? JSON.parse(userStr)._id : null;

      const res = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newAppointment,
          doctorId,
          status: 'confirmed' // Auto-confirm doctor created appointments
        })
      });

      if (res.ok) {
        setOpen(false);
        window.location.reload();
      } else {
        alert("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Appointments</h1>
              <p className="text-muted-foreground">Manage your patient appointments</p>
            </div>

            <Dialog open={open} onOpenChange={(val) => {
              setOpen(val);
              if (val) fetchPatients();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-medical-teal">
                  <Plus className="mr-2 h-4 w-4" /> New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Schedule Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Patient</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newAppointment.patientId}
                      onChange={(e) => setNewAppointment({ ...newAppointment, patientId: e.target.value })}
                    >
                      <option value="">Select Patient</option>
                      {patients.map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newAppointment.type}
                      onChange={(e) => setNewAppointment({ ...newAppointment, type: e.target.value })}
                    >
                      <option value="Check-up">Check-up</option>
                      <option value="Consultation">Consultation</option>
                      <option value="Follow-up">Follow-up</option>
                      <option value="Emergency">Emergency</option>
                    </select>
                  </div>
                  <Button className="w-full" onClick={handleCreateAppointment}>Schedule</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Appointment List */}
          <div className="grid gap-4">
            {appointments.length === 0 ? (
              <p className="text-muted-foreground p-4">No appointments scheduled.</p>
            ) : (
              appointments.map((appointment) => (
                <Card
                  key={appointment._id || appointment.id}
                  className="border-border/50 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {appointment.patientName || "Unknown Patient"}
                          </h3>
                          <div className="text-sm text-muted-foreground">
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatTime(appointment.time)}
                            </span>
                            <span>{appointment.type}</span>
                            <span>{appointment.location}</span>
                            <Badge variant={
                              appointment.status === 'confirmed' ? 'default' :
                                appointment.status === 'cancelled' ? 'destructive' :
                                  'secondary'
                            }>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {appointment.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleStatusUpdate(appointment._id || appointment.id, 'confirmed')}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirm
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleStatusUpdate(appointment._id || appointment.id, 'cancelled')}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4 mr-2" />
                          Join Call
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Appointments;