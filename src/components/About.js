import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const About = () => {
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Array for floating elements with varied positions
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
    { type: 'icon', icon: 'fas fa-fire', className: 'tech-icon tech-icon-4', label: 'Firebase' },
    { type: 'icon', icon: 'fas fa-mobile-alt', className: 'tech-icon tech-icon-5', label: 'Flutter' },
  ];

  return (
    <section id="about" className="section about-section relative overflow-hidden">
      <div className="about-gradient"></div>
      <div className="about-particles absolute inset-0 pointer-events-none">
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
        <motion.div
          className="text-center mb-12"
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
            About Me
          </h2>
          <p className="text-lg text-gray-200">Discover my journey in software engineering</p>
        </motion.div>
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            className="lg:w-5/12 mb-8 lg:mb-0"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            <div className="about-img relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-lg opacity-20 animate-pulse"></div>
              <img
                src="https://github.com/AshenRuvinda/ProjectImages/blob/master/IMG_6799-removebg-preview.png?raw=true"
                alt="Ashen Ruvinda, Software Engineer"
                className="rounded-lg w-full h-full object-cover shadow-2xl border-4 border-gray-800"
              />
              <div className="absolute inset-0 rounded-lg border-2 border-cyan-400 opacity-70 animate-spin-slow"></div>
            </div>
          </motion.div>
          <motion.div
            className="lg:w-7/12 card p-8 bg-gray-900 bg-opacity-80"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            <div className="about-content">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-cyan-400">
                Software Engineer & Innovator
              </h3>
              <p className="text-lg text-gray-200 mb-4">
                I'm a passionate software engineering student dedicated to crafting innovative solutions that bridge technology and user needs.
              </p>
              <p className="text-gray-300 mb-6">
                With expertise in full-stack development and a love for learning, I tackle complex challenges with clean, efficient code. My goal is to create impactful software that enhances user experiences while staying ahead in the ever-evolving tech landscape.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <ul className="list-unstyled space-y-4">
                  <li className="flex items-center gap-3">
                    <i className="fas fa-user icon text-xl text-cyan-400"></i>
                    <span><strong>Name:</strong> Ashen Ruvinda</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-envelope icon text-xl text-cyan-400"></i>
                    <span><strong>Email:</strong> maaruvinda@students.nsbm.ac.lk</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-phone icon text-xl text-cyan-400"></i>
                    <span><strong>Phone:</strong> 076 1511 231</span>
                  </li>
                </ul>
                <ul className="list-unstyled space-y-4">
                  <li className="flex items-center gap-3">
                    <i className="fas fa-calendar icon text-xl text-cyan-400"></i>
                    <span><strong>Age:</strong> 24</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-graduation-cap icon text-xl text-cyan-400"></i>
                    <span><strong>DegreesticksDegree:</strong> BSc Software Engineering</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt icon text-xl text-cyan-400"></i>
                    <span><strong>Location:</strong> Homagama, Sri Lanka</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="btn btn-primary flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-gray-900 font-semibold hover:from-cyan-300 hover:to-teal-300 transition-all duration-300"
                  aria-label="Hire Ashen Ruvinda"
                >
                  <i className="fas fa-briefcase"></i> Hire Me
                </Link>
                <a
                  href="https://drive.google.com/uc?export=download&id=1L_Oapc_ugPqTkShoDWNmGE3JsHBLzvjS"
                  className="btn btn-outline flex items-center justify-center gap-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
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