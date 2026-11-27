import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ImageCarousel from './ImageCarousel';
import { fetchAboutCompany, fetchTeamMembers, fetchContactDetails } from '../services/api';

const COMPANY_SLIDES = [
  {
    src: '/images/philosophy/human-centric-engineering.jpg',
    tag: 'ENGINEERING PODS',
    title: 'Human-Centric Engineering Culture',
    description:
      'Cross-functional engineering pods collaborating on architecture, usability, and mission-critical system viability.',
  },
  {
    src: '/images/philosophy/global-standards-local-agility.jpg',
    tag: 'ENTERPRISE DELIVERY',
    title: 'Global Compliance with Local Agility',
    description:
      'Operating under ISO 27001 data sovereignty and SOC 2 Type II rigor while maintaining nimble weekly deployment cadences.',
  },
  {
    src: '/images/services/custom-software.jpg',
    tag: 'SOFTWARE EXCELLENCE',
    title: 'Tailor-Made Distributed Systems',
    description:
      'Architecting scalable microservices, low-latency APIs, and tailored enterprise software engineered to solve complex operational challenges.',
  },
  {
    src: '/images/philosophy/beyond-just-delivery.jpg',
    tag: '24/7 STEWARDSHIP',
    title: 'Operational Telemetry & Observability',
    description:
      'Continuous performance tuning, load balancing, and active life-cycle stewardship far beyond the initial release date.',
  },
  {
    src: '/images/careers/careers-hero.jpg',
    tag: 'INNOVATION HUB',
    title: 'Collaborative Technology Environment',
    description:
      'Empowering engineers and technical minds to explore artificial intelligence, cloud resilience, and high-volume messaging.',
  },
];

const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Executive Architecture Pod',
    designation: 'Principal Systems & Enterprise AI Architects',
    image: '/images/philosophy/human-centric-engineering.jpg',
    intro:
      'Spearheading enterprise AI pipelines, distributed SaaS frameworks, and multi-tenant cloud architectures for mission-critical client operations.',
    tags: ['Enterprise AI', 'System Design', 'Cloud Strategy'],
  },
  {
    id: 2,
    name: 'Cloud Infrastructure & DevOps Team',
    designation: 'Cloud Solutions & SRE Specialists',
    image: '/images/services/cloud-solutions.jpg',
    intro:
      'Architecting resilient multi-region VPC topologies, Kubernetes orchestration clusters, automated CI/CD pipelines, and zero-downtime releases.',
    tags: ['Kubernetes', 'Multi-Cloud VPC', 'CI/CD Pipelines'],
  },
  {
    id: 3,
    name: 'Custom Software Engineering Group',
    designation: 'Full-Stack & High-Concurrency Engineers',
    image: '/images/services/custom-software.jpg',
    intro:
      'Engineering high-performance web applications, localized commerce platforms, and scalable data layers that handle millions of real-time transactions.',
    tags: ['React / Node.js', 'Distributed SQL', 'High Concurrency'],
  },
  {
    id: 4,
    name: 'Cybersecurity & Governance Group',
    designation: 'Security & Compliance Officers',
    image: '/images/philosophy/global-standards-local-agility.jpg',
    intro:
      'Enforcing ISO 27001 information security controls, SOC 2 Type II audit readiness, data residency sovereignty, and rigorous penetration testing.',
    tags: ['ISO 27001', 'SOC 2 Type II', 'Data Sovereignty'],
  },
  {
    id: 5,
    name: 'AI & Machine Learning Research Pod',
    designation: 'Applied AI & Automation Engineers',
    image: '/images/services/ai-automation.jpg',
    intro:
      'Designing vector search indexing, retrieval-augmented generation (RAG) workflows, autonomous task agents, and private inference setups.',
    tags: ['RAG Pipelines', 'Autonomous Agents', 'Local Inference'],
  },
  {
    id: 6,
    name: 'Site Reliability & Telemetry Pod',
    designation: '24/7 Telemetry & Quality Assurance Leads',
    image: '/images/philosophy/beyond-just-delivery.jpg',
    intro:
      'Ensuring continuous operational uptime, synthetic load testing, distributed tracing, and long-term tech stewardship for production platforms.',
    tags: ['99.99% SLA', 'Distributed Tracing', 'Synthetic Testing'],
  },
];

