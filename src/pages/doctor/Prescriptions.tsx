import { useState, useEffect } from "react";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Plus, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [newPrescription, setNewPrescription] = useState({
    patientId: "",
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: ""
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const fetchPrescriptions = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);

      const res = await fetch(`${API_URL}/api/prescriptions/doctor/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setPrescriptions(data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
    }
  };

  const fetchPatients = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;
      const res = await fetch(`${API_URL}/api/users/patients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const handleCreatePrescription = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      const res = await fetch(`${API_URL}/api/prescriptions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newPrescription)
      });

      if (res.ok) {
        setOpen(false);
        fetchPrescriptions();
        setNewPrescription({
          patientId: "",
          medication: "",
          dosage: "",
          frequency: "",
          duration: "",
          instructions: ""
        });
      } else {
        alert("Failed to create prescription");
      }
    } catch (error) {
      console.error("Error creating prescription:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Prescriptions</h1>
              <p className="text-muted-foreground">Create and manage patient prescriptions</p>
            </div>

            <Dialog open={open} onOpenChange={(val) => {
              setOpen(val);
              if (val) fetchPatients();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-primary to-medical-teal">
                  <Plus className="mr-2 h-4 w-4" />
                  New Prescription
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Prescription</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Patient</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={newPrescription.patientId}
                      onChange={(e) => setNewPrescription({ ...newPrescription, patientId: e.target.value })}
                    >
                      <option value="">Select Patient</option>
                      {patients.map(p => (
                        <option key={p._id} value={p._id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Medication</Label>
                      <Input
                        placeholder="e.g. Amoxicillin"
                        value={newPrescription.medication}
                        onChange={(e) => setNewPrescription({ ...newPrescription, medication: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Dosage</Label>
                      <Input
                        placeholder="e.g. 500mg"
                        value={newPrescription.dosage}
                        onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Frequency</Label>
                      <Input
                        placeholder="e.g. 3 times daily"
                        value={newPrescription.frequency}
                        onChange={(e) => setNewPrescription({ ...newPrescription, frequency: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        placeholder="e.g. 7 days"
                        value={newPrescription.duration}
                        onChange={(e) => setNewPrescription({ ...newPrescription, duration: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Instructions</Label>
                    <Input
                      placeholder="e.g. Take with food"
                      value={newPrescription.instructions}
                      onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
                    />
                  </div>
                  <Button className="w-full" onClick={handleCreatePrescription}>Create Prescription</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptions.length === 0 ? (
                  <p className="text-muted-foreground">No prescriptions found.</p>
                ) : (
                  prescriptions.map((prescription) => (
                    <Card key={prescription._id} className="border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-4">
                            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center">
                              <Pill className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <div className="space-y-2">
                              <div>
                                <h3 className="font-semibold text-lg">{prescription.patientId?.name || "Unknown Patient"}</h3>
                                <p className="text-sm text-muted-foreground">{new Date(prescription.date).toLocaleDateString()}</p>
                              </div>
                              <div className="grid gap-1">
                                <p className="text-sm"><span className="font-medium">Medication:</span> {prescription.medication}</p>
                                <p className="text-sm"><span className="font-medium">Dosage:</span> {prescription.dosage}</p>
                                <p className="text-sm"><span className="font-medium">Duration:</span> {prescription.duration}</p>
                                <p className="text-sm"><span className="font-medium">Instructions:</span> {prescription.instructions}</p>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Send to Pharmacy
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Prescriptions;
