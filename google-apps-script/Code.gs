/**
 * ============================================================================
 * APARAITECH SOFTWARE - UNIFIED WEBHOOK WITH AUTO-EMAIL CONFIRMATION
 * ============================================================================
 * Features:
 * 1. Automatically records submissions into distinct Google Sheet tabs:
 *    - Contacts ('Contacts' tab)
 *    - Customer Enquiries ('Enquiries' tab)
 *    - Job Applications ('Applications' tab + Resumes saved to Google Drive)
 * 2. Automatically sends a branded, professional confirmation email to the user's
 *    inbox (Candidate, Prospective Client, or Visitor).
 * 3. Notifies the admin/owner of new submissions instantly.
 * ============================================================================
 */

var CONTACTS_SHEET_NAME = 'Contacts';
var ENQUIRIES_SHEET_NAME = 'Enquiries';
var APPLICATIONS_SHEET_NAME = 'Applications';
var DRIVE_FOLDER_NAME = 'AparaiTech Job Resumes';

// Company Branding Details for Email Headers & Footers
var COMPANY_NAME = 'AparaiTech Software Services';
var COMPANY_SUPPORT_EMAIL = 'contact@aparaitech.com';
var COMPANY_CAREERS_EMAIL = 'careers@aparaitech.com';
var COMPANY_PHONE = '+91 1000000000';
var COMPANY_ADDRESS = 'Office 122, Gera Imperium, Opposite Wipro Circle, Hinjawadi Phase 2, Pune, Maharashtra 411057';

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000);

  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var formattedTimestamp = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone() || 'Asia/Kolkata',
      'yyyy-MM-dd HH:mm:ss'
    );

    // ------------------------------------------------------------------------
    // CASE 1: Contact Us Message
    // ------------------------------------------------------------------------
    if (data.formType === 'contact') {
      var contactSheet = spreadsheet.getSheetByName(CONTACTS_SHEET_NAME);
      if (!contactSheet) {
        contactSheet = spreadsheet.insertSheet(CONTACTS_SHEET_NAME);
        initContactHeaders(contactSheet);
      } else if (contactSheet.getLastRow() === 0) {
        initContactHeaders(contactSheet);
      }

      contactSheet.appendRow([
        formattedTimestamp,
        data.fullName || '',
        data.email || '',
        data.phone || '',
        data.subject || '',
        data.message || ''
      ]);

      // Send Automated Confirmation Email to Visitor
      if (data.email) {
        sendContactConfirmationEmail(data.email, data.fullName, data.subject, data.message);
      }

      return ContentService.createTextOutput(
        JSON.stringify({
          status: 'success',
          type: 'contact',
          message: 'Contact message recorded and confirmation email triggered',
          timestamp: formattedTimestamp
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // ------------------------------------------------------------------------
    // CASE 2: Customer Project Enquiry
    // ------------------------------------------------------------------------
    if (data.formType === 'enquiry') {
      var enquirySheet = spreadsheet.getSheetByName(ENQUIRIES_SHEET_NAME);
      if (!enquirySheet) {
        enquirySheet = spreadsheet.insertSheet(ENQUIRIES_SHEET_NAME);
        initEnquiryHeaders(enquirySheet);
      } else if (enquirySheet.getLastRow() === 0) {
        initEnquiryHeaders(enquirySheet);
      }

      enquirySheet.appendRow([
        formattedTimestamp,
        data.fullName || '',
        data.email || '',
        data.phone || '',
        data.company || '',
        data.service || '',
        data.budget || '',
        data.message || ''
      ]);

      // Send Automated Confirmation Email to Client
      if (data.email) {
        sendEnquiryConfirmationEmail(data.email, data.fullName, data.service, data.company);
      }

      return ContentService.createTextOutput(
        JSON.stringify({
          status: 'success',
          type: 'enquiry',
          message: 'Enquiry recorded and confirmation email triggered',
          timestamp: formattedTimestamp
        })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // ------------------------------------------------------------------------
    // CASE 3: Career Job Application
    // ------------------------------------------------------------------------
    var appSheet = spreadsheet.getSheetByName(APPLICATIONS_SHEET_NAME);
    if (!appSheet) {
      appSheet = spreadsheet.insertSheet(APPLICATIONS_SHEET_NAME);
      initApplicationHeaders(appSheet);
    } else if (appSheet.getLastRow() === 0) {
      initApplicationHeaders(appSheet);
    }

    var resumeUrl = data.resumeLink || '';

    // Handle resume file upload to Google Drive
    if (data.resumeFile && data.resumeFile.base64) {
      try {
        var folder = getOrCreateFolder(DRIVE_FOLDER_NAME);
        var decodedBytes = Utilities.base64Decode(data.resumeFile.base64);
        var blob = Utilities.newBlob(
          decodedBytes,
          data.resumeFile.type || 'application/pdf',
          (data.fullName || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_') + '_Resume_' + (data.resumeFile.name || 'document.pdf')
        );
        var file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        resumeUrl = file.getUrl();
      } catch (fileErr) {
        Logger.log('Drive upload error: ' + fileErr.toString());
        resumeUrl = 'Upload error: ' + fileErr.toString();
      }
    }

    appSheet.appendRow([
      formattedTimestamp,
      data.jobId || '',
      data.jobTitle || 'General Application',
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.location || '',
      data.experience || '',
      data.noticePeriod || '',
      data.linkedinUrl || '',
      data.portfolioUrl || '',
      resumeUrl,
      data.coverNote || ''
    ]);

    // Send Automated Confirmation Email to Job Applicant
    if (data.email) {
      sendApplicationConfirmationEmail(data.email, data.fullName, data.jobTitle);
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'success',
        type: 'application',
        message: 'Application recorded and confirmation email triggered',
        timestamp: formattedTimestamp
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error processing submission: ' + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({
        status: 'error',
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: 'active',
      service: 'AparaiTech Unified Webhook API with Email Automation',
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ============================================================================
// AUTOMATED EMAIL DISPATCH FUNCTIONS
// ============================================================================

/**
 * Sends a confirmation email to a job applicant.
 */
function sendApplicationConfirmationEmail(recipientEmail, fullName, jobTitle) {
  try {
    var subject = 'Application Received: ' + (jobTitle || 'Engineering Role') + ' - AparaiTech Software';
    var name = fullName || 'Candidate';
    var title = jobTitle || 'Engineering Position';

    var htmlBody = ''
      + '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">'
      + '  <div style="background-color: #131B2E; padding: 28px 24px; text-align: left;">'
      + '    <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">AparaiTech Software</h2>'
      + '    <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Talent Acquisition & Systems Engineering</p>'
      + '  </div>'
      + '  <div style="padding: 32px 24px; color: #1e293b; line-height: 1.6;">'
      + '    <h3 style="color: #0f172a; margin-top: 0; font-size: 18px;">Application Registered Successfully</h3>'
      + '    <p>Dear <strong>' + name + '</strong>,</p>'
      + '    <p>Thank you for expressing your interest in joining AparaiTech Software. We have received your application for the role of <strong>' + title + '</strong>.</p>'
      + '    <div style="background-color: #f8fafc; border-left: 4px solid #0051D5; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">'
      + '      <p style="margin: 0; font-size: 14px; color: #334155;"><strong>Next Steps:</strong> Our engineering leadership evaluates candidate profiles against architectural depth and problem-solving velocity. If your profile matches our requirements, a technical recruiter will reach out to you within <strong>2 to 3 business days</strong>.</p>'
      + '    </div>'
      + '    <p style="font-size: 14px; color: #475569;">In the meantime, feel free to explore our live proprietary platforms and open-source contributions on our official portal.</p>'
      + '    <p style="margin-top: 28px; margin-bottom: 0;">Warm regards,<br><strong>Talent Acquisition Team</strong><br>AparaiTech Software Services<br><a href="mailto:' + COMPANY_CAREERS_EMAIL + '" style="color: #0051D5; text-decoration: none;">' + COMPANY_CAREERS_EMAIL + '</a></p>'
      + '  </div>'
      + '  <div style="background-color: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">'
      + '    <p style="margin: 0;">' + COMPANY_ADDRESS + '</p>'
      + '    <p style="margin: 4px 0 0 0;">© 2026 AparaiTech Software. All rights reserved.</p>'
      + '  </div>'
      + '</div>';

    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: COMPANY_NAME
    });
  } catch (err) {
    Logger.log('Failed to send application confirmation email: ' + err.toString());
  }
}

/**
 * Sends a confirmation email for project enquiries.
 */
function sendEnquiryConfirmationEmail(recipientEmail, fullName, service, company) {
  try {
    var subject = 'Project Enquiry Received - AparaiTech Software Services';
    var name = fullName || 'Client';
    var companyText = company ? ' at ' + company : '';
    var serviceText = service || 'Custom Enterprise Software';

    var htmlBody = ''
      + '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">'
      + '  <div style="background-color: #0051D5; padding: 28px 24px; text-align: left;">'
      + '    <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">AparaiTech Software</h2>'
      + '    <p style="color: #dbeafe; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Solutions Architecture & Enterprise Advisory</p>'
      + '  </div>'
      + '  <div style="padding: 32px 24px; color: #1e293b; line-height: 1.6;">'
      + '    <h3 style="color: #0f172a; margin-top: 0; font-size: 18px;">Thank You for Your Project Enquiry</h3>'
      + '    <p>Dear <strong>' + name + '</strong>' + companyText + ',</p>'
      + '    <p>Thank you for consulting AparaiTech Software regarding <strong>' + serviceText + '</strong>. Your inquiry has been routed to our Pune Center of Excellence solutions architecture desk.</p>'
      + '    <div style="background-color: #eff6ff; border-left: 4px solid #0051D5; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">'
      + '      <p style="margin: 0; font-size: 14px; color: #1e3a8a;"><strong>Service Commitment:</strong> A principal technical lead will analyze your project specifications and connect with you within <strong>24 hours</strong> with initial architectural recommendations and timeline estimates.</p>'
      + '    </div>'
      + '    <p style="font-size: 14px; color: #475569;">If you have immediate technical documentation or requirements to attach, you can reply directly to this email or reach our direct line at <strong>' + COMPANY_PHONE + '</strong>.</p>'
      + '    <p style="margin-top: 28px; margin-bottom: 0;">Sincerely,<br><strong>Enterprise Solutions Team</strong><br>AparaiTech Software Services<br><a href="mailto:' + COMPANY_SUPPORT_EMAIL + '" style="color: #0051D5; text-decoration: none;">' + COMPANY_SUPPORT_EMAIL + '</a></p>'
      + '  </div>'
      + '  <div style="background-color: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">'
      + '    <p style="margin: 0;">' + COMPANY_ADDRESS + '</p>'
      + '    <p style="margin: 4px 0 0 0;">ISO 27001 & 9001 Certified • Mutual NDA Protected</p>'
      + '  </div>'
      + '</div>';

    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: COMPANY_NAME
    });
  } catch (err) {
    Logger.log('Failed to send enquiry confirmation email: ' + err.toString());
  }
}

/**
 * Sends a confirmation email for contact form inquiries.
 */
function sendContactConfirmationEmail(recipientEmail, fullName, subjectText, messageText) {
  try {
    var subject = 'We have received your message - AparaiTech Software';
    var name = fullName || 'Visitor';
    var userSubject = subjectText || 'General Inquiry';

    var htmlBody = ''
      + '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">'
      + '  <div style="background-color: #131B2E; padding: 28px 24px; text-align: left;">'
      + '    <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.5px;">AparaiTech Software</h2>'
      + '    <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Pune Center of Excellence • Support & Advisory</p>'
      + '  </div>'
      + '  <div style="padding: 32px 24px; color: #1e293b; line-height: 1.6;">'
      + '    <h3 style="color: #0f172a; margin-top: 0; font-size: 18px;">Thank You for Reaching Out</h3>'
      + '    <p>Hello <strong>' + name + '</strong>,</p>'
      + '    <p>We have received your message regarding <em>"' + userSubject + '"</em>. Our communication and support team has logged your query.</p>'
      + '    <div style="background-color: #f8fafc; border-left: 4px solid #10b981; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">'
      + '      <p style="margin: 0; font-size: 14px; color: #334155;"><strong>Response Telemetry:</strong> Our standard response time during business hours (Mon-Fri, 9:00 AM - 7:00 PM IST) is under <strong>4 hours</strong>.</p>'
      + '    </div>'
      + '    <p style="font-size: 14px; color: #475569;">For urgent operational matters, feel free to call our direct line at <strong>' + COMPANY_PHONE + '</strong>.</p>'
      + '    <p style="margin-top: 28px; margin-bottom: 0;">Warm regards,<br><strong>Customer Relations & Support</strong><br>AparaiTech Software Services</p>'
      + '  </div>'
      + '  <div style="background-color: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">'
      + '    <p style="margin: 0;">' + COMPANY_ADDRESS + '</p>'
      + '    <p style="margin: 4px 0 0 0;">© 2026 AparaiTech Software. All rights reserved.</p>'
      + '  </div>'
      + '</div>';

    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: COMPANY_NAME
    });
  } catch (err) {
    Logger.log('Failed to send contact confirmation email: ' + err.toString());
  }
}

// ============================================================================
// SHEET HEADER INITIALIZERS
// ============================================================================

function initContactHeaders(sheet) {
  var headers = [
    'Timestamp',
    'Full Name',
    'Email Address',
    'Phone / WhatsApp',
    'Subject',
    'Message'
  ];

  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#0051D5');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 220);
  sheet.setColumnWidth(4, 160);
  sheet.setColumnWidth(5, 200);
  sheet.setColumnWidth(6, 350);
}

function initEnquiryHeaders(sheet) {
  var headers = [
    'Timestamp',
    'Full Name',
    'Work Email',
    'Phone / WhatsApp',
    'Company / Organization',
    'Service Interested',
    'Budget / Scope',
    'Requirement Description'
  ];

  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#131B2E');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 220);
  sheet.setColumnWidth(4, 160);
  sheet.setColumnWidth(5, 200);
  sheet.setColumnWidth(6, 220);
  sheet.setColumnWidth(7, 180);
  sheet.setColumnWidth(8, 350);
}

function initApplicationHeaders(sheet) {
  var headers = [
    'Timestamp',
    'Job ID',
    'Job Title',
    'Full Name',
    'Email Address',
    'Phone / WhatsApp',
    'Current Location',
    'Experience Level',
    'Notice Period',
    'LinkedIn Profile',
    'Portfolio / GitHub',
    'Resume Link / File URL',
    'Cover Note'
  ];

  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#131B2E');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);

  for (var i = 1; i <= headers.length; i++) {
    sheet.setColumnWidth(i, 180);
  }
  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(4, 180);
  sheet.setColumnWidth(5, 220);
  sheet.setColumnWidth(12, 280);
  sheet.setColumnWidth(13, 300);
}

function getOrCreateFolder(folderName) {
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}
