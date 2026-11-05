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
    <section className="rounded-2xl border border-blue-100 bg-[#f5f8ff] p-5 md:p-6">
      <h4 className="font-body-sm text-body-sm font-bold uppercase tracking-[0.16em] text-[#2563eb]">{title}</h4>
      <div className="mt-3 font-body-md text-body-md leading-relaxed text-slate-600">{children}</div>
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
    <main className="min-h-screen bg-white text-[#10233f]">
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-[#071b35] px-5 pb-16 pt-36 md:px-12 md:pb-24 lg:px-16">
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

      <section className="mx-auto max-w-[1280px] px-5 py-14 md:px-12 lg:px-16">
        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
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
                    <span className="font-mono-tag text-mono-tag text-slate-500">{platform.status}</span>
                  </div>
                  <h3 className="mt-4 font-title-md text-title-md font-bold text-[#10233f]">{platform.name}</h3>
                  <p className="mt-1 font-body-sm text-body-sm text-slate-600">{platform.headline}</p>
                </button>
              );
            })}
          </aside>

          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-6">
              <div>
                <span className="font-label-caps text-label-caps font-bold uppercase tracking-wider text-[#2563eb]">{selectedPlatform.tag}</span>
                <h2 className="mt-1 font-headline-lg text-headline-lg font-bold text-[#10233f]">{selectedPlatform.name}</h2>
              </div>
              <span className="rounded-full bg-blue-50 px-3.5 py-1.5 font-body-sm text-body-sm font-semibold text-[#2563eb]">{selectedPlatform.status}</span>
            </div>

            <p className="mt-6 font-body-lg text-body-lg leading-relaxed text-slate-700">{selectedPlatform.description}</p>

            <div className="mt-8">
              <h4 className="font-body-sm text-body-sm font-bold uppercase tracking-[0.16em] text-[#2563eb]">Key Capabilities</h4>
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
                  <DetailSection title="What it solves">{selectedPlatform.problem}</DetailSection>
                  <DetailSection title="How it helps">{selectedPlatform.howWorks}</DetailSection>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <DetailSection title="Benefits">
                    <ul className="space-y-2">
                      {selectedPlatform.benefits.map((benefit) => <li className="flex items-start gap-2" key={benefit}><span className="text-[#2563eb]">•</span>{benefit}</li>)}
                    </ul>
                  </DetailSection>
                  <DetailSection title="Use cases">
                    <ul className="space-y-2">
                      {selectedPlatform.useCases.map((useCase) => <li className="flex items-start gap-2" key={useCase}><span className="text-[#2563eb]">•</span>{useCase}</li>)}
                    </ul>
                  </DetailSection>
                </div>
              </div>
            </div>

            <button
              aria-expanded={isExpanded}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2563eb] px-5 py-3 font-body-sm text-body-sm font-semibold text-white transition-all hover:bg-[#174fc1] hover:shadow-lg hover:shadow-blue-200"
              onClick={() => setIsExpanded((expanded) => !expanded)}
              type="button"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
              <span className="material-symbols-outlined text-[18px]">{isExpanded ? 'expand_less' : 'arrow_forward'}</span>
            </button>
          </article>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-[#f5f8fd]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-14 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#10233f]">Have a platform idea of your own?</h2>
            <p className="mt-2 font-body-md text-body-md text-slate-600">Let’s turn a complex business need into a useful digital experience.</p>
          </div>
          <button className="inline-flex w-fit items-center gap-2 rounded-full bg-[#10233f] px-5 py-3 font-body-sm text-body-sm font-semibold text-white transition-colors hover:bg-[#19385e]" onClick={onOpenDrawer} type="button">
            Talk to Aparaitech <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>
    </main>
  );
}