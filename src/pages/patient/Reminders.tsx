import { useState, useEffect, useRef } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Plus, Clock, Pill, Calendar, CheckCircle } from "lucide-react";
import NotificationManager from "@/utils/notificationManager";
import CustomReminderDialog from "@/components/CustomReminderDialog";
import { toast } from "sonner";

const PatientReminders = () => {
  const [reminders, setReminders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState<string>('default');
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    fetchReminders();
    checkNotificationPermission();

    // Request notification permission on page load
    requestNotificationPermission();

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        NotificationManager.stopReminderChecker(intervalRef.current);
      }
    };
  }, []);

  const checkNotificationPermission = () => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  };

  const requestNotificationPermission = async () => {
    const granted = await NotificationManager.requestPermission();
    if (granted) {
      setNotificationPermission('granted');
      toast.success('Notification permission granted! You\'ll receive medication reminders.');
    }
  };

  const fetchReminders = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);

      const res = await fetch(`${API_URL}/api/reminders/today/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setReminders(data);

      // Start notification checker with fetched reminders
      if (intervalRef.current) {
        NotificationManager.stopReminderChecker(intervalRef.current);
      }
      intervalRef.current = NotificationManager.startReminderChecker(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      toast.error("Failed to load reminders");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkDone = async (reminderId: string, time: string) => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);

      const res = await fetch(`${API_URL}/api/reminders/${reminderId}/done`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`,
        },
        body: JSON.stringify({ time }),
      });

      if (!res.ok) {
        throw new Error("Failed to mark reminder as done");
      }

      toast.success("Reminder marked as done!");
      fetchReminders(); // Refresh data
    } catch (error) {
      console.error("Error marking reminder as done:", error);
      toast.error("Failed to mark reminder as done");
    }
  };

  // Get current time to check which reminders are due
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // Organize reminders by status
  const organizeReminders = () => {
    const now = new Date();
    const currentTime = getCurrentTime();
    const today = now.toISOString().split('T')[0];

    const todayReminders: any[] = [];
    const upcomingReminders: any[] = [];
    const completedReminders: any[] = [];

    reminders.forEach(reminder => {
      reminder.reminderTimes.forEach((time: string) => {
        const isCompleted = reminder.todayCompleted?.includes(time);
        const isPast = time < currentTime;

        const reminderItem = {
          ...reminder,
          specificTime: time,
          isCompleted,
          isPast,
        };

        if (isCompleted) {
          completedReminders.push(reminderItem);
        } else if (isPast) {
          todayReminders.push(reminderItem);
        } else {
          upcomingReminders.push(reminderItem);
        }
      });
    });

    return { todayReminders, upcomingReminders, completedReminders };
  };

  const { todayReminders, upcomingReminders, completedReminders } = organizeReminders();
  const allTodayReminders = [...todayReminders, ...upcomingReminders];

  // Count stats
  const activeMedicationReminders = reminders.length;
  const totalRemindersToday = reminders.reduce((acc, r) => acc + r.reminderTimes.length, 0);

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
            <div className="flex gap-2">
              {notificationPermission !== 'granted' && (
                <Button
                  variant="outline"
                  onClick={requestNotificationPermission}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Enable Notifications
                </Button>
              )}
              <Button
                className="bg-gradient-to-r from-primary to-medical-teal"
                onClick={() => setCustomDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Today's Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading reminders...</p>
              ) : allTodayReminders.length === 0 ? (
                <div className="text-center py-8">
                  <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No reminders for today</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click "Add Reminder" above to create medication, yoga, break, or custom reminders
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allTodayReminders.map((reminder) => (
                    <div
                      key={`${reminder._id}-${reminder.specificTime}`}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${reminder.isCompleted
                          ? 'bg-health-green/10'
                          : 'bg-primary/10'
                          }`}>
                          <Pill className={`h-6 w-6 ${reminder.isCompleted
                            ? 'text-health-green'
                            : 'text-primary'
                            }`} />
                        </div>
                        <div>
                          <h4 className="font-semibold">{reminder.medicationName}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            {reminder.specificTime} • {reminder.frequency}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {reminder.isCompleted ? (
                          <div className="flex items-center gap-2 text-health-green">
                            <CheckCircle className="h-5 w-5" />
                            <span className="text-sm font-medium">Done</span>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleMarkDone(reminder._id, reminder.specificTime)}
                          >
                            Mark Done
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {completedReminders.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Completed Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedReminders.map((reminder) => (
                    <div
                      key={`${reminder._id}-${reminder.specificTime}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-border/50 opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-health-green/10 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-health-green" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{reminder.medicationName}</p>
                          <p className="text-xs text-muted-foreground">{reminder.specificTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <Pill className="h-8 w-8 mx-auto text-primary" />
                <p className="font-medium">Medication Reminders</p>
                <p className="text-2xl font-bold">{activeMedicationReminders}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <Calendar className="h-8 w-8 mx-auto text-medical-teal" />
                <p className="font-medium">Today's Reminders</p>
                <p className="text-2xl font-bold">{totalRemindersToday}</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <Bell className="h-8 w-8 mx-auto text-health-green" />
                <p className="font-medium">Completed</p>
                <p className="text-2xl font-bold">{completedReminders.length}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <CustomReminderDialog
        open={customDialogOpen}
        onOpenChange={setCustomDialogOpen}
        onReminderCreated={fetchReminders}
      />
    </div>
  );
};

export default PatientReminders;
