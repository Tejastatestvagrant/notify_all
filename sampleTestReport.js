// sampleTestReport.js

const sampleTestReport = {
    projectName: "E-commerce Platform",
    testSuite: "Integration Tests",
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: 50,
      passed: 45,
      failed: 3,
      skipped: 2
    },
    testCases: [
      {
        name: "User Login",
        status: "passed",
        duration: 1.5
      },
      {
        name: "Product Search",
        status: "passed",
        duration: 2.1
      },
      {
        name: "Checkout Process",
        status: "failed",
        duration: 3.2,
        errorMessage: "Payment gateway timeout after 3 seconds"
      },
      {
        name: "User Registration",
        status: "passed",
        duration: 1.8
      },
      {
        name: "Password Reset",
        status: "skipped",
        duration: 0,
        errorMessage: "Feature not implemented yet"
      }
      // ... more test cases ...
    ]
  };
  
  module.exports = sampleTestReport;