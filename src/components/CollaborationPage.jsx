import { useState, useEffect } from 'react';

// ==========================================
// 1. DATA: 5 COLLEGES & JAPAN TIE-UP
// ==========================================

export const successStoriesData = [
  {
    id: "college-dhole-patil",
    category: "CAMPUS PLACEMENT DRIVE",
    count: "SOFTWARE DEVELOPMENT & BDA ROLES",
    icon: "🎓",
    name: "Dhole Patil College of Engineering, Pune",
    badgeTitle: "Campus Placement Drive",
    badgeSubtext: "Supported by TNS India Foundation",
    shortDesc: "A campus placement drive for Software Development and Business Development Associate roles, with support from TNS India Foundation.",
    longDesc: "Aparaitech Software reports completing a campus placement drive at Dhole Patil College of Engineering for Software Development and Business Development Associate (BDA) roles. The company thanked TNS India Foundation for its support and coordination, and said selected candidates would join Aparaitech. The public post does not state the number selected, degree streams, internship terms, or technical assessment details.",
    location: "Pune, Maharashtra",
    techTracks: "Software Development, Business Development Associate (BDA)",
    cohort: "Students participating in the campus placement drive",
    outcome: "Selected candidates welcomed to Aparaitech; no selection total stated",
    affiliation: "Dhole Patil College of Engineering · TNS India Foundation support",
    sourceUrl: "https://www.linkedin.com/posts/aparaitech_software_aparaitechsoftware-campusplacement-placementdrive-activity-7501653999310323712-qRBF",
    highlights: [
      "Campus placement drive completed at Dhole Patil College of Engineering",
      "Roles: Software Development and Business Development Associate",
      "TNS India Foundation supported the drive's coordination",
      "Aparaitech's post welcomes selected candidates but does not publish a count"
    ],
    image: "/images/colleges/college_dhole_4.jpg",
    images: [
      "/images/colleges/college_dhole_4.jpg",
      "/images/colleges/college_dhole_patil_pune.jpg",
      "/images/colleges/college_dhole_1.jpg",
      "/images/colleges/college_dhole_2.jpg"
    ]
  },
  {
    id: "college-dhb-soni",
    category: "CAMPUS RECRUITMENT DRIVE",
    count: "SOFTWARE DEVELOPER & BDA ROLES",
    icon: "🏛️",
    name: "D.H.B. Soni College, Solapur",
    badgeTitle: "Campus Recruitment Drive",
    badgeSubtext: "Includes an Aparaitech induction",
    shortDesc: "Aparaitech announced campus recruitment for Software Developer and BDA roles, alongside an induction on corporate culture and career expectations.",
    longDesc: "Aparaitech Software announced a campus recruitment drive at D.H.B. Soni College. Its LinkedIn post lists Software Developer and Business Development Associate (BDA) openings, a short induction about corporate culture, industry expectations, and career growth at Aparaitech, and a selection process involving resume screening, discussions, and interviews. The accompanying campus photo identifies Solapur and Jule; the post does not report a candidate or internship total.",
    location: "Jule, Solapur, Maharashtra",
    techTracks: "Software Developer, Business Development Associate (BDA)",
    cohort: "Students applying for the listed campus roles",
    outcome: "Resume screening, discussions, and role-aligned interviews; no selection total stated",
    affiliation: "D.H.B. Soni College · Campus recruitment",
    sourceUrl: "https://www.linkedin.com/posts/aparaitech_software_aparaitech-campusrecruitment-employerbranding-activity-7427252552896802816-L2dB",
    highlights: [
      "Open roles: Software Developer and Business Development Associate",
      "Short induction covers corporate culture, industry expectations, and career growth",
      "Selection includes resume screening, discussions, and interviews",
      "The public post does not specify degrees, student totals, or internship outcomes"
    ],
    image: "/images/colleges/college_dhb_soni_solapur.jpg",
    images: [
      "/images/colleges/college_dhb_soni_solapur.jpg",
      "/images/colleges/college_dhb_1.jpg",
      "/images/colleges/college_dhb_2.jpg",
      "/images/colleges/college_dhb_3.jpg"
    ]
  },
  {
    id: "college-vidya-pratishthan",
    category: "AI INDUCTION PROGRAM",
    count: "AI INDUCTION · 13 JAN",
    icon: "🏫",
    name: "Vidya Pratishthan's College of Engineering, Baramati",
    badgeTitle: "AI Induction Program",
    badgeSubtext: "Conducted on 13 January",
    shortDesc: "Aparaitech conducted an AI induction introducing practical AI applications, industry expectations, and career pathways to students.",
    longDesc: "Aparaitech Software reports conducting an AI Induction Program at Vidya Pratishthan's College of Engineering on 13 January; the LinkedIn post does not specify the year. The session introduced practical applications of artificial intelligence, current industry expectations and trends, career pathways and skills in AI, and industry–academia collaboration. The post describes student participation and interaction with faculty, but gives no attendance figure and does not claim an institutional MoU or internship program.",
    location: "Vidyanagari, Baramati, Maharashtra 413133",
    techTracks: "AI applications, industry trends, career pathways, and AI skills",
    cohort: "Students and faculty",
    outcome: "AI induction conducted on 13 January; attendance total not stated",
    affiliation: "Vidya Pratishthan's College of Engineering",
    sourceUrl: "https://www.linkedin.com/posts/aparaitech_software_aparaitech-event-institution-activity-7417043905981919233-6GPD",
    highlights: [
      "AI Induction Program held at Vidya Pratishthan's College of Engineering",
      "Covered practical AI applications and current industry trends",
      "Discussed AI career pathways and required skills",
      "Post notes student participation and faculty interaction; no headcount is given"
    ],
    image: "/images/colleges/college_dattakala_bhigwan.jpg",
    images: [
      "/images/colleges/college_dattakala_bhigwan.jpg",
      "/images/colleges/college_vidya_1.jpg",
      "/images/colleges/college_vidya_2.jpg",
      "/images/colleges/college_vidya_3.jpg",
      "/images/colleges/college_vidya_4.jpg",
      "/images/colleges/college_vidya_5.jpg"
    ]
  },
  {
    id: "college-pratibha",
    category: "CAMPUS JOB FAIR",
    count: "15 SELECTED CANDIDATES",
    icon: "📜",
    name: "Pratibha College of Commerce & Computer Studies, Pune",
    badgeTitle: "Pratibha Job Fair 2026",
    badgeSubtext: "15 candidates selected",
    shortDesc: "Aparaitech participated in the Pratibha Job Fair 2026 and announced 15 selected candidates joining the company.",
    longDesc: "Aparaitech Software reports participating in the Pratibha Job Fair 2026 hosted by Pratibha College of Commerce & Computer Studies, Pune. The post describes meeting candidates and announces that 15 selected candidates would join Aparaitech. It does not claim that 55 offers were issued, identify specific job titles, or state the students' degree programs.",
    location: "Pune, Maharashtra",
    techTracks: "Campus hiring; specific roles not listed in the post",
    cohort: "Candidates attending the Pratibha Job Fair",
    outcome: "15 selected candidates announced",
    affiliation: "Pratibha College of Commerce & Computer Studies",
    sourceUrl: "https://www.linkedin.com/posts/aparaitech_software_aparaitech-pratibhajobfair2026-pratibhacollege-activity-7510696643512692736-f0ki",
    highlights: [
      "Aparaitech participated in the 2026 job fair hosted by the college",
      "The post announces 15 selected candidates joining Aparaitech",
      "The event connected employers with candidates beginning IT careers",
      "No offer-letter count or specific job titles are stated in the post"
    ],
    image: "/images/colleges/college_pratibha_pune.jpg"
  },
  {
    id: "college-dattakala",
    category: "CAMPUS HIRING DRIVE",
    count: "SOFTWARE DEVELOPER & BDA ROLES",
    icon: "🏆",
    name: "Dattakala Group of Institutions, Bhigwan",
    badgeTitle: "Campus Hiring Drive",
    badgeSubtext: "Software Developer and BDA roles",
    shortDesc: "Aparaitech conducted a campus hiring drive for Software Developer and Business Development Associate positions.",
    longDesc: "Aparaitech Software reports conducting a campus hiring drive at Dattakala Group of Institutions' Faculty of Engineering in Bigawan (spelled this way in the LinkedIn post; the college photo and existing asset identify the location as Bhigwan). The drive was for Software Developer and Business Development Associate (BDA) roles. The post describes student interaction and career-oriented, practical industry exposure, but does not report a number of selected candidates, a placement ceremony, or internship outcomes.",
    location: "Bhigwan, Maharashtra",
    techTracks: "Software Developer, Business Development Associate (BDA)",
    cohort: "Students attending the campus hiring drive",
    outcome: "Hiring drive for two roles; selection total not stated",
    affiliation: "Dattakala Group of Institutions · Faculty of Engineering",
    sourceUrl: "https://www.linkedin.com/posts/aparaitech_software_campusdrive-hiring-studentsopportunity-activity-7445432610526482434-SjWP",
    highlights: [
      "Campus hiring drive held at the institution's Faculty of Engineering",
      "Roles: Software Developer and Business Development Associate",
      "The post emphasizes student interaction and practical industry exposure",
      "No candidate count, ceremony, or internship result is reported"
    ],
    image: "/images/colleges/college_vidya_pratishthan_baramati.jpg",
    images: [
      "/images/colleges/college_vidya_pratishthan_baramati.jpg",
      "/images/colleges/college_dattakala_1.jpg",
      "/images/colleges/college_dattakala_2.jpg",
      "/images/colleges/college_dattakala_3.jpg",
      "/images/colleges/college_dattakala_4.jpg"
    ]
  }
];

