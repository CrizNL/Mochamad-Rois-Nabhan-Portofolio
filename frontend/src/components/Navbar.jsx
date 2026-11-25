import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { label: 'Work', href: '#portfolio', id: 'portfolio' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Credentials', href: '#achievements', id: 'achievements' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = ['home', 'portfolio', 'experience', 'achievements', 'contact'];
      const scrollPos = window.scrollY + 140;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? 'bg-[#090A0C]/90 backdrop-blur-md border-b border-white/[0.08]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        {/* Wordmark */}
        <a
          href="#home"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 group"
        >
          <span className="w-8 h-8 rounded-md bg-[#111317] border border-white/[0.12] flex items-center justify-center font-mono-tech text-xs font-semibold tracking-tight text-[#F2F1ED] group-hover:border-[#2DD4BF]/60 transition-colors">
            RN
          </span>
          <div className="flex flex-col">
            <span className="font-display text-sm sm:text-[15px] font-semibold tracking-tight text-[#F2F1ED] leading-none">
              Mochamad Rois Nabhan
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-[#9BA1A6] mt-1 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
              South Jakarta, ID
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#F2F1ED] bg-white/[0.06]'
                    : 'text-[#9BA1A6] hover:text-[#F2F1ED]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right CTA & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#F2F1ED] text-[#090A0C] text-xs font-semibold tracking-wide hover:bg-white transition-colors"
          >
            Get in Touch
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden w-9 h-9 rounded-md border border-white/[0.1] bg-[#111317] flex items-center justify-center text-[#F2F1ED] hover:border-white/25 transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/[0.08] bg-[#090A0C]/98 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-3 rounded-md text-sm font-medium flex items-center justify-between ${
                      isActive
                        ? 'text-[#2DD4BF] bg-white/[0.05]'
                        : 'text-[#F2F1ED]/85 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#6C727A]" />
                  </a>
                );
              })}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 w-full py-2.5 px-4 rounded-md bg-[#F2F1ED] text-[#090A0C] text-sm font-semibold text-center"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
