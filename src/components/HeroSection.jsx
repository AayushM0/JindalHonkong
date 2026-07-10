import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgImage from '../assets/background.webp';
import fgImage from '../assets/foreground.webp';

// Register ScrollTrigger once at module scope
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef(null);
  const bgWrapperRef = useRef(null);
  const fgWrapperRef = useRef(null);
  const headlineRef = useRef(null);
  const scrimRef = useRef(null);
  const cardRef = useRef(null);
  const buttonsRef = useRef(null);

  useLayoutEffect(() => {
    // Image load tracking to refresh ScrollTrigger boundaries
    let loadedCount = 0;
    const onImageLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        ScrollTrigger.refresh();
      }
    };

    // 1. Setup the GSAP context scoped to our container
    const ctx = gsap.context(() => {
      // 2. Initialize V4 properties via gsap.set to avoid CSS conflicts
      // Background starts at 1.0 (zooms outward), Foreground starts at 1.15 (pulls inward)
      gsap.set(bgWrapperRef.current, { scale: 1.0, transformOrigin: '50% 50%' });
      gsap.set(fgWrapperRef.current, { scale: 1.15, yPercent: 8, transformOrigin: '50% 60%' });
      gsap.set(headlineRef.current, { opacity: 1, yPercent: 0 });
      gsap.set(scrimRef.current, { opacity: 0.35 });
      gsap.set(cardRef.current, { autoAlpha: 0, y: 60 });
      gsap.set(buttonsRef.current ? buttonsRef.current.children : [], { autoAlpha: 0, y: 16 });

      const mm = gsap.matchMedia();

      // (A) Reduced Motion Fallback: Skip pinning and scaling, crossfade elements instantly
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(bgWrapperRef.current, { scale: 1.0 });
        gsap.set(fgWrapperRef.current, { scale: 1.05, yPercent: 0 });
        gsap.set(headlineRef.current, { yPercent: -140, opacity: 0 });
        gsap.set(scrimRef.current, { opacity: 0.60 });
        gsap.set(cardRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(buttonsRef.current.children, { autoAlpha: 1, y: 0 });
      });

      // (B) Mobile Viewport (max-width: 767px) - Gentler scales, shorter pin range
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        // Adjust starting state for mobile
        gsap.set(bgWrapperRef.current, { scale: 1.0 });
        gsap.set(fgWrapperRef.current, { scale: 1.08, yPercent: 4 });

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=90%', // Shorter range to prevent scrolling fatigue
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }
        });

        tl.to(bgWrapperRef.current, { scale: 1.08 }, 0)
          .to(fgWrapperRef.current, { scale: 1.03, yPercent: 0 }, 0)
          .to(headlineRef.current, { yPercent: -120, opacity: 0, duration: 0.9 }, 0.05)
          .to(scrimRef.current, { opacity: 0.60, duration: 0.6 }, 0.3)
          .to(cardRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.7)
          .to(buttonsRef.current.children, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.85);
      });

      // (C) Desktop Viewport (min-width: 768px) - Full standard specs
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }
        });

        tl.to(bgWrapperRef.current, { scale: 1.15 }, 0)
          .to(fgWrapperRef.current, { scale: 1.05, yPercent: 0 }, 0)
          .to(headlineRef.current, { yPercent: -140, opacity: 0, duration: 0.9 }, 0.05)
          .to(scrimRef.current, { opacity: 0.60, duration: 0.6 }, 0.3)
          .to(cardRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.7)
          .to(buttonsRef.current.children, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.85);
      });
    }, containerRef);

    // 5. Attach image loading listeners to resolve correct scroll height
    const images = [
      containerRef.current?.querySelector('img[src*="background"]'),
      containerRef.current?.querySelector('img[src*="foreground"]')
    ];
    images.forEach(img => {
      if (img) {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener('load', onImageLoad);
        }
      }
    });

    // 6. Hook cleanup
    return () => {
      ctx.revert();
      images.forEach(img => {
        if (img) img.removeEventListener('load', onImageLoad);
      });
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="hero-pin-container relative w-full h-screen overflow-hidden bg-primary"
      aria-label="Cinematic Victoria Harbour depth introduction"
    >
      {/* ─── IMAGE LAYERS (Self-contained to prevent Bug A clipping and Bug B warping) ─── */}
      
      {/* 1. Background Horizon Layer */}
      <div 
        ref={bgWrapperRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden will-change-transform"
      >
        <img
          src={bgImage}
          alt=""
          role="presentation"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* 2. Text Legibility Gradient/Scrim Overlay */}
      <div 
        ref={scrimRef}
        className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/80 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Foreground Architecture Layer (Skyscrapers with transparent alpha channels) */}
      <div 
        ref={fgWrapperRef}
        className="absolute inset-0 w-full h-full z-20 overflow-hidden pointer-events-none will-change-transform"
      >
        <img
          src={fgImage}
          alt=""
          role="presentation"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ─── TYPOGRAPHY & PANEL LAYERS (Separate sibling wrappers with overflow: visible to prevent Bug A) ─── */}

      {/* 4. Midground Content Layer (Headline) - Overflow visible + generous vertical padding */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 px-6 py-20 text-center overflow-visible select-none pointer-events-none">
        <div 
          ref={headlineRef} 
          className="max-w-4xl overflow-visible py-4 pointer-events-auto"
        >
          <h1 className="hero-headline text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-tight drop-shadow-md">
            Your Gateway to <br className="hidden sm:inline" />
            Greater China & Global Markets
          </h1>
        </div>
      </div>

      {/* 5. Glassmorphic Payoff Card Layer */}
      <div className="absolute inset-x-6 bottom-10 md:bottom-16 flex justify-center z-40 overflow-visible pointer-events-none">
        <div 
          ref={cardRef}
          className="glass-payoff-card w-full max-w-2xl bg-white/10 border border-white/15 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl text-center pointer-events-auto overflow-visible"
        >
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 font-medium">
            Establish, operate, and scale your business with Hong Kong's leading B2B corporate advisory firm. 
            Complete company registration, banking integrations, and ongoing compliance.
          </p>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center overflow-visible">
            <a
              href="#contact"
              className="btn-primary inline-flex items-center justify-center px-6 py-3 font-semibold text-sm rounded-lg"
              aria-label="Schedule a strategic consultation"
            >
              Schedule Consultation
            </a>
            <a
              href="#services"
              className="btn-secondary inline-flex items-center justify-center px-6 py-3 font-semibold text-sm rounded-lg border border-white/30 text-white hover:bg-white/15"
              aria-label="Explore corporate services"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
