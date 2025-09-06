import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SplashScreen from './components/SplashScreen';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import DynamicMusicPlayer from './components/DynamicMusicPlayer'; // ✅ Import Dynamic Music Player

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Automatically hide splash screen after 3 seconds (optional)
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="app">
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
      <Chatbot /> {/* ✅ Chatbot component */}
      <DynamicMusicPlayer /> {/* ✅ Dynamic Music Player component */}
    </div>
  );
};

export default App;