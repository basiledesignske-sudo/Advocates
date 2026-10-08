import React, { useState } from 'react';
import { FirmStats, ConsultationSubmission } from '../../types';
import { X, ShieldCheck, Save, Users, FileText, CheckCircle, Clock } from 'lucide-react';

interface AdminCmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: FirmStats;
  onUpdateStats: (newStats: FirmStats) => void;
  submissions: ConsultationSubmission[];
  onUpdateSubmissionStatus: (id: string, status: 'new' | 'reviewed' | 'contacted') => void;
}

export const AdminCmsModal: React.FC<AdminCmsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats,
  submissions,
  onUpdateSubmissionStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'stats'>('submissions');
  const [formStats, setFormStats] = useState<FirmStats>(stats);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStats(formStats);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-2">
          <ShieldCheck className="w-4 h-4 text-[#ddf0ec]" />
          <span>Chambers Administrative Console</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
          Registry &amp; Content Management System
        </h2>

        {/* Tabs */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'submissions'
                ? 'bg-[#183f6e] text-white border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Client Inquiries &amp; Intakes ({submissions.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
              activeTab === 'stats'
                ? 'bg-[#183f6e] text-white border border-white/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Chambers Track Record &amp; Metrics
          </button>
        </div>

        {activeTab === 'submissions' ? (
          <div className="space-y-4">
            {submissions.length === 0 ? (
              <p className="text-sm text-slate-400 py-8 text-center">No client inquiries received yet.</p>
            ) : (
              submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono text-[#ddf0ec] font-bold">{sub.id}</span>
                      <h4 className="text-base font-bold text-white">{sub.fullName}</h4>
                      <div className="text-xs text-slate-400">
                        {sub.email} · {sub.phone} {sub.company && `· ${sub.company}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={sub.status}
                        onChange={(e) =>
                          onUpdateSubmissionStatus(
                            sub.id,
                            e.target.value as 'new' | 'reviewed' | 'contacted'
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-slate-800 border border-white/20 text-xs text-white"
                      >
                        <option value="new">Status: New</option>
                        <option value="reviewed">Status: Reviewed</option>
                        <option value="contacted">Status: Contacted</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 bg-black/20 p-3 rounded-xl leading-relaxed">
                    {sub.message}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <div>
                      <strong>Discipline:</strong> {sub.practiceArea} · <strong>Channel:</strong> {sub.preferredContact}
                      {sub.uploadedFileName && ` · File: ${sub.uploadedFileName}`}
                    </div>
                    <div>{new Date(sub.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <form onSubmit={handleSaveStats} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Matters / Clients Concluded
              </label>
              <input
                type="number"
                value={formStats.clientsServed}
                onChange={(e) =>
                  setFormStats({ ...formStats, clientsServed: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/20 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Years of Bar Standing
              </label>
              <input
                type="number"
                value={formStats.yearsExperience}
                onChange={(e) =>
                  setFormStats({ ...formStats, yearsExperience: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/20 text-white text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Trial Success Metric (%)
              </label>
              <input
                type="number"
                value={formStats.successRatePercent}
                onChange={(e) =>
                  setFormStats({ ...formStats, successRatePercent: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-white/20 text-white text-sm"
              />
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#183f6e] hover:bg-[#123157] text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4 text-[#ddf0ec]" />
                <span>Save Registry Updates</span>
              </button>
              {savedSuccess && (
                <span className="text-xs text-[#ddf0ec] font-semibold">Changes applied live!</span>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
