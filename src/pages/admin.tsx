import React, { useState, useEffect, useCallback } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { adminConfig, isOAuthConfigured, getOAuthUrl } from '../config/admin';

// Add DOM lib to TypeScript configuration
// This is simpler than creating our own interfaces
// No need to declare Window or Storage interfaces as they're already in lib.dom.d.ts

interface FileItem {
  path: string;
  name: string;
  type: 'file' | 'directory';
  content?: string;
  sha?: string;
}

interface EditorState {
  currentFile: FileItem | null;
  content: string;
  isEditing: boolean;
  isSaving: boolean;
}

export default function Admin(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Define user interface
  interface GithubUser {
    login: string;
    avatar_url?: string;
    name?: string;
    id?: number;
    [key: string]: unknown; // Allow other properties
  }

  const [user, setUser] = useState<GithubUser | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [editorState, setEditorState] = useState<EditorState>({
    currentFile: null,
    content: '',
    isEditing: false,
    isSaving: false,
  });

  // Define callbacks before using them in useEffect

  const loadFiles = useCallback(async (token: string) => {
    try {
      const { owner, name } = adminConfig.repository;
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${name}/contents`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Define GitHub API response interface
        interface GithubFileItem {
          name: string;
          path: string;
          type: string;
          sha: string;
          size?: number;
          content?: string;
          [key: string]: unknown; // Allow other properties
        }

        const markdownFiles = data
          .filter(
            (item: GithubFileItem) =>
              item.type === 'file' &&
              adminConfig.admin.supportedExtensions.some(ext =>
                item.name.endsWith(ext)
              )
          )
          .map((item: GithubFileItem) => ({
            path: item.path,
            name: item.name,
            type: 'file' as const,
            sha: item.sha,
          }));

        setFiles(markdownFiles);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load files:', error);
    }
  }, []);

  const checkAuthStatus = useCallback(
    async (token: string) => {
      try {
        const response = await fetch('https://api.github.com/user', {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsAuthenticated(true);
          loadFiles(token);
        } else {
          localStorage.removeItem('github_token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Auth check failed:', error);
        localStorage.removeItem('github_token');
        setIsAuthenticated(false);
      }
    },
    [loadFiles]
  );

  const handleOAuthCallback = useCallback(
    async (code: string) => {
      try {
        // Exchange the OAuth code for a token using our backend
        const response = await fetch('/api/github-auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (response.ok) {
          const data = await response.json();
          const token = data.access_token;

          // Store the token
          localStorage.setItem('github_token', token);

          // Check auth status and load files
          await checkAuthStatus(token);

          // Clear the URL parameters
          window.history.replaceState({}, document.title, '/admin');
        } else {
          const errorData = await response.json();
          alert(`Authentication failed: ${errorData.message}`);
          window.history.replaceState({}, document.title, '/admin');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('OAuth callback failed:', error);
        alert('Authentication failed. Please try again.');
        window.history.replaceState({}, document.title, '/admin');
      }
    },
    [checkAuthStatus]
  );

  useEffect(() => {
    // Check for OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      // Handle OAuth callback
      handleOAuthCallback(code);
    } else {
      // Check if user is already authenticated
      const token = localStorage.getItem('github_token');
      if (token) {
        checkAuthStatus(token);
      }
    }
  }, [handleOAuthCallback, checkAuthStatus]);

  const handleGitHubLogin = () => {
    if (!isOAuthConfigured()) {
      alert(
        'GitHub OAuth is not configured. Please set GITHUB_CLIENT_ID in your environment variables.'
      );
      return;
    }

    try {
      const authUrl = getOAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      alert(`Login failed: ${error.message}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('github_token');
    setIsAuthenticated(false);
    setUser(null);
    setFiles([]);
    setEditorState({
      currentFile: null,
      content: '',
      isEditing: false,
      isSaving: false,
    });
  };

  const openFile = async (file: FileItem) => {
    try {
      const token = localStorage.getItem('github_token');
      const { owner, name } = adminConfig.repository;
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${name}/contents/${file.path}`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const content = atob(data.content);
        setEditorState({
          currentFile: { ...file, sha: data.sha },
          content,
          isEditing: true,
          isSaving: false,
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to open file:', error);
    }
  };

  const saveFile = async () => {
    if (!editorState.currentFile) return;

    setEditorState(prev => ({ ...prev, isSaving: true }));

    try {
      const token = localStorage.getItem('github_token');
      const { owner, name } = adminConfig.repository;
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${name}/contents/${editorState.currentFile.path}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Update ${editorState.currentFile.name} via admin interface`,
            content: btoa(editorState.content),
            sha: editorState.currentFile.sha,
          }),
        }
      );

      if (response.ok) {
        alert('File saved successfully!');
        setEditorState(prev => ({ ...prev, isEditing: false }));
        // Reload files to get updated SHAs
        loadFiles(token!);
      } else {
        const errorData = await response.json();
        alert(`Failed to save file: ${errorData.message}`);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save file:', error);
      alert('Failed to save file');
    } finally {
      setEditorState(prev => ({ ...prev, isSaving: false }));
    }
  };

  const handleContentChange = (content: string) => {
    setEditorState(prev => ({ ...prev, content }));
  };

  if (!isAuthenticated) {
    return (
      <Layout
        title={`Admin - ${siteConfig.title}`}
        description='Content management interface for the DOGE Network website'
      >
        <main className='admin-page'>
          <div className='admin-container'>
            <div className='admin-login'>
              <h1>Content Manager</h1>
              <p>Sign in with GitHub to edit website content</p>
              <button
                className='github-login-btn'
                onClick={handleGitHubLogin}
                disabled={!isOAuthConfigured()}
              >
                Sign in with GitHub
              </button>
              <div className='login-info'>
                <p>
                  You'll need access to the {adminConfig.repository.owner}/
                  {adminConfig.repository.name} repository
                </p>
                {!isOAuthConfigured() && (
                  <p>
                    <strong>Warning:</strong> GitHub OAuth is not configured.
                    Please set GITHUB_CLIENT_ID in your environment variables.
                  </p>
                )}
              </div>

              <div className='setup-instructions'>
                <h3>Setup Instructions</h3>
                <ol>
                  <li>
                    Create a GitHub OAuth App at{' '}
                    <a
                      href='https://github.com/settings/developers'
                      target='_blank'
                      rel='noopener'
                    >
                      GitHub Developer Settings
                    </a>
                  </li>
                  <li>
                    Set the Authorization callback URL to:{' '}
                    <code>{adminConfig.github.redirectUri}</code>
                  </li>
                  <li>
                    Set environment variables: <code>GITHUB_CLIENT_ID</code>,{' '}
                    <code>GITHUB_CLIENT_SECRET</code>,{' '}
                    <code>GITHUB_REDIRECT_URI</code>
                  </li>
                  <li>
                    For local development, create a <code>.env.local</code> file
                  </li>
                  <li>
                    For production, set variables in your Vercel dashboard
                  </li>
                </ol>
              </div>
              
              {/* Debug information */}
              <div className='debug-info' style={{marginTop: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px'}}>
                <h3>Debug Information</h3>
                <p>Client ID detected: {adminConfig.github.clientId ? '✅ Yes' : '❌ No'}</p>
                <p>Client ID value: {adminConfig.github.clientId || '(empty)'}</p>
                <p>Redirect URI: {adminConfig.github.redirectUri}</p>
                <p>OAuth configured: {isOAuthConfigured() ? '✅ Yes' : '❌ No'}</p>
                <p>Current URL: {typeof window !== 'undefined' ? window.location.href : ''}</p>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      title={`Admin - ${siteConfig.title}`}
      description='Content management interface for the DOGE Network website'
    >
      <main className='admin-page'>
        <div className='admin-container'>
          <div className='admin-header'>
            <div className='admin-user-info'>
              <h1>Content Manager</h1>
              <p>Welcome, {user?.login}!</p>
              <button className='logout-btn' onClick={handleLogout}>
                Sign Out
              </button>
            </div>
          </div>

          <div className='admin-content'>
            <div className='file-browser'>
              <h2>Available Files</h2>
              <div className='file-list'>
                {files.map(file => (
                  <button
                    key={file.path}
                    className={`file-item ${editorState.currentFile?.path === file.path ? 'active' : ''}`}
                    onClick={() => openFile(file)}
                  >
                    <span className='file-icon'>📄</span>
                    <span className='file-name'>{file.name}</span>
                    <span className='file-path'>{file.path}</span>
                  </button>
                ))}
              </div>
            </div>

            {editorState.isEditing && (
              <div className='markdown-editor'>
                <div className='editor-header'>
                  <h3>Editing: {editorState.currentFile?.name}</h3>
                  <div className='editor-actions'>
                    <button
                      className='save-btn'
                      onClick={saveFile}
                      disabled={editorState.isSaving}
                    >
                      {editorState.isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      className='cancel-btn'
                      onClick={() =>
                        setEditorState(prev => ({ ...prev, isEditing: false }))
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                <div className='editor-tabs'>
                  <div className='tab active'>Edit</div>
                  <div className='tab'>Preview</div>
                </div>

                <div className='editor-content'>
                  <textarea
                    value={editorState.content}
                    onChange={e => handleContentChange(e.target.value)}
                    placeholder='Start typing your markdown content...'
                    className='markdown-textarea'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
