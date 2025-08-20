import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Schedule() {
  const history = useHistory();

  useEffect(() => {
    // Redirect to the proper docs page
    history.replace('/docs/schedule');
  }, [history]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <p>Redirecting to schedule documentation...</p>
      <p>
        If you're not redirected automatically,{' '}
        <a href='/docs/schedule'>click here</a>.
      </p>
    </div>
  );
}
