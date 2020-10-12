// Packages
import React, { useEffect } from 'react';

// Project
import { trackPageView } from '../../utils/ga';
import './styles.scss';

const AuthCallback = () => {
  useEffect(() => {
    trackPageView('OAuth Callback');
    window.close();
  }, []);

  return (
    <div className="auth-callback">
      <p className="auth-callback__text">This windows will be cloosed soon.</p>
    </div>
  )
}

export default AuthCallback;