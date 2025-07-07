import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Home.css';

const Home = () => {
  const [projectCount, setProjectCount] = useState(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    'Full-Stack Developer',
    'Software Engineer',
    'UI/UX Enthusiast',
    'Tech Innovator',
    'Problem Solver',
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const staggerChild = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 15 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const letterVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  const socialLinkVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, type: 'spring', stiffness: 100 } },
  };

  const socialLinks = [
    { icon: 'fab fa-github', href: 'https://github.com/AshenRuvinda', label: 'GitHub' },
    { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/in/ashen-ruvinda-929b83345', label: 'LinkedIn' },
    { icon: 'fab fa-twitter', href: 'https://twitter.com', label: 'Twitter' },
  ];

  const floatingElements = [
    { type: 'bracket', symbol: '<', className: 'home-bracket-1', label: 'Opening bracket' },
    { type: 'bracket', symbol: '>', className: 'home-bracket-2', label: 'Closing bracket' },
    { type: 'bracket', symbol: '<', className: 'home-bracket-3', label: 'Opening bracket' },
    { type: 'bracket', symbol: '>', className: 'home-bracket-4', label: 'Closing bracket' },
    { type: 'bracket', symbol: '</', className: 'home-bracket-5', label: 'Closing tag' },
    { type: 'bracket', symbol: '/>', className: 'home-bracket-6', label: 'Self-closing tag' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const fetchProjectCount = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProjectCount(7);
    } catch (error) {
      console.error('Error fetching project count:', error);
      setProjectCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (projectCount === null) return;
    let start = 0;
    const end = projectCount;
    const duration = 1200;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayCount(end);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [projectCount]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  
  const helloText = "Hello, I'm".split('');
  const nameText = "Ashen Ruvinda".split('');
  const subtitleText = "I'm a ".split('');

  return (
    <div className="home-hero-section">
      <div className="home-hero-background">
        <div className="home-hero-gradient-overlay" />
        <div className="home-particles-container">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="home-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="home-floating-elements">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={`home-floating-element ${element.className}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.15, 0.3, 0.15], 
              scale: [0.9, 1.1, 0.9],
              rotate: [0, 90, 180]
            }}
            transition={{ 
              duration: 8 + index * 0.5, 
              repeat: Infinity, 
              delay: index * 0.3 
            }}
            style={{
              left: `${15 + (index * 20) % 70}%`,
              top: `${20 + (index * 25) % 60}%`,
            }}
            role="presentation"
            aria-hidden="true"
          >
            {element.symbol}
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={fetchProjectCount}
        className="home-project-count-btn"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading}
        aria-label="Fetch project count"
      >
        <i className="fas fa-folder" />
      </motion.button>

      <AnimatePresence>
        {projectCount !== null && (
          <motion.div
            className="home-project-bubble"
            variants={bubbleVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            role="status"
          >
            <span>
              {isLoading ? 'Loading...' : displayCount > 0 ? `${displayCount} Projects` : 'No Projects Found'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="home-hero-container">
        <div className="home-hero-grid">
          <motion.div
            className="home-hero-content"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerChild}>
              <h1 className="home-hero-title">
                <span className="block">
                  {helloText.map((letter, index) => (
                    <motion.span
                      key={`hello-${index}`}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.05 }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </span>
                <span className="home-hero-name">
                  {nameText.map((letter, index) => (
                    <motion.span
                      key={`name-${index}`}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: (helloText.length + index) * 0.05 }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </motion.div>

            <motion.div variants={staggerChild} className="home-hero-subtitle">
              <span>
                {subtitleText.map((letter, index) => (
                  <motion.span
                    key={`subtitle-${index}`}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: (helloText.length + nameText.length + index) * 0.05 }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                  className="home-role-text"
                >
                  {roles[currentRole]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              variants={staggerChild}
              className="home-hero-description"
            >
              Crafting innovative digital solutions with clean, efficient code. Passionate about transforming 
              complex challenges into seamless, user-friendly experiences that make a difference.
            </motion.p>

            <motion.div
              variants={staggerChild}
              className="home-hero-buttons"
            >
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="home-btn home-btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Get in touch"
              >
                Get In Touch
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="home-btn home-btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View my work"
              >
                View My Work
              </motion.button>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="home-social-links"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home-social-link"
                  variants={socialLinkVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Visit my ${link.label} profile`}
                >
                  <i className={link.icon} />
                  <span className="home-social-tooltip">{link.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="home-hero-image-container"
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="home-image-wrapper">
              <motion.div
                className="home-rotating-ring home-ring-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                whileHover={{ rotate: 380, transition: { duration: 1 } }}
              />
              <motion.div
                className="home-rotating-ring home-ring-2"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                whileHover={{ rotate: -380, transition: { duration: 1 } }}
              />
              <div className="home-image-glow" />
              <img
                src="https://raw.githubusercontent.com/AshenRuvinda/ProjectImages/master/IMG_6799-removebg-preview.png"
                alt="Ashen Ruvinda, Software Engineer"
                className="home-profile-image"
              />
              <motion.div
                className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Available 🟢
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                Full Stack 💻
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      
    </div>
  );
};

export default Home;