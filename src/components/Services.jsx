import CardImage from './CardImage';

// ---- EDIT HERE: card text and image paths ----------------------------------
// Images go in  public/images/services/  (recommended 800 x 500 px, JPG/WebP, under ~200 KB)
const SERVICES = [
  {
    image: '/images/services/cloud-solutions.jpg',
    alt: 'Cloud infrastructure and data center servers',
    fallbackIcon: 'cloud',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
      </svg>
    ),
    tag: 'INFRASTRUCTURE',
    title: 'Cloud Solutions',
    description:
      'Resilient multi-cloud architectures, auto-scaling and migration. Kubernetes orchestration, zero-downtime database failovers, and cost telemetry.',
    link: 'Explore Architecture',
  },
  {
    image: '/images/services/custom-software.jpg',
    alt: 'Developers building enterprise software',
    fallbackIcon: 'code',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
        <line x1="14" x2="10" y1="4" y2="20"></line>
      </svg>
    ),
    tag: 'FULL-CYCLE DEV',
    title: 'Custom Software',
    description:
      'Tailored enterprise applications engineered for massive scale. Event-driven backend backbones, robust micro-frontends, and strict domain isolation.',
    link: 'Engineering Stack',
  },
  {
    image: '/images/services/ai-automation.jpg',
    alt: 'AI and automation pipeline visualization',
    fallbackIcon: 'smart_toy',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    tag: 'INTELLIGENCE',
    title: 'AI & Automation',
    description:
      'Deploy specialized LLM workflows, conversational bots and data pipelines. Privacy-first local inference, vector RAG pipelines, and automated ingestion.',
    link: 'Model Deployments',
  },
];
// ----------------------------------------------------------------------------

export default function Services() {
  return (
    <section className="w-full bg-surface text-on-surface py-32" id="services">
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 font-mono-tag text-mono-tag font-semibold text-secondary tracking-widest uppercase mb-3">
              <span className="w-2 h-0.5 bg-secondary"></span>
              {' '}TECHNICAL CAPABILITIES
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              High-Assurance Digital Services
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
              Modular engineering practices purpose-built to accelerate production timetables while neutralizing operational risk.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono-tag text-mono-tag text-on-surface-variant uppercase">
              AUDITED DISCIPLINE
            </span>
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-surface-container-lowest rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
            >
              <CardImage src={s.image} alt={s.alt} icon={s.fallbackIcon} className="h-48 w-full" />
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="w-14 h-14 rounded bg-surface-container-low flex items-center justify-center mb-8 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                    {s.icon}
                  </div>
                  <span className="font-mono-tag text-mono-tag text-secondary font-semibold uppercase tracking-wider block mb-2">
                    {s.tag}
                  </span>
                  <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-3">{s.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{s.description}</p>
                </div>
                <div className="mt-8 pt-6 flex items-center justify-between text-body-sm font-body-sm font-semibold text-secondary group-hover:translate-x-1 transition-transform">
                  <span>{s.link}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a
            className="inline-flex items-center gap-2 font-body-md text-body-md font-semibold text-secondary hover:text-secondary-container transition-colors py-2 px-4 rounded hover:bg-surface-container"
            href="#"
          >
            <span>View all services</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
}
