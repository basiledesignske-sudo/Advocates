import React, { useState } from 'react';
import { JusticeLogo } from '../ui/JusticeLogo';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { PracticeArea } from '../../types';
import { practiceAreasData } from '../../data/mockData';

interface GiantTypographicFooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenDisclaimer: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenContact?: () => void;
  onSelectPractice?: (practice: PracticeArea) => void;
}

export const GiantTypographicFooter: React.FC<GiantTypographicFooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenDisclaimer,
  onNavigateSection,
  onOpenContact,
  onSelectPractice,
}) => {
  const [weChatCopied, setWeChatCopied] = useState(false);

  const handleWeChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('WafulaPWAdvocates');
    }
    setWeChatCopied(true);
    setTimeout(() => setWeChatCopied(false), 3000);
  };

  return (
    <footer data-nav-theme="blue" className="relative bg-[#183f6e] text-slate-200 py-14 sm:py-16 overflow-hidden border-t border-white/20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <JusticeLogo size={36} darkText={false} showTagline={true} />
              <p className="text-xs sm:text-sm text-slate-300 max-w-sm mt-4 leading-relaxed">
                Wafula PW &amp; Company Advocates is a premier Kenyan full-service law firm delivering tailor-made, practical, client-focused and results-oriented legal solutions across East Africa.
              </p>
            </div>

            {/* Social Channels */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold block mb-3">
                Connect With Our Chambers
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#ddf0ec] flex items-center justify-center text-slate-200 hover:text-[#ddf0ec] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34M7.86 18.5V10.13H5.06V18.5h2.8z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/254716954112"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  title="WhatsApp (+254 716 954 112)"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#ddf0ec] flex items-center justify-center text-slate-200 hover:text-[#ddf0ec] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.19c-.24.68-1.2 1.27-1.84 1.35-.49.06-1.12.08-3.27-.81-2.75-1.14-4.52-3.95-4.66-4.13-.14-.18-1.12-1.49-1.12-2.85 0-1.36.71-2.03.96-2.31.25-.28.54-.35.73-.35.18 0 .37 0 .53.01.17.01.4.06.61.56.24.58.82 2 .89 2.15.07.15.12.33.02.53-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.08.18-.21.78-.91.99-1.22.21-.31.42-.26.71-.15.29.11 1.83.86 2.14 1.02.31.15.52.23.59.36.08.13.08.76-.16 1.44z" />
                  </svg>
                </a>

                {/* WeChat with copy button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleWeChatClick}
                    aria-label="WeChat"
                    title="WeChat (ID: WafulaPWAdvocates - Click to copy)"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#ddf0ec] flex items-center justify-center text-slate-200 hover:text-[#ddf0ec] transition-all cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.5 2C4.36 2 1 4.91 1 8.5c0 2.02 1.05 3.82 2.7 4.98L3 17l4.13-1.65c.44.1 0.9.15 1.37.15.26 0 .52-.02.77-.05A6.47 6.47 0 0 1 9 13.5c0-3.59 3.36-6.5 7.5-6.5.34 0 .68.03 1.01.07C16.5 4.3 12.8 2 8.5 2zm-2.25 4.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zm4.5 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM16.5 8c-3.59 0-6.5 2.46-6.5 5.5 0 3.04 2.91 5.5 6.5 5.5.4 0 .78-.04 1.16-.12L21 20.5l-.62-2.92C21.9 16.56 23 15.12 23 13.5 23 10.46 20.09 8 16.5 8zm-2 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                  </button>
                  {weChatCopied && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-lg bg-[#ddf0ec] text-[#183f6e] text-[10px] font-bold whitespace-nowrap shadow-lg pointer-events-none animate-in fade-in zoom-in-95">
                      WeChat ID copied!
                    </div>
                  )}
                </div>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#ddf0ec] flex items-center justify-center text-slate-200 hover:text-[#ddf0ec] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Core Practice Disciplines
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {practiceAreasData.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      if (onSelectPractice) {
                        onSelectPractice(p);
                      } else {
                        onNavigateSection('practice-areas');
                      }
                    }}
                    className="hover:text-[#ddf0ec] transition-colors cursor-pointer text-left block"
                    title={`Open dedicated page for ${p.name}`}
                  >
                    {p.shortName}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10">
                <button
                  onClick={() => onNavigateSection('publications')}
                  className="hover:text-[#ddf0ec] transition-colors cursor-pointer text-left"
                >
                  Legal Publications Hub
                </button>
              </li>
              {onOpenContact && (
                <li className="pt-1">
                  <button
                    onClick={onOpenContact}
                    className="text-[#ddf0ec] font-semibold hover:underline transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Schedule Consultation</span>
                    <span>→</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Chambers Address & Direct Contact */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Nairobi Chambers Location
            </h4>
            <div className="text-xs text-slate-400 space-y-2 mb-4 leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ddf0ec] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">MCMX Building, First Floor</p>
                  <p>Off Kiambu Road, Nairobi, Kenya</p>
                  <p className="text-slate-500">P.O. Box 22594 – 00400 Nairobi</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <Phone className="w-4 h-4 text-[#ddf0ec] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+254716954112" className="hover:text-[#ddf0ec] transition-colors">
                    +254 716 954 112
                  </a>
                  <span className="text-white/40 mx-1.5">|</span>
                  <a href="tel:+254780323657" className="hover:text-[#ddf0ec] transition-colors">
                    +254 780 323 657
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ddf0ec] shrink-0 mt-0.5" />
                <a href="mailto:info@wafulapwadvocates.com" className="hover:text-[#ddf0ec] transition-colors">
                  info@wafulapwadvocates.com
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
              <button onClick={onOpenPrivacy} className="hover:text-[#ddf0ec] transition-colors cursor-pointer">
                Privacy Policy
              </button>
              <span>·</span>
              <button onClick={onOpenTerms} className="hover:text-[#ddf0ec] transition-colors cursor-pointer">
                Terms of Service
              </button>
              <span>·</span>
              <button onClick={onOpenDisclaimer} className="hover:text-[#ddf0ec] transition-colors cursor-pointer">
                Advocates Disclaimer
              </button>
            </div>
          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Copyright © 2026 Wafula PW &amp; Company Advocates. All Rights Reserved.
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#ddf0ec]" />
            <span>Advocates of the High Court of Kenya · Law Society of Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
