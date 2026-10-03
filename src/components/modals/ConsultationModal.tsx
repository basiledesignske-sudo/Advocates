import React, { useState, useEffect } from 'react';
import { PracticeAreaId, ConsultationSubmission } from '../../types';
import { practiceAreasData } from '../../data/mockData';
import { X, ShieldCheck, CheckCircle2, Upload, AlertCircle, FileText, Lock } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (submission: ConsultationSubmission) => void;
  initialPracticeId?: PracticeAreaId;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  initialPracticeId,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [practiceArea, setPracticeArea] = useState<PracticeAreaId>(initialPracticeId || 'corporate-commercial');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'video'>('email');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<ConsultationSubmission | null>(null);

  useEffect(() => {
    if (initialPracticeId) {
      setPracticeArea(initialPracticeId);
    }
  }, [initialPracticeId, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Strict validation
    const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.includes(ext)) {
      setUploadError('Invalid format. Only PDF, DOC, DOCX, JPG, and PNG documents are accepted.');
      return;
    }

    // 15MB limit
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('File exceeds the 15MB size limit.');
      return;
    }

    setUploadedFile(file);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'Full legal name is required (min 3 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Valid corporate or personal email is required.';
    }
    if (!phone.trim() || phone.trim().length < 7) {
      errs.phone = 'Valid telephone contact is required.';
    }
    if (!message.trim() || message.trim().length < 15) {
      errs.message = 'Please provide a brief summary of your legal matter (min 15 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const submission: ConsultationSubmission = {
      id: `SUB-${Date.now().toString(36).toUpperCase()}`,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company.trim() || undefined,
      practiceArea,
      preferredContact,
      preferredDate: preferredDate || undefined,
      message: message.trim(),
      uploadedFileName: uploadedFile ? uploadedFile.name : undefined,
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    onSubmitSuccess(submission);
    setSubmittedData(submission);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    setUploadedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#183f6e] text-white rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submittedData ? (
          /* Success Screen */
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[#183f6e]/30 text-[#ddf0ec] flex items-center justify-center mx-auto mb-4 border border-[#183f6e]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Consultation Request Received
            </h3>
            <p className="text-xs font-mono text-[#ddf0ec] mb-4">
              Reference ID: {submittedData.id}
            </p>
            <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-white">{submittedData.fullName}</strong>. Your inquiry has been routed to our Intake &amp; Conflicts Committee for immediate preliminary review.
            </p>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 text-left max-w-md mx-auto mb-8 space-y-2">
              <div><strong className="text-white">Practice Area:</strong> {submittedData.practiceArea}</div>
              <div><strong className="text-white">Preferred Method:</strong> {submittedData.preferredContact}</div>
              {submittedData.uploadedFileName && (
                <div><strong className="text-white">Encrypted Attachment:</strong> {submittedData.uploadedFileName}</div>
              )}
            </div>
            <button
              onClick={handleReset}
              className="gold-bg-btn px-8 py-3 rounded-full text-sm font-semibold cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        ) : (
          /* Intake Form */
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ddf0ec] mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Privileged &amp; Confidential Intake</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Schedule a Legal Consultation
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                All communications are protected under strict attorney-client privilege.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Full Legal Name <span className="text-[#ddf0ec]">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e]"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address <span className="text-[#ddf0ec]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. e.vance@enterprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e]"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Telephone Number <span className="text-[#ddf0ec]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e]"
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Company / Organization (Optional)
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Global Ltd"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e]"
                  />
                </div>
              </div>

              {/* Practice Area & Contact Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Relevant Practice Area
                  </label>
                  <select
                    value={practiceArea}
                    onChange={(e) => setPracticeArea(e.target.value as PracticeAreaId)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/25 border border-white/20 text-sm text-white focus:outline-none focus:border-[#ddf0ec]"
                  >
                    {practiceAreasData.map((pa) => (
                      <option key={pa.id} value={pa.id}>
                        {pa.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['email', 'phone', 'video'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPreferredContact(method)}
                        className={`py-2 text-xs font-medium rounded-xl capitalize border transition-all cursor-pointer ${
                          preferredContact === method
                            ? 'bg-[#183f6e] text-[#ddf0ec] border-[#183f6e] font-semibold'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Requested Consultation Date (Optional)
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-[#183f6e]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Brief Overview of Matter <span className="text-[#ddf0ec]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please provide key dates, counterparties, or summary facts. Avoid disclosing third-party trade secrets."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e]"
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Secure Document Upload */}
              <div className="pt-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Confidential Document Upload (Optional — PDF, DOCX, JPG up to 15MB)
                </label>
                <div className="relative border-2 border-dashed border-white/15 hover:border-[#183f6e]/60 rounded-2xl p-4 text-center transition-colors">
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload legal document"
                  />
                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-300">
                      <FileText className="w-4 h-4 text-[#ddf0ec]" />
                      <span className="text-white font-semibold">{uploadedFile.name}</span>
                      <span className="text-slate-400 font-mono">
                        ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-xs text-slate-400">
                      <Upload className="w-5 h-5 text-[#ddf0ec]" />
                      <span>Drag &amp; drop or click to attach relevant files</span>
                      <span className="text-[10px] text-slate-500">256-bit AES encryption applied upon submission</span>
                    </div>
                  )}
                </div>
                {uploadError && (
                  <div className="flex items-center gap-1.5 text-[11px] text-rose-400 mt-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{uploadError}</span>
                  </div>
                )}
              </div>

              {/* Legal Notice */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-400 leading-relaxed">
                <p>
                  <strong>Notice:</strong> Submitting this consultation request does not establish an advocate-client relationship until formal engagement is confirmed. If this is an urgent court injunction or time-sensitive matter, please contact our advocates directly at <strong>+254 716 954 112</strong> or <strong>+254 780 323 657</strong>.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="gold-bg-btn w-full py-3.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Encrypting &amp; Submitting...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#ddf0ec]" />
                      <span>Submit Confidential Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
