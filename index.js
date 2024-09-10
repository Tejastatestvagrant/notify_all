

const { generateHTMLReports } = require('./htmlReportGenerator');
const { sendEmails } = require('./emailSender');
const sampleTestReport = require('./sampleTestReport');

async function main() {
  const reports = generateHTMLReports(sampleTestReport);
  await sendEmails(reports);
  console.log('HTML Reports sent successfully!');
}

main().catch(console.error);