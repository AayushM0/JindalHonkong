import { useState, useEffect } from 'react';
import { Menu, X, Diamond } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Services',   href: '#services'   },
  { label: 'Formation',  href: '#formation'  },
  { label: 'Why HK',     href: '#why-hk'     },
  { label: 'About',      href: '#values'     },
  { label: 'Contact',    href: '#contact'    },
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-primary/95 backdrop-blur-md shadow-xl' : 'bg-primary'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2 group cursor-pointer"
          aria-label="Jindalsons Limited — home"
        >
          <Diamond
            size={18}
            className="text-gold fill-gold transition-transform duration-300 group-hover:rotate-45"
          />
          <span className="text-white font-semibold text-lg tracking-tight">
            Jindalsons<span className="text-gold font-light"> Limited</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              className="nav-link"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => handleNav('#contact')}
            className="btn-primary"
            aria-label="Get started with Jindalsons"
          >
            Get Started
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden bg-primary border-t border-white/10 overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col gap-4" aria-label="Mobile navigation">
              {links.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  onClick={() => handleNav(l.href)}
                  className="text-white/80 hover:text-white text-left font-medium py-2 transition-colors duration-200 cursor-pointer"
                >
                  {l.label}
                </motion.button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="btn-primary mt-2 w-full text-center"
              >
                Get Started
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
