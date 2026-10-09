import React, { useState, useEffect, useRef } from 'react';
import { JusticeLogo, WafulaLogoMonogram } from '../ui/JusticeLogo';
import {
  Menu,
  X,
  Search,
  Phone,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Building2,
  Gavel,
  Home,
  Briefcase,
  ShieldAlert,
  Scale,
} from 'lucide-react';
import { practiceAreasData } from '../../data/mockData';
import { PracticeArea } from '../../types';

interface NavbarProps {
  currentView?: 'home' | 'contact' | 'publications' | 'article' | 'practice';
  activeSection?: string;
  activePractice?: PracticeArea;
  onOpenConsultation: () => void;
  onOpenSearch?: () => void;
  onOpenAdmin?: () => void;
  onNavigateSection: (sectionId: string) => void;
  onSelectPractice?: (practice: PracticeArea) => void;
  onPreloadSection?: (sectionId: string) => void;
  whiteBg?: boolean;
}

const getPracticeIcon = (iconName: string) => {
  switch (iconName) {
    case 'Building2':
      return Building2;
    case 'Gavel':
      return Gavel;
    case 'Home':
      return Home;
    case 'Briefcase':
      return Briefcase;
    case 'ShieldAlert':
      return ShieldAlert;
    case 'Scale':
    default:
      return Scale;
  }
};

