import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Preloader from './components/Preloader';
import Header from './components/Header';
import HamburgerMenu from './components/HamburgerMenu';
import ChatDrawer from './components/ChatDrawer';
import Hero from './components/Hero';
import NewsTicker from './components/NewsTicker';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Platforms from './components/Platforms';
import Careers from './components/Careers';
import AboutAparaitech from './components/AboutAparaitech';
import ContactUs from './components/ContactUs';
import EnquiryModal from './components/EnquiryModal';
import Footer from './components/Footer';
import ServicesPage from './components/ServicesPage';
import ServiceDetailPage from './components/ServiceDetailPage';
import {
  AiAutomationPage,
  CloudSolutionsPage,
  CybersecuritySolutionsPage,
  CustomSoftwareDevelopmentPage,
  DevOpsCiCdPage,
  MobileAppDevelopmentPage,
} from './components/ServicePages';

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
    <ThemeProvider>
      <Header
        solid={location.pathname !== '/' && location.pathname !== '/services'}
        onOpenMenu={() => setMenuOpen(true)}
        onOpenDrawer={() => setDrawerOpen(true)}
      />
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
                {/* 2. Moving News Headlines / Announcement Ticker immediately ABOVE Our Philosophy */}
                <NewsTicker />
                <Philosophy />
                <Services />
                <Platforms onOpenDrawer={() => setDrawerOpen(true)} />
              </div>
            </main>
          )}
        />
        <Route path="/platforms" element={<Platforms standalone onOpenDrawer={() => setDrawerOpen(true)} />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/cloud-solutions" element={<CloudSolutionsPage />} />
        <Route path="/services/custom-software-development" element={<CustomSoftwareDevelopmentPage />} />
        <Route path="/services/ai-automation" element={<AiAutomationPage />} />
        <Route path="/services/devops-ci-cd" element={<DevOpsCiCdPage />} />
        <Route path="/services/cybersecurity-solutions" element={<CybersecuritySolutionsPage />} />
        <Route path="/services/mobile-app-development" element={<MobileAppDevelopmentPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/careers" element={<Careers onBackToHome={() => window.location.href = '/'} />} />
        <Route
          path="/about"
          element={<AboutAparaitech onBackToHome={() => window.location.href = '/'} />}
        />
        <Route
          path="/about-us"
          element={<AboutAparaitech onBackToHome={() => window.location.href = '/'} />}
        />
        <Route
          path="/contact"
          element={<AboutAparaitech onBackToHome={() => window.location.href = '/'} />}
        />
        <Route
          path="/contact-us"
          element={<AboutAparaitech onBackToHome={() => window.location.href = '/'} />}
        />
        <Route
          path="*"
          element={(
            <main className="min-h-[65vh] bg-surface px-6 pt-40 pb-24">
              <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold">Page not found</h1>
                <p className="mt-4 text-on-surface-variant">The page you requested could not be found.</p>
                <a className="inline-flex mt-8 text-secondary font-semibold hover:underline" href="/">Return home</a>
              </div>
            </main>
          )}
        />
      </Routes>

      <Footer />
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </ThemeProvider>
  );
}
