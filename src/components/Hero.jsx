import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
// Primary: transparent cutout. Fallback: swap import below to helloImg if cutout shows edge artifacts.
import heroImg from '../assets/Adobe Express - file copy.png';
// import heroImg from '../assets/hello.jpg';

export default function Hero() {
  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="platform"
      className="relative h-screen bg-white bg-grid pt-24 pb-0 px-6 overflow-hidden flex flex-col items-center justify-center"
      aria-label="Hero Landing"
    >
      {/* Decorative image layer — z-10, sits above background, below text */}
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        className="absolute bottom-0 w-full h-auto object-contain pointer-events-none select-none z-10"
      />

      {/* Foreground text content — z-20, always above image layer */}
      <div className="relative z-20 max-w-4xl text-center flex flex-col items-center animate-fade-in-up">

        {/* Pulsing Badge */}
        <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border border-primary/10">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>System Online: HK Company Incorporation in 1–3 Days</span>
        </div>

        {/* Title */}
        <h1 className="text-[#020617] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Your Gateway to <br className="hidden sm:inline" />
          Hong Kong &amp; Greater China
        </h1>

        {/* Subtitle with Opaque Grid Background */}
        <p className="text-slate-900 text-base md:text-lg font-semibold leading-relaxed max-w-2xl mx-auto mb-8 bg-white bg-grid border border-slate-200 shadow-xl px-6 py-4 rounded-xl text-center">
          Establish, operate, and scale your business operations with Hong Kong's premier corporate advisory firm.
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
