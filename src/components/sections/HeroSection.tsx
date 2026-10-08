import React from 'react';
import { ArrowRight, ShieldCheck, Award, Phone } from 'lucide-react';
import { GoldStar } from '../ui/JusticeLogo';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onExplorePractices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onExplorePractices,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 sm:pb-24 overflow-hidden bg-[#0e2747]"
    >
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/images/lady-justice-statue-front-courthouse.jpg"
          alt="Courthouse and Statue of Justice"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/lady-justice-statue-front-courthouse.jpg';
          }}
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e2747] via-[#0e2747]/80 to-[#0e2747]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col items-center sm:items-start justify-center">
        {/* Chambers Accreditations Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ddf0ec] text-xs font-semibold mb-6">
          <GoldStar className="w-3.5 h-3.5 text-[#ddf0ec]" />
          <span>High Court of Kenya Advocates · Commissioner for Oaths</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 max-w-4xl">
          Decisive Legal Counsel.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ddf0ec] to-[#99d1c7]">
            Relentless Courtroom Advocacy.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-200 max-w-2xl mb-8 leading-relaxed">
          Led by <strong>Wafula W. Paul</strong>, Walker Kontos alum with over a decade of trial experience, our chambers safeguard multi-million commercial interests, land titles, and complex corporate transactions.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#ddf0ec] text-[#183f6e] hover:bg-white text-sm sm:text-base font-bold shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
          >
            <span>Schedule Confidential Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#183f6e]" />
          </button>

          <button
            onClick={onExplorePractices}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 text-sm sm:text-base font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
          >
            <span>Core Practice Disciplines</span>
          </button>
        </div>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/15 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ddf0ec] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tracking-tight">Ksh 2.05B+</div>
              <div className="text-xs text-slate-300">Recovered for Banks</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ddf0ec] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tracking-tight">10+ Years</div>
              <div className="text-xs text-slate-300">High Court Standing</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ddf0ec] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tracking-tight">Ksh 900M</div>
              <div className="text-xs text-slate-300">Land Title Protected</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#ddf0ec] shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-white tracking-tight">24/7 Duty</div>
              <div className="text-xs text-slate-300">Urgent Injunctions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
