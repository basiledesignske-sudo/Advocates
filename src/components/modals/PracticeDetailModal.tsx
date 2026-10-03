import React from 'react';
import { PracticeArea, Attorney } from '../../types';
import { attorneysData } from '../../data/mockData';
import { X, CheckCircle2, ArrowRight, Shield, HelpCircle } from 'lucide-react';

interface PracticeDetailModalProps {
  practice: PracticeArea | null;
  onClose: () => void;
  onBookConsultation: (practiceId: string) => void;
  onSelectAttorney: (attorney: Attorney) => void;
}

export const PracticeDetailModal: React.FC<PracticeDetailModalProps> = ({
  practice,
  onClose,
  onBookConsultation,
  onSelectAttorney,
}) => {
  if (!practice) return null;

  const leadAttorney = attorneysData.find((a) => a.id === practice.leadAttorneyId) || attorneysData[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#183f6e] text-white rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner for Practice */}
        <div className="relative rounded-2xl overflow-hidden min-h-[220px] sm:min-h-[260px] flex flex-col justify-end p-6 sm:p-8 mb-6 border border-white/20 bg-[#183f6e]">
          <img
            src={practice.image}
            alt={practice.name}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/hero_law_firm_1790847178281.jpg';
            }}
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/50 to-transparent" />

          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ddf0ec] mb-1 block">
              Comprehensive Practice Area
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {practice.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {practice.tagline}
            </p>
          </div>
        </div>

        {/* Action Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10 mb-8">
          <div className="text-xs sm:text-sm text-slate-300">
            <strong className="text-white">Client Focus:</strong> {practice.clientFocus}
          </div>
          <button
            onClick={() => onBookConsultation(practice.id)}
            className="gold-bg-btn px-6 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Consult on {practice.shortName}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ddf0ec]" />
          </button>
        </div>

        {/* Services & Lead Attorney */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Key Services */}
          <div className="md:col-span-7">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#ddf0ec]" />
              Key Legal Capabilities
            </h3>
            <ul className="space-y-2.5">
              {practice.keyServices.map((service) => (
                <li key={service} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#ddf0ec] shrink-0 mt-0.5" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lead Partner Card */}
          <div className="md:col-span-5 rounded-2xl bg-white/5 p-5 border border-white/10 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#ddf0ec] uppercase tracking-wider block mb-3">
                Lead Practice Partner
              </span>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={leadAttorney.image}
                  alt={leadAttorney.name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/wafula-paul.jpg';
                  }}
                  className="w-14 h-14 rounded-xl object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{leadAttorney.name}</h4>
                  <p className="text-xs text-slate-400">{leadAttorney.role}</p>
                  <p className="text-[11px] text-[#ddf0ec] font-semibold">{leadAttorney.experience}</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                {leadAttorney.bio}
              </p>
            </div>

            <button
              onClick={() => onSelectAttorney(leadAttorney)}
              className="text-xs font-semibold text-[#ddf0ec] hover:text-white flex items-center gap-1.5 transition-colors self-start cursor-pointer"
            >
              <span>View Full Credentials &rarr;</span>
            </button>
          </div>
        </div>

        {/* Strategic Roadmap */}
        {practice.roadmap && practice.roadmap.length > 0 && (
          <div className="mb-8 pt-6 border-t border-white/10">
            <h3 className="text-base font-bold text-white mb-4">
              Strategic Representation Process
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {practice.roadmap.map((step) => (
                <div key={step.step} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-mono font-bold text-[#ddf0ec] mb-1">
                    Phase {step.step}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Practice FAQs */}
        {practice.faqs && practice.faqs.length > 0 && (
          <div className="pt-6 border-t border-white/10">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#ddf0ec]" />
              Practice Questions
            </h3>
            <div className="space-y-3">
              {practice.faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
