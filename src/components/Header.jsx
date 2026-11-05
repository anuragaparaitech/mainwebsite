import { useState } from 'react';
import useScrolled from '../hooks/useScrolled';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { services } from '../services/serviceDetails';

export default function Header({ onOpenMenu, onOpenDrawer, solid = false }) {
  const scrolled = useScrolled(50);
  const location = useLocation();
  const [activeServiceSlug, setActiveServiceSlug] = useState('cloud-solutions');
  const activeService = services.find((service) => service.slug === activeServiceSlug) || services[0];

  const isServicesHero = location.pathname === '/services' && !solid && !scrolled;
  const isLightHeader = solid || scrolled || (location.pathname !== '/' && location.pathname !== '/services');

  const navLinkClass = (active) =>
    active && isLightHeader
      ? 'text-secondary font-semibold text-sm transition-colors relative py-1'
      : active
        ? 'text-white font-semibold text-sm transition-colors relative py-1'
        : isLightHeader
          ? 'text-primary-container hover:text-secondary text-sm font-medium transition-colors py-1'
          : 'text-white/90 hover:text-white text-sm font-medium transition-colors py-1';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full px-6 lg:px-8 transition-all duration-300 ${
          isLightHeader
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-outline-variant py-3.5'
            : 'bg-transparent py-5'
        }`}
        id="main-header"
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-5">
            <button
              aria-label="Open navigation menu"
              className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-primary-container shadow-md hover:bg-surface-container-low transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
              onClick={onOpenMenu}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <Link to="/" aria-label="Aparaitech home">
              <Logo
                size="lg"
                onDark={!isLightHeader}
                nameId="brand-wordmark"
                nameClassName={isLightHeader ? 'text-primary-container' : 'text-white'}
              />
            </Link>
          </div>

          <nav className={`hidden lg:flex items-center gap-7 rounded-full px-7 py-2.5 shadow-sm backdrop-blur-md ${
            isServicesHero
              ? 'border border-white/20 bg-white/10'
              : 'border border-white/30 bg-white/75'
          }`}>
            {/* Services Dropdown */}
            <div className="services-nav-item relative">
              <Link
                aria-controls="services-nav-dropdown"
                aria-haspopup="true"
                className={navLinkClass(location.pathname.startsWith('/services'))}
                to="/services"
              >
                Services
                {location.pathname.startsWith('/services') && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"></span>
                )}
              </Link>
              <div className="services-nav-dropdown absolute left-1/2 top-full z-50 w-[min(90vw,900px)] -translate-x-1/2 pt-4" id="services-nav-dropdown">
                <div className="services-nav-panel grid grid-cols-[minmax(190px,0.38fr)_minmax(0,1fr)] overflow-hidden rounded-xl border border-outline-variant/50 bg-white shadow-2xl">
                  <div className="flex min-h-0 flex-col border-r border-outline-variant/40 bg-surface">
                    <ul aria-label="Service categories" className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain p-3">
                      {services.map((service) => (
                        <li key={service.slug}>
                          <button
                            aria-pressed={service.slug === activeService.slug}
                            className={`w-full rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                              service.slug === activeService.slug
                                ? 'bg-secondary text-white'
                                : 'text-on-surface hover:bg-white hover:text-secondary'
                            }`}
                            onFocus={() => setActiveServiceSlug(service.slug)}
                            onMouseEnter={() => setActiveServiceSlug(service.slug)}
                            type="button"
                          >
                            {service.cardTitle}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="shrink-0 border-t border-outline-variant/40 bg-surface p-3">
                      <Link className="block rounded-md px-3 py-2.5 text-sm font-semibold text-secondary hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary" to="/services">
                        View all services <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                  <div className="min-h-0 overflow-y-auto overscroll-contain p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4 border-b border-outline-variant/40 pb-4">
                      <div>
                        <h2 className="mt-1 text-lg font-bold text-on-surface">{activeService.cardTitle}</h2>
                      </div>
                      <Link className="shrink-0 text-sm font-semibold text-secondary hover:underline" to={`/services/${activeService.slug}`}>
                        Details →
                      </Link>
                    </div>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {activeService.industryUseCases.map(({ industry, description }) => (
                        <Link
                          className="rounded-md border border-outline-variant/40 p-3 transition-colors hover:border-secondary/50 hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                          key={industry}
                          to={`/services/${activeService.slug}`}
                        >
                          <span className="block text-sm font-semibold text-on-surface">{industry}</span>
                          <span className="mt-1 block text-xs leading-relaxed text-on-surface-variant">{description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link
              className={navLinkClass(location.pathname === '/platforms')}
              to="/platforms"
            >
              Our Platforms
              {location.pathname === '/platforms' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"></span>
              )}
            </Link>

            <Link
              className={navLinkClass(location.pathname === '/careers')}
              to="/careers"
            >
              Careers
              {location.pathname === '/careers' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"></span>
              )}
            </Link>

            <Link
              className={navLinkClass(location.pathname === '/contact' || location.pathname === '/contact-us')}
              to="/contact"
            >
              Contact Us
              {(location.pathname === '/contact' || location.pathname === '/contact-us') && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary rounded-full"></span>
              )}
            </Link>
          </nav>

          <div className="flex items-center">
            <button
              className="ai-agent-btn-animated inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-secondary text-white font-body-sm text-body-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary"
              onClick={onOpenDrawer}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px] ai-icon">smart_toy</span>
              <span>Ask AI Agent</span>
            </button>
          </div>
        </div>
      </header>

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
