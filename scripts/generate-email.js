#!/usr/bin/env node

/**
 * DOGE Network Weekly Changelog Email Generator
 * Generates HTML and plain text email from changelog data
 */

const fs = require('fs');
const path = require('path');

// Configuration
const DATA_FILE = path.join(__dirname, '..', 'changelog-data.json');
const HTML_OUTPUT = path.join(__dirname, '..', 'changelog-email.html');
const TEXT_OUTPUT = path.join(__dirname, '..', 'changelog-email.txt');

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Format date range
function formatDateRange(sinceDate) {
    const since = new Date(sinceDate);
    const now = new Date();
    return `${formatDate(sinceDate)} - ${formatDate(now.toISOString())}`;
}

// Escape HTML
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Truncate text
function truncate(text, maxLength = 100) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
}

// Generate repository summary
function generateRepoSummary(repo) {
    const { prs, commits, stats } = repo;
    const summary = [];
    
    // Count PR types
    const mergedPRs = prs.filter(pr => pr.merged_at);
    const openPRs = prs.filter(pr => pr.state === 'open');
    const closedPRs = prs.filter(pr => pr.state === 'closed' && !pr.merged_at);
    
    // Analyze commit messages for change types
    const commitMessages = commits.map(c => c.commit.message.toLowerCase());
    const features = commitMessages.filter(m => 
        m.includes('feat') || m.includes('add') || m.includes('new') || m.includes('implement')
    ).length;
    const fixes = commitMessages.filter(m => 
        m.includes('fix') || m.includes('bug') || m.includes('resolve') || m.includes('correct')
    ).length;
    const docs = commitMessages.filter(m => 
        m.includes('doc') || m.includes('readme') || m.includes('update readme')
    ).length;
    const refactor = commitMessages.filter(m => 
        m.includes('refactor') || m.includes('clean') || m.includes('improve')
    ).length;
    
    // Build summary
    if (mergedPRs.length > 0) {
        summary.push(`${mergedPRs.length} PR${mergedPRs.length > 1 ? 's' : ''} merged`);
    }
    if (openPRs.length > 0) {
        summary.push(`${openPRs.length} open PR${openPRs.length > 1 ? 's' : ''}`);
    }
    if (stats.commits_total > 0) {
        summary.push(`${stats.commits_total} commit${stats.commits_total > 1 ? 's' : ''}`);
    }
    
    const changeTypes = [];
    if (features > 0) changeTypes.push(`${features} feature${features > 1 ? 's' : ''}`);
    if (fixes > 0) changeTypes.push(`${fixes} fix${fixes > 1 ? 'es' : ''}`);
    if (docs > 0) changeTypes.push(`${docs} doc update${docs > 1 ? 's' : ''}`);
    if (refactor > 0) changeTypes.push(`${refactor} refactor${refactor > 1 ? 's' : ''}`);
    
    if (changeTypes.length > 0) {
        summary.push(`(${changeTypes.join(', ')})`);
    }
    
    // Get unique contributors
    const contributors = new Set();
    prs.forEach(pr => contributors.add(pr.user.login));
    commits.forEach(commit => contributors.add(commit.commit.author.name));
    
    if (contributors.size > 0) {
        summary.push(`by ${contributors.size} contributor${contributors.size > 1 ? 's' : ''}`);
    }
    
    return summary.join(' --- ');
}

