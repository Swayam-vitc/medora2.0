import { useState, useEffect } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Calendar, User, Bell } from "lucide-react";
import ReminderDialog from "@/components/ReminderDialog";
import { toast } from "sonner";

const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const fetchPrescriptions = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);

      const res = await fetch(`${API_URL}/api/prescriptions/patient/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const fetchReminders = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);

      const res = await fetch(`${API_URL}/api/reminders/patient/${user._id}?active=true`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setReminders(data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
    fetchReminders();
  }, []);

  const handleSetReminder = (prescription: any) => {
    setSelectedPrescription(prescription);
    setDialogOpen(true);
  };

  const handleReminderCreated = () => {
    fetchReminders();
    toast.success("Reminder created! You'll be notified at the scheduled times.");
  };

  // Check if prescription has an active reminder
  const prescriptionHasReminder = (prescriptionId: string) => {
    return reminders.some(r => r.prescriptionId === prescriptionId);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">My Prescriptions</h1>
            <p className="text-muted-foreground">View and track your medications</p>
          </div>

          <div className="grid gap-4">
            {prescriptions.length === 0 ? (
              <p className="text-muted-foreground">No prescriptions found.</p>
            ) : (
              prescriptions.map((prescription) => (
                <Card key={prescription._id} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center flex-shrink-0">
                          <Pill className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <div>
                            <h3 className="font-semibold text-lg">{prescription.medication}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Prescribed by {prescription.doctorId?.name || "Doctor"}
                            </p>
                          </div>
                          <div className="grid gap-1">
                            <p className="text-sm"><span className="font-medium">Dosage:</span> {prescription.dosage}</p>
                            <p className="text-sm"><span className="font-medium">Frequency:</span> {prescription.frequency}</p>
                            <p className="text-sm"><span className="font-medium">Duration:</span> {prescription.duration}</p>
                            {prescription.instructions && (
                              <p className="text-sm"><span className="font-medium">Instructions:</span> {prescription.instructions}</p>
                            )}
                            <p className="text-sm flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Started: {new Date(prescription.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1 rounded-full text-xs bg-health-green/10 text-health-green">
                          Active
                        </span>
                        {prescriptionHasReminder(prescription._id) ? (
                          <Button
                            variant="outline"
                            size="sm"
                            disabled
                            className="w-full"
                          >
                            <Bell className="h-4 w-4 mr-2" />
                            Reminder Set
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetReminder(prescription)}
                            className="w-full"
                          >
                            <Bell className="h-4 w-4 mr-2" />
                            Set Reminder
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Medication Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  {reminders.length > 0
                    ? `You have ${reminders.length} active medication reminder${reminders.length !== 1 ? 's' : ''}.`
                    : "Set up reminders to never miss your medications"
                  }
                </p>
                {reminders.length > 0 && (
                  <Button
                    variant="link"
                    className="px-0"
                    onClick={() => window.location.href = '/patient/reminders'}
                  >
                    View all reminders →
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {selectedPrescription && (
        <ReminderDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          prescription={selectedPrescription}
          onReminderCreated={handleReminderCreated}
        />
      )}
    </div>
  );
};

export default PatientPrescriptions;
