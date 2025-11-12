#!/bin/bash

# Open email client with changelog email pre-filled
# Works on macOS and Linux

set -e

# Configuration
EMAIL_TO="community@dogenetwork.org"
EMAIL_SUBJECT="Weekly Changelog of Activity"
HTML_FILE="changelog-email.html"
TEXT_FILE="changelog-email.txt"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

HTML_PATH="$PROJECT_ROOT/$HTML_FILE"
TEXT_PATH="$PROJECT_ROOT/$TEXT_FILE"

# Check if email files exist
if [ ! -f "$HTML_PATH" ]; then
    echo "Error: $HTML_FILE not found"
    echo "Please run 'npm run changelog:generate' first to generate the email."
    exit 1
fi

# Detect OS and open email client
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS - Use AppleScript to open Mail.app with plain text content
    echo "Opening Mail.app with changelog email..."
    
    # Copy plain text content to clipboard (more reliable than HTML)
    pbcopy < "$TEXT_PATH"
    
    # Open Mail.app and set content using AppleScript
    osascript <<EOF
tell application "Mail"
    activate
    set newMessage to make new outgoing message with properties {subject:"$EMAIL_SUBJECT", visible:true}
    tell newMessage
        make new to recipient at end of to recipients with properties {address:"$EMAIL_TO"}
        -- Read text file and set as content (plain text works better)
        set textFile to POSIX file "$TEXT_PATH"
        set textContent to (read textFile)
        set content to textContent
    end tell
end tell

-- Content is already set via 'set content' above
-- Only paste from clipboard if content didn't set properly
-- But first, ensure we're NOT in BCC field
delay 0.5
tell application "System Events"
    tell process "Mail"
        set frontmost to true
        delay 0.2
        -- Navigate directly to message body, skipping BCC
        -- Tab order: To -> Cc -> Bcc -> Subject -> Body
        -- We need to get to body, so tab from To: 4 times (Cc, Bcc, Subject, Body)
        -- But since Subject is already filled, we can click directly in body
        try
            -- Click in the message body area (more reliable than tabbing)
            -- Use keyboard shortcut to focus message body: Cmd+Option+B or just click
            -- Actually, let's just ensure content was set and skip the paste
            -- The 'set content' above should have worked
        end try
    end tell
end tell
EOF
    
    echo "✅ Mail.app opened with email pre-filled"
    echo "   To: $EMAIL_TO"
    echo "   Subject: $EMAIL_SUBJECT"
    echo "   Body: Content set via AppleScript"
    echo ""
    echo "   If the body appears empty, the content is in your clipboard"
    echo "   Click in the message body and press Cmd+V to paste"
    
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux - Try various email clients
    if command -v xdg-email &> /dev/null; then
        # Use xdg-email with mailto: (plain text only)
        TEXT_CONTENT=$(cat "$TEXT_PATH" | head -100) # Limit length for mailto:
        TEXT_ENCODED=$(echo "$TEXT_CONTENT" | sed 's/&/%26/g' | sed 's/=/%3D/g' | sed 's/+/%2B/g' | sed 's/ /%20/g' | tr '\n' '%0A')
        
        xdg-email "mailto:$EMAIL_TO?subject=$EMAIL_SUBJECT&body=$TEXT_ENCODED"
        echo "✅ Email client opened"
    elif command -v thunderbird &> /dev/null; then
        # Use Thunderbird compose
        thunderbird -compose "to=$EMAIL_TO,subject=$EMAIL_SUBJECT,body=$(cat $TEXT_PATH | head -100)"
        echo "✅ Thunderbird opened"
    elif command -v evolution &> /dev/null; then
        # Use Evolution
        evolution "mailto:$EMAIL_TO?subject=$EMAIL_SUBJECT"
        echo "✅ Evolution opened"
    else
        echo "Error: No email client found"
        echo "Please install xdg-email, Thunderbird, or Evolution"
        echo ""
        echo "Alternatively, you can manually:"
        echo "  1. Open your email client"
        echo "  2. Create a new email to: $EMAIL_TO"
        echo "  3. Subject: $EMAIL_SUBJECT"
        echo "  4. Copy content from: $HTML_PATH"
        exit 1
    fi
else
    echo "Unsupported OS: $OSTYPE"
    echo ""
    echo "Please manually:"
    echo "  1. Open your email client"
    echo "  2. Create a new email to: $EMAIL_TO"
    echo "  3. Subject: $EMAIL_SUBJECT"
    echo "  4. Copy content from: $HTML_PATH"
    exit 1
fi

