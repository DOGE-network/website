import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ClientCarousel from '@site/src/components/ClientCarousel';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className='container'>
        <Heading as='h1' className='hero__title'>
          {siteConfig.title}
        </Heading>
        <p className='hero__subtitle'>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className='button button--secondary button--lg' to='/meetings'>
            Join Our Meetings 📅
          </Link>
          <Link
            className='button button--secondary button--lg'
            to='/about'
            style={{ marginLeft: '16px' }}
          >
            Learn More 📚
          </Link>
        </div>
      </div>
    </header>
  );
}

function MissionSection() {
  return (
    <section
      className='hero'
      style={{
        background: 'var(--ifm-background-surface-color)',
        color: 'var(--ifm-color-content)',
      }}
    >
      <div
        className='container'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div
          className='row'
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <div
            className='col col--8'
            style={{ margin: '0 auto', float: 'none' }}
          >
            <h2
              style={{
                textAlign: 'center',
                marginBottom: '32px',
                color: 'var(--ifm-color-primary)',
              }}
            >
              Our Purpose
            </h2>
            <div className='card'>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: 0 }}>
                We individually are supporting various projects related to
                government transparency. While these are generally passion
                projects that we would do for free, it would be nice to get
                collaboration across many similar projects to help push forward.
                For that purpose, we have decided to start meeting in person.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UpcomingEvents() {
  return (
    <section
      style={{ padding: '80px 0', background: 'var(--ifm-background-color)' }}
    >
      <div className='container'>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            color: 'var(--ifm-color-primary)',
          }}
        >
          Upcoming Events
        </h2>
        <div className='row'>
          <div className='col col--6'>
            <div className='card'>
              <h3>AmericaFest</h3>
              <p>
                Biannual face-to-face gathering to plan the next 6 months of
                work.
              </p>
              <Link 
                className='button' 
                to='/schedule'
              >
                View Schedule
              </Link>
            </div>
          </div>
          <div className='col col--6'>
            <div className='card'>
              <h3>CPAC</h3>
              <p>
                Biannual face-to-face gathering to plan the next 6 months of
                work.
              </p>
              <Link 
                className='button' 
                to='/schedule'
              >
                View Schedule
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section
      style={{
        padding: '10px 0',
        background: 'var(--ifm-background-surface-color)',
      }}
    >
      <div className='container'>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            color: 'var(--ifm-color-primary)',
          }}
        >
          Projects
        </h2>
        <ClientCarousel />
      </div>
    </section>
  );
}

function GetInvolved() {
  return (
    <section
      style={{
        padding: '80px 0',
        background: 'var(--ifm-background-surface-color)',
      }}
    >
      <div className='container'>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '48px',
            color: 'var(--ifm-color-primary)',
          }}
        >
          Get Involved
        </h2>
        <div className='row'>
          <div className='col col--3'>
            <div className='card' style={{ textAlign: 'center' }}>
              <h3>📹 Watch Meetings</h3>
              <p>View our recorded meetings and discussions on YouTube.</p>
              <Link className='button' to='/meetings'>
                Meeting Videos
              </Link>
            </div>
          </div>
          <div className='col col--3'>
            <div className='card' style={{ textAlign: 'center' }}>
              <h3>📝 Meeting Notes</h3>
              <p>Access detailed notes and action items from our meetings.</p>
              <Link className='button' to='/meetings'>
                View Notes
              </Link>
            </div>
          </div>
          <div className='col col--3'>
            <div className='card' style={{ textAlign: 'center' }}>
              <h3>📅 View Schedule</h3>
              <p>See our detailed event schedule and information.</p>
              <Link 
                className='button' 
                to='/schedule'
              >
                View Schedule
              </Link>
            </div>
          </div>
          <div className='col col--3'>
            <div className='card' style={{ textAlign: 'center' }}>
              <h3>🗓️ Events Calendar</h3>
              <p>Browse all events in an interactive calendar view.</p>
              <Link className='button' to='/calendar'>
                Open Calendar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Supporting Government Transparency`}
      description='Conservative Technology Group supports various projects related to government transparency through collaboration and in-person meetings.'
    >
      <HomepageHeader />
      <main>
        <MissionSection />
        <ClientsSection />
        <UpcomingEvents />
        <GetInvolved />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
