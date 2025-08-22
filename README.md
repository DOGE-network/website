# Conservative Technology Group Website

A Docusaurus-based website for the Conservative Technology Group, supporting various projects related to government transparency through collaboration and organization.

## About Conservative Technology Group

We individually are supporting various projects related to government transparency. While these are generally passion projects that we would do for free, it would be nice to get collaboration across many similar projects to help push forward. For that purpose, we have decided to start meeting in person.

Possible outcome could be to form a nonprofit organization to help with organizing and supporting projects. It would be self organizing and classified as a 501(c) for federal tax purposes.

## Website Features

- **Homepage**: Mission statement and overview of the network
- **Meetings**: YouTube video player for recorded meetings, meeting notes, and agendas
- **Schedule**: Biannual AmericaFest and CPAC gatherings, plus regular virtual meetings
- **About**: Detailed information about our mission and approach
- **Documentation**: Meeting notes, agendas, and project resources

## Technology Stack

- **Docusaurus 3**: Modern static site generator
- **React 19**: Frontend framework
- **TypeScript**: Type-safe development
- **CSS Variables**: React Native-inspired design system

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/doge-network/doge-network-website.git
cd doge-network-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file for development
cp env.example .env.local
```

Edit `.env.local` and add your API keys:
```bash
# Google Calendar API (must be prefixed with REACT_APP_ for Docusaurus)
REACT_APP_GOOGLE_CALENDAR_API_KEY=your_google_calendar_api_key_here
REACT_APP_GOOGLE_CALENDAR_ID=your_google_calendar_id_here

```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `build` directory.

### Deployment

#### GitHub Pages
```bash
npm run deploy
```

This will deploy to GitHub Pages (configured in `docusaurus.config.js`).

#### Vercel (Recommended)
For production deployment with environment variables:

1. Connect your repository to Vercel
2. In Vercel dashboard, go to Project Settings > Environment Variables
3. Add the following environment variables:
   - `REACT_APP_GOOGLE_CALENDAR_API_KEY` - Your Google Calendar API key
   - `REACT_APP_GOOGLE_CALENDAR_ID` - Your Google Calendar ID
4. Deploy automatically triggers on git push to main branch

#### Environment Variables Setup

**For Google Calendar API:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Google Calendar API for your project
3. Create an API Key with Calendar API access
4. Restrict the key to your domain for security in production

## Project Structure

```
doge-network-website/
├── src/
│   ├── components/     # React components
│   ├── css/           # Custom CSS styles
│   ├── pages/         # Page components
│   └── ...
├── docs/              # Documentation files
├── static/            # Static assets
├── docusaurus.config.js  # Main configuration
└── package.json       # Dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Contact

For questions about the Conservative Technology Group or this website, please reach out through our meetings or documentation.
