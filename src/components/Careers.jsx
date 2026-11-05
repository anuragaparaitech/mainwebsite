import { useState } from 'react';
import { JOB_OPENINGS, CAREERS_CONFIG } from '../config/careersConfig';
import JobApplicationModal from './JobApplicationModal';

export default function Careers({ onBackToHome }) {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [activeJobForApplication, setActiveJobForApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const departments = ['All', ...new Set(JOB_OPENINGS.map((j) => j.department))];

  const filteredJobs = JOB_OPENINGS.filter((job) => {
    const matchesDept = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
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
      {/* Hero Section with Custom Background Image */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 text-white overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/careers/careers-hero.jpg"
            alt="AparaiTech Careers and Growth"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle multi-layer gradient overlays for text readability & brand coherence */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container/90 via-primary-container/75 to-primary-container/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container/95 via-primary-container/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/30"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg relative z-10">
          {/* Breadcrumb / Back Navigation */}
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
              CAREERS AT APARAITECH
            </span>
            <h1 className="font-display-hero-mobile md:font-display-hero text-headline-lg md:text-display-hero font-bold text-white tracking-tight leading-tight mb-6 drop-shadow-sm">
              Engineering the Core Systems That Power Enterprise Software.
            </h1>
            <p className="font-body-lg text-body-lg text-slate-200 max-w-2xl leading-relaxed mb-8 drop-shadow-sm">
              Join a high-assurance team of engineers, researchers, and system designers building proprietary enterprise SaaS, distributed cloud backbones, and applied AI inference engines.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Active Hiring Season</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">location_on</span>
                <span>Pune CoE &amp; Bengaluru Hub</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">verified</span>
                <span>ISO 27001 Engineering Discipline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join AparaiTech / Culture Pillars */}
      <section className="py-20 bg-surface-container-lowest border-y border-outline-variant/20">
        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
          <div className="mb-14">
            <span className="font-label-caps text-label-caps font-bold text-secondary tracking-widest uppercase mb-2 block">
              OUR ENGINEERING PRINCIPLES
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
              Why Build Your Career at AparaiTech?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <span className="font-display-hero text-headline-lg font-bold font-mono-code text-secondary block mb-4">
                  01
                </span>
                <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-3">
                  100% Production Ownership
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  No artificial shelfware or legacy ticket churn. Every commit you deploy powers real enterprise transactions, cloud kitchen logistics, or high-throughput communication clusters.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/30 text-xs font-bold text-secondary uppercase tracking-wider">
                High-Velocity Release Cadence
              </div>
            </div>

            <div className="p-8 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <span className="font-display-hero text-headline-lg font-bold font-mono-code text-secondary block mb-4">
                  02
                </span>
                <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-3">
                  Modern Architecture Stack
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Work with state-of-the-art tooling: React, Node.js, Go, Python LLM pipelines, vector databases, multi-cloud Kubernetes, and strict domain-driven architectures.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/30 text-xs font-bold text-secondary uppercase tracking-wider">
                Full Technical Autonomy
              </div>
            </div>

            <div className="p-8 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <span className="font-display-hero text-headline-lg font-bold font-mono-code text-secondary block mb-4">
                  03
                </span>
                <h3 className="font-title-md text-headline-sm font-bold text-on-surface mb-3">
                  Leadership Mentorship
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Collaborate directly with our founder, principal architects, and international partners. We cultivate engineers who want to grow into system architects and tech leads.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-outline-variant/30 text-xs font-bold text-secondary uppercase tracking-wider">
                Direct Career Acceleration
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
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

          {/* Search Box */}
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

        {/* Department Filters */}
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

        {/* Job Openings List */}
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
                        <span className="text-xs font-medium text-on-surface-variant flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded">
                          <span className="material-symbols-outlined text-[14px]">work</span>
                          {job.experience}
                        </span>
                      </div>

                      <h3 className="font-title-md text-headline-sm font-bold text-on-surface hover:text-secondary transition-colors">
                        {job.title}
                      </h3>

                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {job.description}
                      </p>

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
                    </div>

                    {/* Action buttons */}
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

                  {/* Expanded View */}
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

        {/* General Application Banner */}
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

      {/* Application Modal */}
      <JobApplicationModal
        job={activeJobForApplication}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
