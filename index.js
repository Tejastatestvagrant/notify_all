// index.js

const { generateReports } = require('./reportGenerator');
const { sendEmails } = require('./emailSender');
const sampleTestReport = require('./sampleTestReport');

async function main() {
  const reports = generateReports(sampleTestReport);
  await sendEmails(reports);
  console.log('Reports sent successfully!');
}

main().catch(console.error);