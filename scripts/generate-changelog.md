# Changelog Generation Scripts

Scripts for generating weekly changelog emails from DOGE Network repositories.

## Prerequisites

1. **GitHub Token** (Optional but recommended):
   - For higher rate limits: 5,000 requests/hour (vs 60/hour without token)
   - Create a personal access token at https://github.com/settings/tokens
   - Required scopes: `public_repo` (or `repo` for private repos)
   - Add to `.env.local` file in the project root:
     ```
     GITHUB_TOKEN_changelog_email_generation=your_token_here
     ```
   - The script automatically loads from `.env.local`
   - Alternatively, set as environment variable: `export GITHUB_TOKEN=your_token_here`

2. **jq**: JSON processor for bash script
   - macOS: `brew install jq`
   - Linux: `apt-get install jq` or `yum install jq`

3. **Node.js**: Already required for this project (v18+)

## Usage

### Quick Start

Generate both data and email in one command (default: last 14 days):

```bash
npm run changelog:generate
```

### Date Range Options

**Default (last 14 days):**
```bash
npm run changelog:fetch
```

**Specific month/year:**
```bash
./scripts/generate-changelog.sh --month 11 --year 2025
```

This will fetch all PRs and commits from November 2025.

### Step by Step

1. **Fetch changelog data from GitHub**:
   ```bash
   npm run changelog:fetch
   # or directly:
   ./scripts/generate-changelog.sh
   # or for a specific month:
   ./scripts/generate-changelog.sh --month 11 --year 2025
   ```

2. **Generate email from data**:
   ```bash
   npm run changelog:email
   # or directly:
   node scripts/generate-email.js
   ```

3. **Open email client with pre-filled email** (macOS/Linux):
   ```bash
   npm run changelog:open
   # or directly:
   ./scripts/open-email-client.sh
   ```

4. **Generate and open email in one command**:
   ```bash
   npm run changelog:send
   ```

## Output Files

- `changelog-data.json` - Raw data from GitHub API (JSON format)
- `changelog-email.html` - HTML email template
- `changelog-email.txt` - Plain text email version

## Configuration

### Time Range

By default, the script fetches data from the last 14 days (2 weeks). To change this, edit `DAYS_BACK` in `generate-changelog.sh`:

```bash
DAYS_BACK=14  # Change this value
```

### Repositories

The script automatically discovers all repositories in the `DOGE-network` organization. No manual configuration needed.

## Email Content

The generated email includes:

- **Summary Statistics**: Total repos, PRs merged, PRs open, commits
- **Per-Repository Sections**: 
  - Pull Requests (merged and open)
  - Recent commits (top 10 per repo)
- **Links**: Direct links to PRs, commits, and repositories

## Automation (Future)

To automate weekly emails:

1. Set up GitHub Actions workflow (`.github/workflows/weekly-changelog.yml`)
2. Configure email service (SMTP, SendGrid, etc.)
3. Schedule weekly runs (e.g., every Monday)
4. Set up mailing list management

See `docs/changelog-email-plan.md` for detailed automation plan.

## Troubleshooting

### "jq is required but not installed"
- Install jq using your package manager (see Prerequisites)

### GitHub Token
- The script works without a token but has lower rate limits (60/hour)
- With a token: 5,000 requests/hour
- Add to `.env.local` file: `GITHUB_TOKEN_changelog_email_generation=your_token_here`
- Or set as environment variable: `export GITHUB_TOKEN=your_token_here`
- Get a token from: https://github.com/settings/tokens

### "Data file not found"
- Run `npm run changelog:fetch` first to generate the data file

### Rate Limiting
- Without token: 60 requests/hour (may be insufficient for many repos)
- With token: 5,000 requests/hour (recommended)
- If you hit limits, the script will fail gracefully

## Examples

### Generate changelog for a specific month

```bash
./scripts/generate-changelog.sh --month 11 --year 2025
```

### Generate changelog for last week only

Edit `generate-changelog.sh`:
```bash
DAYS_BACK=7
```

Or use command line arguments (future enhancement):
```bash
./scripts/generate-changelog.sh --days 7
```

### Preview HTML email

Open `changelog-email.html` in your browser after generation.

### Open email client with pre-filled email

After generating the email, you can open your default email client with the changelog pre-filled:

```bash
npm run changelog:open
```

**macOS**: Opens Mail.app with:
- To: `community@dogenetwork.org`
- Subject: `Weekly Changelog of Activity`
- Body: HTML email content

**Linux**: Opens default email client (xdg-email, Thunderbird, or Evolution)

**Note**: On macOS, Mail.app should automatically detect HTML format. You can review and send the email directly.

### Send email manually

Use the generated HTML/text files with your email client or service:
- Gmail: Copy HTML content
- Mailchimp: Import HTML
- SendGrid: Use HTML template
- SMTP: Use HTML as email body

