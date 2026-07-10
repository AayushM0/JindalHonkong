import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TrendingUp, EyeOff, DollarSign, MapPin } from 'lucide-react';

const advantages = [
  {
    icon: TrendingUp,
    title: 'ROI-Focused Advisory',
    description: 'Every strategic recommendation is structured to optimize your operational yield, streamline costs, and support regional scaling targets.',
  },
  {
    icon: EyeOff,
    title: 'Strict Confidentiality & Privacy',
    description: 'Operating under rigorous security standards. Your client profiles, trust assets, and intellectual property remain highly protected.',
  },
  {
    icon: DollarSign,
    title: 'Complete Upfront Transparency',
    description: 'No hidden fees. Upfront flat-rate pricing covers registry submissions, office addresses, local compliance filings, and audit coordinates.',
  },
  {
    icon: MapPin,
    title: 'Specialized Hong Kong & Greater China Advisory',
    description: 'Operating directly from Kowloon with deep connections to commercial banking networks and professional institutions in the region.',
  },
];

export default function Advantages() {
  const reduced = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { x: reduced ? 0 : -32, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: reduced ? 0 : 0.45,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="advantages" className="py-24 bg-background" aria-labelledby="advantages-heading">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Left Column */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Our Competitive Edge</p>
            <h2 id="advantages-heading" className="section-heading">Why Leading Businesses Choose Us</h2>
            <p className="section-sub mb-8">
              We bridges the gap between complex regulatory requirements and business growth. Through rapid turnaround times, dedicated local corporate secretaries, and custom tax planning, we ensure structural certainty.
            </p>
            <div className="border-l-4 border-gold pl-6 py-2 bg-white rounded-r-lg shadow-sm border border-border">
              <span className="block text-2xl font-bold text-primary">Zero Risk Compliance</span>
              <span className="text-muted-fg text-sm">Dedicated local licensed secretaries guaranteeing accurate filings.</span>
            </div>
          </motion.div>

          {/* Advantages List Right Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-7 space-y-6"
          >
            {advantages.map((adv, index) => {
              const Icon = adv.icon;
              return (
                <motion.div
                  key={adv.title}
                  variants={rowVariants}
                  className="flex gap-5 bg-white p-6 rounded-xl border border-border hover:shadow-md transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-base mb-1.5">{adv.title}</h3>
                    <p className="text-muted-fg text-sm leading-relaxed">{adv.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