export const japanCollaborationData = [
  {
    id: "japan-bilateral-partnership",
    category: "JAPAN–INDIA BILATERAL ALLIANCE",
    count: "THREE-PHASE COOPERATION",
    icon: "🌐",
    name: "Aparaitech Software × Embarc",
    badgeTitle: "Business Cooperation Agreement",
    badgeSubtext: "Three-phase collaboration model",
    shortDesc: "A Japan–India cross-border support and referral framework covering software, AI, automation, localization, market entry, and direct client delivery.",
    longDesc: "The supplied Business Cooperation Agreement establishes a flexible, opportunity-driven Cross-Border Client Support Model to expand market reach between India and Japan. Aparaitech Software is identified as the software company at Anand Nagar Colony, Baramati, Maharashtra 413102, represented by Mr. Pratik Pawar. The agreement names Embarc in its purpose and responsibilities, but the supplied copy leaves Party B's company details, address, representative, and signature fields blank. Aparaitech's listed responsibilities are software development and maintenance, web and mobile application development, technical consulting and implementation, and project delivery and support. Embarc's listed responsibilities are local market insights and cultural guidance, local coordination and communication support, cross-cultural communication, and localization. The framework has three phases: cross-border client support; non-exclusive referrals for market entry, AI adoption, digital transformation, technology implementation, and localization; and direct referral execution by the receiving party. Referral fees are payable after services are rendered and payment is received; rates and detailed commercial terms are to be agreed separately in a commercial annexure or written proposal.",
    location: "India ⇄ Japan (cross-border support model)",
    techTracks: "Software Development, Web & Mobile Apps, Technical Consulting, AI, Automation, Localization",
    cohort: "Cross-Border Clients Seeking Technology or Japan Market Support",
    outcome: "Three phases: client support, non-exclusive referrals, and direct referral execution",
    affiliation: "Business Cooperation Agreement · Aparaitech signature page dated 25 Feb 2026",
    highlights: [
      "Phase 1: Cross-border client support, including Japan-based expertise, localization, language services, and on-ground coordination",
      "Aparaitech provides software development and maintenance, web and mobile apps, technical consulting, implementation, and project support",
      "Embarc provides local market insight, cultural guidance, communication support, and localization",
      "Phase 2: Good-faith, non-exclusive client introductions; each party manages its own client engagement",
      "Phase 3: The receiving party liaises with and delivers services to the referred client",
      "Referral fees are due after service delivery and receipt of payment; rates and detailed terms require a separate written agreement",
      "The supplied copy lists Mr. Pratik Pawar and a 25 Feb 2026 date on Aparaitech's signature page; Embarc's party and signature fields are blank"
    ],
    image: "/images/services/ai-automation.jpg"
  }
];

