import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useEscape from '../hooks/useEscape';
import Logo from './Logo';

export default function HamburgerMenu({ open, onClose }) {
  useEscape(onClose, open);
  const location = useLocation();

  useEffect(() => {
    if (open) document.querySelector('#mobile-menu button')?.focus();
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
              className="w-9 h-9 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface hover:bg-surface-container"
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
            <Link className={linkClass('/services')} to="/services" onClick={onClose}>
              Services
            </Link>
            <Link className={linkClass('/platforms')} to="/platforms" onClick={onClose}>
              Our Platforms
            </Link>
            <Link className={linkClass('/careers')} to="/careers" onClick={onClose}>
              Careers
            </Link>
            <Link className={linkClass('/contact')} to="/contact" onClick={onClose}>
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
