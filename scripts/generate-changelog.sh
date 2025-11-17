#!/bin/bash

# DOGE Network Weekly Changelog Generator
# Fetches PRs and commits from the last 1 week across all DOGE Network repositories

set -e

# Configuration
ORG="DOGE-network"
DAYS_BACK=7
OUTPUT_FILE="changelog-data.json"
GITHUB_API="https://api.github.com"

# Parse command line arguments for date range
MONTH=""
YEAR=""
while [[ $# -gt 0 ]]; do
    case $1 in
        --month)
            MONTH="$2"
            shift 2
            ;;
        --year)
            YEAR="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--month MONTH] [--year YEAR]"
            echo "  --month: Month number (1-12), optional"
            echo "  --year: Year (e.g., 2025), optional"
            echo "  If both month and year are provided, fetches data for that month"
            echo "  Otherwise, defaults to last 7 days"
            exit 1
            ;;
    esac
done

# Additional repositories to include (format: "org/repo" or "user/repo")
# Add repositories from other organizations or user accounts here
ADDITIONAL_REPOS=(
    "DOGE-network/dMedia-website"
)

# Load GitHub token from .env.local file
# Token should be set as: GITHUB_TOKEN_changelog_email_generation=your_token_here
# Get the directory where the script is located, then go to project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env.local"

if [ -f "$ENV_FILE" ]; then
    # Source the .env.local file to load variables
    set -a
    source "$ENV_FILE"
    set +a
fi

# Use the specific token name from .env.local, fallback to GITHUB_TOKEN
if [ -n "$GITHUB_TOKEN_changelog_email_generation" ]; then
    GITHUB_TOKEN="$GITHUB_TOKEN_changelog_email_generation"
elif [ -z "$GITHUB_TOKEN" ]; then
    # Token not set, will use unauthenticated requests
    GITHUB_TOKEN=""
fi


# Check for jq
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed"
    echo "Install with: brew install jq (macOS) or apt-get install jq (Linux)"
    exit 1
fi

# Calculate date range
if [ -n "$MONTH" ] && [ -n "$YEAR" ]; then
    # Use specific month/year
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS - first day of month
        SINCE_DATE=$(date -j -f "%Y-%m-%d" "${YEAR}-${MONTH}-01" -u +"%Y-%m-%dT00:00:00Z" 2>/dev/null || date -v${YEAR}y -v${MONTH}m -v1d -u +"%Y-%m-%dT00:00:00Z")
        # Last day of month
        if [ "$MONTH" -eq 12 ]; then
            UNTIL_YEAR=$((YEAR + 1))
            UNTIL_MONTH=1
        else
            UNTIL_YEAR=$YEAR
            UNTIL_MONTH=$((MONTH + 1))
        fi
        UNTIL_DATE=$(date -j -f "%Y-%m-%d" "${UNTIL_YEAR}-${UNTIL_MONTH}-01" -u +"%Y-%m-%dT00:00:00Z" 2>/dev/null || date -v${UNTIL_YEAR}y -v${UNTIL_MONTH}m -v1d -u +"%Y-%m-%dT00:00:00Z")
    else
        # Linux - first day of month
        SINCE_DATE=$(date -d "${YEAR}-${MONTH}-01" -u +"%Y-%m-%dT00:00:00Z")
        # Last day of month (first day of next month)
        if [ "$MONTH" -eq 12 ]; then
            UNTIL_YEAR=$((YEAR + 1))
            UNTIL_MONTH=1
        else
            UNTIL_YEAR=$YEAR
            UNTIL_MONTH=$((MONTH + 1))
        fi
        UNTIL_DATE=$(date -d "${UNTIL_YEAR}-${UNTIL_MONTH}-01" -u +"%Y-%m-%dT00:00:00Z")
    fi
    DATE_RANGE_DESC="${YEAR}-$(printf "%02d" $MONTH)"
else
    # Default: last 7 days
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        SINCE_DATE=$(date -v-${DAYS_BACK}d -u +"%Y-%m-%dT%H:%M:%SZ")
    else
        # Linux
        SINCE_DATE=$(date -d "${DAYS_BACK} days ago" -u +"%Y-%m-%dT%H:%M:%SZ")
    fi
    UNTIL_DATE=""
    DATE_RANGE_DESC="last ${DAYS_BACK} days"
