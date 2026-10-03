/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { ArrowUp } from 'lucide-react';

// Lazy Loaded Below-the-Fold Homepage Sections
const PracticeAreaStrip = lazy(() =>
  import('./components/sections/PracticeAreaStrip').then((m) => ({ default: m.PracticeAreaStrip }))
);
const IntroAttorneysSection = lazy(() =>
  import('./components/sections/IntroAttorneysSection').then((m) => ({ default: m.IntroAttorneysSection }))
);
const PracticeAreasSection = lazy(() =>
  import('./components/sections/PracticeAreasSection').then((m) => ({ default: m.PracticeAreasSection }))
);
const TeamSection = lazy(() =>
  import('./components/sections/TeamSection').then((m) => ({ default: m.TeamSection }))
);
const InsightsFaqSection = lazy(() =>
  import('./components/sections/InsightsFaqSection').then((m) => ({ default: m.InsightsFaqSection }))
);
const FinalCtaSection = lazy(() =>
  import('./components/sections/FinalCtaSection').then((m) => ({ default: m.FinalCtaSection }))
);
const GiantTypographicFooter = lazy(() =>
  import('./components/sections/GiantTypographicFooter').then((m) => ({ default: m.GiantTypographicFooter }))
);

// Lazy Loaded Pages
const ContactPage = lazy(() =>
  import('./components/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);
const PublicationsPage = lazy(() =>
  import('./components/pages/PublicationsPage').then((m) => ({ default: m.PublicationsPage }))
);
const InsightArticlePage = lazy(() =>
  import('./components/pages/InsightArticlePage').then((m) => ({ default: m.InsightArticlePage }))
);
const PracticeAreaPage = lazy(() =>
  import('./components/pages/PracticeAreaPage').then((m) => ({ default: m.PracticeAreaPage }))
);

// Lazy Loaded Interactive Modals
const PracticeDetailModal = lazy(() =>
  import('./components/modals/PracticeDetailModal').then((m) => ({ default: m.PracticeDetailModal }))
);
const CaseStudyModal = lazy(() =>
  import('./components/modals/CaseStudyModal').then((m) => ({ default: m.CaseStudyModal }))
);
const SearchModal = lazy(() =>
  import('./components/modals/SearchModal').then((m) => ({ default: m.SearchModal }))
);
const AdminCmsModal = lazy(() =>
  import('./components/modals/AdminCmsModal').then((m) => ({ default: m.AdminCmsModal }))
);
const LegalTermsModal = lazy(() =>
  import('./components/modals/LegalTermsModal').then((m) => ({ default: m.LegalTermsModal }))
);
const AttorneyProfileModal = lazy(() =>
  import('./components/modals/AttorneyProfileModal').then((m) => ({ default: m.AttorneyProfileModal }))
);
const ConsultationModal = lazy(() =>
  import('./components/modals/ConsultationModal').then((m) => ({ default: m.ConsultationModal }))
);

// Dedicated Fallback Indicators for Lazy Loaded Components
const PageLoadingFallback = () => (
  <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-24 bg-[#f8fafc]" aria-busy="true">
    <div className="w-12 h-12 rounded-2xl bg-[#183f6e] flex items-center justify-center text-[#ddf0ec] shadow-lg mb-4">
      <div className="w-6 h-6 border-2 border-[#ddf0ec] border-t-transparent rounded-full animate-spin" />
    </div>
    <span className="text-xs font-semibold uppercase tracking-widest text-[#183f6e]">
      Loading Wafula Advocates...
    </span>
  </div>
);

const SectionLoadingFallback: React.FC<{ minHeight?: string; label?: string }> = ({
  minHeight = '240px',
  label,
}) => (
  <div
    style={{ minHeight }}
    className="w-full flex flex-col items-center justify-center p-8 bg-slate-50/60 border-b border-slate-200/50"
    aria-busy="true"
    aria-label={label ? `Loading ${label}` : 'Loading content'}
  >
    <div className="w-6 h-6 rounded-full border-2 border-[#183f6e]/20 border-t-[#183f6e] animate-spin mb-2" />
    {label && (
      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
        Loading {label}...
      </span>
    )}
  </div>
);

const FooterLoadingFallback = () => (
  <div className="w-full min-h-[260px] bg-[#183f6e] border-t border-white/20 flex flex-col items-center justify-center p-8" aria-busy="true">
    <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-[#ddf0ec] animate-spin mb-2" />
    <span className="text-xs uppercase tracking-widest text-slate-300 font-medium">
      Wafula PW &amp; Co. Advocates
    </span>
  </div>
);

const ModalLoadingFallback = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-150" aria-busy="true">
    <div className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-[#183f6e] border border-white/20 shadow-2xl">
      <div className="w-8 h-8 border-2 border-[#ddf0ec] border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-medium text-slate-300">Loading...</span>
    </div>
  </div>
);

// Data & Types
import {
  practiceAreasData,
  attorneysData,
  firmStatsData,
  legalArticlesData,
} from './data/mockData';
import {
  Attorney,
  CaseStudy,
  ConsultationSubmission,
  FirmStats,
  LegalArticle,
  PracticeArea,
  PracticeAreaId,
} from './types';

export type AppView = 'home' | 'contact' | 'publications' | 'article' | 'practice';

export default function App() {
  // Page view state: 'home' | 'contact' | 'publications' | 'article' | 'practice'
  const [currentView, setCurrentView] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#contact') return 'contact';
      if (hash === '#publications' || hash === '#insights-hub') return 'publications';
      if (
        hash.startsWith('#insight-') ||
        hash.startsWith('#article-') ||
        hash.startsWith('#publication-')
      ) {
        return 'article';
      }
      if (hash.startsWith('#practice-') || hash.startsWith('#discipline-')) {
        return 'practice';
      }
    }
    return 'home';
  });

  // Active practice area for dedicated full-page view
  const [activePractice, setActivePractice] = useState<PracticeArea>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash.startsWith('#practice-') || hash.startsWith('#discipline-')) {
        const slugOrId = hash.replace(/^#(practice|discipline)-/, '');
        const match = practiceAreasData.find((p) => p.id === slugOrId);
        if (match) return match;
      }
    }
    return practiceAreasData[0];
  });

  // Active article for dedicated full-page reader
  const [activeArticle, setActiveArticle] = useState<LegalArticle>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (
        hash.startsWith('#insight-') ||
        hash.startsWith('#article-') ||
        hash.startsWith('#publication-')
      ) {
        const slugOrId = hash.replace(/^#(insight|article|publication)-/, '');
        const match = legalArticlesData.find(
          (a) => a.slug === slugOrId || a.id === slugOrId
        );
        if (match) return match;
      }
    }
    return legalArticlesData[0];
  });

  // Modal states
  const [initialPracticeId, setInitialPracticeId] = useState<PracticeAreaId | undefined>();
  const [selectedPractice, setSelectedPractice] = useState<PracticeArea | null>(null);
  const [selectedAttorney, setSelectedAttorney] = useState<Attorney | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [consultationModalPracticeId, setConsultationModalPracticeId] = useState<PracticeAreaId | undefined>();
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'disclaimer' | null>(null);

  // App data state (editable via CMS)
  const [stats, setStats] = useState<FirmStats>(firmStatsData);
  const [submissions, setSubmissions] = useState<ConsultationSubmission[]>([
    {
      id: 'SUB-K84A12',
      fullName: 'David K. Maina',
      email: 'd.maina@apexholdings.co.ke',
      phone: '+254 722 819 044',
      company: 'Apex Logistics & Energy Ltd',
      practiceArea: 'dispute-resolution',
      preferredContact: 'phone',
      preferredDate: '2026-10-14',
      message: 'Urgent commercial litigation review required: defending against an ex-parte injunction sought by a defaulted equipment contractor before the Milimani Commercial Court.',
      uploadedFileName: 'Plaint_and_Application_Copy.pdf',
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      status: 'new',
    },
    {
      id: 'SUB-L91D78',
      fullName: 'Dr. Jane W. Ndung’u',
      email: 'j.ndungu@globalhealth.org',
      phone: '+44 7911 123456',
      company: 'Diaspora Property Investment Syndicate',
      practiceArea: 'real-estate-conveyancing',
      preferredContact: 'video',
      preferredDate: '2026-10-18',
      message: 'Seeking legal due diligence, title search on Ardhisasa, and contract drafting for the acquisition of 5 acres prime commercial land along Kiambu Road.',
      timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
      status: 'reviewed',
    },
  ]);

  // Featured partner for overview section
  const featuredAttorney = attorneysData[0]; // Wafula Paul

  // Smart Preload function for instantaneous navigation
  const preloadComponent = useCallback((key: string) => {
    switch (key) {
      case 'contact':
        import('./components/pages/ContactPage');
        break;
      case 'publications':
      case 'insights':
        import('./components/pages/PublicationsPage');
        import('./components/pages/InsightArticlePage');
        break;
      case 'practice':
      case 'practice-areas':
        import('./components/pages/PracticeAreaPage');
        break;
      case 'team':
        import('./components/sections/TeamSection');
        break;
      case 'about':
        import('./components/sections/IntroAttorneysSection');
        break;
      default:
        break;
    }
  }, []);

  // Idle Preload of core pages after initial render for zero-latency clicks
  useEffect(() => {
    const idleCallback =
      typeof window !== 'undefined' && 'requestIdleCallback' in window
        ? (window as any).requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 1200);

    const handle = idleCallback(() => {
      import('./components/pages/ContactPage');
      import('./components/pages/PublicationsPage');
      import('./components/pages/PracticeAreaPage');
    });

    return () => {
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window && typeof handle === 'number') {
        (window as any).cancelIdleCallback(handle);
      }
    };
  }, []);

  // Floating Back-to-Top Button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Robust instant scrolling to target section with support for lazy loaded components
  const scrollToTarget = useCallback((targetId: string) => {
    let attempts = 0;
    const maxAttempts = 30; // 30 * 50ms = 1.5s max polling
    const checkAndScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkAndScroll, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    checkAndScroll();
  }, []);

  // Hash change synchronization for smooth URL and browser history support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#contact') {
        setCurrentView('contact');
      } else if (hash === '#publications' || hash === '#insights-hub') {
        setCurrentView('publications');
      } else if (
        hash.startsWith('#insight-') ||
        hash.startsWith('#article-') ||
        hash.startsWith('#publication-')
      ) {
        const slugOrId = hash.replace(/^#(insight|article|publication)-/, '');
        const match = legalArticlesData.find(
          (a) => a.slug === slugOrId || a.id === slugOrId
        );
        if (match) {
          setActiveArticle(match);
        }
        setCurrentView('article');
      } else if (hash.startsWith('#practice-') || hash.startsWith('#discipline-')) {
        const slugOrId = hash.replace(/^#(practice|discipline)-/, '');
        const match = practiceAreasData.find((p) => p.id === slugOrId);
        if (match) {
          setActivePractice(match);
        }
        setCurrentView('practice');
      } else if (hash === '#about' || hash === '#practice-areas' || hash === '#team' || hash === '#insights') {
        setCurrentView('home');
        scrollToTarget(hash.replace('#', ''));
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scrollToTarget]);

  // Global keyboard shortcuts (Cmd+K for search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateContact = (practiceId?: string) => {
    if (practiceId) {
      setInitialPracticeId(practiceId as PracticeAreaId);
    }
    setSelectedPractice(null);
    setCurrentView('contact');
    window.location.hash = '#contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPracticePage = (practice: PracticeArea) => {
    setActivePractice(practice);
    setSelectedPractice(null);
    setCurrentView('practice');
    window.location.hash = `#practice-${practice.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticle = (article: LegalArticle) => {
    setActiveArticle(article);
    setCurrentView('article');
    window.location.hash = `#insight-${article.slug || article.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePublications = () => {
    setCurrentView('publications');
    window.location.hash = '#publications';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultationModal = (practiceId?: string) => {
    setConsultationModalPracticeId((practiceId as PracticeAreaId) || initialPracticeId || 'corporate-commercial');
    setIsConsultationModalOpen(true);
  };

  const handleConsultationSuccess = (newSub: ConsultationSubmission) => {
    setSubmissions((prev) => [newSub, ...prev]);
  };

  const handleNavigateSection = (sectionId?: string) => {
    if (sectionId === 'contact') {
      handleNavigateContact();
      return;
    }

    if (sectionId === 'publications') {
      handleNavigatePublications();
      return;
    }

    const targetId = sectionId || 'hero';

    if (currentView !== 'home') {
      setCurrentView('home');
      window.location.hash = targetId === 'hero' ? '' : `#${targetId}`;
      requestAnimationFrame(() => {
        scrollToTarget(targetId);
      });
    } else {
      window.location.hash = targetId === 'hero' ? '' : `#${targetId}`;
      scrollToTarget(targetId);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#183f6e] selection:bg-[#ddf0ec] selection:text-[#183f6e]">
      {/* Floating Top Navbar (Eagerly Loaded for Immediate Interaction) */}
      <Navbar
        currentView={currentView}
        onOpenConsultation={() => handleNavigateContact()}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onNavigateSection={handleNavigateSection}
        onPreloadSection={preloadComponent}
      />

      <main className="w-full overflow-hidden">
        {currentView === 'contact' ? (
          /* Dedicated Contact & Consultation Page (Lazy Loaded) */
          <Suspense fallback={<PageLoadingFallback />}>
            <ContactPage
              initialPracticeId={initialPracticeId}
              onSubmitSuccess={handleConsultationSuccess}
              onNavigateHome={handleNavigateSection}
              onOpenPrivacy={() => setLegalModalType('privacy')}
              onOpenTerms={() => setLegalModalType('terms')}
              onOpenDisclaimer={() => setLegalModalType('disclaimer')}
            />
          </Suspense>
        ) : currentView === 'publications' ? (
          /* Dedicated Publications & Legal Knowledge Hub Page (Lazy Loaded) */
          <Suspense fallback={<PageLoadingFallback />}>
            <PublicationsPage
              onSelectArticle={handleOpenArticle}
              onNavigateHome={handleNavigateSection}
              onOpenConsultation={() => handleNavigateContact()}
            />
          </Suspense>
        ) : currentView === 'article' ? (
          /* Dedicated Article / Insight Reader Full Page View (Lazy Loaded) */
          <Suspense fallback={<PageLoadingFallback />}>
            <InsightArticlePage
              article={activeArticle}
              onNavigateHome={handleNavigateSection}
              onNavigatePublications={handleNavigatePublications}
              onSelectArticle={handleOpenArticle}
              onOpenConsultation={() => handleNavigateContact()}
            />
          </Suspense>
        ) : currentView === 'practice' ? (
          /* Dedicated Core Practice Discipline Full Page View (Lazy Loaded) */
          <Suspense fallback={<PageLoadingFallback />}>
            <PracticeAreaPage
              practice={activePractice}
              onSelectPractice={handleOpenPracticePage}
              onNavigateHome={handleNavigateSection}
              onOpenConsultation={(pid) => handleNavigateContact(pid)}
              onSelectAttorney={(att) => setSelectedAttorney(att)}
              onSelectCaseStudy={(cs) => setSelectedCaseStudy(cs)}
              onSelectArticle={(art) => handleOpenArticle(art)}
            />
          </Suspense>
        ) : (
          /* Main Homepage Sections */
          <>
            {/* 1. Hero Section (Above-the-fold Eagerly Loaded for Instant FCP/LCP) */}
            <HeroSection
              onOpenConsultation={() => handleNavigateContact()}
              onExplorePractices={() => handleNavigateSection('practice-areas')}
            />

            {/* 2. Practice Area Quick Horizontal Navigation Strip (Lazy Loaded) */}
            <Suspense fallback={<SectionLoadingFallback minHeight="60px" label="Practice Navigation" />}>
              <PracticeAreaStrip onSelectPractice={handleOpenPracticePage} />
            </Suspense>

            {/* 3. Firm Overview / About The Firm Section (Lazy Loaded) */}
            <div id="about" className="scroll-mt-16">
              <Suspense fallback={<SectionLoadingFallback minHeight="380px" label="About The Firm" />}>
                <IntroAttorneysSection
                  stats={stats}
                  featuredAttorney={featuredAttorney}
                  onSelectAttorney={() => setSelectedAttorney(featuredAttorney)}
                  onViewAllTeam={() => handleNavigateSection('team')}
                  onOpenConsultation={() => handleNavigateContact()}
                  onExplorePractices={() => handleNavigateSection('practice-areas')}
                />
              </Suspense>
            </div>

            {/* 4. Practice Areas Section ("Explore Our Comprehensive Legal Solutions") (Lazy Loaded) */}
            <div id="practice-areas" className="scroll-mt-16 w-full bg-[#f1f5f9]">
              <Suspense fallback={<SectionLoadingFallback minHeight="420px" label="Practice Solutions" />}>
                <PracticeAreasSection
                  practices={practiceAreasData}
                  onSelectPractice={handleOpenPracticePage}
                />
              </Suspense>
            </div>

            {/* 5. Legal Leadership & Advocates Section - Dedicated Profile for Wafula Paul (Lazy Loaded) */}
            <div id="team" className="scroll-mt-16">
              <Suspense fallback={<SectionLoadingFallback minHeight="480px" label="Legal Leadership" />}>
                <TeamSection
                  attorneys={attorneysData}
                  attorney={attorneysData[0]}
                  onSelectAttorney={(att) => setSelectedAttorney(att)}
                  onOpenConsultation={() => handleNavigateContact()}
                />
              </Suspense>
            </div>

            {/* 6. Insights & FAQs Section (Lazy Loaded) */}
            <div id="insights" className="scroll-mt-16">
              <Suspense fallback={<SectionLoadingFallback minHeight="360px" label="Legal Insights" />}>
                <InsightsFaqSection
                  onSelectArticle={handleOpenArticle}
                  onViewAllPublications={handleNavigatePublications}
                  onOpenConsultation={() => handleNavigateContact()}
                />
              </Suspense>
            </div>

            {/* 9. Final Call To Action Section (Lazy Loaded) */}
            <Suspense fallback={<SectionLoadingFallback minHeight="220px" label="Call To Action" />}>
              <FinalCtaSection
                onOpenConsultation={() => handleNavigateContact()}
              />
            </Suspense>
          </>
        )}

        {/* 10. Dramatic Giant Typographic "JUSTICE" Footer (Lazy Loaded) */}
        <Suspense fallback={<FooterLoadingFallback />}>
          <GiantTypographicFooter
            onOpenPrivacy={() => setLegalModalType('privacy')}
            onOpenTerms={() => setLegalModalType('terms')}
            onOpenDisclaimer={() => setLegalModalType('disclaimer')}
            onNavigateSection={handleNavigateSection}
            onOpenContact={() => handleNavigateContact()}
            onSelectPractice={handleOpenPracticePage}
          />
        </Suspense>
      </main>

      {/* Interactive Modals (Lazy Loaded on Demand with Smooth Fallback) */}
      {selectedPractice && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <PracticeDetailModal
            practice={selectedPractice}
            onClose={() => setSelectedPractice(null)}
            onBookConsultation={(pid) => handleNavigateContact(pid)}
            onSelectAttorney={(att) => {
              setSelectedPractice(null);
              setSelectedAttorney(att);
            }}
          />
        </Suspense>
      )}

      {selectedAttorney && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <AttorneyProfileModal
            attorney={selectedAttorney}
            onClose={() => setSelectedAttorney(null)}
            onBookWithAttorney={(att) => {
              setSelectedAttorney(null);
              handleNavigateContact();
            }}
          />
        </Suspense>
      )}

      {selectedCaseStudy && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <CaseStudyModal
            caseStudy={selectedCaseStudy}
            onClose={() => setSelectedCaseStudy(null)}
            onOpenConsultation={() => {
              setSelectedCaseStudy(null);
              handleOpenConsultationModal(selectedCaseStudy.practiceArea.toLowerCase().replace(/\s+/g, '-'));
            }}
          />
        </Suspense>
      )}

      {isSearchOpen && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
            onSelectPractice={(p) => {
              setIsSearchOpen(false);
              handleOpenPracticePage(p);
            }}
            onSelectAttorney={(a) => {
              setIsSearchOpen(false);
              setSelectedAttorney(a);
            }}
            onSelectArticle={(art) => {
              setIsSearchOpen(false);
              handleOpenArticle(art);
            }}
            onSelectCaseStudy={(cs) => setSelectedCaseStudy(cs)}
          />
        </Suspense>
      )}

      {isAdminOpen && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <AdminCmsModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            stats={stats}
            onUpdateStats={(newStats) => setStats(newStats)}
            submissions={submissions}
            onUpdateSubmissionStatus={(id, status) => {
              setSubmissions((prev) =>
                prev.map((s) => (s.id === id ? { ...s, status } : s))
              );
            }}
          />
        </Suspense>
      )}

      {isConsultationModalOpen && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <ConsultationModal
            isOpen={isConsultationModalOpen}
            onClose={() => setIsConsultationModalOpen(false)}
            onSubmitSuccess={(sub) => {
              handleConsultationSuccess(sub);
            }}
            initialPracticeId={consultationModalPracticeId}
          />
        </Suspense>
      )}

      {legalModalType && (
        <Suspense fallback={<ModalLoadingFallback />}>
          <LegalTermsModal
            type={legalModalType}
            onClose={() => setLegalModalType(null)}
          />
        </Suspense>
      )}

      {/* Floating Scroll to Top Navigation Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top"
          title="Back to Top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#183f6e] hover:bg-[#123157] text-[#ddf0ec] hover:text-white shadow-xl flex items-center justify-center border border-white/20 transition-all duration-200 cursor-pointer animate-in fade-in zoom-in-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e]"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
