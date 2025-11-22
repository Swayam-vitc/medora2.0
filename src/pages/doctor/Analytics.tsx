import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// Patient visit trends
const visitData = [
  { month: "Jan", visits: 120 },
  { month: "Feb", visits: 150 },
  { month: "Mar", visits: 180 },
  { month: "Apr", visits: 160 },
  { month: "May", visits: 210 },
  { month: "Jun", visits: 200 },
];

// Common Diagnoses Chart Data
const diseaseData = [
  { name: "Flu", value: 40 },
  { name: "Diabetes", value: 25 },
  { name: "Hypertension", value: 20 },
  { name: "Asthma", value: 15 },
];

// Treatment Success Rates Chart Data
const treatmentData = [
  { name: "Cardiology", success: 92 },
  { name: "Neurology", success: 88 },
  { name: "Orthopedics", success: 95 },
  { name: "Pediatrics", success: 90 },
];

// Custom Chart Colors (Matching UI Theme)
const COLORS = ["#0EA5E9", "#14B8A6", "#8B5CF6", "#F59E0B"];

const Analytics = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Insights and data visualization</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Patients</p>
                    <p className="text-3xl font-bold mt-2">210</p>
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

          {/* Line Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Visit Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" strokeWidth={3} dot />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Two Side Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Common Disease Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Common Diagnoses</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={diseaseData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {diseaseData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Treatment Success Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Treatment Success Rates</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={treatmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Bar dataKey="success" radius={[4, 4, 0, 0]}>
                      {treatmentData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;