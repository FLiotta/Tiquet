// Packages
import React from 'react';
import { Link } from 'react-router-dom';

// Project
import './styles.scss';

const Error404 = (): JSX.Element => (
  <div className="error-page">
    <h1>404</h1>
    <p>Page not found.</p>
    <Link to="/boards">Go to boards</Link>
  </div>
)

export default Error404;