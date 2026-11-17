import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CardImage from './CardImage';
import { platforms } from '../data/platforms';

export const PLATFORM_CARDS = [
  {
    slug: 'novatax',
    name: 'NovaTax',
    image: '/images/platforms/novatax.jpg',
    alt: 'NovaTax tax and compliance dashboard',
    icon: 'account_balance',
    tag: 'ENTERPRISE SAAS',
    description: 'Enterprise Tax & Compliance platform for multistate & cross-border fiscal operations.',
    status: 'v4.2.0 STABLE',
    targetSlug: 'novatax',
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
    targetSlug: 'blastbee',
    link: '/platforms?platform=blastbee',
  },
  {
    slug: 'apna-store',
    name: 'Apna Store',
    image: '/images/platforms/apna-store.jpg',
    alt: 'Apna Store e-commerce storefront',
    icon: 'storefront',
    tag: 'B2C • MULTI-TENANT',
    description: 'Localized e-commerce and retail inventory operating system for direct-to-consumer merchants.',
    status: 'OPERATIONAL',
    targetSlug: 'smartbilling',
    link: '/platforms?platform=smartbilling',
  },
  {
    slug: 'cloud-kitchen-os',
    name: 'Cloud Kitchen OS',
    image: '/images/platforms/cloud-kitchen-os.jpg',
    alt: 'Cloud Kitchen OS order management screen',
    icon: 'restaurant',
    tag: 'F&B OPERATIONS',
    description: 'Centralized order routing, recipe costing, kitchen display synchronization, and inventory depletion engine.',
    status: 'OPERATIONAL',
    targetSlug: 'foodexpress',
    link: '/platforms?platform=foodexpress',
  },
  {
    slug: 'service-hub-web',
    name: 'Service Hub Web',
    image: '/images/platforms/service-hub-web.jpg',
    alt: 'Service Hub Web field service scheduling',
    icon: 'handyman',
    tag: 'WORKFORCE MGMT',
    description: 'Hyper-local field service scheduling, job ticket dispatching, warranty verification, and real-time vendor payouts.',
    status: 'OPERATIONAL',
    targetSlug: 'servicehub',
    link: '/platforms?platform=servicehub',
  },
  {
    slug: 'cet-test-portal',
    name: 'CET Test Portal',
    image: '/images/platforms/cet-test-portal.jpg',
    alt: 'CET Test Portal mock examination interface',
    icon: 'quiz',
    tag: 'EDTECH TESTING',
    description: 'High-concurrency proctored mock examination portal for state-level entrance candidates with live percentile telemetry.',
    status: 'SANDBOX TESTING',
    targetSlug: 'test-portal',
    link: '/platforms?platform=test-portal',
  },
];

