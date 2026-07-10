import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const headline = 'Your Gateway to Greater China & Global Markets'.split(' ');

const stats = [
  { value: '1–3', unit: 'Day', label: 'Incorporation' },
  { value: '8.25%', unit: '', label: 'Starting Tax Rate' },
  { value: '100%', unit: '', label: 'Foreign Ownership' },
];

export default function Hero() {
  const reduced = useReducedMotion();

  const wordVariants = {
    hidden:  { opacity: 0, y: reduced ? 0 : 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay:    reduced ? 0 : i * 0.07,
        duration: reduced ? 0 : 0.5,
        ease:     [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const fadeUp = (delay = 0) => ({
    initial:   { opacity: 0, y: reduced ? 0 : 16 },
    animate:   { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  const scaleFade = (delay = 0) => ({
    initial:    { opacity: 0, scale: reduced ? 1 : 0.95 },
    animate:    { opacity: 1, scale: 1 },
    transition: { duration: reduced ? 0 : 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-primary bg-hero-grid flex flex-col justify-center overflow-hidden pt-20"
      aria-label="Hero — Jindalsons Limited"
    >
      {/* Decorative floating orbs */}
      {!reduced && (
        <>
          <div
            className="orb animate-float-slow"
            style={{ width: 500, height: 500, background: '#B8960C', opacity: 0.06, top: '-10%', right: '-5%' }}
            aria-hidden="true"
          />
          <div
            className="orb animate-float-slower"
            style={{ width: 350, height: 350, background: '#0369A1', opacity: 0.08, bottom: '5%', left: '-8%' }}
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0.1)}
          className="text-gold font-medium text-sm tracking-widest uppercase mb-6"
        >
          Kowloon, Hong Kong · B2B Corporate Advisory
        </motion.p>

        {/* Headline — word-by-word reveal */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          {...fadeUp(0.55)}
          className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-10"
        >
          Kowloon-based corporate advisory for international enterprises, family offices, and founders
          establishing a foothold in Hong Kong and the Greater China region.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          {...scaleFade(0.9)}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4"
            aria-label="Start your company with Jindalsons"
          >
            Start Your Company
            <ArrowRight size={18} aria-hidden="true" />
          </button>
          <button
            onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4"
            aria-label="View our services"
          >
            View Services
          </button>
        </motion.div>

        {/* Stat Badges */}
        <div className="flex flex-wrap gap-4" role="list" aria-label="Key statistics">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 0.6 + i * 0.12, duration: 0.4 }}
              role="listitem"
              className="bg-white/8 border border-white/15 backdrop-blur-sm rounded-xl px-5 py-3 flex items-baseline gap-1"
            >
              <span className="text-gold font-bold text-xl">{s.value}</span>
              {s.unit && <span className="text-gold font-medium text-sm">{s.unit}</span>}
              <span className="text-white/60 text-sm ml-1">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      {!reduced && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-1"
          aria-hidden="true"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
