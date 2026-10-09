import React from 'react';
import { GoldStar } from '../ui/JusticeLogo';
import { Attorney, FirmStats } from '../../types';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Scale,
  ShieldCheck,
} from 'lucide-react';

interface IntroAttorneysSectionProps {
  stats: FirmStats;
  onSelectAttorney?: (attorney?: Attorney) => void;
  featuredAttorney?: Attorney;
  onViewAllTeam: () => void;
  onOpenConsultation?: () => void;
  onExplorePractices?: () => void;
}

export const IntroAttorneysSection: React.FC<IntroAttorneysSectionProps> = ({
  stats,
  onViewAllTeam,
  onOpenConsultation,
  onExplorePractices,
}) => {
  return (
    <section id="about" data-nav-theme="white" className="w-full bg-white border-y border-[#e2e8f0] py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          {/* Left Column: Firm Story & Value Proposition */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8fafc] border border-[#e2e8f0] mb-4">
              <GoldStar className="w-3 h-3 text-[#183f6e]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#183f6e]">
                About The Firm
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a111a] leading-tight mb-3 text-balance">
              Dedicated Legal Representation Grounded in Integrity &amp; Results
            </h2>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#0a111a] leading-[1.3] mb-4 text-balance">
              Trusted Legal Counsel for Corporates, Financial Institutions &amp; Private Clients
            </h3>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
              <strong className="text-[#183f6e]">Wafula PW &amp; Company Advocates</strong> is a full-service Kenyan law firm committed to delivering tailor-made, practical, client-focused, and results-oriented legal solutions. Our practice brings together diverse courtroom experience across commercial litigation, banking recoveries, property conveyancing, labour law, arbitration, and intellectual property.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {onOpenConsultation && (
                <button
                  onClick={onOpenConsultation}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#183f6e] hover:bg-[#123157] transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4 text-[#ddf0ec]" />
                </button>
              )}
              {onExplorePractices && (
                <button
                  onClick={onExplorePractices}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-700 bg-[#f8fafc] hover:bg-[#e2e8f0] border border-[#e2e8f0] transition-colors cursor-pointer"
                >
                  Explore Practice Areas
                </button>
              )}
            </div>
          </div>

          {/* Right Column: 4 Strategic Core Value Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="w-10 h-10 rounded-xl bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0a111a]">Professional Excellence</h4>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Rigorous legal analysis, meticulous pleading drafting, and decisive representation before Kenyan courts.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="w-10 h-10 rounded-xl bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0a111a]">Integrity &amp; Accountability</h4>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Transparent fee structures, realistic probabilities, and steadfast fiduciary responsibility to each client.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="w-10 h-10 rounded-xl bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0a111a]">Client Confidentiality</h4>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Ironclad protection of attorney-client privilege, privileged information, and sensitive corporate data.
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0]">
              <div className="w-10 h-10 rounded-xl bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0a111a]">Continuous Innovation</h4>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Integrating state-of-the-art legal research and expedited digital dispute mechanisms for prompt outcomes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
