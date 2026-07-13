import React from 'react';
import { Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import logoImg from '../assets/logo.jpeg';

export default function Footer() {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About Us', href: '#about-us' },
    { label: 'HK Advantages', href: '#why-hongkong' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Security', href: '#security' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-slate-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Simplified Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-slate-900 pb-12">
          
          {/* Column 1: Logo & Address */}
          <div className="flex flex-col gap-5">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group cursor-pointer"
          aria-label="Jindalsons Limited — home"
        >
          <img
            src={logoImg}
            alt="Jindalsons Limited Logo"
            className="w-7 h-7 object-contain rounded transition-transform duration-300 group-hover:rotate-6"
          />
          <span className="text-white font-extrabold text-base tracking-tight">
            Jindalsons<span className="font-normal text-slate-400"> Ltd</span>
          </span>
        </a>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Hong Kong's premier enterprise corporate governance and advisory portal. Trusted compliance solutions for international founders.
            </p>

            <div className="flex items-start gap-3 mt-2 text-xs">
              <MapPin className="text-primary shrink-0 mt-0.5" size={14} />
              <a
                href="https://maps.google.com/?q=Unit+No.+87,+Basement+1+Floor+(Lower+G/F),+Houston+Centre,+No.+63+Mody+Road,+Tsim+Sha+Tsui,+Kowloon,+Hong+Kong"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Unit No. 87, Basement 1 Floor (Lower G/F), Houston Centre, No. 63 Mody Road, Tsim Sha Tsui, Kowloon, Hong Kong
              </a>
            </div>
          </div>

          {/* Column 2: Contact Desk & Hours */}
          <div className="flex flex-col gap-4 text-xs">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              Contact Desk
            </span>

            <div className="flex items-center gap-3 mt-1">
              <Mail className="text-primary shrink-0" size={14} />
              <a href="mailto:jindalsonslimited@gmail.com" className="hover:text-white transition-colors">
                jindalsonslimited@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle className="text-primary shrink-0" size={14} />
              <a href="https://wa.me/85293511790" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                +852 9351 1790 (WhatsApp)
              </a>
            </div>

            <div className="flex items-center gap-3 text-slate-500">
              <Clock className="text-primary shrink-0" size={14} />
              <span>Mon–Fri, 09:00–18:00 HKT</span>
            </div>
          </div>

          {/* Column 3: Navigation links */}
          <div className="flex flex-col gap-4 text-xs">
            <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">
              Navigation
            </span>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2.5 font-medium" aria-label="Footer navigation">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScroll(link.href)}
                  className="text-left hover:text-white transition-all duration-300 ease-custom-ease cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 text-xs text-slate-500">
          <p>© 2026 Jindalsons Limited. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
