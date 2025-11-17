import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Video, 
  FileText, 
  Activity, 
  Shield, 
  Brain,
  Stethoscope,
  Users,
  Pill,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-healthcare.jpg";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Video,
      title: "Telemedicine",
      description: "Connect with healthcare professionals remotely through secure video consultations"
    },
    {
      icon: FileText,
      title: "Digital Records",
      description: "Access your complete medical history anytime, anywhere with blockchain security"
    },
    {
      icon: Activity,
      title: "Health Monitoring",
      description: "Track vitals and chronic conditions with real-time monitoring and alerts"
    },
    {
      icon: Brain,
      title: "AI Disease Analysis",
      description: "Advanced AI-powered diagnosis assistance and health insights"
    },
    {
      icon: Pill,
      title: "E-Prescriptions",
      description: "Digital prescriptions with medication reminders and tracking"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock access to healthcare services and emergency support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-medical-teal bg-clip-text text-transparent">
              Medora Healthcare
            </h1>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/signin")}
              className="hover:bg-secondary"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-primary to-medical-teal hover:opacity-90"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-medical-teal/5 to-accent/10" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Stethoscope className="h-4 w-4" />
                Healthcare for Rural Communities
              </div>
              <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
                Quality Healthcare,{" "}
                <span className="bg-gradient-to-r from-primary to-medical-teal bg-clip-text text-transparent">
                  Accessible to All
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Breaking barriers in healthcare delivery with cutting-edge telemedicine, 
                AI-powered diagnostics, and secure digital health records. Bringing world-class 
                medical care to rural communities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="bg-gradient-to-r from-primary to-medical-teal hover:opacity-90 shadow-lg"
                >
                  Get Started
                  <Users className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate("/signin")}
                  className="shadow-lg"
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img 
                src={heroImage}
                alt="Healthcare Technology"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-4xl font-bold">Comprehensive Healthcare Solutions</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empowering patients and doctors with modern technology and seamless experiences
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold">{feature.title}</h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-medical-teal text-primary-foreground border-0 shadow-2xl">
            <CardContent className="p-12 text-center space-y-6">
              <Shield className="h-16 w-16 mx-auto" />
              <h3 className="text-4xl font-bold">Ready to Transform Healthcare?</h3>
              <p className="text-lg max-w-2xl mx-auto opacity-90">
                Join thousands of patients and healthcare providers already using Medora Healthcare 
                to deliver and receive quality medical care.
              </p>
              <Button 
                size="lg"
                onClick={() => navigate("/signup")}
                className="bg-background text-foreground hover:bg-background/90 shadow-lg"
              >
                Start Your Journey
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-semibold">Medora Healthcare</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Medora Healthcare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
