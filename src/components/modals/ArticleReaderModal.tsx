import React from 'react';
import { LegalArticle } from '../../types';
import { X, Clock, User, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

interface ArticleReaderModalProps {
  article: LegalArticle | null;
  onClose: () => void;
  onOpenConsultation: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onOpenConsultation,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#183f6e] text-white rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-10 my-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Metadata */}
        <div className="mb-6">
          <div className="flex items-center gap-3 text-xs text-[#ddf0ec] font-semibold uppercase tracking-wider mb-2">
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="flex items-center gap-1 text-slate-400 normal-case">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
            {article.title}
          </h2>

          <div className="flex items-center gap-4 text-xs text-slate-400 pb-6 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-white">
              <User className="w-3.5 h-3.5 text-[#ddf0ec]" />
              <strong>{article.author}</strong> ({article.authorRole})
            </span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#ddf0ec]" />
              {article.date}
            </span>
          </div>
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className="mb-8 p-5 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-3">
              Strategic Takeaways
            </h3>
            <ul className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#ddf0ec] shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Content */}
        <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8">
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Need tailored counsel regarding this topic?
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConsultation();
            }}
            className="gold-bg-btn px-6 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Book Legal Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ddf0ec]" />
          </button>
        </div>
      </div>
    </div>
  );
};
