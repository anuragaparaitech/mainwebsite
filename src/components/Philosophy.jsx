import useReveal from '../hooks/useReveal';

export default function Philosophy() {
  const ref = useReveal();
  return (
    <section className="w-full bg-surface-container-lowest text-on-surface py-32" id="philosophy" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
        <div className="max-w-3xl mb-20">
          <span className="inline-flex items-center gap-2 font-mono-tag text-mono-tag font-semibold text-secondary tracking-widest uppercase mb-4">
            <span className="w-2 h-0.5 bg-secondary"></span>
            {' '}OUR PHILOSOPHY
          </span>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight leading-tight">
            We Believe Technology Should Drive Your Business, Not Slow It Down.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow reveal-item" style={{ "--i": "0" }}>
            <div>
              <div className="flex items-center justify-between mb-8 pb-4">
                <span className="font-display-hero text-headline-lg font-bold text-outline-variant/60 font-mono-code">
                  01
                </span>
                <span className="material-symbols-outlined text-secondary text-[28px]">
                  group_work
                </span>
              </div>
              <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-4">
                Human-Centric Engineering
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Architecting user flows and systems that solve genuine operational friction and empower end-users intuitively. We measure architectural viability not by buzzwords, but by human velocity and operational clarity.
              </p>
            </div>
            <div className="mt-8 pt-4 flex items-center gap-2 font-mono-tag text-mono-tag text-on-surface-variant">
              
    
            </div>
          </div>
          <div className="bg-surface-container-low p-8 md:p-10 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow reveal-item" style={{ "--i": "1" }}>
            <div>
              <div className="flex items-center justify-between mb-8 pb-4">
                <span className="font-display-hero text-headline-lg font-bold text-secondary font-mono-code">
                  02
                </span>
                <span className="material-symbols-outlined text-secondary text-[28px]">
                  verified_user
                </span>
              </div>
              <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-4">
                Global Standards, Local Agility
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Enterprise-grade security, compliance, and cloud resiliency combined with nimble, fast-paced turnaround times. Governed under ISO 27001 data sovereignty while deploying weekly sprint cadence.
              </p>
            </div>
            <div className="mt-8 pt-4 flex items-center gap-2 font-mono-tag text-mono-tag text-secondary font-semibold">
              
              
            </div>
          </div>
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow reveal-item" style={{ "--i": "2" }}>
            <div>
              <div className="flex items-center justify-between mb-8 pb-4">
                <span className="font-display-hero text-headline-lg font-bold text-outline-variant/60 font-mono-code">
                  03
                </span>
                <span className="material-symbols-outlined text-secondary text-[28px]">
                  published_with_changes
                </span>
              </div>
              <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-4">
                Beyond Just Delivery
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Continuous evolution, active architecture reviews, and long-term tech stewardship far past the initial release date. Software is a living asset that requires continuous instrumentation and load tuning.
              </p>
            </div>
            <div className="mt-8 pt-4 flex items-center gap-2 font-mono-tag text-mono-tag text-on-surface-variant">
              
            
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
