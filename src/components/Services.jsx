import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardImage from './CardImage';
import { services as allServices } from '../services/serviceDetails';
import { fetchServices } from '../services/api';

const KEY_SERVICES = [
  {
    slug: 'cloud-solutions',
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure, seamless migration, and reliable cloud solutions that help businesses grow efficiently.',
    image: '/images/services/cloud-solutions.jpg',
    alt: 'Cloud infrastructure and connected devices',
    icon: 'cloud',
    link: '/services/cloud-solutions',
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    description:
      'Tailor-made software solutions designed to streamline business operations and solve complex business challenges.',
    image: '/images/services/custom-software.jpg',
    alt: 'Custom software development team engineering tailored applications',
    icon: 'terminal',
    link: '/services/custom-software-development',
  },
  {
    slug: 'ai-automation',
    title: 'AI & Machine Learning',
    description:
      'Intelligent AI and machine learning solutions that automate processes, generate insights, and accelerate innovation.',
    image: '/images/services/ai-automation.jpg',
    alt: 'AI automation neural interface and algorithmic processing',
    icon: 'psychology',
    link: '/services/ai-automation',
  },
];

export default function Services({ standalone = false }) {
  const [servicesList, setServicesList] = useState(allServices);
  const [keyServicesList, setKeyServicesList] = useState(KEY_SERVICES);

  useEffect(() => {
    fetchServices().then((data) => {
      if (!data) return;

      const activeList = data.map((remote) => {
        const local = allServices.find(
          (item) => item.slug === remote.slug || item.title === remote.title
        );
        return {
          ...local,
          ...remote,
          slug: remote.slug || local?.slug || remote._id,
          cardTitle: remote.cardTitle || remote.title || local?.cardTitle || local?.title,
          title: remote.title || local?.title,
          shortDescription: remote.shortDescription || remote.description || local?.shortDescription,
          description: remote.description || local?.description,
          icon: remote.icon || local?.icon || 'star',
          image: remote.image || local?.image || '/images/services/cloud-solutions.jpg',
          features: remote.features?.length ? remote.features : (local?.features || []),
        };
      });

      setServicesList(activeList);

      const activeKeys = KEY_SERVICES.filter((keyItem) =>
        data.some((d) => d.slug === keyItem.slug || d.title === keyItem.title)
      ).map((keyItem) => {
        const remote = data.find((d) => d.slug === keyItem.slug || d.title === keyItem.title);
        return {
          ...keyItem,
          title: remote.cardTitle || remote.title || keyItem.title,
          description: remote.shortDescription || remote.description || keyItem.description,
          icon: remote.icon || keyItem.icon,
          image: remote.image || keyItem.image,
        };
      });

      if (activeKeys.length > 0) {
        setKeyServicesList(activeKeys);
      }
    });
  }, []);
  return (
    <section id="services" className={`w-full bg-surface text-on-surface ${standalone ? 'pb-24 sm:pb-32' : 'py-20 sm:py-28 lg:py-32'}`}>
      {standalone && (
        <div className="services-hero mb-16 sm:mb-20">
          <div className="services-hero-content">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold text-secondary tracking-widest uppercase mb-3">
                <span className="w-2 h-0.5 bg-secondary"></span>
                OUR SERVICES
              </span>
              <h1 className="font-headline-lg text-headline-lg font-bold text-white tracking-tight leading-tight">
                Technology Solutions That Drive Innovation
              </h1>
              <p className="font-body-md text-body-md text-white/90 mt-3 max-w-xl leading-relaxed">
                Explore our core technology capabilities designed to help businesses innovate, scale, and succeed.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-gutter-lg">
        {/* Section Heading */}
        {!standalone && (
          <div className="max-w-3xl mb-12 sm:mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold text-secondary tracking-widest uppercase mb-3">
              <span className="w-2 h-0.5 bg-secondary"></span>
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-on-surface tracking-tight leading-tight">
              Technology Solutions That Drive Innovation
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant mt-3 max-w-2xl leading-relaxed">
              Explore our core technology capabilities designed to help businesses innovate, scale, and succeed.
            </p>
          </div>
        )}

        {/* 3 Key Service Cards (Desktop: 3 in 1 row | Tablet: 2 in row 1, 1 below | Mobile: Stacked) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {keyServicesList.map((service) => (
            <div
              key={service.slug}
              className="group flex flex-col bg-white dark:bg-[#0c1830] rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Prominent Service Image */}
              <Link to={service.link} className="block overflow-hidden relative" tabIndex={-1} aria-hidden="true">
                <CardImage
                  src={service.image}
                  alt={service.alt}
                  icon={service.icon}
                  className="h-52 sm:h-56 md:h-60 w-full shrink-0"
                />
              </Link>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/20 text-secondary dark:text-blue-400 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[19px]">{service.icon}</span>
                    </span>
                    <Link
                      to={service.link}
                      className="text-xl sm:text-[22px] font-bold text-on-surface dark:text-white tracking-tight group-hover:text-secondary dark:group-hover:text-blue-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                    >
                      {service.title}
                    </Link>
                  </div>
                  <p className="text-sm sm:text-base text-on-surface-variant dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Subtle Explore Service Link */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-2 text-sm sm:text-[15px] font-semibold text-secondary dark:text-blue-400 hover:text-blue-700 dark:hover:text-cyan-300 transition-colors group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                  >
                    <span>Explore Service</span>
                    <span
                      className="transition-transform duration-200 group-hover/link:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services CTA Button on Homepage */}
        {!standalone && (
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-surface-container-low text-secondary font-semibold text-sm sm:text-base border border-slate-200/90 hover:bg-secondary hover:text-white hover:border-secondary transition-all duration-200 shadow-sm"
            >
              <span>Explore All Capabilities</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}

        {/* Standalone page: Additional Capabilities Catalog */}
        {standalone && (
          <div className="mt-20 pt-16 border-t border-slate-200/80">
            <div className="max-w-3xl mb-12">
              <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold text-secondary tracking-widest uppercase mb-2">
                <span className="w-2 h-0.5 bg-secondary"></span>
                FULL PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                Specialized Engineering & Consulting Services
              </h2>
              <p className="text-sm sm:text-base text-on-surface-variant mt-2">
                Deep architectural expertise across modern infrastructure, enterprise software, and cloud platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.map((service) => (
                <Link
                  key={service.slug}
                  to={`/services/${service.slug}`}
                  className="group p-6 rounded-xl border border-slate-200/80 bg-white hover:border-secondary/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-9 h-9 rounded-lg bg-slate-50 text-secondary group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                        <span className="material-symbols-outlined text-[20px]">{service.icon}</span>
                      </span>
                      <h3 className="font-bold text-base text-on-surface group-hover:text-secondary transition-colors">
                        {service.cardTitle}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-secondary">
                    <span>Learn more</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
