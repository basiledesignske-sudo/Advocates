import React from 'react';
import { CaseStudy } from '../../types';
import { X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenConsultation,
}) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#183f6e] text-white rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-2">
            <span>{caseStudy.matterType}</span>
            <span aria-hidden="true">·</span>
            <span>{caseStudy.practiceArea}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            {caseStudy.title}
          </h2>
          <div className="text-xs text-slate-400">
            <strong className="text-white">Client Sector:</strong> {caseStudy.clientSector}
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-white/10 text-sm">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-2">
              The Legal Challenge
            </h3>
            <p className="text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
              {caseStudy.challenge}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-2">
              Our Strategic Approach
            </h3>
            <p className="text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
              {caseStudy.strategy}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ddf0ec]" />
              Outcome &amp; Resolution
            </h3>
            <p className="text-white font-medium leading-relaxed bg-black/20 p-4 rounded-xl border border-white/15">
              {caseStudy.outcome}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#ddf0ec] shrink-0 mt-0.5" />
            <span>{caseStudy.confidentialityNote}</span>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="gold-bg-btn px-6 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Consult on Similar Matter</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ddf0ec]" />
            </button>
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
