// src/data/events.ts
export interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location?: string;
  type: 'biannual' | 'weekly' | 'optional' | 'virtual';
  description?: string;
  url?: string;
  duration?: string;
}

export const events: Event[] = [
  // Main DOGE Network Events
  {
    id: 'americafest-2025',
    title: 'AmericaFest 2025',
    date: '2025-12-17',
    location: 'TBD',
    type: 'biannual',
    description: 'Strategic planning session for DOGE related projects',
    url: '/docs/americafest-2025',
    duration: '1 day',
  },
  {
    id: 'cpac-2026',
    title: 'CPAC 2026',
    date: '2026-07-01', // Summer 2026 estimate
    location: 'TBD',
    type: 'biannual',
    description:
      'Strategic planning session for government transparency projects',
    url: '/docs/cpac-2026',
    duration: '1 day',
  },
  // Weekly meetings (recurring - showing next few instances)
  {
    id: 'weekly-meeting-next',
    title: 'Weekly Check-in',
    date: getNextWeeklyMeeting(),
    type: 'weekly',
    description:
      'Regular virtual meeting to discuss progress and coordinate projects',
    url: '/docs/meetings',
  },
  // Optional events from 2025
  {
    id: 'ces-2025',
    title: 'CES (Consumer Electronics Show)',
    date: '2025-01-07',
    endDate: '2025-01-10',
    location: 'Las Vegas',
    type: 'optional',
    description:
      'Major annual consumer electronics and technology innovation show',
    url: 'https://www.ces.tech/',
  },
  {
    id: 'startup-world-cup-2025',
    title: 'Startup World Cup',
    date: '2025-05-02',
    type: 'optional',
    description: 'International startup and investment competition/conference',
    url: 'https://www.startupworldcup.io/',
  },
  {
    id: 'techspo-sf-2025',
    title: 'TECHSPO San Francisco',
    date: '2025-05-08',
    endDate: '2025-05-09',
    location: 'San Francisco',
    type: 'optional',
    description: 'Technology expo focused on internet, mobile, AdTech, SaaS',
    url: 'https://techsfo.co/',
  },
  {
    id: 'microsoft-build-2025',
    title: 'Microsoft Build',
    date: '2025-05-20',
    endDate: '2025-05-22',
    type: 'optional',
    description: "Microsoft's flagship annual developer conference",
    url: 'https://build.microsoft.com/',
  },
  {
    id: 'cisco-live-2025',
    title: 'Cisco Live',
    date: '2025-06-01',
    endDate: '2025-06-05',
    location: 'Las Vegas',
    type: 'optional',
    description: "Cisco's premier education and training event",
    url: 'https://www.ciscolive.com/',
  },
  {
    id: 'hpe-discover-2025',
    title: 'HPE Discover',
    date: '2025-06-17',
    endDate: '2025-06-20',
    type: 'optional',
    description: "Hewlett Packard Enterprise's main technology conference",
    url: 'https://www.hpe.com/us/en/discover.html',
  },
  {
    id: 'pure-accelerate-2025',
    title: 'Pure//Accelerate',
    date: '2025-06-18',
    endDate: '2025-06-20',
    type: 'optional',
    description:
      'Conference by Pure Storage about data storage and infrastructure',
    url: 'https://www.purestorage.com/accelerate/',
  },
  {
    id: 'tnw-conference-2025',
    title: 'TNW Conference',
    date: '2025-06-19',
    endDate: '2025-06-20',
    type: 'optional',
    description: 'Major European technology event for founders and innovators',
    url: 'https://tnw.com/conference',
  },
  {
    id: 'shi-summit-2025',
    title: 'SHI and Stratascale Summit',
    date: '2025-06-23',
    endDate: '2025-06-25',
    type: 'optional',
    description: 'Industry summit focused on cybersecurity, cloud, and AI',
    url: 'https://www.shisummit.com/',
  },
  {
    id: 'iste-live-2025',
    title: 'ISTE Live',
    date: '2025-06-29',
    endDate: '2025-07-02',
    type: 'optional',
    description: 'Annual education technology conference',
    url: 'https://www.iste.org/iste-live',
  },
  {
    id: 'falcon-2025',
    title: 'Fal.Con',
    date: '2025-09-08',
    endDate: '2025-09-11',
    location: 'Las Vegas',
    type: 'optional',
    description: 'Cybersecurity industry conference hosted by CrowdStrike',
    url: 'https://www.crowdstrike.com/falcon-cybersecurity-conference/',
  },
  {
    id: 'ai-conference-2025',
    title: 'The AI Conference',
    date: '2025-09-10',
    endDate: '2025-09-11',
    location: 'San Jose',
    type: 'optional',
    description: 'Leading AI industry conference',
    url: 'https://theaiconf.com/',
  },
  {
    id: 'educause-2025',
    title: 'EDUCAUSE',
    date: '2025-10-07',
    endDate: '2025-10-10',
    location: 'San Antonio',
    type: 'optional',
    description: 'Major higher education technology conference',
    url: 'https://events.educause.edu/annual-conference',
  },
  {
    id: 'onecon-2025',
    title: 'OneCon25',
    date: '2025-10-15',
    endDate: '2025-10-17',
    type: 'optional',
    description: 'Conference on IT, digital, and business trends',
    url: 'https://www.onecon.org/',
  },
  {
    id: 'techcrunch-disrupt-2025',
    title: 'TechCrunch Disrupt',
    date: '2025-10-28',
    endDate: '2025-10-30',
    location: 'San Francisco',
    type: 'optional',
    description:
      'Well-known event for startups, technology launches, and VC networking',
    url: 'https://techcrunch.com/events/tc-disrupt/',
  },
  {
    id: 'github-universe-2025',
    title: 'GitHub Universe',
    date: '2025-11-05',
    endDate: '2025-11-06',
    location: 'San Francisco',
    type: 'optional',
    description:
      'Official conference of GitHub, focused on software development',
    url: 'https://githubuniverse.com/',
  },
  {
    id: 'microsoft-ignite-2025',
    title: 'Microsoft Ignite',
    date: '2025-11-17',
    endDate: '2025-11-20',
    type: 'optional',
    description:
      "Microsoft's annual event for business, AI, and cloud technologies",
    url: 'https://ignite.microsoft.com/',
  },
  {
    id: 'aws-reinvent-2025',
    title: 'AWS re:Invent',
    date: '2025-12-01',
    endDate: '2025-12-05',
    location: 'Las Vegas',
    type: 'optional',
    description: "Amazon Web Services' premier annual cloud tech conference",
    url: 'https://reinvent.awsevents.com/',
  },
];

function getNextWeeklyMeeting(): string {
  const today = new Date();
  const daysUntilWednesday = (3 - today.getDay() + 7) % 7 || 7; // Next Wednesday
  const nextWednesday = new Date(today);
  nextWednesday.setDate(today.getDate() + daysUntilWednesday);
  return nextWednesday.toISOString().split('T')[0];
}

export function getEventsByMonth(year: number, month: number): Event[] {
  return events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
}

export function getUpcomingEvents(limit: number = 5): Event[] {
  const now = new Date();
  return events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}
