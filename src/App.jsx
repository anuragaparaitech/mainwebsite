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
import Footer from './components/Footer';
import ServiceDetailPage from './components/ServiceDetailPage';
import ContactPage from './components/ContactPage';
import ServicesPage from './components/ServicesPage';
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
  const [statsRun, setStatsRun] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const t = setTimeout(() => setStatsRun(true), 5500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header solid={location.pathname !== '/'} onOpenMenu={() => setMenuOpen(true)} onOpenDrawer={() => setDrawerOpen(true)} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <ChatDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Routes>
        <Route
          path="/"
          element={(
            <main className="w-full bg-surface">
              <div className="flex flex-col w-full">
                <Preloader onDone={() => setStatsRun(true)} />
                <Hero statsRun={statsRun} />
                <Philosophy />
                <Services />
                <Platforms />
              </div>
            </main>
          )}
        />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/cloud-solutions" element={<CloudSolutionsPage />} />
        <Route path="/services/custom-software-development" element={<CustomSoftwareDevelopmentPage />} />
        <Route path="/services/ai-automation" element={<AiAutomationPage />} />
        <Route path="/services/devops-ci-cd" element={<DevOpsCiCdPage />} />
        <Route path="/services/cybersecurity-solutions" element={<CybersecuritySolutionsPage />} />
        <Route path="/services/mobile-app-development" element={<MobileAppDevelopmentPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/contact" element={<ContactPage onOpenDrawer={() => setDrawerOpen(true)} />} />
        <Route path="*" element={<main className="min-h-[65vh] bg-surface px-6 pt-40 pb-24"><div className="max-w-3xl mx-auto"><h1 className="text-4xl font-bold">Page not found</h1><p className="mt-4 text-on-surface-variant">The page you requested could not be found.</p><a className="inline-flex mt-8 text-secondary font-semibold hover:underline" href="/">Return home</a></div></main>} />
      </Routes>
      <Footer />
    </>
  );
}
