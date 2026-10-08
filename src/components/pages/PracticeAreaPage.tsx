import React from 'react';
import { PracticeArea, Attorney, CaseStudy, LegalArticle } from '../../types';
import { practiceAreasData, attorneysData, caseStudiesData, legalArticlesData } from '../../data/mockData';
import { ArrowLeft, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { GoldStar } from '../ui/JusticeLogo';

interface PracticeAreaPageProps {
  practice: PracticeArea;
  onSelectPractice: (practice: PracticeArea) => void;
  onNavigateHome: (sectionId?: string) => void;
  onOpenConsultation: (practiceId?: string) => void;
  onSelectAttorney: (attorney: Attorney) => void;
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
  onSelectArticle: (article: LegalArticle) => void;
}

export const PracticeAreaPage: React.FC<PracticeAreaPageProps> = ({
  practice,
  onSelectPractice,
  onNavigateHome,
  onOpenConsultation,
  onSelectAttorney,
  onSelectCaseStudy,
  onSelectArticle,
}) => {
  const leadAttorney = attorneysData.find((a) => a.id === practice.leadAttorneyId) || attorneysData[0];
  const relatedCases = caseStudiesData.filter((c) =>
    c.practiceArea.toLowerCase().includes(practice.shortName.toLowerCase()) ||
    practice.id.includes('dispute') ||
    practice.id.includes('corporate')
  );
  const relatedArticles = legalArticlesData.filter((a) =>
    a.category.toLowerCase().includes(practice.shortName.toLowerCase())
  );

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Top Banner */}
      <div className="relative bg-[#0e2747] text-white py-16 sm:py-24 overflow-hidden mb-12">
        <div className="absolute inset-0 z-0">
          <img
            src={practice.image}
            alt={practice.name}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/hero_law_firm_1790847178281.jpg';
            }}
            className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e2747] via-[#0e2747]/90 to-[#0e2747]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigateHome('practice-areas')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Practice Areas</span>
          </button>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#ddf0ec] text-xs font-semibold mb-4">
              <GoldStar className="w-3 h-3 text-[#ddf0ec]" />
              <span>Core Chambers Practice</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              {practice.name}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
              {practice.tagline}
            </p>

            <button
              onClick={() => onOpenConsultation(practice.id)}
              className="px-7 py-3.5 rounded-full bg-[#ddf0ec] text-[#183f6e] hover:bg-white text-xs sm:text-sm font-bold transition-all shadow-lg cursor-pointer flex items-center gap-2"
            >
              <span>Retain Counsel in {practice.shortName}</span>
              <ArrowRight className="w-4 h-4 text-[#183f6e]" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Body */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Section */}
            <div>
              <h2 className="text-2xl font-bold text-[#0a111a] mb-4">Practice Overview</h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {practice.description}
              </p>
            </div>

            {/* Key Services Offered */}
            <div>
              <h2 className="text-xl font-bold text-[#0a111a] mb-6">Key Legal Services &amp; Capabilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {practice.keyServices.map((service, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#183f6e] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Roadmap */}
            {practice.roadmap && practice.roadmap.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#0a111a] mb-6">Engagement &amp; Execution Methodology</h2>
                <div className="space-y-4">
                  {practice.roadmap.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[#183f6e] text-[#ddf0ec] font-mono text-sm font-bold flex items-center justify-center shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Frequently Asked Questions */}
            {practice.faqs && practice.faqs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-[#0a111a] mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#183f6e]" />
                  <span>Practice Inquiries &amp; Answers</span>
                </h2>
                <div className="space-y-4">
                  {practice.faqs.map((faq, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <h4 className="text-sm font-bold text-slate-900 mb-2">{faq.question}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Lead Advocate Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Lead Advocate for this Practice
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-300 shrink-0">
                  <img
                    src={leadAttorney.image || '/wafula-paul.jpg'}
                    alt={leadAttorney.name}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/wafula-paul.jpg';
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{leadAttorney.name}</h4>
                  <p className="text-xs text-slate-500">{leadAttorney.role}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {leadAttorney.specialty}
              </p>
              <button
                onClick={() => onSelectAttorney(leadAttorney)}
                className="w-full py-2.5 rounded-full bg-white hover:bg-slate-100 text-[#183f6e] border border-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                View Full Advocate Profile
              </button>
            </div>

            {/* Quick Practice Switcher */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                All Chambers Disciplines
              </h3>
              <div className="space-y-1.5">
                {practiceAreasData.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPractice(p)}
                    className={`w-full text-left text-xs font-semibold py-2 px-3 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                      p.id === practice.id
                        ? 'bg-[#183f6e] text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{p.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            {/* Client Focus */}
            <div className="p-6 rounded-3xl bg-[#183f6e] text-white">
              <ShieldCheck className="w-6 h-6 text-[#ddf0ec] mb-3" />
              <h4 className="text-sm font-bold mb-1">Target Client Representation</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {practice.clientFocus}
              </p>
              <button
                onClick={() => onOpenConsultation(practice.id)}
                className="w-full py-2.5 rounded-full bg-[#ddf0ec] text-[#183f6e] text-xs font-bold cursor-pointer"
              >
                Schedule Case Evaluation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
