import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState('main');
  const mainScrollRef = useRef(null);
  const miniScrollRef = useRef(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const flip = {
    front: { rotateY: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
    back: { rotateY: 180, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const mainProjects = [
    {
      title: 'Weather App',
      description: 'Weather App built using Flutter and FireBase',
      extendedDescription: 'A mobile application providing real-time weather updates with a sleek UI, leveraging Firebase for data storage and Weather API for accurate forecasts.',
      image: 'https://www.shutterstock.com/image-photo/portland-or-usa-jan-2-600nw-2415110671.jpg',
      tags: ['Flutter', 'Firebase', 'Weather API'],
      github: 'https://github.com/AshenRuvinda/Weather_app_with_API_config',
    },
    {
      title: 'Point Of Sale System-POS',
      description: 'POS and Inventory Management System built using Python',
      extendedDescription: 'A desktop application for retail businesses, featuring inventory tracking, sales processing, and reporting, built with Python and a custom UI.',
      image: 'https://st.depositphotos.com/22091438/54245/v/450/depositphotos_542457226-stock-illustration-flat-woman-paying-by-pos.jpg',
      tags: ['Python'],
      github: 'https://github.com/AshenRuvinda/Python-pos-system',
    },
    
    {
      title: 'E-Commerce Website',
      description: 'Website created for a mobile phone sales company using React and Firebase',
      extendedDescription: 'A fully functional e-commerce platform for mobile phone sales, featuring product listings, cart functionality, and Firebase authentication.',
      image: 'https://www.techosquare.com/images/blog/best-technologies-build-custom-ecommerce-stores-home.jpg',
      tags: ['React', 'Firebase'],
      github: 'https://github.com/AshenRuvinda/E-Commerce-Website-MobileTech',
      website: 'https://ashenruvinda.github.io/E-Commerce-Website-MobileTech/',
    },
    {
      title: 'Cardamom Management System',
      description: 'The cardamom management system, using Python and SQL Server, manages suppliers, collections, drying, exports, stock, and analysis. It features a customtkinter UI, dashboard, and ADBMS_db database with recent fixes.',
      extendedDescription: 'A comprehensive system for managing cardamom supply chains, with a customtkinter UI, SQL Server database, and advanced analytics for stock and exports.',
      image: 'https://static.vecteezy.com/system/resources/thumbnails/018/903/306/small_2x/iot-internet-of-things-modern-agriculture-smart-farming-system-concept-internet-technology-that-connects-devices-and-tools-digital-computer-manage-control-vegetable-farm-in-agricultural-industry-photo.jpg',
      tags: ['Python', 'SQL'],
      github: 'https://github.com/AshenRuvinda/Cardamom_Management_System',
    },
    {
      title: 'Personal Portfolio-React',
      description: '',
      extendedDescription: 'A React JS portfolio website displays projects, skills, and achievements with dynamic, responsive components, offering smooth navigation, fast loading, and a professional online presence.',
      image: 'https://github.com/AshenRuvinda/ProjectImages/blob/master/Reactportfolio.png?raw=true',
      tags: ['React'],
      github: 'https://github.com/AshenRuvinda/portfolio_react',
    },
    {
      title: 'Project HillTop-E Commerce Web (ongoing-project)',
      description: '',
      extendedDescription: 'Redesigning HillTop Clothing’s website with React to improve UI/UX, performance, and support future e-commerce growth and scalability.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTphzn-B0t2cQzZgAvA2FXZkhTEkayMw26UqA&s',
      tags: ['React', 'MongoDB'],
      github: 'https://github.com/AshenRuvinda/Project-HillTop',
      website: 'https://project-hill-top.vercel.app/',
    },
    {
      title: 'Personal Portfolio',
      description: '',
      extendedDescription: 'A personal portfolio showcases your skills, projects, and contact info using HTML, CSS, and JavaScript with responsive design, animations, and interactive features for engagement.',
      image: 'https://img.freepik.com/free-vector/portfolio-update-concept-illustration_114360-4892.jpg',
      tags: ['Html', 'Css', 'JavaScript'],
      github: 'https://github.com/AshenRuvinda/PortfolioWEB-Html-Css-Js-',
      website: 'https://ashenruvinda.github.io/PortfolioWEB-Html-Css-Js-/',
    },
  ];

  const miniProjects = [
    {
      title: 'Real-Time Notification Admin App',
      description: 'Weather Notification Management App Built Using Flutter and Firebase to Send Real Time Notifications to Weather App',
      extendedDescription: 'An admin interface for managing real-time notifications for the Weather App, built with Flutter and Firebase for seamless push notifications.',
      image: 'https://st.depositphotos.com/34055376/59950/v/450/depositphotos_599509134-stock-illustration-minimal-notification-bell-icon-color.jpg',
      tags: ['Flutter', 'Firebase'],
      github: 'https://github.com/AshenRuvinda/Weather_app_admin-App-Flutter-Firebase-',
    },

    {
      title: 'Login Auth Html CSS & PHP',
      description: '',
      extendedDescription: 'Created user authentication system using HTML for Sign Up/Sign In pages and PHP for backend logic, connecting to a database to securely store, validate, and manage user credentials.',
      image: 'https://image.shutterstock.com/image-vector/twostep-verification-flat-illustration-vector-260nw-2408003415.jpg',
      tags: ['Html', 'Css', 'PHP'],
      github: 'https://github.com/AshenRuvinda/LoginAuthWithPHP-miniProject',
    },
    {
      title: 'Minimum Cost Flow Algorithm Real World Implementation',
      description: '',
      extendedDescription: 'Created a Python grocery delivery app using the Minimum Cost Flow algorithm to show nearest item locations with lowest delivery cost based on user input and availability.',
      image: 'https://img.freepik.com/free-vector/shopping-cart-with-bags-gifts-concept-illustration_114360-18775.jpg?semt=ais_hybrid&w=740',
      tags: ['Python'],
      github: 'https://github.com/AshenRuvinda/LankaQuickCartMCF',
    },
  ];

  const getTagColor = (tag) => {
    const colors = {
      Flutter: 'bg-blue-500 text-blue-100',
      Firebase: 'bg-orange-500 text-orange-100',
      'Weather API': 'bg-green-500 text-green-100',
      Python: 'bg-yellow-500 text-yellow-100',
      React: 'bg-emerald-500 text-emerald-100',
      SQL: 'bg-purple-500 text-purple-100',
      MongoDB: 'bg-green-600 text-green-100',
      Html: 'bg-red-500 text-red-100',
      Css: 'bg-blue-600 text-blue-100',
      JavaScript: 'bg-yellow-600 text-yellow-100',
      Tailwind: 'bg-teal-500 text-teal-100',
      PHP: 'bg-indigo-500 text-indigo-100',
    };
    return colors[tag] || 'bg-cyan-400 text-cyan-100';
  };

  const scroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = ref.current.offsetWidth * 0.8;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setFlippedCard(null); // Reset flipped cards when switching categories
  };

  return (
    <section id="projects" className="section" aria-label="Projects section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-2"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            My Projects
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            What I've been working on
          </motion.p>
          <div className="category-selector flex justify-center mt-6 relative">
            <motion.button
              className={`category-btn ${activeCategory === 'main' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('main')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={activeCategory === 'main' ? { color: '#3b82f6' } : { color: 'rgba(255, 255, 255, 0.6)' }}
              transition={{ duration: 0.2 }}
              aria-label="View Main Projects"
            >
              Main Projects
              {activeCategory === 'main' && (
                <motion.div
                  className="category-underline"
                  layoutId="category-underline"
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}
            </motion.button>
            <motion.button
              className={`category-btn ${activeCategory === 'mini' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('mini')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={activeCategory === 'mini' ? { color: '#3b82f6' } : { color: 'rgba(255, 255, 255, 0.6)' }}
              transition={{ duration: 0.2 }}
              aria-label="View Mini Projects"
            >
              Mini Projects
              {activeCategory === 'mini' && (
                <motion.div
                  className="category-underline"
                  layoutId="category-underline"
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* Main Projects Carousel */}
        <AnimatePresence>
          {activeCategory === 'main' && (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <button
                  className="carousel-button left-0"
                  onClick={() => scroll('left', mainScrollRef)}
                  aria-label="Scroll main projects carousel left"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div
                  className="carousel-container flex overflow-x-auto scroll-smooth"
                  ref={mainScrollRef}
                  role="group"
                  aria-label="Main project cards"
                >
                  {mainProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="project-card w-[320px] mx-3"
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.2 }}
                      onHoverStart={() => setFlippedCard(`main-${index}`)}
                      onHoverEnd={() => setFlippedCard(null)}
                      onClick={() => setFlippedCard(flippedCard === `main-${index}` ? null : `main-${index}`)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          className="project-item relative w-full h-full"
                          variants={flip}
                          initial="front"
                          animate={flippedCard === `main-${index}` ? 'back' : 'front'}
                          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
                        >
                          {/* Front Side */}
                          <motion.div
                            className="front absolute w-full h-full flex flex-col"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            <div className="project-img mb-4">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="rounded-lg w-full h-56 object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="project-content flex-grow">
                              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                              <div className="project-tags flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className={`project-tag ${getTagColor(tag)} px-2 py-1 rounded text-sm bg-opacity-30`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                          {/* Back Side */}
                          <motion.div
                            className="back absolute w-full h-full bg-gray-800 bg-opacity-90 rounded-lg p-6 flex flex-col justify-center"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                          >
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="mb-4 text-sm">{project.extendedDescription}</p>
                            <div className="flex flex-wrap gap-3 justify-center">
                              <a
                                href={project.github}
                                className="btn btn-primary btn-sm flex items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <i className="fas fa-eye mr-2"></i> View Project
                              </a>
                              {project.website && (
                                <a
                                  href={project.website}
                                  className="btn btn-outline btn-sm flex items-center"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <i className="fas fa-globe mr-2"></i> Visit Website
                                </a>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                <button
                  className="carousel-button right-0"
                  onClick={() => scroll('right', mainScrollRef)}
                  aria-label="Scroll main projects carousel right"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mini Projects Carousel */}
        <AnimatePresence>
          {activeCategory === 'mini' && (
            <motion.div
              key="mini"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <button
                  className="carousel-button left-0"
                  onClick={() => scroll('left', miniScrollRef)}
                  aria-label="Scroll mini projects carousel left"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div
                  className="carousel-container flex overflow-x-auto scroll-smooth"
                  ref={miniScrollRef}
                  role="group"
                  aria-label="Mini project cards"
                >
                  {miniProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="project-card w-[320px] mx-3"
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.2 }}
                      onHoverStart={() => setFlippedCard(`mini-${index}`)}
                      onHoverEnd={() => setFlippedCard(null)}
                      onClick={() => setFlippedCard(flippedCard === `mini-${index}` ? null : `mini-${index}`)}
                      whileHover={{ scale: 1.05 }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          className="project-item relative w-full h-full"
                          variants={flip}
                          initial="front"
                          animate={flippedCard === `mini-${index}` ? 'back' : 'front'}
                          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
                        >
                          {/* Front Side */}
                          <motion.div
                            className="front absolute w-full h-full flex flex-col"
                            style={{ backfaceVisibility: 'hidden' }}
                          >
                            <div className="project-img mb-4">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="rounded-lg w-full h-56 object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="project-content flex-grow">
                              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                              <div className="project-tags flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className={`project-tag ${getTagColor(tag)} px-2 py-1 rounded text-sm bg-opacity-30`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                          {/* Back Side */}
                          <motion.div
                            className="back absolute w-full h-full bg-gray-800 bg-opacity-90 rounded-lg p-6 flex flex-col justify-center"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                          >
                            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                            <p className="mb-4 text-sm">{project.extendedDescription}</p>
                            <div className="flex flex-wrap gap-3 justify-center">
                              <a
                                href={project.github}
                                className="btn btn-primary btn-sm flex items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <i className="fas fa-eye mr-2"></i> View Project
                              </a>
                              {project.website && (
                                <a
                                  href={project.website}
                                  className="btn btn-outline btn-sm flex items-center"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <i className="fas fa-globe mr-2"></i> Visit Website
                                </a>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                <button
                  className="carousel-button right-0"
                  onClick={() => scroll('right', miniScrollRef)}
                  aria-label="Scroll mini projects carousel right"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;