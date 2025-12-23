import React, { useState, useEffect, useRef } from 'react';
import { Mic, Lock, MessageSquare, Database, Settings, Bot } from 'lucide-react';
import { getAIResponse } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

// Augment window for webkitSpeechRecognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const VoiceDemo: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  // Default state matches the screenshot
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', text: string}[]>([
  ]);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const finalTrans = event.results[i][0].transcript;
            setTranscript(finalTrans);
            handleFinalTranscript(finalTrans);
          } else {
            interimTranscript += event.results[i][0].transcript;
            setTranscript(interimTranscript);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech error", event);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleFinalTranscript = async (text: string) => {
    setChatHistory(prev => [...prev, { role: 'user', text }]);
    setIsProcessing(true);
    setTranscript('');
    
    const reply = await getAIResponse(text);
    
    setChatHistory(prev => [...prev, { role: 'ai', text: reply }]);
    setIsProcessing(false);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser. Try Chrome or Edge.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  return (
    <div className="w-full h-full min-h-[500px] flex flex-col font-sans select-none">
      {/* Window Title Bar */}
      <div className="h-10 bg-[#1e293b] rounded-t-xl flex items-center justify-between px-4 border-b border-white/5">
         <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]"></div>
            <div className="w-3 h-3 rounded-full bg-[#eab308]"></div>
            <div className="w-3 h-3 rounded-full bg-[#22c55e]"></div>
         </div>
         <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
           <Lock size={10} />
           <span>local-session: active</span>
         </div>
         <div className="w-10"></div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex bg-[#0f111a] rounded-b-xl overflow-hidden border border-white/5 border-t-0">
        
        {/* Sidebar */}
        <div className="w-16 bg-[#18181b] border-r border-white/5 flex flex-col items-center py-6 gap-6">
           <div className="p-2 bg-[#27272a] rounded-lg">
             <MessageSquare className="text-brand-teal w-6 h-6" />
           </div>
           <div className="p-2 hover:bg-white/5 rounded-lg text-gray-500 transition-colors">
             <Database className="w-6 h-6" />
           </div>
           <div className="mt-auto p-2 hover:bg-white/5 rounded-lg text-gray-500 transition-colors">
             <Settings className="w-6 h-6" />
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative p-8">
           
           {/* Initial Message (Matches Screenshot) */}
           <div className="flex-1 overflow-y-auto app-scrollbar" ref={chatContainerRef}>
             <div className="flex gap-4 mb-8">
               <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
                 <Bot className="text-white w-6 h-6" />
               </div>
               <div>
                 <h4 className="text-white font-bold mb-1">AI Worker</h4>
                 <p className="text-gray-300 leading-relaxed text-sm">
                   I'm ready. I'm connected to <span className="bg-[#064e3b] text-[#34d399] px-1.5 py-0.5 rounded text-xs font-mono">Google Drive</span> and <span className="bg-[#451a03] text-[#fbbf24] px-1.5 py-0.5 rounded text-xs font-mono">Local Calendar</span>.
                   <br/>Press the mic button to start.
                 </p>
               </div>
             </div>

             {/* Live Chat History */}
             {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex gap-4 mb-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                   {msg.role === 'ai' && (
                     <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
                       <Bot className="text-white w-6 h-6" />
                     </div>
                   )}
                   <div className={`max-w-[80%] ${msg.role === 'user' ? 'bg-brand-primary/20 text-white p-3 rounded-2xl rounded-tr-none' : ''}`}>
                      <p className="text-gray-300 text-sm leading-relaxed">{msg.text}</p>
                   </div>
                </div>
             ))}

             {isProcessing && (
                <div className="flex gap-4 mb-6">
                   <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
                       <Bot className="text-white w-6 h-6" />
                   </div>
                   <div className="flex items-center gap-1 h-10">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></span>
                   </div>
                </div>
             )}
           </div>

           {/* Floating Input Bar */}
           <div className="mt-4">
              <button 
                onClick={toggleListening}
                className={`w-full p-4 rounded-xl border border-white/10 flex items-center gap-4 transition-all duration-300 group ${
                  isListening 
                  ? 'bg-red-500/10 border-red-500/50' 
                  : 'bg-[#1e293b]/50 hover:bg-[#1e293b] hover:border-white/20'
                }`}
              >
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                   isListening ? 'bg-red-500' : 'bg-[#ef4444] group-hover:scale-105'
                 }`}>
                    {isListening ? <Mic className="text-white w-6 h-6 animate-pulse" /> : <Mic className="text-white w-6 h-6" />}
                 </div>
                 <div className="text-left flex-1">
                    <p className={`text-xs font-bold tracking-wider uppercase mb-0.5 ${
                      isListening ? 'text-red-400' : 'text-gray-500'
                    }`}>
                      {isListening ? 'Listening...' : 'Ready'}
                    </p>
                    <p className="text-white font-medium truncate">
                      {isListening ? transcript || "Speak clearly..." : "Click mic to speak..."}
                    </p>
                 </div>
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default VoiceDemo;