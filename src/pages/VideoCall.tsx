import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare, 
  FileText, 
  Send,
  Bot,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
  documentRef?: string;
}

const VideoCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      message: "Hello! I'm your AI legal assistant. I can help explain the employment contract you uploaded. What specific clauses would you like me to clarify?",
      timestamp: new Date(),
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [savedQuestions, setSavedQuestions] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isCallActive && videoRef.current) {
      // Simulate video stream
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.log('Camera access denied:', err));
    }
  }, [isCallActive]);

  const startCall = () => {
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: currentMessage,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: generateAIResponse(currentMessage),
        timestamp: new Date(),
        documentRef: Math.random() > 0.5 ? "Section 4: Non-Compete Clause" : undefined
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setCurrentMessage('');
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Based on the employment contract, this clause means that you cannot work for competitors for 2 years after leaving. This is quite restrictive and may limit your future job opportunities.",
      "That section requires you to work exclusively for the company. This means no side jobs or freelance work unless specifically approved by your employer.",
      "The termination clause allows the company to fire you 'with or without cause', which means they don't need a specific reason. This provides limited job security.",
      "The confidentiality agreement extends beyond your employment period. You'll need to protect company information even after you leave.",
      "This compensation structure includes a base salary plus discretionary bonuses. The key word is 'discretionary' - bonuses are not guaranteed."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const saveQuestion = (question: string) => {
    setSavedQuestions(prev => [...prev, question]);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Legal Consultation</h1>
          <p className="text-muted-foreground text-lg">
            Get real-time explanations and advice from your AI legal assistant
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Call Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Area */}
            <Card className="card-elevated">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {isCallActive ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full h-full object-cover"
                      />
                      {/* AI Avatar Overlay */}
                      <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-gradient-hero p-1">
                        <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                          <Bot className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      {/* Status Indicators */}
                      <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                        <Badge className="bg-success text-success-foreground">
                          <div className="w-2 h-2 bg-success-foreground rounded-full mr-2" />
                          Live
                        </Badge>
                        <Badge variant="secondary">
                          AI Assistant Active
                        </Badge>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-hero mx-auto mb-4 flex items-center justify-center">
                          <Video className="h-10 w-10 text-primary-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">AI Legal Assistant</h3>
                        <p className="text-muted-foreground mb-6">
                          Start a video call for personalized legal guidance
                        </p>
                        <Button 
                          onClick={startCall}
                          size="lg"
                          className="bg-gradient-hero hover:shadow-glow"
                        >
                          Start Video Call
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Call Controls */}
            <AnimatePresence>
              {isCallActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-center space-x-4">
                        <Button
                          variant={isMuted ? "destructive" : "outline"}
                          size="lg"
                          onClick={() => setIsMuted(!isMuted)}
                          className="rounded-full w-12 h-12 p-0"
                        >
                          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                        </Button>
                        <Button
                          variant={!isVideoOn ? "destructive" : "outline"}
                          size="lg"
                          onClick={() => setIsVideoOn(!isVideoOn)}
                          className="rounded-full w-12 h-12 p-0"
                        >
                          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                        </Button>
                        <Button
                          variant="destructive"
                          size="lg"
                          onClick={endCall}
                          className="rounded-full w-12 h-12 p-0"
                        >
                          <Phone className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Chat & Context Panel */}
          <div className="space-y-6">
            {/* Current Document Context */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Document Context
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium mb-2">Employment Agreement</p>
                  <p className="text-muted-foreground">
                    Currently discussing: Non-compete clauses and termination terms
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Chat Interface */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  AI Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {chatMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-lg p-3 ${
                          msg.type === 'user' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-accent/50 text-accent-foreground'
                        }`}>
                          <div className="flex items-start gap-2">
                            {msg.type === 'ai' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                            {msg.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                            <div>
                              <p className="text-sm">{msg.message}</p>
                              {msg.documentRef && (
                                <div className="mt-2 text-xs opacity-75">
                                  📄 {msg.documentRef}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your document..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Saved Questions */}
            {savedQuestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Saved for Lawyer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {savedQuestions.map((question, index) => (
                      <div key={index} className="text-sm p-2 bg-muted rounded">
                        {question}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoCall;