/**
 * This file is used to expose environment variables to the client-side code
 * It's loaded by Docusaurus as a client module
 */

// Make environment variables available to client-side code
if (typeof window !== 'undefined') {
  // GitHub OAuth configuration
  window.process = window.process || {};
  window.process.env = window.process.env || {};

  // Pass environment variables from Node.js to the client
  window.process.env.GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
  window.process.env.GITHUB_REDIRECT_URI =
    process.env.GITHUB_REDIRECT_URI || '';

  // Debug output
  console.log('Client-side environment variables:');
  console.log('GITHUB_CLIENT_ID:', window.process.env.GITHUB_CLIENT_ID);
  console.log('GITHUB_REDIRECT_URI:', window.process.env.GITHUB_REDIRECT_URI);
}
