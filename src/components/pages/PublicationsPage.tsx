import React, { useState } from 'react';
import { legalArticlesData } from '../../data/mockData';
import { LegalArticle } from '../../types';
import { ArrowLeft, Search, ArrowUpRight, BookOpen } from 'lucide-react';
import { GoldStar } from '../ui/JusticeLogo';

interface PublicationsPageProps {
  onSelectArticle: (article: LegalArticle) => void;
  onNavigateHome: (sectionId?: string) => void;
  onOpenConsultation: () => void;
}

export const PublicationsPage: React.FC<PublicationsPageProps> = ({
  onSelectArticle,
  onNavigateHome,
  onOpenConsultation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Corporate & Commercial', 'Real Estate & Conveyancing', 'Employment & Labour'];

  const filteredArticles = legalArticlesData.filter((art) => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.tags && art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => onNavigateHome('hero')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#183f6e] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Overview</span>
        </button>

        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 mb-3.5 shadow-xs">
            <GoldStar className="w-3 h-3 text-[#183f6e]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#183f6e]">
              Publications &amp; Legal Knowledge
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0a111a] tracking-tight mb-4">
            Legal Insights, Case Commentaries &amp; Advisory
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Thought leadership and strategic analysis on Kenyan commercial law, banking securities enforcement, Ardhisasa land conversions, and ELRC labour compliance.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#183f6e] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Publications' : cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search legal articles..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#183f6e]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-xl hover:border-[#183f6e]/30 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span className="font-semibold text-[#183f6e] px-2.5 py-0.5 rounded-full bg-slate-100">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">{article.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-[#0a111a] group-hover:text-[#183f6e] transition-colors mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100 text-xs text-slate-500 mb-4">
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-slate-200 shrink-0">
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
                    <div className="font-semibold text-slate-800 leading-none">{article.author}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{article.date}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-[#183f6e] pt-2">
                  <span>Read Full Advisory</span>
                  <div className="w-7 h-7 rounded-full bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* End Consultation Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-[#183f6e] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-bold mb-1">Require Formal Legal Opinion on Any of These Topics?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our advocates deliver actionable, privileged legal advisories tailored to your commercial facts.
            </p>
          </div>
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-full bg-[#ddf0ec] text-[#183f6e] hover:bg-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-md"
          >
            Instruct Chambers
          </button>
        </div>
      </div>
    </div>
  );
};
