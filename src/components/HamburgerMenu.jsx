import { useEffect } from 'react';
import useEscape from '../hooks/useEscape';
import Logo from './Logo';

export default function HamburgerMenu({ open, onClose }) {
  useEscape(onClose, open);
  useEffect(() => {
    if (open) document.querySelector('#mobile-menu button')?.focus();
  }, [open]);
  return (
    <div className={`fixed inset-0 z-50 bg-primary-container/60 backdrop-blur-md ${open ? '' : 'hidden'}`} id="mobile-menu" aria-hidden={!open} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-md h-full bg-surface-container-lowest p-6 flex flex-col justify-between shadow-2xl border-r border-outline-variant/40 overflow-y-auto">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
            <Logo size="md" nameClassName="text-on-surface" />
            <button aria-label="Close Menu" className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface hover:bg-surface-container" onClick={onClose} type="button">
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            <a className="px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md font-semibold transition-colors" data-path="services" href="#services" onClick={onClose}>
              Services
            </a>
            <a className="px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md font-semibold transition-colors" data-path="our-platforms" href="#platforms-section" onClick={onClose}>
              Our Platforms
            </a>
            <a className="px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md font-semibold transition-colors" data-path="our-team" href="#" onClick={onClose}>
              Our Team
            </a>
            <a className="px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md font-semibold transition-colors" data-path="our-collaborations" href="#" onClick={onClose}>
              Our Collaborations
            </a>
            <a className="px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md font-semibold transition-colors" data-path="careers" href="#" onClick={onClose}>
              Careers
            </a>
            <a className="px-4 py-3 rounded text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md font-semibold transition-colors" data-path="contact-us" href="#" onClick={onClose}>
              Contact Us
            </a>
            <a className="px-4 py-3 rounded flex items-center gap-2 text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface font-body-md text-body-md font-semibold transition-colors" data-path="project-estimation-cost" href="#" onClick={onClose}>
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>
                Project Estimation Cost
              </span>
            </a>
          </nav>
        </div>
        <div className="pt-6 border-t border-outline-variant/30 flex flex-col gap-3">
          <a className="w-full py-3 rounded text-center bg-primary-container text-on-secondary font-body-sm text-body-sm font-semibold hover:bg-primary transition-colors" data-path="customer-enquiry" href="#" onClick={onClose}>
            Customer Enquiry
          </a>
          <div className="text-center text-on-surface-variant font-mono-tag text-mono-tag uppercase tracking-wider">
            ISO 27001 & 9001 Certified
          </div>
        </div>
      </div>
    </div>
  );
}
