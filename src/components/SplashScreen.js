import React, { useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    // Timeout for 5-second duration
    const timeout = setTimeout(onComplete, 5000);

    // Cleanup
    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="logo-container">
          <i className="fab fa-github logo logo-1"></i>
          <i className="fab fa-html5 logo logo-2"></i>
          <i className="fab fa-react logo logo-3"></i>
          <i className="fab fa-php logo logo-4"></i>
          <i className="fab fa-python logo logo-5"></i>
          <i className="fab fa-android logo logo-6"></i>
          <i className="fab fa-js logo logo-7"></i>
          <i className="fab fa-css3-alt logo logo-8"></i>
          <i className="fab fa-node-js logo logo-9"></i>
          <i className="fab fa-aws logo logo-10"></i>
          <i className="fab fa-docker logo logo-11"></i>
          <i className="fab fa-git logo logo-12"></i>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;