// Generate HTML email
function generateHtmlEmail(data) {
    let { generated_at, date_range, repositories, summary } = data;
    
    // Filter repositories with activity
    repositories = repositories.filter(repo => 
        repo.prs.length > 0 || repo.commits.length > 0
    );
    
    // Update summary to reflect only active repositories
    summary = {
        ...summary,
        total_repos: repositories.length
    };
    
    const dateRange = formatDateRange(date_range.since);
    
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DOGE Network Weekly Changelog</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #2563eb;
            margin: 0 0 10px 0;
            font-size: 28px;
        }
        .header .date-range {
            color: #666;
            font-size: 14px;
        }
        .summary {
            background-color: #f8f9fa;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 30px;
        }
        .summary h2 {
            margin-top: 0;
            color: #2563eb;
            font-size: 20px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .stat {
            text-align: center;
        }
        .stat-value {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
        }
        .stat-label {
            font-size: 12px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .repo-section {
            margin-bottom: 40px;
            border-left: 4px solid #2563eb;
            padding-left: 20px;
        }
        .repo-header {
            margin-bottom: 15px;
        }
        .repo-header h3 {
            margin: 0 0 5px 0;
            color: #2563eb;
            font-size: 22px;
        }
        .repo-header a {
            color: #2563eb;
            text-decoration: none;
        }
        .repo-header a:hover {
            text-decoration: underline;
        }
        .repo-stats {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
        }
        .pr-list, .commit-list {
            margin-top: 15px;
        }
        .pr-item, .commit-item {
            margin-bottom: 15px;
            padding: 12px;
            background-color: #f8f9fa;
            border-radius: 4px;
        }
        .pr-title, .commit-message {
            font-weight: 600;
            margin-bottom: 5px;
        }
        .pr-title a, .commit-message a {
            color: #2563eb;
            text-decoration: none;
        }
        .pr-title a:hover, .commit-message a:hover {
            text-decoration: underline;
        }
        .pr-meta, .commit-meta {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }
        .pr-state {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
            text-transform: uppercase;
            margin-right: 8px;
        }
        .pr-state.merged {
            background-color: #9333ea;
            color: white;
        }
        .pr-state.open {
            background-color: #10b981;
            color: white;
        }
        .pr-state.closed {
            background-color: #6b7280;
            color: white;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .footer a {
            color: #2563eb;
            text-decoration: none;
        }
        .no-activity {
            color: #999;
            font-style: italic;
            padding: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐕 DOGE Network Weekly Changelog</h1>
            <div class="date-range">${dateRange}</div>
        </div>
        
        <div class="summary">
            <h2>Summary</h2>
            <div class="stats">
                <div class="stat">
                    <div class="stat-value">${summary.total_repos}</div>
                    <div class="stat-label">Repositories</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${summary.total_prs_merged}</div>
                    <div class="stat-label">PRs Merged</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${summary.total_prs_open}</div>
                    <div class="stat-label">PRs Open</div>
                </div>
                <div class="stat">
                    <div class="stat-value">${summary.total_commits}</div>
                    <div class="stat-label">Commits</div>
                </div>
            </div>
        </div>`;

    // Add repository sections (already filtered)
    repositories.forEach(repo => {
        const { name, full_name, prs, commits, stats } = repo;
        // Use full_name if available (for additional repos), otherwise construct from name
        const repoPath = full_name || `DOGE-network/${name}`;
        const repoUrl = `https://github.com/${repoPath}`;
        const summary = generateRepoSummary(repo);
        
        html += `
        <div class="repo-section">
            <div class="repo-header">
                <h3><a href="${repoUrl}">${escapeHtml(name)}</a></h3>
                <div class="repo-stats">
                    ${escapeHtml(summary)}
                </div>
            </div>`;

        // Add GitHub PRs link instead of listing PRs
        if (prs.length > 0) {
            let prsUrl = `${repoUrl}/pulls`;
            // Add query parameters for date filtering
            const queryParams = [];
            if (date_range.since) {
                const sinceDate = date_range.since.split('T')[0];
                queryParams.push(`q=is:pr+updated:>=${sinceDate}`);
                if (date_range.until) {
                    const untilDate = date_range.until.split('T')[0];
                    queryParams[0] += `+updated:<=${untilDate}`;
                }
            }
            if (queryParams.length > 0) {
                prsUrl += `?${queryParams.join('&')}`;
            }
            
            const mergedCount = prs.filter(pr => pr.merged_at).length;
            const openCount = prs.filter(pr => pr.state === 'open').length;
            const closedCount = prs.filter(pr => pr.state === 'closed' && !pr.merged_at).length;
            
            let prSummary = [];
            if (mergedCount > 0) prSummary.push(`${mergedCount} merged`);
            if (openCount > 0) prSummary.push(`${openCount} open`);
            if (closedCount > 0) prSummary.push(`${closedCount} closed`);
            
            html += `
            <div style="margin-top: 15px;">
                <a href="${prsUrl}" style="color: #2563eb; text-decoration: none; font-weight: 600;">
                    View ${prs.length} PR${prs.length > 1 ? 's' : ''} on GitHub ${prSummary.length > 0 ? `(${prSummary.join(', ')})` : ''} →
                </a>
            </div>`;
        }

        // Add GitHub commits link instead of listing commits
        if (commits.length > 0) {
            let commitsUrl = `${repoUrl}/commits`;
            if (date_range.since) {
                const sinceDate = date_range.since.split('T')[0]; // Get YYYY-MM-DD format
                commitsUrl += `?since=${sinceDate}`;
                if (date_range.until) {
                    const untilDate = date_range.until.split('T')[0];
                    commitsUrl += `&until=${untilDate}`;
                }
            }
            html += `
            <div style="margin-top: 15px;">
                <a href="${commitsUrl}" style="color: #2563eb; text-decoration: none; font-weight: 600;">
                    View ${commits.length} commit${commits.length > 1 ? 's' : ''} on GitHub →
                </a>
            </div>`;
        }

        html += '</div>';
    });

    html += `
        <div class="footer">
            <p>
                <a href="https://github.com/DOGE-network">View all repositories on GitHub</a> • 
                <a href="https://dogenetwork.org">Visit DOGE Network</a>
            </p>
            <p style="margin-top: 10px;">
                Generated on ${formatDate(generated_at)}
            </p>
        </div>
    </div>
</body>
</html>`;

    return html;
}

// Generate plain text email
function generateTextEmail(data) {
    let { generated_at, date_range, repositories, summary } = data;
    
    // Filter repositories with activity
    repositories = repositories.filter(repo => 
        repo.prs.length > 0 || repo.commits.length > 0
    );
    
    // Update summary to reflect only active repositories
    summary = {
        ...summary,
        total_repos: repositories.length
    };
    const dateRange = formatDateRange(date_range.since);
    
    let text = `DOGE Network Weekly Changelog
${dateRange}
${'='.repeat(50)}

SUMMARY
${'-'.repeat(50)}
Repositories: ${summary.total_repos}
PRs Merged: ${summary.total_prs_merged}
PRs Open: ${summary.total_prs_open}
Total Commits: ${summary.total_commits}

${'='.repeat(50)}

`;

    // Add repository sections (already filtered)
    repositories.forEach(repo => {
        const { name, full_name, prs, commits, stats } = repo;
        // Use full_name if available (for additional repos), otherwise construct from name
        const repoPath = full_name || `DOGE-network/${name}`;
        const repoUrl = `https://github.com/${repoPath}`;
        const summary = generateRepoSummary(repo);
        
        text += `\n${name.toUpperCase()}\n`;
        text += `${repoUrl}\n`;
        text += `${'-'.repeat(50)}\n`;
        text += `${summary}\n\n`;

        // Add GitHub PRs link instead of listing PRs
        if (prs.length > 0) {
            let prsUrl = `${repoUrl}/pulls`;
            // Add query parameters for date filtering
            const queryParams = [];
            if (date_range.since) {
                const sinceDate = date_range.since.split('T')[0];
                queryParams.push(`q=is:pr+updated:>=${sinceDate}`);
                if (date_range.until) {
                    const untilDate = date_range.until.split('T')[0];
                    queryParams[0] += `+updated:<=${untilDate}`;
                }
            }
            if (queryParams.length > 0) {
                prsUrl += `?${queryParams.join('&')}`;
            }
            
            const mergedCount = prs.filter(pr => pr.merged_at).length;
            const openCount = prs.filter(pr => pr.state === 'open').length;
            const closedCount = prs.filter(pr => pr.state === 'closed' && !pr.merged_at).length;
            
            let prSummary = [];
            if (mergedCount > 0) prSummary.push(`${mergedCount} merged`);
            if (openCount > 0) prSummary.push(`${openCount} open`);
            if (closedCount > 0) prSummary.push(`${closedCount} closed`);
            
            text += `View ${prs.length} PR${prs.length > 1 ? 's' : ''} on GitHub ${prSummary.length > 0 ? `(${prSummary.join(', ')})` : ''}: ${prsUrl}\n\n`;
        }

        // Add GitHub commits link instead of listing commits
        if (commits.length > 0) {
            let commitsUrl = `${repoUrl}/commits`;
            if (date_range.since) {
                const sinceDate = date_range.since.split('T')[0]; // Get YYYY-MM-DD format
                commitsUrl += `?since=${sinceDate}`;
                if (date_range.until) {
                    const untilDate = date_range.until.split('T')[0];
                    commitsUrl += `&until=${untilDate}`;
                }
            }
            text += `View ${commits.length} commit${commits.length > 1 ? 's' : ''} on GitHub: ${commitsUrl}\n\n`;
        }

        text += '\n';
    });

    text += `${'='.repeat(50)}\n`;
    text += `View all repositories: https://github.com/DOGE-network\n`;
    text += `Visit DOGE Network: https://dogenetwork.org\n`;
    text += `Generated on ${formatDate(generated_at)}\n`;

    return text;
}

// Main execution
try {
    // Read data file
    if (!fs.existsSync(DATA_FILE)) {
        console.error(`Error: Data file not found: ${DATA_FILE}`);
        console.error('Please run generate-changelog.sh first to generate the data file.');
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    // Generate emails (repositories are filtered inside the functions)
    const htmlEmail = generateHtmlEmail(data);
    const textEmail = generateTextEmail(data);

    // Write output files
    fs.writeFileSync(HTML_OUTPUT, htmlEmail);
    fs.writeFileSync(TEXT_OUTPUT, textEmail);

    console.log('✅ Email generated successfully!');
    console.log(`   HTML: ${HTML_OUTPUT}`);
    console.log(`   Text: ${TEXT_OUTPUT}`);
    console.log(`\nSummary:`);
    console.log(`   Repositories: ${data.summary.total_repos}`);
    console.log(`   PRs Merged: ${data.summary.total_prs_merged}`);
    console.log(`   PRs Open: ${data.summary.total_prs_open}`);
    console.log(`   Total Commits: ${data.summary.total_commits}`);
} catch (error) {
    console.error('Error generating email:', error.message);
    process.exit(1);
}

