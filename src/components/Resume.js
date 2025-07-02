import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie';
import animationData from './cartoon-character.json';
import './Resume.css';

const Resume = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const catAnimation = {
    hidden: { opacity: 0, y: '100%' },
    visible: { 
      opacity: 0.9, 
      y: 0, 
      transition: { 
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.5
      }
    }
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const resumeItems = {
    education: [
      {
        year: '2022 - Present',
        title: 'BSc in Software Engineering',
        institution: 'NSBM Green University',
        description: 'Third-year student pursuing Software Engineering, focusing on advanced programming concepts, system design, and agile methodologies.',
      },
      {
        year: '2019 - 2020',
        title: 'GCE AL - Maths Stream',
        institution: 'R/Eheliyagoda Central College',
        description: 'Successfully completed Advanced Level examinations with distinctions in Mathematics and Physics.',
      },
    ],
    experience: [
      // {
      //   year: '2023 - Present',
      //   title: 'Junior Software Developer (Part-time)',
      //   institution: 'InnoTech Solutions',
      //   description: 'Developed responsive web applications using React.js and Node.js, implemented RESTful APIs, and participated in sprint planning.',
      // },
      // {
      //   year: '2022 - 2023',
      //   title: 'Software Development Intern',
      //   institution: 'GlobalTech Corp',
      //   description: 'Contributed to frontend development using modern JavaScript frameworks and collaborated on cross-functional team projects.',
      // },
    ],
  };

  const toggleExpand = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <section id="resume" className="resume-section">
      <div className="resume-container">
        <motion.div 
          className="resume-header"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          <h2 className="resume-title">My Resume</h2>
          <p className="resume-subtitle">Education & Professional Experience</p>
        </motion.div>
        <div className="resume-grid">
          <div className="resume-column">
            <h3 className="resume-section-title">Education</h3>
            <div className="timeline">
              {resumeItems.education.map((item, index) => (
                <motion.div
                  key={index}
                  className="resume-item"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.3 }}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <span className="resume-year">{item.year}</span>
                    <h3 className="resume-item-title">{item.title}</h3>
                    <h4 className="resume-item-institution">{item.institution}</h4>
                    <button 
                      className="expand-button"
                      onClick={() => toggleExpand(`edu-${index}`)}
                    >
                      {expandedItem === `edu-${index}` ? 'Hide' : 'Show'} Details
                    </button>
                    <AnimatePresence>
                      {expandedItem === `edu-${index}` && (
                        <motion.p
                          className="resume-item-description"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="resume-column">
            <h3 className="resume-section-title">Experience</h3>
            <div className="timeline">
              {resumeItems.experience.length > 0 ? (
                resumeItems.experience.map((item, index) => (
                  <motion.div
                    key={index}
                    className="resume-item"
                    variants={fadeIn}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.3 }}
                  >
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <span className="resume-year">{item.year}</span>
                      <h3 className="resume-item-title">{item.title}</h3>
                      <h4 className="resume-item-institution">{item.institution}</h4>
                      <button 
                        className="expand-button"
                        onClick={() => toggleExpand(`exp-${index}`)}
                      >
                        {expandedItem === `exp-${index}` ? 'Hide' : 'Show'} Details
                      </button>
                      <AnimatePresence>
                        {expandedItem === `exp-${index}` && (
                          <motion.p
                            className="resume-item-description"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.p 
                  className="resume-no-experience"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                >
                  No professional experience listed yet. Explore my projects to see my skills in action!
                </motion.p>
              )}
            </div>
          </div>
        </div>
        <motion.div
          className="cartoon-character"
          variants={catAnimation}
          initial="hidden"
          animate="visible"
        >
          <Lottie options={lottieOptions} />
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;