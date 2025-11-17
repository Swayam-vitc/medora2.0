import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Heart, Thermometer, Droplet } from "lucide-react";

const Monitoring = () => {
  const patients = [
    { name: "John Smith", heartRate: 72, bloodPressure: "120/80", temperature: 98.6, oxygen: 98, status: "Normal" },
    { name: "Sarah Johnson", heartRate: 85, bloodPressure: "135/85", temperature: 99.1, oxygen: 97, status: "Monitor" },
    { name: "Mike Wilson", heartRate: 68, bloodPressure: "118/75", temperature: 98.4, oxygen: 99, status: "Normal" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Health Monitoring</h1>
            <p className="text-muted-foreground">Real-time patient vital signs monitoring</p>
          </div>

          <div className="grid gap-6">
            {patients.map((patient, index) => (
              <Card key={index} className="border-border/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{patient.name}</CardTitle>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      patient.status === "Normal" 
                        ? "bg-health-green/10 text-health-green" 
                        : "bg-yellow-500/10 text-yellow-600"
                    }`}>
                      {patient.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                      <Heart className="h-8 w-8 text-red-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Heart Rate</p>
                        <p className="text-xl font-bold">{patient.heartRate} bpm</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                      <Activity className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Blood Pressure</p>
                        <p className="text-xl font-bold">{patient.bloodPressure}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                      <Thermometer className="h-8 w-8 text-orange-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Temperature</p>
                        <p className="text-xl font-bold">{patient.temperature}°F</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50">
                      <Droplet className="h-8 w-8 text-medical-teal" />
                      <div>
                        <p className="text-sm text-muted-foreground">Oxygen</p>
                        <p className="text-xl font-bold">{patient.oxygen}%</p>
                      </div>
                    </div>
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

export default Monitoring;
