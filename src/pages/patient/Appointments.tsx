import { useState, useEffect } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  _id: string;
  name: string;
  specialization?: string;
}

const Appointments = () => {
  const { appointments, addAppointment } = useAppointments();
  const { toast } = useToast();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const [open, setOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch available doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = userStr ? JSON.parse(userStr).token : null;

        const res = await fetch(`${API_URL}/api/users/doctors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async () => {
    if (!selectedDoctorId || !date || !time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Get current user info
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        toast({
          title: "Error",
          description: "User not logged in",
          variant: "destructive",
        });
        return;
      }

      const user = JSON.parse(userStr);
      const selectedDoctor = doctors.find(d => d._id === selectedDoctorId);

      if (!selectedDoctor) {
        toast({
          title: "Error",
          description: "Selected doctor not found",
          variant: "destructive",
        });
        return;
      }

      await addAppointment({
        patientId: user._id,
        patientName: user.name,
        doctorId: selectedDoctor._id,
        doctorName: selectedDoctor.name,
        date,
        time,
        location: location || "Hospital",
        type: type || "Consultation",
      });

      toast({
        title: "Success!",
        description: "Appointment created successfully",
      });

      setOpen(false);
      setSelectedDoctorId("");
      setDate("");
      setTime("");
      setLocation("");
      setType("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create appointment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Appointments</h1>
              <p className="text-muted-foreground">Book and manage your appointments</p>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-medical-teal">
                  <Calendar className="mr-2 h-4 w-4" />
                  New Appointment
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book New Appointment</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label>Select Doctor *</Label>
                    <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors.map((doctor) => (
                          <SelectItem key={doctor._id} value={doctor._id}>
                            {doctor.name}
                            {doctor.specialization && ` - ${doctor.specialization}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Time *</Label>
                    <Input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>Location</Label>
                    <Input
                      placeholder="Hospital / Online"
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

                  <Button
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Book Appointment"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {appointments.length === 0 ? (
              <p className="text-muted-foreground p-4">No appointments yet.</p>
            ) : (
              appointments.map((apt) => (
                <Card key={apt._id || apt.id} className="border-border/50 hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Dr. {apt.doctorName}</h3>
                          <p className="text-sm text-muted-foreground">{apt.date}</p>

                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" /> {apt.time}
                            </span>
                            <span>{apt.type}</span>
                            <span>{apt.location}</span>
                            <span className="capitalize px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                              {apt.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" /> Join Call
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