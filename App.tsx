import React from 'react';
import Navbar from './components/Navbar';
import FeatureCard from './components/FeatureCard';
import VoiceDemo from './components/VoiceDemo';
import { Network, Mic, Shield, Play, Check, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-brand-teal selection:text-white mesh-bg overflow-x-hidden text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-teal text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse"></span>
              v1.2 now with Local Audio Support
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Talk to your <br />
              <span className="gradient-text">Workflow.</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
              The first voice-native desktop workspace. Connect Gemini, Claude, or local LLMs to your files and apps using the Model Context Protocol (MCP).
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a 
                href="https://forms.gle/jiR16e2m4od5E2po7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-tealHover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]">
                Join Waiting List
              </a>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white bg-[#1e293b] hover:bg-[#334155] transition-all">
                <Play size={20} fill="currentColor" className="w-5 h-5 text-gray-400" />
                Watch Demo
              </button>
            </div>
            
            <p className="mt-6 text-xs text-gray-500">
              * Works with macOS 12+ and Windows 11. Linux coming soon.
            </p>
          </motion.div>

          {/* Right: Interactive UI Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] w-full"
          >
             <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-teal/20 blur-[80px] -z-10 rounded-full"></div>
             <VoiceDemo />
          </motion.div>

        </div>
      </section>

      {/* Features Section (3 Specific Cards) */}
      <section id="features" className="py-24 bg-brand-surface/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">The Universal "USB-C" for AI</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We use the open standard <strong className="text-white">Model Context Protocol (MCP)</strong>. This means AI Worker doesn't just chat—it securely plugs into your tools, whether they are in the cloud or on your hard drive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <FeatureCard 
              title="Connect Any Tool"
              description="Calendar, Linear, GitHub, or your local SQL database. If it has an MCP server, AI Worker can talk to it instantly."
              icon={<Network size={32} />}
              delay={0.1}
            >
              <div className="flex flex-wrap gap-2">
                 <span className="px-3 py-1 bg-[#1e293b] rounded-md text-xs font-mono text-gray-300 border border-white/5">Google Drive</span>
                 <span className="px-3 py-1 bg-[#1e293b] rounded-md text-xs font-mono text-gray-300 border border-white/5">Slack</span>
                 <span className="px-3 py-1 bg-[#1e293b] rounded-md text-xs font-mono text-gray-300 border border-white/5">Postgres</span>
              </div>
            </FeatureCard>

            {/* Card 2 */}
            <FeatureCard 
              title="Privacy Native"
              description="Run local models like Llama 3 or Mistral via stdio. Your data never leaves your machine when using local agents."
              icon={<Lock size={32} />}
              delay={0.2}
            >
              <button className="text-brand-teal hover:text-white text-sm font-medium flex items-center gap-1 transition-colors">
                 Read Security Whitepaper <ArrowRight size={14} />
              </button>
            </FeatureCard>

            {/* Card 3 */}
            <FeatureCard 
              title="Voice First UX"
              description="Forget typing prompts. Speak naturally. We use VAD (Voice Activity Detection) to know when you pause and when you stop."
              icon={<Mic size={32} />}
              delay={0.3}
            >
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                 <div className="bg-gray-700 rounded-full p-0.5"><Check size={12} className="text-white"/></div>
                 Hands-free mode
              </div>
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Pricing / Early Access Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">Ready to upgrade your workflow?</h2>
            <p className="text-gray-400 mb-12">Join 10,000+ users in the beta.</p>

            <motion.div 
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-[#0f111a] rounded-3xl border border-white/10 p-1 pt-0 overflow-hidden relative shadow-2xl"
            >
               {/* Top Gradient Line */}
               <div className="h-1 w-full bg-gradient-to-r from-brand-teal via-brand-primary to-purple-500"></div>
               
               <div className="p-8 md:p-12">
                   <h3 className="text-2xl font-bold text-white mb-2">Early Access</h3>
                   <div className="flex items-baseline justify-center gap-1 mb-2">
                      <span className="text-6xl font-bold text-white">Free</span>
                      <span className="text-xl text-gray-500">/ forever</span>
                   </div>
                   <p className="text-gray-400 mb-10">For local models & standard MCP servers.</p>

                   <div className="max-w-xs mx-auto space-y-4 mb-10 text-left">
                      <div className="flex items-center gap-3">
                         <Check className="text-brand-teal w-5 h-5 flex-shrink-0" />
                         <span className="text-gray-300">Unlimited Local Llama/Mistral</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <Check className="text-brand-teal w-5 h-5 flex-shrink-0" />
                         <span className="text-gray-300">Connect Google Drive & Calendar</span>
                      </div>
                      <div className="flex items-center gap-3">
                         <Check className="text-brand-teal w-5 h-5 flex-shrink-0" />
                         <span className="text-gray-300">Voice-to-Text (Whisper Local)</span>
                      </div>
                   </div>

                   <a 
                      href="https://forms.gle/jiR16e2m4od5E2po7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full md:w-auto px-12 py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-xl transition-colors text-lg">
                      Join Waiting List
                   </a>
                   <p className="mt-6 text-sm text-gray-500">Windows version available via Waitlist</p>
               </div>
            </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020617] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-teal to-brand-primary rounded-lg flex items-center justify-center">
                 <Mic className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-lg">AI-Worker</span>
           </div>
           
           <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Features</a>
              <a href="#" className="hover:text-white">Integrations (MCP)</a>
              <a href="#" className="hover:text-white">Privacy</a>
           </div>

           <a 
              href="https://forms.gle/jiR16e2m4od5E2po7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-200 transition-colors">
              Join Waiting List
           </a>
        </div>
      </footer>
    </div>
  );
};

export default App;