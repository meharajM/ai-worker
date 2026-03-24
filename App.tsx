import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { trackClick } from './utils/analytics';
import FeatureCard from './components/FeatureCard';
import AgentDemo from './components/AgentDemo';
import DownloadPage from './components/DownloadPage';
import { Network, Shield, Play, Check, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [page, setPage] = React.useState<'home' | 'download'>(() => {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    return path === '/download' ? 'download' : 'home';
  });

  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      setPage(path === '/download' ? 'download' : 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newPage: 'home' | 'download') => {
    const path = newPage === 'download' ? '/download' : '/';
    window.history.pushState({}, '', path);
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  if (page === 'download') {
    return <DownloadPage onBack={() => navigate('home')} />;
  }

  return (
    <div className="min-h-screen font-sans selection:bg-brand-teal selection:text-white mesh-bg overflow-x-hidden text-white">
      <Navbar onDownloadClick={() => navigate('download')} onHomeClick={() => navigate('home')} />
      <main>

      {/* Hero Section */}
      <section aria-labelledby="hero-heading" className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto">
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
              v1.2: Local Tool Automation
            </div>

            <h1 id="hero-heading" className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              Automate your <br />
              <span className="gradient-text">General Workflows.</span>
            </h1>

            <p className="text-xl text-gray-400 mb-10 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
              A private desktop AI assistant. Connect your daily tools and automate your workflows directly on your machine.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => { trackClick('download_beta', { location: 'hero' }); navigate('download'); }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-teal hover:bg-brand-tealHover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]">
                Download Beta
              </button>
              <a 
                href="#demo" 
                onClick={() => trackClick('watch_demo', { location: 'hero' })}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white bg-[#1e293b] hover:bg-[#334155] transition-all">
                <Play size={20} fill="currentColor" className="w-5 h-5 text-gray-400" />
                Watch Demo
              </a>
            </div>

            <p className="mt-6 text-xs text-gray-500" aria-label="Supported platforms">
              Works with macOS 12+, Windows 10/11, and Linux.
            </p>
          </motion.div>

          {/* Right: Interactive UI Mockup */}
          <motion.div
            id="demo"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] w-full"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-teal/20 blur-[80px] -z-10 rounded-full"></div>
            <AgentDemo />
          </motion.div>

        </div>
      </section>

      {/* Features Section (3 Specific Cards) */}
      <section id="features" aria-labelledby="features-heading" className="py-24 bg-brand-surface/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="features-heading" className="text-3xl md:text-5xl font-bold mb-6 text-white">An Assistant For Your Tools</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI agent doesn't just chat—it operates your tools alongside you, driving UI interactions and command lines to complete repetitive tasks in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <FeatureCard
              title="Connect Your Tools"
              description="Your calendar, project manager, or company database. Connect instantly to the apps you already use to automate complex operations."
              icon={<Network size={32} />}
              delay={0.1}
            >
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[#1e293b] rounded-md text-xs font-mono text-gray-300 border border-white/5">Google Drive</span>
                <span className="px-3 py-1 bg-[#1e293b] rounded-md text-xs font-mono text-gray-300 border border-white/5">Slack</span>
                <span className="px-3 py-1 bg-[#1e293b] rounded-md text-xs font-mono text-gray-300 border border-white/5">Your Software</span>
              </div>
            </FeatureCard>

            {/* Card 2 */}
            <FeatureCard
              title="Private & Secure"
              description="Your work stays on your machine. The agent runs locally so your files, emails, and documents are never sent to a third-party server."
              icon={<Lock size={32} />}
              delay={0.2}
            >
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="bg-gray-700 rounded-full p-0.5"><Check size={12} className="text-white" /></div>
                Runs locally, no cloud required
              </div>
            </FeatureCard>

            {/* Card 3 */}
            <FeatureCard
              title="Smart Reliability"
              description="Our agent handles temporary errors and website changes automatically, ensuring your tasks get done without needing constant supervision."
              icon={<Shield size={32} />}
              delay={0.3}
            >
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <div className="bg-gray-700 rounded-full p-0.5"><Check size={12} className="text-white" /></div>
                Hands-Off Automation
              </div>
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Pricing / Early Access Section */}
      <section id="download" aria-labelledby="download-heading" className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="download-heading" className="text-3xl md:text-5xl font-bold mb-4 text-white">Ready to automate your workflows?</h2>
          <p className="text-gray-400 mb-12">Join thousands of teams already automating their day-to-day tasks.</p>

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
              <p className="text-gray-400 mb-10">Start saving time on repetitive tasks today.</p>

              <div className="max-w-xs mx-auto space-y-4 mb-10 text-left">
                <div className="flex items-center gap-3">
                  <Check className="text-brand-teal w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited Automation Runs</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-brand-teal w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-300">Connect Google Drive & Calendar</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-brand-teal w-5 h-5 flex-shrink-0" />
                  <span className="text-gray-300">Reliable Web Actions</span>
                </div>
              </div>

              <a
                href="https://forms.gle/jiR16e2m4od5E2po7"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('join_waitlist', { location: 'pricing' })}
                className="w-full md:w-auto px-12 py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-xl transition-colors text-lg">
                Join Waiting List
              </a>
              <p className="mt-6 text-sm text-gray-500">Windows version available via Waitlist</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      </main>
      <footer aria-label="Site footer" className="bg-[#020617] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-teal to-brand-primary rounded-lg flex items-center justify-center">
              <Network className="text-white w-5 h-5" aria-hidden="true" />
            </div>
            <span className="font-bold text-lg">AI-Worker</span>
            <span className="sr-only"> — Free Desktop AI Agent</span>
          </div>

          <nav aria-label="Footer navigation" className="flex gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#demo" className="hover:text-white transition-colors">Demo</a>
            <button
              onClick={() => navigate('download')}
              className="hover:text-white transition-colors">Download</button>
          </nav>

          <div className="flex flex-col items-center md:items-end gap-2">
            <a
              href="https://forms.gle/jiR16e2m4od5E2po7"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('join_waitlist', { location: 'footer' })}
              className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-200 transition-colors">
              Join Waiting List
            </a>
            <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} AI-Worker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;