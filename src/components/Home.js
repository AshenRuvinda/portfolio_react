import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { Link } from 'react-scroll';
import '../styles/App.css';

const Home = () => {
  const [projectCount, setProjectCount] = useState(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, scale: 0.5, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  const socialLinks = [
    { icon: 'fab fa-github', href: 'https://github.com/AshenRuvinda', label: 'GitHub' },
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/ashen-ruvinda-929b83345', label: 'LinkedIn' },
    { icon: 'fab fa-twitter', href: 'https://twitter.com', label: 'Twitter' },
  ];

  const floatingElements = [
    { type: 'bracket', symbol: '<', className: 'bracket bracket-1', label: 'Opening bracket' },
    { type: 'bracket', symbol: '>', className: 'bracket bracket-2', label: 'Closing bracket' },
    { type: 'bracket', symbol: '<', className: 'bracket bracket-3', label: 'Opening bracket' },
    { type: 'bracket', symbol: '>', className: 'bracket bracket-4', label: 'Closing bracket' },
    { type: 'bracket', symbol: '</', className: 'bracket bracket-5', label: 'Closing tag' },
    { type: 'bracket', symbol: '/>', className: 'bracket bracket-6', label: 'Self-closing tag' },
    { type: 'icon', icon: 'fab fa-python', className: 'tech-icon tech-icon-1', label: 'Python' },
    { type: 'icon', icon: 'fab fa-react', className: 'tech-icon tech-icon-2', label: 'React' },
    { type: 'icon', icon: 'fab fa-github', className: 'tech-icon tech-icon-3', label: 'GitHub' },
    { type: 'icon', icon: 'fas fa-fire', className: 'tech-icon tech-icon-4', label: 'Firebase' },
    { type: 'icon', icon: 'fas fa-mobile-alt', className: 'tech-icon tech-icon-5', label: 'Flutter' },
  ];

  // Mock function to simulate fetching project count
  const fetchProjectCount = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
      setProjectCount(7); // Mock project count
    } catch (error) {
      console.error('Error fetching project count:', error);
      setProjectCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  // Animate count from 0 to projectCount
  useEffect(() => {
    if (projectCount === null) return;
    let start = 0;
    const end = projectCount;
    const duration = 1500; // 1.5 seconds
    const increment = end / (duration / 16); // ~60fps
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

  return (
    <section id="hero" className="section hero-section relative overflow-hidden">
      <div className="hero-gradient"></div>
      <div className="hero-particles absolute inset-0 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={element.className}
            whileHover={{ scale: 1.2, color: '#3b82f6' }}
            transition={{ duration: 0.3 }}
            aria-label={element.label}
          >
            {element.type === 'bracket' ? (
              element.symbol
            ) : (
              <i className={element.icon} title={element.label}></i>
            )}
          </motion.div>
        ))}
      </div>
      <motion.button
        onClick={fetchProjectCount}
        className="project-count-btn absolute bottom-5 right-5"
        aria-label="Load number of projects completed"
        whileHover={{ scale: 1.1, rotate: 5, boxShadow: '0 0 25px rgba(59, 130, 246, 0.7)' }}
        whileTap={{ scale: 0.9 }}
        disabled={isLoading}
      >
        <i className="fas fa-folder-open"></i>
      </motion.button>
      {projectCount !== null && (
        <motion.div
          className="project-count-bubble absolute bottom-16 right-5"
          variants={bubbleVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="text-lg font-bold">
            {isLoading ? 'Loading...' : displayCount > 0 ? `${displayCount} Projects` : 'No Projects Found'}
          </span>
        </motion.div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            className="lg:w-1/2 hero-content text-center lg:text-left"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-6xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-teal-500"
              variants={fadeIn}
            >
              Hey, I'm Ashen Ruvinda
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl lg:text-3xl mb-6"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              I'm a{' '}
              <ReactTyped
                strings={[
                  'Full-Stack Developer',
                  'Software Engineer',
                  'UI/UX Enthusiast',
                  'Tech Innovator',
                  'Problem Solver',
                ]}
                typeSpeed={80}
                backSpeed={50}
                loop
                className="text-cyan-400 font-semibold"
              />
            </motion.h2>
            <motion.p
              className="mb-6 text-base md:text-lg text-gray-100 max-w-xl mx-auto lg:mx-0"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              Crafting innovative digital solutions with clean, efficient code. Passionate about transforming complex challenges into seamless, user-friendly experiences.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              variants={fadeIn}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="btn btn-primary flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-900 font-semibold hover:from-cyan-400 hover:to-teal-400 transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="Get in touch with Ashen"
              >
                <i className="fas fa-envelope"></i> Get In Touch
              </Link>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="btn btn-outline flex items-center justify-center gap-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
                aria-label="View Ashen's projects"
              >
                <i className="fas fa-briefcase"></i> View My Work
              </Link>
            </motion.div>
            <motion.div
              className="flex gap-5 justify-center lg:justify-start mt-5"
              variants={fadeIn}
              transition={{ delay: 0.8 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Visit Ashen's ${link.label} profile`}
                >
                  <i className={`${link.icon} text-2xl`}></i>
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="lg:w-1/2 hero-img mt-6 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-80 lg:h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full opacity-20 animate-pulse"></div>
              <img
                src="https://raw.githubusercontent.com/AshenRuvinda/ProjectImages/master/IMG_6799-removebg-preview.png"
                alt="Ashen Ruvinda, Software Engineer"
                className="rounded-full w-full h-full object-cover shadow-2xl border-4 border-gray-800"
              />
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500 opacity-70 animate-spin-slow"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;