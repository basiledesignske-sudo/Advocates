import React from 'react';
import { Attorney, FirmStats } from '../../types';
import { ArrowRight, CheckCircle2, Shield, Award, Users } from 'lucide-react';
import { GoldStar } from '../ui/JusticeLogo';

interface IntroAttorneysSectionProps {
  stats: FirmStats;
  featuredAttorney: Attorney;
  onSelectAttorney: () => void;
  onViewAllTeam: () => void;
  onOpenConsultation: () => void;
  onExplorePractices: () => void;
}

export const IntroAttorneysSection: React.FC<IntroAttorneysSectionProps> = ({
  stats,
  featuredAttorney,
  onSelectAttorney,
  onViewAllTeam,
  onOpenConsultation,
  onExplorePractices,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with Floating Stats Card */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-[#0f2847] aspect-[4/5] relative">
              <img
                src={featuredAttorney.image || '/wafula-paul.jpg'}
                alt="Wafula W. Paul - Managing Partner"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/wafula-paul.jpg';
                }}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e2747] via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-lg text-slate-800">
                <div className="text-xs font-bold uppercase tracking-wider text-[#183f6e] mb-0.5">
                  Managing Partner &amp; Lead Counsel
                </div>
                <div className="text-base font-extrabold text-[#0a111a]">
                  {featuredAttorney.name}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  Walker Kontos Alum · 10+ Years Bar Standing
                </div>
              </div>
            </div>

            {/* Accent badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 px-4 py-2 rounded-2xl bg-[#183f6e] text-white shadow-xl border border-white/20 items-center gap-2">
              <Award className="w-4 h-4 text-[#ddf0ec]" />
              <span className="text-xs font-bold">Ksh 2.05B+ Recovered</span>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200">
              <GoldStar className="w-3 h-3 text-[#183f6e]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#183f6e]">
                About Our Chambers
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0a111a] tracking-tight leading-tight">
              A High-Calibre Legal Practice Built on Precision and Unyielding Integrity.
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              Established with an uncompromising commitment to legal excellence, <strong>Wafula PW &amp; Company Advocates</strong> represents leading financial institutions, corporate bodies, receivers, and discerning private clients across the Republic of Kenya.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#183f6e] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0a111a]">Proven Courtroom Tenacity</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Specialized trial advocacy successfully defeating adverse injunctions and protecting asset titles.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#183f6e] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0a111a]">Confidential Strategic Counsel</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Strict adherence to attorney-client privilege and proactive conflict screening.
                  </p>
                </div>
              </div>
            </div>

            {/* Firm Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#183f6e] tracking-tight tabular-nums">
                  {stats.yearsExperience}+
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#183f6e] tracking-tight tabular-nums">
                  {stats.clientsServed}+
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Matters Concluded</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#183f6e] tracking-tight tabular-nums">
                  {stats.successRatePercent}%
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Success Metric</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 rounded-full bg-[#183f6e] text-white hover:bg-[#123157] text-sm font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>Consult Our Advocates</span>
                <ArrowRight className="w-4 h-4 text-[#ddf0ec]" />
              </button>

              <button
                onClick={onViewAllTeam}
                className="px-5 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-[#183f6e] text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Users className="w-4 h-4 text-[#183f6e]" />
                <span>Meet Leadership Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
