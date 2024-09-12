// sampleTestReport.js

const sampleTestReport = {
  projectName: "E-commerce Platform",
  testSuite: "Integration and Performance Tests",
  timestamp: new Date().toISOString(),
  summary: {
    totalTests: 100,
    passed: 85,
    failed: 10,
    skipped: 5
  },
  testCases: [
    {
      name: "User Registration - Happy Path",
      status: "passed",
      duration: 1.8,
      details: "New user successfully registered with valid details"
    },
    {
      name: "User Registration - Duplicate Email",
      status: "passed",
      duration: 1.5,
      details: "System correctly prevented registration with an existing email"
    },
    {
      name: "User Login - Valid Credentials",
      status: "passed",
      duration: 1.2,
      details: "User successfully logged in with correct username and password"
    },
    {
      name: "User Login - Invalid Password",
      status: "passed",
      duration: 1.3,
      details: "System correctly denied access with invalid password"
    },
    {
      name: "Password Reset - Email Sending",
      status: "passed",
      duration: 2.1,
      details: "Password reset email successfully sent to user's email"
    },
    {
      name: "Product Search - Keyword",
      status: "passed",
      duration: 1.7,
      details: "Search results correctly displayed for given keyword"
    },
    {
      name: "Product Search - Filters",
      status: "passed",
      duration: 2.3,
      details: "Search results correctly filtered by price range and category"
    },
    {
      name: "Product Details Page Loading",
      status: "passed",
      duration: 1.5,
      details: "Product details page loaded with correct information"
    },
    {
      name: "Add to Cart",
      status: "passed",
      duration: 1.1,
      details: "Product successfully added to cart"
    },
    {
      name: "Update Cart Quantity",
      status: "passed",
      duration: 1.3,
      details: "Cart quantity updated correctly"
    },
    {
      name: "Remove from Cart",
      status: "passed",
      duration: 1.2,
      details: "Product successfully removed from cart"
    },
    {
      name: "Checkout Process - Guest User",
      status: "failed",
      duration: 3.5,
      errorMessage: "Payment gateway timeout after 3 seconds",
      details: "Checkout process failed at payment step for guest user"
    },
    {
      name: "Checkout Process - Registered User",
      status: "passed",
      duration: 3.2,
      details: "Registered user completed checkout successfully"
    },
    {
      name: "Order Confirmation Email",
      status: "passed",
      duration: 2.5,
      details: "Order confirmation email sent and received"
    },
    {
      name: "User Review Submission",
      status: "passed",
      duration: 1.9,
      details: "User successfully submitted a product review"
    },
    {
      name: "Wishlist - Add Product",
      status: "passed",
      duration: 1.4,
      details: "Product successfully added to user's wishlist"
    },
    {
      name: "Wishlist - Remove Product",
      status: "passed",
      duration: 1.3,
      details: "Product successfully removed from user's wishlist"
    },
    {
      name: "Product Recommendation Engine",
      status: "failed",
      duration: 4.2,
      errorMessage: "Recommendations not generated within acceptable time",
      details: "Performance issue detected in recommendation algorithm"
    },
    {
      name: "Site-wide Search Functionality",
      status: "passed",
      duration: 2.7,
      details: "Site-wide search returned relevant results from all sections"
    },
    {
      name: "Mobile Responsiveness - Home Page",
      status: "passed",
      duration: 2.1,
      details: "Home page rendered correctly on various mobile device sizes"
    },
    {
      name: "Mobile Responsiveness - Checkout Process",
      status: "failed",
      duration: 2.8,
      errorMessage: "Layout issues on small screens during payment step",
      details: "Checkout process not fully responsive on mobile devices"
    },
    {
      name: "Performance Test - Home Page Load Time",
      status: "passed",
      duration: 1.5,
      details: "Home page loaded within 2 seconds on standard connection"
    },
    {
      name: "Performance Test - Search Results Page",
      status: "failed",
      duration: 3.7,
      errorMessage: "Page load time exceeded 3 seconds threshold",
      details: "Search results page slow to load with 100+ products"
    },
    {
      name: "Security Test - SQL Injection Prevention",
      status: "passed",
      duration: 2.9,
      details: "System successfully prevented SQL injection attempts"
    },
    {
      name: "Security Test - Cross-Site Scripting (XSS) Prevention",
      status: "passed",
      duration: 3.1,
      details: "System successfully prevented XSS attempts in user inputs"
    },
    {
      name: "Inventory Management - Stock Update",
      status: "passed",
      duration: 2.2,
      details: "Inventory correctly updated after successful order"
    },
    {
      name: "Inventory Management - Out of Stock Handling",
      status: "passed",
      duration: 1.8,
      details: "System correctly handled attempts to order out-of-stock items"
    },
    {
      name: "Customer Support Chat Integration",
      status: "skipped",
      duration: 0,
      details: "Feature not implemented in current sprint"
    },
    {
      name: "Social Media Integration - Product Sharing",
      status: "passed",
      duration: 2.4,
      details: "Products successfully shared to major social media platforms"
    },
    {
      name: "Newsletter Subscription",
      status: "passed",
      duration: 1.6,
      details: "Users successfully subscribed to newsletter"
    }
  ]
};

module.exports = sampleTestReport;