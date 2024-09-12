const config = require('./config');

function generateReports(testReport) {
  return {
    tester: generateHTMLReport(testReport, config.reportConfig.tester),
    developer: generateHTMLReport(testReport, config.reportConfig.developer),
    stakeholder: generateHTMLReport(testReport, config.reportConfig.stakeholder)
  };
}

function generateHTMLReport(testReport, reportConfig) {
  let content = '';

  for (const field of reportConfig.includeFields) {
    switch (field) {
      case 'projectName':
        content += `<h1>${testReport.projectName}</h1>`;
        break;
      case 'testSuite':
        content += `<h2>Test Suite: ${testReport.testSuite}</h2>`;
        break;
      case 'timestamp':
        content += `<p class="timestamp">Timestamp: ${testReport.timestamp}</p>`;
        break;
      case 'summary':
        content += generateHTMLSummary(testReport.summary, reportConfig.summaryFields);
        break;
      case 'testCases':
        content += generateHTMLTestCases(testReport.testCases, reportConfig.testCaseFields);
        break;
      case 'failedTestCases':
        content += generateHTMLTestCases(testReport.testCases.filter(test => test.status === 'failed'), reportConfig.testCaseFields, 'Failed Test Cases');
        break;
      case 'passRate':
        const passRate = ((testReport.summary.passed / testReport.summary.totalTests) * 100).toFixed(2);
        content += `<p class="pass-rate">Overall Pass Rate: <span class="metric">${passRate}%</span></p>`;
        break;
    }
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Report - ${testReport.projectName}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            h1, h2 {
                color: #2c3e50;
            }
            h1 {
                border-bottom: 2px solid #3498db;
                padding-bottom: 10px;
            }
            .timestamp {
                color: #7f8c8d;
                font-style: italic;
            }
            .summary {
                background-color: #ecf0f1;
                border-radius: 5px;
                padding: 15px;
                margin-bottom: 20px;
            }
            .summary h3 {
                margin-top: 0;
            }
            .metric {
                font-size: 18px;
                font-weight: bold;
                color: #2980b9;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
            }
            th, td {
                text-align: left;
                padding: 12px;
                border-bottom: 1px solid #ddd;
            }
            th {
                background-color: #3498db;
                color: white;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
            .status {
                font-weight: bold;
            }
            .status.passed {
                color: #27ae60;
            }
            .status.failed {
                color: #c0392b;
            }
            .status.skipped {
                color: #f39c12;
            }
            .pass-rate {
                font-size: 24px;
                text-align: center;
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        ${content}
    </body>
    </html>
  `;
}

function generateHTMLSummary(summary, summaryFields) {
  let summaryHTML = '<div class="summary"><h3>Summary</h3>';
  for (const field of (summaryFields || Object.keys(summary))) {
    summaryHTML += `<p>${field}: <span class="metric">${summary[field]}</span></p>`;
  }
  summaryHTML += '</div>';
  return summaryHTML;
}

function generateHTMLTestCases(testCases, testCaseFields, title = 'Test Cases') {
  let testCaseHTML = `<h3>${title}</h3><table><tr>`;
  for (const field of testCaseFields) {
    testCaseHTML += `<th>${field}</th>`;
  }
  testCaseHTML += '</tr>';

  for (const testCase of testCases) {
    testCaseHTML += '<tr>';
    for (const field of testCaseFields) {
      if (field === 'status') {
        testCaseHTML += `<td><span class="status ${testCase[field]}">${testCase[field]}</span></td>`;
      } else {
        testCaseHTML += `<td>${testCase[field] || ''}</td>`;
      }
    }
    testCaseHTML += '</tr>';
  }
  testCaseHTML += '</table>';
  return testCaseHTML;
}

module.exports = { generateReports };