import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from '../components/EventsCalendar/styles.module.css';

export default function Calendar(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const calendarId = siteConfig.customFields?.googleCalendarId as string;

  // Google Calendar embed URL
  const getGoogleCalendarEmbedUrl = () => {
    if (!calendarId) {
      return 'https://calendar.google.com/calendar/embed?src=primary';
    }

    // Format: https://calendar.google.com/calendar/embed?src=CALENDAR_ID
    return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=America%2FNew_York`;
  };

  return (
    <Layout
      title='Events Calendar'
      description='View all upcoming events, meetings, and important dates for the Conservative Technology Group in an interactive calendar format.'
    >
      <div style={{ padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1
              style={{
                color: 'var(--ifm-color-primary)',
                marginBottom: '16px',
              }}
            >
              Events Calendar
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--ifm-color-content-secondary)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              Stay up to date with all Conservative Technology Group events,
              from biannual strategic planning sessions to weekly check-ins and
              optional technology conferences.
            </p>
          </header>

          {/* Google Calendar Embed */}
          <div
            style={{
              background: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              marginBottom: '40px',
            }}
          >
            {calendarId ? (
              <iframe
                src={getGoogleCalendarEmbedUrl()}
                style={{
                  width: '100%',
                  height: '600px',
                  border: 'none',
                  borderRadius: '8px',
                }}
                title='DOGE Network Events Calendar'
                frameBorder='0'
                scrolling='no'
              />
            ) : (
              <div
                style={{
                  padding: '40px',
                  textAlign: 'center',
                  color: 'var(--ifm-color-content-secondary)',
                }}
              >
                <p>
                  Google Calendar not configured. Please set up your calendar ID
                  in the site configuration.
                </p>
                <p>You can also view the calendar directly at:</p>
                <a
                  href='https://calendar.google.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{
                    color: 'var(--ifm-color-primary)',
                    textDecoration: 'none',
                  }}
                >
                  Google Calendar
                </a>
              </div>
            )}
          </div>

          {/* Public Calendar URL Section */}
          <div
            style={{
              background: 'var(--ifm-color-emphasis-50)',
              borderRadius: '8px',
              padding: '24px',
              marginBottom: '40px',
              border: '2px solid var(--ifm-color-primary)',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                color: 'var(--ifm-color-primary)',
                marginBottom: '16px',
                fontSize: '1.3rem',
              }}
            >
              📅 Add to Your Calendar
            </h3>
            <p
              style={{
                color: 'var(--ifm-color-content-secondary)',
                marginBottom: '20px',
                fontSize: '1rem',
              }}
            >
              Subscribe to our calendar to stay updated with all DOGE Network
              events and meetings
            </p>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <a
                href='https://calendar.google.com/calendar/embed?src=ddfe038179a090c874c069ed44ef9ebd79d37cb47d9b17a87ec7e2f2550457e5%40group.calendar.google.com&ctz=America%2FLos_Angeles'
                target='_blank'
                rel='noopener noreferrer'
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  backgroundColor: 'white',
                  color: 'var(--ifm-color-primary)',
                  fontWeight: '700',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  border: '2px solid var(--ifm-color-primary)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.backgroundColor =
                    'var(--ifm-color-primary)';
                  (e.target as HTMLElement).style.color = 'white';
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.backgroundColor = 'white';
                  (e.target as HTMLElement).style.color =
                    'var(--ifm-color-primary)';
                }}
              >
                <span>📅</span>
                View Public Calendar
              </a>
            </div>
          </div>

          <div
            style={{
              marginTop: '40px',
              padding: '20px',
              background: 'var(--ifm-color-emphasis-50)',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                margin: '0 0 16px 0',
                color: 'var(--ifm-color-primary)',
              }}
            >
              Want to learn more?
            </h3>
            <p
              style={{
                margin: '0 0 20px 0',
                color: 'var(--ifm-color-content-secondary)',
              }}
            >
              Check out our detailed schedule and event information pages.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                href='/docs/schedule'
                className={styles['calendar-page-button']}
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: 'var(--ifm-color-primary)',
                  color: 'white',
                  fontWeight: '500',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e =>
                  ((e.target as HTMLElement).style.backgroundColor =
                    'var(--ifm-color-primary-dark)')
                }
                onMouseLeave={e =>
                  ((e.target as HTMLElement).style.backgroundColor =
                    'var(--ifm-color-primary)')
                }
              >
                View Schedule
              </a>
              <a
                href='/docs/meetings'
                className={styles['calendar-page-button']}
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: 'var(--ifm-color-primary)',
                  color: 'white',
                  fontWeight: '500',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e =>
                  ((e.target as HTMLElement).style.backgroundColor =
                    'var(--ifm-color-primary-dark)')
                }
                onMouseLeave={e =>
                  ((e.target as HTMLElement).style.backgroundColor =
                    'var(--ifm-color-primary)')
                }
              >
                Join Meetings
              </a>
              <a
                href='/docs/contact'
                className={styles['calendar-page-button']}
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: 'var(--ifm-color-primary)',
                  color: 'white',
                  fontWeight: '500',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={e =>
                  ((e.target as HTMLElement).style.backgroundColor =
                    'var(--ifm-color-primary-dark)')
                }
                onMouseLeave={e =>
                  ((e.target as HTMLElement).style.backgroundColor =
                    'var(--ifm-color-primary)')
                }
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
