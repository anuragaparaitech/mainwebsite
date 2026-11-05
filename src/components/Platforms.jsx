import { useState } from 'react';
import { platforms } from '../data/platforms';

function PlatformIcon({ icon }) {
  return (
    <span className="material-symbols-outlined text-[21px]" aria-hidden="true">
      {icon}
    </span>
  );
}

function DetailSection({ title, children }) {
  return (
    <section className="rounded-2xl border border-outline-variant bg-surface-container-low p-5 md:p-6">
      <h4 className="font-body-sm text-body-sm font-bold uppercase tracking-[0.16em] text-secondary">{title}</h4>
      <div className="mt-3 font-body-md text-body-md leading-relaxed text-on-surface-variant">{children}</div>
    </section>
  );
}

export default function Platforms({ onOpenDrawer }) {
  const [selectedSlug, setSelectedSlug] = useState(platforms[0].slug);
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedPlatform = platforms.find((platform) => platform.slug === selectedSlug) || platforms[0];

  const selectPlatform = (slug) => {
    setSelectedSlug(slug);
    setIsExpanded(false);
  };

  return (
    <main className="min-h-screen bg-white text-on-surface">
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-primary-container px-5 pb-16 pt-36 md:px-12 md:pb-24 lg:px-16">
        <img
          alt="Platforms hero background"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-40 mix-blend-luminosity"
          src="/images/platforms-bg.png"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary-container via-primary-container/70 to-transparent" />
        <div className="mx-auto max-w-[1280px]">
          <span className="font-label-caps text-label-caps font-bold tracking-widest uppercase text-secondary-fixed">
            OUR PLATFORMS
          </span>
          <h1 className="mt-3 max-w-4xl font-display-hero-mobile text-headline-lg font-bold text-white md:font-display-hero md:text-display-hero">
            Enterprise platforms designed for speed, scale, and clarity.
          </h1>
          <p className="mt-5 max-w-2xl font-body-lg text-body-lg text-white/90">
            Aparaitech creates and operates specialized systems for modern operations, high-volume messaging, local commerce, and complex workflows.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-12 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          <aside className="space-y-3">
            {platforms.map((platform) => {
              const active = platform.slug === selectedPlatform.slug;
              return (
                <button
                  className={`w-full rounded-2xl border p-5 text-left transition-all ${
                    active
                      ? 'border-secondary bg-surface-container-low shadow-md shadow-blue-100'
                      : 'border-outline-variant bg-white hover:border-secondary-fixed hover:bg-secondary-fixed hover:shadow-md'
                  }`}
                  key={platform.slug}
                  onClick={() => selectPlatform(platform.slug)}
                  type="button"
                >
                  <div className="flex items-center justify-between">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${active ? 'bg-secondary text-white' : 'bg-surface-container text-on-surface'}`}>
                      <PlatformIcon icon={platform.icon} />
                    </span>
                    <span className="font-mono-tag text-mono-tag text-on-surface-variant">{platform.status}</span>
                  </div>
                  <h3 className="mt-4 font-title-md text-title-md font-bold text-on-surface">{platform.name}</h3>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{platform.headline}</p>
                </button>
              );
            })}
          </aside>

          <article className="rounded-3xl border border-outline-variant bg-white p-7 shadow-sm md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-6">
              <div>
                <span className="font-label-caps text-label-caps font-bold uppercase tracking-wider text-secondary">{selectedPlatform.tag}</span>
                <h2 className="mt-1 font-headline-lg text-headline-lg font-bold text-on-surface">{selectedPlatform.name}</h2>
              </div>
              <span className="rounded-full bg-secondary-fixed px-3.5 py-1.5 font-body-sm text-body-sm font-semibold text-secondary">{selectedPlatform.status}</span>
            </div>

            <p className="mt-6 font-body-lg text-body-lg leading-relaxed text-on-surface-variant">{selectedPlatform.description}</p>

            <div className="mt-8">
              <h4 className="font-body-sm text-body-sm font-bold uppercase tracking-[0.16em] text-secondary">Key Capabilities</h4>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {selectedPlatform.features.map((feature) => (
                  <div className="flex items-start gap-3 rounded-xl border border-outline-variant bg-surface-container-low p-4" key={feature}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary-fixed text-secondary">
                      <PlatformIcon icon={selectedPlatform.icon} />
                    </span>
                    <span className="pt-1 font-body-sm text-body-sm font-semibold leading-relaxed text-on-surface">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedPlatform.domain && (
              <a
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 font-body-sm text-body-sm font-semibold text-white transition-all hover:bg-secondary-container hover:shadow-lg hover:shadow-blue-200"
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
                <div className="mt-7 grid gap-4 border-t border-outline-variant pt-7 md:grid-cols-2">
                  <DetailSection title="What it solves">{selectedPlatform.problem}</DetailSection>
                  <DetailSection title="How it helps">{selectedPlatform.howWorks}</DetailSection>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <DetailSection title="Benefits">
                    <ul className="space-y-2">
                      {selectedPlatform.benefits.map((benefit) => <li className="flex items-start gap-2" key={benefit}><span className="text-tertiary">•</span>{benefit}</li>)}
                    </ul>
                  </DetailSection>
                  <DetailSection title="Use cases">
                    <ul className="space-y-2">
                      {selectedPlatform.useCases.map((useCase) => <li className="flex items-start gap-2" key={useCase}><span className="text-tertiary">•</span>{useCase}</li>)}
                    </ul>
                  </DetailSection>
                </div>
              </div>
            </div>

            <button
              aria-expanded={isExpanded}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 font-body-sm text-body-sm font-semibold text-white transition-all hover:bg-secondary-container hover:shadow-lg hover:shadow-blue-200"
              onClick={() => setIsExpanded((expanded) => !expanded)}
              type="button"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
              <span className="material-symbols-outlined text-[18px]">{isExpanded ? 'expand_less' : 'arrow_forward'}</span>
            </button>
          </article>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-on-surface">Have a platform idea of your own?</h2>
            <p className="mt-2 font-body-md text-body-md text-on-surface-variant">Let’s turn a complex business need into a useful digital experience.</p>
          </div>
          <button className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary px-5 py-3 font-body-sm text-body-sm font-semibold text-white transition-colors hover:bg-secondary-container" onClick={onOpenDrawer} type="button">
            Talk to Aparaitech <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>
    </main>
  );
}