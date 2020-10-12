// Packages
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Project
import { trackPageView } from '../../utils/ga';
import './styles.scss';

const Error404 = (): JSX.Element => {
  useEffect(() => {
    trackPageView('404');
  }, []);

  return (
    <div className="error-page">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/boards">Go to boards</Link>
    </div>
  );
}

export default Error404;