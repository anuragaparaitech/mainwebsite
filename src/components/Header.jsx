import useScrolled from '../hooks/useScrolled';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Header({ onOpenMenu, onOpenDrawer }) {
  const scrolled = useScrolled(50);
  const location = useLocation();
  const servicesActive = location.pathname === '/services' || location.pathname.startsWith('/services/') || location.hash === '#services';
  const platformsActive = location.pathname === '/platforms' || location.pathname.startsWith('/platforms/');

  const navLinkClass = (active) => active
    ? 'text-[#2563EB] font-semibold text-sm transition-colors relative py-1'
    : 'text-[#0F172A] hover:text-[#2563EB] text-sm font-medium transition-colors py-1';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 w-full px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#E2E8F0] py-3.5' : 'bg-transparent py-5'}`} id="main-header">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-5">
            <button aria-label="Open navigation menu" className="w-12 h-12 rounded-full flex items-center justify-center bg-white text-[#0F172A] shadow-md hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#2563EB]" onClick={onOpenMenu} type="button">
              <span className="material-symbols-outlined text-[24px]">
                menu
              </span>
            </button>
            <a href="/" aria-label="Aparaitech home">
              <Logo size="lg" onDark={!scrolled} nameId="brand-wordmark" nameClassName={scrolled ? 'text-[#0F172A]' : 'text-white'} />
            </a>
          </div>
          <nav className="hidden lg:flex items-center gap-7 bg-white/75 backdrop-blur-md rounded-full px-7 py-2.5 shadow-sm border border-white/30" data-active-classes="text-[#2563EB] font-semibold">
            <a aria-current={servicesActive ? 'page' : undefined} className={navLinkClass(servicesActive)} data-path="services" href="#services">
              Services
              {servicesActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"></span>}
            </a>
            <a aria-current={platformsActive ? 'page' : undefined} className={navLinkClass(platformsActive)} data-path="our-platforms" href="/platforms">
              Our Platforms
              {platformsActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full"></span>}
            </a>
            <a className="text-[#0F172A] hover:text-[#2563EB] text-sm font-medium transition-colors py-1" data-path="our-collaborations" href="#">
              Our Collaborations
            </a>
            <a className="text-[#0F172A] hover:text-[#2563EB] text-sm font-medium transition-colors py-1" data-path="careers" href="#">
              Careers
            </a>
          </nav>
          <div className="flex items-center">
            <button className="ai-agent-btn-animated inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#2563EB] text-white font-body-sm text-body-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2563EB]" onClick={onOpenDrawer} type="button">
              <span className="material-symbols-outlined text-[20px] ai-icon">
                smart_toy
              </span>
              <span>
                Ask AI Agent
              </span>
            </button>
          </div>
        </div>
      </header>
      <button aria-label="Ask AI Agent" className="sm:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-secondary text-on-secondary shadow-[0_0_24px_rgba(37,99,235,0.55)] flex items-center justify-center hover:bg-secondary-container transition-transform active:scale-95" onClick={onOpenDrawer} type="button">
        <span className="material-symbols-outlined text-[24px]">
          smart_toy
        </span>
      </button>
    </>
  );
}