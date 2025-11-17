import PatientSidebar from "@/components/PatientSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send, Bot } from "lucide-react";
import { useState } from "react";

const PatientChatbot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your health assistant. I can help you with health questions, symptom checking, medication info, and more. How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Thank you for your question. Based on your symptoms, I recommend consulting with a healthcare professional for proper diagnosis." 
      }]);
    }, 1000);
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
            <p className="text-muted-foreground">24/7 AI-powered health guidance and support</p>
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
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
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
                    This AI assistant provides general health information and guidance. It is not a 
                    substitute for professional medical advice, diagnosis, or treatment. Always consult 
                    with qualified healthcare providers for medical concerns.
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
