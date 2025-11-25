import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Phone, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Pill } from "lucide-react";

const Patients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'details'>('list');

  // Form state for new record
  const [newRecord, setNewRecord] = useState({
    diagnosis: "",
    medications: "", // Comma separated for simplicity in this UI
    description: "",
  });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const fetchPatients = async () => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      const res = await fetch(`${API_URL}/api/users/patients`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchMedicalRecords = async (patientId: string) => {
    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;
      const res = await fetch(`${API_URL}/api/medical-records/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setMedicalRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    fetchMedicalRecords(patient._id);
    setViewMode('details');
  };

  const handleAddRecord = async () => {
    if (!selectedPatient || !newRecord.diagnosis) return;

    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      // Parse medications string into array
      const medsArray = newRecord.medications.split(',').map(m => ({
        name: m.trim(),
        dosage: "As directed", // Default for now
        frequency: "Daily" // Default for now
      })).filter(m => m.name);

      const res = await fetch(`${API_URL}/api/medical-records`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          patientId: selectedPatient._id,
          diagnosis: newRecord.diagnosis,
          description: newRecord.description,
          medications: medsArray
        })
      });

      if (res.ok) {
        fetchMedicalRecords(selectedPatient._id);
        setNewRecord({ diagnosis: "", medications: "", description: "" });
        // Close dialog if open (handled by UI trigger usually, but we might need manual close if using custom dialog)
      }
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const handleSubmit = async () => {
    if (!newPatient.name.trim() || !newPatient.email.trim()) {
      alert("Name and Email are required");
      return;
    }

    try {
      const userStr = localStorage.getItem("user");
      const token = userStr ? JSON.parse(userStr).token : null;

      const res = await fetch(`${API_URL}/api/users/patients`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPatient),
      });

      if (res.ok) {
        fetchPatients(); // Refresh list
        closeDialog();
        setNewPatient({ name: "", age: "", phone: "", email: "" });
      } else {
        const data = await res.json();
        alert(data.message || "Failed to add patient");
      }
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("Error adding patient");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Patients</h1>
            <p className="text-muted-foreground">View and manage your patient list</p>
          </div>

          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search patients..." className="pl-10" />
            </div>
            <Button
              onClick={openDialog}
              className="bg-gradient-to-r from-primary to-medical-teal"
            >
              Add Patient
            </Button>
          </div>

          {viewMode === 'list' ? (
            <div className="grid md:grid-cols-2 gap-4">
              {patients.map((patient) => (
                <Card key={patient._id} className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center">
                          <User className="h-7 w-7 text-primary-foreground" />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h3 className="font-semibold text-lg">{patient.name}</h3>
                            <p className="text-sm text-muted-foreground">Age: {patient.age || 'N/A'}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {patient.phone || 'N/A'}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {patient.email}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleViewPatient(patient)}>View</Button>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                      Last visit: {patient.createdAt ? new Date(patient.createdAt).toLocaleDateString() : "N/A"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              <Button variant="outline" onClick={() => setViewMode('list')}>&larr; Back to List</Button>

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedPatient?.name}</h2>
                  <p className="text-muted-foreground">Patient History & Records</p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-primary to-medical-teal">
                      <Plus className="mr-2 h-4 w-4" /> Add Record
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Medical Record</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label>Diagnosis</Label>
                        <Input
                          placeholder="e.g. Hypertension"
                          value={newRecord.diagnosis}
                          onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Medications (comma separated)</Label>
                        <Input
                          placeholder="e.g. Lisinopril 10mg, Aspirin"
                          value={newRecord.medications}
                          onChange={(e) => setNewRecord({ ...newRecord, medications: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description / Notes</Label>
                        <Textarea
                          placeholder="Visit details, observations..."
                          value={newRecord.description}
                          onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                        />
                      </div>
                      <Button className="w-full" onClick={handleAddRecord}>Save Record</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {medicalRecords.length === 0 ? (
                  <p className="text-muted-foreground">No medical records found.</p>
                ) : (
                  medicalRecords.map((record) => (
                    <Card key={record._id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-primary">{record.diagnosis}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(record.visitDate).toLocaleDateString()} at {new Date(record.visitDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <div className="bg-primary/10 p-2 rounded-full">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          {record.description && (
                            <div className="bg-muted/30 p-3 rounded-md text-sm">
                              {record.description}
                            </div>
                          )}

                          {record.medications && record.medications.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                                <Pill className="h-4 w-4" /> Prescriptions
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {record.medications.map((med: any, idx: number) => (
                                  <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-sm border border-blue-100">
                                    {med.name} - {med.dosage}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Simple Add Patient Dialog */}
        <dialog ref={dialogRef} className="rounded-lg p-6">
          <h2 className="text-lg font-bold mb-4">Add Patient</h2>

          <div className="space-y-3">
            <Input
              placeholder="Full Name"
              value={newPatient.name}
              onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
            />
            <Input
              placeholder="Age"
              type="number"
              value={newPatient.age}
              onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
            />
            <Input
              placeholder="Phone Number"
              value={newPatient.phone}
              onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newPatient.email}
              onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={closeDialog}>Cancel</Button>
            <Button
              className="bg-gradient-to-r from-primary to-medical-teal"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </dialog>
      </main>
    </div>
  );
};

export default Patients;