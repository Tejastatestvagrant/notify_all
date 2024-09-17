# Notify_ALL

## Overview

This Node.js project automates the generation and distribution of customized test execution reports via email. It's designed to create different report versions for testers, developers, and stakeholders, providing relevant information to each group.

## Features

- Generates HTML reports from test execution data
- Customizes report content based on recipient roles (tester, developer, stakeholder)
- Sends reports via email using the Gmail API with a service account
- Supports different report structures and styling
- Includes sample test data for demonstration and testing
- Uses JSON schema for test report validation

## Project Structure

- `config.js`: Configuration settings for email recipients and report structures
- `emailSender.js`: Handles email sending using the Gmail API
- `googleAuth.js`: Manages Google service account authentication for Gmail API access
- `htmlReportGenerator.js`: Generates HTML content for email reports (deprecated, see `reportGenerator.js`)
- `index.js`: Main entry point for the application
- `reportGenerator.js`: Generates customized HTML reports based on test data and config
- `sampleTestReport.js`: Provides sample test execution data for testing
- `testReportSchema.js`: Defines the JSON schema for validating test reports

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- Google Cloud Platform account with Gmail API enabled
- Google Cloud service account with Gmail API access

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/test-report-generator.git
   cd notify_all
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up a Google Cloud Platform service account:
   - Create a new project in the Google Cloud Console (if not already created)
   - Enable the Gmail API for your project
   - Create a service account:
     - Go to "IAM & Admin" > "Service Accounts"
     - Click "Create Service Account"
     - Give it a name and grant it the necessary permissions (Gmail API access)
   - Create a key for the service account:
     - Select the service account you just created
     - Go to the "Keys" tab
     - Click "Add Key" > "Create new key"
     - Choose JSON as the key type
   - Download the JSON key file and save it as `credentails.json` in the project root

4. Configure the application:
   - Edit `config.js` to set up email recipients and customize report structures
   - Modify `sampleTestReport.js` if you want to use different test data
   - Update `googleAuth.js` to use the service account authentication method:
     ```javascript
     const { google } = require('googleapis');
     const path = require('path');

     function getAuthClient() {
       return new google.auth.GoogleAuth({
         keyFile: path.join(__dirname, 'credentails.json'),
         scopes: ['https://www.googleapis.com/auth/gmail.send'],
       });
     }

     module.exports = { getAuthClient };
     ```

5. Grant send-as permission to the service account:
   - In the Google Workspace admin console, go to Apps > Google Workspace > Settings for Gmail > Advanced settings
   - In the "Routing" section, add the service account's email address to the "Allow these addresses to send mail as any user in my domain" list

6. Prepare for the first run:
   - Ensure you have write permissions in the project directory, as a token file will be generated on the first run

## Usage

1. Run the application for the first time:
   ```
   node index.js
   ```

   On the first run, the application will authenticate using the service account and generate a token file. This file will be used for subsequent runs to avoid re-authentication.

2. For subsequent runs, execute:
   ```
   node index.js
   ```

3. The application will use the stored token to authenticate, generate reports based on the sample test data (or your provided data), and send emails to the configured recipients.

Note: If you encounter any authentication issues in the future, you can delete the generated token file and run the application again to regenerate it.

## Customization

### Modifying Report Templates

Edit the `generateHTMLReport` function in `reportGenerator.js` to customize the HTML structure and styling of the reports.

### Changing Report Content

Adjust the `reportConfig` section in `config.js` to modify which fields are included for each recipient type.

### Using Real Test Data

Replace the contents of `sampleTestReport.js` with your actual test execution data, or modify `index.js` to import real-time data from your test execution system.

## Troubleshooting

- If you encounter permission issues during the first run, ensure that your user has written permissions in the project directory.
- If authentication fails, check that your `credentails.json` file is correctly placed and contains valid credentials.
- In case of persistent issues, try deleting the generated token file (if it exists) and run the application again to force re-authentication.
- If emails are not being sent, verify that the service account has the necessary "send-as" permissions in your Google Workspace settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
