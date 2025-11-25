import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  Pill,
  FileText,
  Activity,
  Bell,
  Video,
  MessageSquare,
  Settings,
  LogOut,
  Heart,
  Menu,
  X
} from "lucide-react";

const PatientSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // Start open on desktop

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/patient/dashboard" },
    { icon: Calendar, label: "Appointments", path: "/patient/appointments" },
    { icon: MapPin, label: "Emergency Locator", path: "/patient/emergency" },
    { icon: Pill, label: "My Prescriptions", path: "/patient/prescriptions" },
    { icon: FileText, label: "Medical Records", path: "/patient/records" },
    { icon: Activity, label: "Health Monitoring", path: "/patient/monitoring" },
    { icon: Bell, label: "Reminders", path: "/patient/reminders" },
    { icon: Video, label: "Telemedicine", path: "/patient/telemedicine" },
    { icon: MessageSquare, label: "Chatbot", path: "/patient/chatbot" },
    { icon: Settings, label: "Settings", path: "/patient/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/signin";
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Backdrop overlay for mobile when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen
          bg-background border-r border-border
          flex flex-col
          z-40
          transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
          shadow-2xl md:shadow-none
          ${isOpen ? 'w-64 translate-x-0' : 'w-0 md:w-16 -translate-x-full md:translate-x-0'}
        `}
      >
        {/* Header with Hamburger */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          {/* Hamburger Button - Always visible */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-secondary transition-all flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>

          {/* Logo - only show when open */}
          {isOpen && (
            <div className="flex items-center gap-3 overflow-hidden">
              <Heart className="h-8 w-8 text-primary animate-pulse flex-shrink-0" />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-medical-teal bg-clip-text text-transparent whitespace-nowrap">
                  Medora Healthcare
                </h1>
                <p className="text-sm text-muted-foreground">Patient Portal</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation - only show when open */}
        {isOpen && (
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-300 ease-out
                    transform hover:scale-[1.02]
                    ${isActive
                      ? "bg-gradient-to-r from-primary/10 to-medical-teal/10 text-primary border-l-4 border-primary shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:shadow-md"
                    }
                    group relative overflow-hidden
                  `}
                >
                  {/* Liquid hover effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-medical-teal/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                  <Icon className={`h-5 w-5 relative z-10 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'group-hover:scale-110'}`} />
                  <span className={`font-medium relative z-10 transition-all duration-300 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                    {item.label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute right-4 w-2 h-2 bg-primary rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Logout Button - only show when open */}
        {isOpen && (
          <div className="p-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg w-full
                       text-muted-foreground hover:bg-destructive/10 hover:text-destructive
                       transition-all duration-300 transform hover:scale-[1.02]
                       group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-destructive/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <LogOut className="h-5 w-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-medium relative z-10 group-hover:translate-x-1 transition-transform duration-300">Logout</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default PatientSidebar;
