import { useState, useEffect } from 'react';
import { fetchCollaborations } from '../services/api';

const DEFAULT_COLLABORATIONS = [
  {
    _id: 'collab-1',
    partnerName: 'VPKBIET Baramati',
    institution: 'Vidya Pratishthan’s Kamalnayan Bajaj Institute of Engineering & Technology (VPKBIET)',
    category: 'Academic MoU',
    date: '16 December 2025',
    description: 'Structured AICTE-compliant industry credit internships aligned with SPPU curriculum frameworks and sponsored live industry capstone projects.',
    highlights: [
      'AICTE-Compliant Credit Internships for Third & Final Year Engineering',
      'Live Industry Capstone Projects across AI/ML and Cloud Infrastructure',
      'Faculty Development Programs (FDPs) and Technology Upskilling Workshops',
      'Campus Recruitment Evaluation and Technical Mentorship'
    ],
    website: 'https://vpkbiet.org',
    image: '/images/services/cloud-solutions.jpg'
  },
  {
    _id: 'collab-2',
    partnerName: 'SMSMPITR Akluj',
    institution: 'Sahakarmaharshi Shankarrao Mohite Patil Institute of Technology and Research',
    category: 'Live Project Sponsorship & MoU',
    date: 'Academic Year 2025–2026',
    description: 'Bilateral institutional agreement sponsoring live commercial software development projects, technical sprint evaluations, and milestone-based stipends.',
    highlights: [
      'Institutional Academic Sponsorship Quota for Student Project Teams',
      'Structured Sprint Reviews and Technical Mentoring',
      'Milestone-based Performance Stipend Framework',
      'Hands-on Exposure to Commercial Product Pipelines'
    ],
    website: 'https://smsmpitr.edu.in',
    image: '/images/services/custom-software.jpg'
  },
  {
    _id: 'collab-3',
    partnerName: 'DHB Soni College, Solapur',
    institution: 'Deshbhakt Harinarayan Bankatlal Soni College (DHB Soni College)',
    category: 'Campus Placement & MoU',
    date: '07 February 2026',
    description: 'Formal academic collaboration and campus placement agreement for final-year BCA, BCS, B.Sc Computer Science and IT students on live commercial software.',
    highlights: [
      'On-Campus Hiring Drives for Computer Science and IT Graduates',
      'Direct Student Onboarding for Commercial Software Products',
      'Pre-Placement Technical Readiness and Soft-Skills Bootcamps'
    ],
    website: '',
    image: '/images/services/ai-automation.jpg'
  },
  {
    _id: 'collab-4',
    partnerName: 'Dattakala Group of Institutions, Pune',
    institution: 'Dattakala Group of Institutions, Faculty of Engineering, Bhigwan',
    category: 'Bilateral Academic MoU',
    date: 'Academic Year 2025–2026',
    description: 'Multi-disciplinary engineering collaboration across Computer, Mechanical, Civil, and E&TC departments fulfilling NAAC Criterion 3 and AICTE requirements.',
    highlights: [
      'Multi-Disciplinary Problem Statements across Engineering Disciplines',
      'Documented Industry-Academia Linkages per NAAC Criterion 3',
      'Continuous Attendance Monitoring and Evaluation Reports'
    ],
    website: '',
    image: '/images/services/devops.jpg'
  },
  {
    _id: 'collab-5',
    partnerName: 'SPCOET Someshwarnagar',
    institution: 'Sharadchandra Pawar College of Engineering and Technology (SPCOET)',
    category: 'Academic MoU & OBE',
    date: 'Academic Year 2025–2026',
    description: 'Outcome-Based Education (OBE) project sponsorship per SPPU curriculum, hands-on student mentoring in Full Stack architectures and AI automation.',
    highlights: [
      'Outcome-Based Education (OBE) Project Sponsorship per SPPU',
      'Mentoring in Full Stack Python/React Architectures & AI',
      'Industry Expert Lectures and Evaluation Panels'
    ],
    website: '',
    image: '/images/services/cyber.jpg'
  },
  {
    _id: 'collab-6',
    partnerName: 'SVPM COE Malegaon (Baramati)',
    institution: 'Shivnagar Vidya Prasarak Mandal’s College of Engineering (SVPM COE)',
    category: 'Institutional Partnership & Placement',
    date: 'Academic Year 2025–2026',
    description: 'Live engineering project sponsorship, student technical grooming, and summer/winter credit-bearing internships with campus recruitment evaluation.',
    highlights: [
      'Live Engineering Project Sponsorship & Capstone Evaluations',
      'Credit-Bearing Summer & Winter Internships',
      'Campus Recruitment Drives & Student Grooming'
    ],
    website: '',
    image: '/images/services/Android.jpg'
  },
  {
    _id: 'collab-7',
    partnerName: 'Embarc.Inc (Tokyo, Japan)',
    institution: 'Embarc.Inc — Tokyo, Japan (International Bilateral Alliance)',
    category: 'International Technology Alliance',
    date: 'February 2026',
    description: 'Cross-border technology co-development and market entry agreement connecting cloud engineering, SaaS products, and international engineering exposure.',
    highlights: [
      'Cross-Border Offshore Engineering & Digital Transformation',
      'Japan-India Technology Bridge for Cloud and Enterprise SaaS',
      'Global Engineering Mentorship for High-Performing Teams'
    ],
    website: '',
    image: '/images/services/cloud-solutions.jpg'
  }
];

