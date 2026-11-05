import { useEffect } from 'react';
import useEscape from '../hooks/useEscape';
import Logo from './Logo';

export default function HamburgerMenu({ open, onClose, onNavigate, currentView = 'home' }) {
  useEscape(onClose, open);
  useEffect(() => {
    if (open) document.querySelector('#mobile-menu button')?.focus();
  }, [open]);

  const handleNav = (view, sectionId) => {
    onClose();
    if (onNavigate) {
      onNavigate(view, sectionId);
    } else {
      window.location.hash = view === 'careers' ? '#careers' : (sectionId ? `#${sectionId}` : '#');
    }
  };

  return (
    <div className={`fixed inset-0 z-50 bg-primary-container/60 backdrop-blur-md ${open ? '' : 'hidden'}`} id="mobile-menu" aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md h-full bg-surface-container-lowest p-6 flex flex-col justify-between shadow-2xl border-r border-outline-variant/40 overflow-y-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
            <button type="button" onClick={() => handleNav('home')} className="text-left">
              <Logo size="md" nameClassName="text-on-surface" />
            </button>
            <button aria-label="Close Menu" className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface hover:bg-surface-container" onClick={onClose} type="button">
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            <a
              className={`px-4 py-3 rounded font-body-md text-body-md font-semibold transition-colors ${currentView === 'home' ? 'bg-secondary-fixed text-secondary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
              data-path="services"
              href="#services"
              onClick={(e) => { e.preventDefault(); handleNav('home', 'services'); }}
            >
              Services
            </a>
            <a
              className="px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md font-semibold transition-colors"
              data-path="our-platforms"
              href="#platforms-section"
              onClick={(e) => { e.preventDefault(); handleNav('home', 'platforms-section'); }}
            >
              Our Platforms
            </a>
            <a
              className="px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md font-semibold transition-colors"
              data-path="our-philosophy"
              href="#philosophy"
              onClick={(e) => { e.preventDefault(); handleNav('home', 'philosophy'); }}
            >
              Our Philosophy
            </a>
            <a
              className={`px-4 py-3 rounded font-body-md text-body-md font-semibold transition-colors ${currentView === 'careers' ? 'bg-secondary-fixed text-secondary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
              data-path="careers"
              href="#careers"
              onClick={(e) => { e.preventDefault(); handleNav('careers'); }}
            >
              Careers
            </a>
            <a
              className={`px-4 py-3 rounded font-body-md text-body-md font-semibold transition-colors ${currentView === 'contact' ? 'bg-secondary-fixed text-secondary' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
              data-path="contact-us"
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav('contact'); }}
            >
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