fi

echo "Fetching changelog data for: $DATE_RANGE_DESC"
echo "Date range: $SINCE_DATE"
if [ -n "$UNTIL_DATE" ]; then
    echo "Until: $UNTIL_DATE"
fi
echo "Organization: $ORG"
if [ -n "$GITHUB_TOKEN" ]; then
    echo "Using GitHub token (rate limit: 5,000 requests/hour)"
else
    echo "No GitHub token set (rate limit: 60 requests/hour)"
fi
echo ""

# Function to fetch repositories
fetch_repos() {
    local page=1
    local repos=()
    
    while true; do
        if [ -n "$GITHUB_TOKEN" ]; then
            local response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
                "$GITHUB_API/orgs/$ORG/repos?page=$page&per_page=100")
        else
            local response=$(curl -s \
                "$GITHUB_API/orgs/$ORG/repos?page=$page&per_page=100")
        fi
        
        local repo_count=$(echo "$response" | jq '. | length')
        
        if [ "$repo_count" -eq 0 ]; then
            break
        fi
        
        local repo_names=$(echo "$response" | jq -r '.[].name')
        while IFS= read -r repo; do
            repos+=("$repo")
        done <<< "$repo_names"
        
        # Check if there are more pages
        if [ "$repo_count" -lt 100 ]; then
            break
        fi
        
        page=$((page + 1))
    done
    
    printf '%s\n' "${repos[@]}"
}

# Function to fetch PRs for a repository
fetch_prs() {
    local repo_path=$1
    local page=1
    local all_prs="[]"
    
    # Handle both "repo" (from org) and "org/repo" (additional repos) formats
    if [[ "$repo_path" == *"/"* ]]; then
        local full_repo="$repo_path"
    else
        local full_repo="$ORG/$repo_path"
    fi
    
    while true; do
        if [ -n "$GITHUB_TOKEN" ]; then
            local response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
                "$GITHUB_API/repos/$full_repo/pulls?state=all&page=$page&per_page=100&sort=updated&direction=desc")
        else
            local response=$(curl -s \
                "$GITHUB_API/repos/$full_repo/pulls?state=all&page=$page&per_page=100&sort=updated&direction=desc")
        fi
        
        # Check if response is an error (not an array)
        if ! echo "$response" | jq -e '. | type == "array"' > /dev/null 2>&1; then
            # If it's an error message, log and return empty array
            local error_msg=$(echo "$response" | jq -r '.message // "Unknown error"' 2>/dev/null || echo "Invalid response")
            if [ "$error_msg" != "null" ] && [ "$error_msg" != "Unknown error" ]; then
                echo "  Warning: Error fetching PRs for $full_repo: $error_msg" >&2
            fi
            break
        fi
        
        local pr_count=$(echo "$response" | jq '. | length')
        
        if [ "$pr_count" -eq 0 ]; then
            break
        fi
        
        # Filter PRs by date range
        local filter_expr='.[] | select(.updated_at >= $since)'
        if [ -n "$UNTIL_DATE" ]; then
            filter_expr=".[] | select(.updated_at >= \$since and .updated_at < \$until)"
            local recent_prs=$(echo "$response" | jq --arg since "$SINCE_DATE" --arg until "$UNTIL_DATE" \
                "[$filter_expr]")
        else
            local recent_prs=$(echo "$response" | jq --arg since "$SINCE_DATE" \
                "[$filter_expr]")
        fi
        
        if [ "$(echo "$recent_prs" | jq '. | length')" -gt 0 ]; then
            # Use temporary file to avoid "Argument list too long" error
            local temp_file=$(mktemp)
            echo "$all_prs" > "$temp_file"
            echo "$recent_prs" > "${temp_file}.new"
            all_prs=$(jq -s 'add' "$temp_file" "${temp_file}.new")
            rm -f "$temp_file" "${temp_file}.new"
        fi
        
        # Check if we've gone past the date range
        local oldest_date=$(echo "$response" | jq -r '.[-1].updated_at // empty')
        if [ -n "$oldest_date" ] && [ "$oldest_date" \< "$SINCE_DATE" ]; then
            break
        fi
        
        if [ "$pr_count" -lt 100 ]; then
            break
        fi
        
        page=$((page + 1))
    done
    
    echo "$all_prs"
}

