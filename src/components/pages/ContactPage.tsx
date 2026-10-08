import React, { useState } from 'react';
import { PracticeAreaId, ConsultationSubmission } from '../../types';
import { practiceAreasData } from '../../data/mockData';
import { ShieldCheck, Phone, Mail, MapPin, ArrowLeft, CheckCircle2, Clock, FileText, Upload } from 'lucide-react';
import { GoldStar } from '../ui/JusticeLogo';

interface ContactPageProps {
  initialPracticeId?: PracticeAreaId;
  onSubmitSuccess: (submission: ConsultationSubmission) => void;
  onNavigateHome: (sectionId?: string) => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenDisclaimer: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  initialPracticeId,
  onSubmitSuccess,
  onNavigateHome,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [practiceArea, setPracticeArea] = useState<PracticeAreaId>(initialPracticeId || 'dispute-resolution');
  const [preferredContact, setPreferredContact] = useState<'email' | 'phone' | 'video'>('email');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState<ConsultationSubmission | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) return;

    const sub: ConsultationSubmission = {
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

    onSubmitSuccess(sub);
    setSubmitted(sub);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigateHome('hero')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#183f6e] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Chambers Details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 mb-3.5">
                <GoldStar className="w-3 h-3 text-[#183f6e]" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#183f6e]">
                  Privileged Legal Intake
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0a111a] tracking-tight mb-4">
                Consult Wafula PW &amp; Company Advocates
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connect directly with our managing partner and litigation counsel. We provide prompt, strategic case appraisal under full attorney-client confidentiality.
              </p>
            </div>

            {/* Chambers Directory Card */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#183f6e]">
                Chambers Contact Directory
              </h3>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <MapPin className="w-4 h-4 text-[#183f6e] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Physical Chambers:</strong>
                  Milimani Commercial Court Registry Vicinity, Nairobi, Kenya
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <Phone className="w-4 h-4 text-[#183f6e] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Direct Telephone Lines:</strong>
                  <a href="tel:+254716954112" className="hover:text-[#183f6e] block font-mono">
                    +254 716 954 112
                  </a>
                  <a href="tel:+254780323657" className="hover:text-[#183f6e] block font-mono">
                    +254 780 323 657
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                <Mail className="w-4 h-4 text-[#183f6e] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Chambers Registry Email:</strong>
                  <a href="mailto:info@wafulapwadvocates.com" className="hover:text-[#183f6e] font-mono">
                    info@wafulapwadvocates.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 pt-3 border-t border-slate-100">
                <Clock className="w-4 h-4 text-[#183f6e] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-semibold">Working Registry Hours:</strong>
                  Monday – Friday: 8:00 AM – 5:30 PM (EAT)<br />
                  Emergency Duty Judge Injunctions: 24/7
                </div>
              </div>
            </div>

            {/* Privilege Note */}
            <div className="p-4 rounded-2xl bg-[#ddf0ec]/40 border border-[#ddf0ec] text-xs text-[#183f6e] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
              <span>
                All inquiries submitted are treated with strict confidentiality in accordance with the Law Society of Kenya Code of Conduct.
              </span>
            </div>
          </div>

          {/* Right Column: Intake Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-md text-center">
                <div className="w-16 h-16 rounded-full bg-[#183f6e]/10 text-[#183f6e] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#0a111a] mb-2">
                  Inquiry Successfully Received
                </h3>
                <p className="text-xs font-mono text-[#183f6e] mb-4">
                  Reference: {submitted.id}
                </p>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-8">
                  Thank you, <strong>{submitted.fullName}</strong>. Your matter has been routed to our managing advocate for prompt preliminary conflict audit.
                </p>
                <button
                  onClick={() => setSubmitted(null)}
                  className="px-6 py-2.5 rounded-full bg-[#183f6e] text-white text-xs font-semibold cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4"
              >
                <h3 className="text-xl font-bold text-[#0a111a] mb-2">
                  Confidential Intake &amp; Case Brief
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. John K. Kamau"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#183f6e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="j.kamau@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#183f6e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+254 722 000 000"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#183f6e]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Nexus Capital Ltd"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#183f6e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Practice Discipline
                    </label>
                    <select
                      value={practiceArea}
                      onChange={(e) => setPracticeArea(e.target.value as PracticeAreaId)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#183f6e]"
                    >
                      {practiceAreasData.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Contact Channel
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['email', 'phone', 'video'] as const).map((channel) => (
                        <button
                          type="button"
                          key={channel}
                          onClick={() => setPreferredContact(channel)}
                          className={`py-2 text-xs font-semibold rounded-xl capitalize border transition-all cursor-pointer ${
                            preferredContact === channel
                              ? 'bg-[#183f6e] text-white border-[#183f6e]'
                              : 'bg-slate-50 text-slate-600 border-slate-200'
                          }`}
                        >
                          {channel}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Summary of Legal Matter *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide relevant background, parties involved, or key timelines..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#183f6e]"
                  />
                </div>

                {/* Upload File */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Attach Relevant Brief / Document (Optional)
                  </label>
                  <label className="border-2 border-dashed border-slate-300 hover:border-[#183f6e] rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors text-xs text-slate-500">
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) setUploadedFile(f);
                      }}
                    />
                    {uploadedFile ? (
                      <span className="text-[#183f6e] font-semibold flex items-center gap-1.5">
                        <FileText className="w-4 h-4" /> {uploadedFile.name}
                      </span>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 text-slate-400" />
                        <span>Upload PDF, Word, or Scanned Image (Max 15MB)</span>
                      </>
                    )}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#183f6e] hover:bg-[#123157] text-white text-sm font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#ddf0ec]" />
                  <span>Submit Confidential Intake</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
