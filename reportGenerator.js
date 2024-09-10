

function generateReports(testReport) {
  return {
    tester: generateTesterReport(testReport),
    developer: generateDeveloperReport(testReport),
    stakeholder: generateStakeholderReport(testReport)
  };
}

function generateTesterReport(testReport) {
  return `
Test Report for ${testReport.projectName} - ${testReport.testSuite}
Timestamp: ${testReport.timestamp}

Summary:
Total Tests: ${testReport.summary.totalTests}
Passed: ${testReport.summary.passed}
Failed: ${testReport.summary.failed}
Skipped: ${testReport.summary.skipped}

Detailed Test Cases:
${testReport.testCases.map(test => `
- ${test.name}
  Status: ${test.status}
  Duration: ${test.duration}s
  ${test.errorMessage ? `Error: ${test.errorMessage}` : ''}
`).join('\n')}
  `.trim();
}

function generateDeveloperReport(testReport) {
  return `
Test Report for ${testReport.projectName} - ${testReport.testSuite}
Timestamp: ${testReport.timestamp}

Summary:
Total Tests: ${testReport.summary.totalTests}
Passed: ${testReport.summary.passed}
Failed: ${testReport.summary.failed}
Skipped: ${testReport.summary.skipped}

Failed Test Cases:
${testReport.testCases.filter(test => test.status === 'failed').map(test => `
- ${test.name}
  Duration: ${test.duration}s
  Error: ${test.errorMessage}
`).join('\n')}
  `.trim();
}

function generateStakeholderReport(testReport) {
  return `
Test Report Summary for ${testReport.projectName}
Test Suite: ${testReport.testSuite}
Timestamp: ${testReport.timestamp}

Total Tests: ${testReport.summary.totalTests}
Passed: ${testReport.summary.passed}
Failed: ${testReport.summary.failed}
Skipped: ${testReport.summary.skipped}

Overall Pass Rate: ${((testReport.summary.passed / testReport.summary.totalTests) * 100).toFixed(2)}%
  `.trim();
}

module.exports = { generateReports };