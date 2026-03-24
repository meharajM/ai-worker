import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Apple, Terminal, ChevronLeft, Cpu, Check, Copy } from 'lucide-react';
import { trackDownload } from '../utils/analytics';

interface DownloadOption {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  badge?: string;
  platform: string;
  shell: string;
  command: string;
}

const DOWNLOAD_OPTIONS: DownloadOption[] = [
  {
    id: 'mac-apple',
    label: 'macOS',
    sublabel: 'Apple Silicon (M1/M2/M3)',
    icon: <Apple size={28} />,
    badge: 'Recommended',
    platform: 'mac-arm64',
    shell: 'bash',
    command: 'curl -fsSL https://downloads.ai-worker.tech/install-mac.sh | bash',
  },
  {
    id: 'mac-intel',
    label: 'macOS',
    sublabel: 'Intel (x86_64)',
    icon: <Apple size={28} />,
    platform: 'mac-x64',
    shell: 'bash',
    command: 'curl -fsSL https://downloads.ai-worker.tech/install-mac.sh | bash',
  },
  {
    id: 'windows',
    label: 'Windows',
    sublabel: 'Windows 10 / 11 (x64)',
    icon: <Monitor size={28} />,
    platform: 'windows',
    shell: 'powershell',
    command: 'irm https://downloads.ai-worker.tech/install-windows.ps1 | iex',
  },
  {
    id: 'linux',
    label: 'Linux',
    sublabel: 'x86_64 / ARM64',
    icon: <Terminal size={28} />,
    platform: 'linux',
    shell: 'bash',
    command: 'curl -fsSL https://downloads.ai-worker.tech/install-linux.sh | bash',
  },
];

const SHELL_LABELS: Record<string, string> = {
  bash: 'Terminal',
  powershell: 'PowerShell',
};

interface DownloadPageProps {
  onBack: () => void;
}

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for non-https
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all"
    >
      {copied ? (
        <>
          <Check size={12} className="text-brand-teal" />
          <span className="text-brand-teal">Copied!</span>
        </>
      ) : (
        <>
          <Copy size={12} />
          Copy
        </>
      )}
    </button>
  );
};

const DownloadPage: React.FC<DownloadPageProps> = ({ onBack }) => {
  const [selectedId, setSelectedId] = useState<string>('mac-apple');

  const selectedOption = DOWNLOAD_OPTIONS.find((o) => o.id === selectedId)!;

  const handleSelect = (option: DownloadOption) => {
    setSelectedId(option.id);
    trackDownload(option.platform, option.platform, { location: 'download_page', method: 'cli' });
  };

  return (
    <div className="min-h-screen font-sans text-white mesh-bg overflow-x-hidden">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20 gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium group"
          >
            <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
          <div className="h-5 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-primary to-brand-teal rounded-lg flex items-center justify-center">
              <Cpu className="text-white w-4 h-4" />
            </div>
            <span className="font-bold text-lg">AI-Worker</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-brand-teal/20 text-brand-teal font-medium border border-brand-teal/30">
              Beta
            </span>
          </div>
        </div>
      </div>

      <div className="pt-32 pb-24 px-4 max-w-3xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-teal text-sm font-medium mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand-teal animate-pulse" />
            Free Early Access — No Account Required
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            Download{' '}
            <span className="gradient-text">AI-Worker</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Select your platform, then paste the one-liner into your terminal. Done in seconds.
          </p>
        </motion.div>

        {/* Platform Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8"
        >
          {DOWNLOAD_OPTIONS.map((option, i) => {
            const isSelected = selectedId === option.id;
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => handleSelect(option)}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-200 text-center cursor-pointer
                  ${isSelected
                    ? 'bg-brand-teal/10 border-brand-teal/50 shadow-[0_0_24px_rgba(13,148,136,0.18)]'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20'
                  }`}
              >
                {option.badge && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] px-2 py-0.5 rounded-full bg-brand-teal text-white font-bold">
                    {option.badge}
                  </span>
                )}
                <div className={`transition-colors ${isSelected ? 'text-brand-teal' : 'text-gray-400'}`}>
                  {option.icon}
                </div>
                <div>
                  <p className={`font-bold text-sm leading-tight ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                    {option.label}
                  </p>
                  <p className="text-gray-500 text-[11px] mt-0.5 leading-tight">{option.sublabel}</p>
                </div>
                {isSelected && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-brand-teal" />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Command Block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/10 bg-[#0a0d16] overflow-hidden shadow-2xl mb-6"
          >
            {/* Window chrome */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <span className="text-xs text-gray-500 ml-1 font-medium">
                  {SHELL_LABELS[selectedOption.shell]}
                </span>
              </div>
              <CopyButton text={selectedOption.command} />
            </div>

            {/* Command content */}
            <div className="px-6 py-6">
              <div className="flex items-start gap-3">
                <span className="text-brand-teal font-bold font-mono text-base select-none mt-px">$</span>
                <code className="text-gray-100 font-mono text-sm sm:text-base leading-relaxed break-all">
                  {selectedOption.command}
                </code>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="rounded-2xl border border-white/5 bg-white/[0.02] p-6"
        >
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">How it works</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '01', text: 'Copy the one-liner above for your OS.' },
              { step: '02', text: 'Paste it into your terminal and press Enter.' },
              { step: '03', text: 'The installer downloads & launches AI-Worker automatically.' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-3">
                <span className="text-brand-teal font-bold font-mono text-sm flex-shrink-0">{step}</span>
                <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DownloadPage;
