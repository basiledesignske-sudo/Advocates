import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Share2,
  Printer,
  ArrowRight,
  ShieldCheck,
  Scale,
  Check,
  ChevronRight,
} from 'lucide-react';
import { LegalArticle } from '../../types';
import { legalArticlesData } from '../../data/mockData';

interface InsightArticlePageProps {
  article: LegalArticle;
  onNavigateHome: (sectionId?: string) => void;
  onNavigatePublications: () => void;
  onSelectArticle: (article: LegalArticle) => void;
  onOpenConsultation: () => void;
}

export const InsightArticlePage: React.FC<InsightArticlePageProps> = ({
  article,
  onNavigateHome,
  onNavigatePublications,
  onSelectArticle,
}) => {
  const [copied, setCopied] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${article.title} | Wafula PW & Co. Advocates`;
    return () => {
      document.title = 'Wafula PW & Co. Advocates | Kenyan Law Firm';
    };
  }, [article]);

  useEffect(() => {
    const handleScrollProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        setReadProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollProgress);
  }, []);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  // Find related articles (excluding the current one)
  const relatedArticles = legalArticlesData
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  // Sequential previous/next articles
  const currentIdx = legalArticlesData.findIndex((a) => a.id === article.id);
  const prevArticle = currentIdx > 0 ? legalArticlesData[currentIdx - 1] : legalArticlesData[legalArticlesData.length - 1];
  const nextArticle = currentIdx < legalArticlesData.length - 1 ? legalArticlesData[currentIdx + 1] : legalArticlesData[0];

  return (
    <article className="min-h-screen bg-[#fafbfc] text-[#183f6e] pt-24 sm:pt-28 pb-20 relative">
      {/* Top Fixed Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-200/50 pointer-events-none">
        <div
          className="h-full bg-[#183f6e] transition-all duration-100 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>
      {/* Top Breadcrumb & Action Navigation Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-slate-200/80 text-xs text-slate-500">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => onNavigateHome('hero')}
              className="hover:text-[#183f6e] transition-colors cursor-pointer font-medium"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              onClick={onNavigatePublications}
              className="hover:text-[#183f6e] transition-colors cursor-pointer font-medium"
            >
              Publications &amp; Legal Knowledge
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#183f6e] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {article.category}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onNavigatePublications}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-[#183f6e] font-semibold text-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Publications</span>
            </button>
            <button
              onClick={() => onNavigateHome('hero')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-slate-300 text-slate-600 font-medium text-xs transition-colors cursor-pointer"
            >
              <span>Firm Home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <div className="w-full">
        {/* Article Header - Full Width Edge to Edge */}
        <header className="w-full bg-white border-y border-slate-200/80 py-10 sm:py-12 md:py-14 mb-8 shadow-xs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 text-xs mb-5">
              <span className="px-3.5 py-1 rounded-full bg-[#183f6e] text-white font-semibold uppercase tracking-wider text-[11px]">
                {article.category}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#183f6e]" />
                {article.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold text-[#0a111a] tracking-tight leading-tight sm:leading-[1.2] mb-8">
              {article.title}
            </h1>

            {/* Author Details & Article Actions Bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                  <img
                    src={article.authorImage || '/Wafula Paul.jpg'}
                    alt={article.author}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/Wafula Paul.jpg';
                    }}
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0a111a] flex items-center gap-1.5">
                    <span>{article.author}</span>
                    <ShieldCheck className="w-4 h-4 text-[#183f6e]" />
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {article.authorRole} · Wafula PW &amp; Co. Advocates
                  </div>
                </div>
              </div>

              {/* Utility actions: Share, Print */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share article"
                  title="Copy article link"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-600 hover:text-[#183f6e] bg-slate-50 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  aria-label="Print article"
                  title="Print article"
                  className="p-2 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#183f6e] bg-slate-50 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Container (Body, Related, Next/Prev) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Article Body Content */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-sm mb-8">
          <div className="space-y-6 text-[#1e293b] leading-relaxed font-normal text-sm sm:text-base sm:leading-relaxed">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Related Topics &amp; Statutes
              </span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[#f1f5f9] text-[#183f6e] text-xs font-semibold hover:bg-slate-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Chambers Statutory Guidance Note */}
          <div className="mt-8 p-6 rounded-2xl bg-[#ddf0ec]/30 border border-[#ddf0ec] text-[#183f6e]">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4 text-[#183f6e]" />
              <span>Chambers Legal Disclaimer &amp; Advisory Notice</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              This publication is provided solely for general informational and educational purposes. It does not constitute formal legal counsel or create an advocate-client relationship. Prior to taking action regarding transactions, court filings, or statutory notices, consult an advocate of the High Court of Kenya.
            </p>
          </div>
        </section>

        {/* Related Legal Publications Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Continue Reading
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0a111a]">
                Related Publications &amp; Insights
              </h3>
            </div>
            <button
              onClick={onNavigatePublications}
              className="text-xs font-bold text-[#183f6e] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="group cursor-pointer bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-[#183f6e]/40 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                    <span className="font-semibold text-[#183f6e]">{rel.category}</span>
                    <span>{rel.readTime}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0a111a] group-hover:text-[#183f6e] transition-colors line-clamp-2 mb-2 leading-snug">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#183f6e]">
                  <span>Open Article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sequential Previous / Next Article Navigation Footer */}
        <section className="pt-8 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onSelectArticle(prevArticle)}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#183f6e]/50 hover:shadow-md transition-all text-left flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center shrink-0 transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Previous Article
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0a111a] group-hover:text-[#183f6e] transition-colors truncate block">
                  {prevArticle.title}
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectArticle(nextArticle)}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#183f6e]/50 hover:shadow-md transition-all text-right flex items-center justify-end gap-3 group cursor-pointer"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Next Article
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#0a111a] group-hover:text-[#183f6e] transition-colors truncate block">
                  {nextArticle.title}
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center shrink-0 transition-colors">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </section>
        </div>
      </div>
    </article>
  );
};
