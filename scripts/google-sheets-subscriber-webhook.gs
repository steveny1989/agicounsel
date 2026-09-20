/**
 * Google Sheets Webhook for AGI Counsel Network Subscribers
 *
 * Setup (takes 30 seconds):
 * 1. Create a new Google Sheet with columns in Row 1: Timestamp | Email | Locale | Page
 * 2. Click Extensions -> Apps Script, paste this function, and click Save.
 * 3. Click Deploy -> New deployment -> Select type: "Web app"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 4. Copy the Web App URL (`https://script.google.com/macros/s/.../exec`)
 *    and set it as `GOOGLE_SHEET_WEBHOOK_URL` in `app/components/NetworkBriefingForm.tsx`.
 */
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.email || '',
    data.locale || 'en',
    data.page || '/notes/'
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
