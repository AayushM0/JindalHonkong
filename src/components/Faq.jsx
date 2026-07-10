import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How long does company formation in Hong Kong take?',
    a: 'Company incorporation and registration certificate submission takes between 1 to 3 business days. Jindalsons Limited handles name validation, article drafting, and Companies Registry submissions to ensure zero delay.'
  },
  {
    q: 'Can a foreigner own 100% of a Hong Kong corporate entity?',
    a: 'Yes, Hong Kong allows 100% foreign ownership. There are no restrictions on the nationality of directors or shareholders, and zero minimum paid-up capital is required to register.'
  },
  {
    q: 'What is the corporate tax regime structure in Hong Kong?',
    a: 'Hong Kong offers a competitive two-tiered profits tax regime: assessable profits up to HKD 2 million are taxed at just 8.25%, and profits above that are taxed at 16.5%. There is zero VAT, zero sales tax, and zero capital gains tax.'
  },
  {
    q: 'Are there foreign exchange controls on moving capital in/out?',
    a: 'None. Hong Kong has zero foreign exchange controls. Multi-currency corporate banking arrangements allow you to move treasury capital in and out of global markets freely.'
  },
  {
    q: 'Do I need a local registered physical address and corporate secretary?',
    a: 'Yes, a physical registered office address and a licensed local corporate secretary (holding a TCSP registry license) are statutory requirements in Hong Kong. Jindalsons Limited provides both out of our Kowloon headquarters.'
  }
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      className="py-16 bg-white flex flex-col items-center border-t border-slate-100"
      aria-labelledby="faq-heading"
    >
      <div className="w-full max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
            Inquiries
          </span>
          <h2 id="faq-heading" className="section-heading mt-5">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-lg font-normal mt-4">
            Essential registry, tax, and incorporation details for Hong Kong business setups
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-[#f8fafc] transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:text-primary transition-colors cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base tracking-tight pr-4">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                  />
                </button>

                {/* Answer slide panel */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-40 border-t border-slate-200/50' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 text-sm text-slate-500 leading-relaxed font-normal bg-white">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
