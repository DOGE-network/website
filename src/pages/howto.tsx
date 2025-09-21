import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

export default function HowToPage() {
  return (
    <Layout
      title={`How To Guides`}
      description='Comprehensive guides for getting started with DOGE Network development and contributing to government transparency projects'
    >
      <header className={styles.heroBanner}>
        <div className='container'>
          <h1 className='hero__title'>How To Guides</h1>
          <p className='hero__subtitle'>
            Learn how to contribute to government transparency through open
            source development
          </p>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className='container'>
            <div className='row'>
              <div className='col col--6'>
                <div className='card'>
                  <div className='card__header'>
                    <h3>Vibe Coding for Beginners</h3>
                  </div>
                  <div className='card__body'>
                    <p>
                      Complete guide to AI-assisted software development with
                      Cursor. Learn how to build applications using natural
                      language and AI tools.
                    </p>
                  </div>
                  <div className='card__footer'>
                    <Link
                      className='button button--secondary button--block'
                      to='/docs/howto/vibe-coding-for-beginners'
                    >
                      Read Guide
                    </Link>
                  </div>
                </div>
              </div>
              <div className='col col--6'>
                <div className='card'>
                  <div className='card__header'>
                    <h3>How to DOGE Your State</h3>
                  </div>
                  <div className='card__body'>
                    <p>
                      Guide for launching state-level transparent government
                      data initiatives. Learn the technical and community
                      aspects of open source government projects.
                    </p>
                  </div>
                  <div className='card__footer'>
                    <Link
                      className='button button--secondary button--block'
                      to='/docs/howto/how-to-doge-your-state'
                    >
                      Read Guide
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
