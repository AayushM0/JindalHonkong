import React, { useEffect, useRef, useState } from 'react';
import './ProcessSection.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import manifest from '../../public/assets/formation/manifest.json';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    index: "01",
    heading: "Strategic Consultation",
    body: "Initial analysis for company name reservation, structure, and capital/director advisory."
  },
  {
    index: "02",
    heading: "Document Preparation",
    body: "Drafting of incorporation articles, statutory declarations, registry forms (NNC1/NNC1G), and initial board resolutions."
  },
  {
    index: "03",
    heading: "Registry Submission",
    body: "Direct electronic filing with the Companies Registry, issuing incorporation and business registration certificates in 1 to 3 business days."
  },
  {
    index: "04",
    heading: "Banking & Tax Setup",
    body: "Corporate bank introductions, Inland Revenue Department (IRD) setup, and ongoing compliance onboarding."
  }
];

export default function ProcessSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRefs = useRef([]);
  
  // Image cache and current frame trackers
  const framesCache = useRef([]);
  const currentFrameRef = useRef(1);
  const isPreloadedRef = useRef(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Canvas cover resizing and drawing logic
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fallback: find nearest loaded frame downwards
    let img = framesCache.current[index];
    if (!img) {
      for (let i = index - 1; i >= 1; i--) {
        if (framesCache.current[i]) {
          img = framesCache.current[i];
          break;
        }
      }
    }
    // Fallback: find nearest loaded frame upwards if still none
    if (!img) {
      for (let i = index + 1; i <= manifest.frameCount; i++) {
        if (framesCache.current[i]) {
          img = framesCache.current[i];
          break;
        }
      }
    }

    if (!img) return; // No frames loaded at all

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover scale calculations (maintaining aspect ratio without letterboxing)
    const scale = Math.max(cw / iw, ch / ih);
    const sw = cw / scale;
    const sh = ch / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    currentFrameRef.current = index;
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    drawFrame(currentFrameRef.current);
  };

  const updateScrollytelling = (progress, isMobile) => {
    // Non-linear step progress ranges mapping (aligned with visual milestones)
    const STEP_RANGES = [
      [0.00, 0.22], // Step 1: 0% - 22%
      [0.22, 0.431], // Step 2: 22% - 43.1% (Foil/crest tracing)
      [0.431, 0.75], // Step 3: 43.1% - 75% (Seal contact at 43.1%)
      [0.75, 1.00]  // Step 4: 75% - 100%
    ];

    if (isMobile) {
      // Mobile responsive: Show only the single active card to prevent text collision
      let activeIdx = 0;
      for (let i = 0; i < STEP_RANGES.length; i++) {
        const [start, end] = STEP_RANGES[i];
        if (progress >= start && progress <= end) {
          activeIdx = i;
          break;
        }
      }
      
      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        if (idx === activeIdx) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.classList.add('active-mobile');
        } else {
          el.style.opacity = "0";
          el.style.transform = "translateY(120%)";
          el.classList.remove('active-mobile');
        }
      });
    } else {
      // Desktop cascading cards stack accumulation (Lenis style reference)
      cardRefs.current.forEach((el, idx) => {
        if (!el) return;
        
        const [start, end] = STEP_RANGES[idx];
        const dur = end - start;
        const rel = (progress - start) / dur;

        if (progress < start) {
          // Future card: below view, invisible
          el.style.opacity = "0";
          el.style.transform = "translateY(120%)";
          el.classList.remove('active-mobile');
        } else if (progress >= start && progress <= end) {
          // Active card entering over first 20% of its range
          const animRange = 0.20;
          if (rel <= animRange) {
            const factor = rel / animRange;
            // Cubic ease-out curve for physical weight settling
            const eased = 1 - Math.pow(1 - factor, 3);
            el.style.opacity = factor.toFixed(3);
            el.style.transform = `translateY(${( (1 - eased) * 120 ).toFixed(1)}%)`;
          } else {
            // Settled state
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
          el.classList.remove('active-mobile');
        } else {
          // Accumulated card: stays on screen fully visible
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.classList.remove('active-mobile');
        }
      });
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Capture ref value at effect-mount time so cleanup closure uses the same node
    const wrapperEl = wrapperRef.current;

    // Determine layout scale rules based on DPI and screen width
    const isMobile = window.innerWidth < 768;
    const dpr = window.devicePixelRatio || 1;
    const useRetina = !isMobile && dpr >= 2;
    
    // Choose appropriate asset tier
    const activeTier = useRetina ? manifest.tiers.retina : manifest.tiers.standard;

    // Handle canvas sizing
    handleResize();
    window.addEventListener('resize', handleResize);

    // Helper to format frame URLs from active tier
    const getFrameUrl = (index) => {
      const paddedIndex = String(index).padStart(activeTier.pad, '0');
      return `${activeTier.prefix}${paddedIndex}.${activeTier.ext}`;
    };

    // Helper to decode a single image via Promise
    const preloadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);
        img.decode()
          .then(() => {
            framesCache.current[index] = img;
            resolve(img);
          })
          .catch(() => {
            img.onload = () => {
              framesCache.current[index] = img;
              resolve(img);
            };
            img.onerror = () => {
              resolve(null);
            };
          });
      });
    };

    const startPreloading = async () => {
      try {
        const frameStep = isMobile ? 3 : 1; // Downsample frame rate on mobile to save performance
        
        // Phase 1: Load first 10 frames of active tier synchronously
        const priorityPromises = [];
        for (let i = 1; i <= 10; i += frameStep) {
          priorityPromises.push(preloadImage(i));
        }
        await Promise.all(priorityPromises);

        // Draw initial frame and remove skeleton loader
        drawFrame(1);
        setIsLoading(false);

        // Phase 2: Progressively background-load remaining frames
        for (let i = 11; i <= manifest.frameCount; i++) {
          if (isMobile && i % 3 !== 1) continue; // Skip redundant frames on mobile
          await preloadImage(i);
        }
      } catch {
        // Silently degrade — nearest cached frame will be drawn instead
        setIsLoading(false);
      }
    };

    // Setup intersection observer to start preloading before user enters the section
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isPreloadedRef.current) {
          isPreloadedRef.current = true;
          startPreloading();
        }
      });
    }, {
      rootMargin: '200% 0px'
    });

    if (wrapperEl) {
      observer.observe(wrapperEl);
    }

    // GSAP ScrollTrigger mapping
    const mm = gsap.matchMedia();

    // Desktop: Pin over 800vh and scrub with cinematic lag
    mm.add("(min-width: 768px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        scrub: 0.7, // Deliberate cinematic lag for physical weight
        onUpdate: (self) => {
          const progress = self.progress;
          const frameIndex = Math.min(manifest.frameCount, Math.max(1, Math.floor(progress * manifest.frameCount) + 1));
          drawFrame(frameIndex);
          updateScrollytelling(progress, false);
        }
      });
      return () => {
        trigger.kill();
      };
    });

    // Mobile: Pin over 450vh and scrub with direct updates
    mm.add("(max-width: 767px)", () => {
      const trigger = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = Math.min(manifest.frameCount, Math.max(1, Math.floor(progress * manifest.frameCount) + 1));
          // Snap index on mobile based on downsampling step
          const frameIndex = rawIndex - ((rawIndex - 1) % 3);
          const finalIndex = Math.min(manifest.frameCount, Math.max(1, frameIndex));
          drawFrame(finalIndex);
          updateScrollytelling(progress, true);
        }
      });
      return () => {
        trigger.kill();
      };
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      mm.revert();
      if (wrapperEl) {
        observer.unobserve(wrapperEl);
      }
    };
  }, [prefersReducedMotion]);

  // For prefersReducedMotion, render static grid
  if (prefersReducedMotion) {
    const fallbackImage = `${manifest.tiers.standard.prefix}160.${manifest.tiers.standard.ext}`;
    return (
      <section 
        id="process"
        className="process-static-layout"
        style={{ backgroundImage: `linear-gradient(rgba(10, 10, 12, 0.85), rgba(10, 10, 12, 0.85)), url(${fallbackImage})` }}
      >
        <div className="process-static-container">
          <div className="text-center mb-16">
            <h2 className="text-white text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Company Formation Process
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our streamlined 4-step workflow to get your business established in Hong Kong.
            </p>
          </div>
          <div className="process-static-grid">
            {steps.map((step, idx) => (
              <div key={idx} className="process-static-card">
                <div className="process-static-card-index">{step.index} / 04</div>
                <h3>{step.heading}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="process" className="process-scroll-wrapper" ref={wrapperRef}>
      <div className="process-pin" ref={pinRef}>
        {/* Loading skeleton wrapper */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0a0a0c]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-semibold text-slate-400">Loading certificate...</span>
            </div>
          </div>
        )}

        {/* WebGL/Canvas Background Frame Sequence */}
        <canvas className="process-canvas" ref={canvasRef} />

        {/* Double-layered scrim overlay */}
        <div className="process-scrim" />

        {/* Persistent overall section heading */}
        <div className="process-heading">
          <h2>4-Step Company Formation Process</h2>
          <p>Streamlined pathway from concept to incorporation</p>
        </div>

        {/* Bottom-anchored card stack container */}
        <div className="process-card-stack">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className="process-card" 
              data-step={idx + 1}
              ref={el => cardRefs.current[idx] = el}
            >
              <div className="process-card-num">{step.index}</div>
              <h3>{step.heading}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
