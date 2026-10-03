import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GoldStar } from '../ui/JusticeLogo';

interface FinalCtaSectionProps {
  onOpenConsultation: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section data-nav-theme="white" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center border-t border-[#e2e8f0] relative overflow-hidden bg-[#f8fafc] my-8 rounded-3xl shadow-sm">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#e2e8f0] mb-3">
          <GoldStar className="w-3 h-3 text-[#183f6e]" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#183f6e]">
            Start Your Case Review
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#0a111a] mb-3 leading-snug">
          Ready to Protect Your Interests with Decisive Advocacy?
        </h2>

        <p className="text-sm sm:text-base text-slate-600 mb-5 max-w-2xl mx-auto leading-relaxed">
          Contact our Nairobi chambers today for a confidential, tailor-made legal evaluation of your commercial, litigation, or transactional matters.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="gold-bg-btn px-7 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>Schedule a Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#ddf0ec]" />
          </button>
        </div>
      </div>
    </section>
  );
};
