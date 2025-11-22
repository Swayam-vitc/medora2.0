import { useState } from "react";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Upload, Zap, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AIAnalysis = () => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast({ title: "No symptoms entered", description: "Please enter symptoms first!" });
      return;
    }

    setLoading(true);
    setAnalysis("");

    try {
      // Replace this with your backend AI API route
      const response = await fetch("/api/analyze-symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      const data = await response.json();
      setAnalysis(data.result || "No insights found");
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to analyze symptoms." });
    }
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const analyzeImage = async () => {
    if (!image) {
      toast({ title: "No image selected", description: "Upload a medical image first!" });
      return;
    }

    setLoading(true);
    setAnalysis("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setAnalysis(data.result || "No insights found");
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to analyze image." });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              AI Disease Analysis
            </h1>
            <p className="text-muted-foreground">Advanced AI-powered diagnostic assistance</p>
          </div>

          {/* Symptom + Image Analyzer */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Symptoms */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Symptom Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Enter patient symptoms, medical history, and observations..."
                  className="min-h-[200px]"
                />
                <Button onClick={analyzeSymptoms} disabled={loading} className="w-full bg-gradient-to-r from-primary to-medical-teal">
                  {loading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : (
                    <Zap className="mr-2 h-4 w-4" />
                  )}
                  Analyze Symptoms
                </Button>
              </CardContent>
            </Card>

            {/* Image */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Medical Image Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">Upload X-Ray, CT Scan, or MRI images</p>
                  <p className="text-xs text-muted-foreground mt-2">Supported: JPG, PNG, DICOM</p>
                </label>

                {preview && (
                  <img src={preview} alt="preview" className="rounded-lg border w-full h-40 object-cover" />
                )}

                <Button variant="outline" className="w-full" onClick={analyzeImage} disabled={loading}>
                  {loading ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  Analyze Image
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-6 space-y-4 text-muted-foreground">
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <Loader2 className="animate-spin h-6 w-6" /> Processing...
                  </div>
                ) : analysis ? (
                  <p className="text-left whitespace-pre-wrap text-primary font-medium">{analysis}</p>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p>AI analysis results will appear here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <Card className="bg-gradient-to-r from-primary/5 to-medical-teal/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI Diagnostic Assistant</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI system analyzes symptoms and medical scans to help in diagnosis. It is a support tool — final diagnosis must be done by medical professionals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default AIAnalysis;