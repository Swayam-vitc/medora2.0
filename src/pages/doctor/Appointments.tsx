import { useState } from "react";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video } from "lucide-react";
import { useAppointments } from "@/context/AppointmentsContext";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Appointments = () => {
  const { appointments, addAppointment } = useAppointments();

  // Dialog Control
  const [open, setOpen] = useState(false);

  // Form State
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = () => {
    if (!doctor || !date || !time) return;

    addAppointment({
      id: uuidv4(),
      doctor,
      date,
      time,
      location,
      type,
    });

    // Close and clear form
    setOpen(false);
    setDoctor("");
    setDate("");
    setTime("");
    setLocation("");
    setType("");
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

            {/* Add Appointment Button */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-medical-teal">
                  <Calendar className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Appointment</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label>Doctor Name</Label>
                    <Input
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Location</Label>
                    <Input
                      placeholder="Online / Hospital"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Type</Label>
                    <Input
                      placeholder="Consultation / Follow-up"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>

                  <Button onClick={handleSubmit} className="w-full">
                    Save Appointment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Appointment List */}
          <div className="grid gap-4">
            {appointments.length === 0 ? (
              <p className="text-muted-foreground p-4">No appointments yet.</p>
            ) : (
              appointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="border-border/50 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                          <div className="text-sm text-muted-foreground">
                            {appointment.date}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {appointment.time}
                            </span>
                            <span>{appointment.type}</span>
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Join Call
                      </Button>
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