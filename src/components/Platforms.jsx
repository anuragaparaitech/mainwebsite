import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CardImage from './CardImage';
import { platforms } from '../data/platforms';
import { fetchPlatforms } from '../services/api';

// Local images mapping for platforms that have dedicated assets in public/images/platforms/
const LOCAL_PLATFORM_IMAGES = {
  novatax: '/images/platforms/novatax.jpg',
  blastbee: '/images/platforms/blastbee.jpg',
  smartbilling: '/images/platforms/apna-store.jpg',
  'apna-store': '/images/platforms/apna-store.jpg',
  foodexpress: '/images/platforms/cloud-kitchen-os.jpg',
  'cloud-kitchen-os': '/images/platforms/cloud-kitchen-os.jpg',
  servicehub: '/images/platforms/service-hub-web.jpg',
  'service-hub-web': '/images/platforms/service-hub-web.jpg',
  'test-portal': '/images/platforms/cet-test-portal.jpg',
  'cet-test-portal': '/images/platforms/cet-test-portal.jpg',
};

// 6 Core Platforms for Homepage section
export const HOMEPAGE_PLATFORMS = [
  {
    slug: 'novatax',
    name: 'NovaTax',
    image: '/images/platforms/novatax.jpg',
    alt: 'NovaTax tax and compliance dashboard',
    icon: 'account_balance',
    tag: 'ENTERPRISE SAAS',
    description: 'Enterprise Tax & Compliance platform for multistate & cross-border fiscal operations.',
    status: 'v4.2.0 STABLE',
    link: '/platforms?platform=novatax',
  },
  {
    slug: 'blastbee',
    name: 'BlastBee',
    image: '/images/platforms/blastbee.jpg',
    alt: 'BlastBee messaging campaign dashboard',
    icon: 'campaign',
    tag: 'COMMUNICATION ENGINE',
    description: 'High-volume marketing, omnichannel campaigns, and intelligence automation.',
    status: 'CLUSTER ONLINE',
    link: '/platforms?platform=blastbee',
  },
  {
    slug: 'smartbilling',
    name: 'Apna Store',
    image: '/images/platforms/apna-store.jpg',
    alt: 'Apna Store e-commerce storefront',
    icon: 'storefront',
    tag: 'B2C • MULTI-TENANT',
    description: 'Localized e-commerce and retail inventory operating system for direct-to-consumer merchants.',
    status: 'OPERATIONAL',
    link: '/platforms?platform=smartbilling',
  },
  {
    slug: 'foodexpress',
    name: 'Cloud Kitchen OS',
    image: '/images/platforms/cloud-kitchen-os.jpg',
    alt: 'Cloud Kitchen OS order management screen',
    icon: 'restaurant',
    tag: 'F&B OPERATIONS',
    description: 'Centralized order routing, recipe costing, kitchen display synchronization, and inventory depletion engine.',
    status: 'OPERATIONAL',
    link: '/platforms?platform=foodexpress',
  },
  {
    slug: 'servicehub',
    name: 'Service Hub Web',
    image: '/images/platforms/service-hub-web.jpg',
    alt: 'Service Hub Web field service scheduling',
    icon: 'handyman',
    tag: 'WORKFORCE MGMT',
    description: 'Hyper-local field service scheduling, job ticket dispatching, warranty verification, and real-time vendor payouts.',
    status: 'OPERATIONAL',
    link: '/platforms?platform=servicehub',
  },
  {
    slug: 'test-portal',
    name: 'CET Test Portal',
    image: '/images/platforms/cet-test-portal.jpg',
    alt: 'CET Test Portal mock examination interface',
    icon: 'quiz',
    tag: 'EDTECH TESTING',
    description: 'High-concurrency proctored mock examination portal for state-level entrance candidates with live percentile telemetry.',
    status: 'SANDBOX TESTING',
    link: '/platforms?platform=test-portal',
  },
];

