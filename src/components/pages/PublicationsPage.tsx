import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  User,
  ShieldCheck,
  Sparkles,
  Scale,
  FileText,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { LegalArticle, CaseStudy } from '../../types';
import { legalArticlesData, caseStudiesData, faqItemsData } from '../../data/mockData';
import { GoldStar } from '../ui/JusticeLogo';

interface PublicationsPageProps {
  onSelectArticle: (article: LegalArticle) => void;
  onNavigateHome: (sectionId?: string) => void;
  onOpenConsultation: () => void;
  initialViewAll?: boolean;
}

type TabType =
  | 'all'
  | 'corporate'
  | 'employment'
  | 'real-estate'
  | 'intellectual-property'
  | 'dispute-resolution'
  | 'case-precedents';

export const PublicationsPage: React.FC<PublicationsPageProps> = ({
  onSelectArticle,
  onNavigateHome,
  onOpenConsultation,
  initialViewAll = false,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllTabs, setShowAllTabs] = useState(initialViewAll);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Publications & Legal Knowledge | Wafula PW & Co. Advocates';
    return () => {
      document.title = 'Wafula PW & Co. Advocates | Kenyan Law Firm';
    };
  }, []);

  const allTabs = [
    { id: 'all' as TabType, label: 'All Publications' },
    { id: 'corporate' as TabType, label: 'Corporate & Commercial' },
    { id: 'employment' as TabType, label: 'Employment & Labour' },
    { id: 'real-estate' as TabType, label: 'Real Estate & Banking' },
    { id: 'intellectual-property' as TabType, label: 'Intellectual Property' },
    { id: 'dispute-resolution' as TabType, label: 'Dispute Resolution' },
    { id: 'case-precedents' as TabType, label: 'Landmark Precedents' },
  ];

  // Visible tabs: reduced to three by default, expandable via "View All Publications" button
  const visibleTabs = showAllTabs ? allTabs : allTabs.slice(0, 3);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    let list = legalArticlesData;

    if (activeTab === 'corporate') {
      list = list.filter((a) => a.category.toLowerCase().includes('corporate'));
    } else if (activeTab === 'employment') {
      list = list.filter((a) => a.category.toLowerCase().includes('employment'));
    } else if (activeTab === 'real-estate') {
      list = list.filter((a) => a.category.toLowerCase().includes('real estate') || a.category.toLowerCase().includes('banking'));
    } else if (activeTab === 'intellectual-property') {
      list = list.filter((a) => a.category.toLowerCase().includes('intellectual property'));
    } else if (activeTab === 'dispute-resolution') {
      list = list.filter((a) => a.category.toLowerCase().includes('dispute'));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    return list;
  }, [activeTab, searchQuery]);

  // When visible tabs are reduced to three (showAllTabs is false) and activeTab is 'all' without search,
  // preview the top 3 publications until "View All Publications" is clicked.
  const displayedArticles = useMemo(() => {
    if (!showAllTabs && activeTab === 'all' && !searchQuery.trim()) {
      return filteredArticles.slice(0, 3);
    }
    return filteredArticles;
  }, [filteredArticles, showAllTabs, activeTab, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#183f6e] pb-20">
      {/* Hero Header (Edge to Edge) */}
      <section data-nav-theme="blue" className="w-full bg-[#183f6e] text-white pt-24 sm:pt-28 pb-14 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden mb-12 border-b border-white/10">
        <div className="w-full max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-300 mb-6">
            <button
              onClick={() => onNavigateHome('hero')}
              className="hover:text-[#ddf0ec] transition-colors cursor-pointer font-medium"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#ddf0ec] font-semibold">
              Publications &amp; Legal Knowledge
            </span>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <GoldStar className="w-3.5 h-3.5 text-[#ddf0ec]" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#ddf0ec]">
                Publications &amp; Legal Knowledge Hub
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Authoritative Kenyan Legal Insights, Advisory &amp; Precedents
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              Rigorous jurisprudence analysis, regulatory guidelines, and tactical commentary authored by advocate Wafula Paul and our specialist legal teams in Nairobi.
            </p>

            {/* In-page Search Box */}
            <div className="relative max-w-xl">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search publications by statutory topic, court, or keywords..."
                className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium shadow-md focus:outline-none focus:ring-2 focus:ring-[#ddf0ec]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#ddf0ec]/10 rounded-full blur-[90px] pointer-events-none" />
      </section>

      {/* Tabs Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none border-b border-slate-200/80">
          {visibleTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#183f6e] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}

          {!showAllTabs ? (
            <button
              onClick={() => {
                setShowAllTabs(true);
                setActiveTab('all');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold text-[#183f6e] bg-[#eef4f9] hover:bg-[#ddf0ec] border border-[#183f6e]/20 transition-all cursor-pointer shadow-xs whitespace-nowrap ml-1 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#183f6e]" />
              <span>View All Publications</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#183f6e] text-white text-[10px] font-bold">
                +{allTabs.length - 3} More
              </span>
            </button>
          ) : (
            <button
              onClick={() => {
                setShowAllTabs(false);
                if (activeTab !== 'all' && activeTab !== 'corporate' && activeTab !== 'employment') {
                  setActiveTab('all');
                }
              }}
              className="inline-flex items-center gap-1 px-3.5 py-2.5 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap ml-1 shrink-0"
            >
              <span>Show 3 Tabs</span>
            </button>
          )}
        </div>
      </section>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'case-precedents' ? (
          /* Landmark Case Precedents View */
          <div>
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a111a] mb-2">
                Landmark Case Precedents &amp; Judicial Successes
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                A selection of high-value commercial litigations, land recoveries, and employment defenses handled by our chambers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudiesData.map((cs) => (
                <div
                  key={cs.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                      <span className="font-bold text-[#183f6e] uppercase tracking-wider text-[11px]">
                        {cs.practiceArea}
                      </span>
                      <span className="text-slate-400">{cs.clientSector}</span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0a111a] mb-4 leading-snug">
                      {cs.title}
                    </h3>

                    <div className="space-y-4 mb-6 text-xs sm:text-sm">
                      <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-100">
                        <span className="font-bold text-rose-900 block mb-1">Legal Challenge:</span>
                        <p className="text-slate-700">{cs.challenge}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100">
                        <span className="font-bold text-[#183f6e] block mb-1">Litigation Strategy:</span>
                        <p className="text-slate-700">{cs.strategy}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                        <span className="font-bold text-emerald-900 block mb-1">Judicial Outcome:</span>
                        <p className="text-slate-700">{cs.outcome}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium italic">
                      {cs.confidentialityNote}
                    </span>
                    <button
                      onClick={onOpenConsultation}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#183f6e] hover:underline cursor-pointer"
                    >
                      <span>Inquire On Precedent</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Publications & Articles Grid */
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0a111a]">
                  {activeTab === 'all'
                    ? 'All Published Legal Articles'
                    : allTabs.find((t) => t.id === activeTab)?.label}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {!showAllTabs && activeTab === 'all' && !searchQuery.trim()
                    ? `Showing 3 of ${filteredArticles.length} publications (Reduced tabs view)`
                    : `Showing ${filteredArticles.length} ${filteredArticles.length === 1 ? 'publication' : 'publications'}`}
                </p>
              </div>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-sm max-w-xl mx-auto my-12">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-[#0a111a] mb-1">No publications matched your search</h3>
                <p className="text-xs text-slate-500 mb-6">
                  Try adjusting your search keywords or switch to another category tab.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#183f6e] text-white text-xs font-semibold hover:bg-[#123157] cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {displayedArticles.map((article) => (
                    <article
                      key={article.id}
                      onClick={() => onSelectArticle(article)}
                      className="group cursor-pointer bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 hover:border-[#183f6e]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Category & Time */}
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3.5">
                          <span className="font-bold text-[#183f6e] px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[11px]">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 font-medium text-slate-400">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-[#0a111a] group-hover:text-[#183f6e] transition-colors leading-snug mb-3">
                          {article.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                          {article.summary}
                        </p>

                        {/* Key takeaway preview badge */}
                        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                              Key Insight:
                            </span>
                            <p className="text-xs text-slate-700 line-clamp-2">
                              {article.keyTakeaways[0]}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Author & Open Button */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={article.authorImage || '/Wafula Paul.jpg'}
                            alt={article.author}
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/Wafula Paul.jpg';
                            }}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-xs font-semibold text-slate-700">
                            {article.author}
                          </span>
                        </div>

                        <div className="inline-flex items-center gap-1 text-xs font-bold text-[#183f6e] group-hover:translate-x-0.5 transition-transform">
                          <span>Read Article</span>
                          <ArrowUpRight className="w-4 h-4 text-[#183f6e]" />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Banner when tabs are reduced and other publications can be viewed */}
                {!showAllTabs && activeTab === 'all' && !searchQuery.trim() && filteredArticles.length > 3 && (
                  <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div>
                      <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5">
                        <FileText className="w-4 h-4 text-[#183f6e]" />
                        <span className="text-xs font-bold text-[#183f6e] uppercase tracking-wider">
                          Showing 3 of {filteredArticles.length} Publications
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                        Visible tabs are currently reduced to three. Press &lsquo;View All Publications&rsquo; to reveal all {allTabs.length} practice category tabs and explore all publications.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAllTabs(true)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183f6e] text-white hover:bg-[#123157] text-xs font-bold shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Sparkles className="w-4 h-4 text-[#ddf0ec]" />
                      <span>View All Publications</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#ddf0ec]" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* FAQs on Legal Knowledge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-16 border-t border-slate-200/80">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#183f6e] px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
              Chambers Knowledge Advisory
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0a111a] mt-3 mb-2">
              Frequently Asked Legal Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Key operational and regulatory inquiries addressed by our chambers.
            </p>
          </div>

          <div className="space-y-4">
            {faqItemsData.slice(0, 4).map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm open:shadow-md transition-shadow"
              >
                <summary className="font-bold text-sm text-[#0a111a] cursor-pointer flex items-center justify-between list-none">
                  <span>{faq.question}</span>
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-[#183f6e] flex items-center justify-center text-xs font-bold group-open:rotate-45 transition-transform shrink-0 ml-4">
                    +
                  </span>
                </summary>
                <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 rounded-full bg-[#183f6e] text-white hover:bg-[#123157] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Have a Specific Question? Consult Our Advocates</span>
              <ArrowRight className="w-4 h-4 text-[#ddf0ec]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