# Function to fetch commits for a repository
fetch_commits() {
    local repo_path=$1
    local page=1
    local all_commits="[]"
    
    # Handle both "repo" (from org) and "org/repo" (additional repos) formats
    if [[ "$repo_path" == *"/"* ]]; then
        local full_repo="$repo_path"
    else
        local full_repo="$ORG/$repo_path"
    fi
    
    while true; do
        local api_url="$GITHUB_API/repos/$full_repo/commits?since=$SINCE_DATE&page=$page&per_page=100"
        if [ -n "$UNTIL_DATE" ]; then
            # GitHub API doesn't support until parameter directly, but we'll filter in jq
            api_url="$GITHUB_API/repos/$full_repo/commits?since=$SINCE_DATE&page=$page&per_page=100"
        fi
        
        if [ -n "$GITHUB_TOKEN" ]; then
            local response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "$api_url")
        else
            local response=$(curl -s "$api_url")
        fi
        
        # Check if response is an error (not an array)
        if ! echo "$response" | jq -e '. | type == "array"' > /dev/null 2>&1; then
            # If it's an error message, log and return empty array
            local error_msg=$(echo "$response" | jq -r '.message // "Unknown error"' 2>/dev/null || echo "Invalid response")
            if [ "$error_msg" != "null" ] && [ "$error_msg" != "Unknown error" ]; then
                echo "  Warning: Error fetching commits for $full_repo: $error_msg" >&2
            fi
            break
        fi
        
        local commit_count=$(echo "$response" | jq '. | length')
        
        if [ "$commit_count" -eq 0 ]; then
            break
        fi
        
        # Filter commits by date range if UNTIL_DATE is set
        if [ -n "$UNTIL_DATE" ]; then
            local filtered_commits=$(echo "$response" | jq --arg since "$SINCE_DATE" --arg until "$UNTIL_DATE" \
                '[.[] | select(.commit.author.date >= $since and .commit.author.date < $until)]')
            local response="$filtered_commits"
            commit_count=$(echo "$response" | jq '. | length')
            if [ "$commit_count" -eq 0 ]; then
                # Check if we've gone past the date range
                local oldest_date=$(echo "$response" | jq -r '.[-1].commit.author.date // empty' 2>/dev/null || echo "")
                if [ -z "$oldest_date" ] || [ "$oldest_date" \< "$SINCE_DATE" ]; then
                    break
                fi
                page=$((page + 1))
                continue
            fi
        fi
        
        # Use temporary file to avoid "Argument list too long" error
        local temp_file=$(mktemp)
        echo "$all_commits" > "$temp_file"
        echo "$response" > "${temp_file}.new"
        all_commits=$(jq -s 'add' "$temp_file" "${temp_file}.new")
        rm -f "$temp_file" "${temp_file}.new"
        
        if [ "$commit_count" -lt 100 ]; then
            break
        fi
        
        page=$((page + 1))
    done
    
    echo "$all_commits"
}

# Main execution
echo "Fetching repositories..."
REPOS=($(fetch_repos))
echo "Found ${#REPOS[@]} repositories from $ORG organization"

