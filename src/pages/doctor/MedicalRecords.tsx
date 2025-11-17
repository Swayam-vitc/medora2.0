import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FileText, Download, Eye } from "lucide-react";

const MedicalRecords = () => {
  const records = [
    { id: 1, patient: "John Smith", type: "Lab Report", date: "2024-01-15", status: "Complete" },
    { id: 2, patient: "Sarah Johnson", type: "X-Ray", date: "2024-01-14", status: "Complete" },
    { id: 3, patient: "Mike Wilson", type: "Blood Test", date: "2024-01-13", status: "Pending" },
    { id: 4, patient: "Emily Davis", type: "MRI Scan", date: "2024-01-12", status: "Complete" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Medical Records</h1>
            <p className="text-muted-foreground">Access and manage patient medical records</p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search records by patient name or type..." className="pl-10" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {records.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{record.patient}</h4>
                        <p className="text-sm text-muted-foreground">{record.type} • {record.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        record.status === "Complete" 
                          ? "bg-health-green/10 text-health-green" 
                          : "bg-yellow-500/10 text-yellow-600"
                      }`}>
                        {record.status}
                      </span>
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
        </div>
      </main>
    </div>
  );
};

export default MedicalRecords;
