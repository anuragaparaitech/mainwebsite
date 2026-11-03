import { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import HamburgerMenu from './components/HamburgerMenu';
import ChatDrawer from './components/ChatDrawer';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Platforms from './components/Platforms';
import Footer from './components/Footer';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statsRun, setStatsRun] = useState(false);

  // Stats start when the pop-up closes; fallback after 5.5s in case it stays open.
  useEffect(() => {
    const t = setTimeout(() => setStatsRun(true), 5500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header onOpenMenu={() => setMenuOpen(true)} onOpenDrawer={() => setDrawerOpen(true)} />
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <ChatDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="w-full bg-surface">
        <div className="flex flex-col w-full">
          <Preloader onDone={() => setStatsRun(true)} />
          <Hero statsRun={statsRun} />
          <Philosophy />
          <Services />
          <Platforms />
        </div>
      </main>
      <Footer />
    </>
  );
}
