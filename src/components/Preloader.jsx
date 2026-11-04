import { useEffect, useRef, useState } from 'react';
import useEscape from '../hooks/useEscape';

const DURATION = 5000; // auto-close after 5 seconds
const FADE_MS = 500;

// ---- EDIT HERE: the three announcement slides -------------------------------
const ANNOUNCEMENTS = [
  {
    key: 'launch',
    tab: 'Launch',
    icon: 'rocket_launch',
    eyebrow: 'Product launch',
    title: 'NovaTax Enterprise Compliance Suite',
    body: 'Multi-state fiscal reconciliation engine with real-time statutory e-filing pipelines now operational for Tier-1 corporate balance sheets.',
    stats: [
      { label: 'Statutory sync', value: 'LIVE' },
      { label: 'Uptime SLA', value: '99.98%' },
    ],
    note: 'Automated GST / TDS / cross-border ledger parity',
    cta: { label: 'Review release notes & API specs', href: '#platforms-section', icon: 'arrow_forward' },
    dismissLabel: 'Acknowledge',
  },
  {
    key: 'hiring',
    tab: 'Careers',
    icon: 'groups',
    eyebrow: 'Now hiring',
    title: 'Engineering Talent Pipeline: Active Roles',
    body: 'Direct openings at Pune Hinjawadi Center of Excellence and remote engineering clusters.',
    roles: [
      { title: 'Staff Distributed Systems Architect', meta: 'Go • Rust • Kafka • Pune / Hybrid', badge: 'P1 PRIORITY' },
      { title: 'Lead AI/ML Research Engineer', meta: 'PyTorch • vLLM • On-Premise LLM', badge: 'HIRING' },
    ],
    cta: { label: 'Explore open requisitions', href: '#', icon: 'open_in_new' },
    dismissLabel: 'Close',
  },
  {
    key: 'booking',
    tab: 'Consultation',
    icon: 'event_available',
    eyebrow: 'Consultation',
    title: 'Schedule an Architecture Assessment',
    body: 'Connect with our Principal Technology Leads to audit infrastructure security and scaling bottlenecks.',
    pointsTitle: 'Standard SLA guarantees',
    points: ['48-hour feasibility and cost estimation', 'Full bilateral NDA executed prior to session'],
    cta: { label: 'Book 30-min scoping call', href: '#', icon: 'event' },
    dismissLabel: 'Later',
  },
];
// ----------------------------------------------------------------------------

const TAB_ON = 'border-secondary text-on-surface';
const TAB_OFF = 'border-transparent text-on-surface-variant hover:text-on-surface';

/**
 * Announcement pop-up shown on load: split card (navy side panel + content panel).
 * Auto-closes after 5s with a progress bar and a 500ms fade-out. Clicking a tab pauses the
 * timer so the visitor can read. Calls onDone() once fully closed (starts the stats counters).
 */
