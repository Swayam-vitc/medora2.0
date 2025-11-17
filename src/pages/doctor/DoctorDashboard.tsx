import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Activity, AlertCircle } from "lucide-react";

const DoctorDashboard = () => {
  const stats = [
    { icon: Calendar, label: "Today's Appointments", value: "12", color: "text-primary" },
    { icon: Users, label: "Total Patients", value: "248", color: "text-medical-teal" },
    { icon: Activity, label: "Active Monitors", value: "18", color: "text-health-green" },
    { icon: AlertCircle, label: "Pending Reports", value: "5", color: "text-destructive" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Dr. Smith</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-12 w-12 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No appointments scheduled for now.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">All systems normal.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
