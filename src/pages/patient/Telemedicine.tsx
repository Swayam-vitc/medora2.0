import { useState, useEffect } from "react";
import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Clock, Calendar, User, X } from "lucide-react";

const PatientTelemedicine = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [jitsiApi, setJitsiApi] = useState<any>(null);

  const consultations: any[] = [];

  useEffect(() => {
    // Load Jitsi script
    if (!document.getElementById("jitsi-script")) {
      const script = document.createElement("script");
      script.id = "jitsi-script";
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const startCall = () => {
    setIsCallActive(true);
    setTimeout(() => {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : { name: "Patient", _id: "guest" };
      const domain = "meet.jit.si";
      const options = {
        roomName: `medora-consultation-guest`, // In real app, this would be dynamic or doctor-specific
        width: "100%",
        height: 600,
        parentNode: document.getElementById("jitsi-container"),
        userInfo: {
          displayName: user.name
        },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false
        }
      };
      // @ts-ignore
      const api = new window.JitsiMeetExternalAPI(domain, options);
      setJitsiApi(api);

      api.addEventListeners({
        videoConferenceLeft: () => {
          handleEndCall();
        }
      });
    }, 100);
  };

  const handleEndCall = () => {
    if (jitsiApi) {
      jitsiApi.dispose();
      setJitsiApi(null);
    }
    setIsCallActive(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Telemedicine</h1>
              <p className="text-muted-foreground">Connect with healthcare providers remotely</p>
            </div>
            {isCallActive && (
              <Button variant="destructive" onClick={handleEndCall}>
                <X className="mr-2 h-4 w-4" /> End Call
              </Button>
            )}
          </div>

          {isCallActive ? (
            <Card className="overflow-hidden border-border/50">
              <div id="jitsi-container" className="w-full h-[600px] bg-black/5" />
            </Card>
          ) : (
            <>
              <Card className="bg-gradient-to-r from-primary/10 to-medical-teal/10 border-primary/20">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center">
                    <Video className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Start Instant Consultation</h3>
                    <p className="text-muted-foreground mt-2">Connect with available doctors right now</p>
                  </div>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-medical-teal"
                    onClick={startCall}
                  >
                    <Video className="mr-2 h-5 w-5" />
                    Start Video Call
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  {consultations.length > 0 ? (
                    <div className="space-y-3">
                      {consultations.map((consultation) => (
                        <div
                          key={consultation.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center">
                              <User className="h-7 w-7 text-primary-foreground" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{consultation.doctor}</h4>
                              <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {consultation.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {consultation.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button className="bg-gradient-to-r from-primary to-medical-teal">
                            <Video className="h-4 w-4 mr-2" />
                            Join Call
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No upcoming consultations</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Past Consultations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center py-4">No past consultations</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>How It Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">1</div>
                        <p>Book or start an instant consultation</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">2</div>
                        <p>Connect via secure video call</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary">3</div>
                        <p>Receive diagnosis and e-prescription</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PatientTelemedicine;
