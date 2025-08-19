import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Meetings() {
  return (
    <Layout
      title='Meetings - DOGE Network'
      description='Watch recorded meetings, view notes, and access meeting agendas for DOGE Network collaboration sessions.'
    >
      <main>
        {/* Hero Section */}
        <section
          className='hero'
          style={{
            background: 'var(--ifm-background-surface-color)',
            color: 'var(--ifm-color-content)',
          }}
        >
          <div className='container'>
            <h1
              style={{
                textAlign: 'center',
                marginBottom: '16px',
                color: 'var(--ifm-color-primary)',
              }}
            >
              DOGE Network Meetings
            </h1>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: 0 }}>
              Watch recorded meetings, access notes, and stay updated on our
              collaboration efforts
            </p>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <a
                href='/admin'
                className='button'
                style={{
                  background: 'var(--ifm-color-secondary)',
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                📝 Edit Meetings Content
              </a>
            </div>
          </div>
        </section>

        {/* Latest Meeting Video */}
        <section
          style={{
            padding: '80px 0',
            background: 'var(--ifm-background-color)',
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
              Latest Meeting Recording
            </h2>
            <div className='row'>
              <div className='col col--8 col--offset--2'>
                <div
                  className='card'
                  style={{ padding: '0', overflow: 'hidden' }}
                >
                  <div
                    style={{
                      position: 'relative',
                      paddingBottom: '56.25%',
                      height: 0,
                    }}
                  >
                    <iframe
                      src='https://www.youtube.com/embed/dQw4w9WgXcQ'
                      title='Latest Doge Network Meeting'
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3>DOGE Network Kickoff Meeting</h3>
                    <p>
                      Our inaugural meeting discussing the formation of the DOGE
                      Network and plans for government transparency projects.
                    </p>
                    <p>
                      <strong>Date:</strong> December 2024
                    </p>
                    <p>
                      <strong>Duration:</strong> 45 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meeting Notes */}
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
              Meeting Notes & Agendas
            </h2>
            <div className='row'>
              <div className='col col--6'>
                <div className='card'>
                  <h3>📝 Meeting Notes</h3>
                  <p>
                    Access detailed notes from our previous meetings including
                    action items, decisions, and follow-up tasks.
                  </p>
                  <div style={{ marginTop: '16px' }}>
                    <Link className='button' to='/docs/meeting-notes'>
                      View All Notes
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col col--6'>
                <div className='card'>
                  <h3>📋 Meeting Agendas</h3>
                  <p>
                    Review upcoming meeting agendas and contribute topics for
                    discussion in future sessions.
                  </p>
                  <div style={{ marginTop: '16px' }}>
                    <Link className='button' to='/docs/meeting-agendas'>
                      View Agendas
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Previous Meetings */}
        <section
          style={{
            padding: '80px 0',
            background: 'var(--ifm-background-color)',
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
              Previous Meetings
            </h2>
            <div className='row'>
              <div className='col col--4'>
                <div className='card'>
                  <h4>December 2024</h4>
                  <p>
                    Kickoff meeting discussing network formation and initial
                    project ideas.
                  </p>
                  <Link to='/docs/meeting-notes/dec-2024'>View Notes</Link>
                </div>
              </div>
              <div className='col col--4'>
                <div className='card'>
                  <h4>November 2024</h4>
                  <p>Planning session for AmericaFest and CPAC gatherings.</p>
                  <Link to='/docs/meeting-notes/nov-2024'>View Notes</Link>
                </div>
              </div>
              <div className='col col--4'>
                <div className='card'>
                  <h4>October 2024</h4>
                  <p>
                    Initial discussions about government transparency
                    collaboration.
                  </p>
                  <Link to='/docs/meeting-notes/oct-2024'>View Notes</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Next Meeting */}
        <section
          style={{
            padding: '80px 0',
            background: 'var(--ifm-background-surface-color)',
          }}
        >
          <div className='container'>
            <div className='row'>
              <div className='col col--8 col--offset--2'>
                <div className='card' style={{ textAlign: 'center' }}>
                  <h2
                    style={{
                      color: 'var(--ifm-color-primary)',
                      marginBottom: '24px',
                    }}
                  >
                    Join Our Next Meeting
                  </h2>
                  <p style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
                    Ready to contribute to government transparency? Join our
                    next meeting and help shape the future of the DOGE Network.
                  </p>
                  <div>
                    <Link className='button' to='/schedule'>
                      View Meeting Schedule
                    </Link>
                    <Link
                      className='button'
                      to='/docs/meeting-agendas'
                      style={{
                        marginLeft: '16px',
                        background: 'var(--ifm-color-secondary)',
                      }}
                    >
                      Submit Agenda Topics
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
