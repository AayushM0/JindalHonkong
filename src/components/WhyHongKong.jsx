import { motion, useReducedMotion } from 'framer-motion';
import { Building2, ArrowLeftRight, TrendingDown, Shield, Globe } from 'lucide-react';
import { useCountUp } from '../hooks/useAnimations';

const cards = [
  {
    icon: Building2,
    stat: null,
    statLabel: '100%',
    label: 'Foreign Ownership',
    description: 'No restrictions on overseas shareholders. Zero minimum paid-up capital required to incorporate.',
  },
  {
    icon: ArrowLeftRight,
    stat: null,
    statLabel: 'Zero',
    label: 'FX Controls',
    description: 'Move capital freely in and out of Hong Kong with no foreign exchange restrictions.',
  },
  {
    icon: TrendingDown,
    stat: 8,
    statSuffix: '.25%',
    statLabel: null,
    label: 'Starting Tax Rate',
    description: 'Two-tier profits tax on assessable profits. Zero VAT, zero capital gains tax.',
  },
  {
    icon: Shield,
    stat: null,
    statLabel: 'World-Class',
    label: 'IP & Legal Framework',
    description: 'Robust intellectual property protection, independent judiciary, and common law system.',
  },
  {
    icon: Globe,
    stat: null,
    statLabel: 'Bilingual',
    label: 'Workforce & Infrastructure',
    description: 'English & Cantonese-fluent talent pool with world-class connectivity and infrastructure.',
  },
];

function StatCard({ card, index, reduced }) {
  const { ref, value } = useCountUp(card.stat || 0, 1200);

  const displayStat = card.stat !== null
    ? `${value}${card.statSuffix}`
    : card.statLabel;

  return (
    <motion.div
      initial={{ opacity: 0, scale: reduced ? 1 : 0.92, y: reduced ? 0 : 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay:    reduced ? 0 : index * 0.08,
        duration: reduced ? 0 : 0.45,
        ease:     [0.34, 1.56, 0.64, 1],
      }}
      className="bg-white rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-default group"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-200">
          <card.icon size={22} className="text-accent" aria-hidden="true" />
        </div>
        <span
          ref={card.stat !== null ? ref : undefined}
          className="text-2xl font-bold text-gold tabular-nums"
        >
          {displayStat}
        </span>
      </div>
      <h3 className="font-semibold text-primary text-base mb-1">{card.label}</h3>
      <p className="text-muted-fg text-sm leading-relaxed">{card.description}</p>
    </motion.div>
  );
}

export default function WhyHongKong() {
  const reduced = useReducedMotion();

  return (
    <section id="why-hk" className="py-24 bg-white border-t-4 border-gold" aria-labelledby="why-hk-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">The Strategic Advantage</p>
          <h2 id="why-hk-heading" className="section-heading">Why Structure Through Hong Kong?</h2>
          <p className="section-sub max-w-2xl mx-auto">
            Hong Kong offers a unique combination of low taxation, legal certainty, and unmatched access
            to the Greater China and Asian markets.
          </p>
        </motion.div>

        {/* Cards grid — 5 cards, 3+2 layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <StatCard key={card.label} card={card} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  );
}
