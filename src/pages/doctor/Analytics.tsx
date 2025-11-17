import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";

const Analytics = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Insights and data visualization</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-3xl font-bold mt-2">248</p>
                    <p className="text-xs text-health-green flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3" />
                      +12% from last month
                    </p>
                  </div>
                  <Users className="h-12 w-12 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Consultations</p>
                    <p className="text-3xl font-bold mt-2">156</p>
                    <p className="text-xs text-health-green flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3" />
                      +8% from last month
                    </p>
                  </div>
                  <Activity className="h-12 w-12 text-medical-teal" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-3xl font-bold mt-2">94%</p>
                    <p className="text-xs text-health-green flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3" />
                      +3% from last month
                    </p>
                  </div>
                  <BarChart3 className="h-12 w-12 text-health-green" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Response</p>
                    <p className="text-3xl font-bold mt-2">15m</p>
                    <p className="text-xs text-health-green flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3" />
                      Improved by 5m
                    </p>
                  </div>
                  <Activity className="h-12 w-12 text-trust-blue" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patient Visit Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Chart visualization coming soon</p>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Common Diagnoses</CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center">
                <p className="text-muted-foreground">Data visualization coming soon</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treatment Success Rates</CardTitle>
              </CardHeader>
              <CardContent className="h-48 flex items-center justify-center">
                <p className="text-muted-foreground">Data visualization coming soon</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
