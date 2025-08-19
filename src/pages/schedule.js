import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Schedule() {
  return (
    <Layout
      title='Schedule - DOGE Network'
      description='View upcoming DOGE Network events including biannual AmericaFest and CPAC gatherings for planning the next 6 months of work.'
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
              Event Schedule
            </h1>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: 0 }}>
              Join us for biannual gatherings and regular meetings to plan
              government transparency projects
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
                📝 Edit Schedule Content
              </a>
            </div>
          </div>
        </section>

        {/* Biannual Gatherings */}
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
              Biannual Face-to-Face Gatherings
            </h2>
            <p
              style={{
                textAlign: 'center',
                fontSize: '1.1rem',
                marginBottom: '48px',
                maxWidth: '800px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              These major gatherings are where we plan the next 6 months of work
              and make strategic decisions about the DOGE Network's direction.
            </p>

            <div className='row'>
              <div className='col col--6'>
                <div className='card' style={{ height: '100%' }}>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h3 style={{ color: 'var(--ifm-color-primary)' }}>
                      🇺🇸 AmericaFest
                    </h3>
                    <div style={{ fontSize: '2rem', marginBottom: '16px' }}>
                      🎯
                    </div>
                  </div>
                  <p>
                    <strong>Purpose:</strong> Strategic planning session for
                    government transparency projects
                  </p>
                  <p>
                    <strong>Frequency:</strong> Every 6 months
                  </p>
                  <p>
                    <strong>Next Event:</strong> TBD - Spring 2025
                  </p>
                  <p>
                    <strong>Location:</strong> TBD
                  </p>
                  <p>
                    <strong>Duration:</strong> 2-3 days
                  </p>
                  <div style={{ marginTop: '24px' }}>
                    <Link className='button' to='/docs/americafest-2025'>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>

              <div className='col col--6'>
                <div className='card' style={{ height: '100%' }}>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h3 style={{ color: 'var(--ifm-color-primary)' }}>
                      🏛️ CPAC
                    </h3>
                    <div style={{ fontSize: '2rem', marginBottom: '16px' }}>
                      🎯
                    </div>
                  </div>
                  <p>
                    <strong>Purpose:</strong> Strategic planning session for
                    government transparency projects
                  </p>
                  <p>
                    <strong>Frequency:</strong> Every 6 months
                  </p>
                  <p>
                    <strong>Next Event:</strong> TBD - Fall 2025
                  </p>
                  <p>
                    <strong>Location:</strong> TBD
                  </p>
                  <p>
                    <strong>Duration:</strong> 2-3 days
                  </p>
                  <div style={{ marginTop: '24px' }}>
                    <Link className='button' to='/docs/cpac-2025'>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regular Meetings */}
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
              Regular Virtual Meetings
            </h2>
            <div className='row'>
              <div className='col col--8 col--offset--2'>
                <div className='card'>
                  <h3>📅 Monthly Check-ins</h3>
                  <p>
                    Regular virtual meetings to discuss progress, share updates,
                    and coordinate on ongoing projects.
                  </p>
                  <ul style={{ marginTop: '16px' }}>
                    <li>
                      <strong>Frequency:</strong> Monthly
                    </li>
                    <li>
                      <strong>Duration:</strong> 1-2 hours
                    </li>
                    <li>
                      <strong>Format:</strong> Video conference
                    </li>
                    <li>
                      <strong>Next Meeting:</strong> January 2025
                    </li>
                  </ul>
                  <div style={{ marginTop: '24px' }}>
                    <Link className='button' to='/meetings'>
                      Join Next Meeting
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Timeline */}
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
              Upcoming Events Timeline
            </h2>
            <div className='row'>
              <div className='col col--10 col--offset--1'>
                <div className='card'>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '24px',
                      padding: '16px',
                      borderBottom:
                        '1px solid var(--ifm-color-secondary-lighter)',
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--ifm-color-primary)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '16px',
                      }}
                    >
                      1
                    </div>
                    <div>
                      <h4 style={{ margin: 0 }}>
                        January 2025 - Monthly Check-in
                      </h4>
                      <p
                        style={{
                          margin: '4px 0 0 0',
                          color: 'var(--ifm-color-content-secondary)',
                        }}
                      >
                        Virtual meeting to discuss Q1 priorities
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '24px',
                      padding: '16px',
                      borderBottom:
                        '1px solid var(--ifm-color-secondary-lighter)',
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--ifm-color-primary)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '16px',
                      }}
                    >
                      2
                    </div>
                    <div>
                      <h4 style={{ margin: 0 }}>
                        February 2025 - Monthly Check-in
                      </h4>
                      <p
                        style={{
                          margin: '4px 0 0 0',
                          color: 'var(--ifm-color-content-secondary)',
                        }}
                      >
                        Progress review and project updates
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '24px',
                      padding: '16px',
                      borderBottom:
                        '1px solid var(--ifm-color-secondary-lighter)',
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--ifm-color-primary)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '16px',
                      }}
                    >
                      3
                    </div>
                    <div>
                      <h4 style={{ margin: 0 }}>
                        Spring 2025 - AmericaFest Gathering
                      </h4>
                      <p
                        style={{
                          margin: '4px 0 0 0',
                          color: 'var(--ifm-color-content-secondary)',
                        }}
                      >
                        Strategic planning for next 6 months
                      </p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px',
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--ifm-color-secondary)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '16px',
                      }}
                    >
                      4
                    </div>
                    <div>
                      <h4 style={{ margin: 0 }}>Fall 2025 - CPAC Gathering</h4>
                      <p
                        style={{
                          margin: '4px 0 0 0',
                          color: 'var(--ifm-color-content-secondary)',
                        }}
                      >
                        Strategic planning for next 6 months
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved */}
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
                    Ready to Join Us?
                  </h2>
                  <p style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
                    Whether you want to attend our biannual gatherings or join
                    regular virtual meetings, there are many ways to get
                    involved with the Doge Network.
                  </p>
                  <div>
                    <Link className='button' to='/meetings'>
                      Join Next Meeting
                    </Link>
                    <Link
                      className='button'
                      to='/docs/contact'
                      style={{
                        marginLeft: '16px',
                        background: 'var(--ifm-color-secondary)',
                      }}
                    >
                      Contact Us
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
