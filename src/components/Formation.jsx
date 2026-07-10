import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquare, FileEdit, Send, Landmark } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Strategic Consultation',
    description: 'Initial analysis for company name reservation, corporate structure mapping, and capital/director advisory.',
  },
  {
    step: '02',
    icon: FileEdit,
    title: 'Document Preparation',
    description: 'Drafting of incorporation articles, statutory declarations, registry forms (NNC1/NNC1G), and initial board resolutions.',
  },
  {
    step: '03',
    icon: Send,
    title: 'Registry Submission',
    description: 'Direct electronic filing with the Companies Registry. Certificates of incorporation and business registration are typically issued in 1 to 3 business days.',
  },
  {
    step: '04',
    icon: Landmark,
    title: 'Banking & Tax Setup',
    description: 'Corporate bank introductions, Inland Revenue Department (IRD) profile setup, and ongoing compliance onboarding.',
  },
];

export default function Formation() {
  const reduced = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: reduced ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: reduced ? 0 : 0.5,
        ease: 'easeOut',
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: reduced ? 0 : 0.8,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="formation" className="py-24 bg-white" aria-labelledby="formation-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Seamless Setup</p>
          <h2 id="formation-heading" className="section-heading">4-Step Company Formation Process</h2>
          <p className="section-sub max-w-2xl mx-auto">
            Our streamlined workflow removes administrative hurdles, moving your company from concept to active operations in days.
          </p>
        </div>

        {/* Timeline Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          {/* Connecting line (Desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[8%] right-[8%] h-0.5 bg-muted z-0" aria-hidden="true">
            <motion.div
              variants={lineVariants}
              className="h-full bg-gold step-connector"
            />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  variants={stepVariants}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left group"
                >
                  {/* Step bubble */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary text-white border-2 border-gold flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:border-accent shadow-md">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                    {/* Floating Step Number */}
                    <span className="absolute -top-3 -right-3 text-xs font-bold bg-gold text-white px-1.5 py-0.5 rounded-full border border-white">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-semibold text-primary text-lg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-fg text-sm leading-relaxed max-w-xs md:max-w-none">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
