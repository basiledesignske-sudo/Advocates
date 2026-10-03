import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface LegalTermsModalProps {
  type: 'privacy' | 'terms' | 'disclaimer' | null;
  onClose: () => void;
}

export const LegalTermsModal: React.FC<LegalTermsModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'Privacy Policy & Data Protection',
      subtitle: 'Compliant with Kenya Data Protection Act 2019 and statutory legal secrecy standards',
      body: [
        'Wafula PW & Co. Advocates is committed to safeguarding personal, financial, and confidential data entrusted to us. We never sell, rent, or trade client information.',
        'Data collected via our secure consultation request forms is utilized solely for preliminary conflicts checking, scheduling, and confidential case evaluation.',
        'All transmissions are protected with TLS 1.3 encryption and stored in private secure environments with strict role-based access control. Data retention periods conform strictly with the Advocates Act and Law Society of Kenya ethical rules.',
      ],
    },
    terms: {
      title: 'Terms of Website Use',
      subtitle: 'Legal parameters governing interaction with Wafula PW & Co. Advocates digital platforms',
      body: [
        'By accessing or using this website, you acknowledge that all materials, articles, analysis, and visual assets are proprietary intellectual property of Wafula PW & Co. Advocates.',
        'No Advocate-Client Relationship: Use of this website, including sending electronic inquiries, does not create an advocate-client relationship between you and Wafula PW & Co. Advocates or any of its partners.',
        'Any unauthorized scraping, extraction of advocate contact directories, or transmission of malicious code is strictly prohibited under the Computer Misuse and Cybercrimes Act of Kenya.',
      ],
    },
    disclaimer: {
      title: 'Legal Practice & Remuneration Disclaimer',
      subtitle: 'Jurisdictional notices & Advocates (Remuneration) Order disclosures',
      body: [
        'This website provides general informational content under the ethical guidelines of the Law Society of Kenya. Prior case outcomes, recoveries, and testimonials do not guarantee or predict an identical result in future legal matters.',
        'The legal information presented herein is provided strictly for educational and general informational purposes, and should not be construed as legal advice for your specific factual circumstances.',
        'Urgent Notice: Do not submit confidential time-sensitive information regarding pending warrants or immediate statutes of limitations via web form. Please contact our direct intake line at +254 716 954 112.',
      ],
    },
  };

  const current = contentMap[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#183f6e] text-white rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-8 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Policy Disclosure</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {current.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1">{current.subtitle}</p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-4 border-t border-white/10">
          {current.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="gold-bg-btn px-6 py-2 rounded-full text-xs font-semibold cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
