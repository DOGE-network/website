import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function Admin(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    // Redirect to the existing static admin page
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/index.html';
    }
  }, []);

  return (
    <Layout
      title={`Admin - ${siteConfig.title}`}
      description='Content management interface for the DOGE Network website'
    >
      <main className='admin-page'>
        <div className='admin-container'>
          <div className='admin-redirect-message'>
            <h2>Redirecting to Admin...</h2>
            <p>
              If you are not redirected automatically,{' '}
              <a href='/admin/index.html'>click here</a>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