const practiceSubtitles: Record<string, string> = {
  'corporate-commercial': 'M&A, corporate governance, FDI & licensing',
  'dispute-resolution': 'High Court litigation, commercial arbitration & appeals',
  'real-estate-conveyancing': 'Property transfers, land searches & securities',
  'employment-labour': 'HR compliance, labour relations & ELRC defense',
  'intellectual-property': 'Trademarks, patents, IP protection & anti-counterfeiting',
  'cross-border-international': 'Foreign investment, regional trade & diaspora advisory',
};

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'home',
  activePractice,
  onOpenConsultation,
  onOpenSearch,
  onNavigateSection,
  onSelectPractice,
  onPreloadSection,
  whiteBg,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [practiceDropdownOpen, setPracticeDropdownOpen] = useState(false);
  const [mobilePracticeExpanded, setMobilePracticeExpanded] = useState(true);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isWhiteNav = whiteBg ?? (currentView === 'contact');

  // Performance-optimized ScrollSpy using IntersectionObserver for active link indicator
  useEffect(() => {
    if (currentView !== 'home') {
      return;
    }

    const sectionIds = ['hero', 'about', 'practice-areas', 'team', 'insights'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [currentView]);

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (mobileMenuOpen) setMobileMenuOpen(false);
        if (practiceDropdownOpen) setPracticeDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, practiceDropdownOpen]);

  // Close menus if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
      if (
        practiceDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setPracticeDropdownOpen(false);
      }
    };
    if (mobileMenuOpen || practiceDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen, practiceDropdownOpen]);

  // Clean up any hover timer on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setPracticeDropdownOpen(true);
    onPreloadSection?.('practice-areas');
  };

  const handleDropdownMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setPracticeDropdownOpen(false);
    }, 180);
  };

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Practice Areas', target: 'practice-areas' },
    { label: 'Leadership', target: 'team' },
    { label: 'Insights', target: 'insights' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    setPracticeDropdownOpen(false);
    if (target === 'contact') {
      onOpenConsultation();
    } else {
      onNavigateSection(target);
    }
    setMobileMenuOpen(false);
  };

  const handleSelectPractice = (practice: PracticeArea) => {
    setPracticeDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectPractice) {
      onSelectPractice(practice);
    } else {
      onNavigateSection('practice-areas');
    }
  };

  const isLinkActive = (target: string) => {
    if (currentView === 'contact') return target === 'contact';
    if (currentView === 'publications' || currentView === 'article') return target === 'insights';
    if (currentView === 'practice') return target === 'practice-areas';
    if (currentView === 'home') {
      return activeSection === target;
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 pointer-events-auto">
      <div
        className={`w-full px-4 sm:px-6 lg:px-12 flex items-center justify-between py-3 sm:py-3.5 lg:py-4 transition-colors duration-200 ${
          isWhiteNav
            ? 'bg-white border-b border-slate-200 shadow-sm text-slate-800'
            : 'bg-[#183f6e] border-b border-[#244f84] shadow-md text-white'
        }`}
      >
        {/* Left: Brand Logo - Monogram alone on mobile, Full name on desktop */}
        <button
          onClick={() => handleLinkClick('hero')}
          className={`cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 rounded-lg group p-1 -ml-1 transition-transform active:scale-95 shrink-0 ${
            isWhiteNav ? 'focus-visible:ring-[#183f6e]' : 'focus-visible:ring-[#ddf0ec]'
          }`}
          aria-label="Wafula PW & Co. Advocates Home"
          title="Wafula PW & Co. Advocates"
        >
          <JusticeLogo size={32} darkText={isWhiteNav} hideTextOnMobile={true} />
        </button>

        {/* Center: Desktop Navigation Links (hidden on mobile) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-semibold"
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link.target);

            // Special interactive dropdown for Practice Areas
            if (link.target === 'practice-areas') {
              return (
                <div
                  key={link.label}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                >
                  <button
                    type="button"
                    onClick={() => setPracticeDropdownOpen((prev) => !prev)}
                    onMouseEnter={() => onPreloadSection?.(link.target)}
                    aria-expanded={practiceDropdownOpen}
                    aria-haspopup="true"
                    aria-label="Practice Areas dropdown menu"
                    className={`inline-flex items-center gap-1.5 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded py-1 px-1 whitespace-nowrap relative ${
                      isWhiteNav
                        ? active
                          ? 'text-[#183f6e] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#183f6e] focus-visible:ring-[#183f6e]'
                          : 'text-slate-600 hover:text-[#183f6e] focus-visible:ring-[#183f6e]'
                        : active
                          ? 'text-[#ddf0ec] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#ddf0ec] focus-visible:ring-[#ddf0ec]'
                          : 'text-slate-200 hover:text-white hover:opacity-95 focus-visible:ring-[#ddf0ec]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        practiceDropdownOpen ? 'rotate-180 text-amber-400' : 'opacity-70'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Desktop Dropdown Panel */}
                  {practiceDropdownOpen && (
                    <div
                      role="menu"
                      aria-orientation="vertical"
                      aria-label="Practice areas submenu"
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-[580px] xl:w-[620px] animate-in fade-in slide-in-from-top-1.5 duration-150"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <div
                        className={`rounded-2xl border shadow-2xl p-4 xl:p-5 backdrop-blur-xl ${
                          isWhiteNav
                            ? 'bg-white/98 border-slate-200/90 text-slate-800 shadow-slate-900/15 ring-1 ring-slate-900/5'
                            : 'bg-[#0f2746]/98 border-[#254f82] text-white shadow-black/50 ring-1 ring-white/10'
                        }`}
                      >
                        {/* Dropdown Header */}
                        <div className={`flex items-center justify-between pb-3 mb-3 border-b ${isWhiteNav ? 'border-slate-100' : 'border-white/10'}`}>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
                            <span
                              className={`text-[11px] font-bold uppercase tracking-wider ${
                                isWhiteNav ? 'text-slate-500' : 'text-[#ddf0ec]/90'
                              }`}
                            >
                              Core Practice Disciplines
                            </span>
                          </div>
                        </div>

                        {/* 2-Column Grid of Practice Areas */}
                        <div className="grid grid-cols-2 gap-2">
                          {practiceAreasData.map((practice) => {
                            const IconComp = getPracticeIcon(practice.iconName);
                            const isCurrent =
                              currentView === 'practice' &&
                              activePractice?.id === practice.id;
                            const subtitle =
                              practiceSubtitles[practice.id] ||
                              practice.tagline;

                            return (
                              <button
                                key={practice.id}
                                role="menuitem"
                                onClick={() => handleSelectPractice(practice)}
                                className={`group flex items-start gap-3 p-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer ${
                                  isWhiteNav
                                    ? isCurrent
                                      ? 'bg-slate-100/90 border border-[#183f6e]/30'
                                      : 'hover:bg-slate-50 border border-transparent hover:border-slate-200'
                                    : isCurrent
                                      ? 'bg-white/15 border border-[#ddf0ec]/40'
                                      : 'hover:bg-white/10 border border-transparent hover:border-white/15'
                                }`}
                              >
                                <div
                                  className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center transition-all ${
                                    isWhiteNav
                                      ? isCurrent
                                        ? 'bg-[#183f6e] text-white'
                                        : 'bg-slate-100 text-[#183f6e] group-hover:bg-[#183f6e] group-hover:text-white'
                                      : isCurrent
                                        ? 'bg-[#ddf0ec] text-[#183f6e]'
                                        : 'bg-white/10 text-[#ddf0ec] group-hover:bg-[#ddf0ec] group-hover:text-[#183f6e]'
                                  }`}
                                >
                                  <IconComp className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <h4
                                      className={`text-xs font-bold leading-snug truncate ${
                                        isWhiteNav
                                          ? 'text-slate-800 group-hover:text-[#183f6e]'
                                          : 'text-white group-hover:text-[#ddf0ec]'
                                      }`}
                                    >
                                      {practice.shortName || practice.name}
                                    </h4>
                                    {isCurrent && (
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                    )}
                                  </div>
                                  <p
                                    className={`text-[11px] leading-tight line-clamp-1 mt-0.5 ${
                                      isWhiteNav
                                        ? 'text-slate-500 group-hover:text-slate-600'
                                        : 'text-slate-300 group-hover:text-slate-200'
                                    }`}
                                  >
                                    {subtitle}
                                  </p>
                                </div>
                                <ChevronRight
                                  className={`w-3.5 h-3.5 shrink-0 self-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ${
                                    isWhiteNav ? 'text-[#183f6e]' : 'text-[#ddf0ec]'
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>

                        {/* Dropdown Footer Strip */}
                        <div
                          className={`mt-3 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                            isWhiteNav
                              ? 'border-slate-100 text-slate-600'
                              : 'border-white/10 text-slate-300'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setPracticeDropdownOpen(false);
                              onNavigateSection('practice-areas');
                            }}
                            className={`inline-flex items-center gap-1.5 hover:underline cursor-pointer transition-colors ${
                              isWhiteNav
                                ? 'text-[#183f6e] hover:text-[#123157]'
                                : 'text-[#ddf0ec] hover:text-white'
                            }`}
                          >
                            <span>Explore Practice Areas Overview</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                onMouseEnter={() => onPreloadSection?.(link.target)}
                aria-current={active ? 'page' : undefined}
                className={`transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 rounded py-1 whitespace-nowrap relative ${
                  isWhiteNav
                    ? active
                      ? 'text-[#183f6e] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#183f6e] focus-visible:ring-[#183f6e]'
                      : 'text-slate-600 hover:text-[#183f6e] focus-visible:ring-[#183f6e]'
                    : active
                      ? 'text-[#ddf0ec] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#ddf0ec] focus-visible:ring-[#ddf0ec]'
                      : 'text-slate-200 hover:text-white hover:opacity-95 focus-visible:ring-[#ddf0ec]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Desktop Search Button (hidden on mobile; available inside mobile dropdown) */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className={`hidden lg:flex p-2 rounded-full transition-colors items-center gap-1.5 text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                isWhiteNav
                  ? 'text-slate-600 hover:text-[#183f6e] hover:bg-slate-100 border border-slate-200 focus-visible:ring-[#183f6e]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10 focus-visible:ring-[#ddf0ec]'
              }`}
              aria-label="Search practice areas, articles and cases"
              title="Search (⌘K)"
            >
              <Search className={`w-4 h-4 ${isWhiteNav ? 'text-[#183f6e]' : 'text-[#ddf0ec]'}`} />
              <span className={`hidden xl:inline font-mono text-[11px] ${isWhiteNav ? 'text-slate-500' : 'text-slate-300'}`}>
                ⌘K
              </span>
            </button>
          )}

          {/* Book Consultation Button (visible on mobile and desktop) */}
          <button
            onClick={onOpenConsultation}
            onMouseEnter={() => onPreloadSection?.('contact')}
            className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 shadow-md active:scale-95 ${
              isWhiteNav
                ? 'bg-[#183f6e] text-white hover:bg-[#123157] focus-visible:ring-[#183f6e]'
                : 'bg-[#ddf0ec] text-[#183f6e] hover:bg-white focus-visible:ring-[#ddf0ec]'
            }`}
          >
            Book Consultation
          </button>

          {/* Three Lines Button (Mobile Dropdown Toggle) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer ${
              isWhiteNav
                ? 'text-slate-700 hover:text-[#183f6e] hover:bg-slate-100 focus-visible:ring-[#183f6e]'
                : 'text-slate-200 hover:text-white hover:bg-white/10 focus-visible:ring-[#ddf0ec]'
            }`}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            title="Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown - reveals all navbar buttons */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`lg:hidden w-full px-5 py-5 border-b shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 ${
            isWhiteNav
              ? 'bg-white text-slate-800 border-slate-200'
              : 'bg-[#183f6e] text-white border-white/10'
          }`}
        >
          {/* Header in dropdown showing full brand identity */}
          <div className={`flex items-center justify-between pb-3.5 mb-3 border-b ${isWhiteNav ? 'border-slate-200' : 'border-white/10'}`}>
            <div className="flex items-center gap-2.5">
              <WafulaLogoMonogram size={24} color={isWhiteNav ? '#183f6e' : '#ddf0ec'} />
              <div className="flex flex-col">
                <span className={`text-xs font-bold tracking-tight uppercase ${isWhiteNav ? 'text-slate-800' : 'text-white'}`}>
                  Wafula PW &amp; Co. Advocates
                </span>
                <span className={`text-[10px] ${isWhiteNav ? 'text-slate-500' : 'text-slate-300'}`}>
                  Navigation &amp; Quick Access
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className={`p-1.5 rounded-lg text-xs font-medium cursor-pointer ${
                isWhiteNav ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-300 hover:bg-white/10'
              }`}
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* All Navbar Links */}
          <div className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => {
              const active = isLinkActive(link.target);

              // Practice Areas accordion in mobile drawer
              if (link.target === 'practice-areas') {
                return (
                  <div key={link.label} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setMobilePracticeExpanded((prev) => !prev)}
                      aria-expanded={mobilePracticeExpanded}
                      className={`text-left text-sm font-semibold py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        isWhiteNav
                          ? active
                            ? 'bg-slate-100 text-[#183f6e] font-bold'
                            : 'hover:bg-slate-50 text-slate-700'
                          : active
                            ? 'bg-white/15 text-white font-bold'
                            : 'hover:bg-white/10 text-slate-100'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          mobilePracticeExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Mobile Practice Areas Sub-list */}
                    {mobilePracticeExpanded && (
                      <div
                        className={`ml-2 pl-3 my-1 border-l flex flex-col gap-1 py-1 ${
                          isWhiteNav ? 'border-slate-200' : 'border-white/15'
                        }`}
                      >
                        {practiceAreasData.map((practice) => {
                          const IconComp = getPracticeIcon(practice.iconName);
                          const isCurrent =
                            currentView === 'practice' &&
                            activePractice?.id === practice.id;
                          return (
                            <button
                              key={practice.id}
                              onClick={() => handleSelectPractice(practice)}
                              className={`text-left text-xs font-medium py-2 px-2.5 rounded-lg transition-colors flex items-center justify-between cursor-pointer ${
                                isWhiteNav
                                  ? isCurrent
                                    ? 'bg-[#183f6e]/10 text-[#183f6e] font-bold'
                                    : 'hover:bg-slate-50 text-slate-700'
                                  : isCurrent
                                    ? 'bg-white/20 text-white font-bold'
                                    : 'hover:bg-white/10 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <IconComp className="w-3.5 h-3.5 shrink-0 opacity-80" />
                                <span className="truncate">{practice.shortName || practice.name}</span>
                              </div>
                              <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                            </button>
                          );
                        })}

                        <button
                          onClick={() => {
                            handleLinkClick('practice-areas');
                          }}
                          className={`text-left text-xs font-semibold py-1.5 px-2.5 mt-1 rounded-lg flex items-center gap-1.5 cursor-pointer ${
                            isWhiteNav
                              ? 'text-[#183f6e] hover:bg-slate-50'
                              : 'text-[#ddf0ec] hover:bg-white/10'
                          }`}
                        >
                          <span>View All Practice Disciplines</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.target)}
                  aria-current={active ? 'page' : undefined}
                  className={`text-left text-sm font-semibold py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                    isWhiteNav
                      ? active
                        ? 'bg-slate-100 text-[#183f6e] font-bold'
                        : 'hover:bg-slate-50 text-slate-700'
                      : active
                        ? 'bg-white/15 text-white font-bold'
                        : 'hover:bg-white/10 text-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span className={`w-1.5 h-1.5 rounded-full ${isWhiteNav ? 'bg-[#183f6e]' : 'bg-[#ddf0ec]'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Actions in Mobile Drawer */}
          <div className={`pt-3 border-t flex flex-col gap-2 ${isWhiteNav ? 'border-slate-200' : 'border-white/10'}`}>
            {onOpenSearch && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                  isWhiteNav
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    : 'bg-white/10 hover:bg-white/15 text-slate-200'
                }`}
              >
                <Search className={`w-4 h-4 ${isWhiteNav ? 'text-[#183f6e]' : 'text-[#ddf0ec]'}`} />
                <span>Search Practice Areas, Articles &amp; Cases (⌘K)</span>
              </button>
            )}

            <a
              href="tel:+254716954112"
              className={`w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                isWhiteNav
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              <Phone className={`w-4 h-4 ${isWhiteNav ? 'text-[#183f6e]' : 'text-[#ddf0ec]'}`} />
              <span>Call Chambers: +254 716 954 112</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className={`w-full mt-1 py-3 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                isWhiteNav
                  ? 'bg-[#183f6e] text-white hover:bg-[#123157]'
                  : 'bg-[#ddf0ec] text-[#183f6e] hover:bg-white'
              }`}
            >
              <span>Book Formal Legal Consultation</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isWhiteNav ? 'text-white' : 'text-[#183f6e]'}`} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
