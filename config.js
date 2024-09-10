module.exports = {
    testResults: {
      totalTests: 100,
      passed: 85,
      failed: 15,
      failedTests: [
        { name: 'Test Case 1', reason: 'Expected output did not match' },
        { name: 'Test Case 2', reason: 'Timeout occurred' },
        // ... more failed tests
      ]
    },
    emailConfig: {
      recipients: {
        tester: 'tejass@testvagrant.com',
        developer: 'alfareed@testvagrant.com',
        stakeholder: 'tejastejas5999@gmail.com'
      }
    }
  };

  //add the modify version