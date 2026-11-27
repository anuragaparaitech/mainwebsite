import { useState, useRef, useEffect } from 'react';
import useScrolled from '../hooks/useScrolled';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { services } from '../services/serviceDetails';

// Arrange existing services into 3 desktop columns (BNY reference design structure):
const desktopColumns = [
  // Column 1: Cloud Solutions, Custom Software Development, AI & Machine Learning
  services.filter((s) => ['cloud-solutions', 'custom-software-development', 'ai-automation'].includes(s.slug)),
  // Column 2: DevOps & CI/CD, Cybersecurity & Compliance, Mobile App Development
  services.filter((s) => ['devops-ci-cd', 'cybersecurity-solutions', 'mobile-app-development'].includes(s.slug)),
  // Column 3: SaaS Product Engineering, Data Analytics & BI, Enterprise IT Consulting, UI/UX Design, Digital Portfolios & Bios
  services.filter((s) => [
    'saas-product-engineering',
    'data-analytics-bi',
    'enterprise-it-consulting',
    'ui-ux-design',
    'digital-portfolios-bios',
  ].includes(s.slug)),
];

// Tablet: 2 balanced columns (6 and 5 services)
const tabletColumns = [
  services.slice(0, 6),
  services.slice(6),
];

// About Aparaitech Dropdown Options (5 sections)
export const ABOUT_NAV_OPTIONS = [
  {
    title: 'About Company',
    desc: 'Vision, mission & institutional background',
    path: '/about#about-company',
    icon: 'business',
  },
  {
    title: 'Company Principles',
    desc: '6 foundational engineering & delivery tenets',
    path: '/about#company-principles',
    icon: 'verified',
  },
  {
    title: 'Terms & Conditions',
    desc: 'Commercial SLAs, governance & policies',
    path: '/about#terms-conditions',
    icon: 'description',
  },
  {
    title: 'Our Team',
    desc: 'Cross-functional architecture & engineering pods',
    path: '/about#our-team',
    icon: 'groups',
  },
  {
    title: 'Contact Details',
    desc: 'Official Pune headquarters, phone & emails',
    path: '/about#contact-details',
    icon: 'contact_support',
  },
];

