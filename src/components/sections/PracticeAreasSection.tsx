import React, { useRef } from 'react';
import { GoldStar } from '../ui/JusticeLogo';
import { PracticeArea } from '../../types';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface PracticeAreasSectionProps {
  practices: PracticeArea[];
  onSelectPractice: (practice: PracticeArea) => void;
}

export const PracticeAreasSection: React.FC<PracticeAreasSectionProps> = ({
  practices,
  onSelectPractice,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="practice-areas"
      data-nav-theme="white"
      className="w-full bg-[#f1f5f9] border-b-2 border-slate-300 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 mb-3.5 shadow-xs">
              <GoldStar className="w-3 h-3 text-[#183f6e]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#183f6e]">
                Core Practice Disciplines
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0a111a] mb-3">
              Explore Our Comprehensive Legal Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              From multi-million banking asset recoveries to complex high court litigation and cross-border commercial transactions, select any practice discipline to open its dedicated page.
            </p>
          </div>

          {/* Arrow Scroll Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-slate-300 bg-white hover:bg-[#ddf0ec] text-[#183f6e] hover:border-[#183f6e] flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e] shadow-sm"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-slate-300 bg-white hover:bg-[#ddf0ec] text-[#183f6e] hover:border-[#183f6e] flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e] shadow-sm"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
        {practices.map((practice) => (
          <div
            key={practice.id}
            onClick={() => onSelectPractice(practice)}
            className="shrink-0 w-[290px] sm:w-[320px] md:w-[340px] rounded-3xl overflow-hidden relative group cursor-pointer border border-[#183f6e]/30 hover:border-[#183f6e] transition-all duration-300 shadow-md hover:shadow-2xl bg-[#183f6e] flex flex-col justify-end min-h-[440px] focus:outline-none focus:ring-2 focus:ring-[#ddf0ec]"
            tabIndex={0}
            role="button"
            aria-label={`Open dedicated page for ${practice.name}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectPractice(practice);
              }
            }}
          >
            <div className="absolute inset-0 z-0 bg-[#0f2847]">
              <img
                src={practice.image}
                alt={practice.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-75 contrast-105"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/hero_law_firm_1790847178281.jpg';
                }}
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] via-[#0a111a]/70 to-transparent" />

            <div className="relative z-10 p-6 sm:p-7 flex flex-col justify-between h-full">
              <div className="flex items-center justify-start">
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#ddf0ec] text-white group-hover:text-[#183f6e] flex items-center justify-center transition-all duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-auto">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#ddf0ec] transition-colors">
                  {practice.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                  {practice.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
};
