import React from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { Link } from 'react-scroll';

const Home = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const socialLinks = [
    { icon: 'fab fa-github', href: 'https://github.com/AshenRuvinda', label: 'GitHub' },
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/ashen-ruvinda-929b83345', label: 'LinkedIn' },
    { icon: 'fab fa-twitter', href: '#', label: 'Twitter' },
  ];

  // Array for floating elements (brackets and tech logos)
  const floatingElements = [
    { type: 'bracket', symbol: '<', className: 'bracket bracket-1' },
    { type: 'bracket', symbol: '>', className: 'bracket bracket-2' },
    { type: 'bracket', symbol: '<', className: 'bracket bracket-3' },
    { type: 'bracket', symbol: '>', className: 'bracket bracket-4' },
    { type: 'bracket', symbol: '</', className: 'bracket bracket-5' },
    { type: 'bracket', symbol: '/>', className: 'bracket bracket-6' },
    { type: 'icon', icon: 'fab fa-python', className: 'tech-icon tech-icon-1', label: 'Python' },
    { type: 'icon', icon: 'fab fa-react', className: 'tech-icon tech-icon-2', label: 'React' },
    { type: 'icon', icon: 'fab fa-github', className: 'tech-icon tech-icon-3', label: 'GitHub' },
    { type: 'icon', icon: 'fas fa-fire', className: 'tech-icon tech-icon-4', label: 'Firebase' }, // Using fa-fire as a placeholder for Firebase
    { type: 'icon', icon: 'fas fa-mobile-alt', className: 'tech-icon tech-icon-5', label: 'Flutter' }, // Using fa-mobile-alt as a placeholder for Flutter
  ];

  return (
    <section id="hero" className="section hero-section relative overflow-hidden">
      <div className="hero-gradient"></div>
      <div className="hero-particles absolute inset-0 pointer-events-none">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        {floatingElements.map((element, index) => (
          <div key={index} className={element.className} aria-hidden="true">
            {element.type === 'bracket' ? (
              element.symbol
            ) : (
              <i className={element.icon} title={element.label}></i>
            )}
          </div>
        ))}
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            className="lg:w-1/2 hero-content text-center lg:text-left"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400"
              variants={fadeIn}
            >
              Hey, I'm Ashen Ruvinda
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl mb-6"
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
                typeSpeed={60}
                backSpeed={40}
                loop
                className="text-cyan-400 font-semibold"
              />
            </motion.h2>
            <motion.p
              className="mb-8 text-lg text-gray-200 max-w-2xl mx-auto lg:mx-0"
              variants={fadeIn}
              transition={{ delay: 0.4 }}
            >
              Building innovative digital solutions with clean, efficient code. Passionate about transforming complex challenges into user-friendly experiences.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeIn}
              transition={{ delay: 0.6 }}
            >
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="btn btn-primary flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-gray-900 font-semibold hover:from-cyan-300 hover:to-teal-300 transition-all duration-300"
                aria-label="Get in touch with Ashen"
              >
                <i className="fas fa-envelope"></i> Get In Touch
              </Link>
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="btn btn-outline flex items-center justify-center gap-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
                aria-label="View Ashen's projects"
              >
                <i className="fas fa-briefcase"></i> View My Work
              </Link>
            </motion.div>
            <motion.div
              className="flex gap-4 justify-center lg:justify-start mt-6"
              variants={fadeIn}
              transition={{ delay: 0.8 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Visit Ashen's ${link.label} profile`}
                >
                  <i className={`${link.icon} text-2xl`}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="lg:w-1/2 hero-img mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full opacity-20 animate-pulse"></div>
              <img
                src="https://github.com/AshenRuvinda/ProjectImages/blob/master/IMG_6799-removebg-preview.png?raw=true"
                alt="Ashen Ruvinda, Software Engineer"
                className="rounded-full w-full h-full object-cover shadow-2xl border-4 border-gray-800"
              />
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400 opacity-70 animate-spin-slow"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;