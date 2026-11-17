import { useState } from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { platforms } from '../data/platforms';
import { services } from '../services/serviceDetails';
import { submitCustomerEnquiry } from '../services/enquiryService';

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

export default function Footer({ onNavigate }) {
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
        setStatusMessage(res?.message || 'Submission failed. Please email contact@aparaitech.com directly.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setStatusMessage(err.message || 'Unable to submit enquiry. Please check your network or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="w-full bg-primary-container text-on-primary-container pt-16 pb-12 border-t border-outline-variant/20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-gutter-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 items-start">
          {/* Column 1: Company Info + Enquiry Form */}
          <div className="space-y-4">
            <Link to="/" className="text-left inline-block">
              <Logo size="sm" onDark nameClassName="text-on-secondary" />
            </Link>
            <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
              Aparaitech Software is an enterprise AI software engineering firm and IT solutions provider. MSME Registered.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-mono-tag text-mono-tag text-on-primary-container">
                All Systems Operational &bull; Mutual NDA Protected
              </span>
            </div>
            <div className="pt-1">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/20 hover:bg-secondary text-on-secondary text-xs font-semibold transition-all border border-secondary/40"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>We&apos;re Hiring Engineers &bull; Explore Careers &rarr;</span>
              </Link>
            </div>

            {/* Embedded Enquiry Form */}
            <div className="pt-4 mt-3 border-t border-white/10">
              <div className="mb-3.5">
                <h4 className="text-sm font-bold text-white tracking-wide">
                  Have a Project in Mind?
                </h4>
                <p className="text-xs text-on-primary-container mt-0.5 leading-relaxed">
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
                      className={`w-full px-3 py-2 rounded-lg bg-white/5 border ${
                        errors.service ? 'border-red-400/80 ring-1 ring-red-400/40' : 'border-white/10 hover:border-white/20 focus:border-[#2563EB]'
                      } ${formData.service ? 'text-white' : 'text-white/40'} text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#2563EB] transition-colors`}
                    >
                      <option value="" disabled className="bg-[#131b2e] text-white/50">
                        Service Interested In *
                      </option>
                      {ENQUIRY_SERVICES.map((s) => (
                        <option key={s} value={s} className="bg-[#131b2e] text-white">
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

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps uppercase text-on-secondary tracking-wider font-bold">
              SERVICES
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link className="text-on-primary-container hover:text-on-secondary transition-colors" to={`/services/${service.slug}`}>
                    {service.cardTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platforms */}
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps uppercase text-on-secondary tracking-wider font-bold">PLATFORMS</h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm">
              {platforms.map((platform) => (
                <li key={platform.slug}>
                  <Link className="text-on-primary-container transition-colors hover:text-on-secondary" to="/platforms">
                    {platform.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Official Head Office & Social Channels */}
          <div className="space-y-4">
            <h4 className="font-label-caps text-label-caps uppercase text-on-secondary tracking-wider font-bold">
              OFFICIAL HEAD OFFICE
            </h4>
            <div className="space-y-3 font-body-sm text-body-sm text-on-primary-container">
              <div>
                <p className="font-semibold text-on-secondary">
                  Pune Center of Excellence
                </p>
                <p className="text-xs leading-relaxed">
                  Office 122, Gera Imperium, Opposite Wipro Circle, Hinjawadi Phase 2, Pune, Maharashtra 411057
                </p>
              </div>
            </div>

            {/* Social & Contact Channels */}
            <div className="pt-2">
              <p className="text-xs font-bold text-on-secondary uppercase tracking-wider mb-2.5">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/aparaitech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AparaiTech LinkedIn Profile"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-secondary text-on-primary-container hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-secondary shadow-sm hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/aparaitech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AparaiTech Instagram Profile"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#E1306C] text-on-primary-container hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#E1306C] shadow-sm hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@aparaitech"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AparaiTech YouTube Channel"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#FF0000] text-on-primary-container hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-[#FF0000] shadow-sm hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href="mailto:contact@aparaitech.com"
                  aria-label="Email AparaiTech"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-emerald-600 text-on-primary-container hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-emerald-600 shadow-sm hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono-tag text-mono-tag text-on-primary-container">
          <p>
            &copy; {new Date().getFullYear()} AparaiTech Software. All rights reserved. 
          </p>
          <p>
            Pune (Hinjawadi Phase 2) 
          </p>
        </div>
      </div>
    </footer>
  );
}
