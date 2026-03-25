import React from 'react';
import { Send, Lock, MessageSquare, Database, Settings, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

const AgentDemo: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[500px] flex flex-col font-sans select-none">
      {/* Window Title Bar */}
      <div className="h-10 bg-surface-elevated rounded-t-xl flex items-center justify-between px-4 border-b border-surface-border">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-mac-red"></div>
          <div className="w-3 h-3 rounded-full bg-mac-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-mac-green"></div>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-xs font-mono">
          <motion.div
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-brand-teal"
          />
          <Lock size={10} />
          <span>local-session: active</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex bg-surface-card rounded-b-xl overflow-hidden border border-surface-border border-t-0">

        {/* Sidebar */}
        <div className="w-16 bg-surface-sidebar border-r border-surface-border flex flex-col items-center py-6 gap-6">
          <div className="p-2 bg-surface-active rounded-lg">
            <MessageSquare className="text-brand-teal w-6 h-6" />
          </div>
          <div className="p-2 hover:bg-surface-hover rounded-lg text-gray-500 transition-colors">
            <Database className="w-6 h-6" />
          </div>
          <div className="mt-auto p-2 hover:bg-surface-hover rounded-lg text-gray-500 transition-colors">
            <Settings className="w-6 h-6" />
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative p-8">

          {/* Initial Message (Matches Screenshot) */}
          <div className="flex-1 overflow-y-auto app-scrollbar">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 mb-8"
            >
              <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
                <Bot className="text-white w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1 border-none bg-transparent">AI Worker</h4>
                <p className="text-gray-300 leading-relaxed text-sm">
                  I'm ready. I'm connected to <span className="bg-logo-drive-bg text-logo-drive-text px-1.5 py-0.5 rounded text-xs font-mono">Google Drive</span> and <span className="bg-logo-calendar-bg text-logo-calendar-text px-1.5 py-0.5 rounded text-xs font-mono">Local Calendar</span>.
                  <br />Type your prompt to start.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Floating Input Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4"
          >
            <div
              className="w-full p-4 rounded-xl border border-surface-border flex items-center gap-4 transition-all duration-300 group bg-surface-elevated hover:bg-surface-active hover:border-brand-teal/30 cursor-default shadow-lg"
            >
              <div className="text-left flex-1 flex items-center">
                <p className="text-gray-500 font-medium truncate">
                  Type your request...
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-colors bg-brand-primary group-hover:scale-105 shadow-md">
                <Send className="text-white w-6 h-6" />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default AgentDemo;