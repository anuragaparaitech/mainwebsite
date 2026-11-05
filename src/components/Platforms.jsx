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
      <section className="relative isolate flex min-h-[560px] items-end overflow-hidden bg-[#071b35] pt-32 md:min-h-[640px]" aria-labelledby="platforms-hero-title">
        <img
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=85"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,22,44,0.94)_0%,rgba(5,22,44,0.7)_48%,rgba(5,22,44,0.25)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(5,22,44,0.86)_0%,transparent_45%)]" />
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-16 md:px-12 md:pb-24 lg:px-16">
          <div className="max-w-3xl animate-[reveal-up_0.7s_ease_both]">
            <p className="font-body-sm text-body-sm font-semibold tracking-wide text-[#9fc4ff]">APARAITECH SOFTWARE</p>
            <h1 className="mt-5 font-display-hero-mobile text-[clamp(2.75rem,7vw,5.25rem)] font-bold leading-[1.05] tracking-[-0.04em] text-white" id="platforms-hero-title">
              Our Platforms
            </h1>
            <p className="mt-6 max-w-2xl font-body-lg text-body-lg leading-relaxed text-blue-50/90 md:text-[21px]">
              Technology that simplifies business. Innovation that creates possibilities.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-12 md:py-28 lg:px-16" id="platforms-section">
        <div className="max-w-2xl">
          <p className="font-body-sm text-body-sm font-semibold text-[#2563eb]">Product ecosystem</p>
          <h2 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight tracking-[-0.035em] text-[#10233f]">Explore Our Platforms.</h2>
          <p className="mt-5 font-body-lg text-body-lg leading-relaxed text-slate-600">
            Discover focused digital products built across education, compliance, workforce, commerce and operations.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[270px_1fr] lg:gap-16">
          <nav aria-label="Platform selector" className="border-y border-slate-200 lg:border-y-0 lg:border-l lg:pl-5">
            <div className="grid sm:grid-cols-2 lg:block">
              {platforms.map((platform) => {
                const active = selectedPlatform.slug === platform.slug;
                return (
                  <button
                    aria-selected={active}
                    className={`group relative flex w-full items-center gap-3 border-b border-slate-200 px-1 py-4 text-left font-body-sm text-body-sm transition-all duration-300 sm:px-3 lg:py-3.5 ${active ? 'font-semibold text-[#2563eb]' : 'text-slate-600 hover:translate-x-1 hover:text-[#2563eb]'}`}
                    key={platform.slug}
                    onClick={() => selectPlatform(platform.slug)}
                    role="tab"
                    type="button"
                  >
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ${active ? 'bg-[#2563eb] ring-4 ring-blue-100' : 'bg-slate-300 group-hover:bg-blue-300'}`} />
                    {platform.name}
                  </button>
                );
              })}
            </div>
          </nav>

          <article className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-[0_20px_70px_rgba(15,35,63,0.12)]" key={selectedPlatform.slug} role="tabpanel">
            <div className="aspect-video w-full overflow-hidden bg-[#10233f]">
              <img
                alt={`${selectedPlatform.name} platform`}
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
                src={selectedPlatform.image}
              />
            </div>

            <div className="p-6 md:p-10 lg:p-12">
              <p className="font-body-sm text-body-sm font-bold uppercase tracking-[0.16em] text-[#2563eb]">{selectedPlatform.type}</p>
              <h3 className="mt-3 text-[clamp(1.9rem,4vw,3.25rem)] font-bold leading-tight tracking-[-0.035em] text-[#10233f]">{selectedPlatform.name}</h3>
              <p className="mt-5 max-w-3xl font-body-lg text-body-lg leading-relaxed text-slate-600">{selectedPlatform.description}</p>

              <div className="mt-8 border-t border-slate-200 pt-7">
                <p className="font-body-sm text-body-sm font-bold uppercase tracking-[0.16em] text-[#10233f]">Key capabilities</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedPlatform.features.map((feature) => (
                    <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-[#f5f8ff] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md" key={feature}>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[#2563eb]">
                        <PlatformIcon icon={selectedPlatform.icon} />
                      </span>
                      <span className="pt-1 font-body-sm text-body-sm font-semibold leading-relaxed text-[#10233f]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

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
            </div>
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
