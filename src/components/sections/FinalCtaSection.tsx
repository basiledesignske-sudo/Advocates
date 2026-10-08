import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Mail } from 'lucide-react';

interface FinalCtaSectionProps {
  onOpenConsultation: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#0e2747] text-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/public/images/attorney_group_footer_1790847201907.jpg"
          alt="Wafula PW Chambers"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/lady-justice-statue-front-courthouse.jpg';
          }}
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e2747]/95 via-[#0e2747]/85 to-[#0e2747]/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#ddf0ec] text-xs font-semibold mb-6">
          <ShieldCheck className="w-4 h-4 text-[#ddf0ec]" />
          <span>Strict Attorney-Client Privilege Guaranteed</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
          Ready to Protect Your Commercial Interests or Defend Your Rights?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed">
          Contact our Nairobi chambers today for an expedited confidential assessment of your litigation matter, property conveyance, or corporate contract.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#ddf0ec] text-[#183f6e] hover:bg-white text-base font-bold transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Book Legal Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#183f6e]" />
          </button>

          <a
            href="tel:+254716954112"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 text-base font-semibold transition-all flex items-center justify-center gap-2.5"
          >
            <Phone className="w-4 h-4 text-[#ddf0ec]" />
            <span>+254 716 954 112</span>
          </a>
        </div>

        <div className="mt-8 text-xs text-slate-400 flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-[#ddf0ec]" />
          <span>info@wafulapwadvocates.com · Milimani Commercial Registry, Nairobi</span>
        </div>
      </div>
    </section>
  );
};
