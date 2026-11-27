import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Counter from './Counter';
import HeroMedia from './HeroMedia';
import { fetchSiteContent } from '../services/api';

const DEFAULT_HERO = {
  heroTitle: 'Navigate Your Digital Future.',
  heroSubtitle:
    'From custom software to scalable SaaS platforms, we build the digital infrastructure that powers global businesses.',
  heroPrimaryCtaText: 'Explore Our Platforms',
  heroPrimaryCtaLink: '/platforms',
  heroSecondaryCtaText: 'Customer Enquiry',
  heroStats: [
    { target: 500, suffix: '+', label: 'PROJECTS' },
    { target: 250, suffix: '+', label: 'CLIENTS' },
    { target: 99, suffix: '%', label: 'SATISFACTION' },
    { target: 10, suffix: '+', label: 'LIVE PLATFORMS' },
  ],
};

export default function Hero({ statsRun, onOpenEnquiry }) {
  const [hero, setHero] = useState(DEFAULT_HERO);

  useEffect(() => {
    fetchSiteContent().then((data) => {
      if (!data) return;
      setHero({
        heroTitle: data.heroTitle || DEFAULT_HERO.heroTitle,
        heroSubtitle: data.heroSubtitle || DEFAULT_HERO.heroSubtitle,
        heroPrimaryCtaText: data.heroPrimaryCtaText || DEFAULT_HERO.heroPrimaryCtaText,
        heroPrimaryCtaLink: data.heroPrimaryCtaLink || DEFAULT_HERO.heroPrimaryCtaLink,
        heroSecondaryCtaText: data.heroSecondaryCtaText || DEFAULT_HERO.heroSecondaryCtaText,
        heroStats: data.heroStats?.length ? data.heroStats : DEFAULT_HERO.heroStats,
      });
    });
  }, []);

  return (
    <section className="relative w-full h-screen min-h-screen text-on-secondary flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0" id="hero-media-wrapper">
        <HeroMedia />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/75 via-[#0F172A]/45 to-[#0F172A]/80"></div>
      </div>
      <div className="relative z-10 w-full pt-28"></div>
      <div className="relative z-10 max-w-[1040px] mx-auto px-4 text-center my-auto flex flex-col items-center">
        <h1 className="font-display-hero text-display-hero font-bold tracking-tight text-white mb-6 max-w-4xl drop-shadow-sm">
          {hero.heroTitle}
        </h1>
        <p className="font-body-lg text-body-lg text-slate-200 max-w-[700px] mb-10 leading-relaxed drop-shadow-sm">
          {hero.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-secondary text-on-secondary font-title-md text-title-md font-semibold shadow-lg shadow-secondary/30 hover:bg-secondary-container transition-all flex items-center justify-center gap-2"
            to={hero.heroPrimaryCtaLink || '/platforms'}
          >
            <span>{hero.heroPrimaryCtaText}</span>
            <span className="material-symbols-outlined text-[20px]">layers</span>
          </Link>
          <button
            type="button"
            onClick={onOpenEnquiry}
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-surface-container-lowest/15 backdrop-blur-md text-on-secondary font-title-md text-title-md font-semibold hover:bg-surface-container-lowest/25 transition-all flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
          >
            <span>{hero.heroSecondaryCtaText}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
          </button>
        </div>
      </div>
      {hero.heroStats.length > 0 && (
        <div className="relative z-20 max-w-4xl w-full mx-auto px-4 mb-10">
          <div className="bg-surface-container-lowest/15 backdrop-blur-xl border border-white/20 rounded-full px-6 md:px-10 py-5 shadow-2xl flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-0">
            {hero.heroStats.map((stat, idx) => (
              <Fragment key={stat._id || stat.label || idx}>
                {idx > 0 && <div className="hidden md:block w-px h-10 bg-surface-container-lowest/20"></div>}
                <div className="flex-1 min-w-[130px] text-center px-2">
                  <Counter
                    className="font-display-hero text-headline-lg font-bold text-tertiary-fixed-dim tabular-nums"
                    target={Number(stat.target) || 0}
                    suffix={stat.suffix || ''}
                    run={statsRun}
                  />
                  <p className="font-mono-tag text-mono-tag uppercase tracking-wider text-surface-container-lowest font-medium mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
