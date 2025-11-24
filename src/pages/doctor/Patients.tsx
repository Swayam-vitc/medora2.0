import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Phone, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Patients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
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
    fetchPatients();
  }, []);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
  });

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  const handleSubmit = () => {
    if (!newPatient.name.trim()) return;

    const patient = {
      id: Date.now().toString(),
      name: newPatient.name,
      age: newPatient.age,
      phone: newPatient.phone,
      email: newPatient.email,
      lastVisit: "New Patient",
    };

    setPatients([...patients, patient]);

    closeDialog();
    setNewPatient({ name: "", age: "", phone: "", email: "" });
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
                          <p className="text-sm text-muted-foreground">Age: {patient.age}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {patient.phone}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {patient.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                    Last visit: {patient.createdAt ? new Date(patient.createdAt).toLocaleDateString() : "N/A"}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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