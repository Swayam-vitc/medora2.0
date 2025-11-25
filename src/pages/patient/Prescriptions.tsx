import { useState, useEffect } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill, Calendar, User } from "lucide-react";

const PatientPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
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

  useEffect(() => {
    fetchPrescriptions();
  }, []);

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
                      <div className="flex gap-4">
                        <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center flex-shrink-0">
                          <Pill className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg">{prescription.medication}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <User className="h-3 w-3" />
                              Prescribed by {prescription.doctorId?.name || "Doctor"}
                            </p>
                          </div>
                          <div className="grid gap-1">
                            <p className="text-sm"><span className="font-medium">Dosage:</span> {prescription.dosage}</p>
                            <p className="text-sm"><span className="font-medium">Duration:</span> {prescription.duration}</p>
                            <p className="text-sm"><span className="font-medium">Instructions:</span> {prescription.instructions}</p>
                            <p className="text-sm flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Started: {new Date(prescription.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs bg-health-green/10 text-health-green">
                        Active
                      </span>
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
              <p className="text-muted-foreground">Set up reminders to never miss your medications</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PatientPrescriptions;
