// src/data/events.ts
export interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  location?: string;
  type: 'biannual' | 'weekly' | 'optional' | 'virtual' | 'google';
  description?: string;
  url?: string;
  duration?: string;
  // Google Calendar specific fields
  htmlLink?: string;
  hangoutLink?: string;
  source?: 'google' | 'local';
}

// Google Calendar API response types
export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
    timeZone?: string;
  };
  location?: string;
  htmlLink: string;
  hangoutLink?: string;
  status: string;
}

export interface GoogleCalendarResponse {
  items: GoogleCalendarEvent[];
  nextPageToken?: string;
  error?: {
    code: number;
    message: string;
  };
}

export const events: Event[] = [
  // Past Events (2024)
  {
    id: 'cpac-2024',
    title: 'CPAC 2024',
    date: '2024-02-21',
    endDate: '2024-02-24',
    location: 'National Harbor, MD',
    type: 'biannual',
    description:
      'Conservative Political Action Conference - Strategic planning and networking',
    url: 'https://cpac2024.conservative.org/',
    duration: '4 days',
  },
  {
    id: 'ces-2024',
    title: 'CES 2024',
    date: '2024-01-09',
    endDate: '2024-01-12',
    location: 'Las Vegas',
    type: 'optional',
    description: 'Consumer Electronics Show - Technology innovation and trends',
    url: 'https://www.ces.tech/',
    duration: '4 days',
  },
  {
    id: 'microsoft-build-2024',
    title: 'Microsoft Build 2024',
    date: '2024-05-21',
    endDate: '2024-05-23',
    type: 'optional',
    description: "Microsoft's flagship annual developer conference",
    url: 'https://build.microsoft.com/',
    duration: '3 days',
  },
  {
    id: 'aws-reinvent-2024',
    title: 'AWS re:Invent 2024',
    date: '2024-11-25',
    endDate: '2024-11-29',
    location: 'Las Vegas',
    type: 'optional',
    description: "Amazon Web Services' premier annual cloud tech conference",
    url: 'https://reinvent.awsevents.com/',
    duration: '5 days',
  },
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
  // Specific weekly meetings for August 2025
  {
    id: 'weekly-meeting-aug-7',
    title: 'Weekly Check-in',
    date: '2025-08-07',
    type: 'weekly',
    description:
      'Regular virtual meeting to discuss progress and coordinate projects',
    url: '/docs/meetings',
  },
  {
    id: 'weekly-meeting-aug-14',
    title: 'Weekly Check-in',
    date: '2025-08-14',
    type: 'weekly',
    description:
      'Regular virtual meeting to discuss progress and coordinate projects',
    url: '/docs/meetings',
  },
  {
    id: 'weekly-meeting-aug-21',
    title: 'Weekly Check-in',
    date: '2025-08-21',
    type: 'weekly',
    description:
      'Regular virtual meeting to discuss progress and coordinate projects',
    url: '/docs/meetings',
  },
  {
    id: 'weekly-meeting-aug-28',
    title: 'Weekly Check-in',
    date: '2025-08-28',
    type: 'weekly',
    description:
      'Regular virtual meeting to discuss progress and coordinate projects',
    url: '/docs/meetings',
  },
  // August 2025 specific events
  {
    id: 'americafest-planning-aug-22',
    title: 'AmericaFest 2025 Planning Meeting',
    date: '2025-08-22',
    type: 'biannual',
    description:
      'Follow up meeting. TBD holding these as a X space. Aladdin, twinforces and I are going to meet and discuss meeting f2f on conservative tech projects @ AmericaFest 2025 in Phoenix 18-21 Dec. This meeting will be transcribed and recorded.',
    url: '/docs/americafest-2025',
  },
  // Optional events from 2025
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

// Google Calendar API functions
const GOOGLE_CALENDAR_API_BASE = 'https://www.googleapis.com/calendar/v3';

export async function fetchGoogleCalendarEvents(
  apiKey?: string,
  calendarId?: string
): Promise<Event[]> {
  if (!apiKey) {
    // console.warn(
    //   'Google Calendar API key not found. Please set REACT_APP_GOOGLE_CALENDAR_API_KEY environment variable.'
    // );
    return [];
  }

  if (!calendarId) {
    // console.warn(
    //   'Google Calendar ID not found. Please set REACT_APP_GOOGLE_CALENDAR_ID environment variable.'
    // );
    return [];
  }

  try {
    const now = new Date();
    const timeMin = now.toISOString();
    // Get events for the next year
    const timeMax = new Date(
      now.getFullYear() + 1,
      now.getMonth(),
      now.getDate()
    ).toISOString();

    const url =
      `${GOOGLE_CALENDAR_API_BASE}/calendars/${encodeURIComponent(calendarId)}/events?` +
      `key=${apiKey}&` +
      `timeMin=${timeMin}&` +
      `timeMax=${timeMax}&` +
      `singleEvents=true&` +
      `orderBy=startTime&` +
      `maxResults=250`;

    const response = await fetch(url);
    const data: GoogleCalendarResponse = await response.json();

    if (data.error) {
      // console.error('Google Calendar API error:', data.error);
      return [];
    }

    return data.items
      .filter(item => item.status === 'confirmed')
      .map(transformGoogleEventToEvent);
  } catch {
    // console.error('Error fetching Google Calendar events');
    return [];
  }
}

function transformGoogleEventToEvent(googleEvent: GoogleCalendarEvent): Event {
  const startDate = googleEvent.start.dateTime || googleEvent.start.date;
  const endDate = googleEvent.end.dateTime || googleEvent.end.date;

  // Convert datetime to date string
  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  };

  const event: Event = {
    id: googleEvent.id,
    title: googleEvent.summary,
    date: formatDate(startDate!),
    type: 'google',
    source: 'google',
    htmlLink: googleEvent.htmlLink,
  };

  if (endDate && formatDate(endDate) !== formatDate(startDate!)) {
    event.endDate = formatDate(endDate);
  }

  if (googleEvent.location) {
    event.location = googleEvent.location;
  }

  if (googleEvent.description) {
    event.description = googleEvent.description;
  }

  if (googleEvent.hangoutLink) {
    event.hangoutLink = googleEvent.hangoutLink;
    event.url = googleEvent.hangoutLink;
  } else if (googleEvent.htmlLink) {
    event.url = googleEvent.htmlLink;
  }

  return event;
}

export async function getGoogleEventsByMonth(
  year: number,
  month: number
): Promise<Event[]> {
  const allEvents = await fetchGoogleCalendarEvents();
  return allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
}
