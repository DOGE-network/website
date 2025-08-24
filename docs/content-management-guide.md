---
sidebar_position: 3
---

# Content Management Guide

## Overview

This website uses Docusaurus, which has a specific architecture for content management:

- **`docs/` directory**: Contains markdown files that automatically become documentation pages
- **`src/pages/` directory**: Contains custom React functionality (redirects, special features)

## How It Works

### 1. Content Storage
- Meeting content is stored in `docs/meetings.md` (becomes `/docs/meetings` page)
- Schedule information is in `docs/schedule.md` (becomes `/docs/schedule` page)
- Documentation is in various markdown files under `docs/`

### 2. Content Display
- Docusaurus automatically generates pages from markdown files in `docs/`
- `/meetings` redirects to `/docs/meetings` (actual content)
- `/schedule` redirects to `/docs/schedule` (actual content)
- React components in `src/pages/` handle only custom functionality

### 3. Content Editing
- Non-technical users can edit content through the admin interface at `/admin`
- The admin system provides direct links to GitHub for editing markdown files
- Changes to markdown files automatically update the website content

## Avoiding Content Duplication

### ❌ Don't Do This (What Happened During JS→TS Conversion)
```tsx
// BAD: Hardcoding content in src/pages/ (violates Docusaurus conventions)
export default function Meetings() {
  return (
    <div>
      <h1>DOGE Network Kickoff Meeting</h1>
      <p>Our inaugural meeting discussing...</p>
      <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" />
    </div>
  );
}
```

### ✅ Do This Instead (Following Docusaurus Conventions)
```tsx
// GOOD: src/pages/ contains only custom functionality
export default function Meetings() {
  const history = useHistory();
  
  useEffect(() => {
    // Redirect to the proper docs page
    history.replace('/docs/meetings');
  }, [history]);
  
  return <div>Redirecting to meetings documentation...</div>;
}
```

## Best Practices

### 1. Follow Docusaurus Directory Structure

- **`docs/`**: Store all documentation content as markdown files
- **`src/pages/`**: Store only custom React functionality, never documentation content
- **Never duplicate content** between these directories

### 2. Content Updates
- Always edit content in markdown files in `docs/`, not in React components
- Use the admin interface at `/admin` for content management
- React components should provide functionality, not store content

### 3. During Code Conversions
- When converting from JS to TS (or any other conversion):
  - Keep content in `docs/` markdown files
  - Keep `src/pages/` focused on custom functionality only
  - Never move content from markdown files into React components
  - Maintain Docusaurus architecture conventions

## File Structure

```
docs/                           # Documentation content
├── meetings.md                 # Becomes /docs/meetings page
├── schedule.md                 # Becomes /docs/schedule page
└── meetings/                   # Detailed meeting notes

src/pages/                      # Custom React functionality only
├── meetings.tsx                # Redirects to /docs/meetings
├── schedule.tsx                # Redirects to /docs/schedule
└── index.tsx                   # Homepage (custom functionality)

static/admin/                    # Admin interface for content editing
└── index.html                  # Admin interface for content editing
```

## URL Structure

- **`/meetings`** → Redirects to `/docs/meetings` (actual content)
- **`/schedule`** → Redirects to `/docs/schedule` (actual content)
- **`/docs/meetings`** → Shows content from `docs/meetings.md`
- **`/docs/schedule`** → Shows content from `docs/schedule.md`

## Troubleshooting

### Content Not Updating
1. Check that you're editing the correct markdown file in `docs/`
2. Verify changes are committed and deployed
3. Clear browser cache if needed

### Duplicate Content
1. Remove hardcoded content from React components in `src/pages/`
2. Ensure all content is in markdown files in `docs/`
3. Use the admin interface to edit content

## Need Help?

If you encounter issues with content management:
1. Check this guide first
2. Verify you're editing files in the `docs/` directory
3. Use Contact information to ask for help
