

const testReportSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
      "projectName": { "type": "string" },
      "testSuite": { "type": "string" },
      "timestamp": { "type": "string", "format": "date-time" },
      "summary": {
        "type": "object",
        "properties": {
          "totalTests": { "type": "integer" },
          "passed": { "type": "integer" },
          "failed": { "type": "integer" },
          "skipped": { "type": "integer" }
        },
        "required": ["totalTests", "passed", "failed", "skipped"]
      },
      "testCases": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "status": { "type": "string", "enum": ["passed", "failed", "skipped"] },
            "duration": { "type": "number" },
            "errorMessage": { "type": "string" }
          },
          "required": ["name", "status", "duration"]
        }
      }
    },
    "required": ["projectName", "testSuite", "timestamp", "summary", "testCases"]
  };
  
  module.exports = testReportSchema;