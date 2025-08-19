import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function About() {
  return (
    <Layout
      title='About - Conservative Technology Group'
      description="Learn about the Conservative Technology Group's mission to support government transparency projects through collaboration and organization."
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
              About Conservative Technology Group
            </h1>
            <p style={{ textAlign: 'center', fontSize: '1.2rem', margin: 0 }}>
              Supporting government transparency through collaboration and
              organization
            </p>
          </div>
        </section>

        {/* Mission Statement */}
        <section
          style={{
            padding: '80px 0',
            background: 'var(--ifm-background-color)',
          }}
        >
          <div className='container'>
            <div className='row'>
              <div className='col col--8 col--offset--2'>
                <div className='card'>
                  <h2
                    style={{
                      color: 'var(--ifm-color-primary)',
                      marginBottom: '24px',
                      textAlign: 'center',
                    }}
                  >
                    Our Mission
                  </h2>
                  <p
                    style={{
                      fontSize: '1.2rem',
                      lineHeight: '1.6',
                      marginBottom: '24px',
                    }}
                  >
                    We individually are supporting various projects related to
                    government transparency. While these are generally passion
                    projects that we would do for free, it would be nice to get
                    collaboration across many similar projects to help push
                    forward.
                  </p>
                  <p
                    style={{
                      fontSize: '1.2rem',
                      lineHeight: '1.6',
                      marginBottom: '24px',
                    }}
                  >
                    For that purpose, we have decided to start meeting in
                    person. Possible outcome could be to form a nonprofit
                    organization to help with organizing and supporting
                    projects. It would be self organizing and classified as a
                    501(c) for federal tax purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
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
              What We Do
            </h2>
            <div className='row'>
              <div className='col col--4'>
                <div
                  className='card'
                  style={{ textAlign: 'center', height: '100%' }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                    🤝
                  </div>
                  <h3>Facilitate Collaboration</h3>
                  <p>
                    Bring together individuals and groups working on government
                    transparency projects to share knowledge and resources.
                  </p>
                </div>
              </div>
              <div className='col col--4'>
                <div
                  className='card'
                  style={{ textAlign: 'center', height: '100%' }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                    📋
                  </div>
                  <h3>Organize Meetings</h3>
                  <p>
                    Host regular virtual meetings and biannual face-to-face
                    gatherings to coordinate efforts and plan future work.
                  </p>
                </div>
              </div>
              <div className='col col--4'>
                <div
                  className='card'
                  style={{ textAlign: 'center', height: '100%' }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
                    🏛️
                  </div>
                  <h3>Support Projects</h3>
                  <p>
                    Provide organizational support, resources, and networking
                    opportunities for government transparency initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
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
              Our Approach
            </h2>
            <div className='row'>
              <div className='col col--6'>
                <div className='card'>
                  <h3>🎯 Self-Organizing</h3>
                  <p>
                    We believe in bottom-up organization where participants
                    drive the direction and priorities of the network.
                  </p>
                  <ul style={{ marginTop: '16px' }}>
                    <li>Volunteer-driven initiatives</li>
                    <li>Consensus-based decision making</li>
                    <li>Flexible participation levels</li>
                  </ul>
                </div>
              </div>
              <div className='col col--6'>
                <div className='card'>
                  <h3>🤲 Nonprofit Structure</h3>
                  <p>
                    Working towards 501(c) classification to provide a formal
                    structure for supporting transparency projects.
                  </p>
                  <ul style={{ marginTop: '16px' }}>
                    <li>Tax-exempt status</li>
                    <li>Formal governance structure</li>
                    <li>Fundraising capabilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Focus Areas */}
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
              Key Focus Areas
            </h2>
            <div className='row'>
              <div className='col col--10 col--offset--1'>
                <div className='card'>
                  <div className='row'>
                    <div className='col col--6'>
                      <h4>📊 Government Data Access</h4>
                      <p>
                        Improving access to government information and public
                        records
                      </p>

                      <h4>🔍 Transparency Tools</h4>
                      <p>
                        Developing tools and platforms for monitoring government
                        activities
                      </p>

                      <h4>📚 Public Education</h4>
                      <p>
                        Educating citizens about government processes and their
                        rights
                      </p>
                    </div>
                    <div className='col col--6'>
                      <h4>⚖️ Legal Advocacy</h4>
                      <p>
                        Supporting legal efforts to increase government
                        transparency
                      </p>

                      <h4>🌐 Technology Solutions</h4>
                      <p>
                        Building technology solutions for transparency and
                        accountability
                      </p>

                      <h4>🤝 Community Building</h4>
                      <p>
                        Connecting transparency advocates and project leaders
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
            background: 'var(--ifm-background-color)',
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
                    Join Our Mission
                  </h2>
                  <p style={{ fontSize: '1.1rem', marginBottom: '32px' }}>
                    Whether you're working on a government transparency project
                    or want to support those who are, there's a place for you in
                    the Conservative Technology Group.
                  </p>
                  <div>
                    <Link className='button' to='/meetings'>
                      Join Our Next Meeting
                    </Link>
                    <Link
                      className='button'
                      to='/schedule'
                      style={{
                        marginLeft: '16px',
                        background: 'var(--ifm-color-secondary)',
                      }}
                    >
                      View Event Schedule
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