export default function Collaborations({ standalone = false }) {
  const [collaborations, setCollaborations] = useState(DEFAULT_COLLABORATIONS);
  const [selectedCollab, setSelectedCollab] = useState(null);

  useEffect(() => {
    fetchCollaborations().then((data) => {
      if (!data) return;

      const mapped = data.map((remote) => {
        const local = DEFAULT_COLLABORATIONS.find(
          (c) => c.partnerName.toLowerCase() === (remote.partnerName || '').toLowerCase()
        );
        return {
          ...local,
          ...remote,
          _id: remote._id,
          partnerName: remote.partnerName,
          institution: remote.institution || remote.partnerName,
          category: remote.category || remote.type || 'Academic MoU',
          date: remote.date || (remote.startDate ? new Date(remote.startDate).toLocaleDateString() : ''),
          description: remote.description,
          highlights: remote.highlights?.length ? remote.highlights : [],
          image: remote.image || remote.logo || local?.image || '/images/services/cloud-solutions.jpg',
          website: remote.website || local?.website || '',
        };
      });

      setCollaborations(mapped);
    });
  }, []);

  if (!collaborations.length && !standalone) return null;

  return (
    <section
      id="collaborations"
      className={`w-full bg-surface text-on-surface ${
        standalone ? 'pt-28 pb-24 sm:pb-32' : 'py-20 sm:py-28 lg:py-32'
      } border-t border-slate-200/80 dark:border-white/10`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-primary dark:text-blue-400 tracking-wider uppercase mb-3">
              <span className="w-2 h-0.5 bg-primary dark:bg-blue-400"></span>
              ACADEMIC & ENTERPRISE COLLABORATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Institutional Linkages & Strategic Alliances
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Formal academic-industry MoUs, AICTE credit internship frameworks, live capstone project sponsorships, and international technology partnerships.
            </p>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
              {collaborations.length} Formal Partnerships
            </span>
          </div>
        </div>

        {/* Collaborations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collaborations.map((collab) => (
            <div
              key={collab._id}
              className="group flex flex-col bg-white dark:bg-[#0c1830] rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Header Badge & Date */}
              <div className="p-6 pb-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between gap-3">
                <span className="inline-flex px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-white/10 text-primary dark:text-blue-400 uppercase tracking-wide">
                  {collab.category}
                </span>
                {collab.date && (
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {collab.date}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                    {collab.partnerName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium line-clamp-1">
                    {collab.institution}
                  </p>
                  <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {collab.description}
                  </p>

                  {/* Highlights */}
                  {collab.highlights && collab.highlights.length > 0 && (
                    <div className="mt-5 space-y-2 pt-4 border-t border-slate-100 dark:border-white/5">
                      {collab.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-blue-400 mt-1.5 shrink-0"></span>
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer action */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedCollab(collab)}
                    className="text-xs font-bold text-primary dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    View Scope Details →
                  </button>
                  {collab.website && (
                    <a
                      href={collab.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      Visit Website ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        {/* Modal for detailed view */}
        {selectedCollab && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCollab(null)}
          >
            <div
              className="bg-white dark:bg-[#0c1830] max-w-2xl w-full rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-white/10 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-white/10 pb-4">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-2">
                    {selectedCollab.category}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {selectedCollab.partnerName}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {selectedCollab.institution}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCollab(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl font-bold leading-none p-2"
                >
                  ×
                </button>
              </div>

              {selectedCollab.date && (
                <div className="mt-4 text-xs font-mono text-slate-500 dark:text-slate-400">
                  Agreement Date / Term: <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedCollab.date}</span>
                </div>
              )}

              <div className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedCollab.description}
              </div>

              {selectedCollab.highlights && selectedCollab.highlights.length > 0 && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                    Scope of Collaboration & Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {selectedCollab.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-primary dark:bg-blue-400 mt-1.5 shrink-0"></span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCollab(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
                {selectedCollab.website && (
                  <a
                    href={selectedCollab.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-hover text-white transition-colors"
                  >
                    Visit Institution Website
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
    </section>
  );
}
