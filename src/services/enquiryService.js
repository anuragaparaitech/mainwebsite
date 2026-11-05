import { CAREERS_CONFIG } from '../config/careersConfig';

/**
 * Submits customer enquiry details to the Google Apps Script Web App endpoint.
 *
 * @param {Object} enquiryData
 * @param {string} enquiryData.fullName
 * @param {string} enquiryData.email
 * @param {string} enquiryData.phone
 * @param {string} enquiryData.company
 * @param {string} enquiryData.service
 * @param {string} enquiryData.budget
 * @param {string} enquiryData.message
 *
 * @returns {Promise<{success: boolean, message: string, isDemo?: boolean}>}
 */
export async function submitCustomerEnquiry(enquiryData) {
  const scriptUrl = CAREERS_CONFIG.GOOGLE_SHEETS_SCRIPT_URL?.trim();

  const payload = {
    formType: 'enquiry',
    timestamp: new Date().toISOString(),
    fullName: enquiryData.fullName?.trim() || '',
    email: enquiryData.email?.trim() || '',
    phone: enquiryData.phone?.trim() || '',
    company: enquiryData.company?.trim() || '',
    service: enquiryData.service || 'General Enquiry',
    budget: enquiryData.budget || 'Flexible',
    message: enquiryData.message?.trim() || '',
  };

  if (!scriptUrl || scriptUrl.includes('YOUR_DEPLOYED_GOOGLE_APPS_SCRIPT_URL')) {
    console.warn(
      '[AparaiTech Enquiry] Google Apps Script URL not configured yet. Simulating successful enquiry with payload:',
      payload
    );
    await new Promise((resolve) => setTimeout(resolve, 900));
    return {
      success: true,
      isDemo: true,
      message: 'Enquiry received! (Demo mode: Please configure GOOGLE_SHEETS_SCRIPT_URL in src/config/careersConfig.js for live Google Sheets storage).',
    };
  }

  try {
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
          return { success: true, message: json.message || 'Enquiry submitted successfully.' };
        }
      } catch {
        return { success: true, message: 'Enquiry submitted successfully.' };
      }
    }

    return { success: true, message: 'Enquiry submitted successfully.' };
  } catch (error) {
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
        message: 'Enquiry submitted successfully.',
      };
    } catch (fallbackError) {
      console.error('All enquiry submission attempts failed:', fallbackError);
      throw new Error(
        `Failed to submit enquiry. Please check your network or email us directly at contact@aparaitech.com.`
      );
    }
  }
}
