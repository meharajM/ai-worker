import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Download, Settings, Network, FileText, Mail, CheckCircle2 } from 'lucide-react';
import { trackClick } from '../utils/analytics';

interface GuidePageProps {
  onBack: () => void;
  onDownload: () => void;
}

const GITHUB_REPO_URL = 'https://github.com/meharajM/ai-worker.app';
const DOWNLOAD_PAGE_URL = 'https://ai-worker.tech/download';
const MAC_INSTALL_URL = 'https://downloads.ai-worker.tech/install-mac.sh';
const WINDOWS_INSTALL_URL = 'https://downloads.ai-worker.tech/install-windows.ps1';
const LINUX_INSTALL_URL = 'https://downloads.ai-worker.tech/install-linux.sh';
const CONTACT_EMAIL = 'contact@ai-worker.tech';
const PR_SCREENSHOT_BASE = 'https://raw.githubusercontent.com/meharajM/ai-worker.app/d3ba4d4030e763636178508e0938bd70225cc466/docs/screenshots';

const GUIDE_FAQ_ITEMS = [
  {
    question: 'How do I install AI-Worker?',
    answer: 'Open the download page or use the direct macOS, Windows, or Linux installer links in this guide. The app is free and does not require an account to install.',
  },
  {
    question: 'Can non-developers use AI-Worker?',
    answer: 'Yes. Non-developers can install the desktop app, choose a model provider in Hub Settings, enable built-in MCP tools, and run their first workflow from chat.',
  },
  {
    question: 'Which AI providers work with AI-Worker?',
    answer: 'AI-Worker can use local providers such as Ollama and supported hosted or OpenAI-compatible providers, depending on what you configure in Hub Settings.',
  },
  {
    question: 'What are MCP tools in AI-Worker?',
    answer: 'MCP tools let AI-Worker connect to capabilities such as memory, filesystem access, document conversion, browser automation, and custom internal tools.',
  },
  {
    question: 'Can enterprises set up AI-Worker for internal systems?',
    answer: `Yes. Enterprises can contact ${CONTACT_EMAIL} for help mapping AI-Worker to internal tools, approved providers, MCP connections, and rollout requirements.`,
  },
];

const SCREENSHOTS = [
  {
    src: `${PR_SCREENSHOT_BASE}/chat-home.png`,
    alt: 'AI-Worker home screen',
    title: 'Home screen',
    caption: 'Chat-first workspace with starter tiles and the main message composer.',
  },
  {
    src: `${PR_SCREENSHOT_BASE}/mcp-connections.png`,
    alt: 'MCP connections screen',
    title: 'MCP connections',
    caption: 'Inspect built-in tools and connect custom MCP servers from one place.',
  },
  {
    src: `${PR_SCREENSHOT_BASE}/settings-llm.png`,
    alt: 'LLM provider settings screen',
    title: 'LLM settings',
    caption: 'Choose local or hosted providers and switch between setups.',
  },
];

