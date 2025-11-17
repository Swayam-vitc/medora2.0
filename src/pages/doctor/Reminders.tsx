import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Clock } from "lucide-react";

const Reminders = () => {
  const reminders = [
    { id: 1, title: "Follow-up with John Smith", time: "10:00 AM", date: "Today", priority: "High" },
    { id: 2, title: "Review lab results - Sarah Johnson", time: "02:00 PM", date: "Today", priority: "Medium" },
    { id: 3, title: "Patient consultation - Mike Wilson", time: "09:00 AM", date: "Tomorrow", priority: "High" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Reminders</h1>
              <p className="text-muted-foreground">Manage your tasks and reminders</p>
            </div>
            <Button className="bg-gradient-to-r from-primary to-medical-teal">
              <Plus className="mr-2 h-4 w-4" />
              Add Reminder
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{reminder.title}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {reminder.time} • {reminder.date}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      reminder.priority === "High" 
                        ? "bg-destructive/10 text-destructive" 
                        : "bg-yellow-500/10 text-yellow-600"
                    }`}>
                      {reminder.priority}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Reminders;
