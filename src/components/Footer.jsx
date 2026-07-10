import React from 'react';

const FOOTER_SECTIONS = [
  {
    title: 'Platform',
    links: [
      { label: 'Formation Tool', href: '#platform', isScroll: true },
      { label: 'Advisory Modules', href: '#services', isScroll: true },
      { label: 'Metrics Board', href: '#stats', isScroll: true },
      { label: 'Governance Console', href: '#security', isScroll: true }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Company Secretary', href: '#services', isScroll: true },
      { label: 'Registered Office', href: '#services', isScroll: true },
      { label: 'Accounting & Audit', href: '#services', isScroll: true },
      { label: 'Corporate Banking', href: '#services', isScroll: true }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'HK Profits Tax Guide', href: '#platform', isScroll: true },
      { label: 'Registry NAR1 Form', href: '#platform', isScroll: true },
      { label: 'Compliance Calendar', href: '#platform', isScroll: true },
      { label: 'Status Check API', href: '#platform', isScroll: true }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#platform', isScroll: true },
      { label: 'Core Pillars', href: '#platform', isScroll: true },
      { label: 'HK Advisory Desk', href: '#platform', isScroll: true },
      { label: 'Careers', href: '#platform', isScroll: true }
    ]
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#platform', isScroll: true },
      { label: 'Terms of Service', href: '#platform', isScroll: true },
      { label: 'TCSP Secretary License', href: '#platform', isScroll: true },
      { label: 'Service Agreement', href: '#platform', isScroll: true }
    ]
  }
];

export default function Footer() {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020617] text-slate-400 border-t border-slate-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Main 6-Column Grid (logo/info + 5 sections) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 border-b border-slate-900 pb-16">
          
          {/* Column 1 (Logo & Tagline) - col-span-2 for 6-column rhythm */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 group cursor-pointer"
              aria-label="Jindalsons Limited — home"
            >
              <div className="w-5.5 h-5.5 bg-white/10 rounded flex items-center justify-center transition-transform duration-300 group-hover:rotate-6">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-sm" />
              </div>
              <span className="text-white font-extrabold text-base tracking-tight">
                Jindalsons<span className="font-normal text-slate-400"> Ltd</span>
              </span>
            </a>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Hong Kong's premier enterprise B2B corporate governance and advisory portal. Trusted compliance solutions for international founders.
            </p>
          </div>

          {/* Columns 2 to 6 (Platform, Solutions, Resources, Company, Legal) */}
          {FOOTER_SECTIONS.map((section, sectionIdx) => (
            <div key={sectionIdx} className="lg:col-span-2 flex flex-col gap-4">
              <span className="text-xs font-bold text-slate-200 uppercase tracking-widest">
                {section.title}
              </span>
              <nav className="flex flex-col gap-2.5 text-xs font-medium" aria-label={`${section.title} Links`}>
                {section.links.map((link, linkIdx) => {
                  if (link.isScroll) {
                    return (
                      <button
                        key={linkIdx}
                        onClick={() => handleScroll(link.href)}
                        className="text-left hover:text-white transition-all duration-300 ease-custom-ease cursor-pointer"
                      >
                        {link.label}
                      </button>
                    );
                  }
                  return (
                    <a
                      key={linkIdx}
                      href={link.href}
                      className="hover:text-white transition-all duration-300 ease-custom-ease"
                    >
                      {link.label}
                    </a>
                  );
                })}
              </nav>
            </div>
          ))}

        </div>

        {/* Bottom bar: Copyright & System Status */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 text-xs text-slate-500">
          <p>© 2026 Jindalsons Limited. All rights reserved.</p>
          
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {/* System Status pulsing dot */}
            <div className="inline-flex items-center gap-2 text-slate-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span>All Systems Operational</span>
            </div>
            
            <p className="max-w-[340px] text-center sm:text-right leading-relaxed text-[11px] text-slate-600">
              Licensed Trust or Company Service Provider (TCSP) Registry Secretary. Filings subject to Inland Revenue approval.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
