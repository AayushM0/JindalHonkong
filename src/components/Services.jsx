import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Building,
  BookOpen,
  FileText,
  CreditCard,
  Calculator,
  ClipboardCheck,
  BarChart2,
  Monitor
} from 'lucide-react';

const servicesList = [
  {
    icon: Building,
    title: 'Company Formation & Setup',
    description: 'Companies Registry handling, company name validation, registered office address, and nominee director options.',
  },
  {
    icon: BookOpen,
    title: 'Accounting & Bookkeeping',
    description: 'HK FRS compliance, financial statements preparation, chart of accounts structuring, and transaction ledgers.',
  },
  {
    icon: FileText,
    title: 'Corporate Secretarial',
    description: 'Ongoing statutory compliance, annual return filing, AGM minutes preparation, share allocations and transfers, and Companies Registry filings.',
  },
  {
    icon: CreditCard,
    title: 'Banking & Treasury Setup',
    description: 'Multi-currency accounts setup, online corporate portals, and payment gateways advice.',
  },
  {
    icon: Calculator,
    title: 'Taxation Strategy',
    description: 'Inland Revenue Department (IRD) tax filings, profits tax registration, employer return submissions, tax exemption claims, and cross-border tax planning.',
  },
  {
    icon: ClipboardCheck,
    title: 'Audit & Assurance',
    description: 'Statutory audit coordination, internal control reviews, financial performance audits, and compliance assurance.',
  },
  {
    icon: BarChart2,
    title: 'SME & GEM Listing / IPO Advisory',
    description: 'GEM eligibility appraisals, regulatory listing alignment, corporate restructuring, prospectus compliance support, and advisor coordination.',
  },
  {
    icon: Monitor,
    title: 'Technology Infrastructure',
    description: 'Professional email hosting, corporate landing page setups, IT strategy consulting, and information security setup.',
  },
];

export default function Services() {
  const reduced = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : 0.06,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0 : 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="services" className="py-24 bg-background" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-gold font-medium text-sm tracking-widest uppercase mb-3">Comprehensive Offerings</p>
          <h2 id="services-heading" className="section-heading">Our Advisory Services</h2>
          <p className="section-sub max-w-2xl mx-auto">
            End-to-end corporate solutions designed to navigate Hong Kong's regulatory framework and accelerate your growth.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                variants={itemVariants}
                className="service-card group"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-200">
                  <Icon size={24} className="text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-primary text-lg mb-3 leading-snug">
                  {service.title}
                </h3>
                <p className="text-muted-fg text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
