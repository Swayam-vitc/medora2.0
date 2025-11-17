import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity, Droplet, Thermometer } from "lucide-react";

const PatientMonitoring = () => {
  const vitals = {
    heartRate: { value: 72, unit: "bpm", status: "Normal", icon: Heart, color: "text-red-500" },
    bloodPressure: { value: "120/80", unit: "mmHg", status: "Normal", icon: Activity, color: "text-primary" },
    oxygen: { value: 98, unit: "%", status: "Normal", icon: Droplet, color: "text-medical-teal" },
    temperature: { value: 98.6, unit: "°F", status: "Normal", icon: Thermometer, color: "text-orange-500" },
  };

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Health Monitoring</h1>
            <p className="text-muted-foreground">Track your vital signs and health metrics</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(vitals).map(([key, vital]) => (
              <Card key={key} className="border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <vital.icon className={`h-10 w-10 ${vital.color}`} />
                      <span className="px-3 py-1 rounded-full text-xs bg-health-green/10 text-health-green">
                        {vital.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-3xl font-bold mt-1">
                        {vital.value}<span className="text-lg text-muted-foreground ml-1">{vital.unit}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Health Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Vital signs chart visualization coming soon</p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm">Morning vitals recorded</span>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm">Blood pressure normal</span>
                    <span className="text-xs text-muted-foreground">5 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm">Daily health check</span>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Devices</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect wearable devices to automatically track your health metrics
                </p>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg border border-border/50 text-sm">
                    No devices connected yet
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientMonitoring;
