import React, { useState } from 'react';
import { legalArticlesData } from '../../data/mockData';
import { LegalArticle } from '../../types';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { GoldStar } from '../ui/JusticeLogo';

interface InsightsFaqSectionProps {
  onSelectArticle: (article: LegalArticle) => void;
  onViewAllPublications?: () => void;
  onOpenConsultation?: () => void;
}

type InsightTab = 'all' | 'corporate' | 'employment';

export const InsightsFaqSection: React.FC<InsightsFaqSectionProps> = ({
  onSelectArticle,
  onViewAllPublications,
  onOpenConsultation,
}) => {
  const [activeTab, setActiveTab] = useState<InsightTab>('all');

  const tabs: { id: InsightTab; label: string }[] = [
    { id: 'all', label: 'All Publications' },
    { id: 'corporate', label: 'Corporate & Commercial' },
    { id: 'employment', label: 'Employment & Labour' },
  ];

  // Filter articles based on activeTab (top 3 for preview)
  const displayedArticles = legalArticlesData
    .filter((article) => {
      if (activeTab === 'corporate') {
        return article.category.toLowerCase().includes('corporate');
      }
      if (activeTab === 'employment') {
        return article.category.toLowerCase().includes('employment');
      }
      return true; // 'all'
    })
    .slice(0, 3);

  return (
    <section
      id="insights"
      data-nav-theme="white"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#e2e8f0]"
    >
      {/* Top Part: Legal Insights Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f8fafc] border border-[#e2e8f0] mb-3">
            <GoldStar className="w-3 h-3 text-[#183f6e]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#183f6e]">
              Publications &amp; Legal Knowledge
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0a111a]">
            Latest Legal Insights &amp; Advisory
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Expert analysis on contemporary corporate law, banking regulations, landmark High Court rulings, and commercial dispute resolution in Kenya, authored by Wafula Paul.
          </p>
          {onViewAllPublications && (
            <button
              onClick={onViewAllPublications}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#183f6e] text-white hover:bg-[#123157] text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer self-start sm:self-auto shadow-sm"
            >
              <span>View All Publications</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ddf0ec]" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#183f6e] text-white shadow-sm'
                  : 'bg-[#f8fafc] text-slate-600 hover:bg-slate-200/70 border border-[#e2e8f0]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {displayedArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group cursor-pointer flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#183f6e]/40 hover:bg-white hover:shadow-xl transition-all duration-300"
          >
              <div>
                <div className="flex items-center text-xs text-slate-500 mb-3">
                  <span className="font-semibold text-[#183f6e] px-2.5 py-0.5 rounded-full bg-[#eef4f9] text-[11px]">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0a111a] mb-3 group-hover:text-[#183f6e] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div>
                {/* Author attribution */}
                <div className="flex items-center gap-2 mb-4 text-xs text-slate-500">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                    <img
                      src={article.authorImage || '/Wafula Paul.jpg'}
                      alt={article.author}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/Wafula Paul.jpg';
                      }}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="font-medium text-slate-700 truncate">
                    {article.author}
                  </span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-400">{article.date}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 text-xs font-semibold text-[#183f6e]">
                  <span>Read Full Article</span>
                  <div className="w-7 h-7 rounded-full bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
};
