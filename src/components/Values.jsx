import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const values = [
  {
    num: '01',
    title: 'Excellence',
    description: 'We adhere to the highest international compliance and bookkeeping standards. Our team of qualified accountants and licensed corporate secretaries guarantees audit-ready accuracy.',
  },
  {
    num: '02',
    title: 'Partnership',
    description: 'We operate as an extension of your team. From initial strategic consultation to post-incorporation treasury setups and GEM/IPO preparatories, we support your long-term success.',
  },
  {
    num: '03',
    title: 'Innovation',
    description: 'We continuously evolve our compliance technology infrastructure and taxation planning strategies to provide clients with modern, secure, and tax-optimized cross-border setups.',
  },
];

export default function Values() {
  const reduced = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: reduced ? 1 : 0.88, y: reduced ? 0 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.55,
        ease: [0.34, 1.56, 0.64, 1], // back.out(1.7) equivalent
      },
    },
  };

  return (
    <section id="values" className="py-24 bg-white" aria-labelledby="values-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Core Philosophy</p>
          <h2 id="values-heading" className="section-heading">Built on Three Pillars</h2>
          <p className="section-sub max-w-2xl mx-auto">
            Our foundations dictate how we serve international businesses, keeping client objectives at the center of our operations.
          </p>
        </div>

        {/* Pillars Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {values.map((val) => (
            <motion.article
              key={val.title}
              variants={cardVariants}
              className="bg-background rounded-2xl p-8 border border-border relative overflow-hidden group hover:border-gold hover:shadow-lg transition-all duration-300"
            >
              {/* Giant Watermark Number */}
              <span className="absolute -top-6 -right-4 text-7xl font-bold text-muted/30 select-none group-hover:text-gold/10 transition-colors duration-300" aria-hidden="true">
                {val.num}
              </span>
              
              <h3 className="font-bold text-primary text-xl mb-4 relative z-10">
                {val.title}
              </h3>
              <p className="text-muted-fg text-sm leading-relaxed relative z-10">
                {val.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
