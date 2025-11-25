import { useState, useEffect } from "react";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Phone, Calendar, Clock, X } from "lucide-react";

const Telemedicine = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [jitsiApi, setJitsiApi] = useState<any>(null);

  const upcomingCalls = [
    
  ];

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
      const user = userStr ? JSON.parse(userStr) : { name: "Doctor", _id: "doc" };
      const domain = "meet.jit.si";
      const options = {
        roomName: `medora-consultation-${user._id}`,
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
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Telemedicine</h1>
              <p className="text-muted-foreground">Virtual consultations and video calls</p>
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
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center">
                      <Video className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">Start Instant Call</h3>
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-medical-teal"
                      onClick={startCall}
                    >
                      Start Video Call
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="h-16 w-16 mx-auto rounded-full bg-health-green/10 flex items-center justify-center">
                      <Phone className="h-8 w-8 text-health-green" />
                    </div>
                    <h3 className="font-semibold text-lg">Voice Call</h3>
                    <Button variant="outline" className="w-full" onClick={() => alert("Voice call feature coming soon. Please use Video Call.")}>
                      Start Audio Call
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="h-16 w-16 mx-auto rounded-full bg-trust-blue/10 flex items-center justify-center">
                      <Calendar className="h-8 w-8 text-trust-blue" />
                    </div>
                    <h3 className="font-semibold text-lg">Schedule Call</h3>
                    <Button variant="outline" className="w-full" onClick={() => window.location.href = '/doctor/appointments'}>
                      Schedule Meeting
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Consultations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingCalls.map((call) => (
                      <div
                        key={call.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-secondary/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Video className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{call.patient}</h4>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              {call.time}
                            </p>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-r from-primary to-medical-teal">
                          <Video className="h-4 w-4 mr-2" />
                          Join Call
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Telemedicine;
