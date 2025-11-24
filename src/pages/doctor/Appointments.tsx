import { useState } from "react";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video, CheckCircle, XCircle } from "lucide-react";
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

            {/* Doctor might not need to create appointments for themselves in this flow, 
                but keeping the button if they want to manually schedule something for a patient 
                (would need patient selection logic similar to patient side, but for now let's focus on viewing) 
            */}
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
                              {appointment.time}
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