export default function Platforms({ standalone = false, onOpenDrawer }) {
  const [platformsList, setPlatformsList] = useState(platforms);
  const [homePlatformsList, setHomePlatformsList] = useState(HOMEPAGE_PLATFORMS);
  const location = useLocation();
  const detailsScrollRef = useRef(null);

  // Parse query parameter ?platform=slug
  const searchParams = new URLSearchParams(location.search);
  const platformQuery = searchParams.get('platform');

  const [selectedSlug, setSelectedSlug] = useState(() => {
    if (platformQuery) {
      const match = platforms.find((p) => p.slug === platformQuery);
      if (match) return match.slug;
    }
    return platforms[0]?.slug || 'novatax';
  });

  useEffect(() => {
    fetchPlatforms().then((data) => {
      if (!data) return;

      const activePlatforms = data.map((remote) => {
        const local = platforms.find(
          (p) => p.slug === remote.slug || p.name.toLowerCase() === (remote.name || '').toLowerCase()
        );
        const slug = remote.slug || local?.slug || remote._id;
        return {
          ...local,
          ...remote,
          slug,
          name: remote.name || local?.name,
          tagline: remote.tagline || remote.shortDescription || local?.tagline,
          description: remote.description || local?.description,
          domain: remote.url || local?.domain,
          image: remote.image || remote.logo || LOCAL_PLATFORM_IMAGES[slug] || local?.image,
          features: remote.features?.length ? remote.features : (local?.features || []),
          benefits: remote.benefits?.length ? remote.benefits : (local?.benefits || []),
          useCases: remote.useCases?.length ? remote.useCases : (local?.useCases || []),
        };
      });

      setPlatformsList(activePlatforms);

      const flaggedHome = activePlatforms.filter((p) => p.showOnHomepage === true);
      const sourceHome = flaggedHome.length > 0
        ? flaggedHome
        : activePlatforms.filter((p) => HOMEPAGE_PLATFORMS.some((h) => h.slug === p.slug));

      const activeHome = sourceHome.map((remote) => {
        const homeItem = HOMEPAGE_PLATFORMS.find(
          (h) => h.slug === remote.slug || h.name.toLowerCase() === (remote.name || '').toLowerCase()
        );
        return {
          slug: remote.slug,
          name: remote.homepageName || homeItem?.name || remote.name,
          image: (remote.image && (remote.image.startsWith('data:') || remote.image.startsWith('http')))
            ? remote.image
            : (LOCAL_PLATFORM_IMAGES[remote.slug] || remote.image || remote.logo || homeItem?.image || '/images/platforms/novatax.jpg'),
          alt: homeItem?.alt || remote.name,
          icon: remote.icon || homeItem?.icon || 'hub',
          tag: remote.homepageTag || homeItem?.tag || remote.type || 'ENTERPRISE SAAS',
          description: remote.shortDescription || remote.description || homeItem?.description,
          status: remote.status || homeItem?.status || 'OPERATIONAL',
          link: `/platforms?platform=${remote.slug}`,
        };
      });

      setHomePlatformsList(activeHome);
    });
  }, []);

  // Sync selected platform if query param changes
  useEffect(() => {
    if (platformQuery) {
      const match = platformsList.find((p) => p.slug === platformQuery);
      if (match) {
        setSelectedSlug(match.slug);
      }
    } else if (platformsList.length > 0 && !platformsList.some((p) => p.slug === selectedSlug)) {
      setSelectedSlug(platformsList[0].slug);
    }
  }, [platformQuery, platformsList, selectedSlug]);

  const selectedPlatform =
    platformsList.find((platform) => platform.slug === selectedSlug) || platformsList[0];

  const handleSelectPlatform = (slug) => {
    setSelectedSlug(slug);
    // Smooth scroll the details panel back to top
    if (detailsScrollRef.current) {
      detailsScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Update URL query param cleanly without full page reload
    const newUrl = `${window.location.pathname}?platform=${slug}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  };

  const getPlatformImage = (platform) => {
    if (platform.image && (platform.image.startsWith('data:') || platform.image.startsWith('http'))) {
      return platform.image;
    }
    return LOCAL_PLATFORM_IMAGES[platform.slug] || platform.image || platform.logo;
  };

  // =========================================================================
  // 1. HOMEPAGE VIEW: 6 Image-based cards in 3 × 2 grid (kept intact)
  // =========================================================================
  if (!standalone) {
    return (
      <section
        id="platforms"
        className="w-full bg-surface-container-lowest text-on-surface py-20 sm:py-28 lg:py-32"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-gutter-lg">
          {/* Section Heading */}
          <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold text-secondary tracking-widest uppercase mb-3">
              <span className="w-2 h-0.5 bg-secondary"></span>
              OUR PLATFORMS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-on-surface tracking-tight leading-tight">
              Platforms Built to Solve Real-World Challenges
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 max-w-2xl leading-relaxed">
              Discover our technology platforms designed to simplify operations, enable innovation, and deliver impactful digital experiences.
            </p>
          </div>

          {/* 6 Platform Cards in a 3 × 2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {homePlatformsList.map((platform) => (
              <div
                key={platform.slug}
                className="group flex flex-col bg-white dark:bg-[#0c1830] rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden justify-between"
              >
                <div>
                  <Link
                    to={platform.link}
                    className="block overflow-hidden relative"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <CardImage
                      src={platform.image}
                      alt={platform.alt}
                      icon={platform.icon}
                      className="h-52 sm:h-56 md:h-60 w-full shrink-0"
                    />
                  </Link>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-500/20 text-secondary dark:text-blue-400 font-mono-tag text-xs font-bold uppercase tracking-wider">
                        {platform.tag}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono-tag">
                        {platform.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/20 text-secondary dark:text-blue-400 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[19px]">{platform.icon}</span>
                      </span>
                      <Link
                        to={platform.link}
                        className="text-xl sm:text-[22px] font-bold text-on-surface dark:text-white tracking-tight group-hover:text-secondary dark:group-hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                      >
                        {platform.name}
                      </Link>
                    </div>

                    <p className="text-sm sm:text-base text-on-surface-variant dark:text-slate-300 leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <Link
                    to={platform.link}
                    className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-secondary dark:text-blue-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                  >
                    <span>Explore Platform</span>
                    <span
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // 2. DEDICATED /platforms PAGE: Full Hero + Centered Compact Explorer
  // =========================================================================
  return (
    <main className="w-full bg-[#f8f9fc] text-[#10233f]">
      {/* SECTION 1: Full-Width Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#07172F] text-white min-h-[520px] md:min-h-[580px] lg:min-h-[620px] flex items-end">
        {/* Full Hero Background with smooth photographic / cybernetic depth */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/platforms-bg.png"
            alt="Enterprise Platforms Hero Background"
            className="w-full h-full object-cover object-right md:object-center opacity-75"
          />
          {/* Multi-layer gradient overlays: 
              1. Left-to-right gradient to ensure text readability on the left while revealing the bright graphic on the right
              2. Bottom-to-top subtle gradient to smoothly blend into the section below without creating a sharp horizontal cut */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07172F] via-[#07172F]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07172F] via-transparent to-[#07172F]/40" />
        </div>

        <div className="relative z-10 w-[90%] max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 pt-36 pb-16 lg:pb-20">
          <span className="font-label-caps text-xs sm:text-sm font-bold tracking-widest uppercase text-blue-300 inline-flex items-center gap-2">
            <span className="w-2.5 h-0.5 bg-blue-400"></span>
            OUR PLATFORMS
          </span>
          <h1 className="mt-3 max-w-4xl text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-tight">
            Enterprise Platforms Designed for Speed, Scale, and Clarity.
          </h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Aparaitech creates and operates specialized systems for modern operations, high-volume messaging, local commerce, and complex workflows.
          </p>
        </div>
      </section>

      {/* SECTION 2: Centered Platform Explorer (w-[90%] max-w-[1400px] with visible side margins) */}
      <section className="w-full py-10 sm:py-14 lg:py-16">
        <div className="w-[90%] max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
            {/* LEFT SIDEBAR: Platform Navigation (~29% width, compact 4–6px spacing) */}
            <aside className="w-full lg:w-[29%] lg:shrink-0 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3.5 sm:p-4 flex flex-col">
              <div className="pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="font-mono-tag text-xs font-bold uppercase tracking-wider text-slate-500">
                  Platforms ({platformsList.length})
                </span>
                <span className="text-[11px] text-slate-400">Select to explore</span>
              </div>

              {/* Compact navigation list with tight 4-6px spacing */}
              <div className="space-y-1.5 lg:max-h-[680px] overflow-y-auto pr-1">
                {platformsList.map((platform) => {
                  const isActive = platform.slug === selectedSlug;
                  return (
                    <button
                      key={platform.slug}
                      type="button"
                      onClick={() => handleSelectPlatform(platform.slug)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-all duration-150 group ${
                        isActive
                          ? 'bg-[#2563eb] text-white shadow-sm shadow-blue-500/20'
                          : 'bg-transparent text-slate-700 hover:bg-slate-100/90 hover:text-slate-900'
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-[#2563eb] group-hover:bg-blue-50'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[17px]">
                          {platform.icon || 'hub'}
                        </span>
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="block text-xs sm:text-[13px] font-semibold truncate leading-snug">
                          {platform.name}
                        </span>
                        <span
                          className={`block text-[11px] truncate leading-tight mt-0.5 ${
                            isActive ? 'text-blue-100' : 'text-slate-500'
                          }`}
                        >
                          {platform.type || platform.headline || 'Enterprise Platform'}
                        </span>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[15px] shrink-0 transition-transform ${
                          isActive
                            ? 'text-white translate-x-0.5'
                            : 'text-slate-400 opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        chevron_right
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* RIGHT SIDE: Dynamic Platform Details Window (~71% width, no image overflow, independent scrolling) */}
            <div className="w-full lg:w-[71%] flex-1 min-w-0 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col h-[740px] max-h-[82vh] overflow-hidden">
              {/* Independent scrollable content region */}
              <div
                ref={detailsScrollRef}
                className="overflow-y-auto flex-1 min-h-0 p-6 sm:p-8 space-y-6"
              >
                {/* Platform Image (Non-cropped, Aspect-ratio Preserved, Centered, No Overflow) */}
                <div className="w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-200/80 p-3 sm:p-4 flex items-center justify-center">
                  <img
                    src={getPlatformImage(selectedPlatform)}
                    alt={`${selectedPlatform.name} interface and architecture`}
                    loading="lazy"
                    className="w-full h-auto max-h-[380px] sm:max-h-[440px] max-w-full object-contain object-center rounded-lg shadow-xs"
                  />
                </div>

                {/* Header Information: Tag, Title, Status */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="px-2.5 py-1 rounded bg-blue-50 text-[#2563eb] font-mono-tag text-xs font-bold uppercase tracking-wider inline-block mb-2">
                      {selectedPlatform.type || selectedPlatform.tag || 'ENTERPRISE SYSTEM'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      {selectedPlatform.name}
                    </h2>
                    {selectedPlatform.tagline && (
                      <p className="text-sm font-medium text-slate-500 mt-1 italic">
                        &ldquo;{selectedPlatform.tagline}&rdquo;
                      </p>
                    )}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold font-mono-tag shrink-0">
                    {selectedPlatform.status || 'OPERATIONAL'}
                  </span>
                </div>

                {/* Platform Overview */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    PLATFORM OVERVIEW
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {selectedPlatform.purpose || selectedPlatform.description}
                  </p>
                </div>

                {/* What it solves & How it works */}
                {(selectedPlatform.problem || selectedPlatform.howWorks) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPlatform.problem && (
                      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-2">
                          <span className="material-symbols-outlined text-[18px]">problem</span>
                          <span>What It Solves</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {selectedPlatform.problem}
                        </p>
                      </div>
                    )}
                    {selectedPlatform.howWorks && (
                      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563eb] mb-2">
                          <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                          <span>How It Works</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {selectedPlatform.howWorks}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Key Capabilities / Features */}
                {selectedPlatform.features && selectedPlatform.features.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      KEY CAPABILITIES
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {selectedPlatform.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white hover:border-blue-200 transition-colors shadow-2xs"
                        >
                          <span className="w-5 h-5 rounded-full bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                            ✓
                          </span>
                          <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits & Use Cases */}
                {(selectedPlatform.benefits || selectedPlatform.useCases) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {selectedPlatform.benefits && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                          BUSINESS BENEFITS
                        </h4>
                        <ul className="space-y-2">
                          {selectedPlatform.benefits.map((b, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed"
                            >
                              <span className="text-[#2563eb] font-bold shrink-0">•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {selectedPlatform.useCases && (
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                          TARGET USE CASES
                        </h4>
                        <ul className="space-y-2">
                          {selectedPlatform.useCases.map((u, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 leading-relaxed"
                            >
                              <span className="text-[#2563eb] font-bold shrink-0">•</span>
                              <span>{u}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Extra buffer at bottom of scrollable region */}
                <div className="h-4" />
              </div>

              {/* PERSISTENT / FLOATING CTA AT BOTTOM OF DETAILS WINDOW */}
              <div className="shrink-0 border-t border-slate-200/90 bg-white/95 backdrop-blur-sm p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>
                    {selectedPlatform.domain
                      ? 'Live Enterprise Platform'
                      : 'Available for Enterprise Deployment'}
                  </span>
                </div>

                {selectedPlatform.domain ? (
                  <a
                    href={selectedPlatform.domain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2563eb] hover:bg-blue-600 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/20 group"
                  >
                    <span>Visit Our Platform</span>
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenDrawer}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-sm group"
                  >
                    <span>Request Platform Demo</span>
                    <span
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Banner at Bottom of /platforms */}
      <section className="border-t border-slate-200 bg-[#f5f8fd]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#10233f]">
              Have a platform idea of your own?
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Let&apos;s turn a complex business need into a useful digital experience.
            </p>
          </div>
          {onOpenDrawer && (
            <button
              className="inline-flex w-fit items-center gap-2 rounded-full bg-[#10233f] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#19385e]"
              onClick={onOpenDrawer}
              type="button"
            >
              Talk to Aparaitech <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
