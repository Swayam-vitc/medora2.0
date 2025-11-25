import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot } from "lucide-react";
import { useState } from "react";

const DoctorChatbot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello Doctor! I'm your AI medical assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    const systemPrompt = `
You are a Professional Medical AI Assistant for healthcare providers. Provide evidence-based, clinically accurate information to support medical decision-making.

FORMATTING REQUIREMENTS:
- Use clear, professional medical language
- Structure responses with bullet points for readability
- Include relevant clinical details
- Cite medical guidelines when applicable
- Use numbered lists for procedures/protocols

RESPONSE STRUCTURE:

**Clinical Overview:**
• Brief summary in medical terminology
• Relevant pathophysiology if applicable

**Key Information:**
• Drug interactions (if relevant)
• Dosage considerations
• Contraindications and precautions
• Clinical guidelines/protocols

**Practical Considerations:**
• Patient counseling points
• Monitoring parameters
• Alternative options

**References:**
• Evidence-based sources when applicable

CAPABILITIES:
- Drug interaction checking
- Dosage calculations and adjustments
- Differential diagnosis support
- Treatment protocol guidance
- Medical guideline summaries
- Clinical decision support
- Patient education material suggestions

IMPORTANT:
- Provide clinical depth appropriate for medical professionals
- Include safety warnings and contraindications
- Suggest when specialist consultation may be needed
- Support, but do not replace, clinical judgment
- For complex cases, recommend additional investigation
`;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
            userMessage
          ],
        }),
      });

      const data = await res.json();

      const aiMessage = {
        role: "assistant",
        content: data?.choices?.[0]?.message?.content || "Error processing.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    }
  };


  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary" />
              Medical AI Assistant
            </h1>
            <p className="text-muted-foreground">Get instant medical information and assistance</p>
          </div>

          <Card className="border-border/50">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                AI Chat Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-4 max-w-[80%] ${message.role === "user"
                        ? "bg-gradient-to-r from-primary to-medical-teal text-primary-foreground"
                        : "bg-secondary"
                        }`}
                    >
                      <div className="text-sm whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/• /g, '• ')
                            .replace(/\n/g, '<br/>')
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about medications, symptoms, procedures..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-primary to-medical-teal"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card
              className="border-border/50 cursor-pointer hover:shadow-lg transition-shadow hover:bg-primary/5"
              onClick={() => setInput("Check drug interactions between: ")}
            >
              <CardContent className="p-4 text-center">
                <p className="text-sm font-medium text-primary">Drug Interactions</p>
                <p className="text-xs text-muted-foreground mt-1">Check for contraindications</p>
              </CardContent>
            </Card>
            <Card
              className="border-border/50 cursor-pointer hover:shadow-lg transition-shadow hover:bg-primary/5"
              onClick={() => setInput("Calculate dosage for: \nPatient Age: \nWeight: \nDrug: ")}
            >
              <CardContent className="p-4 text-center">
                <p className="text-sm font-medium text-primary">Dosage Calculator</p>
                <p className="text-xs text-muted-foreground mt-1">Pediatric & Adult Dosing</p>
              </CardContent>
            </Card>
            <Card
              className="border-border/50 cursor-pointer hover:shadow-lg transition-shadow hover:bg-primary/5"
              onClick={() => setInput("Summarize medical guidelines for: ")}
            >
              <CardContent className="p-4 text-center">
                <p className="text-sm font-medium text-primary">Medical Guidelines</p>
                <p className="text-xs text-muted-foreground mt-1">Latest clinical protocols</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorChatbot;