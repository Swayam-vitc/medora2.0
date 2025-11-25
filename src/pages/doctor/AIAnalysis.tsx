import { useState, useEffect } from "react";
import DoctorSidebar from "@/components/DoctorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Upload, Zap, Loader2, Volume2, Square, Mic, MicOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { convertFileToBase64 } from "@/utils/fileUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = [
  { code: "en-IN", name: "English (India)", label: "English" },
  { code: "hi-IN", name: "Hindi", label: "Hindi (हिंदी)" },
  { code: "mr-IN", name: "Marathi", label: "Marathi (मराठी)" },
  { code: "kn-IN", name: "Kannada", label: "Kannada (कन्नड़)" },
  { code: "ta-IN", name: "Tamil", label: "Tamil (தமிழ்)" },
  { code: "te-IN", name: "Telugu", label: "Telugu (తెలుగు)" },
  { code: "bn-IN", name: "Bengali", label: "Bengali (বাংলা)" },
  { code: "gu-IN", name: "Gujarati", label: "Gujarati (ગુજરાતી)" },
  { code: "ml-IN", name: "Malayalam", label: "Malayalam (മലയാളം)" },
  { code: "pa-IN", name: "Punjabi", label: "Punjabi (ਪੰਜਾਬੀ)" },
];

const AIAnalysis = () => {
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en-IN");
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);

  // Greet user when language changes
  useEffect(() => {
    const greetings: Record<string, string> = {
      "en-IN": "Hello, I am Medora. How can I help you?",
      "hi-IN": "नमस्ते, मैं मेडोरा हूँ। मैं आपकी कैसे मदद कर सकती हूँ?",
      "mr-IN": "नमस्कार, मी मेडोरा आहे. मी तुम्हाला कशी मदत करू शकते?",
      "kn-IN": "ನಮಸ್ಕಾರ, ನಾನು ಮೆಡೋರಾ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ?",
      "ta-IN": "வணக்கம், நான் மெடோரா. நான் உங்களுக்கு எப்படி உதவ முடியும்?",
      "te-IN": "నమస్కారం, నేను మెడోరా. నేను మీకు ఎలా సహాయం చేయగలను?",
      "bn-IN": "হ্যালো, আমি মেডোরা। আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
      "gu-IN": "નમસ્તે, હું મેડોરા છું. હું તમને કેવી રીતે મદદ કરી શકું?",
      "ml-IN": "നമസ്കാരം, ഞാൻ മെഡോറ. എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാനാകും?",
      "pa-IN": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਮੈਂ ਮੇਡੋਰਾ ਹਾਂ। ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੀ ਹਾਂ?",
    };

    const message = greetings[language] || greetings["en-IN"];
    speakText(message);
  }, [language]);

  // Auto-speak latest AI message
  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];
    if (lastMessage && lastMessage.role === "assistant" && autoSpeak) {
      speakText(lastMessage.content);
      setAutoSpeak(false);
    }
  }, [chatHistory, autoSpeak]);

  const speakText = (text: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    // Clean text for speech (remove markdown)
    const cleanText = text.replace(/<[^>]*>/g, "").replace(/\*\*/g, "").replace(/#/g, "").replace(/-/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language;

    // improved voice selection for female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(v =>
      v.lang.startsWith(language.split('-')[0]) &&
      (v.name.includes("Female") || v.name.includes("Samantha") || v.name.includes("Google") || v.name.includes("Zira"))
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = (isReply = false) => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({ title: "Not Supported", description: "Voice input is not supported in this browser." });
      return;
    }

    if (isListening) {
      // @ts-ignore
      window.recognition?.stop();
      setIsListening(false);
      return;
    }

    // @ts-ignore
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setAutoSpeak(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (isReply) {
        setReply((prev) => prev + (prev ? " " : "") + transcript);
        // Optional: Auto-send reply? Let's keep it manual for review or add a "Send" call here
      } else {
        setSymptoms((prev) => prev + (prev ? " " : "") + transcript);
      }
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({ title: "Error", description: "Failed to recognize speech." });
    };

    recognition.onend = () => setIsListening(false);

    // @ts-ignore
    window.recognition = recognition;
    recognition.start();
  };

  const getSystemPrompt = () => {
    const langName = LANGUAGES.find(l => l.code === language)?.name || "English";

    return `You are Medora, a helpful and empathetic AI Medical Assistant. 
    
ROLE:
- Act like a knowledgeable doctor having a conversation.
- Ask clarifying questions if symptoms are vague.
- Provide diagnosis and advice only when you have enough info.
- Be comforting and professional.

FORMATTING:
- **CRITICAL**: Respond using **HTML tags** for formatting.
- Use <h3> for section headers.
- Use <ul> and <li> for lists.
- Use <strong> for key terms.
- Use <p> for paragraphs.
- Do NOT use markdown (like ** or -). Use HTML only.
- Keep it visually clean and spacious.

LANGUAGE:
- Respond entirely in ${langName}.
- If the language is an Indian regional language, use the native script.

DISCLAIMER:
- Always imply this is AI advice, not a final medical diagnosis.`;
  };

  const sendMessage = async (content: string, type: 'symptoms' | 'image' | 'text' = 'text', imageUrl?: string) => {
    if (!content.trim() && !imageUrl) return;

    const newMessage = { role: "user", content };
    const updatedHistory = [...chatHistory, newMessage];
    setChatHistory(updatedHistory);
    setLoading(true);

    // Clear inputs
    setSymptoms("");
    setReply("");

    try {
      const messages: any[] = [
        { role: "system", content: getSystemPrompt() },
        ...updatedHistory.map(msg => ({ role: msg.role, content: msg.content }))
      ];

      if (type === 'image' && imageUrl) {
        messages.push({
          role: "user",
          content: [
            { type: "text", text: "Analyze this medical image." },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        });
      }

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: messages,
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const aiResponse = data.choices[0].message.content;
      setChatHistory(prev => [...prev, { role: "assistant", content: aiResponse }]);

    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Failed to get response." });
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
    const base64Image = await convertFileToBase64(image);
    sendMessage("Analyze this medical image", 'image', base64Image);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Brain className="h-8 w-8 text-primary" />
                AI Disease Analysis
              </h1>
              <p className="text-muted-foreground">Chat with Medora for diagnostic assistance</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Language:</span>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Input Section (Left Column) */}
            <div className="lg:col-span-1 space-y-6">
              {/* Symptoms Input */}
              <Card className="border-border/50">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>New Analysis</CardTitle>
                  <Button
                    variant={isListening ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => handleVoiceInput(false)}
                    className={isListening ? "animate-pulse" : ""}
                  >
                    {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    Voice
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder={`Describe symptoms in ${LANGUAGES.find(l => l.code === language)?.name}...`}
                    className="min-h-[150px]"
                  />
                  <Button onClick={() => sendMessage(symptoms)} disabled={loading || !symptoms.trim()} className="w-full bg-gradient-to-r from-primary to-medical-teal">
                    {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Zap className="mr-2 h-4 w-4" />}
                    Start Analysis
                  </Button>
                </CardContent>
              </Card>

              {/* Image Input */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Medical Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <label className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer block">
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">Upload X-Ray, CT, MRI</p>
                  </label>

                  {preview && (
                    <img src={preview} alt="preview" className="rounded-lg border w-full h-32 object-cover" />
                  )}

                  <Button variant="outline" className="w-full" onClick={analyzeImage} disabled={loading || !image}>
                    {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Upload className="mr-2 h-4 w-4" />}
                    Analyze Image
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface (Right 2 Columns) */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between border-b">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Medora Chat
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setChatHistory([])}>Clear</Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>Start a conversation with Medora...</p>
                      <p className="text-sm mt-2">"I have a headache"</p>
                    </div>
                  ) : (
                    chatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-lg p-4 shadow-sm ${msg.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white border border-gray-100 text-gray-800'
                          }`}>
                          <div
                            className="prose prose-sm max-w-none dark:prose-invert [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-4 [&>ul]:mb-2 [&>p]:mb-2 last:[&>p]:mb-0"
                            dangerouslySetInnerHTML={{ __html: msg.content }}
                          />
                          {msg.role === 'assistant' && idx === chatHistory.length - 1 && (
                            <Button variant="ghost" size="icon" className="h-6 w-6 mt-2 opacity-50 hover:opacity-100" onClick={() => speakText(msg.content.replace(/<[^>]*>/g, ''))}>
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                        <Loader2 className="animate-spin h-4 w-4" /> Medora is thinking...
                      </div>
                    </div>
                  )}
                </CardContent>

                <div className="p-4 border-t bg-muted/20">
                  <div className="flex gap-2">
                    <Button
                      variant={isListening ? "destructive" : "outline"}
                      size="icon"
                      onClick={() => handleVoiceInput(true)}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <input
                      className="flex-1 bg-background border rounded-md px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Reply to Medora..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage(reply)}
                    />
                    <Button onClick={() => sendMessage(reply)} disabled={!reply.trim() || loading}>
                      Send
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Footer Info */}
          <Card className="bg-gradient-to-r from-primary/5 to-medical-teal/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Medora AI Assistant</h4>
                  <p className="text-sm text-muted-foreground">
                    Medora analyzes symptoms and medical scans to help in diagnosis. It is a support tool — final diagnosis must be done by medical professionals.
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