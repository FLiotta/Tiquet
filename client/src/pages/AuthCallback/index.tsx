// Packages
import React, { useEffect } from 'react';

// Project
import './styles.scss';

const AuthCallback = () => {
  useEffect(() => {
    window.close();
  }, []);

  return (
    <div className="auth-callback">
      <p className="auth-callback__text">This windows will be cloosed soon.</p>
    </div>
  )
}

export default AuthCallback;