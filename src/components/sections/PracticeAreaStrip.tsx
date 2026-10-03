import React from 'react';
import { GoldStar } from '../ui/JusticeLogo';
import { practiceAreasData } from '../../data/mockData';
import { PracticeArea } from '../../types';

interface PracticeAreaStripProps {
  onSelectPractice: (practice: PracticeArea) => void;
}

export const PracticeAreaStrip: React.FC<PracticeAreaStripProps> = ({ onSelectPractice }) => {
  return (
    <div data-nav-theme="white" className="w-full bg-[#f8fafc] border-y border-[#e2e8f0] py-4 my-3 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-1">
          {practiceAreasData.map((item, index) => (
            <React.Fragment key={item.id}>
              <button
                onClick={() => onSelectPractice(item)}
                className="whitespace-nowrap text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#183f6e] transition-colors cursor-pointer flex items-center gap-2 focus:outline-none"
              >
                <span>{item.shortName}</span>
              </button>
              {index < practiceAreasData.length - 1 && (
                <div className="shrink-0 flex items-center justify-center">
                  <GoldStar className="w-2.5 h-2.5 text-[#183f6e]/40" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