const GuidePage: React.FC<GuidePageProps> = ({ onBack, onDownload }) => {
  useEffect(() => {
    const originalTitle = document.title;
    const guideTitle = 'AI-Worker Setup Guide | Install, Configure Providers, and Use MCP Tools';
    const guideDescription = 'Step-by-step AI-Worker setup guide for macOS, Windows, and Linux. Learn how to install the free MIT open-source app, configure LLM providers, enable MCP tools, and run your first workflow.';
    document.title = guideTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalContent = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute('content', guideDescription);
    }

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const originalCanonical = canonical?.getAttribute('href') || '';
    if (canonical) canonical.setAttribute('href', 'https://ai-worker.tech/guide');

    const routeMeta = [
      { selector: 'meta[property="og:title"]', value: guideTitle },
      { selector: 'meta[property="og:description"]', value: guideDescription },
      { selector: 'meta[property="og:url"]', value: 'https://ai-worker.tech/guide' },
      { selector: 'meta[name="twitter:title"]', value: guideTitle },
      { selector: 'meta[name="twitter:description"]', value: guideDescription },
      { selector: 'meta[name="twitter:url"]', value: 'https://ai-worker.tech/guide' },
    ].map(({ selector, value }) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      const previous = element?.getAttribute('content') || '';
      if (element) element.setAttribute('content', value);
      return { element, previous };
    });

    const structuredData = document.createElement('script');
    structuredData.type = 'application/ld+json';
    structuredData.id = 'guide-structured-data';
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'HowTo',
          name: 'How to install and set up AI-Worker',
          description: 'Install AI-Worker, configure an LLM provider, enable MCP tools, and run a first desktop AI workflow.',
          url: 'https://ai-worker.tech/guide',
          totalTime: 'PT10M',
          tool: [
            { '@type': 'HowToTool', name: 'AI-Worker desktop app' },
            { '@type': 'HowToTool', name: 'Model provider such as Ollama or an OpenAI-compatible API' },
          ],
          step: [
            {
              '@type': 'HowToStep',
              name: 'Download AI-Worker',
              text: 'Open the download page and choose the macOS, Windows, or Linux installer.',
              url: 'https://ai-worker.tech/download',
            },
            {
              '@type': 'HowToStep',
              name: 'Choose a model provider',
              text: 'Open Hub Settings and configure a local provider such as Ollama or a supported hosted provider.',
            },
            {
              '@type': 'HowToStep',
              name: 'Enable MCP tools',
              text: 'Open MCP Connections and enable memory, filesystem, document conversion, browser automation, or custom MCP servers.',
            },
            {
              '@type': 'HowToStep',
              name: 'Run a first workflow',
              text: 'Start from Hub Chat with a simple file, browser, or research task.',
            },
          ],
        },
        {
          '@type': 'FAQPage',
          mainEntity: GUIDE_FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        },
      ],
    });
    document.head.appendChild(structuredData);

    return () => {
      document.title = originalTitle;
      if (metaDescription) metaDescription.setAttribute('content', originalContent);
      if (canonical) canonical.setAttribute('href', originalCanonical);
      routeMeta.forEach(({ element, previous }) => {
        if (element) element.setAttribute('content', previous);
      });
      structuredData.remove();
    };
  }, []);

  return (
    <main className="min-h-screen font-sans text-white bg-brand-dark overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50 bg-brand-dark border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { trackClick('guide_back_clicked'); onBack(); }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-lg px-2 py-1"
            aria-label="Go back to Home page"
          >
            <ChevronLeft size={18} />
            Return to Home
          </motion.button>
          <div className="h-5 w-px bg-surface-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-teal rounded-lg flex items-center justify-center">
              <FileText className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg">AI-Worker</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-teal/20 text-brand-teal font-medium border border-brand-teal/30">
              Guide
            </span>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-elevated border border-surface-border text-brand-teal text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
            Setup guide for non-dev users and teams
          </div>
          <h1 className="text-[clamp(2.5rem,5vw+1.5rem,4.2rem)] font-extrabold tracking-tight mb-6 leading-tight">
            AI-Worker setup guide: install, configure, and run your first workflow
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Learn how to install AI-Worker on macOS, Windows, or Linux, configure a model provider, enable MCP tools, and start a useful desktop AI workflow without needing to code.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => { trackClick('guide_open_download_page'); onDownload(); }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-teal hover:bg-brand-tealHover text-white font-bold text-sm transition-colors"
            >
              <Download size={16} />
              Download Free
            </button>
            <a
              href="#steps"
              onClick={() => trackClick('guide_jump_steps')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white font-bold text-sm transition-colors"
            >
              <FileText size={16} />
              View Steps
            </a>
          </div>
        </motion.div>

        <section id="install" className="sticky top-20 z-30 mb-10 rounded-[2rem] border border-surface-border bg-surface-card/95 backdrop-blur overflow-hidden shadow-2xl scroll-mt-28">
          <div className="p-5 md:p-6 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-2">Install first</p>
              <h2 className="text-xl md:text-2xl font-bold text-white">Download Free, then pick your installer below.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={DOWNLOAD_PAGE_URL}
                onClick={() => trackClick('guide_download_page')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-teal hover:bg-brand-tealHover text-white font-bold text-sm transition-colors"
              >
                <Download size={16} />
                Download Free
              </a>
              <a
                href={MAC_INSTALL_URL}
                onClick={() => trackClick('guide_install_mac')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white font-bold text-sm transition-colors"
              >
                macOS
              </a>
              <a
                href={WINDOWS_INSTALL_URL}
                onClick={() => trackClick('guide_install_windows')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white font-bold text-sm transition-colors"
              >
                Windows
              </a>
              <a
                href={LINUX_INSTALL_URL}
                onClick={() => trackClick('guide_install_linux')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white font-bold text-sm transition-colors"
              >
                Linux
              </a>
            </div>
          </div>
        </section>

        <div id="steps" className="space-y-6">
          {[
            {
              step: 'Step 1',
              icon: <Download size={22} />,
              title: 'Install the app',
              text: 'Use the download page to pick your operating system, or use the direct installer links above for macOS, Windows, or Linux.',
              links: [
                { label: 'Download Free', href: DOWNLOAD_PAGE_URL, tracking: 'guide_install_download_page' },
                { label: 'macOS', href: MAC_INSTALL_URL, tracking: 'guide_install_mac_step' },
                { label: 'Windows', href: WINDOWS_INSTALL_URL, tracking: 'guide_install_windows_step' },
                { label: 'Linux', href: LINUX_INSTALL_URL, tracking: 'guide_install_linux_step' },
              ],
              shot: SCREENSHOTS[0],
            },
            {
              step: 'Step 2',
              icon: <Settings size={22} />,
              title: 'Choose a provider',
              text: 'Open Hub Settings and connect Ollama for local models, or use an OpenAI-compatible, Gemini, or other supported provider if you already have one.',
              shot: SCREENSHOTS[2],
            },
            {
              step: 'Step 3',
              icon: <Network size={22} />,
              title: 'Enable tools',
              text: 'Open MCP Connections to inspect built-in memory, filesystem, MarkItDown, browser automation, or custom MCP servers.',
              shot: SCREENSHOTS[1],
            },
          ].map((item, index) => (
            <motion.section
              key={item.step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="overflow-hidden rounded-[2rem] border border-surface-border bg-surface-card"
            >
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-7 md:p-10 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-surface-border">
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">{item.step}</p>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{item.title}</h2>
                      <p className="text-gray-400 leading-relaxed text-lg">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  {'links' in item && item.links && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={() => trackClick(link.tracking)}
                          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                            link.label === 'Download Free'
                              ? 'bg-brand-teal hover:bg-brand-tealHover text-white'
                              : 'bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white'
                          }`}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="bg-brand-dark">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={item.shot.src}
                      alt={item.shot.alt}
                      className="h-full w-full object-cover"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-surface-border bg-surface-card p-7">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">What a first run should look like</h2>
              <p className="text-gray-400 leading-relaxed max-w-4xl">
                You should be able to install the app, open Hub Settings, connect a provider, verify MCP tools, and run a small task from chat without reading code. If you are rolling this out for a team, keep the same flow and map internal systems one by one.
              </p>
            </div>
          </div>
        </div>

        <section id="guide-faq" aria-labelledby="guide-faq-heading" className="mt-10 rounded-3xl border border-surface-border bg-surface-card p-7 md:p-10">
          <div className="grid lg:grid-cols-[0.75fr_1.25fr] gap-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">Questions and answers</p>
              <h2 id="guide-faq-heading" className="text-3xl font-bold text-white mb-4">AI-Worker setup FAQ</h2>
              <p className="text-gray-400 leading-relaxed">
                Short answers for people searching how to install AI-Worker, configure providers, enable MCP tools, or roll it out inside a team.
              </p>
            </div>
            <div className="space-y-6">
              {GUIDE_FAQ_ITEMS.map((item) => (
                <article key={item.question} className="border-b border-surface-border pb-5 last:border-b-0 last:pb-0">
                  <h3 className="text-xl font-bold text-white mb-2">{item.question}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="enterprise-guide" aria-labelledby="enterprise-guide-heading" className="mt-10 rounded-3xl border border-surface-border bg-surface-card p-7 md:p-10">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">Enterprise setup</p>
              <h2 id="enterprise-guide-heading" className="text-3xl font-bold text-white mb-3">Need AI-Worker configured for an enterprise ecosystem?</h2>
              <p className="text-gray-400 leading-relaxed max-w-3xl">
                Teams can map AI-Worker to approved model providers, internal tools, private files, browser workflows, and custom MCP servers. For enterprise rollout support, email the AI-Worker team.
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Enterprise%20AI-Worker%20setup`}
              onClick={() => trackClick('guide_enterprise_email')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-gray-100 text-brand-dark font-bold text-sm transition-colors"
            >
              <Mail size={16} />
              Contact {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default GuidePage;
