import React, { useRef } from 'react';
import { Building, BookOpen, FileText, CreditCard, Calculator, ClipboardCheck, BarChart3, Monitor } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PixelBlast from './ui/PixelBlast';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    icon: Building,
    title: 'Company Formation & Setup',
    description: 'Companies Registry handling, validation of company names, nominee directors, and physical office address registry.',
    themeKey: 'blue'
  },
  {
    icon: BookOpen,
    title: 'Accounting & Bookkeeping',
    description: 'HK FRS compliant financial statements preparation, chart of accounts structuring, and digital transaction ledgers.',
    themeKey: 'blue'
  },
  {
    icon: FileText,
    title: 'Corporate Secretarial',
    description: 'Ongoing statutory compliance, annual return filings, AGM minutes compilation, and Companies Registry submissions.',
    themeKey: 'blue'
  },
  {
    icon: CreditCard,
    title: 'Banking & Treasury Setup',
    description: 'Multi-currency corporate bank account preparation, payment gateway advice, and online treasury integrations.',
    themeKey: 'blue'
  },
  {
    icon: Calculator,
    title: 'Taxation Strategy',
    description: 'Inland Revenue Department profits tax filing, profits tax registrations, employer returns, and tax exemption claims.',
    themeKey: 'emerald'
  },
  {
    icon: ClipboardCheck,
    title: 'Audit & Assurance',
    description: 'Coordination of statutory audits, internal controls reviews, and full financial performance compliance assurance.',
    themeKey: 'emerald'
  },
  {
    icon: BarChart3,
    title: 'SME & GEM Listing / IPO Prep',
    description: 'GEM eligibility appraisals, corporate restructuring, regulatory HKEX listings advisory, and coordination of advisors.',
    themeKey: 'blue'
  },
  {
    icon: Monitor,
    title: 'Technology Infrastructure',
    description: 'Corporate email hosting, secure client portal setup, B2B information security strategy, and IT consulting.',
    themeKey: 'emerald'
  }
];

const THEME_CLASSES = {
  blue: {
    iconBg: 'bg-blue-50 text-primary',
    badge: 'bg-blue-50 text-primary border border-blue-100'
  },
  emerald: {
    iconBg: 'bg-emerald-50 text-emerald-600',
    badge: 'bg-emerald-50 text-emerald-600 border border-emerald-100'
  }
};

export default function Services() {
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const lineRef = useRef(null);
  const titleRef = useRef(null);
  const introTextRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Horizontal scroll and split pin effect on desktop screens (min-width: 1024px)
    mm.add("(min-width: 1024px)", () => {
      // Calculate exactly how much the cards track should slide to the left
      const getScrollAmount = () => {
        if (!trackRef.current) return 0;
        return -(trackRef.current.scrollWidth - window.innerWidth);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top+=60", // Tighter start position
          end: () => `+=${trackRef.current.scrollWidth * 0.95}`, // Tighter scroll duration to reduce dead scroll space
          pin: true,
          scrub: true,
          anticipatePin: 1
        }
      });

      // 1. Parallax slide up & fade out of intro blocks (duration 0.6)
      tl.to(lineRef.current, { y: -180, opacity: 0, ease: "power2.inOut", duration: 0.6 }, 0)
        .to(titleRef.current, { y: -140, opacity: 0, ease: "power2.inOut", duration: 0.6 }, 0.03)
        .to(introTextRef.current, { y: -140, opacity: 0, ease: "power2.inOut", duration: 0.6 }, 0.05);

      // 2. Animate cards container up and in (starts AFTER the intro text finishes moving out, with a deliberate 0.1s delay, at 0.7s, ending at 0.9s)
      tl.fromTo(cardsWrapperRef.current, 
        { y: 300, opacity: 0 }, 
        { y: 0, opacity: 1, ease: "power2.out", duration: 0.2 }, 
        0.7
      );

      // 3. Translate cards horizontally from right to left (starts with a deliberate 0.1s delay after sliding up, at 1.0s)
      tl.to(trackRef.current, {
        x: getScrollAmount,
        ease: "none"
      }, 1.0);
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      id="services" 
      className="py-16 lg:py-0 bg-white border-t border-slate-100 overflow-hidden lg:h-[80vh] lg:min-h-[600px] lg:relative lg:flex lg:flex-col lg:justify-center" 
      aria-labelledby="services-heading"
    >
      {/* Interactive PixelBlast Canvas Background (Darker opacity, optimized without liquid postprocessing) */}
      <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none">
        <PixelBlast
          variant="circle"
          pixelSize={5}
          color="#2563eb" // Corporate Primary Blue theme color
          patternScale={2.5}
          patternDensity={1.05}
          pixelSizeJitter={0.4}
          enableRipples={false} // Performance optimization
          liquid={false} // Disabled liquid postprocessing to prevent heavy frame load
          speed={0.35}
          edgeFade={0.25}
          transparent={true}
        />
      </div>

      {/* Intro Header Block (Desktop centered, Mobile stacked, z-10 for interactivity) */}
      <div 
        ref={introRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full select-none"
      >
        {/* Left Side: Title and accent line */}
        <div className="flex items-center gap-5 w-full">
          <div ref={lineRef} className="w-1.5 h-36 bg-primary rounded-full shrink-0" />
          <div ref={titleRef} className="flex flex-col">
            <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full self-start mb-4">
              Platform Modules
            </span>
            <h2 id="services-heading" className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#020617] max-w-md leading-[1.05]">
              Core B2B<br />
              Services
            </h2>
          </div>
        </div>

        {/* Right Side: Intro Text wrapped in styled card box */}
        <div 
          ref={introTextRef} 
          className="w-full max-w-xl bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-sm"
        >
          <p className="text-slate-600 text-base md:text-lg font-normal leading-relaxed">
            Jindalsons Limited provides end-to-end corporate solutions designed to navigate Hong Kong's regulatory framework and accelerate your regional growth.
          </p>
        </div>
      </div>

      {/* Horizontal Cards Wrapper (Desktop absolute centered, Mobile natural, z-10) */}
      <div 
        ref={cardsWrapperRef} 
        className="relative z-10 w-full mt-16 lg:mt-0 lg:absolute lg:inset-0 lg:flex lg:items-center lg:w-full lg:opacity-0"
      >
        <div 
          ref={trackRef} 
          className="flex gap-8 items-stretch w-max px-6 lg:pl-[50vw] lg:pr-[15vw]"
        >
          {servicesList.map((service, idx) => {
            const Icon = service.icon;
            const theme = THEME_CLASSES[service.themeKey || 'blue'];
            return (
              <div 
                key={idx}
                className="cursor-target flex flex-col justify-between w-[320px] md:w-[350px] p-8 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 shrink-0"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${theme.iconBg}`}>
                      <Icon size={24} />
                    </div>
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${theme.badge}`}>
                      Module {idx + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-6">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mt-4">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
