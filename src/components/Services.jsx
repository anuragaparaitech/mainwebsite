import { useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../services/serviceDetails';

export default function Services({ standalone = false }) {
  const [activeSlug, setActiveSlug] = useState('cloud-solutions');
  const activeService = services.find((service) => service.slug === activeSlug) || services[0];

  return (
    <section className={`w-full bg-surface text-on-surface ${standalone ? 'pb-32' : 'py-32'}`}>
      {standalone ? (
        <div className="services-hero">
          <div className="services-hero-content">
            <div className="max-w-3xl">
              <h2 className="font-headline-lg text-headline-lg font-bold text-white tracking-tight">
                High-Assurance Digital Services
              </h2>
              <p className="font-body-md text-body-md text-white/90 mt-2 max-w-xl">
                Modular engineering practices purpose-built to accelerate production timetables while neutralizing operational risk.
              </p>
            </div>
          </div>
        </div>
      ) : null}
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
        {!standalone && (
          <div className="mb-16">
            <div className="max-w-3xl">
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                High-Assurance Digital Services
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
                Modular engineering practices purpose-built to accelerate production timetables while neutralizing operational risk.
              </p>
            </div>
          </div>
        )}
        <div className="grid gap-6 lg:grid-cols-[minmax(230px,0.32fr)_minmax(0,1fr)] lg:gap-10">
          <nav aria-label="Service categories" className="space-y-2">
            {services.map((service, index) => {
              const isActive = service.slug === activeService.slug;
              return (
                <button
                  aria-pressed={isActive}
                  className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                    isActive
                      ? 'border-secondary bg-secondary text-white shadow-sm'
                      : 'border-outline-variant/50 bg-white text-on-surface hover:border-secondary/50 hover:bg-surface-container-low'
                  }`}
                  key={service.slug}
                  onClick={() => setActiveSlug(service.slug)}
                  onFocus={() => setActiveSlug(service.slug)}
                  onMouseEnter={() => setActiveSlug(service.slug)}
                  type="button"
                >
                  <span className="w-7 shrink-0 font-mono-tag text-xs opacity-70">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-semibold leading-snug">{service.cardTitle}</span>
                  <span aria-hidden="true" className="material-symbols-outlined ml-auto text-[18px]">chevron_right</span>
                </button>
              );
            })}
          </nav>
          <section aria-label={`${activeService.cardTitle} industries`} className="min-w-0 rounded-xl border border-outline-variant/50 bg-white p-5 shadow-sm md:p-8">
            <div className="flex flex-col gap-5 border-b border-outline-variant/40 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-on-surface md:text-3xl">{activeService.cardTitle}</h3>
                <p className="mt-3 leading-relaxed text-on-surface-variant">{activeService.shortDescription}</p>
              </div>
              <Link className="inline-flex shrink-0 items-center gap-2 font-semibold text-secondary hover:underline" to={`/services/${activeService.slug}`}>
                Explore service <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {activeService.industryUseCases.map(({ industry, description }) => (
                <Link
                  aria-label={`${industry}: ${description}. Explore ${activeService.cardTitle}`}
                  className="group rounded-lg border border-outline-variant/40 bg-surface p-4 transition-colors hover:border-secondary/50 hover:bg-secondary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  key={industry}
                  to={`/services/${activeService.slug}`}
                >
                  <span className="font-semibold text-on-surface group-hover:text-secondary">{industry}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-on-surface-variant">{description}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
