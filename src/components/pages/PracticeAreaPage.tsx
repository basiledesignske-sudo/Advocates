import React, { useEffect, useState } from 'react';
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Building2,
  Gavel,
  Home,
  Briefcase,
  ShieldAlert,
  Scale,
  Share2,
  Check,
} from 'lucide-react';
import { PracticeArea, Attorney, CaseStudy, LegalArticle, PracticeAreaId } from '../../types';
import { practiceAreasData, attorneysData } from '../../data/mockData';
import { GoldStar } from '../ui/JusticeLogo';

interface PracticeAreaPageProps {
  practice: PracticeArea;
  onSelectPractice: (practice: PracticeArea) => void;
  onNavigateHome: (sectionId?: string) => void;
  onOpenConsultation: (practiceId?: string) => void;
  onSelectAttorney: (attorney: Attorney) => void;
  onSelectCaseStudy?: (caseStudy: CaseStudy) => void;
  onSelectArticle?: (article: LegalArticle) => void;
}

export const PracticeAreaPage: React.FC<PracticeAreaPageProps> = ({
  practice,
  onSelectPractice,
  onNavigateHome,
  onOpenConsultation,
  onSelectAttorney,
}) => {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Lead attorney for this practice area
  const leadAttorney =
    attorneysData.find((a) => a.id === practice.leadAttorneyId) || attorneysData[0];

  // Sync scroll and page title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${practice.name} | Wafula PW & Co. Advocates`;
    return () => {
      document.title = 'Wafula PW & Co. Advocates | Kenyan Law Firm';
    };
  }, [practice]);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getDisciplineIcon = (id: PracticeAreaId) => {
    switch (id) {
      case 'corporate-commercial':
        return <Building2 className="w-4 h-4" />;
      case 'dispute-resolution':
        return <Gavel className="w-4 h-4" />;
      case 'real-estate-conveyancing':
        return <Home className="w-4 h-4" />;
      case 'employment-labour':
        return <Briefcase className="w-4 h-4" />;
      case 'intellectual-property':
        return <ShieldAlert className="w-4 h-4" />;
      case 'cross-border-international':
      default:
        return <Scale className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-[#183f6e] pt-24 sm:pt-28 pb-20">
      {/* Top Breadcrumb & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pb-3 border-b border-slate-200">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onNavigateHome('hero')}
              className="hover:text-[#183f6e] transition-colors cursor-pointer font-medium"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={() => onNavigateHome('practice-areas')}
              className="hover:text-[#183f6e] transition-colors cursor-pointer font-medium"
            >
              Practice Disciplines
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#183f6e] font-semibold truncate max-w-[240px] sm:max-w-md">
              {practice.shortName}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              title="Share practice page URL"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-medium text-xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={() => onNavigateHome('practice-areas')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#183f6e] font-semibold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Disciplines</span>
            </button>
          </div>
        </div>
      </div>

      {/* Core Practice Disciplines Quick Navigation Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-2 px-2">
            <div className="flex items-center gap-2">
              <GoldStar className="w-3 h-3 text-[#183f6e]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#183f6e]">
                Core Practice Disciplines
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Select any discipline tab to view its dedicated page
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {practiceAreasData.map((item) => {
              const isActive = item.id === practice.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectPractice(item)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#183f6e] text-white shadow-sm ring-1 ring-[#183f6e]'
                      : 'bg-slate-50 hover:bg-[#ddf0ec]/40 text-slate-700 border border-slate-200/80 hover:text-[#183f6e]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={isActive ? 'text-[#ddf0ec]' : 'text-slate-500'}>
                    {getDisciplineIcon(item.id)}
                  </span>
                  <span>{item.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hero Header Section for Practice Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="relative rounded-3xl overflow-hidden bg-[#183f6e] text-white p-6 sm:p-10 lg:p-14 shadow-xl border border-white/20">
          <img
            src={practice.image}
            alt={practice.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.38] contrast-110 pointer-events-none"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/hero_law_firm_1790847178281.jpg';
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a111a] via-[#0a111a]/85 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
              <GoldStar className="w-3.5 h-3.5 text-[#ddf0ec]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#ddf0ec]">
                Chambers Specialized Practice Group
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
              {practice.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 font-medium">
              {practice.tagline}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {practice.description}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenConsultation(practice.id)}
                className="px-6 py-3 rounded-full bg-[#ddf0ec] text-[#183f6e] hover:bg-white text-xs sm:text-sm font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Consult on {practice.shortName}</span>
                <ArrowRight className="w-4 h-4 text-[#183f6e]" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('services-grid');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all cursor-pointer"
              >
                View Capabilities &amp; Roadmap
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Focus & Key Stats Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183f6e] mb-2">
                <Shield className="w-4 h-4 text-[#183f6e]" />
                <span>Client Focus &amp; Representative Mandates</span>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {practice.clientFocus}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-0.5 font-medium">Core Capabilities</span>
                <span className="text-lg font-bold text-[#183f6e]">{practice.keyServices.length} Disciplines</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block mb-0.5 font-medium">Lead Practice Partner</span>
                <span className="text-sm font-bold text-[#183f6e] truncate block">{leadAttorney.name}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-500 block mb-0.5 font-medium">Jurisdiction</span>
                <span className="text-sm font-bold text-[#183f6e]">Kenya &amp; East Africa</span>
              </div>
            </div>
          </div>

          {/* Lead Partner Quick Card */}
          <div className="md:col-span-4 bg-[#183f6e] text-white rounded-3xl p-6 sm:p-7 border border-white/20 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#ddf0ec] uppercase tracking-wider block mb-3">
                Lead Advocate in Charge
              </span>

              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={leadAttorney.image}
                  alt={leadAttorney.name}
                  loading="lazy"
                  decoding="async"
                  className="w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-sm"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/Wafula Paul.jpg';
                  }}
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-base font-bold text-white">{leadAttorney.name}</h3>
                  <p className="text-xs text-slate-300">{leadAttorney.role}</p>
                  <span className="text-[11px] text-[#ddf0ec] font-semibold">{leadAttorney.experience}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                {leadAttorney.bio}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => onSelectAttorney(leadAttorney)}
                className="text-xs font-semibold text-[#ddf0ec] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Full Credentials &rarr;</span>
              </button>

              <button
                onClick={() => onOpenConsultation(practice.id)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white border border-white/20 transition-colors cursor-pointer"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Legal Capabilities & Core Services */}
      <section id="services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 mb-2">
            <GoldStar className="w-3 h-3 text-[#183f6e]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#183f6e]">
              Statutory Capabilities &amp; Services
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0a111a]">
            Specialized Legal Mandates Handled
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Our chambers provides rigorous, bespoke counsel tailored to the complex statutory requirements of the Kenyan regulatory landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {practice.keyServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#183f6e]/40 transition-all flex items-start gap-4"
            >
              <div className="w-9 h-9 rounded-xl bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center shrink-0 font-bold text-xs">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#183f6e] shrink-0" />
                  <h3 className="text-sm sm:text-base font-bold text-[#0a111a]">
                    Capability {index + 1}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Strategic Representation Roadmap */}
      {practice.roadmap && practice.roadmap.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-[#183f6e] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-white/20">
            <div className="mb-8">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#ddf0ec] block mb-2">
                Procedural Roadmap
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Strategic Process &amp; Client Representation Phases
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                How our advocates advance your matter from preliminary audit to final realization.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {practice.roadmap.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center text-xs font-bold mb-3 font-mono">
                      {step.step}
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#ddf0ec] font-semibold">
                    Phase {step.step} Execution
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Practice FAQs Accordion */}
      {practice.faqs && practice.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#183f6e] px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              Practice Specific Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a111a] mt-2">
              Frequently Asked Legal Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear statutory answers provided by our {practice.shortName} advocates.
            </p>
          </div>

          <div className="space-y-3">
            {practice.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0a111a] hover:text-[#183f6e] cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 text-[#183f6e] flex items-center justify-center text-sm shrink-0 transition-transform">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Sequential Practice Discipline Navigation Footer */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200">
        {(() => {
          const currentIndex = practiceAreasData.findIndex((p) => p.id === practice.id);
          const prevPractice = currentIndex > 0 ? practiceAreasData[currentIndex - 1] : practiceAreasData[practiceAreasData.length - 1];
          const nextPractice = currentIndex < practiceAreasData.length - 1 ? practiceAreasData[currentIndex + 1] : practiceAreasData[0];

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => onSelectPractice(prevPractice)}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#183f6e]/50 hover:shadow-md transition-all text-left flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center shrink-0 transition-colors">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Previous Discipline
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0a111a] group-hover:text-[#183f6e] transition-colors truncate block">
                    {prevPractice.shortName}
                  </span>
                </div>
              </button>

              <button
                onClick={() => onSelectPractice(nextPractice)}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#183f6e]/50 hover:shadow-md transition-all text-right flex items-center justify-end gap-3 group cursor-pointer"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Next Discipline
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#0a111a] group-hover:text-[#183f6e] transition-colors truncate block">
                    {nextPractice.shortName}
                  </span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center shrink-0 transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          );
        })()}
      </section>
    </div>
  );
};
