// emailSender.js

const { google } = require('googleapis');
const { authorize } = require('./googleAuth'); // Assume we've moved the auth logic to a separate file

async function sendEmail(auth, to, subject, htmlContent) {
  const gmail = google.gmail({version: 'v1', auth});
  const str = [
    'Content-Type: text/html; charset="UTF-8"\n',
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: base64\n',
    'to: ', to, '\n',
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

  for (const [recipient, report] of Object.entries(reports)) {
    const to = emailConfig.recipients[recipient];
    const subject = `Test Execution Report for ${recipient}`;
    await sendEmail(auth, to, subject, report);
    console.log(`Email sent to ${to}`);
  }
}

module.exports = { sendEmails };