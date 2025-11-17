import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Clock, Pill, Calendar } from "lucide-react";

const PatientReminders = () => {
  const reminders = [
    { id: 1, title: "Take Amoxicillin", time: "08:00 AM", type: "Medication", icon: Pill, priority: "High" },
    { id: 2, title: "Doctor Appointment", time: "10:00 AM", type: "Appointment", icon: Calendar, priority: "High" },
    { id: 3, title: "Take Vitamin D3", time: "12:00 PM", type: "Medication", icon: Pill, priority: "Medium" },
    { id: 4, title: "Evening Walk", time: "06:00 PM", type: "Activity", icon: Clock, priority: "Low" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Reminders</h1>
              <p className="text-muted-foreground">Manage your health reminders and tasks</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-medical-teal">
              <Plus className="mr-2 h-4 w-4" />
              Add Reminder
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Today's Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <reminder.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{reminder.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {reminder.time} • {reminder.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        reminder.priority === "High" 
                          ? "bg-destructive/10 text-destructive" 
                          : reminder.priority === "Medium"
                          ? "bg-yellow-500/10 text-yellow-600"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {reminder.priority}
                      </span>
                      <Button variant="outline" size="sm">Mark Done</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50 cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-2">
                <Pill className="h-8 w-8 mx-auto text-primary" />
                <p className="font-medium">Medication Reminders</p>
                <p className="text-2xl font-bold">3</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-2">
                <Calendar className="h-8 w-8 mx-auto text-medical-teal" />
                <p className="font-medium">Appointments</p>
                <p className="text-2xl font-bold">2</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center space-y-2">
                <Bell className="h-8 w-8 mx-auto text-health-green" />
                <p className="font-medium">Active Reminders</p>
                <p className="text-2xl font-bold">8</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientReminders;
