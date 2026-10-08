import React from 'react';
import { LegalArticle } from '../../types';
import { X, Calendar, Clock, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { GoldStar } from '../ui/JusticeLogo';

interface ArticleReaderModalProps {
  article: LegalArticle | null;
  onClose: () => void;
  onOpenConsultation?: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onOpenConsultation,
}) => {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#183f6e] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>{article.date}</span>
              <span>·</span>
              <span>By {article.author}</span>
            </div>
            <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-extrabold text-[#0a111a] leading-tight">
              {article.title}
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {article.summary}
          </p>

          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-[#183f6e] uppercase tracking-wider mb-2">
                <GoldStar className="w-3.5 h-3.5" />
                <span>Key Advisory Takeaways</span>
              </div>
              <ul className="space-y-1.5">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <span className="text-[#183f6e] font-bold mt-0.5">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {article.content && (
            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              {(Array.isArray(article.content) ? article.content : [article.content]).map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Wafula PW &amp; Co. Advocates · Nairobi
          </div>
          {onOpenConsultation && (
            <button
              onClick={() => {
                onClose();
                onOpenConsultation();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#183f6e] text-white text-xs font-bold hover:bg-[#123157] transition-colors cursor-pointer"
            >
              <span>Consult On This Issue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