export default function Header({ onOpenMenu, onOpenDrawer, solid = false }) {
  const scrolled = useScrolled(50);
  const location = useLocation();

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [openAccordionSlug, setOpenAccordionSlug] = useState(null);

  const closeTimerRef = useRef(null);
  const aboutCloseTimerRef = useRef(null);
  const headerRef = useRef(null);
  const servicesTriggerRef = useRef(null);
  const aboutTriggerRef = useRef(null);

  const handleOpenMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsAboutOpen(false);
    setIsServicesOpen(true);
  };

  const handleScheduleClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 180);
  };

  const handleImmediateClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (aboutCloseTimerRef.current) {
      clearTimeout(aboutCloseTimerRef.current);
      aboutCloseTimerRef.current = null;
    }
    setIsServicesOpen(false);
    setIsAboutOpen(false);
  };

  const handleOpenAbout = () => {
    if (aboutCloseTimerRef.current) {
      clearTimeout(aboutCloseTimerRef.current);
      aboutCloseTimerRef.current = null;
    }
    setIsServicesOpen(false);
    setIsAboutOpen(true);
  };

  const handleScheduleAboutClose = () => {
    if (aboutCloseTimerRef.current) {
      clearTimeout(aboutCloseTimerRef.current);
    }
    aboutCloseTimerRef.current = setTimeout(() => {
      setIsAboutOpen(false);
    }, 180);
  };

  const handleImmediateAboutClose = () => {
    if (aboutCloseTimerRef.current) {
      clearTimeout(aboutCloseTimerRef.current);
      aboutCloseTimerRef.current = null;
    }
    setIsAboutOpen(false);
  };

  // Close when pathname changes
  useEffect(() => {
    handleImmediateClose();
  }, [location.pathname]);

  // Click outside and escape key handling
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        handleImmediateClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isServicesOpen) {
          handleImmediateClose();
          servicesTriggerRef.current?.focus();
        } else if (isAboutOpen) {
          handleImmediateClose();
          aboutTriggerRef.current?.focus();
        }
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (aboutCloseTimerRef.current) clearTimeout(aboutCloseTimerRef.current);
    };
  }, [isServicesOpen, isAboutOpen]);

  const isLightHeader = solid || scrolled || location.pathname !== '/' || isServicesOpen || isAboutOpen;

  const navLinkClass = (active) =>
    active
      ? 'text-[#2563EB] font-semibold text-sm transition-colors relative py-1'
      : 'text-[#0F172A] hover:text-[#2563EB] text-sm font-medium transition-colors py-1';

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
          isLightHeader
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0]'
            : 'bg-transparent'
        }`}
        id="main-header"
      >
        <div
          className={`max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-8 transition-all duration-300 ${
            isLightHeader ? 'py-3.5' : 'py-5'
          }`}
        >
          {/* Mobile Menu Button & Brand Logo */}
          <div className="flex items-center gap-4 lg:gap-5">
            <button
              aria-label="Open navigation menu"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-[#0F172A] shadow-md hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              onClick={onOpenMenu}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <Link to="/" aria-label="Aparaitech home" onClick={handleImmediateClose}>
              <Logo
                size="lg"
                onDark={!isLightHeader}
                nameId="brand-wordmark"
                nameClassName={isLightHeader ? 'text-[#0F172A] dark:text-white' : 'text-white'}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 bg-white/75 backdrop-blur-md rounded-full px-7 py-2.5 shadow-sm border border-white/30">
            {/* Services Mega Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleOpenMenu}
              onMouseLeave={handleScheduleClose}
            >
              <Link
                ref={servicesTriggerRef}
                to="/services"
                aria-controls="services-mega-menu"
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
                className={navLinkClass(location.pathname.startsWith('/services') || isServicesOpen)}
                onFocus={handleOpenMenu}
                onClick={(e) => {
                  if (!isServicesOpen) {
                    setIsServicesOpen(true);
                  } else {
                    handleImmediateClose();
                  }
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span>Services</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isServicesOpen ? 'rotate-180 text-[#2563EB]' : 'text-slate-400'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                {(location.pathname.startsWith('/services') || isServicesOpen) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"></span>
                )}
              </Link>
            </div>

            <Link
              className={navLinkClass(location.pathname === '/platforms')}
              to="/platforms"
              onClick={handleImmediateClose}
            >
              Our Platforms
              {location.pathname === '/platforms' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"></span>
              )}
            </Link>

            <Link
              className={navLinkClass(location.pathname === '/careers')}
              to="/careers"
              onClick={handleImmediateClose}
            >
              Careers
              {location.pathname === '/careers' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"></span>
              )}
            </Link>

            <Link
              className={navLinkClass(location.pathname === '/collaborations')}
              to="/collaborations"
              onClick={handleImmediateClose}
            >
              Collaborations
              {location.pathname === '/collaborations' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"></span>
              )}
            </Link>

            {/* About Aparaitech Dropdown Menu Trigger */}
            <div
              className="relative"
              onMouseEnter={handleOpenAbout}
              onMouseLeave={handleScheduleAboutClose}
            >
              <Link
                ref={aboutTriggerRef}
                to="/about"
                aria-controls="about-dropdown-menu"
                aria-haspopup="true"
                aria-expanded={isAboutOpen}
                className={navLinkClass(
                  location.pathname.startsWith('/about') ||
                    location.pathname.startsWith('/contact') ||
                    isAboutOpen
                )}
                onFocus={handleOpenAbout}
                onClick={() => {
                  if (!isAboutOpen) {
                    handleOpenAbout();
                  } else {
                    handleImmediateAboutClose();
                  }
                }}
              >
                <span className="inline-flex items-center gap-1.5">
                  <span>About Aparaitech</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isAboutOpen ? 'rotate-180 text-[#2563EB]' : 'text-slate-400'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
                {(location.pathname.startsWith('/about') ||
                  location.pathname.startsWith('/contact') ||
                  isAboutOpen) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"></span>
                )}
              </Link>

              {/* About Aparaitech Dropdown Menu */}
              <div
                id="about-dropdown-menu"
                role="menu"
                aria-label="About Aparaitech Menu"
                className={`absolute top-full right-0 w-72 sm:w-80 pt-3 transition-all duration-200 ease-out z-50 ${
                  isAboutOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                }`}
              >
                {/* Hit bridge */}
                <div className="absolute -top-3 left-0 right-0 h-4 bg-transparent" aria-hidden="true" />

                <div className="bg-white dark:bg-[#0c1830] rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.18)] border border-slate-200/90 dark:border-white/10 p-3 overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/10 mb-1 flex items-center justify-between">
                    <span className="text-[11px] font-mono-tag font-bold uppercase tracking-wider text-slate-400">
                      About Aparaitech
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/20 text-[#2563EB] dark:text-blue-400 font-semibold font-mono-tag">
                      5 SECTIONS
                    </span>
                  </div>

                  <div className="space-y-1">
                    {ABOUT_NAV_OPTIONS.map((opt) => (
                      <Link
                        key={opt.title}
                        to={opt.path}
                        onClick={handleImmediateAboutClose}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors group/item"
                      >
                        <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/20 text-[#2563EB] dark:text-blue-400 flex items-center justify-center shrink-0 group-hover/item:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[18px]">
                            {opt.icon}
                          </span>
                        </span>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white group-hover/item:text-[#2563EB] dark:group-hover/item:text-blue-400 transition-colors leading-snug">
                            {opt.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Header Right Actions: Theme Toggle & AI Agent Drawer Trigger Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            <ThemeToggle />

            <button
              className="ai-agent-btn-animated inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#2563EB] text-white font-body-sm text-body-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              onClick={onOpenDrawer}
              type="button"
            >
              <span className="material-symbols-outlined text-[19px] sm:text-[20px] ai-icon">smart_toy</span>
              <span className="hidden xs:inline sm:inline">Ask AI Agent</span>
              <span className="xs:hidden sm:hidden">AI</span>
            </button>
          </div>
        </div>

        {/* Compact, Centered Services Mega Menu Dropdown */}
        <div
          id="services-mega-menu"
          role="region"
          aria-label="Services Mega Menu"
          onMouseEnter={handleOpenMenu}
          onMouseLeave={handleScheduleClose}
          className={`absolute top-full left-1/2 -translate-x-1/2 w-[min(94vw,1040px)] pt-2 transition-all duration-200 ease-out ${
            isServicesOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto visible'
              : 'opacity-0 -translate-y-2 pointer-events-none invisible'
          }`}
        >
          {/* Invisible hit bridge between nav pill and dropdown panel */}
          <div className="absolute -top-3 left-0 right-0 h-5 bg-transparent" aria-hidden="true" />

          <div className="bg-white rounded-2xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.16)] border border-slate-200/90 p-6 sm:p-7 max-h-[min(82vh,680px)] overflow-y-auto">
            {/* Desktop: 3 Columns Layout with compact spacing */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
              {desktopColumns.map((colServices, colIdx) => (
                <div key={colIdx} className="space-y-4">
                  {colServices.map((service) => (
                    <div key={service.slug} className="group/service">
                      <Link
                        to={`/services/${service.slug}`}
                        onClick={handleImmediateClose}
                        className="inline-block text-sm font-bold text-slate-900 hover:text-[#2563EB] transition-colors tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                      >
                        {service.cardTitle}
                      </Link>
                      {service.industryUseCases && service.industryUseCases.length > 0 && (
                        <ul className="mt-1 space-y-1">
                          {service.industryUseCases.map((useCase) => (
                            <li key={useCase.industry}>
                              <Link
                                to={`/services/${service.slug}`}
                                onClick={handleImmediateClose}
                                title={useCase.description}
                                className="block text-[13px] text-slate-600 hover:text-[#2563EB] font-normal transition-colors py-0.5 leading-snug focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                              >
                                {useCase.industry}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Tablet: 2 Columns Layout */}
            <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
              {tabletColumns.map((colServices, colIdx) => (
                <div key={colIdx} className="space-y-4">
                  {colServices.map((service) => (
                    <div key={service.slug} className="group/service">
                      <Link
                        to={`/services/${service.slug}`}
                        onClick={handleImmediateClose}
                        className="inline-block text-sm font-bold text-slate-900 hover:text-[#2563EB] transition-colors tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                      >
                        {service.cardTitle}
                      </Link>
                      {service.industryUseCases && service.industryUseCases.length > 0 && (
                        <ul className="mt-1 space-y-1">
                          {service.industryUseCases.map((useCase) => (
                            <li key={useCase.industry}>
                              <Link
                                to={`/services/${service.slug}`}
                                onClick={handleImmediateClose}
                                title={useCase.description}
                                className="block text-[13px] text-slate-600 hover:text-[#2563EB] font-normal transition-colors py-0.5 leading-snug focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                              >
                                {useCase.industry}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile: Vertically stacked collapsible accordion */}
            <div className="block md:hidden space-y-2">
              {services.map((service) => {
                const isExpanded = openAccordionSlug === service.slug;
                return (
                  <div key={service.slug} className="border-b border-slate-100 pb-2">
                    <div className="flex items-center justify-between py-1">
                      <Link
                        to={`/services/${service.slug}`}
                        onClick={handleImmediateClose}
                        className="text-sm font-bold text-slate-900 hover:text-[#2563EB] transition-colors"
                      >
                        {service.cardTitle}
                      </Link>
                      {service.industryUseCases && service.industryUseCases.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setOpenAccordionSlug(isExpanded ? null : service.slug)}
                          className="p-1 text-slate-500 hover:text-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] rounded"
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${service.cardTitle} sub-services`}
                        >
                          <svg
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-[#2563EB]' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {isExpanded && service.industryUseCases && (
                      <ul className="mt-1 pl-3 space-y-1 border-l-2 border-blue-200">
                        {service.industryUseCases.map((useCase) => (
                          <li key={useCase.industry}>
                            <Link
                              to={`/services/${service.slug}`}
                              onClick={handleImmediateClose}
                              className="block text-[13px] text-slate-600 hover:text-[#2563EB] py-0.5 transition-colors"
                            >
                              {useCase.industry}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Footer Bar (compact) */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="text-slate-500">
                Enterprise technology solutions engineered for scale.
              </span>
              <Link
                to="/services"
                onClick={handleImmediateClose}
                className="inline-flex items-center gap-1 font-semibold text-[#2563EB] hover:text-[#1d4ed8] transition-colors group"
              >
                <span>View all services</span>
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Ask AI Agent mobile button */}
      <button
        aria-label="Ask AI Agent"
        className="sm:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-secondary text-on-secondary shadow-[0_0_24px_rgba(37,99,235,0.55)] flex items-center justify-center hover:bg-secondary-container transition-transform active:scale-95"
        onClick={onOpenDrawer}
        type="button"
      >
        <span className="material-symbols-outlined text-[24px]">smart_toy</span>
      </button>
    </>
  );
}
