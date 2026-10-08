import React from 'react';
import { CaseStudy } from '../../types';
import { X, Award, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CaseStudyModalProps {
  caseStudy: CaseStudy;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onOpenConsultation,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#183f6e] text-white rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#ddf0ec] text-xs font-semibold mb-3">
          <Award className="w-3.5 h-3.5 text-[#ddf0ec]" />
          <span>{caseStudy.matterType}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          {caseStudy.title}
        </h2>

        <div className="text-xs text-slate-300 font-mono mb-6">
          Sector: {caseStudy.clientSector} · Discipline: {caseStudy.practiceArea}
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-1">
              Legal Challenge &amp; Risk
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {caseStudy.challenge}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-1">
              Litigation Strategy &amp; Procedure
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {caseStudy.strategy}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#ddf0ec]/15 border border-[#ddf0ec]/30 text-white">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#ddf0ec]" />
              Court Outcome &amp; Value Saved
            </h4>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
              {caseStudy.outcome}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-black/20 text-[11px] text-slate-400 mb-6">
          <strong>Notice:</strong> {caseStudy.confidentialityNote}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#ddf0ec] text-[#183f6e] hover:bg-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Retain Counsel for Similar Matter</span>
            <ArrowRight className="w-4 h-4 text-[#183f6e]" />
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
