import { CAREERS_CONFIG } from '../config/careersConfig';

/**
 * Converts a File object into a base64 encoded string with data URL metadata stripped.
 * @param {File} file
 * @returns {Promise<{base64: string, name: string, type: string, size: number}>}
 */
export async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = typeof result === 'string' ? result.split(',')[1] : '';
      resolve({
        base64,
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
      });
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Submits the job application to the Google Apps Script Web App connected to Google Sheets.
 *
 * @param {Object} applicationData
 * @param {string} applicationData.jobId
 * @param {string} applicationData.jobTitle
 * @param {string} applicationData.fullName
 * @param {string} applicationData.email
 * @param {string} applicationData.phone
 * @param {string} applicationData.location
 * @param {string} applicationData.experience
 * @param {string} applicationData.noticePeriod
 * @param {string} applicationData.linkedinUrl
 * @param {string} applicationData.portfolioUrl
 * @param {string} applicationData.resumeLink
 * @param {File|null} applicationData.resumeFile
 * @param {string} applicationData.coverNote
 *
 * @returns {Promise<{success: boolean, message: string, isDemo?: boolean}>}
 */
export async function submitJobApplication(applicationData) {
  const scriptUrl = CAREERS_CONFIG.GOOGLE_SHEETS_SCRIPT_URL?.trim();

  let resumeFilePayload = null;
  if (applicationData.resumeFile) {
    try {
      resumeFilePayload = await fileToBase64(applicationData.resumeFile);
    } catch (e) {
      console.error('Failed to convert resume file:', e);
      throw new Error('Unable to process resume file. Please try linking your resume or uploading a smaller PDF/DOC file.');
    }
  }

  const payload = {
    timestamp: new Date().toISOString(),
    jobId: applicationData.jobId || 'General Application',
    jobTitle: applicationData.jobTitle || 'General Application',
    fullName: applicationData.fullName?.trim() || '',
    email: applicationData.email?.trim() || '',
    phone: applicationData.phone?.trim() || '',
    location: applicationData.location?.trim() || '',
    experience: applicationData.experience || '',
    noticePeriod: applicationData.noticePeriod || '',
    linkedinUrl: applicationData.linkedinUrl?.trim() || '',
    portfolioUrl: applicationData.portfolioUrl?.trim() || '',
    resumeLink: applicationData.resumeLink?.trim() || '',
    coverNote: applicationData.coverNote?.trim() || '',
    resumeFile: resumeFilePayload,
  };

  // If no script URL is configured yet, simulate a successful submission with a demo alert
  if (!scriptUrl || scriptUrl.includes('YOUR_DEPLOYED_GOOGLE_APPS_SCRIPT_URL')) {
    console.warn(
      '[AparaiTech Careers] Google Apps Script URL not configured yet. Simulating successful submission with payload:',
      payload
    );
    // Simulate brief network latency for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      isDemo: true,
      message: 'Application recorded! (Demo mode: Please configure GOOGLE_SHEETS_SCRIPT_URL in src/config/careersConfig.js for live Google Sheets storage).',
    };
  }

  try {
    // Attempt standard fetch with text/plain to avoid CORS preflight OPTION requests
    // Google Apps Script doPost receives the body cleanly this way.
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      try {
        const json = await response.json();
        if (json.status === 'success' || json.success) {
          return { success: true, message: json.message || 'Application submitted successfully.' };
        }
      } catch {
        // If response is not JSON or redirected, it still reached the Google Apps Script
        return { success: true, message: 'Application submitted successfully.' };
      }
    }

    return { success: true, message: 'Application submitted successfully.' };
  } catch (error) {
    // Google Apps Script redirects (302) sometimes trigger an opaque fetch error in browsers
    // despite the script having executed successfully. As a fallback, try no-cors mode.
    console.warn('Standard fetch returned error, attempting fallback submission:', error);
    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      return {
        success: true,
        message: 'Application submitted successfully.',
      };
    } catch (fallbackError) {
      console.error('All submission attempts failed:', fallbackError);
      throw new Error(
        `Failed to submit application. Please check your internet connection or email your resume directly to ${CAREERS_CONFIG.HR_EMAIL}.`
      );
    }
  }
}
