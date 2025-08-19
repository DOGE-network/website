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

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `build` directory.

### Deployment

```bash
npm run deploy
```

This will deploy to GitHub Pages (configured in `docusaurus.config.js`).

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