// ==========================================
// 2. CARD COMPONENT (EXACT TEMPLATE MATCH)
// NovaTax Star Rating Box in top-left, dual tags,
// icon+title, NO bottom button, whole box clickable
// ==========================================

const TemplateCard = ({ item, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(item)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect(item);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View collaboration details for ${item.name}`}
      className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(37,99,235,0.12)] hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer text-left"
    >
      {/* Image Banner: ONLY Star Rating Box in top-left */}
      <div className="h-64 relative overflow-hidden bg-slate-900 border-b border-slate-100 flex flex-col justify-between p-5">
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-95 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/images/platforms-bg.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/20" />

        {/* Exact NovaTax 2-Line Star Rating Badge */}
        <div className="relative z-10 pointer-events-none">
          <div className="bg-white/95 text-slate-900 px-3.5 py-2 rounded-xl shadow-sm backdrop-blur-md inline-flex flex-col border border-white/80">
            <div className="flex items-center gap-1.5 text-xs font-extrabold tracking-tight">
              {item.starRating ? (
                <span className="text-amber-500 text-sm">★</span>
              ) : (
                <span className="text-blue-600 text-sm">▤</span>
              )}
              <span>{item.starRating || item.badgeTitle || "Collaboration"}</span>
            </div>
            {(item.ratingSubtext || item.badgeSubtext) && (
              <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
                {item.ratingSubtext || item.badgeSubtext}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Body (Matches Platforms Template) */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between text-left">
        <div>
          {/* Dual Metadata Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="max-w-full break-words font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#edf5ff] text-blue-600 border border-blue-100/60">
              {item.category}
            </span>
            <span className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {item.count}
            </span>
          </div>

          {/* Title Row */}
          <div className="flex items-center gap-2.5 mt-4">
            <span className="text-xl text-blue-600">{item.icon}</span>
            <h3 className="text-xl font-extrabold text-[#0f172a] tracking-tight group-hover:text-blue-600 transition">
              {item.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed mt-2.5 line-clamp-2">
            {item.shortDesc}
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. FULL-PAGE DETAIL VIEW COMPONENT
// ==========================================

const FullPageDetail = ({ item, onBack }) => {
  const images = item.images && item.images.length > 0 ? item.images : [item.image];
  const [imageIndex, setImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setImageIndex(0);
  }, [item]);

  const showPreviousImage = () => {
    setImageIndex((current) => (current - 1 + images.length) % images.length);
  };

  const showNextImage = () => {
    setImageIndex((current) => (current + 1) % images.length);
  };

  const handleTouchEnd = (touchEnd) => {
    if (touchStart === null) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 45) {
      if (distance > 0) showNextImage();
      else showPreviousImage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* Sticky Action Breadcrumb */}
      <div className="bg-white border-b border-slate-200/80 sticky top-20 z-30 px-6 sm:px-10 lg:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs flex items-center gap-2 border border-slate-200 hover:border-blue-200 transition shadow-2xs group cursor-pointer"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to All Stories</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-medium">
              <span>Aparaitech</span>
              <span>/</span>
              <span className="text-slate-600 font-semibold">{item.category}</span>
              <span>/</span>
              <span className="text-blue-600 font-bold truncate max-w-xs">{item.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Official Aparaitech Documentation</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Full-Page Content */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-12 space-y-12">
        
        {/* Top Hero Showcase */}
        <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: High-Resolution Photo */}
            <div className="lg:col-span-7">
              <div className="relative h-80 sm:h-[460px] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-lg border border-slate-100 group">
                <img
                  src={images[imageIndex]}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
                  onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = '/images/platforms-bg.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      aria-label="Previous college image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/95 text-slate-900 shadow-lg flex items-center justify-center text-xl font-bold hover:bg-blue-50 transition"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      aria-label="Next college image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-white/95 text-slate-900 shadow-lg flex items-center justify-center text-xl font-bold hover:bg-blue-50 transition"
                    >
                      →
                    </button>
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-slate-950/55 px-3 py-2">
                      {images.map((image, index) => (
                        <button
                          type="button"
                          key={image}
                          onClick={() => setImageIndex(index)}
                          aria-label={`Show college image ${index + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            index === imageIndex ? 'w-6 bg-white' : 'w-2 bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* NovaTax Star Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <div className="bg-white/95 text-slate-900 px-3.5 py-2 rounded-xl shadow-md backdrop-blur-md inline-flex flex-col border border-white/80">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold">
                      {item.starRating ? (
                        <span className="text-amber-500 text-sm">★</span>
                      ) : (
                        <span className="text-blue-600 text-sm">▤</span>
                      )}
                      <span>{item.starRating || item.badgeTitle || "Collaboration"}</span>
                    </div>
                    {(item.ratingSubtext || item.badgeSubtext) && (
                      <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
                        {item.ratingSubtext || item.badgeSubtext}
                      </span>
                    )}
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-mono font-bold bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-md">
                    {item.count}
                  </span>
                  <span className="text-xs sm:text-sm font-bold bg-white/95 text-slate-900 px-4 py-2 rounded-xl shadow-md border border-white/60">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Summary & Identity */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg bg-blue-100/70 text-blue-700 border border-blue-200/60 inline-block">
                    {item.category}
                  </span>
                </div>

                <h1 className="text-left text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12]">
                  {item.name}
                </h1>

                <div className="flex items-start gap-2 text-slate-500 text-sm leading-6 font-medium">
                  <span>📍</span>
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100/80 text-blue-900 text-sm leading-6 font-medium text-left">
                {item.shortDesc}
              </div>

            </div>

          </div>
        </div>

        {/* Narrative & Institutional Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0f172a] tracking-tight flex items-center gap-3">
                <span>📖</span>
                <span>Partnership Scope & Execution</span>
              </h2>
              <div className="w-12 h-1 bg-blue-600 rounded-full mt-2" />
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-5">
                {item.longDesc || item.shortDesc}
              </p>
            </div>

            {item.highlights && item.highlights.length > 0 && (
              <div>
                <h3 className="text-lg font-extrabold text-[#0f172a] tracking-tight mb-4 flex items-center gap-2">
                  <span>✨</span>
                  <span>Key Agreement Terms</span>
                </h3>
                <ul className="space-y-3 text-sm sm:text-base text-slate-600">
                  {item.highlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-blue-600 font-bold text-base mt-0.5">✓</span>
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="text-base font-extrabold text-[#0f172a] uppercase tracking-wider text-xs font-mono text-slate-400">
                Partnership Details
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">🏛️ Organization / Agreement</span>
                  <div className="text-sm font-bold text-slate-800">{item.affiliation}</div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider block">🎓 Partnership Scope</span>
                  <div className="text-sm font-bold text-slate-800">{item.cohort}</div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-indigo-600 uppercase tracking-wider block">💻 Technology Tracks</span>
                  <div className="text-sm font-bold text-slate-800">{item.techTracks}</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">🚀 Collaboration Outcome</span>
                  <div className="text-sm font-bold text-slate-800">{item.outcome}</div>
                </div>
              </div>
            </div>

            {item.sourceUrl && (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800 transition"
              >
                View official LinkedIn post <span aria-hidden="true">↗</span>
              </a>
            )}

            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg space-y-4">
              <h4 className="font-extrabold text-lg">Looking for a Collaboration?</h4>
              <p className="text-blue-100 text-xs leading-relaxed">
                Connect with Aparaitech for campus programs, technology delivery, AI implementation, or cross-border business support.
              </p>
              <a
                href="/about#contact-details"
                className="inline-block px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition shadow-sm cursor-pointer"
              >
                Contact Aparaitech →
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

// ==========================================
// 4. MAIN EXPORT (MATCHING OUR PLATFORMS UI)
// ==========================================

export default function OurCollaboration() {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    document.title = 'Collaboration | Aparaitech';
  }, []);

  if (selectedItem) {
    return (
      <FullPageDetail
        item={selectedItem}
        onBack={() => setSelectedItem(null)}
      />
    );
  }

  return (
    <div className="bg-white text-[#0f172a] selection:bg-blue-600 selection:text-white">
      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 pt-32 pb-20 lg:pt-40 space-y-24">
        
        {/* ==================================================== */}
        {/* 1. OUR COLLABORATION SECTION (ONLY JAPAN TIE-UP)     */}
        {/* ==================================================== */}
        <section id="collaboration">
          <div className="max-w-4xl mb-12 text-left">
            <div className="text-blue-600 text-sm font-extrabold uppercase tracking-wider mb-3">
              — OUR COLLABORATION
            </div>

            <h2 className="text-left text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12]">
              Japan–India Cross-Border Collaboration
            </h2>

            <p className="text-slate-500 text-base sm:text-lg font-normal mt-4 max-w-2xl leading-relaxed">
              Official Business Cooperation Agreement executed between Aparaitech Software (India) and Embarc Inc. (Yokohama, Japan) establishing a bilateral cross-border client support and AI engineering delivery model.
            </p>
          </div>

          {/* One combined Japan collaboration card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {japanCollaborationData.map((collab) => (
              <TemplateCard
                key={collab.id}
                item={collab}
                onSelect={setSelectedItem}
              />
            ))}
          </div>
        </section>

        {/* ==================================================== */}
        {/* 2. CAMPUS ENGAGEMENTS SECTION */}
        {/* ==================================================== */}
        <section id="success-stories">
          <div className="max-w-4xl mb-12 text-left">
            <div className="text-blue-600 text-sm font-extrabold uppercase tracking-wider mb-3">
              — OUR SUCCESS STORIES
            </div>

            <h2 className="text-left text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.12]">
              Campus Visits, Hiring Drives & Industry Programs
            </h2>

            <p className="text-slate-500 text-base sm:text-lg font-normal mt-4 max-w-2xl leading-relaxed">
              Explore Aparaitech's campus recruitment drives, job fair participation, AI sessions, and engineering programs, with details drawn from the company's public posts.
            </p>
          </div>

          {/* 5 Colleges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStoriesData.map((college) => (
              <TemplateCard
                key={college.id}
                item={college}
                onSelect={setSelectedItem}
              />
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
