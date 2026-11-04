import { Link } from 'react-router-dom';
import { services } from '../services/serviceDetails';

const icons = {
  'cloud-solutions': (
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  ),
  'custom-software-development': (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" x2="10" y1="4" y2="20" />
    </>
  ),
  'ai-automation': (
    <>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  'devops-ci-cd': (
    <>
      <path d="M20 7v5h-5M4 17v-5h5" />
      <path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" />
    </>
  ),
  'cybersecurity-solutions': (
    <>
      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  'mobile-app-development': (
    <>
      <rect height="18" rx="2" width="12" x="6" y="3" />
      <path d="M11 18h2" />
    </>
  ),
};

export default function Services() {
  return (
    <section className="w-full bg-surface text-on-surface py-32">
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
            
            
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              aria-label={`Learn more about ${service.cardTitle}`}
              className="bg-surface-container-lowest p-8 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              key={service.slug}
              to={`/services/${service.slug}`}
            >
              <div>
                <div className="w-14 h-14 rounded bg-surface-container-low flex items-center justify-center mb-8 text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                  <svg aria-hidden="true" className="w-7 h-7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                    {icons[service.slug]}
                  </svg>
                </div>
                <span className="font-mono-tag text-mono-tag text-secondary font-semibold uppercase tracking-wider block mb-2">
                  {service.category}
                </span>
                <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-3">
                  {service.cardTitle}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
              <div className="mt-8 pt-6 flex items-center justify-between text-body-sm font-body-sm font-semibold text-secondary group-hover:translate-x-1 transition-transform">
                <span>Explore service</span>
                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link className="inline-flex items-center gap-2 font-body-md text-body-md font-semibold text-secondary hover:text-secondary-container transition-colors py-2 px-4 rounded hover:bg-surface-container" to="/services">
            <span>
              View all services
            </span>
            <span className="material-symbols-outlined text-[20px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
