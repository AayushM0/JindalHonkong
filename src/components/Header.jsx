import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'About Us', href: '#about-us' },
  { label: 'HK', href: '#why-hongkong' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Security', href: '#security' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 flex items-center border-b ${
        scrolled 
          ? 'bg-white/75 backdrop-blur-[12px] border-border/80 shadow-sm' 
          : 'bg-white/70 backdrop-blur-[12px] border-border/40'
      }`}
      style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left-aligned logo with #020617 square icon */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="Jindalsons Limited — home"
        >
          <div className="w-6 h-6 bg-[#020617] rounded flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
            <div className="w-2.5 h-2.5 bg-[#2563eb] rounded-sm" />
          </div>
          <span className="text-[#020617] font-extrabold text-base tracking-tight">
            Jindalsons<span className="font-normal text-slate-500"> Limited</span>
          </span>
        </a>

        {/* Center-aligned nav links */}
        <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="text-sm font-medium text-slate-600 hover:text-primary transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right-aligned Contact button */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNav('#contact')}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer hover:bg-slate-800 hover:shadow-md active:scale-[0.98]"
            aria-label="Contact us"
          >
            Contact
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-slate-900 p-1.5 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-[12px] border-b border-border/80 shadow-lg overflow-hidden md:hidden"
          >
            <nav className="px-6 py-5 flex flex-col gap-4" aria-label="Mobile navigation">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  onClick={() => handleNav(l.href)}
                  className="text-slate-600 hover:text-primary text-left text-sm font-medium py-1.5 transition-colors duration-300 ease-custom-ease cursor-pointer"
                >
                  {l.label}
                </motion.button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium text-center w-full mt-2 hover:bg-slate-800"
              >
                Contact
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
