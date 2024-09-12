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
      tester: [
        'tejass@testvagrant.com',
        'alfareed@testvagrant.com'
      ],
      developer: [
        'tejsamratoffical@gmail.com',
      ],
      stakeholder: [
        'tejastejas5999@gmail.com',
      ]
    }
  },
  reportConfig: {
    tester: {
      includeFields: ['projectName', 'testSuite', 'timestamp', 'summary', 'testCases'],
      testCaseFields: ['name', 'status', 'duration', 'errorMessage']
    },
    developer: {
      includeFields: ['projectName', 'testSuite', 'timestamp', 'summary', 'failedTestCases'],
      testCaseFields: ['name', 'duration', 'errorMessage']
    },
    stakeholder: {
      includeFields: ['projectName', 'testSuite', 'timestamp', 'summary', 'passRate'],
      summaryFields: ['totalTests', 'passed', 'failed', 'skipped']
    }
  }
};