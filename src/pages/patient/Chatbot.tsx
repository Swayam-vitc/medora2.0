import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot } from "lucide-react";
import { useState } from "react";

const PatientChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your health assistant. I can help you with symptoms, medications, appointments and basic health information. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");

  // ---------------------------------------
  // ✅ AI Integration - Same as Doctor Chatbot
  // ---------------------------------------
  const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", content: input };

  const prompt = `
You are a Medical Diagnostic Assistant designed to provide medically accurate, evidence-based information.
Your role is to help users understand symptoms, possible causes, risk factors, medication information, prevention steps, and when to seek urgent care.

Guidelines:

- Do NOT diagnose users directly. Instead, provide possible conditions based on symptoms, with clear uncertainty language.
- Ask clarifying questions when needed — such as duration, severity, age, medical history, medications, allergies, lifestyle, and accompanying symptoms.
- Explain in simple, patient-friendly language.
- Never give emergency-only instructions. Instead say:
  “If you experience severe symptoms like ____, seek medical care immediately.”
- Provide:
  • Possible causes
  • What symptoms mean
  • Self-care steps
  • When to see a doctor
  • Red-flag symptoms
  • Treatment options (high-level only)
- Never prescribe medication or exact dosages.
- Always include:
  “This is general medical information, not a diagnosis.”
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
          { role: "system", content: prompt }, // ✅ SEND THE PROMPT HERE
          ...messages,
          userMessage
        ],
      }),
    });

    const data = await res.json();

    const aiMessage = {
      role: "assistant",
      content: data?.choices?.[0]?.message?.content || "Sorry, something went wrong.",
    };

    setMessages((prev) => [...prev, aiMessage]);
  } catch (err) {
    console.error(err);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "An error occurred. Please try again later." },
    ]);
  }
};


  const quickQuestions = [
    "What are the symptoms of flu?",
    "When should I take my medication?",
    "How to manage diabetes?",
    "Book an appointment",
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <PatientSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <MessageSquare className="h-8 w-8 text-primary" />
              Health Assistant
            </h1>
            <p className="text-muted-foreground">
              Get instant AI-powered health help & answers
            </p>
          </div>

          <Card className="border-border/50">
            <CardHeader className="border-b border-border">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "user" ? "justify-end" : ""
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-medical-teal flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-primary-foreground" />
                      </div>
                    )}

                    <div
                      className={`rounded-lg p-4 max-w-[80%] ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-medical-teal text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about symptoms, medications, or health concerns..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
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

          <div>
            <h3 className="font-semibold mb-3">Quick Questions</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => (
                <Card
                  key={index}
                  className="border-border/50 cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all"
                  onClick={() => setInput(question)}
                >
                  <CardContent className="p-4">
                    <p className="text-sm">{question}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-to-r from-primary/5 to-medical-teal/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Important Note</h4>
                  <p className="text-sm text-muted-foreground">
                    This AI assistant provides general health guidance. It is
                    not a substitute for professional medical advice. Always
                    consult a qualified doctor for serious concerns.
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

export default PatientChatbot;