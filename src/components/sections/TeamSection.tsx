import React, { useState } from 'react';
import { Attorney } from '../../types';
import {
  Award,
  Calendar,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { GoldStar } from '../ui/JusticeLogo';

const wafulaPaulImg = '/wafula-paul.jpg';

interface TeamSectionProps {
  attorneys?: Attorney[];
  attorney?: Attorney;
  onSelectAttorney?: (attorney: Attorney) => void;
  onOpenConsultation?: (practiceId?: string) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({
  attorneys,
  attorney: propAttorney,
  onSelectAttorney,
  onOpenConsultation,
}) => {
  // Always display Wafula Paul as the sole advocate and legal leader
  const lead = propAttorney || (attorneys && attorneys.length > 0 ? attorneys[0] : null);

  const fallbackAttorney: Attorney = {
    id: 'wafula-paul',
    name: 'WAFULA W. PAUL',
    role: 'Managing Partner & Senior Litigation Advocate',
    experience: '10+ Years Experience',
    specialty: 'Civil & Commercial Litigation, Banking Recoveries & ADR',
    bio: 'WAFULA W. PAUL is an experienced Litigation Advocate with a distinguished track record in managing complex legal disputes, representing high-profile corporate clients, and delivering strategic counsel before Kenyan courts and arbitral tribunals. Previously Senior Associate at Walker Kontos Advocates (2022–2025) and recipient of the prestigious Employee of the Year 2017 Award, Paul specializes in civil and commercial litigation, corporate debt recoveries exceeding Ksh 2.05 Billion, land title defense, and high-stakes trademark opposition. Known for his sharp analytical acumen, persuasive courtroom advocacy, and client-focused approach, he provides tailored solutions that consistently secure favorable outcomes for institutions and private clients alike.',
    image: '/wafula-paul.jpg',
    education: [
      'Advocate of the High Court of Kenya',
      'Kenya School of Law - Post Graduate Diploma in Law (ATP)',
      'Bachelor of Laws (LL.B. Honours)',
    ],
    barAdmissions: [
      'Law Society of Kenya (LSK)',
      'East Africa Law Society (EALS)',
      'High Court of Kenya',
    ],
    languages: ['English', 'Swahili'],
    memberships: [
      'Law Society of Kenya (LSK)',
      'East Africa Law Society (EALS)',
      'Chartered Institute of Arbitrators (CIArb - Kenya Branch)',
    ],
    notableMatters: [
      'Acted for the Receivers and Managers of KSC International Ltd in relation to a land dispute; successfully defended the claim seeking cancellation of KSC’s land title, worth Ksh 900 Million.',
      'Representing several commercial banks, including Barclays Bank, Kenya Commercial Bank (KCB), Giro Bank, Paramount Universal Bank, Oriental Commercial Bank, and CFC Stanbic Bank, recovering in excess of Kshs 2,050,000,000.',
      'Acted for NCBA Bank in relation to debt recovery against General Printers Ltd and its directors; successfully argued for dismissal of the injunction application sought by the directors.',
      'Acted for Eco Bank Kenya Ltd in a high-stakes commercial case brought by Auto Fine Limited, seeking damages in excess of Ksh 1 Billion.',
      'Acted for HFCK Bank Ltd in the recovery of a debt in excess of Ksh 200 Million from Hadar Limited in arbitration, through realization of the residential property known as Sifa Apartments.',
      'Acted for Bank of Africa Kenya Limited in recovery of debt in excess of Ksh 180 Million from Turbo Highways Limited, successfully resisting various court injunctions.',
      'Acted for LA Group (Pty) Ltd, a South African company, in a trademark dispute against Wardrobe Collections Ltd; successfully opposed registration of an infringing mark on the global trademark “POLO”.',
      'Acted for the Kenya Civil Aviation Authority (KCAA) in an employment dispute whose value was in excess of Ksh 360 Million.',
      'Acted for Stanbic Bank in the recovery of a debt in excess of Ksh 1 Billion from Bake n Bite Ltd.',
    ],
    email: 'info@wafulapwadvocates.com',
    phone: '+254 716 954 112 | +254 780 323 657',
    linkedIn: 'https://linkedin.com',
  };

  const advocate = lead || fallbackAttorney;
  const [isNotableMattersOpen, setIsNotableMattersOpen] = useState(false);

  return (
    <section id="team" data-nav-theme="white" className="py-16 sm:py-24 w-full bg-white border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] mb-3">
            <GoldStar className="w-3 h-3 text-[#183f6e]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#183f6e]">
              Legal Leadership &amp; Advocates
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0a111a] mb-4">
            Meet Our Managing Partner
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
            At Wafula PW &amp; Company Advocates, our practice is steered by seasoned courtroom leadership, unwavering integrity, and a proven history of multi-million asset protections and debt recoveries across Kenya.
          </p>
        </div>

        {/* Executive Profile Card */}
        <div className="rounded-3xl border border-[#e2e8f0] bg-white shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Portrait Column */}
            <div className="lg:col-span-5 relative bg-[#0f2847] min-h-[460px] sm:min-h-[540px] overflow-hidden flex flex-col justify-end p-6 sm:p-8">
              <img
                src={advocate.image || wafulaPaulImg}
                alt="Wafula W. Paul - Managing Partner"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = wafulaPaulImg;
                }}
                className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/30 to-transparent pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <div className="p-4 rounded-2xl bg-[#0f2847]/90 backdrop-blur-md border border-white/10 text-white shadow-2xl">
                  <div className="text-xs uppercase tracking-wider text-[#ddf0ec] font-semibold mb-0.5">
                    Experience &amp; Standing
                  </div>
                  <div className="text-sm font-bold text-white">
                    10+ Years Bar Practice · Walker Kontos Alum
                  </div>
                  <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-[#ddf0ec]" />
                    <span>Employee of the Year 2017 Award Recipient</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview & Credentials Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-[#fcfdfe]">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#e2e8f0] mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#183f6e] block mb-1">
                      {advocate.role}
                    </span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0a111a] tracking-tight">
                      {advocate.name}
                    </h1>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-full bg-[#183f6e]/10 border border-[#183f6e]/20 text-[#183f6e] text-xs font-bold">
                    {advocate.experience}
                  </div>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  Specialization: <span className="text-[#183f6e] font-bold">{advocate.specialty}</span>
                </p>

                <div className="prose text-sm text-slate-700 leading-relaxed space-y-3.5 mb-8">
                  <p>
                    <strong className="text-[#183f6e]">Wafula W. Paul</strong> is an experienced Litigation Advocate with a distinguished track record in managing complex legal disputes, representing high-profile corporate clients, and delivering strategic counsel before Kenyan courts and arbitral tribunals.
                  </p>
                  <p>
                    Previously Senior Associate at <strong>Walker Kontos Advocates (2022–2025)</strong> and recipient of the prestigious <strong>Employee of the Year 2017 Award</strong>, Paul specializes in civil and commercial litigation, corporate debt recoveries exceeding Ksh 2.05 Billion, land title defense, and high-stakes trademark opposition.
                  </p>
                  <p>
                    Known for his sharp analytical acumen, persuasive courtroom advocacy, and client-focused approach, he provides tailored solutions that consistently secure favorable outcomes for leading commercial institutions, receivers, and private enterprises.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-[#183f6e] text-white border border-[#183f6e]/40 mb-8">
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                      Ksh 2.05B+
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                      Banking Recoveries
                    </div>
                  </div>

                  <div>
                    <div className="text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                      Ksh 900M
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                      Land Title Saved
                    </div>
                  </div>

                  <div>
                    <div className="text-xl sm:text-2xl font-black text-white tracking-tight tabular-nums">
                      10+ Yrs
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                      Trial Experience
                    </div>
                  </div>

                  <div>
                    <div className="text-xl sm:text-2xl font-black text-[#ddf0ec] tracking-tight tabular-nums">
                      100%
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium mt-0.5">
                      Client Dedication
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#e2e8f0]">
                <button
                  onClick={() => onOpenConsultation?.('dispute-resolution')}
                  className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center gap-2 cursor-pointer shadow-sm bg-[#183f6e] text-white hover:bg-[#123157] transition-all"
                >
                  <Calendar className="w-4 h-4 text-[#ddf0ec]" />
                  <span>Book Direct Consultation with Paul</span>
                  <ArrowRight className="w-4 h-4 text-[#ddf0ec]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notable Matters Landmark Showcase Box */}
        <div className={`rounded-3xl bg-[#183f6e] text-white border border-white/20 shadow-2xl mb-12 transition-all duration-300 ${isNotableMattersOpen ? 'p-6 sm:p-10 md:p-12' : 'p-6 sm:p-8'}`}>
          <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 ${isNotableMattersOpen ? 'mb-8 pb-6 border-b border-white/10' : ''}`}>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ddf0ec] mb-2">
                <GoldStar className="w-3 h-3 text-[#ddf0ec]" />
                <span>Representative Casework &amp; Track Record</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-[#ddf0ec] ml-1">
                  {advocate.notableMatters.length} Landmark Matters
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Landmark Court Triumphs &amp; Recoveries
              </h3>
              {!isNotableMattersOpen && (
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
                  Banking recoveries exceeding Ksh 2.05B+, Ksh 900M land title protection, and landmark commercial litigation victories before Kenyan courts.
                </p>
              )}
            </div>

            {/* Drop Down / Minimize Toggle Button */}
            <div className="shrink-0 flex items-center">
              <button
                type="button"
                onClick={() => setIsNotableMattersOpen((prev) => !prev)}
                aria-expanded={isNotableMattersOpen}
                aria-controls="landmark-matters-content"
                aria-label={isNotableMattersOpen ? 'Minimize content' : 'View content'}
                title={isNotableMattersOpen ? 'Minimize content' : 'View content'}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/25 text-[#ddf0ec] hover:text-white border border-white/25 shadow-sm transition-all cursor-pointer group"
              >
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${
                    isNotableMattersOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Collapsible Content */}
          {isNotableMattersOpen && (
            <div id="landmark-matters-content" className="animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advocate.notableMatters.map((matter, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#ddf0ec]/40 transition-colors flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#ddf0ec]/20 text-[#ddf0ec] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold font-mono">
                      {index + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {matter}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Minimize Button for convenient toggling after reading */}
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsNotableMattersOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#ddf0ec] hover:text-white text-xs sm:text-sm font-semibold border border-white/25 transition-all cursor-pointer"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>Minimize Content</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