# Add additional repositories
if [ ${#ADDITIONAL_REPOS[@]} -gt 0 ]; then
    echo "Adding ${#ADDITIONAL_REPOS[@]} additional repositories..."
    for additional_repo in "${ADDITIONAL_REPOS[@]}"; do
        # Extract repo name for display
        repo_name="${additional_repo##*/}"
        # Check if already in list (avoid duplicates)
        if [[ ! " ${REPOS[@]} " =~ " ${repo_name} " ]] && [[ ! " ${REPOS[@]} " =~ " ${additional_repo} " ]]; then
            REPOS+=("$additional_repo")
        fi
    done
fi

echo "Total repositories to process: ${#REPOS[@]}"
echo ""

# Initialize output structure
if [ -n "$UNTIL_DATE" ]; then
    OUTPUT=$(jq -n '{
        generated_at: now | strftime("%Y-%m-%dT%H:%M:%SZ"),
        date_range: {
            since: $since,
            until: $until,
            description: $desc
        },
        repositories: []
    }' --arg since "$SINCE_DATE" --arg until "$UNTIL_DATE" --arg desc "$DATE_RANGE_DESC")
else
    OUTPUT=$(jq -n '{
        generated_at: now | strftime("%Y-%m-%dT%H:%M:%SZ"),
        date_range: {
            since: $since,
            days: $days,
            description: $desc
        },
        repositories: []
    }' --arg since "$SINCE_DATE" --argjson days "$DAYS_BACK" --arg desc "$DATE_RANGE_DESC")
fi

# Process each repository
for repo in "${REPOS[@]}"; do
    # Determine display name (use repo name if org/repo format)
    if [[ "$repo" == *"/"* ]]; then
        repo_display="${repo##*/}"
        repo_full="$repo"
    else
        repo_display="$repo"
        repo_full="$ORG/$repo"
    fi
    
    echo "Processing repository: $repo_display ($repo_full)"
    
    # Fetch PRs
    echo "  Fetching PRs..."
    prs=$(fetch_prs "$repo")
    pr_count=$(echo "$prs" | jq '. | length')
    echo "  Found $pr_count PRs"
    
    # Fetch commits
    echo "  Fetching commits..."
    commits=$(fetch_commits "$repo")
    commit_count=$(echo "$commits" | jq '. | length')
    echo "  Found $commit_count commits"
    
    # Add to output (use temporary files to avoid "Argument list too long" error)
    temp_prs=$(mktemp)
    temp_commits=$(mktemp)
    temp_repo_data=$(mktemp)
    echo "$prs" > "$temp_prs"
    echo "$commits" > "$temp_commits"
    
    # Build repo_data using temp files to avoid command-line argument limits
    jq -n \
        --arg repo "$repo_full" \
        --arg repo_display "$repo_display" \
        --slurpfile prs_file "$temp_prs" \
        --slurpfile commits_file "$temp_commits" \
        '{
            name: $repo_display,
            full_name: $repo,
            prs: $prs_file[0],
            commits: $commits_file[0],
            stats: {
                prs_total: ($prs_file[0] | length),
                prs_merged: ($prs_file[0] | map(select(.merged_at != null)) | length),
                prs_open: ($prs_file[0] | map(select(.state == "open")) | length),
                commits_total: ($commits_file[0] | length)
            }
        }' > "$temp_repo_data"
    
    # Add repo_data to OUTPUT using temp file instead of --argjson
    temp_output=$(mktemp)
    echo "$OUTPUT" > "$temp_output"
    OUTPUT=$(jq --slurpfile repo_data_file "$temp_repo_data" '.repositories += $repo_data_file' "$temp_output")
    
    rm -f "$temp_prs" "$temp_commits" "$temp_repo_data" "$temp_output"
    
    echo ""
done

# Calculate summary statistics
SUMMARY=$(echo "$OUTPUT" | jq '{
    total_repos: (.repositories | length),
    total_prs: [.repositories[].stats.prs_total] | add,
    total_prs_merged: [.repositories[].stats.prs_merged] | add,
    total_prs_open: [.repositories[].stats.prs_open] | add,
    total_commits: [.repositories[].stats.commits_total] | add,
    most_active_repos: [.repositories[] | {name: .name, activity: (.stats.prs_total + .stats.commits_total)}] | sort_by(.activity) | reverse | .[0:5]
}')

OUTPUT=$(echo "$OUTPUT" | jq --argjson summary "$SUMMARY" '. + {summary: $summary}')

# Write output
echo "$OUTPUT" | jq '.' > "$OUTPUT_FILE"
echo ""
echo "Changelog data written to: $OUTPUT_FILE"
echo ""
echo "Summary:"
echo "$SUMMARY" | jq '.'

