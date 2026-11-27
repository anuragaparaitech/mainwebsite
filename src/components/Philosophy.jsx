import { useEffect, useState } from 'react';
import useReveal from '../hooks/useReveal';
import CardImage from './CardImage';
import { fetchSiteContent } from '../services/api';

const DEFAULT_PILLARS = [
  {
    number: '01',
    image: '/images/philosophy/human-centric-engineering.jpg',
    alt: 'Engineers collaborating around a design review',
    icon: 'group_work',
    title: 'Human-Centric Engineering',
    description:
      'Architecting user flows and systems that solve genuine operational friction and empower end-users intuitively. We measure architectural viability not by buzzwords, but by human velocity and operational clarity.',
    footer: 'END-USER ERGONOMICS',
  },
  {
    number: '02',
    image: '/images/philosophy/global-standards-local-agility.jpg',
    alt: 'Secure global infrastructure with local delivery team',
    icon: 'verified_user',
    title: 'Global Standards, Local Agility',
    description:
      'Enterprise-grade security, compliance, and cloud resiliency combined with nimble, fast-paced turnaround times. Governed under ISO 27001 data sovereignty while deploying weekly sprint cadence.',
    highlight: true,
  },
  {
    number: '03',
    image: '/images/philosophy/beyond-just-delivery.jpg',
    alt: 'Team monitoring software performance after release',
    icon: 'published_with_changes',
    title: 'Beyond Just Delivery',
    description:
      'Continuous evolution, active architecture reviews, and long-term tech stewardship far past the initial release date. Software is a living asset that requires continuous instrumentation and load tuning.',
    footer: 'LIFECYCLE STEWARDSHIP',
  },
];

export default function Philosophy() {
  const ref = useReveal();
  const [label, setLabel] = useState('OUR PHILOSOPHY');
  const [heading, setHeading] = useState('We Believe Technology Should Drive Your Business, Not Slow It Down.');
  const [pillars, setPillars] = useState(DEFAULT_PILLARS);

  useEffect(() => {
    fetchSiteContent().then((data) => {
      if (!data) return;
      if (data.philosophyLabel) setLabel(data.philosophyLabel);
      if (data.philosophyHeading) setHeading(data.philosophyHeading);
      if (Array.isArray(data.philosophyPillars)) {
        const activePillars = data.philosophyPillars
          .filter((p) => p.isActive !== false)
          .map((p, idx) => ({
            ...DEFAULT_PILLARS[idx],
            ...p,
            image: p.image || DEFAULT_PILLARS[idx]?.image || '/images/philosophy/human-centric-engineering.jpg',
            alt: p.alt || p.title,
            icon: p.icon || 'group_work',
          }));
        setPillars(activePillars);
      }
    });
  }, []);

  if (!pillars.length) return null;

  return (
    <section className="w-full bg-surface-container-lowest dark:bg-[#070e1c] text-on-surface dark:text-white py-24 sm:py-32 transition-colors duration-300" id="philosophy" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="inline-flex items-center gap-2 font-label-caps text-label-caps font-bold text-secondary dark:text-blue-400 tracking-widest uppercase mb-4">
            <span className="w-2 h-0.5 bg-secondary dark:bg-blue-400"></span>
            {' '}{label}
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white tracking-tight leading-tight">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pillars.map((p, i) => (
            <div
              key={p._id || p.number || i}
              className={`${
                p.highlight
                  ? 'bg-surface-container-low dark:bg-[#0e2042] border-blue-300/40 dark:border-blue-500/30'
                  : 'bg-surface-container-lowest dark:bg-[#0c1830] border-slate-200/80 dark:border-white/10'
              } rounded-2xl border flex flex-col overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 reveal-item group`}
              style={{ '--i': i }}
            >
              <CardImage src={p.image} alt={p.alt || p.title} icon={p.icon || 'group_work'} className="h-48 w-full shrink-0" />
              <div className="p-8 md:p-10 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-white/10">
                    <span
                      className={`font-display-hero text-headline-lg font-bold font-mono-code ${
                        p.highlight ? 'text-secondary dark:text-blue-400' : 'text-outline-variant/60 dark:text-slate-500'
                      }`}
                    >
                      {p.number || `0${i + 1}`}
                    </span>
                    <span className="material-symbols-outlined text-secondary dark:text-blue-400 text-[28px]">{p.icon || 'group_work'}</span>
                  </div>
                  <h3 className="font-title-md text-headline-sm font-bold text-on-surface dark:text-white mb-4">{p.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 leading-relaxed">{p.description}</p>
                </div>
                <div
                  className={`mt-8 pt-4 flex items-center gap-2 font-mono-tag text-mono-tag ${
                    p.highlight ? 'text-secondary dark:text-blue-400 font-semibold' : 'text-on-surface-variant dark:text-slate-400'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
