import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="platform"
      className="relative min-h-[60vh] bg-white bg-grid pt-32 pb-24 px-6 overflow-hidden flex flex-col items-center justify-center"
      aria-label="Hero Landing"
    >
      {/* Centered Hero Content */}
      <div className="max-w-4xl text-center flex flex-col items-center animate-fade-in-up">

        {/* Pulsing Badge */}
        <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border border-primary/10">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>System Online: HK Company Incorporation in 1–3 Days</span>
        </div>

        {/* Title */}
        <h1 className="text-[#020617] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Your Gateway to <br className="hidden sm:inline" />
          Greater China &amp; Global Markets
        </h1>

        {/* Subtitle */}
        <p className="text-slate-500 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mb-8">
          Establish, operate, and scale your B2B operations with Hong Kong's premier B2B corporate advisory firm.
          Bookkeeping, tax planning, and statutory registry filings made seamless.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => handleScroll('#contact')}
            className="btn-primary inline-flex items-center gap-2 group transition-all duration-300 ease-custom-ease"
          >
            <span>Get Started</span>
            <ArrowRight size={16} className="transition-transform duration-300 ease-custom-ease group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => handleScroll('#services')}
            className="btn-secondary inline-flex items-center gap-2 transition-all duration-300 ease-custom-ease"
          >
            <Play size={16} className="fill-slate-800 text-slate-800" />
            <span>Explore Services</span>
          </button>
        </div>

      </div>
    </section>
  );
}
