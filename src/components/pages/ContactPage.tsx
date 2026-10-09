import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { ConsultationSubmission, PracticeAreaId } from '../../types';
import { practiceAreasData } from '../../data/mockData';

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
  onOpenPrivacy,
  onOpenTerms,
  onOpenDisclaimer,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPracticeId, setSelectedPracticeId] = useState<PracticeAreaId>(() => {
    return initialPracticeId || 'corporate-commercial';
  });
  const [subject, setSubject] = useState(() => {
    if (initialPracticeId) {
      const match = practiceAreasData.find((p) => p.id === initialPracticeId);
      return match ? match.name : '';
    }
    return '';
  });
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sync if initialPracticeId changes
  useEffect(() => {
    if (initialPracticeId) {
      setSelectedPracticeId(initialPracticeId);
      const match = practiceAreasData.find((p) => p.id === initialPracticeId);
      if (match) setSubject(match.name);
    }
  }, [initialPracticeId]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 5) {
      errs.message = 'Please enter your message.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const submission: ConsultationSubmission = {
      id: `MSG-${Date.now().toString(36).toUpperCase()}`,
      fullName: name.trim(),
      email: email.trim(),
      phone: phone.trim() || 'Not specified',
      practiceArea: selectedPracticeId,
      preferredContact: 'email',
      message: subject ? `[Subject: ${subject}]\n\n${message.trim()}` : message.trim(),
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    onSubmitSuccess(submission);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="w-full bg-[#f8fafc] text-[#183f6e] pb-20 selection:bg-[#ddf0ec] selection:text-[#183f6e]">
      {/* 1. Header Banner */}
      <section data-nav-theme="blue" className="relative bg-[#183f6e] text-white pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient subtle glow matching firm identity */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#ddf0ec]/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-300 mb-4 font-medium" aria-label="Breadcrumb">
            <button
              onClick={() => onNavigateHome('hero')}
              className="hover:text-[#ddf0ec] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#ddf0ec] font-medium">Contact</span>
          </nav>

          <span className="text-xs uppercase tracking-widest font-bold text-[#ddf0ec] block mb-2">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            Contact Us
          </h1>
          <p className="text-slate-200/90 text-sm sm:text-base max-w-xl leading-relaxed">
            We would love to hear from you. Send us a message using the form below or reach our chambers directly.
          </p>
        </div>
      </section>

      {/* 2. Main Content: Location & Contact on Left, Send Us a Message on Right (Equal Heights with Space In-Between) */}
      <section data-nav-theme="white" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Card: Location and Contact (White Background) */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 h-full">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a111a] mb-6">
                  Location &amp; Contact
                </h2>

                {/* Contact Items List */}
                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-[#ddf0ec]/70 text-[#183f6e] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="text-xs sm:text-sm">
                      <strong className="block text-slate-900 font-semibold mb-0.5">Physical Address</strong>
                      <p className="text-slate-700">MCMX Building, First Floor</p>
                      <p className="text-slate-600">Off Kiambu Road, Nairobi</p>
                      <p className="text-slate-500 text-xs mt-0.5">P.O. Box 22594 – 00400 Nairobi, Kenya</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-[#ddf0ec]/70 text-[#183f6e] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="text-xs sm:text-sm">
                      <strong className="block text-slate-900 font-semibold mb-0.5">Phone Lines</strong>
                      <div className="space-y-0.5">
                        <div>
                          <a href="tel:+254716954112" className="text-slate-800 hover:text-[#183f6e] font-semibold transition-colors">
                            +254 716 954 112
                          </a>
                        </div>
                        <div>
                          <a href="tel:+254780323657" className="text-slate-800 hover:text-[#183f6e] font-semibold transition-colors">
                            +254 780 323 657
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-[#ddf0ec]/70 text-[#183f6e] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="text-xs sm:text-sm">
                      <strong className="block text-slate-900 font-semibold mb-0.5">Official Email</strong>
                      <a
                        href="mailto:info@wafulapwadvocates.com"
                        className="text-[#183f6e] font-semibold hover:underline break-all"
                      >
                        info@wafulapwadvocates.com
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-[#ddf0ec]/70 text-[#183f6e] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="text-xs sm:text-sm">
                      <strong className="block text-slate-900 font-semibold mb-0.5">Working Hours</strong>
                      <p className="text-slate-700">Monday – Friday: 8:00 AM – 5:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Quick Chat */}
                <div className="mt-5">
                  <a
                    href="https://wa.me/254716954112?text=Hello%20Wafula%20Advocates,%20I%20would%20like%20to%20get%20in%20touch."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Interactive Kiambu Road Office Map */}
              <div className="pt-5 border-t border-slate-200 flex-1 flex flex-col min-h-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#183f6e]" />
                    Kiambu Road Map
                  </span>
                  <a
                    href="https://maps.google.com/?q=Kiambu+Road+Nairobi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#183f6e] hover:underline"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="w-full flex-1 min-h-[160px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-inner">
                  <iframe
                    title="Wafula PW Advocates Office Location"
                    src="https://maps.google.com/maps?q=Kiambu+Road+Nairobi+Kenya&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Card: Send Us a Message Form (White Background, Equal Height) */}
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
              {isSuccess ? (
                /* Clean Success Message */
                <div className="h-full flex flex-col items-center justify-center text-center py-12 my-auto">
                  <div className="w-16 h-16 rounded-full bg-[#ddf0ec] text-[#183f6e] flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#183f6e] mb-2">
                    Message Sent Successfully
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, <strong className="text-slate-900">{name}</strong>. Your inquiry has been received and routed to our legal advocates. We will review and respond promptly.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="px-6 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <button
                      onClick={() => onNavigateHome('hero')}
                      className="gold-bg-btn px-6 py-2.5 rounded-full text-xs font-semibold cursor-pointer"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              ) : (
                /* Clean Form on White Background */
                <div className="h-full flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0a111a] mb-1">
                      Send Us a Message
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-5">
                      Fill in your details below and our advocates will get back to you promptly.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#183f6e] placeholder-slate-400 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e] transition-colors"
                        />
                        {errors.name && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Email Address <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#183f6e] placeholder-slate-400 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e] transition-colors"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>
                        )}
                      </div>

                      {/* Phone Number (Below Email) */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Phone Number <span className="text-slate-400">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+254 700 000 000"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#183f6e] placeholder-slate-400 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e] transition-colors"
                        />
                      </div>

                      {/* Practice Area */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Practice Area
                        </label>
                        <select
                          value={selectedPracticeId}
                          onChange={(e) => {
                            const val = e.target.value as PracticeAreaId;
                            setSelectedPracticeId(val);
                            const match = practiceAreasData.find((p) => p.id === val);
                            if (match && !subject) setSubject(match.name);
                          }}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#183f6e] bg-white focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e] transition-colors"
                        >
                          {practiceAreasData.map((pa) => (
                            <option key={pa.id} value={pa.id}>
                              {pa.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Subject / Matter Summary (Below Practice Area) */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Subject / Matter Summary <span className="text-slate-400">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          placeholder="e.g. Commercial Litigation or Conveyancing"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-[#183f6e] placeholder-slate-400 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e] transition-colors"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1">
                          Message <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          rows={6}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="How can we assist you with your legal matter?"
                          className="w-full min-h-[155px] px-4 py-3 rounded-xl border border-slate-200 text-sm text-[#183f6e] placeholder-slate-400 focus:outline-none focus:border-[#183f6e] focus:ring-1 focus:ring-[#183f6e] transition-colors leading-relaxed resize-y"
                        />
                        {errors.message && (
                          <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>
                        )}
                      </div>

                      {/* Legal Notice & Policy Disclosures */}
                      <div className="text-[11px] text-slate-500 leading-relaxed pt-1 flex flex-wrap gap-x-2 gap-y-1">
                        <span>Confidentiality guaranteed. Read our</span>
                        <button
                          type="button"
                          onClick={onOpenPrivacy}
                          className="text-[#183f6e] font-semibold hover:underline cursor-pointer"
                        >
                          Privacy Policy
                        </button>
                        <span>·</span>
                        <button
                          type="button"
                          onClick={onOpenTerms}
                          className="text-[#183f6e] font-semibold hover:underline cursor-pointer"
                        >
                          Terms of Service
                        </button>
                        <span>·</span>
                        <button
                          type="button"
                          onClick={onOpenDisclaimer}
                          className="text-[#183f6e] font-semibold hover:underline cursor-pointer"
                        >
                          Advocate Disclaimer
                        </button>
                      </div>
                    </div>

                    {/* Bottom Area: Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="gold-bg-btn w-full sm:w-auto px-8 py-3 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md hover:shadow-lg disabled:opacity-75"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-[#183f6e] border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </section>
    </div>
  );
};
