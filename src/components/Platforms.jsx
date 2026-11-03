export default function Platforms() {
  return (
    <section className="w-full bg-surface-container-lowest text-on-surface py-32" id="platforms-section">
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 font-mono-tag text-mono-tag font-semibold text-secondary tracking-widest uppercase mb-3">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-surface rounded-xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-mono-tag text-mono-tag font-bold">
                  ENTERPRISE SAAS
                </span>
                <span className="font-mono-tag text-mono-tag text-on-surface-variant">
                  v4.2.0 STABLE
                </span>
              </div>
              <h3 className="font-display-hero text-headline-md font-bold text-on-surface mb-3">
                NovaTax
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                Enterprise Tax & Compliance platform for multistate & cross-border fiscal operations. Engineered with sub-millisecond calculation speeds, automated reconciliation audit logs, and direct integration with apex regulatory filing gateways.
              </p>
              <div className="bg-surface-container-lowest rounded-lg p-5 shadow-sm space-y-4 mb-6">
                <div className="flex items-center justify-between text-body-sm font-body-sm pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <span className="font-semibold text-on-surface">
                      FISCAL AUDIT TELEMETRY
                    </span>
                  </div>
                  <span className="font-mono-tag text-mono-tag text-on-surface-variant">
                    RECONCILIATION: ACTIVE
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 font-mono-tag text-mono-tag">
                  <div className="bg-surface-container-low p-2.5 rounded">
                    <div className="text-on-surface-variant">
                      Total Ingestion
                    </div>
                    <div className="font-bold text-on-surface text-body-md mt-0.5">
                      $48.2M
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded">
                    <div className="text-on-surface-variant">
                      Tax Variances
                    </div>
                    <div className="font-bold text-secondary text-body-md mt-0.5">
                      0.00%
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded">
                    <div className="text-on-surface-variant">
                      Filing Uptime
                    </div>
                    <div className="font-bold text-on-surface text-body-md mt-0.5">
                      100%
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono-tag text-mono-tag text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  verified
                </span>
                <span>
                  CERTIFIED STATUTORY ACCURACY
                </span>
              </div>
              <a className="inline-flex items-center gap-1 font-body-md text-body-md font-semibold text-secondary hover:text-secondary-container transition-colors group-hover:translate-x-1 transition-transform" href="#">
                <span>
                  Read More
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
          <div className="bg-surface rounded-xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-mono-tag text-mono-tag font-bold">
                  COMMUNICATION ENGINE
                </span>
                <span className="font-mono-tag text-mono-tag text-on-surface-variant">
                  CLUSTER ONLINE
                </span>
              </div>
              <h3 className="font-display-hero text-headline-md font-bold text-on-surface mb-3">
                BlastBee
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                High-volume marketing, omnichannel campaigns, and intelligence automation. Capable of dispatching millions of transactional SMS, WhatsApp messages, and rich push notifications with guaranteed deliverability and analytics telemetry.
              </p>
              <div className="bg-surface-container-lowest rounded-lg p-5 shadow-sm space-y-4 mb-6">
                <div className="flex items-center justify-between text-body-sm font-body-sm pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                    <span className="font-semibold text-on-surface">
                      DISPATCH PIPELINE SPEED
                    </span>
                  </div>
                  <span className="font-mono-tag text-mono-tag text-on-surface-variant">
                    25,000 MSG/SEC
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 font-mono-tag text-mono-tag">
                  <div className="bg-surface-container-low p-2.5 rounded">
                    <div className="text-on-surface-variant">
                      Delivery Rate
                    </div>
                    <div className="font-bold text-on-surface text-body-md mt-0.5">
                      99.94%
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded">
                    <div className="text-on-surface-variant">
                      Latency Avg
                    </div>
                    <div className="font-bold text-secondary text-body-md mt-0.5">
                      380ms
                    </div>
                  </div>
                  <div className="bg-surface-container-low p-2.5 rounded">
                    <div className="text-on-surface-variant">
                      Active Channels
                    </div>
                    <div className="font-bold text-on-surface text-body-md mt-0.5">
                      6/6
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono-tag text-mono-tag text-on-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-secondary">
                  hub
                </span>
                <span>
                  CARRIER-GRADE GATEWAYS
                </span>
              </div>
              <a className="inline-flex items-center gap-1 font-body-md text-body-md font-semibold text-secondary hover:text-secondary-container transition-colors group-hover:translate-x-1 transition-transform" href="#">
                <span>
                  Read More
                </span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-surface p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">
                    storefront
                  </span>
                </div>
                <span className="font-mono-tag text-mono-tag text-on-surface-variant">
                  B2C • MULTI-TENANT
                </span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">
                Apna Store
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Localized e-commerce and retail inventory operating system for direct-to-consumer merchants.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center justify-between font-mono-tag text-mono-tag text-secondary font-semibold">
              <span>
                OPERATIONAL
              </span>
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </div>
          </div>
          <div className="bg-surface p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">
                    restaurant
                  </span>
                </div>
                <span className="font-mono-tag text-mono-tag text-on-surface-variant">
                  F&B OPERATIONS
                </span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">
                Cloud Kitchen OS
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Centralized order routing, recipe costing, kitchen display synchronization, and inventory depletion engine.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center justify-between font-mono-tag text-mono-tag text-secondary font-semibold">
              <span>
                OPERATIONAL
              </span>
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </div>
          </div>
          <div className="bg-surface p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined text-[20px]">
                    handyman
                  </span>
                </div>
                <span className="font-mono-tag text-mono-tag text-on-surface-variant">
                  WORKFORCE MGMT
                </span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">
                Service Hub Web
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Hyper-local field service scheduling, job ticket dispatching, warranty verification, and real-time vendor payouts.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center justify-between font-mono-tag text-mono-tag text-secondary font-semibold">
              <span>
                OPERATIONAL
              </span>
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">
                    quiz
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-mono-tag text-mono-tag font-bold tracking-wide">
                  To Be Launched
                </span>
              </div>
              <h4 className="font-title-md text-title-md font-bold text-on-surface mb-2">
                CET Test Portal
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                High-concurrency proctored mock examination portal for state-level entrance candidates with live percentile telemetry.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center justify-between font-mono-tag text-mono-tag text-secondary font-semibold">
              <span>
                SANDBOX TESTING
              </span>
              <span className="material-symbols-outlined text-[16px]">
                hourglass_empty
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
