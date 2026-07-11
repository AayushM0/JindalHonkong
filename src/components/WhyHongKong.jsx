import React, { useEffect, useRef } from 'react';
import { Globe, Percent, Coins, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

const features = [
  {
    Icon: Percent,
    name: "Tax Optimization",
    description: "Maximize savings under Hong Kong's low two-tier profits tax regime starting at 8.25%. Pay zero VAT, zero dividend taxes, and zero Capital Gains tax.",
    href: "#contact",
    cta: "Learn more",
    className: "lg:col-span-3",
    bgIconColor: "text-blue-500/5"
  },
  {
    Icon: Globe,
    name: "Strategic Gateway",
    description: "Enjoy 100% foreign ownership with zero local residency rules. Establish your corporate gateway to scale operations directly into Mainland China and broader Asian markets.",
    href: "#contact",
    cta: "Explore gateway",
    className: "lg:col-span-3",
    bgIconColor: "text-primary/5"
  },
  {
    Icon: Coins,
    name: "Capital Freedom",
    description: "Maintain complete flexibility with no foreign exchange controls. Move corporate capital in and out of the territory freely with full multi-currency and treasury support.",
    href: "#contact",
    cta: "Learn more",
    className: "lg:col-span-2",
    bgIconColor: "text-emerald-500/5"
  },
  {
    Icon: Clock,
    name: "Rapid Setup",
    description: "Incorporate your company, register your office address, and submit statutory declarations in just 1 to 3 business days.",
    href: "#contact",
    cta: "Start setup",
    className: "lg:col-span-2",
    bgIconColor: "text-amber-500/5"
  },
  {
    Icon: ShieldCheck,
    name: "Legal & IP Security",
    description: "Protect your enterprise under a globally trusted common law framework, backed by a highly skilled English-fluent workforce and robust intellectual property safeguards.",
    href: "#contact",
    cta: "View compliance",
    className: "lg:col-span-2",
    bgIconColor: "text-purple-500/5"
  }
];

export default function WhyHongKong() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = el.querySelectorAll('.bento-card');
    if (cards.length > 0) {
      // Set initial state before intersection to avoid FOUC
      gsap.set(cards, {
        opacity: 0,
        y: 100,
        filter: 'blur(10px)'
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (cards.length > 0) {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.08
            });
          }
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleScroll = (href) => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 0.97,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      ref={containerRef}
      id="why-hongkong" 
      className="py-8 bg-[#f8fafc] flex flex-col items-center border-t border-slate-200"
      aria-labelledby="why-hk-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in-up">
          <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
            Advantage
          </span>
          <h2 id="why-hk-heading" className="section-heading mt-3">
            Why Locate in Hong Kong?
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-normal leading-relaxed mt-2">
            Build your enterprise on Asia's premier financial and legal framework, designed for seamless global growth.
          </p>
        </div>

        {/* Bento Grid (6-column fluid grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.Icon;
            return (
              <div
                key={idx}
                className={`bento-card cursor-target group relative overflow-hidden bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-lg ${feature.className}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {/* Large Background Decorative Icon */}
                <div className={`absolute -right-4 -bottom-4 w-32 h-32 flex items-center justify-center pointer-events-none select-none z-0 transition-transform duration-500 ease-custom-ease group-hover:scale-110 ${feature.bgIconColor}`}>
                  <Icon size={120} strokeWidth={1} />
                </div>

                <div className="relative z-10">
                  {/* Tinted icon header box */}
                  <div className="w-8 h-8 rounded-lg bg-blue-50/80 text-primary flex items-center justify-center mb-2.5 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon size={16} aria-hidden="true" />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors duration-300">
                    {feature.name}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-relaxed font-normal mt-1 max-w-md">
                    {feature.description}
                  </p>
                </div>

                {/* CTA Link at bottom */}
                <div className="relative z-10 mt-4">
                  <a
                    href={feature.href}
                    onClick={(e) => {
                      if (feature.href.startsWith('#')) {
                        e.preventDefault();
                        handleScroll(feature.href);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors duration-300 ease-custom-ease"
                  >
                    <span>{feature.cta}</span>
                    <ArrowRight size={12} className="transition-transform duration-300 ease-custom-ease group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
