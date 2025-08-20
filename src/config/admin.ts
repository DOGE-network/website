// Admin system configuration
// This file contains configuration that can be safely exposed to the frontend

// We'll use a simpler approach without extending Window

// GitHub OAuth configuration - get from customFields if available
let GITHUB_CLIENT_ID = '';
let GITHUB_REDIRECT_URI = '/admin';

// Try to get values from process.env
if (typeof process !== 'undefined' && process.env) {
  GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
  GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || '/admin';
}

// Debug output
if (typeof window !== 'undefined') {
  console.log('Admin Config - GITHUB_CLIENT_ID:', GITHUB_CLIENT_ID);
  console.log('Admin Config - GITHUB_REDIRECT_URI:', GITHUB_REDIRECT_URI);
}

export const adminConfig = {
  github: {
    clientId: GITHUB_CLIENT_ID,
    redirectUri: GITHUB_REDIRECT_URI,
    scope: 'repo',
  },
  repository: {
    owner: 'doge-network',
    name: 'doge-network-website',
    branch: 'main',
  },
  admin: {
    supportedExtensions: ['.md', '.mdx'],
  },
};

// Helper function to check if OAuth is configured
export const isOAuthConfigured = (): boolean => {
  return !!adminConfig.github.clientId;
};

// Helper function to get OAuth authorization URL
export const getOAuthUrl = (): string => {
  const { clientId, redirectUri, scope } = adminConfig.github;

  if (!clientId) {
    throw new Error('GitHub OAuth is not configured');
  }

  return `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
};
