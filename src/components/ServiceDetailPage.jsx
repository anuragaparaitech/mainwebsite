import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { services } from '../services/serviceDetails';

function SectionHeading({ title, description }) {
  return (
    <div className="max-w-2xl mb-10">
      <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold tracking-tight text-on-surface">
        {title}
      </h2>
      {description && <p className="mt-4 text-on-surface-variant leading-relaxed">{description}</p>}
    </div>
  );
}

function ServiceNotFound() {
  return (
    <main className="min-h-[65vh] bg-surface px-6 pt-40 pb-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-on-surface">Explore our services</h1>
        <p className="mt-4 text-on-surface-variant">The service page you requested is unavailable.</p>
        <Link className="inline-flex mt-8 text-secondary font-semibold hover:underline" to="/services">
          Back to Services <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
    </main>
  );
}

export default function ServiceDetailPage({ slug: serviceSlug }) {
  const { slug: routeSlug } = useParams();
  const slug = serviceSlug || routeSlug;
  const service = services.find((item) => item.slug === slug);

  useEffect(() => {
    document.title = service ? `${service.title} | Aparaitech Software` : 'Services | Aparaitech Software';
  }, [service]);

  if (!service) return <ServiceNotFound />;

  return (
    <main className="bg-surface text-on-surface">
      <section className="px-6 pt-36 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-on-surface">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant">
                {service.heroDescription}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link className="inline-flex items-center gap-2 rounded bg-secondary px-6 py-3.5 text-white font-semibold hover:bg-secondary-container transition-colors" to="/contact">
                  Discuss your project <span aria-hidden="true">→</span>
                </Link>
                <Link className="inline-flex items-center gap-2 px-2 py-3 text-on-surface font-semibold hover:text-secondary transition-colors" to="/services">
                  <span aria-hidden="true">←</span> Back to Services
                </Link>
              </div>
            </div>
            {service.image && (
              <div className="overflow-hidden rounded-xl border border-outline-variant/50 bg-white shadow-sm">
                <img
                  alt={service.imageAlt}
                  className="aspect-[3/2] w-full object-cover"
                  height="600"
                  src={service.image}
                  width="900"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20 bg-white border-y border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-[0.7fr_1.3fr] gap-8 md:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">A solution shaped around your business</h2>
          </div>
          <p className="text-lg leading-relaxed text-on-surface-variant">{service.overview}</p>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading title="What we can deliver" description="A focused set of capabilities, selected to fit your goals and existing environment." />
          <div className="grid sm:grid-cols-2 gap-4">
            {service.features.map((feature) => (
              <div className="flex gap-4 rounded-lg border border-outline-variant/50 bg-white p-5 md:p-6" key={feature}>
                <p className="font-semibold leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24 bg-white border-y border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading title="A clear path from idea to impact" description="Our delivery process keeps decisions visible and progress grounded in your business priorities." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.process.map(([step, detail]) => (
              <article className="rounded-lg border border-outline-variant/50 p-6" key={step}>
                <h3 className="text-xl font-bold">{step}</h3>
                <p className="mt-3 leading-relaxed text-on-surface-variant">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <SectionHeading title="The right tools for the job" description="We select technologies to suit your requirements, team, and operational context—not the other way around." />
            <div className="flex flex-wrap gap-2.5">
              {service.technologies.map((technology) => (
                <span className="rounded-full border border-outline-variant/60 bg-white px-4 py-2 text-sm font-medium text-on-surface-variant" key={technology}>
                  {technology}
                </span>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading title="Outcomes that matter" />
            <div className="space-y-5">
              {service.benefits.map(([benefit, detail]) => (
                <div className="border-b border-outline-variant/50 pb-5 last:border-0" key={benefit}>
                  <h3 className="font-semibold">{benefit}</h3>
                  <p className="mt-1.5 leading-relaxed text-on-surface-variant">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24 bg-white border-y border-outline-variant/30">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeading title="Use cases" description="Explore practical ways this service can support teams across different industries." />
          {service.industryUseCases ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.industryUseCases.map(({ industry, description }) => (
                <article className="rounded-lg border border-outline-variant/50 bg-surface p-5 md:p-6" key={industry}>
                  <h3 className="font-semibold text-on-surface">{industry}</h3>
                  <p className="mt-2 leading-relaxed text-on-surface-variant">{description}</p>
                </article>
              ))}
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2">
              {service.useCases.map((useCase) => (
                <li className="flex gap-3 rounded-lg bg-surface px-5 py-4 leading-relaxed" key={useCase}>
                  <span aria-hidden="true" className="material-symbols-outlined text-secondary">arrow_outward</span>
                  <span>{useCase}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="max-w-[900px] mx-auto">
          <SectionHeading title="Frequently asked questions" />
          <div className="divide-y divide-outline-variant/60 border-y border-outline-variant/60">
            {service.faqs.map(([question, answer]) => (
              <details className="group py-5" key={question}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold">
                  {question}
                  <span aria-hidden="true" className="text-xl text-secondary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl leading-relaxed text-on-surface-variant">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20 bg-primary-container text-white">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Have a challenge in mind?</h2>
            <p className="mt-4 leading-relaxed text-white/75">Tell us what you’re working toward. We’ll help you explore a practical next step.</p>
          </div>
          <Link className="inline-flex shrink-0 items-center justify-center gap-2 rounded bg-white px-6 py-3.5 font-semibold text-primary-container hover:bg-surface-container-low transition-colors" to="/contact">
            Contact Us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
