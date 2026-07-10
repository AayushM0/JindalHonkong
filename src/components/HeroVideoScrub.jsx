import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger once at module scope
gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 271;
const BLOCKING_BATCH = 15;
const BASE_PATH = '/hero-frames/ezgif-frame-';

// Format index to zero-padded 3-digit string (e.g. 001, 045, 120)
function formatFrameIndex(index) {
  return String(index).padStart(3, '0');
}

export default function HeroVideoScrub() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scrimRef = useRef(null);
  const headlineRef = useRef(null);
  const cardRef = useRef(null);
  const buttonsRef = useRef(null);

  const [isReady, setIsReady] = useState(false);

  // Store preloaded HTML Image objects in a ref array so they persist across renders
  const imagesRef = useRef([]);
  // Track load status of each image index: true = loaded, false = pending
  const loadStatusRef = useRef(new Array(TOTAL_FRAMES + 1).fill(false));
  // Track last successfully drawn frame index to avoid redundant canvas rendering
  const lastDrawnIndexRef = useRef(-1);

  // Redraw function mimicking CSS object-fit: cover, scaled for high-DPI/Retina screens
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Guard: Draw the nearest lower loaded index if target frame isn't preloaded yet
    let targetIndex = index;
    while (targetIndex > 1 && !loadStatusRef.current[targetIndex]) {
      targetIndex--;
    }

    const img = imagesRef.current[targetIndex];
    if (!img || !loadStatusRef.current[targetIndex]) return;

    // Avoid redundant draw calls if the resolved frame is the same as the last one
    if (lastDrawnIndexRef.current === targetIndex) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Set canvas internal coordinate size scaled by devicePixelRatio
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Set up cover-cropping logic (object-fit: cover implementation)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let sX = 0, sY = 0, sWidth = imgWidth, sHeight = imgHeight;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas -> crop sides
      sWidth = imgHeight * canvasRatio;
      sX = (imgWidth - sWidth) / 2;
    } else {
      // Image is taller than canvas -> crop top/bottom
      sHeight = imgWidth / imgRatio;
      sY = (imgHeight - sHeight) / 2;
    }

    ctx.drawImage(img, sX, sY, sWidth, sHeight, 0, 0, canvasWidth, canvasHeight);
    lastDrawnIndexRef.current = targetIndex;
  };

  // Two-Stage Preloader
  useEffect(() => {
    let active = true;

    // Stage 1: Preload blocking batch + midpoint frame (135) to enable canvas quickly
    const blockingPromises = [];
    const blockingIndices = [...Array.from({ length: BLOCKING_BATCH }, (_, idx) => idx + 1), 135];

    blockingIndices.forEach((i) => {
      blockingPromises.push(
        new Promise((resolve) => {
          const img = new Image();
          const path = `${BASE_PATH}${formatFrameIndex(i)}.jpg`;
          img.src = path;
          img.onload = () => {
            if (active) {
              imagesRef.current[i] = img;
              loadStatusRef.current[i] = true;
            }
            resolve();
          };
          img.onerror = () => {
            resolve();
          };
        })
      );
    });

    Promise.all(blockingPromises).then(() => {
      if (!active) return;
      setIsReady(true);
      // Paint first frame immediately as a poster
      drawFrame(1);

      // Stage 2: Background preloading of remaining frames (low priority)
      for (let i = BLOCKING_BATCH + 1; i <= TOTAL_FRAMES; i++) {
        if (i === 135) continue; // Already preloaded in stage 1
        const img = new Image();
        const path = `${BASE_PATH}${formatFrameIndex(i)}.jpg`;
        img.src = path;
        img.onload = () => {
          if (active) {
            imagesRef.current[i] = img;
            loadStatusRef.current[i] = true;
          }
        };
      }
    });

    // Handle canvas redraw on browser resize
    const handleResize = () => {
      if (lastDrawnIndexRef.current !== -1) {
        // Clear cached reference to force a redraw with updated dimensions
        const prevIndex = lastDrawnIndexRef.current;
        lastDrawnIndexRef.current = -1;
        drawFrame(prevIndex);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      active = false;
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // GSAP Initializer
  useLayoutEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // (A) Reduced Motion Override: Skip ScrollTrigger pinning/scrubbing, draw frame 135 instantly
      mm.add("(prefers-reduced-motion: reduce)", () => {
        // Draw frame 135 immediately
        drawFrame(135);

        // Apply final aesthetic styles immediately with no scroll requirement
        gsap.set(scrimRef.current, { opacity: 0.60 });
        gsap.set(headlineRef.current, { opacity: 0, yPercent: -140 });
        gsap.set(cardRef.current, { autoAlpha: 1, y: 0 });
        gsap.set(buttonsRef.current ? buttonsRef.current.children : [], { autoAlpha: 1, y: 0 });
      });

      // (B) Mobile Viewport (max-width: 767px) - Shorter scroll pin to prevent stuck page
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(scrimRef.current, { opacity: 0.35 });
        gsap.set(headlineRef.current, { opacity: 1, yPercent: 0 });
        gsap.set(cardRef.current, { autoAlpha: 0, y: 60 });
        gsap.set(buttonsRef.current ? buttonsRef.current.children : [], { autoAlpha: 0, y: 16 });

        const frameObj = { val: 1 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=90%', // Lighter mobile scroll duration
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }
        });

        tl.to(frameObj, {
          val: TOTAL_FRAMES,
          duration: 1,
          ease: 'none',
          onUpdate: () => {
            const index = Math.round(frameObj.val);
            drawFrame(index);
          }
        }, 0)
        .to(headlineRef.current, {
          yPercent: -120,
          opacity: 0,
          duration: 0.9,
          ease: 'none',
        }, 0.05)
        .to(scrimRef.current, {
          opacity: 0.60,
          duration: 0.6,
          ease: 'none',
        }, 0.3)
        .to(cardRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'none',
        }, 0.7)
        .to(buttonsRef.current.children, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'none',
        }, 0.85);
      });

      // (C) Desktop Viewport (min-width: 768px) - Full standard sequence
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(scrimRef.current, { opacity: 0.35 });
        gsap.set(headlineRef.current, { opacity: 1, yPercent: 0 });
        gsap.set(cardRef.current, { autoAlpha: 0, y: 60 });
        gsap.set(buttonsRef.current ? buttonsRef.current.children : [], { autoAlpha: 0, y: 16 });

        const frameObj = { val: 1 };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%', // Standard scroll duration
            scrub: 1,
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }
        });

        tl.to(frameObj, {
          val: TOTAL_FRAMES,
          duration: 1,
          ease: 'none',
          onUpdate: () => {
            const index = Math.round(frameObj.val);
            drawFrame(index);
          }
        }, 0)
        .to(headlineRef.current, {
          yPercent: -140,
          opacity: 0,
          duration: 0.9,
          ease: 'none',
        }, 0.05)
        .to(scrimRef.current, {
          opacity: 0.60,
          duration: 0.6,
          ease: 'none',
        }, 0.3)
        .to(cardRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'none',
        }, 0.7)
        .to(buttonsRef.current.children, {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: 'none',
        }, 0.85);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section 
      ref={containerRef}
      className="hero-video-scrub-container relative w-full h-screen overflow-hidden bg-primary"
      aria-label="Cinematic video-scrub harbour introduction"
    >
      {/* ─── STAGE LOADING PLACEHOLDER ─── */}
      {!isReady && (
        <div className="absolute inset-0 bg-primary z-50 flex items-center justify-center">
          <div className="text-white/40 text-sm font-medium tracking-widest uppercase animate-pulse">
            Preloading Experience...
          </div>
        </div>
      )}

      {/* ─── CANVAS RENDERING ELEMENT ─── */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── TEXT CONTRAST SCRIM OVERLAY ─── */}
      <div 
        ref={scrimRef}
        className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/20 to-primary/80 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* ─── TYPOGRAPHY LAYERS (Sibling wrapper with overflow visible to prevent Bug A) ─── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-25 px-6 py-20 text-center overflow-visible select-none pointer-events-none">
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

      {/* ─── GLASSMORPHIC CARD PAYOFF LAYER ─── */}
      <div className="absolute inset-x-6 bottom-10 md:bottom-16 flex justify-center z-30 overflow-visible pointer-events-none">
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
