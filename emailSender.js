// emailSender.js
const { google } = require('googleapis');
const { authorize } = require('./googleAuth'); // Assume we've moved the auth logic to a separate file

async function sendEmail(auth, to, subject, htmlContent) {
  const gmail = google.gmail({version: 'v1', auth});
  const str = [
    'Content-Type: text/html; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: base64\n',
    'to: ', Array.isArray(to) ? to.join(', ') : to, '\n',
    'subject: ', subject, '\n\n',
    htmlContent
  ].join('');

  const encodedMessage = Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  });
  return res.data;
}

async function sendEmails(reports) {
  const auth = await authorize();
  const { emailConfig } = require('./config');

  for (const [role, report] of Object.entries(reports)) {
    const recipients = emailConfig.recipients[role];
    const subject = `Test Execution Report for ${role}`;
    
    if (Array.isArray(recipients)) {
      // Send to multiple recipients
      await sendEmail(auth, recipients, subject, report);
      console.log(`Email sent to ${role}s: ${recipients.join(', ')}`);
    } else {
      // Fallback for single recipient (backwards compatibility)
      await sendEmail(auth, recipients, subject, report);
      console.log(`Email sent to ${role}: ${recipients}`);
    }
  }
}

module.exports = { sendEmails };