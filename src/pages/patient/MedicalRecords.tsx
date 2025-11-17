import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Shield } from "lucide-react";

const PatientMedicalRecords = () => {
  const records = [
    { id: 1, type: "Lab Report", doctor: "Dr. Sarah Smith", date: "Jan 15, 2024", category: "Blood Test" },
    { id: 2, type: "X-Ray", doctor: "Dr. Mike Johnson", date: "Jan 10, 2024", category: "Imaging" },
    { id: 3, type: "Consultation Notes", doctor: "Dr. Sarah Smith", date: "Dec 20, 2023", category: "Visit Summary" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">My Medical Records</h1>
            <p className="text-muted-foreground">Access your complete medical history</p>
          </div>

          <Card className="bg-gradient-to-r from-primary/5 to-medical-teal/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">Blockchain Secured</h4>
                  <p className="text-sm text-muted-foreground">
                    Your medical records are encrypted and stored on blockchain technology, 
                    ensuring maximum security and privacy. Only you and authorized healthcare 
                    providers can access this information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{record.type}</h4>
                        <p className="text-sm text-muted-foreground">
                          {record.category} • {record.doctor} • {record.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl font-bold text-medical-teal">8</p>
                <p className="text-sm text-muted-foreground">Lab Reports</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl font-bold text-health-green">12</p>
                <p className="text-sm text-muted-foreground">Consultations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientMedicalRecords;
