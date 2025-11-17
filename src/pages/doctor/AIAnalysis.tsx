import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Upload, Zap } from "lucide-react";

const AIAnalysis = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Brain className="h-8 w-8 text-primary" />
              AI Disease Analysis
            </h1>
            <p className="text-muted-foreground">Advanced AI-powered diagnostic assistance</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Symptom Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter patient symptoms, medical history, and observations..."
                  className="min-h-[200px]"
                />
                <Button className="w-full bg-gradient-to-r from-primary to-medical-teal">
                  <Zap className="mr-2 h-4 w-4" />
                  Analyze Symptoms
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Medical Image Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground">
                    Upload X-Ray, CT Scan, or MRI images
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: JPG, PNG, DICOM
                  </p>
                </div>
                <Button className="w-full" variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  AI analysis results will appear here after you submit symptoms or images
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-primary/5 to-medical-teal/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">AI Diagnostic Assistant</h4>
                  <p className="text-sm text-muted-foreground">
                    Our AI system analyzes symptoms, medical images, and patient history to provide 
                    diagnostic suggestions. This is a tool to assist medical professionals and should 
                    not replace clinical judgment.
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
