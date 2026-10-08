import React from 'react';
import { practiceAreasData } from '../../data/mockData';
import { PracticeArea } from '../../types';
import { ArrowUpRight } from 'lucide-react';

interface PracticeAreaStripProps {
  onSelectPractice: (practice: PracticeArea) => void;
}

export const PracticeAreaStrip: React.FC<PracticeAreaStripProps> = ({ onSelectPractice }) => {
  return (
    <div className="w-full bg-[#123157] text-white border-y border-white/10 py-3.5 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 sm:gap-6 whitespace-nowrap">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#ddf0ec] shrink-0 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#ddf0ec] animate-pulse" />
          Disciplines:
        </span>
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar">
          {practiceAreasData.map((practice) => (
            <button
              key={practice.id}
              onClick={() => onSelectPractice(practice)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-slate-200 hover:text-[#ddf0ec] border border-white/10 transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span>{practice.name}</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
