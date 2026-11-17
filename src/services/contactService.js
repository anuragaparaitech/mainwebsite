/**
 * Deprecated: The Contact Us form has been completely removed in favor of the
 * direct Contact Details & Corporate Headquarters section on the About Aparaitech page.
 * Google Sheets integration for the old contact form is decommissioned.
 */
export async function submitContactMessage() {
  console.warn('[Aparaitech] Contact form is deprecated. Direct inquiries should use info@aparaitech.org.');
  return { success: true };
}
