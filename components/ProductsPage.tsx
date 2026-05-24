import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Cpu, Shield, FileText, Github, Mail, Download, Network, Globe2, CheckCircle2 } from 'lucide-react';
import { trackClick } from '../utils/analytics';

interface ProductsPageProps {
  onBack: () => void;
  onDownload: () => void;
  onGuide: () => void;
}

const GITHUB_REPO_URL = 'https://github.com/meharajM/ai-worker.app';
const CONTACT_EMAIL = 'contact@ai-worker.tech';

const CAPABILITIES = [
  {
    icon: <FileText size={24} />,
    title: 'Chat and files',
    text: 'Start with a prompt, drop in a file, or ask AI-Worker to summarize what matters and keep the session organized.',
  },
  {
    icon: <Globe2 size={24} />,
    title: 'Browser work',
    text: 'Use the built-in browser automation flow for navigation, data entry, screenshots, and repeatable web tasks.',
  },
  {
    icon: <Network size={24} />,
    title: 'MCP connections',
    text: 'Connect memory, filesystem, document conversion, and custom MCP tools so the workspace can reach your real systems.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Provider choice',
    text: 'Run local models with Ollama or connect approved hosted providers when your team wants a managed setup.',
  },
];

const ProductsPage: React.FC<ProductsPageProps> = ({ onBack, onDownload, onGuide }) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Capabilities | AI-Worker';

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalContent = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore the core capabilities of AI-Worker, the free MIT open-source desktop AI workspace for chat, files, browser automation, MCP tools, and provider-agnostic workflows.'
      );
    }

    return () => {
      document.title = originalTitle;
      if (metaDescription) metaDescription.setAttribute('content', originalContent);
    };
  }, []);

  return (
    <main className="min-h-screen font-sans text-white bg-brand-dark overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50 bg-brand-dark border-b border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { trackClick('products_back_clicked'); onBack(); }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal rounded-lg px-2 py-1"
            aria-label="Go back to Home page"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            Return to Home
          </motion.button>
          <div className="h-5 w-px bg-surface-border" />
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            aria-label="Return to AI-Worker home"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-teal rounded-lg flex items-center justify-center">
              <Cpu className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg">AI-Worker</span>
          </button>
        </div>
      </div>

      <div className="pt-32 pb-24 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-elevated border border-surface-border text-brand-teal text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
            Free MIT open source
          </div>
          <h1 className="text-[clamp(2.5rem,5vw+1.5rem,4rem)] font-extrabold tracking-tight mb-6 leading-tight text-white">
            Everything <span className="gradient-text">AI-Worker</span> includes
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            AI-Worker is the main desktop workspace. It gives individuals, non-dev users, and teams one place for chat, files, browser automation, MCP tools, and model-provider setup.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto mb-14">
          {CAPABILITIES.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="rounded-3xl border border-surface-border bg-surface-card p-7 md:p-8"
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-5">
                {item.icon}
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">{item.title}</h2>
              <p className="text-gray-400 leading-relaxed">{item.text}</p>
            </motion.article>
          ))}
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6 max-w-6xl mx-auto items-start">
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-surface-border bg-surface-card p-8 md:p-10"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">How teams use it</p>
            <h2 className="text-3xl font-bold text-white mb-8">A simple flow that works for non-technical users too.</h2>
            <div className="space-y-6">
              {[
                'Install the app and open the desktop workspace.',
                'Choose a local or approved model provider in settings.',
                'Enable the tools your team actually needs, then start from chat.',
              ].map((step, index) => (
                <div key={step} className="flex gap-4">
                  <span className="w-9 h-9 rounded-full bg-brand-teal/20 text-brand-teal flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-300 leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="rounded-[2rem] border border-surface-border bg-surface-card p-8 md:p-10"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-4">Actions</p>
            <h2 className="text-3xl font-bold text-white mb-6">Get started or hand it to your team.</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => { trackClick('products_download_free'); onDownload(); }}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-brand-teal hover:bg-brand-tealHover text-white font-bold transition-colors"
              >
                <Download size={18} />
                Download Free
              </button>
              <button
                type="button"
                onClick={() => { trackClick('products_open_guide'); onGuide(); }}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white font-bold transition-colors"
              >
                <FileText size={18} />
                How to Use
              </button>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClick('products_github_repo')}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-surface-elevated hover:bg-surface-hover border border-surface-border text-white font-bold transition-colors"
              >
                <Github size={18} />
                GitHub Repo
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Enterprise%20AI-Worker%20setup`}
                onClick={() => trackClick('products_enterprise_contact')}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white hover:bg-gray-100 text-brand-dark font-bold transition-colors"
              >
                <Mail size={18} />
                Enterprise Contact
              </a>
            </div>
            <div className="mt-8 rounded-2xl border border-surface-border bg-surface-elevated p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-brand-teal w-5 h-5 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Free to use under the MIT license, with direct installers and a public setup guide for non-dev users.
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
