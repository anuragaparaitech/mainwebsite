import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useEscape from '../hooks/useEscape';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { ABOUT_NAV_OPTIONS } from './Header';
import { services } from '../services/serviceDetails';

export default function HamburgerMenu({ open, onClose }) {
  useEscape(onClose, open);
  const location = useLocation();

  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState(null);

  useEffect(() => {
    if (open) {
      document.querySelector('#mobile-menu button')?.focus();
    } else {
      setServicesExpanded(false);
      setAboutExpanded(false);
      setActiveCategorySlug(null);
    }
  }, [open]);

  const linkClass = (path) =>
    `px-4 py-3 rounded font-body-md text-body-md font-semibold transition-colors ${
      location.pathname === path
        ? 'bg-secondary-fixed text-secondary'
        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
    }`;

  return (
    <div
      className={`fixed inset-0 z-50 bg-primary-container/60 backdrop-blur-md ${open ? '' : 'hidden'}`}
      id="mobile-menu"
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md h-full bg-surface-container-lowest p-6 flex flex-col justify-between shadow-2xl border-r border-outline-variant/40 overflow-y-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
            <Link to="/" onClick={onClose} className="text-left">
              <Logo size="md" nameClassName="text-on-surface" />
            </Link>
            <button
              aria-label="Close Menu"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              onClick={onClose}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <Link className={linkClass('/')} to="/" onClick={onClose}>
              Home
            </Link>

            {/* Services with Collapsible Accordion */}
            <div className="flex flex-col">
              <div
                className={`flex items-center justify-between rounded transition-colors ${
                  location.pathname.startsWith('/services')
                    ? 'bg-secondary-fixed text-secondary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <Link
                  className="flex-1 px-4 py-3 font-body-md text-body-md font-semibold"
                  to="/services"
                  onClick={onClose}
                >
                  Services
                </Link>
                <button
                  type="button"
                  aria-expanded={servicesExpanded}
                  aria-label="Toggle Services List"
                  className="px-4 py-3 text-slate-500 hover:text-[#2563EB] focus:outline-none"
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesExpanded ? 'rotate-180 text-[#2563EB]' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {servicesExpanded && (
                <div className="mt-2 pl-4 pr-1 space-y-2 border-l-2 border-slate-200">
                  <Link
                    to="/services"
                    onClick={onClose}
                    className="block py-2 text-xs font-semibold text-[#2563EB] hover:underline"
                  >
                    View All Services Overview →
                  </Link>

                  {services.map((service) => {
                    const isCatOpen = activeCategorySlug === service.slug;
                    return (
                      <div key={service.slug} className="py-1">
                        <div className="flex items-center justify-between">
                          <Link
                            to={`/services/${service.slug}`}
                            onClick={onClose}
                            className="text-sm font-semibold text-slate-900 hover:text-[#2563EB]"
                          >
                            {service.cardTitle}
                          </Link>
                          {service.industryUseCases && service.industryUseCases.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setActiveCategorySlug(isCatOpen ? null : service.slug)}
                              className="p-1 text-slate-400 hover:text-[#2563EB]"
                              aria-label={`Toggle ${service.cardTitle} sub-services`}
                            >
                              <svg
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                  isCatOpen ? 'rotate-180 text-[#2563EB]' : ''
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

                        {isCatOpen && service.industryUseCases && (
                          <ul className="mt-1.5 pl-3 space-y-1.5 border-l border-blue-200">
                            {service.industryUseCases.map((useCase) => (
                              <li key={useCase.industry}>
                                <Link
                                  to={`/services/${service.slug}`}
                                  onClick={onClose}
                                  className="block text-xs text-slate-600 hover:text-[#2563EB] py-0.5"
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
              )}
            </div>

            <Link className={linkClass('/platforms')} to="/platforms" onClick={onClose}>
              Our Platforms
            </Link>
            <Link className={linkClass('/collaboration')} to="/collaboration" onClick={onClose}>
              Collaborations
            </Link>
            <Link className={linkClass('/careers')} to="/careers" onClick={onClose}>
              Careers
            </Link>
            {/* About Aparaitech with Collapsible Accordion */}
            <div className="flex flex-col">
              <div
                className={`flex items-center justify-between rounded transition-colors ${
                  location.pathname.startsWith('/about') ||
                  location.pathname.startsWith('/contact')
                    ? 'bg-secondary-fixed text-secondary'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`}
              >
                <Link
                  className="flex-1 px-4 py-3 font-body-md text-body-md font-semibold"
                  to="/about"
                  onClick={onClose}
                >
                  About Aparaitech
                </Link>
                <button
                  type="button"
                  aria-expanded={aboutExpanded}
                  aria-label="Toggle About Aparaitech List"
                  className="px-4 py-3 text-slate-500 hover:text-[#2563EB] focus:outline-none"
                  onClick={() => setAboutExpanded(!aboutExpanded)}
                >
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      aboutExpanded ? 'rotate-180 text-[#2563EB]' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {aboutExpanded && (
                <div className="mt-2 pl-4 pr-1 space-y-2 border-l-2 border-slate-200 dark:border-white/10">
                  {ABOUT_NAV_OPTIONS.map((opt) => (
                    <Link
                      key={opt.title}
                      to={opt.path}
                      onClick={onClose}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#2563EB]">
                        {opt.icon}
                      </span>
                      <span>{opt.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle within Mobile Navigation Menu */}
            <div className="pt-4 mt-2 border-t border-outline-variant/30">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono-tag">
                Appearance &amp; Theme
              </p>
              <ThemeToggle variant="menu" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
