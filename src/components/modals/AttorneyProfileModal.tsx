import React from 'react';
import { Attorney } from '../../types';
import { X, Mail, Phone, GraduationCap, Scale, Briefcase, ArrowRight } from 'lucide-react';

interface AttorneyProfileModalProps {
  attorney: Attorney | null;
  onClose: () => void;
  onBookWithAttorney: (attorney: Attorney) => void;
}

export const AttorneyProfileModal: React.FC<AttorneyProfileModalProps> = ({
  attorney,
  onClose,
  onBookWithAttorney,
}) => {
  if (!attorney) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#183f6e] text-white rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-white/10">
          <div className="md:col-span-4 rounded-2xl overflow-hidden bg-[#183f6e] border border-white/20 aspect-[3/4] relative shadow-lg">
            <img
              src={attorney.image}
              alt={attorney.name}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/wafula-paul.jpg';
              }}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="md:col-span-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#ddf0ec] block mb-1">
                {attorney.role}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                {attorney.name}
              </h2>
              <p className="text-sm font-medium text-slate-400 mb-4">
                {attorney.specialty} · <span className="text-[#ddf0ec] font-semibold">{attorney.experience}</span>
              </p>

              {/* Quick Contacts */}
              <div className="space-y-1.5 text-xs text-slate-300 mb-6">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#ddf0ec]" />
                  <a href={`mailto:${attorney.email}`} className="hover:text-white transition-colors">
                    {attorney.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#ddf0ec]" />
                  <span>{attorney.phone}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onBookWithAttorney(attorney)}
              className="gold-bg-btn py-2.5 px-6 rounded-full text-xs font-semibold inline-flex items-center gap-2 self-start cursor-pointer"
            >
              <span>Schedule Consultation with {attorney.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ddf0ec]" />
            </button>
          </div>
        </div>

        {/* Biography & Details */}
        <div className="pt-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#ddf0ec] mb-2">
              Professional Biography
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {attorney.bio}
            </p>
          </div>

          {/* Education & Bar Admissions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#ddf0ec] mb-2 uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                <span>Education</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {attorney.education.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="text-[#ddf0ec]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#ddf0ec] mb-2 uppercase tracking-wider">
                <Scale className="w-4 h-4" />
                <span>Bar Admissions</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {attorney.barAdmissions.map((item) => (
                  <li key={item} className="flex items-start gap-1.5">
                    <span className="text-[#ddf0ec]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Notable Matters */}
          {attorney.notableMatters && attorney.notableMatters.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ddf0ec] mb-2 uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Representative Matters</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {attorney.notableMatters.map((matter, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    {matter}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages & Memberships */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10 text-xs text-slate-400">
            <div>
              <span className="font-semibold text-slate-200">Languages: </span>
              {attorney.languages.join(', ')}
            </div>
            <div>
              <span className="font-semibold text-slate-200">Affiliations: </span>
              {attorney.memberships.join('; ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
