import { useState } from 'react';
import useEscape from '../hooks/useEscape';
import { submitCustomerEnquiry } from '../services/enquiryService';

export default function EnquiryModal({ isOpen, onClose }) {
  useEscape(onClose, isOpen);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: 'Custom Software Engineering',
    budget: 'Flexible / To Be Discussed',
    message: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [isDemo, setIsDemo] = useState(false);

  if (!isOpen) return null;

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
      setErrorMessage('Please provide a valid work email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please provide your phone or WhatsApp number.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please share a brief summary of your project or requirement.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await submitCustomerEnquiry(formData);
      if (response.isDemo) {
        setIsDemo(true);
      }
      setStatus('success');
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong while submitting. Please try again.');
    }
  };

  const handleResetAndClose = () => {
    setStatus('idle');
    setErrorMessage('');
    setIsDemo(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-primary-container/75 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget && status !== 'submitting') handleResetAndClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/30 my-8 overflow-hidden transition-all">
        {/* Header */}
        <div className="p-6 md:p-8 bg-surface-container-low border-b border-outline-variant/30 flex items-start justify-between gap-4">
          <div>
            <span className="font-label-caps text-label-caps font-bold text-secondary uppercase tracking-widest block mb-1">
              ENGINEERING CONSULTATION
            </span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">
              Initiate Customer Enquiry
            </h3>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              Connect with our solutions team to discuss custom enterprise software, AI pipelines, or resilient cloud architecture.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-surface hover:bg-surface-container text-on-surface transition-colors shrink-0"
            onClick={handleResetAndClose}
            disabled={status === 'submitting'}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">
          {status === 'success' ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 animate-bounce">
                <span className="material-symbols-outlined text-[36px]">verified</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">
                Enquiry Registered Successfully!
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6 leading-relaxed">
                Thank you, <strong className="text-on-surface">{formData.fullName}</strong>. Your requirement has been routed to our systems architecture team. We will analyze your specifications and reach out to you at <span className="text-secondary font-medium">{formData.email}</span> within 24 hours.
              </p>

              {isDemo && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-800 max-w-md">
                  <p className="font-bold flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    Developer Notice (Demo Mode Active)
                  </p>
                  <p className="leading-relaxed">
                    The enquiry form functions properly! To log submissions in your Google Spreadsheet automatically, paste your deployed Google Apps Script Web App URL into <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">src/config/careersConfig.js</code>.
                  </p>
                </div>
              )}

              <button
                type="button"
                className="px-8 py-3 rounded-full bg-secondary text-on-secondary font-semibold hover:bg-secondary-container transition-colors shadow-md"
                onClick={handleResetAndClose}
              >
                Close Window
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

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. vikram@enterprise.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 98765 12345"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Corp / Stealth Startup"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Service & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Service of Interest
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  >
                    <option value="Custom Software Engineering">Custom Software Engineering</option>
                    <option value="Cloud Architecture & Migration">Cloud Architecture & Migration</option>
                    <option value="AI & Machine Learning Solutions">AI & Machine Learning Solutions</option>
                    <option value="Enterprise SaaS & Platform Development">Enterprise SaaS & Platform Development</option>
                    <option value="DevOps & Infrastructure Hardening">DevOps & Infrastructure Hardening</option>
                    <option value="Comprehensive Architecture Audit">Comprehensive Architecture Audit</option>
                    <option value="Other / Strategic Partnership">Other / Strategic Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Estimated Budget / Scope
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  >
                    <option value="< ₹5 Lakhs (POC / Rapid MVP)">&lt; ₹5 Lakhs (POC / Rapid MVP)</option>
                    <option value="₹5 - ₹15 Lakhs">₹5 - ₹15 Lakhs</option>
                    <option value="₹15 - ₹50 Lakhs">₹15 - ₹50 Lakhs</option>
                    <option value="₹50 Lakhs+ (Full Enterprise Scale)">₹50 Lakhs+ (Full Enterprise Scale)</option>
                    <option value="Flexible / To Be Discussed">Flexible / To Be Discussed</option>
                  </select>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Requirement Summary &amp; Goals <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Outline your project scope, core technical challenges, expected timelines, or desired deliverables..."
                  className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-end gap-3">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container font-medium text-sm transition-colors"
                  onClick={handleResetAndClose}
                  disabled={status === 'submitting'}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-secondary hover:bg-secondary-container text-on-secondary font-semibold text-sm transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
