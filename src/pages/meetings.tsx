import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

export default function Meetings() {
  const history = useHistory();

  useEffect(() => {
    // Redirect to the proper docs page
    history.replace('/docs/meetings');
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
      <p>Redirecting to meetings documentation...</p>
      <p>
        If you're not redirected automatically,{' '}
        <a href='/docs/meetings'>click here</a>.
      </p>
    </div>
  );
}
