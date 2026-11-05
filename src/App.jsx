import { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import HamburgerMenu from './components/HamburgerMenu';
import ChatDrawer from './components/ChatDrawer';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Platforms from './components/Platforms';
import Careers from './components/Careers';
import ContactUs from './components/ContactUs';
import EnquiryModal from './components/EnquiryModal';
import Footer from './components/Footer';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [statsRun, setStatsRun] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash.startsWith('#contact')) return 'contact';
    if (hash.startsWith('#careers')) return 'careers';
    return 'home';
  });

  // Sync with browser hash changes (e.g. Back/Forward buttons, direct URL navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#contact')) {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash.startsWith('#careers')) {
        setCurrentView('careers');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Stats start when the pop-up closes; fallback after 5.5s in case it stays open.
  useEffect(() => {
    const t = setTimeout(() => setStatsRun(true), 5500);
    return () => clearTimeout(t);
  }, []);

  const navigateTo = (view, sectionId) => {
    if (view === 'contact') {
      setCurrentView('contact');
      window.location.hash = '#contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'careers') {
      setCurrentView('careers');
      window.location.hash = '#careers';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('home');
      if (sectionId) {
        window.location.hash = `#${sectionId}`;
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <Header
        onOpenMenu={() => setMenuOpen(true)}
        onOpenDrawer={() => setDrawerOpen(true)}
        currentView={currentView}
        onNavigate={navigateTo}
      />
      <HamburgerMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        currentView={currentView}
        onNavigate={navigateTo}
      />
      <ChatDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="w-full bg-surface">
        <div className="flex flex-col w-full">
          {currentView === 'home' && (
            <>
              {!preloaderDone && (
                <Preloader
                  onDone={() => {
                    setPreloaderDone(true);
                    setStatsRun(true);
                  }}
                />
              )}
              <Hero statsRun={statsRun} onOpenEnquiry={() => setEnquiryOpen(true)} />
              <Philosophy />
              <Services />
              <Platforms />
            </>
          )}
          {currentView === 'careers' && (
            <Careers onBackToHome={() => navigateTo('home')} />
          )}
          {currentView === 'contact' && (
            <ContactUs
              onBackToHome={() => navigateTo('home')}
              onOpenEnquiry={() => setEnquiryOpen(true)}
            />
          )}
        </div>
      </main>
      <Footer onNavigate={navigateTo} />
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
