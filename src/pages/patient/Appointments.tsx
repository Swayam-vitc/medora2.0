import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Plus } from "lucide-react";

const PatientAppointments = () => {
  const appointments = [
    { id: 1, doctor: "Dr. Sarah Smith", specialty: "Cardiologist", date: "Jan 20, 2024", time: "10:00 AM", status: "Confirmed" },
    { id: 2, doctor: "Dr. Mike Johnson", specialty: "General Physician", date: "Jan 25, 2024", time: "02:30 PM", status: "Pending" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Appointments</h1>
              <p className="text-muted-foreground">View and manage your appointments</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-medical-teal">
              <Plus className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </div>

          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center">
                        <User className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {appointment.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        appointment.status === "Confirmed" 
                          ? "bg-health-green/10 text-health-green" 
                          : "bg-yellow-500/10 text-yellow-600"
                      }`}>
                        {appointment.status}
                      </span>
                      <Button variant="outline" size="sm">Reschedule</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Book a New Appointment</CardTitle>
            </CardHeader>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">Select a doctor and time slot to book your appointment</p>
              <Button className="bg-gradient-to-r from-primary to-medical-teal">
                Browse Doctors
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PatientAppointments;
