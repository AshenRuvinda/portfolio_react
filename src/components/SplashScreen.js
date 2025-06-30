import React, { useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    setTimeout(onComplete, 3000);
  }, [onComplete]);

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black flex items-center justify-center z-50">
      <h1 className="text-4xl font-bold animate-pulse text-cyan-400 flex items-center">
        <i className="fas fa-rocket mr-2"></i> Welcome to My Portfolio
      </h1>
    </div>
  );
};

export default SplashScreen;