const PRINCIPLES = [
  {
    id: 'innovation',
    title: 'Innovation',
    icon: 'lightbulb',
    description:
      'Pioneering intelligent software, autonomous AI workflows, and modern cloud architectures that solve deep operational bottlenecks and deliver tangible competitive velocity.',
  },
  {
    id: 'integrity',
    title: 'Integrity',
    icon: 'verified_user',
    description:
      'Conducting every relationship with total technical transparency, uncompromising ethics, and ironclad mutual NDA protection over client codebases and proprietary intellectual property.',
  },
  {
    id: 'excellence',
    title: 'Excellence',
    icon: 'military_tech',
    description:
      'Upholding world-class software engineering standards, rigorous peer reviews, automated unit and regression testing, and zero-defect delivery pipelines on every engagement.',
  },
  {
    id: 'customer-centric',
    title: 'Customer-Centric Approach',
    icon: 'sentiment_satisfied',
    description:
      'Centering architecture decisions around measurable client business outcomes, end-user ergonomics, intuitive workflows, and direct operational return on investment.',
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    icon: 'group_work',
    description:
      'Fostering cohesive, cross-functional partnerships between client stakeholders, product managers, and our agile engineering pods with clear, continuous communication.',
  },
  {
    id: 'continuous-improvement',
    title: 'Continuous Improvement',
    icon: 'published_with_changes',
    description:
      'Continuously instrumenting production telemetry, optimizing distributed query latencies, refining CI/CD speed, and actively evolving software long after its initial launch.',
  },
];

const DEFAULT_TERMS_ARTICLES = [
  {
    number: '01.',
    title: 'Acceptance of Commercial Terms & Scope',
    content:
      'By accessing the digital platforms, software consulting deliverables, and hosted SaaS environments operated by Aparaitech Software, clients and authorized enterprise users agree to comply with these terms, active Statements of Work (SOW), and associated Service Level Agreements (SLA).',
  },
  {
    number: '02.',
    title: 'Intellectual Property Ownership & Code Transfer',
    content:
      'Unless specifically agreed otherwise under custom commercial contracts, bespoke source code, specialized database schemas, and tailored software implementations engineered specifically for a client transfer exclusively to the client upon full settlement of contracted milestone deliverables. Aparaitech retains rights to its pre-existing core libraries, foundational frameworks, and generic algorithmic primitives.',
  },
  {
    number: '03.',
    title: 'Confidentiality & Mutual Non-Disclosure (NDA)',
    content:
      'Aparaitech Software operates under strict non-disclosure obligations. All technical requirements, client business data, customer records, and operational telemetry shared with our engineering pods are treated as proprietary and strictly confidential. We maintain zero-tolerance policies regarding unauthorized dissemination or data leakage.',
  },
  {
    number: '04.',
    title: 'Service Availability, Uptime & Maintenance',
    content:
      'For hosted platforms (such as NovaTax, BlastBee, and Cloud Kitchen OS), Aparaitech targets a standard operational service availability of 99.9% uptime, excluding scheduled maintenance windows announced at least 48 hours in advance. Critical security patches may be deployed during off-peak hours with automated rollback mechanisms.',
  },
  {
    number: '05.',
    title: 'Information Security & Compliance Standards',
    content:
      'Our software delivery processes are aligned with ISO 27001 (Information Security Management) and ISO 9001 (Quality Management) frameworks. All production clusters reside within sovereign dedicated VPC configurations incorporating TLS 1.3 encryption in transit and AES-256 encryption at rest.',
  },
  {
    number: '06.',
    title: 'Governing Law & Dispute Resolution',
    content:
      'These terms and all commercial service contracts entered into with Aparaitech Software shall be governed by and construed in accordance with the laws of the Republic of India. Any legal proceedings or dispute arbitrations arising out of these terms shall fall exclusively under the judicial jurisdiction of the courts of Pune, Maharashtra.',
  },
];

const DEFAULT_CAPABILITIES = [
  'Enterprise AI & LLM Systems',
  'Cloud Migration & Sovereignty',
  'Custom Microservices Architecture',
  'Omnichannel Messaging Platforms',
  'Multi-Tenant SaaS Engineering',
  'ISO 27001 & SOC 2 Governance',
];

const OFFICE_ADDRESS =
  'Office 122, Gera Imperium, Opposite Wipro Circle, Hinjawadi Phase 2, Pune, Maharashtra – 411057';

function buildFullAddress(contactInfo) {
  if (!contactInfo || !contactInfo.address) return OFFICE_ADDRESS;
  const parts = [
    contactInfo.address,
    contactInfo.city,
    contactInfo.state,
    contactInfo.postalCode,
    contactInfo.country,
  ].filter(Boolean);
  return parts.join(', ');
}

