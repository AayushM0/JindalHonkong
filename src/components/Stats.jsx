import { useEffect, useRef, useState } from 'react';

// Custom Count-Up Hook following PRD parameters
function useCountUp(target, duration = 2000, decimals = 0, trigger = false) {
  const [value, setValue] = useState(0);
  const animationFrameId = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    let start = null;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      
      // Quartic ease-out function: 1 - Math.pow(1 - progress, 4)
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = eased * target;
      
      setValue(current);
      
      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };
    
    animationFrameId.current = requestAnimationFrame(step);
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [target, duration, trigger]);

  return value;
}

const statsData = [
  { target: 99.8, decimals: 2, prefix: '', suffix: '%', label: 'Client Compliance Rate' },
  { target: 1500, decimals: 0, prefix: '', suffix: '+', label: 'Global Entities Structured' },
  { target: 1.5, decimals: 1, prefix: '', suffix: ' Days', label: 'Average Incorporation Speed' },
  { target: 8.25, decimals: 2, prefix: '', suffix: '%', label: 'Start-up Profits Tax Rate' }
];

function StatItem({ stat, trigger }) {
  const value = useCountUp(stat.target, 2000, stat.decimals, trigger);
  
  // Format formatted string output
  const formattedValue = stat.decimals === 0 
    ? Math.floor(value).toLocaleString() 
    : value.toFixed(stat.decimals);

  return (
    <div className="text-center flex flex-col items-center">
      <span className="text-4xl sm:text-5xl md:text-6xl font-black text-[#60a5fa] tracking-tight tabular-nums">
        {stat.prefix}{formattedValue}{stat.suffix}
      </span>
      <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-4 max-w-[200px]">
        {stat.label}
      </span>
    </div>
  );
}

export default function Stats() {
  const [trigger, setTrigger] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTrigger(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="stats" 
      className="relative py-16 bg-[#020617] overflow-hidden flex flex-col items-center"
      aria-label="Quantifiable Business Impact Metrics"
    >
      {/* Decorative background: concentric white circles with 10% opacity */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 flex items-center justify-center select-none z-0">
        <div className="relative w-[1000px] h-[1000px] flex items-center justify-center">
          <div className="absolute w-[800px] h-[800px] rounded-full border border-white" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-white" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-white" />
        </div>
      </div>

      {/* Stats items grid */}
      <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 md:gap-x-12">
          {statsData.map((stat, idx) => (
            <StatItem key={idx} stat={stat} trigger={trigger} />
          ))}
        </div>
      </div>
    </section>
  );
}
