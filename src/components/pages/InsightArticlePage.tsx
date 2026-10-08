import React from 'react';
import { LegalArticle } from '../../types';
import { legalArticlesData } from '../../data/mockData';
import { ArrowLeft, Clock, Calendar, Share2, ArrowRight, ShieldCheck } from 'lucide-react';

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
  onOpenConsultation,
}) => {
  const relatedArticles = legalArticlesData
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-8">
          <button
            onClick={() => onNavigateHome('hero')}
            className="hover:text-[#183f6e] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={onNavigatePublications}
            className="hover:text-[#183f6e] transition-colors cursor-pointer"
          >
            Publications
          </button>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{article.title}</span>
        </div>

        {/* Category & Metadata */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full bg-slate-100 text-[#183f6e] text-xs font-bold">
            {article.category}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a111a] tracking-tight leading-tight mb-6">
          {article.title}
        </h1>

        {/* Author Byline */}
        <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 shrink-0">
              <img
                src={article.authorImage || '/wafula-paul.jpg'}
                alt={article.author}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/wafula-paul.jpg';
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{article.author}</div>
              <div className="text-xs text-slate-500">{article.authorRole} · Wafula PW &amp; Co. Advocates</div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="p-2.5 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title="Copy link to clipboard"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* Executive Summary Callout */}
        <div className="p-6 rounded-2xl bg-slate-50 border-l-4 border-[#183f6e] text-sm sm:text-base text-slate-700 italic leading-relaxed mb-10">
          &ldquo;{article.summary}&rdquo;
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="p-6 rounded-3xl bg-[#183f6e]/5 border border-[#183f6e]/20 mb-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#183f6e] mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#183f6e]" />
              Strategic Takeaways for In-House Counsel &amp; Executives
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {article.keyTakeaways.map((takeaway, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#183f6e] shrink-0 mt-2" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Substantive Body Paragraphs */}
        <div className="prose prose-slate max-w-none text-base text-slate-700 leading-relaxed space-y-6 mb-12">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Tags */}
        {article.tags && (
          <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200 mb-12">
            <span className="text-xs font-semibold text-slate-400">Filed under:</span>
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Consultation Callout Box */}
        <div className="p-8 rounded-3xl bg-[#183f6e] text-white flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 shadow-lg">
          <div>
            <h3 className="text-xl font-bold mb-1">Face Similar Legal Exposure?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule a privileged advisory session with Paul Wafula to evaluate your specific dispute or transaction.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-full bg-[#ddf0ec] text-[#183f6e] hover:bg-white text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-md"
          >
            Book Legal Advisory
          </button>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold text-[#0a111a] mb-6">Further Legal Commentaries</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="p-6 rounded-2xl border border-slate-200 hover:border-[#183f6e] bg-slate-50 hover:bg-white transition-all cursor-pointer group"
                >
                  <span className="text-[11px] font-semibold text-[#183f6e] block mb-2">{rel.category}</span>
                  <h4 className="text-sm font-bold text-[#0a111a] group-hover:text-[#183f6e] transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[#183f6e] font-semibold mt-3">
                    <span>Read Advisory</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
