import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onExplorePractices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onExplorePractices,
}) => {
  return (
    <section id="hero" data-nav-theme="blue" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#0f2847]">
      {/* Background Photography with measured contrast scrim */}
      <div className="absolute inset-0 z-0 bg-[#0f2847]">
        <img
          src="/images/hero_law_firm_1790847178281.jpg"
          alt="Wafula PW & Co. Advocates Chambers"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.12] transform scale-[1.01]"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient overlays ensuring WCAG AA contrast (≥ 4.5:1) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a111a]/85 via-[#0a111a]/45 to-[#0a111a]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0a111a]/35 to-[#0a111a]/90" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] sm:leading-[1.1] mb-6 text-balance">
            Strategic Counsel. <br className="hidden sm:inline" />
            <span className="brand-gradient-text">Decisive Advocacy.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-200/90 font-normal leading-relaxed mb-8 max-w-2xl text-balance">
            Wafula PW &amp; Company Advocates is a full-service Kenyan law firm delivering tailor-made, practical, client-focused, and results-oriented legal solutions across corporate, commercial litigation, banking, and conveyancing.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={onOpenConsultation}
              className="btn-mint px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-xl flex items-center justify-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ddf0ec]"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4 text-[#183f6e] group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onExplorePractices}
              className="px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all backdrop-blur-sm cursor-pointer flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore Practice Areas</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 pt-6 border-t border-white/15">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ddf0ec]" />
              <span>MCMX Building, First Floor, Kiambu Road</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
