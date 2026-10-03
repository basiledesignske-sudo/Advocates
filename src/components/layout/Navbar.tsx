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
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView = 'home',
  onOpenConsultation,
  onOpenSearch,
  onNavigateSection,
  onPreloadSection,
}) => {
  const [navTheme, setNavTheme] = useState<'white' | 'blue'>('white');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Performance-optimized ScrollSpy using IntersectionObserver
  useEffect(() => {
    if (currentView !== 'home') {
      setNavTheme('white');
      return;
    }

    const sectionIds = ['hero', 'about', 'practice-areas', 'team', 'insights'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    // Observe sections for active scrollspy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            const isDark =
              entry.target.id === 'hero' ||
              entry.target.getAttribute('data-nav-theme') === 'blue';
            setNavTheme(isDark ? 'white' : 'blue');
          }
        });
      },
      {
        rootMargin: '-80px 0px -65% 0px',
        threshold: [0, 0.2, 0.5],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    // Also observe footer for dark theme
    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

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

  const isWhite = navTheme === 'white';

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-200 pointer-events-auto">
      <div
        className={`w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between border-b transition-colors duration-200 py-3.5 sm:py-4 ${
          isWhite
            ? 'bg-white/95 backdrop-blur-md border-slate-200 shadow-sm text-[#183f6e]'
            : 'bg-[#183f6e]/95 backdrop-blur-md border-[#183f6e]/40 shadow-lg text-white'
        }`}
      >
        {/* Left: Brand Logo */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e] rounded-lg group"
          aria-label="Wafula PW & Co. Advocates Home"
        >
          <JusticeLogo size={28} darkText={isWhite} />
        </button>

        {/* Center: Desktop Navigation Links with Scrollspy */}
        <nav
          aria-label="Primary Navigation"
          className={`hidden lg:flex items-center gap-6 xl:gap-8 text-[13px] font-semibold transition-colors duration-200 ${
            isWhite ? 'text-[#183f6e]' : 'text-slate-200'
          }`}
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link.target);

            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                onMouseEnter={() => onPreloadSection?.(link.target)}
                aria-current={active ? 'page' : undefined}
                className={`transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e] rounded py-1 whitespace-nowrap relative ${
                  active
                    ? isWhite
                      ? 'text-[#183f6e] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#183f6e]'
                      : 'text-[#ddf0ec] font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#ddf0ec]'
                    : isWhite
                    ? 'hover:text-[#183f6e] hover:opacity-80'
                    : 'hover:text-white hover:opacity-90'
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
              className={`p-2 rounded-full transition-colors flex items-center gap-1.5 text-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e] ${
                isWhite
                  ? 'text-slate-600 hover:text-[#183f6e] hover:bg-slate-100'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Search practice areas, articles and cases"
              title="Search (⌘K)"
            >
              <Search className={`w-4 h-4 ${isWhite ? 'text-[#183f6e]' : 'text-[#ddf0ec]'}`} />
              <span className={`hidden xl:inline font-mono text-[11px] ${isWhite ? 'text-slate-500' : 'text-slate-400'}`}>
                ⌘K
              </span>
            </button>
          )}

          <button
            onClick={onOpenConsultation}
            onMouseEnter={() => onPreloadSection?.('contact')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
              isWhite
                ? 'bg-[#183f6e] text-white hover:bg-[#123157] shadow-sm'
                : 'bg-[#ddf0ec] text-[#183f6e] hover:bg-white shadow-md'
            }`}
          >
            Book Consultation
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#183f6e] cursor-pointer ${
              isWhite
                ? 'text-[#183f6e] hover:bg-slate-100'
                : 'text-slate-200 hover:text-white hover:bg-white/10'
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
            isWhite
              ? 'bg-white border-slate-200 text-[#183f6e]'
              : 'bg-[#183f6e] border-[#183f6e]/40 text-white'
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
                    active
                      ? isWhite
                        ? 'bg-slate-100 text-[#183f6e] font-bold'
                        : 'bg-white/15 text-white font-bold'
                      : isWhite
                      ? 'hover:bg-slate-50 text-[#183f6e]'
                      : 'hover:bg-white/10 text-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                </button>
              );
            })}
          </div>

          {/* Quick Actions in Mobile Drawer */}
          <div className="pt-4 border-t border-slate-200/50 flex flex-col gap-2">
            {onOpenSearch && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                  isWhite
                    ? 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                    : 'bg-white/10 hover:bg-white/15 text-slate-200'
                }`}
              >
                <Search className="w-4 h-4" />
                <span>Search practice areas, articles & cases (⌘K)</span>
              </button>
            )}

            <a
              href="tel:+254716954112"
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                isWhite
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                  : 'bg-white/10 hover:bg-white/15 text-slate-200'
              }`}
            >
              <Phone className="w-4 h-4 text-[#183f6e]" />
              <span>Call Chambers: +254 716 954 112</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full mt-1 py-3 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 bg-[#183f6e] text-white hover:bg-[#123157] transition-all shadow-md cursor-pointer"
            >
              <span>Book Formal Legal Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ddf0ec]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
