import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Pill, FileText, Bell, Clock } from "lucide-react";
import Notifications from "@/components/Notifications";
import { Button } from "@/components/ui/button";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "User");
        fetchDashboardData(user._id, user.token);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchDashboardData = async (patientId: string, token: string) => {
    try {
      // Fetch appointments
      const appointmentsRes = await fetch(`${API_URL}/api/appointments/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const appointmentsData = await appointmentsRes.json();
      setAppointments(appointmentsData || []);

      // Fetch prescriptions
      const prescriptionsRes = await fetch(`${API_URL}/api/prescriptions/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const prescriptionsData = await prescriptionsRes.json();
      setPrescriptions(prescriptionsData || []);

      // Fetch reminders
      const remindersRes = await fetch(`${API_URL}/api/reminders/patient/${patientId}?active=true`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const remindersData = await remindersRes.json();
      setReminders(remindersData || []);

      // Fetch medical records
      const recordsRes = await fetch(`${API_URL}/api/medical-records/patient/${patientId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const recordsData = await recordsRes.json();
      setMedicalRecords(recordsData || []);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const upcomingAppointments = appointments.filter(apt =>
    apt.status === 'confirmed' && new Date(apt.date) > new Date()
  );

  const confirmedAppointments = appointments
    .filter(apt => apt.status === 'confirmed')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  const stats = [
    {
      icon: Calendar,
      label: "Upcoming Appointments",
      value: upcomingAppointments.length.toString(),
      color: "text-primary",
      clickable: true,
      onClick: () => navigate('/patient/appointments')
    },
    {
      icon: Bell,
      label: "Active Reminders",
      value: reminders.length.toString(),
      color: "text-medical-teal",
      clickable: true,
      onClick: () => navigate('/patient/reminders')
    },
    {
      icon: Pill,
      label: "Active Prescriptions",
      value: prescriptions.length.toString(),
      color: "text-health-green",
      clickable: true,
      onClick: () => navigate('/patient/prescriptions')
    },
    {
      icon: FileText,
      label: "Medical Records",
      value: medicalRecords.length.toString(),
      color: "text-purple-600",
      clickable: true,
      onClick: () => navigate('/patient/records')
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {userName}</p>
            </div>
            <Notifications />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className={`border-border/50 ${stat.clickable ? 'cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all' : ''}`}
                onClick={stat.clickable ? stat.onClick : undefined}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{loading ? "..." : stat.value}</p>
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
                <CardTitle>Next Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : nextAppointment ? (
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{nextAppointment.doctorId?.name || nextAppointment.doctorName}</h3>
                        <p className="text-sm text-muted-foreground">{nextAppointment.appointmentType || nextAppointment.type || 'Consultation'}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${nextAppointment.status === 'confirmed'
                        ? 'bg-health-green/10 text-health-green'
                        : 'bg-yellow-500/10 text-yellow-600'
                        }`}>
                        {nextAppointment.status.charAt(0).toUpperCase() + nextAppointment.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(nextAppointment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{nextAppointment.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{nextAppointment.location || 'Hospital'}</p>
                  </div>
                ) : (
                  <>
                    <p className="text-muted-foreground">No upcoming appointments.</p>
                    <Button
                      className="bg-gradient-to-r from-primary to-medical-teal"
                      onClick={() => navigate('/patient/appointments')}
                    >
                      Book Appointment
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-muted-foreground">Loading...</p>
                ) : confirmedAppointments.length > 0 ? (
                  <div className="space-y-3">
                    {confirmedAppointments.map((apt) => (
                      <div key={apt._id} className="flex items-center justify-between p-3 rounded-lg border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{apt.doctorId?.name || apt.doctorName}</p>
                            <p className="text-xs text-muted-foreground">{new Date(apt.date).toLocaleDateString()} • {apt.time}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs bg-health-green/10 text-health-green">
                          Confirmed
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Your health journey starts here.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
