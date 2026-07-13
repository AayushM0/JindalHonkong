import React, { useRef } from 'react';
import { Handshake, Lightbulb, ShieldCheck, Globe, Briefcase } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Pin left column on desktop screens (min-width: 1024px)
    mm.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top+=110", // Offset slightly below the fixed header
        end: "bottom bottom-=110",
        pin: leftColRef.current,
        pinSpacing: false,
        anticipatePin: 1
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="about-us" 
      className="py-24 bg-slate-50/50 border-t border-b border-slate-100 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Column: Pinned Headers (centered visually) */}
        <div ref={leftColRef} className="flex items-center gap-6 select-none w-full">
          {/* Vertical accent colored line, taller to match the layout */}
          <div className="w-1.5 h-48 bg-primary rounded-full shrink-0" />
          <div className="flex flex-col">
            <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full self-start mb-4">
              About Us
            </span>
            <h2 id="about-heading" className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#020617] max-w-md leading-[1.05]">
              Our Story<br />
              &amp; Mission
            </h2>
          </div>
        </div>

        {/* Right Column: Scroll Past Content */}
        <div className="flex flex-col gap-8 w-full max-w-xl lg:ml-auto">
          
          {/* Card 1: Global Footprint */}
          <div className="cursor-target flex flex-col p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Global Footprint</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mt-5">
              Operating directly from Kowloon, Hong Kong, we manage seamless cross-border setup and corporate setup registry handling across Singapore, India, and Dubai. Our international presence provides unified, seamless coordination for global expansions.
            </p>
          </div>

          {/* Card 2: Regulatory Strategy */}
          <div className="cursor-target flex flex-col p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Regulatory Strategy</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mt-5">
              We specialize in navigating complex local regulatory environments and statutory compliance frameworks. We optimize setups for regional advantages while guaranteeing consistency in corporate governance and tax efficiency.
            </p>
          </div>

          {/* Card 3: Partnership */}
          <div className="cursor-target flex flex-col p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                <Handshake size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Partnership</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mt-5">
              We build lasting partnerships with our clients, working together as trusted advisors to achieve shared success. By prioritizing transparency and collaboration, we ensure that your global expansions are backed by a unified corporate advisory front.
            </p>
          </div>

          {/* Card 4: Innovation */}
          <div className="cursor-target flex flex-col p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Innovation</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mt-5">
              We embrace innovation and leverage the latest tools and methodologies to deliver cutting-edge solutions. From digital corporate registry systems to automated bookkeeping pipelines, we keep your business operations ahead of the curve.
            </p>
          </div>

          {/* Card 5: Security */}
          <div className="cursor-target flex flex-col p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Security</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mt-5">
              We protect your enterprise with robust legal and IP safeguards under globally trusted compliance structures. Our compliance monitoring protocols ensure that your multi-jurisdiction statutory filings remain secure and bulletproof.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
