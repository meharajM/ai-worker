import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Cpu, Shield, MessageCircle, Server, FileText } from 'lucide-react';
import { trackClick } from '../utils/analytics';

interface ProductsPageProps {
  onBack: () => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onBack }) => {
  useEffect(() => {
    // Basic SEO tags update for the SPA
    const originalTitle = document.title;
    document.title = "Products & Solutions | AI-Worker";

    const metaDescription = document.querySelector('meta[name="description"]');
    const originalContent = metaDescription?.getAttribute('content') || '';
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore AI-Worker products including the free desktop AI automation agent and the upcoming self-hosted WA Co-Pilot.');
    }

    return () => {
      document.title = originalTitle;
      if (metaDescription) metaDescription.setAttribute('content', originalContent);
    };
  }, []);

  return (
    <main className="min-h-screen font-sans text-white mesh-bg overflow-x-hidden" itemScope itemType="https://schema.org/CollectionPage">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20 gap-4">
          <button
            onClick={() => { trackClick('products_back_clicked'); onBack(); }}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group"
            aria-label="Go back to Home page"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <div className="h-5 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-teal rounded-lg flex items-center justify-center cursor-pointer" onClick={onBack}>
              <Cpu className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg cursor-pointer" onClick={onBack}>AI-Worker</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-teal text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
            Our Ecosystem
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Products & <span className="gradient-text">Solutions</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover the next generation of automation tools designed to run directly on your infrastructure, putting privacy and control back in your hands.
          </p>
        </motion.div>

        {/* Product List */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {/* WA Co-Pilot */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group relative bg-[#0f111a] rounded-3xl border border-white/10 p-1 overflow-hidden shadow-2xl"
            itemScope itemType="https://schema.org/SoftwareApplication"
          >
            {/* Top Gradient Line */}
            <div className="h-1 w-full bg-gradient-to-r from-green-400 via-brand-teal to-brand-primary"></div>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-12 items-start">
                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h2 className="text-3xl font-bold text-white" itemProp="name">WA Co-Pilot <span className="text-gray-400">Self-Hosted</span></h2>
                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-xs font-bold uppercase tracking-wider" aria-label="Status: Coming Soon">
                      Coming Soon
                    </span>
                  </div>

                  <p className="text-xl text-gray-300 mb-6 font-light" itemProp="description">
                    Turn any personal WhatsApp number into a 24×7 AI customer support agent + local dashboard. No cloud, no Meta API, no per-message fees.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-brand-teal/30 transition-colors">
                      <Shield className="text-brand-teal w-6 h-6 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-base text-white mb-1.5">100% Self-Hosted</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">Desktop software runs locally. Full data sovereignty and privacy. Optional sleep mode ensures safety.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-brand-teal/30 transition-colors">
                      <MessageCircle className="text-brand-teal w-6 h-6 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-base text-white mb-1.5">Zero API Fees</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">Uses your personal number via multi-device protocol. Avoid costly Meta API fees and rigid template approvals.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-brand-teal/30 transition-colors">
                      <Server className="text-brand-teal w-6 h-6 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-base text-white mb-1.5">Local LLM + RAG</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">Powered by local models (Llama-3.2-3B/Phi-3). Responds purely based on your synced PDFs, Sheets, and catalogs.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 bg-white/5 p-5 rounded-xl border border-white/5 hover:border-brand-teal/30 transition-colors">
                      <FileText className="text-brand-teal w-6 h-6 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-base text-white mb-1.5">Vertical Ready</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">Specialized knowledge packs included for Clinics, Salons, and local service businesses. Frustration handoff built-in.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      className="bg-white/5 text-gray-400 border border-white/5 px-8 py-4 rounded-xl font-bold text-sm focus:outline-none cursor-default"
                      aria-label="Target Release March 2026 for WA Co-Pilot"
                    >
                      Target Release: March 2026
                    </button>
                    <a
                      href="https://forms.gle/viNJoRzTbiwVBtTS6"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackClick('request_demo_wa_copilot')}
                      className="inline-flex items-center justify-center bg-brand-teal hover:bg-brand-tealHover text-white px-8 py-4 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(13,148,136,0.3)] hover:shadow-[0_0_30px_rgba(13,148,136,0.5)] focus:outline-none"
                    >
                      Request a Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          {/* AI-Worker */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="group relative bg-[#0f111a] rounded-3xl border border-white/10 p-1 overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(20,184,166,0.15)] hover:border-brand-teal/30 cursor-pointer"
            onClick={() => { trackClick('view_ai_worker_details'); onBack(); }}
            itemScope itemType="https://schema.org/SoftwareApplication"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                trackClick('view_ai_worker_details');
                onBack();
              }
            }}
          >
            <div className="h-1 w-full bg-gradient-to-r from-brand-primary via-purple-500 to-pink-500 opacity-50"></div>
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-purple-500/20 border border-white/10 flex items-center justify-center shrink-0">
                <Cpu className="w-12 h-12 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-2xl font-bold text-white" itemProp="name">AI-Worker</h2>
                  <span className="px-3 py-1 bg-brand-teal/20 text-brand-teal border border-brand-teal/30 text-xs font-bold uppercase rounded-full tracking-wide" aria-label="Status: Available Now">Available Now</span>
                </div>
                <p className="text-gray-400 mb-6 max-w-2xl leading-relaxed" itemProp="description">
                  Our flagship private desktop AI assistant. Connect your daily tools and automate your workflows directly on your machine. Reliable web actions and deep integrations, completely secure.
                </p>
                <span className="text-brand-teal font-bold transition-colors flex items-center gap-2 text-sm group-hover:underline">
                  View full details & Download →
                </span>
              </div>
            </div>
          </motion.article>

        </div>
      </div>
    </main>
  );
};

export default ProductsPage;
