import React from 'react';
import Navbar from './components/Navbar';
import { trackClick } from './utils/analytics';
import FeatureCard from './components/FeatureCard';
import AgentDemo from './components/AgentDemo';
import GuidePage from './components/GuidePage';
import DownloadPage from './components/DownloadPage';
import ProductsPage from './components/ProductsPage';
import { Network, Shield, Check, Lock, Github, Download, Settings, Users, Mail, FileText, Globe2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const GITHUB_REPO_URL = 'https://github.com/meharajM/ai-worker.app';
const GITHUB_PR_URL = 'https://github.com/meharajM/ai-worker.app/pull/143';
const CONTACT_EMAIL = 'contact@ai-worker.tech';

const FAQ_ITEMS = [
  {
    question: 'Is AI-Worker free?',
    answer: 'Yes. AI-Worker is free to use and licensed under MIT.',
  },
  {
    question: 'Which operating systems are supported?',
    answer: 'AI-Worker supports macOS 12+, Windows 10/11, and Linux.',
  },
  {
    question: 'Do I need to code to use it?',
    answer: 'No. Non-developers can install the app, choose a provider, enable tools, and start from the desktop UI.',
  },
];

const App: React.FC = () => {
  const [page, setPage] = React.useState<'home' | 'download' | 'capabilities' | 'guide'>(() => {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    if (path === '/download') return 'download';
    if (path === '/products' || path === '/capabilities') return 'capabilities';
    if (path === '/guide') return 'guide';
    return 'home';
  });

  React.useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '') || '/';
      if (path === '/download') setPage('download');
      else if (path === '/products' || path === '/capabilities') setPage('capabilities');
      else if (path === '/guide') setPage('guide');
      else setPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (newPage: 'home' | 'download' | 'capabilities' | 'guide') => {
    let path = '/';
    if (newPage === 'download') path = '/download';
    if (newPage === 'capabilities') path = '/capabilities';
    if (newPage === 'guide') path = '/guide';
    window.history.pushState({}, '', path);
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  const navigateToFeatures = () => {
    if (page !== 'home') {
      window.history.pushState({}, '', '/');
      setPage('home');
      window.setTimeout(() => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
      return;
    }

    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-brand-teal selection:text-white bg-brand-dark overflow-x-hidden text-white">
      <Navbar onDownloadClick={() => navigate('download')} onHomeClick={() => navigate('home')} onFeaturesClick={navigateToFeatures} onCapabilitiesClick={() => navigate('capabilities')} onGuideClick={() => navigate('guide')} />
      <AnimatePresence mode="wait">
        {page === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Hero Section */}
            <section aria-labelledby="hero-heading" className="relative pt-32 pb-20 px-4 max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Left: Text Content */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center lg:text-left z-10"
                >
                  <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-elevated border border-surface-border text-brand-teal text-sm font-medium mb-8">
                    <span className="flex h-2 w-2 rounded-full bg-brand-teal"></span>
                    MIT open source · Free desktop app
                  </motion.div>
      
                  <motion.h1 id="hero-heading" variants={itemVariants} className="text-[clamp(2.5rem,5vw+1rem,4.5rem)] font-extrabold tracking-tight mb-6 leading-[1.1]">
                    Your local AI workspace for <br />
                    <span className="gradient-text">real work.</span>
                  </motion.h1>
      
                  <motion.p variants={itemVariants} className="text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-lg mx-auto lg:mx-0">
                    AI-Worker is a free, open-source desktop AI workspace for chat, files, browser automation, and MCP tool workflows.
                  </motion.p>
      
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => { trackClick('download_free', { location: 'hero' }); navigate('download'); }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-teal text-white px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-brand-teal/10 hover:bg-brand-tealHover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark">
                      <Download size={20} />
                      Download Free
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      href={GITHUB_REPO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick('github_repo', { location: 'hero' })}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white bg-surface-elevated transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-border">
                      <Github size={20} />
                      View Source
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      onClick={() => { trackClick('guide_route', { location: 'hero' }); navigate('guide'); }}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-white bg-surface-elevated transition-colors hover:bg-surface-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-surface-border">
                      <FileText size={20} />
                      How to Use
                    </motion.button>
                  </motion.div>
      
                  <motion.p variants={itemVariants} className="mt-6 text-xs text-gray-500" aria-label="Supported platforms">
                    Works with macOS 12+, Windows 10/11, and Linux. Licensed under MIT.
                  </motion.p>
                </motion.div>
      
                {/* Right: Interactive UI Mockup */}
                <motion.div
                  id="demo"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="relative lg:h-[600px] w-full"
                >
                  <AgentDemo />
                </motion.div>
      
              </div>
            </section>
      
            {/* Features Section (3 Specific Cards) */}
            <section id="features" aria-labelledby="features-heading" className="py-24 bg-surface-card border-t border-surface-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 id="features-heading" className="text-3xl md:text-5xl font-bold mb-6 text-white">One Workspace For Your AI Tools</h2>
                  <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                    AI-Worker brings chat, files, browser actions, MCP connections, and model providers into a desktop-native hub you can inspect and control.
                  </p>
                </motion.div>
      
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex flex-wrap justify-center gap-8"
                >
                  {/* Card 1 */}
                  <FeatureCard
                    centered
                    className="w-full sm:w-[360px]"
                    title="Connect MCP Tools"
                    description="Use built-in memory, filesystem, MarkItDown document conversion, Playwright browser automation, and custom MCP servers from one connections screen."
                    icon={<Network size={32} />}
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-surface-elevated rounded-md text-xs font-mono text-gray-300 border border-surface-border">Filesystem</span>
                      <span className="px-3 py-1 bg-surface-elevated rounded-md text-xs font-mono text-gray-300 border border-surface-border">Browser</span>
                      <span className="px-3 py-1 bg-surface-elevated rounded-md text-xs font-mono text-gray-300 border border-surface-border">Custom MCP</span>
                    </div>
                  </FeatureCard>
      
                  {/* Card 2 */}
                  <FeatureCard
                    centered
                    className="w-full sm:w-[360px]"
                    title="Local First"
                    description="Run the workspace on your machine, choose local Ollama or hosted providers, and keep sensitive files under your control."
                    icon={<Lock size={32} />}
                  >
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="bg-brand-teal rounded-full p-0.5"><Check size={12} className="text-white" /></div>
                      Local workflows with optional hosted models
                    </div>
                  </FeatureCard>
      
                  {/* Card 3 */}
                  <FeatureCard
                    centered
                    className="w-full sm:w-[360px]"
                    title="Open Source & Inspectable"
                    description="The app is MIT licensed. Review the code, follow the setup docs, file issues, or adapt the workspace for your team."
                    icon={<Shield size={32} />}
                  >
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <div className="bg-brand-teal rounded-full p-0.5"><Check size={12} className="text-white" /></div>
                      MIT licensed on GitHub
                    </div>
                  </FeatureCard>
                </motion.div>
              </div>
            </section>

            {/* Use Cases Section */}
            <section id="use-cases" aria-labelledby="use-cases-heading" className="py-24 px-4 bg-brand-dark">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="lg:sticky lg:top-28"
                  >
                    <p className="text-brand-teal font-bold uppercase tracking-[0.25em] text-xs mb-4">Use Cases</p>
                    <h2 id="use-cases-heading" className="text-3xl md:text-5xl font-bold mb-6 text-white">
                      Useful for people who do not write code.
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-8">
                      Start from chat, attach files, pick a workflow tile, and let AI-Worker coordinate the tools you have enabled. Developers can extend it with MCP; non-dev users can operate it from the desktop UI.
                    </p>
                    <a
                      href={GITHUB_PR_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick('github_pr_reference', { location: 'use_cases' })}
                      className="inline-flex items-center gap-2 text-brand-teal font-bold hover:text-white transition-colors"
                    >
                      <Github size={18} />
                      Open-source readiness PR
                    </a>
                  </motion.div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid sm:grid-cols-2 gap-5"
                  >
                    {[
                      {
                        icon: <FileText size={24} />,
                        title: 'Documents & research',
                        text: 'Summarize notes, extract data from documents, convert files with MarkItDown, and keep findings organized in one session.',
                      },
                      {
                        icon: <Globe2 size={24} />,
                        title: 'Browser work',
                        text: 'Navigate pages, fill forms, capture screenshots, compare information across sites, and repeat web tasks through Playwright-backed automation.',
                      },
                      {
                        icon: <Network size={24} />,
                        title: 'Connected systems',
                        text: 'Link the tools you already use through MCP so teams can reuse the same workspace for internal systems and repeatable tasks.',
                      },
                      {
                        icon: <Users size={24} />,
                        title: 'Team handoff',
                        text: 'Share outputs, review results, and move work forward without making non-technical users learn prompts or scripts.',
                      },
                    ].map((useCase) => (
                      <motion.div
                        key={useCase.title}
                        variants={itemVariants}
                        className="rounded-3xl bg-surface-card border border-surface-border p-7 hover:border-brand-teal transition-colors"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-5">
                          {useCase.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{useCase.text}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Non-dev Setup Section */}
            <section id="setup" aria-labelledby="setup-heading" className="py-24 px-4 bg-surface-card border-y border-surface-border">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-14"
                >
                  <p className="text-brand-teal font-bold uppercase tracking-[0.25em] text-xs mb-4">No-code Setup</p>
                  <h2 id="setup-heading" className="text-3xl md:text-5xl font-bold mb-6 text-white">Download, configure, and run your first task.</h2>
                  <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                    The public docs are written for first-time users as well as contributors. You can install the app, choose a model provider, enable tools, and start with a small workflow before adding advanced MCP connections.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-5">
                  {[
                    {
                      icon: <Download size={24} />,
                      title: '1. Install the app',
                      text: 'Use the macOS, Windows, or Linux installer from the download page. No account or credit card is required for the free open-source app.',
                    },
                    {
                      icon: <Settings size={24} />,
                      title: '2. Choose providers',
                      text: 'Open Hub Settings and configure Ollama for local models, or connect an OpenAI-compatible, Gemini, or other supported hosted provider.',
                    },
                    {
                      icon: <Network size={24} />,
                      title: '3. Enable tools',
                      text: 'Open MCP Connections to inspect built-in memory, filesystem, MarkItDown, browser automation, or add a custom MCP server.',
                    },
                  ].map((step) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.5 }}
                      className="rounded-3xl bg-surface-elevated border border-surface-border p-8"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white text-brand-dark flex items-center justify-center mb-6">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{step.text}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => { trackClick('download_from_setup'); navigate('download'); }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-brand-teal hover:bg-brand-tealHover text-white rounded-xl font-bold transition-colors"
                  >
                    <Download size={18} />
                    Go to Download
                  </button>
                  <a
                    href={`${GITHUB_REPO_URL}/blob/main/docs/usage.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick('usage_docs', { location: 'setup' })}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-brand-dark hover:bg-surface-hover border border-surface-border text-white rounded-xl font-bold transition-colors"
                  >
                    <FileText size={18} />
                    Read Usage Guide
                  </a>
                </div>
              </div>
            </section>

            {/* Enterprise Section */}
            <section id="enterprise" aria-labelledby="enterprise-heading" className="py-24 px-4">
              <div className="max-w-6xl mx-auto rounded-[2rem] border border-surface-border bg-surface-card overflow-hidden">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="p-8 md:p-12">
                    <p className="text-brand-teal font-bold uppercase tracking-[0.25em] text-xs mb-4">Enterprise</p>
                    <h2 id="enterprise-heading" className="text-3xl md:text-5xl font-bold text-white mb-6">
                      Bring AI-Worker into your enterprise ecosystem.
                    </h2>
                    <p className="text-lg text-gray-400 leading-relaxed mb-8">
                      Teams can use AI-Worker as a local, inspectable automation workspace for internal tools, private files, approval flows, and MCP-connected systems. For enterprise setup, the team can help map providers, policies, integrations, and rollout requirements.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {[
                        'Private local-first deployment patterns',
                        'MCP connections for internal systems',
                        'Provider setup for local or approved hosted LLMs',
                        'Workflow design for operations, support, and back office teams',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 text-gray-300">
                          <Check className="text-brand-teal w-5 h-5 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=Enterprise%20AI-Worker%20setup`}
                      onClick={() => trackClick('enterprise_email', { location: 'enterprise' })}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-brand-dark rounded-xl font-bold transition-colors"
                    >
                      <Mail size={18} />
                      Contact {CONTACT_EMAIL}
                    </a>
                  </div>
                  <div className="bg-brand-dark border-t lg:border-t-0 lg:border-l border-surface-border p-8 md:p-12 flex flex-col justify-center">
                    <p className="text-xs text-gray-500 uppercase tracking-[0.25em] mb-5">Typical rollout</p>
                    <ol className="space-y-5">
                      {[
                        'Confirm target workflows and data boundaries.',
                        'Choose local or approved hosted model providers.',
                        'Configure MCP access to internal tools and files.',
                        'Pilot with a small user group before wider rollout.',
                      ].map((step, index) => (
                        <li key={step} className="flex gap-4">
                          <span className="w-8 h-8 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center font-bold text-sm flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-300 leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </section>
      
            {/* Download Section */}
            <section id="download" aria-labelledby="download-heading" className="py-24 px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-brand-teal font-bold uppercase tracking-[0.25em] text-xs mb-4">Download</p>
                    <h2 id="download-heading" className="text-3xl md:text-5xl font-bold mb-6 text-white">Install AI-Worker in one step, then open the guide if you want a walkthrough.</h2>
                    <p className="text-lg text-gray-400 max-w-2xl leading-relaxed mb-8">
                      The app is free, MIT licensed, and available for macOS, Windows, and Linux. Choose the installer that matches your machine, or open the guide for a step-by-step setup path.
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => { trackClick('download_free', { location: 'home_download' }); navigate('download'); }}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal hover:bg-brand-tealHover text-white rounded-xl font-bold transition-colors shadow-lg shadow-brand-teal/10"
                      >
                        <Download size={20} />
                        Download Free
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        onClick={() => { trackClick('guide_route', { location: 'home_download' }); navigate('guide'); }}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white rounded-xl font-bold transition-colors"
                      >
                        <FileText size={18} />
                        How to Use
                      </motion.button>
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        href={GITHUB_REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick('github_repo', { location: 'home_download' })}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white rounded-xl font-bold transition-colors"
                      >
                        <Github size={18} />
                        View Source
                      </motion.a>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="rounded-[2rem] border border-surface-border bg-surface-card p-7 md:p-8"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-6">Choose your installer</p>
                    <div className="space-y-3">
                      {[
                        { label: 'macOS', href: 'https://downloads.ai-worker.tech/install-mac.sh', note: 'Apple Silicon and Intel', tracking: 'home_mac' },
                        { label: 'Windows', href: 'https://downloads.ai-worker.tech/install-windows.ps1', note: 'Windows 10 and 11', tracking: 'home_windows' },
                        { label: 'Linux', href: 'https://downloads.ai-worker.tech/install-linux.sh', note: 'x86_64 and ARM64', tracking: 'home_linux' },
                      ].map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => trackClick(item.tracking)}
                          className="flex items-center justify-between gap-4 rounded-2xl border border-surface-border bg-surface-elevated hover:bg-surface-hover px-4 py-4 transition-colors"
                        >
                          <div>
                            <p className="text-white font-bold">{item.label}</p>
                            <p className="text-sm text-gray-400">{item.note}</p>
                          </div>
                          <span className="text-sm font-semibold text-brand-teal">Installer</span>
                        </a>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" aria-labelledby="faq-heading" className="py-20 px-4 bg-surface-card border-y border-surface-border">
              <div className="max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10">
                  <div>
                    <p className="text-brand-teal font-bold uppercase tracking-[0.25em] text-xs mb-4">FAQ</p>
                    <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-white">Common setup questions.</h2>
                  </div>
                  <div className="space-y-4">
                    {FAQ_ITEMS.map((item) => (
                      <div key={item.question} className="border-b border-surface-border pb-4">
                        <h3 className="text-lg font-bold text-white mb-2">{item.question}</h3>
                        <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
      
            {/* Footer */}
            <footer aria-label="Site footer" className="bg-brand-dark py-12 border-t border-surface-border">
              <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-teal to-brand-primary rounded-lg flex items-center justify-center">
                    <Network className="text-white w-5 h-5" aria-hidden="true" />
                  </div>
                  <span className="font-bold text-lg">AI-Worker</span>
                  <span className="sr-only"> — Free Desktop AI Agent</span>
                </div>
      
                <nav aria-label="Footer navigation" className="flex gap-8 text-sm text-gray-400">
                  <button type="button" onClick={navigateToFeatures} className="hover:text-white transition-colors">Features</button>
                  <a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a>
                  <a href="#setup" className="hover:text-white transition-colors">Setup</a>
                  <button type="button" onClick={() => navigate('guide')} className="hover:text-white transition-colors">Guide</button>
                  <button
                    type="button"
                    onClick={() => navigate('capabilities')}
                    className="hover:text-white transition-colors">Capabilities</button>
                  <button
                    type="button"
                    onClick={() => navigate('download')}
                    className="hover:text-white transition-colors">Download</button>
                  <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                </nav>
      
                <div className="flex flex-col items-center md:items-end gap-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    onClick={() => trackClick('contact_email', { location: 'footer' })}
                    className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-gray-200 transition-colors">
                    Enterprise Contact
                  </a>
                  <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} AI-Worker. MIT open source.</p>
                </div>
              </div>
            </footer>
          </motion.main>
        )}
        {page === 'capabilities' && (
          <motion.div
            key="capabilities"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <ProductsPage onBack={() => navigate('home')} onDownload={() => navigate('download')} onGuide={() => navigate('guide')} />
          </motion.div>
        )}
        {page === 'download' && (
          <motion.div
            key="download"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <DownloadPage onBack={() => navigate('home')} />
          </motion.div>
        )}
        {page === 'guide' && (
          <motion.div
            key="guide"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full"
          >
            <GuidePage onBack={() => navigate('home')} onDownload={() => navigate('download')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
