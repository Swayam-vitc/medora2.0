import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Video } from "lucide-react";

const Appointments = () => {
  const appointments = [
    { id: 1, patient: "John Smith", time: "09:00 AM", type: "Checkup", status: "Confirmed" },
    { id: 2, patient: "Sarah Johnson", time: "10:30 AM", type: "Follow-up", status: "Confirmed" },
    { id: 3, patient: "Mike Wilson", time: "02:00 PM", type: "Consultation", status: "Pending" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Appointments</h1>
              <p className="text-muted-foreground">Manage your patient appointments</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-medical-teal">
              <Calendar className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </div>

          <div className="grid gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="border-border/50 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{appointment.patient}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {appointment.time}
                          </span>
                          <span>{appointment.type}</span>
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
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Join Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Appointments;
