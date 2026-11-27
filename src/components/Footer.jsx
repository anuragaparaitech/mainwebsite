import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { submitCustomerEnquiry, submitNewsletterSubscription } from '../services/enquiryService';
import { fetchContactDetails, fetchSiteContent } from '../services/api';

const ENQUIRY_SERVICES = [
  'Cloud Solutions',
  'Custom Software Development',
  'AI & Machine Learning',
  'DevOps & CI/CD',
  'Cybersecurity & Compliance',
  'Mobile App Development',
  'SaaS Product Engineering',
  'Data Analytics & BI',
  'Enterprise IT Consulting',
  'UI/UX Design',
  'Digital Portfolios & Bios',
  'Other',
];

const OFFICIAL_ADDRESS = 'Office 122, Gera Imperium, Opposite Wipro Circle, Hinjawadi Phase 2, Pune, Maharashtra 411057, India';
const MAPS_SEARCH_URL = `https://maps.google.com/?q=${encodeURIComponent(OFFICIAL_ADDRESS)}`;
const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICIAL_ADDRESS)}`;
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(OFFICIAL_ADDRESS)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export default function Footer() {
  const [contactInfo, setContactInfo] = useState(null);
  const [siteContent, setSiteContent] = useState(null);

  useEffect(() => {
    fetchContactDetails().then((d) => {
      if (d) setContactInfo(d);
    });
    fetchSiteContent().then((d) => {
      if (d) setSiteContent(d);
    });
  }, []);

  const fullAddress = contactInfo?.address
    ? [contactInfo.address, contactInfo.city, contactInfo.state, contactInfo.postalCode, contactInfo.country]
        .filter(Boolean)
        .join(', ')
    : OFFICIAL_ADDRESS;
  const primaryAddressLine = contactInfo?.address || 'Office 122, Gera Imperium';
  const secondaryAddressLine = contactInfo?.city
    ? [contactInfo.city, contactInfo.state, contactInfo.postalCode].filter(Boolean).join(', ')
    : 'Opposite Wipro Circle, Hinjawadi Phase 2, Pune, Maharashtra – 411057';
  const phone = contactInfo?.phone || '+91 8261840199';
  const whatsappNumber = contactInfo?.whatsapp || phone;
  const whatsappDigits = whatsappNumber.replace(/[^\d]/g, '');
  const footerEmail = contactInfo?.altEmail || contactInfo?.email || 'info@ai.aparaitech.org';
  const hrEmail = contactInfo?.hrEmail || contactInfo?.supportEmail || 'hr@info.aparaitech.org';
  const businessHours = contactInfo?.businessHours || 'Monday – Friday (9:30 AM – 6:30 PM IST)';
  const linkedinUrl = contactInfo?.linkedinUrl || 'https://www.linkedin.com/company/aparaitech';
  const instagramUrl = contactInfo?.instagramUrl || 'https://www.instagram.com/aparaitech';
  const youtubeUrl = contactInfo?.youtubeUrl || 'https://www.youtube.com/@aparaitech';
  const mapEmbedUrl =
    contactInfo?.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const mapSearchUrl = `https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`;
  const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

  const complianceList = siteContent?.complianceStandards?.length
    ? siteContent.complianceStandards
    : [
        'ISO 27001 & 9001 Aligned',
        'Govt. of India MSME Registered',
        'Maharashtra Shop & Est. (Gumasta)',
        'GST Registered Commercial Firm',
        'SOC 2 Type II Security Controls',
        'Dedicated Sovereign VPC Hosting',
      ];

  // Enquiry form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null); // 'submitting' | 'success' | 'error' | null
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter a valid name';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid work email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required';
    } else if (!/^[\d\s+\-()]{7,18}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setStatusMessage('');

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitCustomerEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      });

      if (res && res.success) {
        setSubmitStatus('success');
        setStatusMessage(res.message || 'Thank you! Your enquiry has been sent successfully. We will contact you shortly.');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
        setErrors({});
      } else {
        setSubmitStatus('error');
        setStatusMessage(res?.message || 'Submission failed. Please email info@ai.aparaitech.org directly.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setStatusMessage(err.message || 'Unable to submit enquiry. Please check your network or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setNewsletterStatus(null);
    setNewsletterMessage('');

    const email = newsletterEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNewsletterStatus('error');
      setNewsletterMessage('Please enter a valid email address.');
      return;
    }

    setNewsletterStatus('submitting');
    try {
      const res = await submitNewsletterSubscription(email);
      if (res && res.success) {
        setNewsletterStatus('success');
        setNewsletterMessage('Subscribed! Thank you for staying connected with Aparaitech.');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
        setNewsletterMessage(res?.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      setNewsletterStatus('error');
      setNewsletterMessage(err.message || 'Failed to subscribe. Please try again later.');
    }
  };

  return (
    <footer id="footer" className="relative w-full bg-[#061124] text-slate-300 pt-16 sm:pt-20 pb-12 border-t border-white/10 overflow-hidden">
      {/* 5. Subtle oversized APARAITECH text watermark behind footer content */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-20 pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-[0.02] z-0"
      >
        <span className="font-black tracking-widest text-[clamp(4.5rem,15vw,14rem)] leading-none text-white whitespace-nowrap">
          APARAITECH
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* ========================================================================= */}
        {/* 2. CORPORATE HEADQUARTERS SECTION – TOP HORIZONTAL CARD                  */}
        {/* ========================================================================= */}
        <section className="mb-16 rounded-3xl bg-[#091730]/90 border border-white/10 shadow-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-md relative overflow-hidden">
          {/* Ambient cyan/blue glow highlight */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* LEFT SIDE: Company and Contact Information (7 cols on lg) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div>
                {/* A. Badge & Main Heading */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-mono-tag font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>OFFICIAL CORPORATE HEADQUARTERS</span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-white tracking-tight mt-3">
                  {(contactInfo?.companyLabel || 'APARAITECH SOFTWARE').toUpperCase()}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mt-1.5 font-medium leading-relaxed">
                  {siteContent?.footerHeadline || 'Enterprise AI Systems • Cloud Platforms • Mission-Critical Software Engineering'}
                </p>

                {/* B. Office Address (Two-line layout with location icon) */}
                <div className="mt-5 flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/30 shadow-inner">
                    <span className="material-symbols-outlined text-[22px]">location_on</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-blue-300 mb-0.5 font-mono-tag">
                      Corporate Office Address
                    </p>
                    <p className="text-sm sm:text-[15px] font-semibold text-white leading-snug">
                      {primaryAddressLine}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-snug mt-0.5">
                      {secondaryAddressLine}
                    </p>
                  </div>
                </div>
              </div>

              {/* C. Contact Information Cards (3 Compact Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* CARD 1 – CALLING */}
                <a
                  href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                  className="group p-3.5 rounded-xl bg-white/[0.04] hover:bg-blue-600/15 border border-white/10 hover:border-blue-400/40 transition-all duration-200 flex flex-col justify-between"
                  title="Call Aparaitech Corporate Desk"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-300 font-mono-tag">
                      CALLING
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <span className="material-symbols-outlined text-[16px]">call</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-semibold text-white tracking-tight group-hover:text-blue-200 truncate">
                    {phone}
                  </p>
                </a>

                {/* CARD 2 – WHATSAPP */}
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3.5 rounded-xl bg-white/[0.04] hover:bg-emerald-600/15 border border-white/10 hover:border-emerald-400/40 transition-all duration-200 flex flex-col justify-between"
                  title="Chat on WhatsApp"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-emerald-300 font-mono-tag">
                      WHATSAPP
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.59.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                      </svg>
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-semibold text-white tracking-tight group-hover:text-emerald-200 truncate">
                    {whatsappNumber}
                  </p>
                </a>

                {/* CARD 3 – INQUIRIES */}
                <a
                  href={`mailto:${footerEmail}`}
                  className="group p-3.5 rounded-xl bg-white/[0.04] hover:bg-cyan-600/15 border border-white/10 hover:border-cyan-400/40 transition-all duration-200 flex flex-col justify-between"
                  title="Send Inquiries via Email"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-cyan-300 font-mono-tag">
                      INQUIRIES
                    </span>
                    <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <span className="material-symbols-outlined text-[16px]">mail</span>
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] font-semibold text-white tracking-tight group-hover:text-cyan-200 truncate">
                    {footerEmail}
                  </p>
                </a>
              </div>

              {/* D. HR Email and Business Hours */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3.5 border-t border-white/10 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] text-blue-400">badge</span>
                  <span>HR:</span>
                  <a
                    href={`mailto:${hrEmail}`}
                    className="font-semibold text-white hover:text-blue-300 transition-colors underline decoration-blue-500/50 hover:decoration-blue-300"
                  >
                    {hrEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="material-symbols-outlined text-[17px] text-emerald-400">schedule</span>
                  <span>
                    Business Hours:{' '}
                    <strong className="text-white font-medium">{businessHours}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: 3. Google Maps Embed (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[300px]">
              <div className="w-full flex-1 min-h-[240px] sm:min-h-[280px] rounded-2xl overflow-hidden border border-white/15 shadow-inner relative bg-slate-900">
                <iframe
                  title="Aparaitech Corporate Headquarters Office Location"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[240px] sm:min-h-[280px]"
                />
              </div>

              {/* Action Buttons: Open in Maps & Get Directions */}
              <div className="grid grid-cols-2 gap-3 mt-3.5">
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs sm:text-sm border border-white/15 hover:border-white/30 transition-all text-center"
                >
                  <span>Open in Maps</span>
                  <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                </a>

                <a
                  href={mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/20 text-center"
                >
                  <span>Get Directions</span>
                  <span className="material-symbols-outlined text-[15px]">directions</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. EXISTING FOOTER COLUMNS – 4 COLUMNS                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 items-start">
          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 1 – APARAITECH BRAND                                           */}
          {/* --------------------------------------------------------------------- */}
          <div className="space-y-4">
            <Link to="/" className="text-left inline-block">
              <Logo size="sm" onDark nameClassName="text-white font-bold" />
            </Link>

            <p className="text-xs font-mono-tag uppercase tracking-wider text-blue-400 font-semibold">
              {siteContent?.footerTagline || 'Enterprise Technology Partner'}
            </p>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {siteContent?.footerDescription || 'Global enterprise engineering partner. Architecting scalable AI-native software platforms, autonomous agents, and resilient cloud architectures.'}
            </p>

            {/* Clickable link: View on Google Maps ↗ */}
            <div>
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
              >
                <span>View on Google Maps</span>
                <span className="material-symbols-outlined text-[14px] transition-transform group-hover/link:translate-x-0.5">
                  open_in_new
                </span>
              </a>
            </div>

            {/* Careers button preserved */}
            <div className="pt-1">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 hover:bg-blue-600 text-white text-xs font-semibold transition-all border border-blue-400/30"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>We&apos;re Hiring Engineers &bull; Explore Careers &rarr;</span>
              </Link>
            </div>

            {/* Preserved Functional Enquiry Form */}
            <div className="pt-4 mt-3 border-t border-white/10">
              <div className="mb-3.5">
                <h4 className="text-sm font-bold text-white tracking-wide">
                  Have a Project in Mind?
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Let&apos;s discuss how we can help you with the right technology solutions.
                </p>
              </div>

              {submitStatus === 'success' ? (
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-emerald-400 shrink-0">check_circle</span>
                    <div>
                      <p className="font-semibold text-emerald-200">Enquiry Sent Successfully!</p>
                      <p className="mt-1 leading-relaxed opacity-90">{statusMessage}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus(null)}
                    className="mt-3 text-[11px] font-semibold text-emerald-400 hover:underline inline-block"
                  >
                    Send another enquiry &rarr;
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-2.5">
                  {submitStatus === 'error' && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-red-400 shrink-0 mt-0.5">error</span>
                      <p className="leading-relaxed">{statusMessage}</p>
                    </div>
                  )}

                  {/* 1. Full Name */}
                  <div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Full Name *"
                      className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${
                        errors.fullName ? 'border-red-400/80 ring-1 ring-red-400/40' : 'border-white/10 hover:border-white/20 focus:border-[#2563EB]'
                      } text-white placeholder:text-white/40 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB] transition-colors`}
                    />
                    {errors.fullName && <p className="text-red-400 text-[11px] mt-0.5 pl-1">{errors.fullName}</p>}
                  </div>

                  {/* 2. Work Email */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Work Email *"
                      className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${
                        errors.email ? 'border-red-400/80 ring-1 ring-red-400/40' : 'border-white/10 hover:border-white/20 focus:border-[#2563EB]'
                      } text-white placeholder:text-white/40 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB] transition-colors`}
                    />
                    {errors.email && <p className="text-red-400 text-[11px] mt-0.5 pl-1">{errors.email}</p>}
                  </div>

                  {/* 3. Phone Number */}
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number *"
                      className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${
                        errors.phone ? 'border-red-400/80 ring-1 ring-red-400/40' : 'border-white/10 hover:border-white/20 focus:border-[#2563EB]'
                      } text-white placeholder:text-white/40 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB] transition-colors`}
                    />
                    {errors.phone && <p className="text-red-400 text-[11px] mt-0.5 pl-1">{errors.phone}</p>}
                  </div>

                  {/* 4. Service Interested In */}
                  <div>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-lg bg-[#0c1a35] border ${
                        errors.service ? 'border-red-400/80 ring-1 ring-red-400/40' : 'border-white/10 hover:border-white/20 focus:border-[#2563EB]'
                      } ${formData.service ? 'text-white' : 'text-white/40'} text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB] transition-colors`}
                    >
                      <option value="" disabled className="bg-[#091730] text-white/50">
                        Service Interested In *
                      </option>
                      {ENQUIRY_SERVICES.map((s) => (
                        <option key={s} value={s} className="bg-[#091730] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-400 text-[11px] mt-0.5 pl-1">{errors.service}</p>}
                  </div>

                  {/* 5. Message */}
                  <div>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project requirements... *"
                      className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${
                        errors.message ? 'border-red-400/80 ring-1 ring-red-400/40' : 'border-white/10 hover:border-white/20 focus:border-[#2563EB]'
                      } text-white placeholder:text-white/40 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB] transition-colors resize-none`}
                    />
                    {errors.message && <p className="text-red-400 text-[11px] mt-0.5 pl-1">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#2563EB] hover:bg-blue-600 active:scale-[0.99] text-white font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Enquiry</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 2 – CORE NAVIGATION                                            */}
          {/* --------------------------------------------------------------------- */}
          <div className="space-y-4">
            <h4 className="font-label-caps text-xs sm:text-sm uppercase text-white tracking-wider font-bold">
              CORE NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services/custom-software-development" className="text-slate-300 hover:text-white transition-colors">
                  Software Development
                </Link>
              </li>
              <li>
                <Link to="/services/ai-automation" className="text-slate-300 hover:text-white transition-colors">
                  Generative AI Solutions
                </Link>
              </li>
              <li>
                <Link to="/services/cloud-solutions" className="text-slate-300 hover:text-white transition-colors">
                  Cloud Infrastructure
                </Link>
              </li>
              <li>
                <Link to="/services/enterprise-it-consulting" className="text-slate-300 hover:text-white transition-colors">
                  Enterprise Solutions
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                  About Aparaitech
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-300 hover:text-white transition-colors">
                  Careers &amp; Job Openings
                </Link>
              </li>
              <li>
                <Link to="/collaborations" className="text-slate-300 hover:text-white transition-colors">
                  Academic &amp; Enterprise Collaborations
                </Link>
              </li>
              <li>
                <Link to="/about#contact-details" className="text-slate-300 hover:text-white transition-colors">
                  Support &amp; Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 3 – LIVE SAAS ECOSYSTEM & NEWSLETTER                           */}
          {/* --------------------------------------------------------------------- */}
          <div className="space-y-4">
            <h4 className="font-label-caps text-xs sm:text-sm uppercase text-white tracking-wider font-bold">
              LIVE SAAS ECOSYSTEM
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/platforms?platform=cloud-kitchen-os" className="text-slate-300 hover:text-white transition-colors">
                  Cloud Kitchen AI
                </Link>
              </li>
              <li>
                <Link to="/platforms?platform=smartbilling" className="text-slate-300 hover:text-white transition-colors">
                  Attendance SaaS
                </Link>
              </li>
              <li>
                <Link to="/platforms?platform=apna-store" className="text-slate-300 hover:text-white transition-colors">
                  APNA Store eCommerce
                </Link>
              </li>
              <li>
                <Link to="/platforms?platform=service-hub-web" className="text-slate-300 hover:text-white transition-colors">
                  Service Hub Dispatch
                </Link>
              </li>
              <li>
                <Link to="/platforms?platform=test-portal" className="text-slate-300 hover:text-white transition-colors">
                  SVPM Alumni Portal
                </Link>
              </li>
              <li>
                <Link to="/platforms" className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 font-semibold text-xs mt-1">
                  <span>Explore All Platforms</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>

            {/* Newsletter Subscription Box */}
            <div className="pt-4 mt-4 border-t border-white/10">
              <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-1.5 font-mono-tag">
                Subscribe to Tech Updates
              </h5>
              <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">
                Stay informed with architecture insights, enterprise AI research, and cloud systems updates.
              </p>

              {newsletterStatus === 'success' ? (
                <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-emerald-400 shrink-0">check</span>
                  <span>{newsletterMessage}</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="your.email@company.com"
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 focus:border-[#2563EB] text-white placeholder:text-white/40 text-xs focus:outline-none focus:ring-1 focus:ring-[#2563EB] transition-colors"
                      required
                    />
                    <button
                      type="submit"
                      disabled={newsletterStatus === 'submitting'}
                      className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shrink-0 transition-colors flex items-center justify-center disabled:opacity-50"
                      title="Subscribe to updates"
                    >
                      {newsletterStatus === 'submitting' ? (
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      )}
                    </button>
                  </div>
                  {newsletterStatus === 'error' && (
                    <p className="text-red-400 text-[11px] pl-1">{newsletterMessage}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* COLUMN 4 – STANDARDS & COMPLIANCE                                     */}
          {/* --------------------------------------------------------------------- */}
          <div className="space-y-4">
            <h4 className="font-label-caps text-xs sm:text-sm uppercase text-white tracking-wider font-bold">
              STANDARDS &amp; COMPLIANCE
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-300">
              {complianceList.map((std) => (
                <li key={std} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{std}</span>
                </li>
              ))}
            </ul>

            {/* LinkedIn Link */}
            <div className="pt-2">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors group/li"
              >
                <span>Follow on LinkedIn</span>
                <span className="material-symbols-outlined text-[14px] transition-transform group-hover/li:translate-x-0.5">
                  open_in_new
                </span>
              </a>
            </div>

            {/* Connect With Us Social Icons */}
            <div className="pt-3 border-t border-white/10">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono-tag">
                Connect With Us
              </p>
              <div className="flex items-center gap-2.5">
                {/* LinkedIn */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AparaiTech LinkedIn"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0A66C2] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#0A66C2] shadow-sm hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AparaiTech Instagram"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#E1306C] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#E1306C] shadow-sm hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AparaiTech YouTube"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#FF0000] shadow-sm hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${footerEmail}`}
                  aria-label="Email AparaiTech"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyan-600 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-cyan-600 shadow-sm hover:scale-105"
                >
                  <span className="material-symbols-outlined text-[17px]">mail</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. BOTTOM COPYRIGHT AND LEGAL NAVIGATION                                 */}
        {/* ========================================================================= */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono-tag text-slate-400">
          {/* Left: Copyright & Legal Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2">
            <span>&copy; {new Date().getFullYear()} APARAITECH SOFTWARE. All rights reserved.</span>
            <span className="text-white/20 hidden sm:inline">&bull;</span>
            <Link to="/about#terms-conditions" className="hover:text-white transition-colors">
              Trust &amp; Security
            </Link>
            <span className="text-white/20 hidden sm:inline">&bull;</span>
            <Link to="/about#terms-conditions" className="hover:text-white transition-colors">
              Privacy Statement
            </Link>
            <span className="text-white/20 hidden sm:inline">&bull;</span>
            <Link to="/about#terms-conditions" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/20 hidden sm:inline">&bull;</span>
            <Link to="/about#contact-details" className="hover:text-white transition-colors">
              Admin Portal
            </Link>
          </div>

          {/* Right: Office Location */}
          <div className="text-center md:text-right text-slate-400">
            <span>{primaryAddressLine}, {secondaryAddressLine.split(',').slice(0, 2).join(',')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
