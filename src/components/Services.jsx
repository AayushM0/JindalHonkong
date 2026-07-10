import React from 'react';
import { Building, BookOpen, FileText, CreditCard, Calculator, ClipboardCheck, BarChart3, Monitor } from 'lucide-react';

const servicesList = [
  {
    icon: Building,
    title: 'Company Formation & Setup',
    description: 'Companies Registry handling, validation of company names, nominee directors, and physical office address registry.',
    themeKey: 'blue'
  },
  {
    icon: BookOpen,
    title: 'Accounting & Bookkeeping',
    description: 'HK FRS compliant financial statements preparation, chart of accounts structuring, and digital transaction ledgers.',
    themeKey: 'blue'
  },
  {
    icon: FileText,
    title: 'Corporate Secretarial',
    description: 'Ongoing statutory compliance, annual return filings, AGM minutes compilation, and Companies Registry submissions.',
    themeKey: 'blue'
  },
  {
    icon: CreditCard,
    title: 'Banking & Treasury Setup',
    description: 'Multi-currency corporate bank account preparation, payment gateway advice, and online treasury integrations.',
    themeKey: 'blue'
  },
  {
    icon: Calculator,
    title: 'Taxation Strategy',
    description: 'Inland Revenue Department profits tax filing, profits tax registrations, employer returns, and tax exemption claims.',
    themeKey: 'emerald'
  },
  {
    icon: ClipboardCheck,
    title: 'Audit & Assurance',
    description: 'Coordination of statutory audits, internal controls reviews, and full financial performance compliance assurance.',
    themeKey: 'emerald'
  },
  {
    icon: BarChart3,
    title: 'SME & GEM Listing / IPO Prep',
    description: 'GEM eligibility appraisals, corporate restructuring, regulatory HKEX listings advisory, and coordination of advisors.',
    themeKey: 'blue'
  },
  {
    icon: Monitor,
    title: 'Technology Infrastructure',
    description: 'Corporate email hosting, secure client portal setup, B2B information security strategy, and IT consulting.',
    themeKey: 'emerald'
  }
];

const ICON_THEMES = {
  blue: {
    container: 'bg-blue-50 text-primary group-hover:bg-primary group-hover:text-white',
    titleHover: 'group-hover:text-primary'
  },
  emerald: {
    container: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    titleHover: 'group-hover:text-emerald-600'
  }
};

export default function Services() {
  return (
    <section 
      id="services" 
      className="py-16 bg-white flex flex-col items-center border-t border-slate-100" 
      aria-labelledby="services-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in-up">
          <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
            Platform Modules
          </span>
          <h2 id="services-heading" className="section-heading mt-5">
            Core B2B Advisory Services
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-normal leading-relaxed mt-4">
            End-to-end corporate solutions designed to navigate Hong Kong's regulatory framework and accelerate your growth.
          </p>
        </div>

        {/* 3-Column Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            const theme = ICON_THEMES[service.themeKey || 'blue'];
            
            return (
              <article
                key={service.title}
                className="group relative bg-[#f8fafc] border border-slate-200 rounded-xl p-8 transition-all duration-300 ease-custom-ease hover:bg-white hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 flex flex-col justify-between"
                style={{ borderRadius: '12px' }}
              >
                <div>
                  {/* Tinted icon box */}
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300 ${theme.container}`}>
                    <Icon size={24} aria-hidden="true" />
                  </div>

                  <h3 className={`text-lg font-bold text-slate-900 mb-3 transition-colors duration-300 ${theme.titleHover}`}>
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm leading-[1.6] font-normal">
                    {service.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
