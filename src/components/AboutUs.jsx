import React from 'react';
import { Handshake, Lightbulb, ShieldCheck } from 'lucide-react';
import CardSwap, { Card } from './ui/CardSwap';

export default function AboutUs() {
  return (
    <section 
      id="about-us" 
      className="py-20 bg-slate-50/50 border-t border-b border-slate-100 flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Text Content */}
        <div className="flex flex-col items-start max-w-xl animate-fade-in-up">
          <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full mb-5">
            About Us
          </span>
          <h2 id="about-heading" className="section-heading text-[#020617] mb-6">
            Our Story &amp; Mission
          </h2>
          <p className="text-slate-600 text-lg md:text-xl font-normal leading-[1.8] mb-6">
            Operating directly from Houston Centre, Kowloon, Hong Kong, <strong>Jindalsons Limited</strong> is a leading B2B corporate advisory firm. Our mission is to provide structural certainty, cross-border business setup, taxation strategy, compliance, and accounting. We serve as a trusted gateway to Greater China and global markets for international enterprises, family offices, and emerging founders who use Hong Kong as their primary business hub. By delivering comprehensive cross-border setup and robust statutory assurance, we ensure your operations are optimized for local advantages and global scalability.
          </p>
        </div>

        {/* Right Side: CardSwap Interactive Stack */}
        <div className="flex items-center justify-center lg:justify-end min-h-[24rem] relative pr-12 lg:pr-16">
          <CardSwap
            width={420}
            height={255}
            cardDistance={25}
            verticalDistance={25}
            delay={4500}
            pauseOnHover={true}
            skewAmount={3}
            easing="elastic"
          >
            {/* Card 1: Partnership */}
            <Card className="flex flex-col p-6 rounded-2xl justify-between border border-slate-200 bg-white">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <Handshake size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Partnership</h3>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mt-4">
                  We build lasting partnerships with our clients, working together as trusted advisors to achieve shared success. By prioritizing transparency and collaboration, we ensure that your global expansions are backed by a unified corporate advisory front.
                </p>
              </div>
            </Card>

            {/* Card 2: Innovation */}
            <Card className="flex flex-col p-6 rounded-2xl justify-between border border-slate-200 bg-white">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Lightbulb size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Innovation</h3>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mt-4">
                  We embrace innovation and leverage the latest tools and methodologies to deliver cutting-edge solutions. From digital corporate registry systems to automated bookkeeping pipelines, we keep your business operations ahead of the curve.
                </p>
              </div>
            </Card>

            {/* Card 3: Security */}
            <Card className="flex flex-col p-6 rounded-2xl justify-between border border-slate-200 bg-white">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Security</h3>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed mt-4">
                  We protect your enterprise with robust legal and IP safeguards under globally trusted compliance structures. Our compliance monitoring protocols ensure that your multi-jurisdiction statutory filings remain secure and bulletproof.
                </p>
              </div>
            </Card>
          </CardSwap>
        </div>

      </div>
    </section>
  );
}
