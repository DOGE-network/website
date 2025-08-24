import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Conservative Technology Group',
  tagline: 'Collaborating on commmon projects',
  trailingSlash: false,
  favicon: 'img/favicon.ico',

  // Pass environment variables to client-side
  customFields: {
    googleCalendarApiKey: process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY,
    googleCalendarId: process.env.REACT_APP_GOOGLE_CALENDAR_ID,
  },

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://dogenetwork.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'doge-network', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/doge-network/website/tree/master',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
      // Replace with your project's social card
      image: 'img/doge-network.png',
      docs: {
        sidebar: {
          hideable: false, // Prevents hiding the sidebar
          autoCollapseCategories: false, // Prevents auto-collapsing categories
        },
      },
      navbar: {
        title: 'DOGE Network',
        logo: {
          alt: 'DOGE Network Logo',
          src: 'img/doge-network.png',
        },
        items: [
          {to: '/docs/', label: 'Documentation', position: 'left'},
          {to: '/meetings', label: 'Meetings', position: 'left'},
          {to: '/schedule', label: 'Schedule', position: 'left'},
          {to: '/calendar', label: 'Calendar', position: 'left'},
          {
            href: 'https://github.com/doge-network/website',
            label: 'Edit /docs content on GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            items: [
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'Documentation',
                to: '/docs/',
              },
              {
                label: 'Meetings',
                to: '/meetings',
              },
              {
                label: 'Schedule',
                to: '/schedule',
              },
              {
                label: 'Calendar',
                to: '/calendar',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/doge-network',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Conservative Technology Group. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
  } satisfies Preset.ThemeConfig,


};

export default config;
