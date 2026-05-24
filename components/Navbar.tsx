import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Github } from 'lucide-react';
import { trackDownload } from '../utils/analytics';
import { motion } from 'framer-motion';

interface NavbarProps {
  onDownloadClick?: () => void;
  onHomeClick?: () => void;
  onFeaturesClick?: () => void;
  onCapabilitiesClick?: () => void;
  onGuideClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onDownloadClick, onHomeClick, onFeaturesClick, onCapabilitiesClick, onGuideClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark border-b border-surface-border' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <button
            type="button"
            onClick={() => onHomeClick?.()}
            aria-label="Home page"
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 focus:ring-offset-brand-dark rounded-xl"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-teal rounded-xl flex items-center justify-center">
              <Cpu className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">AI-Worker</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                type="button"
                onClick={() => onFeaturesClick?.()}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                Features
              </button>
              <button
                type="button"
                onClick={() => onCapabilitiesClick?.()}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                Capabilities
              </button>
              <button
                type="button"
                onClick={() => onGuideClick?.()}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
              >
                Guide
              </button>
              <a
                href="https://github.com/meharajM/ai-worker.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={() => { trackDownload('free_installer', 'unknown', { location: 'navbar_desktop' }); onDownloadClick?.(); }}
              className="inline-block bg-white text-brand-dark hover:bg-gray-100 px-6 py-2.5 rounded-full font-bold text-sm transition-colors shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark">
              Download Free
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-teal"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-dark border-b border-surface-border">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            <button
              type="button"
              className="text-gray-300 hover:text-white block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors"
              onClick={() => {
                setMobileMenuOpen(false);
                onFeaturesClick?.();
              }}
            >
              Features
            </button>
            <button
              type="button"
              className="text-gray-300 hover:text-white block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors"
              onClick={() => {
                setMobileMenuOpen(false);
                onCapabilitiesClick?.();
              }}
            >
              Capabilities
            </button>
            <button
              type="button"
              className="text-gray-300 hover:text-white block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-colors"
              onClick={() => {
                setMobileMenuOpen(false);
                onGuideClick?.();
              }}
            >
              Guide
            </button>
            <a
              href="https://github.com/meharajM/ai-worker.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white flex items-center gap-2 px-4 py-3 rounded-md text-base font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Github size={18} />
              GitHub
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                trackDownload('free_installer', 'unknown', { location: 'navbar_mobile' });
                onDownloadClick?.();
              }}
              className="w-full text-center bg-brand-primary/20 text-brand-primary block px-4 py-4 rounded-md text-base font-bold mt-4">
              Download Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
