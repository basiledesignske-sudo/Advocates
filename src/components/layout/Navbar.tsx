import React, { useState, useEffect, useRef } from 'react';
import { JusticeLogo } from '../ui/JusticeLogo';
import { Menu, X, Search, Phone, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView?: 'home' | 'contact' | 'publications' | 'article' | 'practice';
  activeSection?: string;
  onOpenConsultation: () => void;
  onOpenSearch?: () => void;
  onOpenAdmin?: () => void;
  onNavigateSection: (sectionId: string) => void;
  onPreloadSection?: (sectionId: string) => void;
  whiteBg?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'home',
  onOpenConsultation,
  onOpenSearch,
  onNavigateSection,
  onPreloadSection,
  whiteBg,
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Practice Areas', target: 'practice-areas' },
    { label: 'Leadership', target: 'team' },
    { label: 'Insights', target: 'insights' },
    { label: 'Contact', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    if (target === 'contact') {
      onOpenConsultation();
    } else {
      onNavigateSection(target);
    }
    setMobileMenuOpen(false);
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
        className={`w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between py-3.5 sm:py-4 transition-colors duration-200 ${
          isWhiteNav
            ? 'bg-white border-b border-slate-200 shadow-sm text-slate-800'
            : 'bg-[#183f6e] border-b border-[#244f84] shadow-md text-white'
        }`}
      >
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className={`cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 rounded-lg group ${
            isWhiteNav ? 'focus-visible:ring-[#183f6e]' : 'focus-visible:ring-[#ddf0ec]'
          }`}
          aria-label="Wafula PW & Co. Advocates Home"
        >
          <JusticeLogo size={28} darkText={isWhiteNav} />
        </button>

        {/* Center: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-semibold"
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link.target);

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
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className={`p-2 rounded-full transition-colors flex items-center gap-1.5 text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
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

          <button
            onClick={onOpenConsultation}
            onMouseEnter={() => onPreloadSection?.('contact')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 shadow-md active:scale-95 ${
              isWhiteNav
                ? 'bg-[#183f6e] text-white hover:bg-[#123157] focus-visible:ring-[#183f6e]'
                : 'bg-[#ddf0ec] text-[#183f6e] hover:bg-white focus-visible:ring-[#ddf0ec]'
            }`}
          >
            Book Consultation
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 cursor-pointer ${
              isWhiteNav
                ? 'text-slate-700 hover:text-[#183f6e] hover:bg-slate-100 focus-visible:ring-[#183f6e]'
                : 'text-slate-200 hover:text-white hover:bg-white/10 focus-visible:ring-[#ddf0ec]'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`lg:hidden w-full px-5 py-5 border-b shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 ${
            isWhiteNav
              ? 'bg-white text-slate-800 border-slate-200'
              : 'bg-[#183f6e] text-white border-white/10'
          }`}
        >
          <div className="flex flex-col gap-1.5 mb-4">
            {navLinks.map((link) => {
              const active = isLinkActive(link.target);
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
          <div className={`pt-4 border-t flex flex-col gap-2 ${isWhiteNav ? 'border-slate-200' : 'border-white/10'}`}>
            {onOpenSearch && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  isWhiteNav
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    : 'bg-white/10 hover:bg-white/15 text-slate-200'
                }`}
              >
                <Search className={`w-4 h-4 ${isWhiteNav ? 'text-[#183f6e]' : 'text-[#ddf0ec]'}`} />
                <span>Search practice areas, articles & cases (⌘K)</span>
              </button>
            )}

            <a
              href="tel:+254716954112"
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
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
