import React, { useState, useEffect } from 'react';
import { FirmStats, ConsultationSubmission } from '../../types';
import { practiceAreasData } from '../../data/mockData';
import { X, ShieldAlert, CheckCircle2, Sliders, Inbox, Briefcase, FileCheck, Save } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'submissions' | 'stats' | 'practices' | 'seo'>('submissions');
  const [currentRole, setCurrentRole] = useState<'Super Admin' | 'Senior Partner' | 'Editor'>('Super Admin');
  const [editableStats, setEditableStats] = useState<FirmStats>({ ...stats });
  const [saveNotification, setSaveNotification] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEditableStats({ ...stats });
    }
  }, [isOpen, stats]);

  if (!isOpen) return null;

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStats(editableStats);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#183f6e] text-white rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-8 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#183f6e]/40 text-[#ddf0ec] font-bold border border-[#ddf0ec]/30">
                Wafula PW &amp; Co. Advocates CMS
              </span>
              <span className="text-xs text-slate-400">Security Level: Strict RBAC</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Administrative Command Center
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Role Switcher */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs bg-white/5 p-1 rounded-xl border border-white/10">
              <span className="text-slate-400 pl-1.5">Role:</span>
              {(['Super Admin', 'Senior Partner', 'Editor'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setCurrentRole(role)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    currentRole === role ? 'bg-[#183f6e] text-[#ddf0ec] font-semibold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 sm:gap-4 border-b border-white/10 my-4 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'submissions'
                ? 'border-[#ddf0ec] text-[#ddf0ec]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Client Inquiries ({submissions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'stats'
                ? 'border-[#ddf0ec] text-[#ddf0ec]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Firm Metrics &amp; Counters</span>
          </button>
          <button
            onClick={() => setActiveTab('practices')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'practices'
                ? 'border-[#ddf0ec] text-[#ddf0ec]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Practice Directory</span>
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer ${
              activeTab === 'seo'
                ? 'border-[#ddf0ec] text-[#ddf0ec]'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>SEO &amp; Schema Registry</span>
          </button>
        </div>

        {/* Content Tabs */}
        {activeTab === 'submissions' && (
          <div>
            {currentRole === 'Editor' ? (
              <div className="py-12 text-center text-slate-400">
                <ShieldAlert className="w-10 h-10 text-[#ddf0ec] mx-auto mb-3" />
                <h4 className="text-base font-bold text-white mb-1">Restricted Access</h4>
                <p className="text-xs max-w-md mx-auto">
                  Pursuant to ABA Model Rules &amp; client privilege standards, confidential contact intake submissions are restricted to Super Admins and Senior Partners.
                </p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                No consultation inquiries currently in queue. Submit a request using the "Book a Consultation" button to test the intake flow.
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#183f6e]/50 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#ddf0ec]">{sub.id}</span>
                        <span className="text-xs text-slate-400">
                          {new Date(sub.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Status:</span>
                        <select
                          value={sub.status}
                          onChange={(e) =>
                            onUpdateSubmissionStatus(
                              sub.id,
                              e.target.value as 'new' | 'reviewed' | 'contacted'
                            )
                          }
                          className="text-xs bg-black/25 border border-white/20 rounded-lg px-2 py-1 text-white focus:outline-none"
                        >
                          <option value="new">New Inquiry</option>
                          <option value="reviewed">Under Review</option>
                          <option value="contacted">Conflict Cleared &amp; Contacted</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-white mb-3">
                      <div>
                        <strong>Name:</strong> {sub.fullName}
                      </div>
                      <div>
                        <strong>Email:</strong> {sub.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {sub.phone}
                      </div>
                      <div>
                        <strong>Practice:</strong> {sub.practiceArea}
                      </div>
                      <div>
                        <strong>Contact Method:</strong> {sub.preferredContact}
                      </div>
                      {sub.uploadedFileName && (
                        <div>
                          <strong>Attachment:</strong> {sub.uploadedFileName}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-slate-300 bg-black/40 p-3 rounded-xl border border-white/10">
                      <strong className="text-white">Matter Summary:</strong> {sub.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <form onSubmit={handleSaveStats} className="space-y-6">
            <p className="text-xs text-slate-400">
              Update the firm’s live verifiable metrics displayed in the Introduction and Overview section:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Satisfied Clients Count
                </label>
                <input
                  type="number"
                  value={editableStats.clientsServed}
                  onChange={(e) =>
                    setEditableStats({ ...editableStats, clientsServed: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#183f6e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={editableStats.yearsExperience}
                  onChange={(e) =>
                    setEditableStats({ ...editableStats, yearsExperience: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#183f6e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Expert Lawyers &amp; Partners
                </label>
                <input
                  type="number"
                  value={editableStats.expertAttorneys}
                  onChange={(e) =>
                    setEditableStats({ ...editableStats, expertAttorneys: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#183f6e]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Resolution Success Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={editableStats.successRatePercent}
                  onChange={(e) =>
                    setEditableStats({ ...editableStats, successRatePercent: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#183f6e]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                type="submit"
                className="gold-bg-btn px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-[#ddf0ec]" />
                <span>Save Live Metrics</span>
              </button>

              {saveNotification && (
                <span className="text-xs text-[#ddf0ec] flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Live site statistics updated!
                </span>
              )}
            </div>
          </form>
        )}

        {activeTab === 'practices' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400 mb-2">
              Active Legal Practice Areas ({practiceAreasData.length} published):
            </p>
            {practiceAreasData.map((pa) => (
              <div
                key={pa.id}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{pa.name}</div>
                  <div className="text-slate-400">{pa.keyServices.length} sub-services listed</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#183f6e]/40 text-[#ddf0ec] border border-[#ddf0ec]/30">
                  Published
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'seo' && (
          <div className="space-y-4 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="text-[#ddf0ec] font-bold">Primary Structured Data:</div>
              <div>Schema.org Type: <code className="text-white">LegalService</code></div>
              <div>Brand Authority: <code className="text-white">Wafula PW &amp; Co. Advocates</code></div>
              <div>Headquarters: <code className="text-white">MCMX Building, First Floor, Off Kiambu Road, Nairobi</code></div>
              <div>Postal: <code className="text-white">P.O. Box 22594 - 00400 Nairobi, Kenya</code></div>
              <div>Telephones: <code className="text-white">+254 716 954 112 | +254 780 323 657</code></div>
              <div>Email: <code className="text-white">info@wafulapwadvocates.com</code></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
