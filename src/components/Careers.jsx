import { useState, useEffect } from 'react';
import { JOB_OPENINGS } from '../config/careersConfig';
import JobApplicationModal from './JobApplicationModal';
import { fetchCareers, fetchSiteContent } from '../services/api';

const DEFAULT_HERO = {
  eyebrow: 'CAREERS AT APARAITECH',
  title: 'Engineering the Core Systems That Power Enterprise Software.',
  subtitle:
    'Join a high-assurance team of engineers, researchers, and system designers building proprietary enterprise SaaS, distributed cloud backbones, and applied AI inference engines.',
  badges: ['Active Hiring Season', 'Pune CoE & Bengaluru Hub', 'ISO 27001 Engineering Discipline'],
  cultureEyebrow: 'OUR ENGINEERING PRINCIPLES',
  cultureHeading: 'Why Build Your Career at AparaiTech?',
};

const DEFAULT_CULTURE_PILLARS = [
  {
    number: '01',
    title: '100% Production Ownership',
    description:
      'No artificial shelfware or legacy ticket churn. Every commit you deploy powers real enterprise transactions, cloud kitchen logistics, or high-throughput communication clusters.',
    footer: 'High-Velocity Release Cadence',
  },
  {
    number: '02',
    title: 'Modern Architecture Stack',
    description:
      'Work with state-of-the-art tooling: React, Node.js, Go, Python LLM pipelines, vector databases, multi-cloud Kubernetes, and strict domain-driven architectures.',
    footer: 'Full Technical Autonomy',
  },
  {
    number: '03',
    title: 'Leadership Mentorship',
    description:
      'Collaborate directly with engineering leadership, principal architects, and international partners. We cultivate engineers who want to grow into system architects and tech leads.',
    footer: 'Direct Career Acceleration',
  },
];

