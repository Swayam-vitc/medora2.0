import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, Plus, Send } from "lucide-react";

const Prescriptions = () => {
  const prescriptions = [
    { id: 1, patient: "John Smith", medication: "Amoxicillin 500mg", dosage: "3 times daily", duration: "7 days", date: "2024-01-15" },
    { id: 2, patient: "Sarah Johnson", medication: "Lisinopril 10mg", dosage: "Once daily", duration: "30 days", date: "2024-01-14" },
    { id: 3, patient: "Mike Wilson", medication: "Metformin 500mg", dosage: "Twice daily", duration: "90 days", date: "2024-01-13" },
  ];

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
            <Button className="bg-gradient-to-r from-primary to-medical-teal">
              <Plus className="mr-2 h-4 w-4" />
              New Prescription
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <Card key={prescription.id} className="border-border/50">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center">
                            <Pill className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <div className="space-y-2">
                            <div>
                              <h3 className="font-semibold text-lg">{prescription.patient}</h3>
                              <p className="text-sm text-muted-foreground">{prescription.date}</p>
                            </div>
                            <div className="grid gap-1">
                              <p className="text-sm"><span className="font-medium">Medication:</span> {prescription.medication}</p>
                              <p className="text-sm"><span className="font-medium">Dosage:</span> {prescription.dosage}</p>
                              <p className="text-sm"><span className="font-medium">Duration:</span> {prescription.duration}</p>
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Prescriptions;
