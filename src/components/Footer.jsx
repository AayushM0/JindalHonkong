import React from 'react';
import { Diamond, Mail, MessageCircle } from 'lucide-react';

export default function Footer() {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary text-white border-t border-white/10" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/10 pb-8 mb-8">
          
          {/* Logo & Brand Column */}
          <div className="md:col-span-4 flex items-center gap-2">
            <Diamond size={16} className="text-gold fill-gold" />
            <span className="text-white font-semibold text-base tracking-tight">
              Jindalsons<span className="text-gold font-light"> Limited</span>
            </span>
          </div>

          {/* Quick Links Column */}
          <nav className="md:col-span-5 flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-center" aria-label="Footer Navigation">
            <button onClick={() => handleScroll('#services')} className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
              Services
            </button>
            <button onClick={() => handleScroll('#formation')} className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
              Formation
            </button>
            <button onClick={() => handleScroll('#why-hk')} className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
              Why HK
            </button>
            <button onClick={() => handleScroll('#values')} className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => handleScroll('#contact')} className="text-white/60 hover:text-white text-sm transition-colors cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Social Links Column */}
          <div className="md:col-span-3 flex justify-start md:justify-end gap-4">
            <a
              href="mailto:jindalsonslimited@gmail.com"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
              aria-label="Email Jindalsons Limited"
            >
              <Mail size={16} />
            </a>
            <a
              href="https://wa.me/85293511790"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer"
              aria-label="Contact via WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
          </div>

        </div>

        {/* Copyright & Disclaimer info */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-white/40">
          <p>© 2025 Jindalsons Limited. All rights reserved.</p>
          <p className="max-w-md text-left sm:text-right leading-relaxed">
            Registered corporate secretaria service provider in Hong Kong. Incorporations, bookkeeping, and advisory outcomes are subject to regulatory approvals.
          </p>
        </div>

      </div>
    </footer>
  );
}
