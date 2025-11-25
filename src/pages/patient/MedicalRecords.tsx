import { useState, useEffect } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Shield } from "lucide-react";
import { downloadMedicalRecord } from "@/utils/downloadUtils";
import { toast } from "sonner";

const PatientMedicalRecords = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) return;
      const user = JSON.parse(userStr);

      const res = await fetch(`${API_URL}/api/medical-records/patient/${user._id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      const data = await res.json();
      setRecords(data);
    } catch (error) {
      console.error("Error fetching medical records:", error);
      toast.error("Failed to load medical records");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (record: any) => {
    downloadMedicalRecord(record);
  };

  const handleView = (record: any) => {
    // View functionality - could open in modal or new tab
    if (record.attachments && record.attachments.length > 0) {
      window.open(record.attachments[0].url, '_blank');
    } else {
      alert(`Viewing details for ${record.recordType}\n\nDoctor: ${record.doctorId?.name || 'N/A'}\nDate: ${new Date(record.visitDate).toLocaleDateString()}\nDiagnosis: ${record.diagnosis || 'N/A'}`);
    }
  };

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
              {loading ? (
                <p className="text-muted-foreground">Loading medical records...</p>
              ) : records.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No medical records found</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your doctor will add medical records after consultations
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {records.map((record) => (
                    <div
                      key={record._id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{record.recordType}</h4>
                          <p className="text-sm text-muted-foreground">
                            {record.diagnosis} • Dr. {record.doctorId?.name || 'Unknown'} • {new Date(record.visitDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(record)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        {record.attachments && record.attachments.length > 0 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(record)}
                            title={`Download ${record.recordType}`}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl font-bold text-primary">{records.length}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl font-bold text-medical-teal">
                  {records.filter(r => r.recordType === "Lab Report" || r.recordType === "X-Ray").length}
                </p>
                <p className="text-sm text-muted-foreground">Lab Reports & Imaging</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl font-bold text-health-green">
                  {records.filter(r => r.recordType === "Consultation Notes").length}
                </p>
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
