import { useState } from 'react';
import useEscape from '../hooks/useEscape';
import { submitJobApplication } from '../services/careersService';
import { CAREERS_CONFIG } from '../config/careersConfig';

export default function JobApplicationModal({ job, isOpen, onClose }) {
  useEscape(onClose, isOpen);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experience: 'Fresher / < 1 year',
    noticePeriod: 'Immediate',
    linkedinUrl: '',
    portfolioUrl: '',
    resumeLink: '',
    coverNote: '',
  });

  const [resumeMode, setResumeMode] = useState('upload'); // 'upload' | 'link'
  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState('');

  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [isDemoSubmission, setIsDemoSubmission] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFileError('');
    if (!file) {
      setResumeFile(null);
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds 5MB. Please upload a smaller file or provide a cloud link.');
      setResumeFile(null);
      return;
    }

    // Check file extension
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      setFileError('Allowed formats: PDF, DOC, DOCX.');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
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
    if (resumeMode === 'upload' && !resumeFile) {
      setErrorMessage('Please attach your resume file (PDF/DOC) or switch to Link mode.');
      return;
    }
    if (resumeMode === 'link' && !formData.resumeLink.trim()) {
      setErrorMessage('Please provide a valid link to your resume.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await submitJobApplication({
        jobId: job?.id || 'general-application',
        jobTitle: job?.title || 'General Engineering Application',
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        experience: formData.experience,
        noticePeriod: formData.noticePeriod,
        linkedinUrl: formData.linkedinUrl,
        portfolioUrl: formData.portfolioUrl,
        resumeLink: resumeMode === 'link' ? formData.resumeLink : '',
        resumeFile: resumeMode === 'upload' ? resumeFile : null,
        coverNote: formData.coverNote,
      });

      if (response.isDemo) {
        setIsDemoSubmission(true);
      }
      setStatus('success');
    } catch (err) {
      console.error('Job submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Something went wrong while submitting. Please try again.');
    }
  };

  const handleResetAndClose = () => {
    setStatus('idle');
    setErrorMessage('');
    setIsDemoSubmission(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-primary-container/70 backdrop-blur-md overflow-y-auto"
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
              CAREER OPPORTUNITY
            </span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface leading-tight">
              {job ? job.title : 'General Engineering Application'}
            </h3>
            {job && (
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-medium text-on-surface-variant">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">business</span>
                  {job.department}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                  {job.location}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
                  {job.type}
                </span>
              </div>
            )}
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

        {/* Body */}
        <div className="p-6 md:p-8 max-h-[75vh] overflow-y-auto">
          {status === 'success' ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 animate-bounce">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">
                Application Received!
              </h4>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6 leading-relaxed">
                Thank you, <strong className="text-on-surface">{formData.fullName}</strong>. Your application for{' '}
                <strong className="text-on-surface">{job ? job.title : 'the position'}</strong> has been registered. Our talent engineering team will review your profile and reach out to you at <span className="text-secondary font-medium">{formData.email}</span>.
              </p>

              {isDemoSubmission && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-800 max-w-md">
                  <p className="font-bold flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[16px]">info</span>
                    Developer Notice (Demo Mode Active)
                  </p>
                  <p className="leading-relaxed">
                    The form worked successfully! To store applications directly in your Google Sheet, paste your deployed Google Apps Script Web App URL into <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">src/config/careersConfig.js</code>.
                  </p>
                </div>
              )}

              <button
                type="button"
                className="px-8 py-3 rounded-full bg-secondary text-on-secondary font-semibold hover:bg-secondary-container transition-colors shadow-md"
                onClick={handleResetAndClose}
              >
                Close & Return
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

              {/* Personal Details */}
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
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. rahul@example.com"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>
              </div>

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
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Current Location / City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Pune / Bengaluru / Mumbai"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Experience & Notice Period */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Total Experience
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  >
                    <option value="Fresher / < 1 year">Fresher / &lt; 1 year</option>
                    <option value="1 - 3 years">1 - 3 years</option>
                    <option value="3 - 5 years">3 - 5 years</option>
                    <option value="5+ years">5+ years</option>
                    <option value="8+ years">8+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    Notice Period
                  </label>
                  <select
                    name="noticePeriod"
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  >
                    <option value="Immediate">Immediate</option>
                    <option value="15 Days">15 Days</option>
                    <option value="30 Days">30 Days</option>
                    <option value="60 Days">60 Days</option>
                    <option value="90 Days">90 Days</option>
                  </select>
                </div>
              </div>

              {/* Professional Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                    GitHub / Portfolio / Code Link
                  </label>
                  <input
                    type="url"
                    name="portfolioUrl"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Resume Section */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-secondary">description</span>
                    Resume / CV <span className="text-red-500">*</span>
                  </label>
                  <div className="inline-flex rounded-lg bg-surface p-1 border border-outline-variant/30 text-xs">
                    <button
                      type="button"
                      className={`px-3 py-1 rounded font-medium transition-colors ${resumeMode === 'upload' ? 'bg-secondary text-on-secondary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
                      onClick={() => setResumeMode('upload')}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      className={`px-3 py-1 rounded font-medium transition-colors ${resumeMode === 'link' ? 'bg-secondary text-on-secondary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`}
                      onClick={() => setResumeMode('link')}
                    >
                      Drive / Cloud Link
                    </button>
                  </div>
                </div>

                {resumeMode === 'upload' ? (
                  <div>
                    <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-outline-variant hover:border-secondary rounded-xl bg-surface cursor-pointer transition-colors group">
                      <span className="material-symbols-outlined text-[32px] text-on-surface-variant group-hover:text-secondary mb-2 transition-colors">
                        cloud_upload
                      </span>
                      <span className="text-sm font-semibold text-on-surface group-hover:text-secondary">
                        {resumeFile ? resumeFile.name : 'Click to select or drag Resume file'}
                      </span>
                      <span className="text-xs text-on-surface-variant mt-1">
                        Supported: PDF, DOC, DOCX (Max 5MB)
                      </span>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    {fileError && <p className="text-xs text-red-600 mt-1.5">{fileError}</p>}
                    {resumeFile && (
                      <div className="flex items-center justify-between mt-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                        <span className="truncate">Attached: {resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)</span>
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 ml-2 font-bold"
                          onClick={() => setResumeFile(null)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      name="resumeLink"
                      value={formData.resumeLink}
                      onChange={handleInputChange}
                      placeholder="Paste shareable Google Drive, Dropbox, or OneDrive URL"
                      className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                    />
                    <p className="text-xs text-on-surface-variant mt-1.5">
                      Ensure the link permissions are set to &quot;Anyone with the link can view&quot;.
                    </p>
                  </div>
                )}
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5">
                  Brief Note / Why AparaiTech? (Optional)
                </label>
                <textarea
                  name="coverNote"
                  rows={3}
                  value={formData.coverNote}
                  onChange={handleInputChange}
                  placeholder="Share a short summary of your background, architectural interests, or why you are excited to join..."
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
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
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
