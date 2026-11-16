import { useState, useRef, useEffect } from 'react';
import useScrolled from '../hooks/useScrolled';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
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

export default function Header({ onOpenMenu, onOpenDrawer, solid = false }) {
  const scrolled = useScrolled(50);
  const location = useLocation();

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [openAccordionSlug, setOpenAccordionSlug] = useState(null);

  const closeTimerRef = useRef(null);
  const headerRef = useRef(null);
  const servicesTriggerRef = useRef(null);

  const handleOpenMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
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
    setIsServicesOpen(false);
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
      if (e.key === 'Escape' && isServicesOpen) {
        handleImmediateClose();
        servicesTriggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [isServicesOpen]);

  const isLightHeader = solid || scrolled || location.pathname !== '/' || isServicesOpen;

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
                nameClassName={isLightHeader ? 'text-[#0F172A]' : 'text-white'}
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
              className={navLinkClass(location.pathname === '/contact' || location.pathname === '/contact-us')}
              to="/contact"
              onClick={handleImmediateClose}
            >
              Contact Us
              {(location.pathname === '/contact' || location.pathname === '/contact-us') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"></span>
              )}
            </Link>
          </nav>

          {/* AI Agent Drawer Trigger Button */}
          <div className="flex items-center">
            <button
              className="ai-agent-btn-animated inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#2563EB] text-white font-body-sm text-body-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              onClick={onOpenDrawer}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] ai-icon">smart_toy</span>
              <span>Ask AI Agent</span>
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