export default function Preloader({ onDone }) {
  const [active, setActive] = useState('launch');
  const [progress, setProgress] = useState(100);
  const [closing, setClosing] = useState(false);
  const [visible, setVisible] = useState(true);
  const dismissed = useRef(false);
  const paused = useRef(false);

  const dismiss = () => {
    if (dismissed.current) return;
    dismissed.current = true;
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, FADE_MS);
  };

  const selectTab = (key) => {
    paused.current = true;
    setActive(key);
  };

  useEscape(dismiss, visible);

  useEffect(() => {
    const start = performance.now();
    let raf;
    const tick = (now) => {
      if (paused.current || dismissed.current) return;
      const elapsed = now - start;
      setProgress(Math.max(0, 100 * (1 - elapsed / DURATION)));
      if (elapsed < DURATION) raf = requestAnimationFrame(tick);
      else dismiss();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  const item = ANNOUNCEMENTS.find((a) => a.key === active);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-container/60 backdrop-blur-sm transition-opacity duration-500 ${closing ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      id="announcement-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Announcement"
    >
      <div className="relative w-full max-w-3xl bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden grid md:grid-cols-[250px_1fr]">
        {/* Side panel */}
        <div className="bg-primary-container text-on-secondary px-6 py-5 md:p-7 flex md:flex-col items-center md:items-start justify-between gap-4">
          <span className="inline-flex items-center gap-2 font-mono-tag text-mono-tag text-on-primary-container">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed-dim animate-pulse" />
            DISPATCH 2026.Q2
          </span>
          <div className="flex md:flex-col items-center md:items-start gap-3">
            <span className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary-container/20 text-tertiary-fixed-dim flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px] md:text-[30px]">{item.icon}</span>
            </span>
            <span className="font-title-md text-title-md font-semibold">{item.eyebrow}</span>
          </div>
          <span className="hidden md:block font-mono-tag text-mono-tag text-on-primary-container">ISO 27001 AUDITED</span>
        </div>

        {/* Content panel */}
        <div className="relative p-6 md:p-8 pb-8 flex flex-col gap-5">
          <button
            id="close-modal-btn"
            type="button"
            aria-label="Close announcement"
            onClick={dismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div role="tablist" aria-label="Announcements" className="flex gap-5 border-b border-outline-variant/40 pr-10 font-body-sm text-body-sm">
            {ANNOUNCEMENTS.map((a) => (
              <button
                key={a.key}
                id={`tab-${a.key}`}
                role="tab"
                type="button"
                aria-selected={active === a.key}
                onClick={() => selectTab(a.key)}
                className={`pb-2 -mb-px border-b-2 font-semibold transition-colors ${active === a.key ? TAB_ON : TAB_OFF}`}
              >
                {a.tab}
              </button>
            ))}
          </div>

          <div id={`content-${item.key}`} role="tabpanel" className="flex flex-col gap-4 min-h-[210px]">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">{item.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5">{item.body}</p>
            </div>

            {item.stats && (
              <div className="bg-surface-container-low rounded p-3.5">
                <div className="grid grid-cols-2 gap-3">
                  {item.stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-mono-tag text-mono-tag text-on-surface-variant uppercase">{s.label}</p>
                      <p className="font-headline-sm text-headline-sm text-secondary font-bold">{s.value}</p>
                    </div>
                  ))}
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{item.note}</p>
              </div>
            )}

            {item.roles && (
              <div className="space-y-2">
                {item.roles.map((r) => (
                  <div key={r.title} className="flex items-center justify-between gap-3 p-2.5 rounded bg-surface-container-low">
                    <div>
                      <p className="font-semibold text-on-surface">{r.title}</p>
                      <p className="text-on-surface-variant font-mono-tag text-mono-tag">{r.meta}</p>
                    </div>
                    <span className="font-mono-tag text-mono-tag text-secondary font-semibold whitespace-nowrap">{r.badge}</span>
                  </div>
                ))}
              </div>
            )}

            {item.points && (
              <div className="p-3 bg-surface-container-low rounded space-y-2">
                <p className="font-label-caps text-label-caps uppercase text-on-surface-variant">{item.pointsTitle}</p>
                <ul className="text-body-sm font-body-sm space-y-1 text-on-surface">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-3 mt-auto">
            <a
              href={item.cta.href}
              onClick={dismiss}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-secondary text-on-secondary font-body-sm text-body-sm font-semibold hover:bg-secondary-container transition-colors"
            >
              {item.cta.label}
              <span className="material-symbols-outlined text-[16px]">{item.cta.icon}</span>
            </a>
            <button type="button" onClick={dismiss} className="px-3 py-2 rounded font-body-sm text-body-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors">
              {item.dismissLabel}
            </button>
          </div>
        </div>

        {/* 5-second timer */}
        <div className="absolute bottom-0 left-0 h-1 bg-surface-container w-full">
          <div id="modal-progress-bar" className="h-full bg-secondary-container transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
