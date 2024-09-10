// htmlReportGenerator.js

function generateHTMLReports(testReport) {
    return {
      tester: generateTesterHTMLReport(testReport),
      developer: generateDeveloperHTMLReport(testReport),
      stakeholder: generateStakeholderHTMLReport(testReport)
    };
  }
  
  function generateTesterHTMLReport(testReport) {
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tester Report - ${testReport.projectName}</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
      <h1>Test Report for ${testReport.projectName} - ${testReport.testSuite}</h1>
      <p>Timestamp: ${testReport.timestamp}</p>
  
      <h2>Summary</h2>
      <canvas id="summaryChart" width="400" height="200"></canvas>
  
      <h2>Detailed Test Cases</h2>
      <table border="1">
          <tr>
              <th>Test Name</th>
              <th>Status</th>
              <th>Duration (s)</th>
              <th>Error Message</th>
          </tr>
          ${testReport.testCases.map(test => `
          <tr>
              <td>${test.name}</td>
              <td>${test.status}</td>
              <td>${test.duration}</td>
              <td>${test.errorMessage || ''}</td>
          </tr>
          `).join('')}
      </table>
  
      <script>
      var ctx = document.getElementById('summaryChart').getContext('2d');
      var summaryChart = new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ['Passed', 'Failed', 'Skipped'],
              datasets: [{
                  data: [${testReport.summary.passed}, ${testReport.summary.failed}, ${testReport.summary.skipped}],
                  backgroundColor: ['#36a2eb', '#ff6384', '#ffce56']
              }]
          },
          options: {
              responsive: true,
              title: {
                  display: true,
                  text: 'Test Results Summary'
              }
          }
      });
      </script>
  </body>
  </html>
    `;
  }
  
  function generateDeveloperHTMLReport(testReport) {
    const failedTests = testReport.testCases.filter(test => test.status === 'failed');
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Developer Report - ${testReport.projectName}</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
      <h1>Test Report for ${testReport.projectName} - ${testReport.testSuite}</h1>
      <p>Timestamp: ${testReport.timestamp}</p>
  
      <h2>Summary</h2>
      <canvas id="summaryChart" width="400" height="200"></canvas>
  
      <h2>Failed Test Cases</h2>
      <table border="1">
          <tr>
              <th>Test Name</th>
              <th>Duration (s)</th>
              <th>Error Message</th>
          </tr>
          ${failedTests.map(test => `
          <tr>
              <td>${test.name}</td>
              <td>${test.duration}</td>
              <td>${test.errorMessage}</td>
          </tr>
          `).join('')}
      </table>
  
      <script>
      var ctx = document.getElementById('summaryChart').getContext('2d');
      var summaryChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: ['Passed', 'Failed', 'Skipped'],
              datasets: [{
                  label: 'Number of Tests',
                  data: [${testReport.summary.passed}, ${testReport.summary.failed}, ${testReport.summary.skipped}],
                  backgroundColor: ['#36a2eb', '#ff6384', '#ffce56']
              }]
          },
          options: {
              responsive: true,
              title: {
                  display: true,
                  text: 'Test Results Summary'
              },
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });
      </script>
  </body>
  </html>
    `;
  }
  
  function generateStakeholderHTMLReport(testReport) {
    const passRate = ((testReport.summary.passed / testReport.summary.totalTests) * 100).toFixed(2);
    return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Stakeholder Report - ${testReport.projectName}</title>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </head>
  <body>
      <h1>Test Report Summary for ${testReport.projectName}</h1>
      <p>Test Suite: ${testReport.testSuite}</p>
      <p>Timestamp: ${testReport.timestamp}</p>
  
      <h2>Overall Results</h2>
      <canvas id="summaryChart" width="400" height="200"></canvas>
  
      <h2>Key Metrics</h2>
      <p>Total Tests: ${testReport.summary.totalTests}</p>
      <p>Overall Pass Rate: ${passRate}%</p>
  
      <script>
      var ctx = document.getElementById('summaryChart').getContext('2d');
      var summaryChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: ['Passed', 'Failed', 'Skipped'],
              datasets: [{
                  data: [${testReport.summary.passed}, ${testReport.summary.failed}, ${testReport.summary.skipped}],
                  backgroundColor: ['#36a2eb', '#ff6384', '#ffce56']
              }]
          },
          options: {
              responsive: true,
              title: {
                  display: true,
                  text: 'Test Results Summary'
              }
          }
      });
      </script>
  </body>
  </html>
    `;
  }
  
  module.exports = { generateHTMLReports };