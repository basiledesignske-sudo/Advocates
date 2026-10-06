import React, { useState, useEffect, useRef } from 'react';
import { practiceAreasData, attorneysData, legalArticlesData, faqItemsData, caseStudiesData } from '../../data/mockData';
import { PracticeArea, Attorney, LegalArticle, CaseStudy } from '../../types';
import { Search, X, Shield, User, BookOpen, HelpCircle, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPractice: (practice: PracticeArea) => void;
  onSelectAttorney: (attorney: Attorney) => void;
  onSelectArticle: (article: LegalArticle) => void;
  onSelectCaseStudy: (caseStudy: CaseStudy) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPractice,
  onSelectAttorney,
  onSelectArticle,
  onSelectCaseStudy,
}) => {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'practices' | 'attorneys' | 'insights' | 'cases'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery('');
      setCategoryFilter('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchedPractices = (categoryFilter === 'all' || categoryFilter === 'practices') && cleanQuery
    ? practiceAreasData.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.description.toLowerCase().includes(cleanQuery) ||
          p.keyServices.some((s) => s.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchedAttorneys = (categoryFilter === 'all' || categoryFilter === 'attorneys') && cleanQuery
    ? attorneysData.filter(
        (a) =>
          a.name.toLowerCase().includes(cleanQuery) ||
          a.specialty.toLowerCase().includes(cleanQuery) ||
          a.bio.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedArticles = (categoryFilter === 'all' || categoryFilter === 'insights') && cleanQuery
    ? legalArticlesData.filter(
        (art) =>
          art.title.toLowerCase().includes(cleanQuery) ||
          art.summary.toLowerCase().includes(cleanQuery) ||
          art.category.toLowerCase().includes(cleanQuery) ||
          art.author.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedCaseStudies = (categoryFilter === 'all' || categoryFilter === 'cases') && cleanQuery
    ? caseStudiesData.filter(
        (cs) =>
          cs.title.toLowerCase().includes(cleanQuery) ||
          cs.challenge.toLowerCase().includes(cleanQuery) ||
          cs.practiceArea.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedFaqs = categoryFilter === 'all' && cleanQuery
    ? faqItemsData.filter(
        (f) =>
          f.question.toLowerCase().includes(cleanQuery) ||
          f.answer.toLowerCase().includes(cleanQuery)
      )
    : [];

  const hasResults =
    matchedPractices.length > 0 ||
    matchedAttorneys.length > 0 ||
    matchedArticles.length > 0 ||
    matchedCaseStudies.length > 0 ||
    matchedFaqs.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#183f6e] text-white rounded-3xl border border-white/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-[#ddf0ec] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search practices, partners, legal insights, or case studies..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-slate-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg border border-white/10 hover:bg-white/10 cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/10 bg-white/5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all' as const, label: 'All' },
            { id: 'practices' as const, label: 'Practices' },
            { id: 'attorneys' as const, label: 'Attorneys' },
            { id: 'insights' as const, label: 'Insights' },
            { id: 'cases' as const, label: 'Precedents' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat.id
                  ? 'bg-[#ddf0ec] text-[#183f6e]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {!cleanQuery ? (
            /* Quick Suggestions */
            <div className="py-4 text-xs text-slate-400">
              <span className="font-semibold text-slate-300 block mb-2">Popular Inquiries:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  'WAFULA W. PAUL',
                  'Commercial Litigation',
                  'Real Estate & Conveyancing',
                  'Banking Recoveries',
                  'Corporate & Commercial',
                  'Employment & Labour',
                  'Intellectual Property',
                  'Ardhisasa Due Diligence',
                  'Cross-Border & Diaspora',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : !hasResults ? (
            /* Empty State */
            <div className="py-12 text-center text-slate-400 text-sm">
              <p>No matches found for "{query}".</p>
              <p className="text-xs mt-1 text-slate-500">
                Try searching by attorney name, legal issue, or practice area.
              </p>
            </div>
          ) : (
            /* Matched Categories */
            <div className="space-y-4">
              {/* Practice Areas */}
              {matchedPractices.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-[#ddf0ec] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Practice Areas ({matchedPractices.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedPractices.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectPractice(p);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs sm:text-sm text-slate-300 hover:text-white transition-colors group cursor-pointer"
                      >
                        <div>
                          <div className="font-semibold text-white">{p.name}</div>
                          <div className="text-xs text-slate-400 line-clamp-1">{p.description}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Attorneys */}
              {matchedAttorneys.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-bold text-[#ddf0ec] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>Attorneys ({matchedAttorneys.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedAttorneys.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => {
                          onClose();
                          onSelectAttorney(a);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs sm:text-sm text-slate-300 hover:text-white transition-colors group cursor-pointer"
                      >
                        <div>
                          <div className="font-semibold text-white">{a.name}</div>
                          <div className="text-xs text-slate-400">{a.role} · {a.specialty}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Legal Insights */}
              {matchedArticles.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-bold text-[#ddf0ec] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Legal Insights ({matchedArticles.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedArticles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          onClose();
                          onSelectArticle(art);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs sm:text-sm text-slate-300 hover:text-white transition-colors group cursor-pointer"
                      >
                        <div>
                          <div className="font-semibold text-white">{art.title}</div>
                          <div className="text-xs text-slate-400">{art.category} · {art.author}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Case Studies */}
              {matchedCaseStudies.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-bold text-[#ddf0ec] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Case Studies ({matchedCaseStudies.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedCaseStudies.map((cs) => (
                      <button
                        key={cs.id}
                        onClick={() => {
                          onClose();
                          onSelectCaseStudy(cs);
                        }}
                        className="w-full text-left p-3 rounded-xl hover:bg-white/5 flex items-center justify-between text-xs sm:text-sm text-slate-300 hover:text-white transition-colors group cursor-pointer"
                      >
                        <div>
                          <div className="font-semibold text-white">{cs.title}</div>
                          <div className="text-xs text-slate-400">{cs.matterType} · {cs.practiceArea}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {matchedFaqs.length > 0 && (
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-bold text-[#ddf0ec] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>FAQs ({matchedFaqs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedFaqs.map((faq, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 text-xs">
                        <div className="font-semibold text-white mb-1">{faq.question}</div>
                        <div className="text-slate-300 leading-relaxed">{faq.answer}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
