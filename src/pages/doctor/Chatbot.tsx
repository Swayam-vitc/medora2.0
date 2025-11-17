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

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I understand your query. Let me help you with that information." 
      }]);
    }, 1000);
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
            <Card className="border-border/50 cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <p className="text-sm font-medium">Drug Interactions</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <p className="text-sm font-medium">Dosage Calculator</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <p className="text-sm font-medium">Medical Guidelines</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorChatbot;
