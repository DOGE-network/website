# DOGE Network Website - Admin System

## Overview

The DOGE Network website now includes a **custom content management system** that allows non-technical users to edit markdown files directly on the website using GitHub authentication. This is a true in-website solution that doesn't require external services like Netlify.

## Features

- **🔐 GitHub Authentication**: Secure login using your GitHub account
- **📝 In-Website Editing**: Edit content directly on the website, no external tools needed
- **📄 Markdown Support**: Rich text editing with markdown syntax highlighting
- **🔄 Real-time Updates**: Changes are saved directly to your GitHub repository
- **📱 Mobile Friendly**: Works on all devices
- **🎨 Beautiful UI**: Modern, intuitive interface that matches your website theme

## How to Access the Admin System

1. Navigate to `/admin` on your website
2. Click "Sign in with GitHub"
3. Authorize the application to access your repository
4. Start editing content!

## What You Can Edit

### 📚 Documentation
- Main documentation pages (`docs/` folder)
- Mission statements and project descriptions
- Tutorial content and guides

### 📝 Blog Posts
- Create new blog posts
- Edit existing posts
- Add metadata (title, description, date, author, tags)

### 📅 Meetings & Schedule
- Meeting notes and agendas
- Event schedules
- Meeting recordings and descriptions

### 🏠 Pages
- Homepage content
- About page
- Other static pages

## Setup Instructions

### 1. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: DOGE Network Admin
   - **Homepage URL**: `https://dogenetwork.org`
   - **Authorization callback URL**: `https://dogenetwork.org/admin`
4. Click "Register application"
5. Copy your **Client ID** and **Client Secret**

### 2. Configure Environment Variables

Set these environment variables in your Vercel deployment:

```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=https://dogenetwork.org/admin
```

For local development, create a `.env.local` file with the same variables (see `env-template.txt`).

### 3. Deploy

Deploy your website to Vercel. The admin system will be available at `/admin`.

## How to Use the CMS

### Editing Existing Content
1. **Browse Files**: Click on any markdown file in the file browser
2. **Edit Content**: Use the rich text editor to make changes
3. **Save Changes**: Click "Save Changes" to commit to GitHub
4. **Automatic Deployment**: Vercel will automatically rebuild and deploy your changes

### Creating New Content
1. **Navigate to Collection**: Go to the appropriate folder in your repository
2. **Create File**: Use GitHub's web interface or your preferred method
3. **Edit**: Open the new file in the admin system to edit content

### File Management
- **Supported Formats**: `.md` and `.mdx` files
- **File Browser**: See all available markdown files at a glance
- **Quick Access**: Click any file to start editing immediately

## Security Features

- **GitHub OAuth**: Secure authentication using GitHub's proven OAuth system
- **Repository Access**: Users must have access to your repository
- **Token Management**: Access tokens are stored securely in localStorage
- **Scope Limitation**: Only repository access is requested, not full account access

## Technical Architecture

### Frontend (React + TypeScript)
- Custom admin interface built with React
- TypeScript for type safety
- Responsive design with CSS Grid and Flexbox
- Dark mode support
- Environment variable configuration

### Backend (Vercel Serverless)
- `/api/github-auth` endpoint for OAuth token exchange
- Secure handling of GitHub API calls
- Environment variable configuration

### GitHub Integration
- Direct API integration with GitHub
- File content retrieval and updates
- Automatic commit messages
- SHA-based file versioning

## Benefits for Non-Technical Users

- **No Git Knowledge Required**: Make changes through a simple web interface
- **No External Tools**: Everything works within your website
- **Familiar Interface**: Web-based editing similar to other content management systems
- **Instant Feedback**: See your changes immediately after saving
- **Safe Editing**: All changes are version controlled and can be reverted

## Troubleshooting

### Common Issues

1. **"GitHub OAuth is not configured"**
   - Check that `GITHUB_CLIENT_ID` is set in your environment variables
   - For local development, ensure `.env.local` exists
   - For production, verify Vercel environment variables are set

2. **"Authentication failed"**
   - Check your GitHub OAuth app configuration
   - Verify environment variables are set correctly
   - Ensure callback URL matches exactly

3. **"Failed to save file"**
   - Check if you have write access to the repository
   - Verify the file hasn't been modified by someone else
   - Check GitHub API rate limits

4. **Files not loading**
   - Verify your GitHub token is valid
   - Check repository permissions
   - Ensure the repository name is correct

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your GitHub OAuth app settings
3. Check Vercel environment variables
4. Contact your technical team

## Deployment Notes

### Vercel Configuration
- The admin system works with Vercel's serverless functions
- Environment variables must be set in Vercel dashboard
- API routes are automatically handled by Vercel

### GitHub Requirements
- Repository must be accessible to users
- Users need appropriate permissions (read/write)
- OAuth app must be properly configured

## Environment Variables

### Required Variables
- `GITHUB_CLIENT_ID`: Your GitHub OAuth App client ID
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App client secret
- `GITHUB_REDIRECT_URI`: OAuth callback URL

### Local Development
Create a `.env.local` file in your project root with the required variables.

### Production
Set the variables in your Vercel dashboard under Settings > Environment Variables.

## Future Enhancements

Potential improvements for the admin system:
- **Rich Text Editor**: WYSIWYG editing with markdown preview
- **Image Upload**: Direct image upload and management
- **Bulk Operations**: Edit multiple files at once
- **Content Templates**: Pre-built templates for common content types
- **Collaboration Features**: Real-time editing with multiple users

---

**Note**: This system provides a professional, secure way for non-technical team members to contribute to your website without requiring external services or complex workflows.