export default function Careers({ onBackToHome }) {
  const [jobs, setJobs] = useState(JOB_OPENINGS);
  const [heroContent, setHeroContent] = useState(DEFAULT_HERO);
  const [culturePillars, setCulturePillars] = useState(DEFAULT_CULTURE_PILLARS);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [activeJobForApplication, setActiveJobForApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCareers().then((data) => {
      if (!data) return;

      setJobs(
        data.map((item) => ({
          id: item._id || item.title,
          title: item.title,
          department: item.department,
          location: item.location,
          type: item.type,
          experience: item.experience || '',
          tags: item.tags || [],
          description: item.description,
          requirements: item.requirements || [],
          responsibilities: item.responsibilities || [],
        }))
      );
    });

    fetchSiteContent().then((data) => {
      if (!data) return;
      setHeroContent({
        eyebrow: data.careersHeroEyebrow || DEFAULT_HERO.eyebrow,
        title: data.careersHeroTitle || DEFAULT_HERO.title,
        subtitle: data.careersHeroSubtitle || DEFAULT_HERO.subtitle,
        badges: data.careersHeroBadges?.length ? data.careersHeroBadges : DEFAULT_HERO.badges,
        cultureEyebrow: data.careersCultureEyebrow || DEFAULT_HERO.cultureEyebrow,
        cultureHeading: data.careersCultureHeading || DEFAULT_HERO.cultureHeading,
      });
      if (Array.isArray(data.careersCulturePillars) && data.careersCulturePillars.length) {
        setCulturePillars(data.careersCulturePillars.filter((p) => p.isActive !== false));
      }
    });
  }, []);

  const departments = ['All', ...new Set(jobs.map((j) => j.department))];

  const filteredJobs = jobs.filter((job) => {
    const matchesDept = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.tags && job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesDept && matchesSearch;
  });

  const handleApplyClick = (job) => {
    setActiveJobForApplication(job);
    setIsModalOpen(true);
  };

  const handleGeneralApply = () => {
    setActiveJobForApplication({
      id: 'general-talent-pool',
      title: 'General Engineering Application',
      department: 'General Engineering',
      location: 'Pune / Bengaluru / Hybrid',
      type: 'Full-Time',
    });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full bg-surface text-on-surface">
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/careers/careers-hero.jpg"
            alt="AparaiTech Careers and Growth"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#0B132B]/80 via-[#0F172A]/75 to-[#0B132B]/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B132B]/95 via-[#0B132B]/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg relative z-10">
          <div className="mb-8">
            <button
              onClick={onBackToHome}
              type="button"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-secondary-fixed transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-sm border border-white/20"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Home
            </button>
          </div>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 font-label-caps text-label-caps font-bold text-secondary-fixed tracking-widest uppercase mb-4">
              <span className="w-2 h-0.5 bg-secondary-fixed"></span>
              {heroContent.eyebrow}
            </span>
            <h1 className="font-display-hero-mobile md:font-display-hero text-headline-lg md:text-display-hero font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-sm">
              {heroContent.title}
            </h1>
            <p className="font-body-lg text-body-lg text-slate-200 max-w-2xl leading-relaxed mb-8 drop-shadow-sm">
              {heroContent.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white">
              {heroContent.badges.map((badge, i) => (
                <div key={badge} className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-xs">
                  {i === 0 ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px] text-secondary-fixed">
                      {i === 1 ? 'location_on' : 'verified'}
                    </span>
                  )}
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {culturePillars.length > 0 && (
        <section className="py-20 bg-surface-container-lowest border-y border-outline-variant/20">
          <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
            <div className="mb-14">
              <span className="font-label-caps text-label-caps font-bold text-secondary tracking-widest uppercase mb-2 block">
                {heroContent.cultureEyebrow}
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                {heroContent.cultureHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {culturePillars.map((pillar, idx) => (
                <div key={pillar._id || pillar.number || idx} className="p-8 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <span className="font-display-hero text-headline-lg font-bold font-mono-code text-secondary block mb-4">
                      {pillar.number || `0${idx + 1}`}
                    </span>
                    <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-3">
                      {pillar.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  {pillar.footer && (
                    <div className="mt-6 pt-4 border-t border-outline-variant/30 text-xs font-bold text-secondary uppercase tracking-wider">
                      {pillar.footer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 max-w-[1280px] mx-auto px-4 md:px-gutter-lg" id="open-positions">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 font-label-caps text-label-caps font-bold text-secondary tracking-widest uppercase mb-3">
              <span className="w-2 h-0.5 bg-secondary"></span>
              CURRENT OPPORTUNITIES
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              Open Positions ({filteredJobs.length})
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl">
              Explore open roles across our engineering, cloud infrastructure, and AI systems divisions.
            </p>
          </div>

          <div className="w-full md:w-80 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role or tech stack..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
            />
            <span className="material-symbols-outlined absolute left-3.5 top-3 text-[18px] text-on-surface-variant">
              search
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDepartment(dept)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap ${selectedDepartment === dept ? 'bg-secondary text-on-secondary shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`}
            >
              {dept}
            </button>
          ))}
        </div>

        {filteredJobs.length === 0 ? (
          <div className="p-12 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30">
            <span className="material-symbols-outlined text-[48px] text-outline mb-3">manage_search</span>
            <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-2">
              No matching openings found
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-6">
              We couldn&apos;t find any roles matching your current search criteria. Try selecting another department or submit an open application.
            </p>
            <button
              type="button"
              className="px-6 py-2.5 rounded-full bg-secondary text-on-secondary font-semibold text-sm hover:bg-secondary-container transition-colors"
              onClick={handleGeneralApply}
            >
              Submit Open Application
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => {
              const isExpanded = expandedJobId === job.id;
              return (
                <div
                  key={job.id}
                  className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-label-caps text-label-caps font-bold px-2.5 py-1 rounded bg-secondary-fixed text-secondary uppercase tracking-wider">
                          {job.department}
                        </span>
                        <span className="text-xs font-medium text-on-surface-variant flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          {job.location}
                        </span>
                        {job.experience && (
                          <span className="text-xs font-medium text-on-surface-variant flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded">
                            <span className="material-symbols-outlined text-[14px]">work</span>
                            {job.experience}
                          </span>
                        )}
                      </div>

                      <h3 className="font-title-md text-headline-sm font-bold text-on-surface hover:text-secondary transition-colors">
                        {job.title}
                      </h3>

                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {job.description}
                      </p>

                      {job.tags && job.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {job.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-0.5 rounded-md bg-surface-container text-xs font-medium text-on-surface-variant"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-3 shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-outline-variant/20">
                      <button
                        type="button"
                        onClick={() => handleApplyClick(job)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary hover:bg-secondary-container text-on-secondary font-semibold text-sm transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <span>Apply Now</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                        className="text-xs font-bold text-secondary hover:text-secondary-container transition-colors py-1 flex items-center gap-1"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'View Responsibilities'}</span>
                        <span className="material-symbols-outlined text-[16px]">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-6 md:px-8 pb-8 pt-2 border-t border-outline-variant/30 bg-surface-container-low/40 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
                      <div>
                        <h4 className="font-label-caps text-label-caps font-bold text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">task_alt</span>
                          Key Responsibilities
                        </h4>
                        <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant">
                          {job.responsibilities?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-label-caps text-label-caps font-bold text-secondary uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">psychology</span>
                          Requirements &amp; Competencies
                        </h4>
                        <ul className="space-y-2 text-xs md:text-sm text-on-surface-variant">
                          {job.requirements?.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0"></span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary-container via-surface-container-high to-surface-container-low border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-label-caps text-label-caps font-bold text-secondary uppercase tracking-widest block mb-2">
              TALENT NETWORK
            </span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">
              Don&apos;t see an exact match for your specialty?
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              We are constantly evaluating top engineering talent in Systems Architecture, AI Evaluation, and Distributed Computing. Submit an open profile and our recruitment leads will connect with you.
            </p>
          </div>
          <button
            type="button"
            onClick={handleGeneralApply}
            className="px-8 py-3.5 rounded-full bg-secondary text-on-secondary font-semibold hover:bg-secondary-container transition-all shadow-md shrink-0 whitespace-nowrap"
          >
            Submit Open Profile
          </button>
        </div>
      </section>

      <JobApplicationModal
        job={activeJobForApplication}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
