import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement actual signin logic with backend
    // For now, mock different user types
    const isDemoDoctor = formData.email.includes("doctor");
    
    toast({
      title: "Success",
      description: "Signed in successfully!",
    });

    // Navigate based on user type
    if (isDemoDoctor) {
      navigate("/doctor/dashboard");
    } else {
      navigate("/patient/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Medora</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm text-primary"
                  onClick={() => toast({ title: "Feature coming soon!" })}
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-medical-teal"
            >
              Sign In
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto text-primary"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
