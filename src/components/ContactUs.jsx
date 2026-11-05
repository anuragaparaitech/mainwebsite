import { useState } from 'react';
import { submitContactMessage } from '../services/contactService';

export default function ContactUs({ onBackToHome, onOpenEnquiry }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [isDemo, setIsDemo] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please provide your contact phone number.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await submitContactMessage(formData);
      if (response.isDemo) {
        setIsDemo(true);
      }
      setStatus('success');
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    setStatus('idle');
    setErrorMessage('');
    setIsDemo(false);
  };

  return (
    <div className="w-full bg-surface text-on-surface">
      {/* Hero Section with Custom Background Image */}
      <section className="relative w-full pt-32 pb-24 md:pt-40 md:pb-32 text-white overflow-hidden bg-primary-container">
        {/* Full Unclipped Background Image with High Photographic Clarity */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/contact/contact-hero.jpg"
            alt="AparaiTech Contact Us and Communication Desk"
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* Subtle transparent gradient on the left side only to protect text contrast while keeping the desk, headset, blocks, and background clear and unblurred */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary-container/85 via-primary-container/35 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container/60 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <button
              onClick={onBackToHome}
              type="button"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white hover:text-secondary-fixed transition-colors bg-black/40 px-4 py-2 rounded-full shadow-sm border border-white/20"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Home
            </button>
          </div>

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 font-label-caps text-label-caps font-bold text-white tracking-widest uppercase mb-3 drop-shadow">
              <span className="w-2.5 h-0.5 bg-secondary-fixed"></span>
              GET IN TOUCH
            </span>
            <h1 className="font-display-hero-mobile md:font-display-hero text-headline-lg md:text-display-hero font-bold text-white tracking-tight leading-tight mb-5 drop-shadow-md">
              How can we help you
            </h1>
            <p className="font-body-lg text-body-lg text-white/90 max-w-xl leading-relaxed mb-8 drop-shadow">
              Whether you are exploring high-concurrency cloud systems, need an architectural consultation, or have an enterprise inquiry, our team is ready to assist.
            </p>

            {/* Quick Enquiry Action Button */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-secondary hover:bg-secondary-container text-white font-title-md text-title-md font-semibold transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Initiate Project Enquiry</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </button>

              <a
                href="tel:+911000000000"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all text-sm font-semibold border border-white/30"
              >
                <span className="material-symbols-outlined text-[18px] text-white">call</span>
                <span>+91 1000000000</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="py-16 bg-surface-container-lowest border-b border-outline-variant/20 relative z-10">
        <div className="max-w-[1280px] mx-auto px-4 md:px-gutter-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">call</span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">Call Directly</h3>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">Direct telephonic access to our technical desk.</p>
              <a
                href="tel:+911000000000"
                className="text-sm font-bold text-secondary hover:underline inline-flex items-center gap-1"
              >
                <span>+91 1000000000</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">Email Desk</h3>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">Official communications &amp; RFP proposals.</p>
              <a
                href="mailto:contact@aparaitech.com"
                className="text-sm font-bold text-secondary hover:underline inline-flex items-center gap-1 truncate"
              >
                <span>contact@aparaitech.com</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>

            {/* Office Location Card */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">location_on</span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">Office Address</h3>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Office 122, Gera Imperium, Hinjawadi Phase 2, Pune 411057
              </p>
              <span className="text-xs font-semibold text-secondary mt-3">Pune Center of Excellence</span>
            </div>

            {/* SLA & Hours */}
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">schedule</span>
                </div>
                <h3 className="font-title-md text-title-md font-bold text-on-surface">Response SLA</h3>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                Mon – Fri: 9:00 AM – 7:00 PM IST
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Response &lt; 4 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 max-w-[1280px] mx-auto px-4 md:px-gutter-lg" id="contact-form">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Form Details & Description */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-2 font-label-caps text-label-caps font-bold text-secondary tracking-widest uppercase mb-3">
                <span className="w-2 h-0.5 bg-secondary"></span>
                REACH OUT TO US
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight">
                Send Us a Direct Message
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
                Fill out the form below with your details and message. Every contact request is stored directly in our centralized records and monitored by our leadership team.
              </p>
            </div>

            {/* Quick Enquiry Promo Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-container via-surface-container-high to-surface-container-low border border-outline-variant/30 text-white space-y-4">
              <span className="font-label-caps text-label-caps font-bold text-secondary-fixed uppercase tracking-wider block">
                SPECIALIZED PROJECT SCOPING
              </span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                Need a Detailed Project Estimation or RFP?
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                If you have specific budget, timeline, or architecture specifications, launch our Customer Project Enquiry flow directly.
              </p>
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="w-full py-3 rounded-full bg-secondary hover:bg-secondary-container text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Open Project Enquiry Form</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-6 sm:p-10 rounded-3xl border border-outline-variant/30 shadow-xl">
            {status === 'success' ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 animate-bounce">
                  <span className="material-symbols-outlined text-[36px]">check_circle</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">
                  Thank You, {formData.fullName}!
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6 leading-relaxed">
                  Your message has been successfully recorded. Our team will review your inquiry and get in touch at <span className="text-secondary font-medium">{formData.email}</span> or <span className="text-secondary font-medium">{formData.phone}</span> promptly.
                </p>

                {isDemo && (
                  <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-800 max-w-md">
                    <p className="font-bold flex items-center gap-1.5 mb-1">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      Developer Notice (Demo Mode Active)
                    </p>
                    <p className="leading-relaxed">
                      Submission verified! Paste your deployed Google Apps Script Web App URL into <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">src/config/careersConfig.js</code> for live Google Sheets sync.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-3 rounded-full bg-secondary text-on-secondary font-semibold text-sm hover:bg-secondary-container transition-all shadow-md"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                    <span className="material-symbols-outlined text-[20px] text-red-600 shrink-0">error</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Ramesh Kulkarni"
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. ramesh@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Enterprise Cloud Consultation"
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your requirements, inquiry, or how we can collaborate..."
                    className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-xl bg-secondary hover:bg-secondary-container text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Delivering Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