function PlatformIcon({ icon }) {
  return (
    <span className="material-symbols-outlined text-[21px]" aria-hidden="true">
      {icon}
    </span>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-blue-100 bg-[#f5f8ff] p-5 md:p-6">
      <h4 className="font-body-sm text-body-sm font-bold uppercase tracking-[0.16em] text-[#2563eb]">{title}</h4>
      <div className="mt-3 font-body-md text-body-md leading-relaxed text-slate-600">{children}</div>
    </section>
  );
}

export default function Platforms({ standalone = false, onOpenDrawer }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const platformQuery = searchParams.get('platform');

  const [selectedSlug, setSelectedSlug] = useState(() => {
    if (platformQuery) {
      const match = platforms.find((p) => p.slug === platformQuery);
      if (match) return match.slug;
    }
    return platforms[0]?.slug || 'novatax';
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (platformQuery) {
      const match = platforms.find((p) => p.slug === platformQuery);
      if (match) {
        setSelectedSlug(match.slug);
        const el = document.getElementById('platform-details');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [platformQuery]);

  const selectedPlatform = platforms.find((platform) => platform.slug === selectedSlug) || platforms[0];

  const selectPlatform = (slug) => {
    setSelectedSlug(slug);
    setIsExpanded(false);
  };

  return (
    <div id="platforms-section" className="w-full">
      {/* Dedicated /platforms Hero Banner */}
      {standalone && (
        <section className="relative isolate flex min-h-[500px] items-end overflow-hidden bg-[#071b35] px-5 pb-16 pt-36 md:px-12 md:pb-24 lg:px-16">
          <img
            alt="Platforms hero background"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-40 mix-blend-luminosity"
            src="/images/platforms-bg.png"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071b35] via-[#071b35]/70 to-transparent" />
          <div className="mx-auto max-w-[1280px]">
            <span className="font-label-caps text-label-caps font-bold tracking-widest uppercase text-blue-300">
              OUR PLATFORMS
            </span>
            <h1 className="mt-3 max-w-4xl font-display-hero-mobile text-headline-lg font-bold text-white md:font-display-hero md:text-display-hero">
              Enterprise platforms designed for speed, scale, and clarity.
            </h1>
            <p className="mt-5 max-w-2xl font-body-lg text-body-lg text-slate-200">
              Aparaitech creates and operates specialized systems for modern operations, high-volume messaging, local commerce, and complex workflows.
            </p>
          </div>
        </section>
      )}

      {/* Main 6 Platforms Section (Homepage & Overview) */}
      <section className={`w-full bg-surface-container-lowest text-on-surface ${standalone ? 'py-16 sm:py-24' : 'py-20 sm:py-28 lg:py-32'}`}>
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

          {/* 6 Platform Cards in a 3 × 2 Grid on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PLATFORM_CARDS.map((platform) => (
              <div
                key={platform.slug}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 overflow-hidden justify-between"
              >
                <div>
                  {/* Card Image with Hover Zoom */}
                  <Link to={platform.link} className="block overflow-hidden relative" tabIndex={-1} aria-hidden="true">
                    <CardImage
                      src={platform.image}
                      alt={platform.alt}
                      icon={platform.icon}
                      className="h-52 sm:h-56 md:h-60 w-full shrink-0"
                    />
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    {/* Tag & Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded bg-blue-50 text-secondary font-mono-tag text-xs font-bold uppercase tracking-wider">
                        {platform.tag}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 font-mono-tag">
                        {platform.status}
                      </span>
                    </div>

                    {/* Platform Icon & Name */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-blue-50 text-secondary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[19px]">{platform.icon}</span>
                      </span>
                      <Link
                        to={platform.link}
                        className="text-xl sm:text-[22px] font-bold text-on-surface tracking-tight group-hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                      >
                        {platform.name}
                      </Link>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      {platform.description}
                    </p>
                  </div>
                </div>

                {/* Explore Platform Link */}
                <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={platform.link}
                    className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-secondary hover:text-blue-700 transition-colors group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
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

      {/* Standalone Page Deep Dive & Interactive Platform Details */}
      {standalone && (
        <section id="platform-details" className="mx-auto max-w-[1280px] px-5 py-14 md:px-12 lg:px-16 border-t border-slate-200">
          <div className="mb-10">
            <span className="font-label-caps text-label-caps font-bold uppercase tracking-wider text-secondary">
              DETAILED ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#10233f] mt-1">
              Explore Platform Capabilities
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
            {/* Sidebar selector on dedicated page */}
            <aside className="space-y-3">
              {platforms.map((platform) => {
                const active = platform.slug === selectedPlatform.slug;
                return (
                  <button
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      active
                        ? 'border-[#2563eb] bg-[#f5f8ff] shadow-md shadow-blue-100'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                    key={platform.slug}
                    onClick={() => selectPlatform(platform.slug)}
                    type="button"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? 'bg-[#2563eb] text-white' : 'bg-slate-100 text-[#10233f]'}`}>
                        <PlatformIcon icon={platform.icon} />
                      </span>
                      <span className="font-mono-tag text-mono-tag text-slate-500">{platform.status || 'OPERATIONAL'}</span>
                    </div>
                    <h3 className="mt-4 font-title-md text-title-md font-bold text-[#10233f]">{platform.name}</h3>
                    <p className="mt-1 font-body-sm text-body-sm text-slate-600 line-clamp-2">{platform.description}</p>
                  </button>
                );
              })}
            </aside>

            {/* Platform Detail Card */}
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-6">
                <div>
                  <span className="font-label-caps text-label-caps font-bold uppercase tracking-wider text-[#2563eb]">
                    {selectedPlatform.type || selectedPlatform.tag || 'ENTERPRISE SYSTEM'}
                  </span>
                  <h2 className="mt-1 font-headline-lg text-headline-lg font-bold text-[#10233f]">
                    {selectedPlatform.name}
                  </h2>
                </div>
                <span className="rounded-full bg-blue-50 px-3.5 py-1.5 font-body-sm text-body-sm font-semibold text-[#2563eb]">
                  {selectedPlatform.status || 'OPERATIONAL'}
                </span>
              </div>

              <p className="mt-6 font-body-lg text-body-lg leading-relaxed text-slate-700">
                {selectedPlatform.purpose || selectedPlatform.description}
              </p>

              {selectedPlatform.features && (
                <div className="mt-8">
                  <h4 className="font-body-sm text-body-sm font-bold uppercase tracking-[0.16em] text-[#2563eb]">
                    Key Capabilities
                  </h4>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {selectedPlatform.features.map((feature) => (
                      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4" key={feature}>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-[#2563eb]">
                          <PlatformIcon icon={selectedPlatform.icon} />
                        </span>
                        <span className="pt-1 font-body-sm text-body-sm font-semibold leading-relaxed text-[#10233f]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedPlatform.domain && (
                <a
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-3 font-body-sm text-body-sm font-semibold text-white transition-all hover:bg-[#174fc1] hover:shadow-lg hover:shadow-blue-200"
                  href={selectedPlatform.domain}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Visit Official Website
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">open_in_new</span>
                </a>
              )}

              <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="min-h-0 overflow-hidden">
                  <div className="mt-7 grid gap-4 border-t border-slate-200 pt-7 md:grid-cols-2">
                    <DetailSection title="What it solves">{selectedPlatform.problem || 'Engineered to reduce operational friction and streamline high-volume business processes.'}</DetailSection>
                    <DetailSection title="How it helps">{selectedPlatform.howWorks || 'Combines cloud-native microservices, automated workflows, and enterprise reliability.'}</DetailSection>
                  </div>
                  {selectedPlatform.benefits && (
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <DetailSection title="Benefits">
                        <ul className="space-y-2">
                          {selectedPlatform.benefits.map((benefit) => (
                            <li className="flex items-start gap-2" key={benefit}>
                              <span className="text-[#2563eb]">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </DetailSection>
                      {selectedPlatform.useCases && (
                        <DetailSection title="Use cases">
                          <ul className="space-y-2">
                            {selectedPlatform.useCases.map((useCase) => (
                              <li className="flex items-start gap-2" key={useCase}>
                                <span className="text-[#2563eb]">✓</span>
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </DetailSection>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <button
                aria-expanded={isExpanded}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-3 font-body-sm text-body-sm font-semibold text-white transition-all hover:bg-[#174fc1] hover:shadow-lg hover:shadow-blue-200"
                onClick={() => setIsExpanded((expanded) => !expanded)}
                type="button"
              >
                {isExpanded ? 'Read Less' : 'Read More Details'}
                <span className="material-symbols-outlined text-[18px]">{isExpanded ? 'expand_less' : 'arrow_forward'}</span>
              </button>
            </article>
          </div>
        </section>
      )}

      {/* Consultation Banner on /platforms */}
      {standalone && (
        <section className="border-t border-slate-200 bg-[#f5f8fd]">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#10233f]">Have a platform idea of your own?</h2>
              <p className="mt-2 font-body-md text-body-md text-slate-600">Let’s turn a complex business need into a useful digital experience.</p>
            </div>
            {onOpenDrawer && (
              <button
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#10233f] px-5 py-3 font-body-sm text-body-sm font-semibold text-white transition-colors hover:bg-[#19385e]"
                onClick={onOpenDrawer}
                type="button"
              >
                Talk to Aparaitech <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
