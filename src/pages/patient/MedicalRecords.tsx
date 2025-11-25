import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Shield } from "lucide-react";
import { downloadMedicalRecord, downloadAttachment } from "@/utils/downloadUtils";

const PatientMedicalRecords = () => {
  const records = [
    {
      id: 1,
      type: "Lab Report",
      doctor: "Dr. Sarah Smith",
      date: "Jan 15, 2024",
      category: "Blood Test",
      diagnosis: "Complete Blood Count (CBC) - All values within normal range",
      description: "Annual health checkup blood work. Patient shows healthy blood cell counts.",
      attachments: [
        {
          type: "lab_report",
          name: "Blood_Test_Results_Jan2024.pdf",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Sample PDF URL
          uploadDate: new Date("2024-01-15"),
        }
      ]
    },
    {
      id: 2,
      type: "X-Ray",
      doctor: "Dr. Mike Johnson",
      date: "Jan 10, 2024",
      category: "Imaging",
      diagnosis: "Chest X-Ray - No abnormalities detected",
      description: "Routine chest X-ray examination. Lungs are clear, heart size is normal.",
      attachments: [
        {
          type: "xray",
          name: "Chest_XRay_Jan2024.jpg",
          url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Chest_Xray_PA_3-8-2010.png/800px-Chest_Xray_PA_3-8-2010.png", // Sample X-ray image
          uploadDate: new Date("2024-01-10"),
        }
      ]
    },
    {
      id: 3,
      type: "Consultation Notes",
      doctor: "Dr. Sarah Smith",
      date: "Dec 20, 2023",
      category: "Visit Summary",
      diagnosis: "Seasonal Allergies",
      description: "Patient reports mild seasonal allergies. Recommended over-the-counter antihistamines.",
      medications: [
        {
          name: "Cetirizine",
          dosage: "10mg",
          frequency: "Once daily"
        }
      ]
    },
    {
      id: 4,
      type: "Prescription",
      doctor: "Dr. Emily Davis",
      date: "Dec 5, 2023",
      category: "Medication",
      diagnosis: "Hypertension Management",
      description: "Regular blood pressure medication refill. Patient's BP is well controlled.",
      medications: [
        {
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily in the morning"
        },
        {
          name: "Amlodipine",
          dosage: "5mg",
          frequency: "Once daily"
        }
      ],
      attachments: [
        {
          type: "prescription",
          name: "Prescription_Dec2023.pdf",
          url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // Sample prescription PDF
          uploadDate: new Date("2023-12-05"),
        }
      ]
    },
  ];

  const handleDownload = (record: typeof records[0]) => {
    downloadMedicalRecord(record);
  };

  const handleView = (record: typeof records[0]) => {
    // View functionality - could open in modal or new tab
    if (record.attachments && record.attachments.length > 0) {
      window.open(record.attachments[0].url, '_blank');
    } else {
      alert(`Viewing details for ${record.type}\n\nDoctor: ${record.doctor}\nDate: ${record.date}\nDiagnosis: ${record.diagnosis || 'N/A'}`);
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(record)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(record)}
                        title={`Download ${record.type}`}
                      >
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
                <p className="text-3xl font-bold text-primary">{records.length}</p>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl font-bold text-medical-teal">
                  {records.filter(r => r.type === "Lab Report" || r.type === "X-Ray").length}
                </p>
                <p className="text-sm text-muted-foreground">Lab Reports & Imaging</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl font-bold text-health-green">
                  {records.filter(r => r.type === "Consultation Notes").length}
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
