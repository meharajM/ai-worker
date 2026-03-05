import React from 'react';
import { Send, Lock, MessageSquare, Database, Settings, Bot } from 'lucide-react';

const AgentDemo: React.FC = () => {
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
          <div className="flex-1 overflow-y-auto app-scrollbar">
            <div className="flex gap-4 mb-8">
              <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">AI Worker</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  I'm ready. I'm connected to <span className="bg-[#064e3b] text-[#34d399] px-1.5 py-0.5 rounded text-xs font-mono">Google Drive</span> and <span className="bg-[#451a03] text-[#fbbf24] px-1.5 py-0.5 rounded text-xs font-mono">Local Calendar</span>.
                  <br />Type your prompt to start.
                </p>
              </div>
            </div>
          </div>

          {/* Floating Input Bar */}
          <div className="mt-4">
            <button
              className="w-full p-4 rounded-xl border border-white/10 flex items-center gap-4 transition-all duration-300 group bg-[#1e293b]/50 hover:bg-[#1e293b] hover:border-white/20 cursor-default"
            >
              <div className="text-left flex-1 flex items-center">
                <p className="text-gray-500 font-medium truncate">
                  Type your request...
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors bg-brand-primary group-hover:scale-105">
                <Send className="text-white w-6 h-6" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentDemo;