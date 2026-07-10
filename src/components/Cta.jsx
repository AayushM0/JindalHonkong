import { ArrowRight } from 'lucide-react';

export default function Cta() {
  const handleScroll = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="cta" 
      className="py-16 bg-[#020617] text-white flex flex-col items-center relative overflow-hidden"
      aria-label="Call to Action"
    >
      {/* Background radial highlight */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none select-none" 
        aria-hidden="true"
      />

      <div className="w-full max-w-4xl mx-auto px-6 text-center relative z-10 animate-fade-in-up">
        <span className="text-blue-400 font-bold text-xs uppercase tracking-widest bg-blue-950/60 border border-blue-900/50 px-3.5 py-1.5 rounded-full inline-block">
          Get Started
        </span>
        
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] mt-6 mb-6">
          Ready to scale your <br />
          regional operations?
        </h2>
        
        <p className="text-slate-400 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10">
          Connect with our corporate desk in Tsim Sha Tsui, Kowloon, Hong Kong. Set up multi-currency commercial bank accounts, reserved registry assets, and secure tax exemptions.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => handleScroll('#contact')}
            className="btn-primary inline-flex items-center gap-2 group bg-blue-600 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/20"
          >
            <span>Book Consultation</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => handleScroll('#services')}
            className="border border-slate-700 bg-slate-900/40 text-slate-200 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-slate-800 hover:text-white cursor-pointer"
          >
            Explore Solutions
          </button>
        </div>
      </div>
    </section>
  );
}