export default function AboutAparaitech() {
  const location = useLocation();

  const [companyData, setCompanyData] = useState(null);
  const [teamPods, setTeamPods] = useState(TEAM_MEMBERS);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    document.title = 'About Aparaitech | Corporate Overview, Principles, Team & Contact';

    fetchAboutCompany().then((data) => {
      if (data) setCompanyData(data);
    });

    fetchTeamMembers().then((data) => {
      if (!data) return;
      setTeamPods(
        data.map((pod, i) => ({
          id: pod._id || i,
          name: pod.name,
          designation: pod.badge || '',
          image: pod.coverImage || '/images/philosophy/human-centric-engineering.jpg',
          intro: pod.description,
          tags: Array.isArray(pod.tags) ? pod.tags : [],
        }))
      );
    });

    fetchContactDetails().then((data) => {
      if (data) setContactInfo(data);
    });
  }, []);

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const el = document.getElementById(elementId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.hash, location.pathname]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const overviewParagraphs = companyData?.overview
    ? companyData.overview.split(/\n\s*\n/).filter(Boolean)
    : [
        'Aparaitech Software is an enterprise software engineering firm and technology solutions provider headquartered in Pune, Maharashtra. We architect, build, and operate specialized systems for modern business operations, high-concurrency cloud systems, and scalable digital platforms.',
        'Founded on principles of technical excellence and transparent delivery, we partner with enterprises and fast-growing organizations to turn complex business needs into resilient, intuitive digital experiences.',
      ];

  const capabilities = companyData?.capabilities?.length ? companyData.capabilities : DEFAULT_CAPABILITIES;
  const gallerySlides = companyData?.gallerySlides?.length ? companyData.gallerySlides : COMPANY_SLIDES;
  const principlesList = companyData?.principles?.length ? companyData.principles : PRINCIPLES;

  const termsArticles = contactInfo?.termsArticles?.length ? contactInfo.termsArticles : DEFAULT_TERMS_ARTICLES;
  const legalEmail = contactInfo?.termsLegalEmail || contactInfo?.email || 'info@aparaitech.org';

  const fullAddress = buildFullAddress(contactInfo);
  const phone = contactInfo?.phone || '+91 8261840199';
  const phoneHref = `tel:${phone.replace(/[^+\d]/g, '')}`;
  const generalEmail = contactInfo?.email || 'info@aparaitech.org';
  const hrEmail = contactInfo?.hrEmail || contactInfo?.supportEmail || 'hr@info.aparaitech.org';
  const businessHours =
    contactInfo?.businessHours || 'Monday – Friday, 9:30 AM – 6:30 PM IST (Indian Standard Time)';
  const companyLabel = contactInfo?.companyLabel || companyData?.companyName || 'Aparaitech Software';

  const mapsEmbedUrl =
    contactInfo?.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const mapsSearchUrl = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  return (
    <main className="w-full bg-[#f8f9fc] dark:bg-[#070e1c] text-[#10233f] dark:text-slate-100 transition-colors duration-300">
      <section className="relative w-full min-h-[480px] md:min-h-[540px] flex items-end overflow-hidden bg-[#07172F] text-white pt-36 pb-16 md:pt-40 md:pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={companyData?.coverImage || '/images/contact/contact-hero.jpg'}
            alt="Aparaitech Corporate Headquarters and Collaboration Center"
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07172F] via-[#07172F]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07172F] via-transparent to-[#07172F]/50" />
        </div>

        <div className="relative z-10 max-w-[1400px] w-[90%] mx-auto">
          <div className="mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-blue-300 transition-colors bg-black/40 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Home
            </Link>
          </div>

          <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold tracking-widest uppercase text-blue-300 mb-3">
            <span className="w-2.5 h-0.5 bg-blue-400"></span>
            ABOUT {(companyData?.companyName || 'APARAITECH SOFTWARE').toUpperCase()}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            {companyData?.heroTitle || 'Enterprise Engineering for Modern Operations.'}
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            {companyData?.heroSubtitle ||
              'Aparaitech Software is an enterprise technology partner architecting scalable AI-native software platforms, autonomous systems, and resilient cloud architectures.'}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-white/15">
            <button
              type="button"
              onClick={() => scrollToSection('about-company')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105"
            >
              About Company &darr;
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('company-principles')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105"
            >
              Company Principles &darr;
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('terms-conditions')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105"
            >
              Terms &amp; Conditions &darr;
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('our-team')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all hover:scale-105"
            >
              Our Team &darr;
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact-details')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#2563EB] hover:bg-blue-600 text-white transition-all hover:scale-105 shadow-sm"
            >
              Contact Details &darr;
            </button>
          </div>
        </div>
      </section>

      <section id="about-company" className="w-full py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10 scroll-mt-20">
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold text-secondary dark:text-blue-400 tracking-widest uppercase mb-2">
              <span className="w-2 h-0.5 bg-secondary dark:bg-blue-400"></span>
              SECTION 01
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              About {companyData?.companyName || 'Aparaitech Software'}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {companyData?.tagline || 'Discover our story, institutional mission, and engineering philosophy driving transformative digital solutions.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {overviewParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1830] border border-slate-200/80 dark:border-white/10 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Our Vision</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {companyData?.vision ||
                      'To be the most dependable enterprise engineering partner, enabling global organizations to unlock human velocity through intelligent, autonomous digital infrastructure.'}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-[#0c1830] border border-slate-200/80 dark:border-white/10 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[20px]">flag</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">Our Mission</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {companyData?.mission ||
                      'To engineer high-reliability cloud platforms and AI systems governed by ISO 27001 data sovereignty, uncompromising integrity, and nimble sprint velocity.'}
                  </p>
                </div>
              </div>

              {capabilities.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 font-mono-tag">
                    Core Engineering Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-[#0c1830] border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300"
                      >
                        ✓ {cap}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-mono-tag font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Aparaitech Operations &amp; Engineering Gallery
                  </span>
                  <span className="text-[11px] text-blue-500 font-semibold">
                    Autoplay: 4.5s
                  </span>
                </div>

                <ImageCarousel
                  slides={gallerySlides}
                  interval={4500}
                  aspectRatio="aspect-[16/10]"
                  className="rounded-3xl border border-slate-200/90 dark:border-white/15 shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="company-principles" className="w-full py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10 scroll-mt-20 bg-white/50 dark:bg-black/20">
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="max-w-3xl mb-14">
            <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold text-secondary dark:text-blue-400 tracking-widest uppercase mb-2">
              <span className="w-2 h-0.5 bg-secondary dark:bg-blue-400"></span>
              SECTION 02
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Our Core Company Principles
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              The fundamental architectural, ethical, and operational tenets guiding every solution we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {principlesList.map((principle, idx) => (
              <div
                key={principle.id || principle._id || idx}
                className="group p-7 rounded-2xl bg-white dark:bg-[#0c1830] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-[#2563eb] dark:text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[24px]">
                      {principle.icon || 'verified'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2.5 tracking-tight group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors">
                    {principle.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/10 flex items-center gap-2 text-xs font-mono-tag font-bold text-[#2563eb] dark:text-blue-400 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] dark:bg-blue-400" />
                  <span>Aparaitech Standard</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="terms-conditions" className="w-full py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10 scroll-mt-20">
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold text-secondary dark:text-blue-400 tracking-widest uppercase mb-2">
              <span className="w-2 h-0.5 bg-secondary dark:bg-blue-400"></span>
              SECTION 03
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              {contactInfo?.termsTitle || 'Terms & Conditions'}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {contactInfo?.termsSubtitle || 'Standard commercial terms, governance guidelines, confidentiality protocols, and service agreements.'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#0c1830] rounded-3xl border border-slate-200/90 dark:border-white/10 p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
            <div className="border-b border-slate-200 dark:border-white/10 pb-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tag text-slate-500">
              <span>DOCUMENT CODE: {contactInfo?.termsDocCode || 'AP-TOS-2026-V3'}</span>
              <span>EFFECTIVE DATE: {contactInfo?.termsEffectiveDate || 'JANUARY 2026'}</span>
              <span>JURISDICTION: {contactInfo?.termsJurisdiction || 'PUNE, MAHARASHTRA, INDIA'}</span>
            </div>

            {termsArticles.length > 0 ? (
              <div className="space-y-6 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {termsArticles.map((art, i) => (
                  <div key={art._id || art.title || i}>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                      <span className="text-[#2563eb] dark:text-blue-400 font-mono-tag text-sm">
                        {art.number || `0${i + 1}.`}
                      </span>
                      {art.title}
                    </h3>
                    <p>{art.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              contactInfo?.termsContent && (
                <div className="whitespace-pre-line text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {contactInfo.termsContent}
                </div>
              )
            )}

            {contactInfo?.privacyContent && (
              <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {contactInfo.privacyTitle || 'Privacy Policy'}
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {contactInfo.privacyContent}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <p>For custom commercial enterprise contracts or SLA adjustments, please contact our legal desk.</p>
              <a
                href={`mailto:${legalEmail}?subject=Legal%20and%20Terms%20Inquiry`}
                className="font-semibold text-[#2563eb] dark:text-blue-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Contact Legal Desk</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="our-team" className="w-full py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10 scroll-mt-20 bg-white/50 dark:bg-black/20">
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold text-secondary dark:text-blue-400 tracking-widest uppercase mb-2">
              <span className="w-2 h-0.5 bg-secondary dark:bg-blue-400"></span>
              SECTION 04
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Our Engineering &amp; Delivery Team
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Meet the cross-disciplinary architects, cloud engineers, and technical researchers powering Aparaitech.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {teamPods.map((member) => (
              <div
                key={member.id}
                className="group flex flex-col bg-white dark:bg-[#0c1830] rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-xl hover:border-blue-500/30 dark:hover:border-blue-400/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="h-56 sm:h-60 w-full overflow-hidden relative bg-slate-900">
                  <img
                    src={member.image || '/images/philosophy/human-centric-engineering.jpg'}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  {member.designation && (
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="px-2.5 py-1 rounded bg-[#2563eb] text-white text-[11px] font-mono-tag font-bold uppercase tracking-wider">
                        {member.designation}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-2 group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {member.intro}
                    </p>
                  </div>

                  {member.tags && member.tags.length > 0 && (
                    <div className="pt-4 mt-5 border-t border-slate-100 dark:border-white/10 flex flex-wrap gap-1.5">
                      {member.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0c1830] border border-slate-200/80 dark:border-white/10 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  Team Collaboration &amp; Engineering Pods in Action
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Weekly sprint reviews, architecture retrospectives, and agile delivery.
                </p>
              </div>
              <span className="text-xs font-mono-tag font-semibold text-blue-500 hidden sm:inline">
                Transitions every 4.5s
              </span>
            </div>

            <ImageCarousel
              slides={gallerySlides.slice(0, 4)}
              interval={4500}
              aspectRatio="aspect-[21/9] sm:aspect-[24/9]"
              className="rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section id="contact-details" className="w-full py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-[1400px] w-[90%] mx-auto">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 font-label-caps text-xs sm:text-sm font-bold text-secondary dark:text-blue-400 tracking-widest uppercase mb-2">
              <span className="w-2 h-0.5 bg-secondary dark:bg-blue-400"></span>
              SECTION 05
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Official Contact Details &amp; Headquarters
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Connect directly with our technical leadership, general inquiries desk, and corporate office.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-6 space-y-4">
              <a
                href={phoneHref}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0c1830] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:border-blue-400/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-[#2563eb] dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">call</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono-tag">
                    PHONE CONTACT
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors">
                    {phone}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Direct access to our enterprise technical and project desk.
                  </p>
                </div>
                <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-[#2563eb] transition-colors shrink-0">
                  north_east
                </span>
              </a>

              <a
                href={`mailto:${generalEmail}`}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0c1830] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:border-cyan-400/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">mail</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono-tag">
                    GENERAL INQUIRIES
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                    {generalEmail}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    For platform architectural discussions, partnerships, and RFP proposals.
                  </p>
                </div>
                <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-cyan-600 transition-colors shrink-0">
                  north_east
                </span>
              </a>

              <a
                href={`mailto:${hrEmail}`}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0c1830] border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:border-emerald-400/50 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">badge</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono-tag">
                    HUMAN RESOURCES &amp; CAREERS
                  </span>
                  <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                    {hrEmail}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Resume submissions, engineering job applications, and verification requests.
                  </p>
                </div>
                <span className="material-symbols-outlined text-[20px] text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
                  north_east
                </span>
              </a>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0c1830] border border-slate-200/80 dark:border-white/10 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">location_on</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono-tag">
                    CORPORATE HEAD OFFICE
                  </span>
                  <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug mt-0.5">
                    {companyLabel}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                    {fullAddress}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                <span className="material-symbols-outlined text-[20px] text-[#2563eb] dark:text-blue-400 shrink-0">
                  schedule
                </span>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">Business Hours: </span>
                  <span>{businessHours}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-between h-full">
              <div className="w-full h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/15 shadow-xl bg-slate-900 relative">
                <iframe
                  title="Aparaitech Corporate Headquarters Office Location"
                  src={mapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#0c1830] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-xs sm:text-sm border border-slate-200/80 dark:border-white/10 shadow-sm transition-all text-center"
                >
                  <span>Open in Maps</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>

                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2563EB] hover:bg-blue-600 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all text-center"
                >
                  <span>Get Directions</span>
                  <span className="material-symbols-outlined text-[16px]">directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
