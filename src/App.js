import React, { useState } from 'react';
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


const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="app">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;