import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Phone, Mail } from "lucide-react";

const Patients = () => {
  const patients = [
    { id: 1, name: "John Smith", age: 45, phone: "+1 555-0101", email: "john@email.com", lastVisit: "2024-01-15" },
    { id: 2, name: "Sarah Johnson", age: 32, phone: "+1 555-0102", email: "sarah@email.com", lastVisit: "2024-01-14" },
    { id: 3, name: "Mike Wilson", age: 58, phone: "+1 555-0103", email: "mike@email.com", lastVisit: "2024-01-13" },
    { id: 4, name: "Emily Davis", age: 28, phone: "+1 555-0104", email: "emily@email.com", lastVisit: "2024-01-12" },
  ];

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
            <Button className="bg-gradient-to-r from-primary to-medical-teal">
              Add Patient
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {patients.map((patient) => (
              <Card key={patient.id} className="border-border/50 hover:shadow-lg transition-shadow cursor-pointer">
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
                    Last visit: {patient.lastVisit}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Patients;
