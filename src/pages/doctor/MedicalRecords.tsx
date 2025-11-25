import { useState, useEffect } from "react";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus, User, Phone, Mail } from "lucide-react";
import AddRecordDialog from "@/components/AddRecordDialog";
import { toast } from "sonner";

const MedicalRecords = () => {
  const [patientsWithAppointments, setPatientsWithAppointments] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    fetchPatientsWithAppointments();
  }, []);

  const fetchPatientsWithAppointments = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        setLoading(false);
        return;
      }
      const user = JSON.parse(userStr);

      const res = await fetch(`${API_URL}/api/users/patients/with-appointments`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      if (!res.ok) {
        console.error(`API Error: ${res.status} ${res.statusText}`);
        setPatientsWithAppointments([]);
        toast.error("Failed to load patients");
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Ensure data is an array
      if (Array.isArray(data)) {
        setPatientsWithAppointments(data);
      } else {
        console.error("Unexpected response format:", data);
        setPatientsWithAppointments([]);
        toast.error("Failed to load patients");
      }
    } catch (error) {
      console.error("Error fetching patients with appointments:", error);
      setPatientsWithAppointments([]);
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const handleRecordAdded = () => {
    toast.success("Medical record added! Patient can now view this document.");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Medical Records</h1>
              <p className="text-muted-foreground">Add medical documents for patients with confirmed appointments</p>
            </div>
            <Button
              className="bg-gradient-to-r from-primary to-medical-teal"
              onClick={() => setDialogOpen(true)}
              disabled={loading || patientsWithAppointments.length === 0}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patients with Confirmed Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Loading patients...</p>
              ) : patientsWithAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">No Patients with Confirmed Appointments</h3>
                  <p className="text-muted-foreground mb-4">
                    Medical records can only be added for patients who have confirmed appointments with you.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Go to Appointments page to confirm patient appointments first.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {patientsWithAppointments.map((patient) => (
                    <div
                      key={patient._id}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border/50 hover:shadow-md transition-shadow"
                    >
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold">{patient.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {patient.phone || 'N/A'}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {patient.email}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // Pre-select this patient in dialog if possible
                          setDialogOpen(true);
                        }}
                      >
                        Add Record
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <AddRecordDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        patients={patientsWithAppointments}
        onRecordAdded={handleRecordAdded}
      />
    </div>
  );
};

export default MedicalRecords;
