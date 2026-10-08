import React from 'react';
import { JusticeLogo } from '../ui/JusticeLogo';
import { practiceAreasData } from '../../data/mockData';
import { PracticeArea } from '../../types';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

interface GiantTypographicFooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenDisclaimer: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenContact: () => void;
  onSelectPractice: (practice: PracticeArea) => void;
}

export const GiantTypographicFooter: React.FC<GiantTypographicFooterProps> = ({
  onOpenPrivacy,
  onOpenTerms,
  onOpenDisclaimer,
  onNavigateSection,
  onOpenContact,
  onSelectPractice,
}) => {
  return (
    <footer className="w-full bg-[#0a182b] text-white pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <JusticeLogo size={36} darkText={false} />
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed mt-4">
              Wafula PW &amp; Company Advocates is a premier Kenyan law practice delivering decisive commercial trial advocacy, banking securities recovery, and strategic corporate counsel.
            </p>
            <div className="text-xs text-[#ddf0ec] font-mono pt-2">
              Chambers: Milimani / Nairobi CBD · High Court of Kenya
            </div>
          </div>

          {/* Col 2: Core Disciplines */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ddf0ec]">
              Core Disciplines
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {practiceAreasData.slice(0, 5).map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => onSelectPractice(p)}
                    className="hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1 group"
                  >
                    <span>{p.name}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Chambers Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#ddf0ec]">
              Chambers Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ddf0ec] shrink-0 mt-0.5" />
                <span>Nairobi, Kenya · Milimani Commercial Court Registry Vicinity</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ddf0ec] shrink-0" />
                <a href="tel:+254716954112" className="hover:text-white transition-colors">
                  +254 716 954 112 / +254 780 323 657
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ddf0ec] shrink-0" />
                <a href="mailto:info@wafulapwadvocates.com" className="hover:text-white transition-colors">
                  info@wafulapwadvocates.com
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="px-4 py-2 rounded-full bg-[#ddf0ec] text-[#183f6e] hover:bg-white text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                Book Intake Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Dramatic Giant Typographic "JUSTICE" Banner */}
        <div className="w-full text-center py-6 select-none overflow-hidden" aria-hidden="true">
          <span
            className="text-[17vw] sm:text-[14vw] font-black tracking-tighter leading-none block font-serif text-outline-giant opacity-70"
            style={{ letterSpacing: '0.04em' }}
          >
            JUSTICE
          </span>
        </div>

        {/* Bottom Legal Copyright & Disclaimers */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Wafula PW &amp; Company Advocates. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={onOpenTerms}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Engagement
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={onOpenDisclaimer}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Legal Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
