import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const t = setTimeout(() => setStatsRun(true), 5500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header onOpenMenu={() => setMenuOpen(true)} onOpenDrawer={() => setDrawerOpen(true)} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <ChatDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Routes>
        <Route
          path="/"
          element={(
            <main className="w-full bg-surface">
              <div className="flex flex-col w-full">
                <Preloader onDone={() => setStatsRun(true)} />
                <Hero statsRun={statsRun} onOpenEnquiry={() => setEnquiryOpen(true)} />
                <Philosophy />
                <Services />
              </div>
            </main>
          )}
        />
        <Route path="/platforms" element={<Platforms onOpenDrawer={() => setDrawerOpen(true)} />} />
        <Route path="/careers" element={<Careers onBackToHome={() => window.location.href = '/'} />} />
        <Route path="/contact" element={<ContactUs onBackToHome={() => window.location.href = '/'} onOpenEnquiry={() => setEnquiryOpen(true)} />} />
        <Route path="/contact-us" element={<ContactUs onBackToHome={() => window.location.href = '/'} onOpenEnquiry={() => setEnquiryOpen(true)} />} />
      </Routes>

      <Footer />
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}