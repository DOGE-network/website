import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import ClientCarousel from '@site/src/components/ClientCarousel';
import Head from '@docusaurus/Head';

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
          <Link
            className='button button--secondary button--lg'
            to='/join-doge-network'
          >
            Join DOGE Network 🚀
          </Link>
          <Link className='button button--secondary button--lg' to='/meetings'>
            Join Our Meetings 📅
          </Link>
          <Link
            className='button button--secondary button--lg'
            to='https://forms.gle/5WD4CA6h3tmcgvTL7'
            target='_blank'
            rel='noopener noreferrer'
          >
            Volunteer for CTG AmericaFest 🎉
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
                We develop tools related to government transparency and for the
                public good. We implement ETL and data standards to facilitate
                many data sources correlation so that timely research can be
                turned into action. Our goal is to apply the tools and
                implementation to make data accessible from local, regional, and
                national sources.
              </p>
              <br />
              <p style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: 0 }}>
                For example, the California DOGE codebase is both for California
                State government data research and as a template for other
                states to follow. Code is publicly licensed as Apache 2.0 and
                CC-BY. We can help you organize your team and start your own
                DOGE related site. We aspire to complement{' '}
                <a
                  href='https://datarepublican.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Data Republican
                </a>{' '}
                and{' '}
                <a
                  href='https://doge.gov'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Federal DOGE
                </a>
                .
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
              <Link className='button' to='/schedule'>
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
              <Link className='button' to='/schedule'>
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
              <Link
                className='button'
                to='https://www.youtube.com/@doge_network'
                target='_blank'
                rel='noopener noreferrer'
              >
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
              <Link className='button' to='/schedule'>
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
    <Layout>
      <Head>
        <title>{`${siteConfig.title} - Supporting Government Transparency`}</title>
        <meta
          name='description'
          content='Conservative Technology Group supports various projects related to government transparency through collaboration and in-person meetings.'
        />
      </Head>
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
