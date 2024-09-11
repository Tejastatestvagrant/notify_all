function generateHTMLReports(testReport) {
    return {
        tester: generateTesterHTMLReport(testReport),
        developer: generateDeveloperHTMLReport(testReport),
        stakeholder: generateStakeholderHTMLReport(testReport)
    };
}

const commonStyles = `
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 1000px;
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
      .summary {
        background-color: #ecf0f1;
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 20px;
      }
      .summary p {
        margin: 5px 0;
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
      .chart-container {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        position: relative;
      }
      .chart-container canvas {
        height: 300px;
      }
      .chart-legend {
        position: absolute;
        bottom: 10px;
        right: 10px;
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.8);
        border-radius: 5px;
      }
      .chart-legend ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .chart-legend li {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
      }
      .chart-legend .color-box {
        width: 15px;
        height: 15px;
        margin-right: 5px;
        border-radius: 50%;
      }
      .metric {
        font-size: 24px;
        font-weight: bold;
        color: #2c3e50;
      }
    </style>
`;

function generateTesterHTMLReport(testReport) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tester Report - ${testReport.projectName}</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        ${commonStyles}
    </head>
    <body>
        <h1>Detailed Test Report for ${testReport.projectName} - ${testReport.testSuite}</h1>
        <p>Timestamp: ${testReport.timestamp}</p>

        <div class="summary">
          <h2>Summary</h2>
          <p>Total Tests: ${testReport.summary.totalTests}</p>
          <p>Passed Tests: ${testReport.summary.passed}</p>
          <p>Failed Tests: ${testReport.summary.failed}</p>
          <p>Skipped Tests: ${testReport.summary.skipped}</p>
          <p>Pass Rate: ${((testReport.summary.passed / testReport.summary.totalTests) * 100).toFixed(2)}%</p>
        </div>

        <div class="chart-container">
          <canvas id="summaryChart"></canvas>
        </div>

        <h2>Detailed Test Cases</h2>
        <table>
            <tr>
                <th>Test Name</th>
                <th>Status</th>
                <th>Duration (s)</th>
                <th>Error Message</th>
                <th>Details/Logs</th> <!-- New Column for Detailed Message/Logs -->
            </tr>
            ${testReport.testCases.map(test => `
            <tr>
                <td>${test.name}</td>
                <td>${test.status}</td>
                <td>${test.duration}</td>
                <td>${test.errorMessage || ''}</td>
                <td>${test.details || 'N/A'}</td> <!-- New Detailed Column -->
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
                    backgroundColor: ['#2ecc71', '#e74c3c', '#f39c12']
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Test Results Summary'
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom'
                  }
                }
            }
        });
        </script>
    </body>
    </html>
    `;
}

function generateDeveloperHTMLReport(testReport) {
    const passedTests = testReport.testCases.filter(test => test.status === 'passed');
    const failedTests = testReport.testCases.filter(test => test.status === 'failed');
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Developer Report - ${testReport.projectName}</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        ${commonStyles}
    </head>
    <body>
        <h1>Test Report for ${testReport.projectName} - ${testReport.testSuite}</h1>
        <p>Timestamp: ${testReport.timestamp}</p>

        <div class="summary">
          <h2>Summary</h2>
          <p>Total Tests: ${testReport.summary.totalTests}</p>
          <p>Passed Tests: ${testReport.summary.passed}</p>
          <p>Failed Tests: ${testReport.summary.failed}</p>
          <p>Skipped Tests: ${testReport.summary.skipped}</p>
        </div>

        <div class="chart-container">
          <canvas id="summaryChart"></canvas>
        </div>

        <h2>Passed Test Cases</h2>
        <p>Total Passed: ${passedTests.length}</p>

        <h2>Failed Test Cases (Detailed)</h2>
        <table>
            <tr>
                <th>Test Name</th>
                <th>Duration (s)</th>
                <th>Error Message</th>
                <th>Details/Logs</th> <!-- New Column -->
            </tr>
            ${failedTests.map(test => `
            <tr>
                <td>${test.name}</td>
                <td>${test.duration}</td>
                <td>${test.errorMessage}</td>
                <td>${test.details || 'N/A'}</td> <!-- New Column for Detailed Message -->
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
                    backgroundColor: ['#2ecc71', '#e74c3c', '#f39c12']
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
                },
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom'
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
    const { totalTests, passed, failed, skipped } = testReport.summary;
    const passRate = ((passed / totalTests) * 100).toFixed(2);

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Test report for ${testReport.projectName}">
        <title>Stakeholder Report - ${testReport.projectName}</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        ${commonStyles}
    </head>
    <body>
        <h1>Test Report Overview - ${testReport.projectName}</h1>
        <div class="summary">
            <h2>Project Summary</h2>
            <p>Total Tests Executed: ${totalTests}</p>
            <p>Tests Passed: ${passed}</p>
            <p>Tests Failed: ${failed}</p>
            <p>Tests Skipped: ${skipped}</p>
            <p>Overall Pass Rate: ${passRate}%</p>
        </div>

        <div class="chart-container">
            <canvas id="summaryChart"></canvas>
        </div>

        <script>
        var ctx = document.getElementById('summaryChart').getContext('2d');
        var summaryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Passed', 'Failed', 'Skipped'],
                datasets: [{
                    data: [${passed}, ${failed}, ${skipped}],
                    backgroundColor: ['#2ecc71', '#e74c3c', '#f39c12']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom'
                  }
                },
                title: {
                    display: true,
                    text: 'Overall Test Summary'
                }
            }
        });
        </script>
    </body>
    </html>
    `;
}

  
  
  module.exports = { generateHTMLReports };