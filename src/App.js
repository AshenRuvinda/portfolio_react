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
import Chatbot from './components/Chatbot'; // ✅ Import your chatbot

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
      <Chatbot /> {/* ✅ Show chatbot after splash screen */}
    </div>
  );
};

export default App;
