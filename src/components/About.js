import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import './About.css';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const floatingElements = [
    { type: 'bracket', symbol: '<', className: 'code-bracket code-bracket-1' },
    { type: 'bracket', symbol: '>', className: 'code-bracket code-bracket-2' },
    { type: 'bracket', symbol: '<', className: 'code-bracket code-bracket-3' },
    { type: 'bracket', symbol: '>', className: 'code-bracket code-bracket-4' },
    { type: 'bracket', symbol: '</', className: 'code-bracket code-bracket-5' },
    { type: 'bracket', symbol: '/>', className: 'code-bracket code-bracket-6' },
    { type: 'icon', icon: 'fab fa-python', className: 'tech-symbol tech-symbol-1', label: 'Python' },
    { type: 'icon', icon: 'fab fa-react', className: 'tech-symbol tech-symbol-2', label: 'React' },
    { type: 'icon', icon: 'fab fa-github', className: 'tech-symbol tech-symbol-3', label: 'GitHub' },
    { type: 'icon', icon: 'fas fa-fire', className: 'tech-symbol tech-symbol-4', label: 'Firebase' },
    { type: 'icon', icon: 'fas fa-mobile-alt', className: 'tech-symbol tech-symbol-5', label: 'Flutter' },
  ];

  return (
    <section id="about" className="section-about">
      <div className="gradient-bg"></div>
      <div className="particles-container">
        <div className="particle particle-dot-1"></div>
        <div className="particle particle-dot-2"></div>
        <div className="particle particle-dot-3"></div>
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className={element.className}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: index * 0.2 }}
          >
            {element.type === 'bracket' ? (
              element.symbol
            ) : (
              <i className={element.icon} title={element.label}></i>
            )}
          </motion.div>
        ))}
      </div>
      <div className="content-wrapper">
        <motion.div
          className="text-aligned-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <h2 className="heading-primary">
            About Me
          </h2>
          <p className="heading-secondary">Discover my journey in software engineering</p>
        </motion.div>
        <div className="layout-flex">
          <motion.div
            className="image-wrapper"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="profile-picture">
              <div className="image-overlay"></div>
              <img
                src="https://github.com/AshenRuvinda/ProjectImages/blob/master/IMG_6799-removebg-preview.png?raw=true"
                alt="Ashen Ruvinda, Software Engineer"
                className="profile-img"
              />
              <div className="image-frame"></div>
            </div>
          </motion.div>
          <motion.div
            className="info-card"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <div className="about-content">
              <h3 className="card-title">
                Software Engineer & Innovator
              </h3>
              <p className="card-text">
                I'm a passionate software engineering student dedicated to crafting innovative solutions that bridge technology and user needs.
              </p>
              <p className="card-subtext">
                With expertise in full-stack development and a love for learning, I tackle complex challenges with clean, efficient code. My goal is to create impactful software that enhances user experiences while staying ahead in the ever-evolving tech landscape.
              </p>
              <div className="info-layout">
                <ul className="info-items">
                  <li className="info-entry">
                    <i className="fas fa-user icon-symbol"></i>
                    <span><strong>Name:</strong> Ashen Ruvinda</span>
                  </li>
                  <li className="info-entry">
                    <i className="fas fa-envelope icon-symbol"></i>
                    <span><strong>Email:</strong> maaruvinda@students.nsbm.ac.lk</span>
                  </li>
                  <li className="info-entry">
                    <i className="fas fa-phone icon-symbol"></i>
                    <span><strong>Phone:</strong> 076 1511 231</span>
                  </li>
                </ul>
                <ul className="info-items">
                  <li className="info-entry">
                    <i className="fas fa-calendar icon-symbol"></i>
                    <span><strong>Age:</strong> 24</span>
                  </li>
                  <li className="info-entry">
                    <i className="fas fa-graduation-cap icon-symbol"></i>
                    <span><strong>Degree:</strong> BSc Software Engineering</span>
                  </li>
                  <li className="info-entry">
                    <i className="fas fa-map-marker-alt icon-symbol"></i>
                    <span><strong>Location:</strong> Homagama, Sri Lanka</span>
                  </li>
                </ul>
              </div>
              <div className="buttons-group">
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="btn-primary"
                  aria-label="Hire Ashen Ruvinda"
                >
                  <i className="fas fa-briefcase"></i> Hire Me
                </Link>
                <a
                  href="https://drive.google.com/uc?export=download&id=1L_Oapc_ugPqTkShoDWNmGE3JsHBLzvjS"
                  className="btn-outline"
                  aria-label="Download Ashen's CV"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-download"></i> Download CV
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;