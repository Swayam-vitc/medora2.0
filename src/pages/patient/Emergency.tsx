import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Hospital, Ambulance, AlertCircle } from "lucide-react";

const Emergency = () => {
  const nearbyFacilities = [
    { name: "City General Hospital", distance: "2.5 km", phone: "+1 (555) 111-2222", type: "Hospital" },
    { name: "MedCare Clinic", distance: "1.8 km", phone: "+1 (555) 333-4444", type: "Clinic" },
    { name: "Emergency Care Center", distance: "3.2 km", phone: "+1 (555) 555-6666", type: "Emergency" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-destructive" />
              Emergency Services
            </h1>
            <p className="text-muted-foreground">Locate nearby medical facilities and emergency services</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                  <Phone className="h-8 w-8 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Emergency Helpline</h3>
                  <p className="text-3xl font-bold text-destructive mt-2">911</p>
                </div>
                <Button className="w-full bg-destructive hover:bg-destructive/90">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Emergency
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6 text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Ambulance className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Request Ambulance</h3>
                  <p className="text-sm text-muted-foreground mt-2">Get immediate medical transport</p>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary to-medical-teal">
                  <Ambulance className="mr-2 h-4 w-4" />
                  Request Ambulance
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Nearby Medical Facilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nearbyFacilities.map((facility, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Hospital className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{facility.name}</h4>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {facility.distance} away • {facility.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        Directions
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-destructive/10 to-orange-500/10 border-destructive/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2">When to Use Emergency Services</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Chest pain or difficulty breathing</li>
                    <li>Severe bleeding or injury</li>
                    <li>Loss of consciousness</li>
                    <li>Severe allergic reactions</li>
                    <li>Any life-threatening situation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Emergency;
