import { useState } from 'react';
import { CheckCircle, ShieldAlert, Shield, Lock, Key, Eye } from 'lucide-react';

const certificationPoints = [
  { title: 'TCSP Licensed Corporate Secretary', desc: 'Operating under Hong Kong Companies Registry License No. TC004812 to guarantee legal secretarial filings.' },
  { title: 'HK FRS Accounting Compliance', desc: 'All ledgers and corporate tax returns are structured by certified qualified accountants in line with HK FRS.' },
  { title: 'GDPR & HK PDPO Data Safeguards', desc: 'Secure client portal document uploads are fully encrypted with AES-256 standards at rest and in transit.' },
  { title: 'Nominee Director Escrow Protection', desc: 'Legal nominee arrangements secured under strict local fiduciary covenants and confidential client vaults.' }
];

export default function SecuritySection() {
  const [policies, setPolicies] = useState({
    mfa: true,
    ipWhitelist: false,
    keyRotation: true
  });

  const togglePolicy = (key) => {
    setPolicies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section 
      id="security" 
      className="py-16 bg-[#f8fafc] flex flex-col items-center border-t border-slate-200"
      aria-labelledby="security-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Certifications & Trust list */}
          <div className="lg:col-span-6 animate-fade-in-up">
            <span className="text-primary font-bold text-xs uppercase tracking-wider bg-blue-50 px-3 py-1.5 rounded-full">
              Trust & Governance
            </span>
            <h2 id="security-heading" className="section-heading mt-5">
              Enterprise Governance & Security Compliance
            </h2>
            <p className="text-slate-500 text-lg md:text-xl font-normal leading-relaxed mt-4 mb-10">
              We bridge standard Hong Kong regulatory filing structures with strict corporate governance systems to protect your business assets.
            </p>

            <div className="space-y-6">
              {certificationPoints.map((pt, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle size={20} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{pt.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mt-1">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Policy Toggle & Threat Alert mockup */}
          <div className="lg:col-span-6 flex justify-center relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            
            {/* Main Toggle Card */}
            <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-xl p-6 md:p-8 relative z-10" style={{ borderRadius: '12px' }}>
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                <Shield size={20} className="text-primary" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Security Policy Management</h3>
                  <p className="text-slate-400 text-xs mt-0.5">Control live corporate data shielding policies</p>
                </div>
              </div>

              {/* Toggles List */}
              <div className="space-y-6">
                
                {/* MFA Toggle */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                      <Lock size={18} />
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-slate-800">Multi-Factor Authentication (MFA)</span>
                      <span className="block text-xs text-slate-400 mt-0.5">Protect secretarial document downloads</span>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePolicy('mfa')}
                    className={`w-10 h-6 rounded-lg p-1 transition-all duration-300 relative focus:outline-none cursor-pointer border ${
                      policies.mfa 
                        ? 'bg-primary border-primary/20 shadow-[0_0_12px_rgba(37,99,235,0.45)]' 
                        : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                    }`}
                    style={{ borderRadius: '8px' }}
                    aria-label="Toggle Multi-Factor Authentication"
                  >
                    <span 
                      className={`block w-4 h-4 bg-white shadow-sm transition-all duration-300 absolute top-[3px] ${
                        policies.mfa ? 'left-5' : 'left-[3px]'
                      }`}
                      style={{ borderRadius: '6px' }}
                    />
                  </button>
                </div>

                {/* IP Whitelist Toggle */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                      <Eye size={18} />
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-slate-800">IP Access Whitelisting</span>
                      <span className="block text-xs text-slate-400 mt-0.5">Restrict registry changes to corporate IPs</span>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePolicy('ipWhitelist')}
                    className={`w-10 h-6 rounded-lg p-1 transition-all duration-300 relative focus:outline-none cursor-pointer border ${
                      policies.ipWhitelist 
                        ? 'bg-primary border-primary/20 shadow-[0_0_12px_rgba(37,99,235,0.45)]' 
                        : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                    }`}
                    style={{ borderRadius: '8px' }}
                    aria-label="Toggle IP Access Whitelisting"
                  >
                    <span 
                      className={`block w-4 h-4 bg-white shadow-sm transition-all duration-300 absolute top-[3px] ${
                        policies.ipWhitelist ? 'left-5' : 'left-[3px]'
                      }`}
                      style={{ borderRadius: '6px' }}
                    />
                  </button>
                </div>

                {/* Key Rotation Toggle */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-primary flex-shrink-0">
                      <Key size={18} />
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-slate-800">Automated Audit Key Rotation</span>
                      <span className="block text-xs text-slate-400 mt-0.5">Rotate digital ledger access keys monthly</span>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePolicy('keyRotation')}
                    className={`w-10 h-6 rounded-lg p-1 transition-all duration-300 relative focus:outline-none cursor-pointer border ${
                      policies.keyRotation 
                        ? 'bg-primary border-primary/20 shadow-[0_0_12px_rgba(37,99,235,0.45)]' 
                        : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                    }`}
                    style={{ borderRadius: '8px' }}
                    aria-label="Toggle Automated Audit Key Rotation"
                  >
                    <span 
                      className={`block w-4 h-4 bg-white shadow-sm transition-all duration-300 absolute top-[3px] ${
                        policies.keyRotation ? 'left-5' : 'left-[3px]'
                      }`}
                      style={{ borderRadius: '6px' }}
                    />
                  </button>
                </div>

              </div>
            </div>

            {/* Overlapping Threat Alert Badge */}
            <div className="absolute -bottom-6 -left-6 md:-left-12 z-20 bg-slate-900 border border-slate-800 shadow-2xl p-4 rounded-xl max-w-xs flex gap-3 items-start animate-pulse" style={{ borderRadius: '12px' }}>
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderRadius: '8px' }}>
                <ShieldAlert size={18} />
              </div>
              <div>
                <span className="block font-bold text-xs text-white">Threat Shield Active</span>
                <span className="block text-[11px] text-slate-400 leading-snug mt-0.5">Blocked unauthorized external attempt to alter NAR1 Registry files</span>
                <span className="block text-[9px] text-slate-500 mt-2 font-medium">Just now · TST Kowloon Desk</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
