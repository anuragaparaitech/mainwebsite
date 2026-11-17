import { Link } from 'react-router-dom';

// Centralized array of news headlines & announcements (easily editable / extendable)
export const NEWS_HEADLINES = [
  {
    id: 1,
    text: 'Aparaitech Software \u2013 Building Intelligent Digital Solutions.',
    link: '/services',
    tag: 'SOLUTIONS',
  },
  {
    id: 2,
    text: 'Explore Our Enterprise Cloud Solutions.',
    link: '/services/cloud-solutions',
    tag: 'CLOUD',
  },
  {
    id: 3,
    text: 'Discover Our AI & Machine Learning Capabilities.',
    link: '/services/ai-automation',
    tag: 'AI & ML',
  },
  {
    id: 4,
    text: 'BlastBee \u2013 Enterprise Communication and Marketing Platform.',
    link: '/platforms?platform=blastbee',
    tag: 'PLATFORM',
  },
  {
    id: 5,
    text: 'NOVATAX \u2013 Digital Taxation and Compliance Solutions.',
    link: '/platforms?platform=novatax',
    tag: 'FINTECH',
  },
  {
    id: 6,
    text: 'Explore Our Latest Technology Platforms.',
    link: '/platforms',
    tag: 'ECOSYSTEM',
  },
  {
    id: 7,
    text: 'We Are Hiring \u2013 Explore Career Opportunities at Aparaitech.',
    link: '/careers',
    tag: 'CAREERS',
  },
];

export default function NewsTicker() {
  return (
    <aside
      aria-label="Latest Announcements and News"
      className="relative w-full overflow-hidden bg-[#07132B] py-3 sm:py-3.5 border-y border-white/10 z-20"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(7, 19, 43, 0.95), rgba(10, 26, 59, 0.88), rgba(7, 19, 43, 0.95)), url('/images/services/services_Background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Glassmorphism ticker container */}
        <div className="relative flex items-center rounded-2xl bg-white/[0.05] backdrop-blur-md border border-white/15 px-3 sm:px-4 py-2 sm:py-2.5 shadow-lg shadow-black/20 overflow-hidden">
          {/* Static LIVE / Announcements Badge on the left */}
          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600/30 border border-blue-400/40 text-white font-mono-tag text-xs font-bold uppercase tracking-wider mr-3 sm:mr-5 z-20 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="hidden sm:inline text-cyan-200">LIVE UPDATES</span>
            <span className="sm:hidden text-cyan-200">LIVE</span>
            <span className="material-symbols-outlined text-[15px] text-blue-300 hidden md:inline">
              campaign
            </span>
          </div>

          {/* Left subtle fade gradient */}
          <div className="pointer-events-none absolute left-[125px] sm:left-[175px] top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#091836] to-transparent z-10" />

          {/* Right subtle fade gradient */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#091836] to-transparent z-10" />

          {/* Continuous Infinite Scrolling Headlines Track */}
          <div className="relative overflow-hidden flex-1 min-w-0">
            <div className="animate-ticker flex items-center whitespace-nowrap">
              {/* First Track Copy */}
              <div className="flex items-center">
                {NEWS_HEADLINES.map((item) => (
                  <div key={`track1-${item.id}`} className="inline-flex items-center">
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-100 hover:text-cyan-300 transition-colors group px-3 py-1 rounded-lg hover:bg-white/5"
                    >
                      {item.tag && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-tag font-bold uppercase tracking-wider bg-blue-500/20 text-cyan-300 border border-blue-400/30 group-hover:border-cyan-300/50">
                          {item.tag}
                        </span>
                      )}
                      <span>{item.text}</span>
                    </Link>

                    {/* Divider Bullet between headlines */}
                    <span
                      className="mx-3 sm:mx-4 inline-flex items-center text-cyan-400/70"
                      aria-hidden="true"
                    >
                      &bull;
                    </span>
                  </div>
                ))}
              </div>

              {/* Second Track Copy (Identical for 100% seamless infinite loop) */}
              <div className="flex items-center" aria-hidden="true">
                {NEWS_HEADLINES.map((item) => (
                  <div key={`track2-${item.id}`} className="inline-flex items-center">
                    <Link
                      to={item.link}
                      tabIndex={-1}
                      className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-100 hover:text-cyan-300 transition-colors group px-3 py-1 rounded-lg hover:bg-white/5"
                    >
                      {item.tag && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-tag font-bold uppercase tracking-wider bg-blue-500/20 text-cyan-300 border border-blue-400/30 group-hover:border-cyan-300/50">
                          {item.tag}
                        </span>
                      )}
                      <span>{item.text}</span>
                    </Link>

                    {/* Divider Bullet between headlines */}
                    <span className="mx-3 sm:mx-4 inline-flex items-center text-cyan-400/70">
                      &bull;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
