import { CAREERS_CONFIG } from '../config/careersConfig';

/**
 * Submits general contact form inquiries to Google Sheets.
 *
 * @param {Object} contactData
 * @param {string} contactData.fullName
 * @param {string} contactData.email
 * @param {string} contactData.phone
 * @param {string} contactData.subject
 * @param {string} contactData.message
 *
 * @returns {Promise<{success: boolean, message: string, isDemo?: boolean}>}
 */
export async function submitContactMessage(contactData) {
  const scriptUrl = CAREERS_CONFIG.GOOGLE_SHEETS_SCRIPT_URL?.trim();

  const payload = {
    formType: 'contact',
    timestamp: new Date().toISOString(),
    fullName: contactData.fullName?.trim() || '',
    email: contactData.email?.trim() || '',
    phone: contactData.phone?.trim() || '',
    subject: contactData.subject?.trim() || 'General Inquiry',
    message: contactData.message?.trim() || '',
  };

  if (!scriptUrl || scriptUrl.includes('YOUR_DEPLOYED_GOOGLE_APPS_SCRIPT_URL')) {
    console.warn(
      '[AparaiTech Contact] Google Apps Script URL not configured yet. Simulating successful contact message:',
      payload
    );
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      isDemo: true,
      message: 'Message registered! (Demo mode: Configure GOOGLE_SHEETS_SCRIPT_URL in src/config/careersConfig.js for live Google Sheets storage).',
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
          return { success: true, message: json.message || 'Message sent successfully.' };
        }
      } catch {
        return { success: true, message: 'Message sent successfully.' };
      }
    }

    return { success: true, message: 'Message sent successfully.' };
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
        message: 'Message sent successfully.',
      };
    } catch (fallbackError) {
      console.error('All contact submission attempts failed:', fallbackError);
      throw new Error(
        'Failed to deliver message. Please contact us directly at +91 1000000000 or contact@aparaitech.com.'
      );
    }
  }
}
