import useReveal from '../hooks/useReveal';
import CardImage from './CardImage';

// ---- EDIT HERE: card text and image paths ----------------------------------
// Images go in  public/images/philosophy/
// Recommended 800 x 480 px, JPG / WebP / PNG, under ~200 KB (other sizes are cropped to fit).
const PILLARS = [
  {
    number: '01',
    image: '/images/philosophy/human-centric-engineering.jpg',
    alt: 'Engineers collaborating around a design review',
    fallbackIcon: 'group_work',
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
    fallbackIcon: 'verified_user',
    icon: 'verified_user',
    title: 'Global Standards, Local Agility',
    description:
      'Enterprise-grade security, compliance, and cloud resiliency combined with nimble, fast-paced turnaround times. Governed under ISO 27001 data sovereignty while deploying weekly sprint cadence.',
    footer: 'ISO 27001 • SOC 2 TYPE II PREPARED',
    highlight: true, // middle card: tinted background, blue number and footer
  },
  {
    number: '03',
    image: '/images/philosophy/beyond-just-delivery.jpg',
    alt: 'Team monitoring software performance after release',
    fallbackIcon: 'published_with_changes',
    icon: 'published_with_changes',
    title: 'Beyond Just Delivery',
    description:
      'Continuous evolution, active architecture reviews, and long-term tech stewardship far past the initial release date. Software is a living asset that requires continuous instrumentation and load tuning.',
    footer: 'LIFECYCLE STEWARDSHIP',
  },
];
// ----------------------------------------------------------------------------

export default function Philosophy() {
  const ref = useReveal();
  return (
    <section className="w-full bg-surface-container-lowest text-on-surface py-32" id="philosophy" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
        <div className="max-w-3xl mb-20">
          <span className="inline-flex items-center gap-2 font-label-caps text-label-caps font-bold text-secondary tracking-widest uppercase mb-4">
            <span className="w-2 h-0.5 bg-secondary"></span>
            {' '}OUR PHILOSOPHY
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight leading-tight">
            We Believe Technology Should Drive Your Business, Not Slow It Down.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PILLARS.map((p, i) => (
            <div
              key={p.number}
              className={`${p.highlight ? 'bg-surface-container-low' : 'bg-surface-container-lowest'} rounded-lg flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow reveal-item group`}
              style={{ '--i': i }}
            >
              <CardImage src={p.image} alt={p.alt} icon={p.fallbackIcon} className="h-48 w-full shrink-0" />
              <div className="p-8 md:p-10 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-8 pb-4">
                    <span
                      className={`font-display-hero text-headline-lg font-bold font-mono-code ${p.highlight ? 'text-secondary' : 'text-outline-variant/60'}`}
                    >
                      {p.number}
                    </span>
                    <span className="material-symbols-outlined text-tertiary text-[28px]">{p.icon}</span>
                  </div>
                  <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-4">{p.title}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{p.description}</p>
                </div>
                <div
                  className={`mt-8 pt-4 flex items-center gap-2 font-mono-tag text-mono-tag ${p.highlight ? 'text-secondary font-semibold' : 'text-on-surface-variant'}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <span>{p.footer}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}