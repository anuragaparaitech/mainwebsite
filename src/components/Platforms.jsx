import CardImage from './CardImage';

// ---- EDIT HERE: card text and image paths ----------------------------------
// Images go in  public/images/platforms/
// All six cards are the same size, so use the same image size for all:
// recommended 800 x 480 px (JPG / WebP / PNG, under ~200 KB). Other sizes are cropped to fit.
const PLATFORMS = [
  {
    name: 'NovaTax',
    image: '/images/platforms/novatax.jpg',
    alt: 'NovaTax tax and compliance dashboard',
    icon: 'account_balance',
    tag: 'ENTERPRISE SAAS',
    description: 'Enterprise Tax & Compliance platform for multistate & cross-border fiscal operations.',
    status: 'v4.2.0 STABLE',
  },
  {
    name: 'BlastBee',
    image: '/images/platforms/blastbee.jpg',
    alt: 'BlastBee messaging campaign dashboard',
    icon: 'campaign',
    tag: 'COMMUNICATION ENGINE',
    description: 'High-volume marketing, omnichannel campaigns, and intelligence automation.',
    status: 'CLUSTER ONLINE',
  },
  {
    name: 'Apna Store',
    image: '/images/platforms/apna-store.jpg',
    alt: 'Apna Store e-commerce storefront',
    icon: 'storefront',
    tag: 'B2C • MULTI-TENANT',
    description: 'Localized e-commerce and retail inventory operating system for direct-to-consumer merchants.',
    status: 'OPERATIONAL',
  },
  {
    name: 'Cloud Kitchen OS',
    image: '/images/platforms/cloud-kitchen-os.jpg',
    alt: 'Cloud Kitchen OS order management screen',
    icon: 'restaurant',
    tag: 'F&B OPERATIONS',
    description:
      'Centralized order routing, recipe costing, kitchen display synchronization, and inventory depletion engine.',
    status: 'OPERATIONAL',
  },
  {
    name: 'Service Hub Web',
    image: '/images/platforms/service-hub-web.jpg',
    alt: 'Service Hub Web field service scheduling',
    icon: 'handyman',
    tag: 'WORKFORCE MGMT',
    description:
      'Hyper-local field service scheduling, job ticket dispatching, warranty verification, and real-time vendor payouts.',
    status: 'OPERATIONAL',
  },
  {
    name: 'CET Test Portal',
    image: '/images/platforms/cet-test-portal.jpg',
    alt: 'CET Test Portal mock examination interface',
    icon: 'quiz',
    description:
      'High-concurrency proctored mock examination portal for state-level entrance candidates with live percentile telemetry.',
    status: 'SANDBOX TESTING',
    launched: false, // shows the "To Be Launched" badge and a dimmed image
  },
];
// ----------------------------------------------------------------------------

export default function Platforms() {
  return (
    <section className="w-full bg-surface-container-lowest text-on-surface py-32" id="platforms-section">
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 font-label-caps text-label-caps font-bold text-secondary tracking-widest uppercase mb-3">
            <span className="w-2 h-0.5 bg-secondary"></span>
            {' '}PROPRIETARY PRODUCT ECOSYSTEM
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
            Live Systems Operating in Production
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
            Engineered, maintained, and operated in-house by AparaiTech. Battle-tested codebases handling enterprise-scale transactions daily.
          </p>
        </div>

        {/* Six equal cards: 3 per row on desktop (2 rows), 2 per row on tablet, 1 on mobile.
            auto-rows-fr makes every row the same height, and each card fills its cell. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8">
          {PLATFORMS.map((p) => {
            const launched = p.launched !== false;
            return (
              <div
                key={p.name}
                className={`${launched ? 'bg-surface' : 'bg-surface-container-low'} h-full rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group`}
              >
                <CardImage src={p.image} alt={p.alt} icon={p.icon} muted={!launched} className="h-48 w-full shrink-0" />
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div
                        className={`w-10 h-10 rounded flex items-center justify-center shrink-0 ${launched ? 'bg-surface-container text-on-surface' : 'bg-secondary-fixed text-secondary'}`}
                      >
                        <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                      </div>
                      {launched ? (
                        <span className="font-label-caps text-label-caps font-bold text-on-surface-variant text-right tracking-wider uppercase">{p.tag}</span>
                      ) : (
                        <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-caps text-label-caps font-bold tracking-wide whitespace-nowrap uppercase">
                          To Be Launched
                        </span>
                      )}
                    </div>
                    <h3 className="font-title-md text-title-md font-bold text-on-surface mb-2">{p.name}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{p.description}</p>
                  </div>
                  <div className="mt-6 pt-4 flex items-center justify-between font-mono-tag text-mono-tag text-secondary font-semibold">
                    <span>{p.status}</span>
                    {launched ? (
                      <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read More
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}