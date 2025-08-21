import React from 'react';
import Layout from '@theme/Layout';
import EventsCalendar from '../components/EventsCalendar';

export default function Calendar(): React.ReactElement {
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

          <EventsCalendar />

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
                className='button button--primary'
                style={{ textDecoration: 'none' }}
              >
                View Schedule
              </a>
              <a
                href='/docs/meetings'
                className='button button--secondary'
                style={{ textDecoration: 'none' }}
              >
                Join Meetings
              </a>
              <a
                href='/docs/contact'
                className='button button--outline button--primary'
                style={{ textDecoration: 'none' }}
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
