import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const [flippedCard, setFlippedCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState('main');
  const [currentIndex, setCurrentIndex] = useState({ main: 0, mini: 0, certifications: 0 });
  const [shuffleKey, setShuffleKey] = useState(0);

  const stackVariants = {
    hidden: { 
      opacity: 0, 
      rotateZ: Math.random() * 20 - 10,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      scale: 0.8
    },
    visible: (i) => ({
      opacity: i === 0 ? 1 : 0.7 - (i * 0.15),
      rotateZ: i * 2 + (Math.random() * 10 - 5),
      x: i * 8 + (Math.random() * 20 - 10),
      y: i * 6 + (Math.random() * 15 - 7.5),
      scale: 1 - (i * 0.05),
      zIndex: 10 - i,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    exit: {
      opacity: 0,
      rotateZ: Math.random() * 40 - 20,
      x: Math.random() * 200 - 100,
      y: -100,
      scale: 0.8,
      transition: { duration: 0.4 }
    }
  };

  const mainProjects = [
    {
      title: 'Inventory Management System + POS System',
      description: '',
      extendedDescription: 'A MERN Stack Inventory Management + POS system with role-based login, real-time database synchronization, stock tracking, cashier account management, and a clean Tailwind CSS interface for smooth business operations.',
      image: 'https://www.tsiservice.com/wp-content/uploads/2022/05/TSI-POS-Systems-header-1000x500.jpeg',
      tags: ['React', 'Tailwind', 'MongoDB', 'Node.js', 'Express'], 
      github: 'https://github.com/AshenRuvinda/MERN-POS',
    },
    {
      title: 'Task Flow-Advanced To-Do Application',
      description: '',
      extendedDescription: 'This is an Advanced To do application that I created using the Mern Stack. It is designed with secure login features along with User Profile Management and works with a NodeJs Backend and Mongodb database.',
      image: 'https://bordio.com/wp-content/themes/understrap/images/to-do-list/to-do-list-board-xl-1x.webp',
      tags: ['React', 'Tailwind', 'MongoDB', 'Node.js', 'Express'], 
      github: 'https://github.com/AshenRuvinda/MERN-TODOapp',
    },
    {
      title: 'Weather-Pro',
      description: '',
      extendedDescription: 'Weather Forecast Website created using the MERN Stack. Frontend & Backend deployed using Vercel and Render. Access below.',
      image: 'https://cdn.dribbble.com/userupload/18456569/file/original-7490c73afd13e8a2523fbe2c34f6853b.png?resize=400x0',
      tags: ['React', 'Tailwind', 'MongoDB', 'Node.js', 'Weather API'], 
      github: 'https://github.com/AshenRuvinda/MERN-Weather-Forcast-web',
      website: 'https://weather-pro-web.vercel.app/'
    },
    {
      title: 'Lock-Box Password and Card Details Wallet',
      description: '',
      extendedDescription: 'Password Wallet is a secure Next.js app using TypeScript, Tailwind CSS, and MongoDB to manage and store user passwords through a responsive, modern interface with scalable, full-stack architecture.',
      image: 'https://pmecdn.protonweb.com/image-transformation/?s=c&image=images%2Ff_auto%2Cq_auto%2Fv1707559420%2Fwp-pme%2FAre-password-managers-safe_-blog%402x%2FAre-password-managers-safe_-blog%402x.png%3F_i%3DAA',
      tags: ['Next.js', 'Tailwind', 'MongoDB', 'TypeScript'],
      github: 'https://github.com/AshenRuvinda/Password-Wallet',
    },
    {
      title: 'Mini MCQ LMS',
      description: '',
      extendedDescription: 'A small LMS designed for teachers and students to interact with each other and discuss MCQ questions. It was built using the Mern Stack. There are small errors. Still under development.',
      image: 'https://media.istockphoto.com/id/1451316016/photo/lms-learning-management-system-for-lesson-and-online-education-course-application-study-e.jpg?s=612x612&w=0&k=20&c=fRH0AanVP3IkjZtYNwJiyALkAvN3plLtrcPd1L2MrJo=',
      tags: ['React', 'Express', 'MongoDB', 'Node.js'],
      github: 'https://github.com/AshenRuvinda/MERN-MCQ-LMSminiproject',
    },
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
      extendedDescription: 'Redesigning HillTop Clothing website with React to improve UI/UX, performance, and support future e-commerce growth and scalability.',
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
    {
      title: "MERN Stack Login Auth",
      description: "A MERN stack app with user registration, login, and JWT-based authentication, featuring a responsive UI with Tailwind CSS and MongoDB storage.",
      extendedDescription: "Built a's full-stack MERN auth app with JWT, user registration/login, protected routes, Tailwind UI, admin user view, client-side validation, and MongoDB Compass support.",
      image: "https://img.freepik.com/free-vector/secure-login-concept-illustration_114360-4685.jpg?semt=ais_hybrid&w=740",
      tags: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Tailwind CSS"],
      github: "https://github.com/AshenRuvinda/ReactNativeLoginAuth-miniproject"
    },
    {
      title: "MERN Web Applications For Data Sending & Showing",
      description: "etc",
      extendedDescription: "MERN web apps use MongoDB, React, and Node.js to send, store, and display data with dynamic, real-time user interaction.",
      image: "https://www.differenzsystem.com/images/back-end-development/web-development.webp",
      tags: ["React", "Node.js", "MongoDB"],
      github: "https://github.com/AshenRuvinda/MERNgetpost-miniproject"
    },
    {
      title: "NextJS Login Auth Form",
      description: "etc",
      extendedDescription: "A login authentication form designed to practice NextJS. Password encryption has also been done using Bcrypt with a secure login.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn33FOolty9CbWrCyAeyyE1k1gWIjc2pSU9g&s",
      tags: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
      github: "https://github.com/AshenRuvinda/NextjsAuthminiproject"
    }
  ];

  const certifications = [
    {
      title: 'Master Java Visually: A Complete A-Z Bootcamp for Beginners',
      description: 'Certification in Full Stack Web Development from Coursera',
      extendedDescription: 'I completed the Master Java Visually course by Harish Anbalagan on Udemy, covering all required video content.',
      image: 'https://github.com/AshenRuvinda/ProjectImages/blob/master/Certifications/Master%20Java%20Visually.jpg?raw=true',
      tags: ['Udemy', 'Java'],
      link: 'https://drive.google.com/file/d/1QRAyq8WEwAUNYe1R83xAVMzwe4MomHE8/view?usp=sharing',
    },
  ];

  const getTagClass = (tag) => {
    const tagMap = {
      'Flutter': 'tag-flutter',
      'Firebase': 'tag-firebase',
      'Weather API': 'tag-weather-api',
      'Python': 'tag-python',
      'React': 'tag-react',
      'SQL': 'tag-sql',
      'MongoDB': 'tag-mongodb',
      'Html': 'tag-html',
      'Css': 'tag-css',
      'JavaScript': 'tag-javascript',
      'Tailwind': 'tag-tailwind',
      'Tailwind CSS': 'tag-tailwind-css',
      'PHP': 'tag-php',
      'MERN': 'tag-mern',
      'Express.js': 'tag-express-js',
      'Node.js': 'tag-node-js',
      'JWT': 'tag-jwt',
      'Authentication': 'tag-authentication',
      'Figma': 'tag-figma',
      'Adobe XD': 'tag-adobe-xd',
      'Photoshop': 'tag-photoshop',
      'Next.js': 'tag-next-js',
      'Coursera': 'tag-coursera',
      'Full Stack': 'tag-full-stack',
      'Web Development': 'tag-web-development',
      'Udemy': 'tag-udemy',
      'Mobile Development': 'tag-mobile-development',
      'AWS': 'tag-aws',
      'Cloud Computing': 'tag-cloud-computing',
      'TypeScript': 'tag-typescript',
      'Express': 'tag-express-js',
      'Java': 'tag-java',
      'React Native': 'tag-react-native'
    };
    return tagMap[tag] || 'tag-default';
  };

  const getCurrentProjects = () => {
    switch (activeCategory) {
      case 'main': return mainProjects;
      case 'mini': return miniProjects;
      case 'certifications': return certifications;
      default: return mainProjects;
    }
  };

  const nextProject = () => {
    const projects = getCurrentProjects();
    setCurrentIndex(prev => ({
      ...prev,
      [activeCategory]: (prev[activeCategory] + 1) % projects.length
    }));
    setFlippedCard(null);
    setShuffleKey(prev => prev + 1);
  };

  const prevProject = () => {
    const projects = getCurrentProjects();
    setCurrentIndex(prev => ({
      ...prev,
      [activeCategory]: prev[activeCategory] === 0 ? projects.length - 1 : prev[activeCategory] - 1
    }));
    setFlippedCard(null);
    setShuffleKey(prev => prev + 1);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setFlippedCard(null);
    setShuffleKey(prev => prev + 1);
  };

  const getVisibleCards = () => {
    const projects = getCurrentProjects();
    const current = currentIndex[activeCategory];
    const visibleCards = [];
    
    for (let i = 0; i < Math.min(5, projects.length); i++) {
      const index = (current + i) % projects.length;
      visibleCards.push({ ...projects[index], stackIndex: i });
    }
    
    return visibleCards;
  };

  return (
    <section id="projects" className="projects-section" aria-label="Projects section">
      <div className="projects-container">
        <div className="projects-header">
          <motion.h2
            className="projects-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            My Projects & Certifications
          </motion.h2>
          <motion.p
            className="projects-subtitle"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What I've been working on and achieved
          </motion.p>
          
          {/* Category Selector */}
          <div className="category-selector">
            <motion.button
              className={`category-btn ${activeCategory === 'main' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('main')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Main Projects
            </motion.button>
            
            <motion.button
              className={`category-btn ${activeCategory === 'mini' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('mini')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mini Projects
            </motion.button>
            
            <motion.button
              className={`category-btn ${activeCategory === 'certifications' ? 'active' : ''}`}
              onClick={() => handleCategoryClick('certifications')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Certificates
            </motion.button>
          </div>
        </div>

        {/* Photo Stack Display */}
        <div className="stack-display">
          <div className="stack-wrapper">
            
            {/* Navigation Buttons */}
            <motion.button
              onClick={prevProject}
              className="navigation-btn prev"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous project"
            >
              <svg className="navigation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Photo Stack Container */}
            <div className="photo-stack-container">
              <AnimatePresence mode="wait">
                {getVisibleCards().map((project, index) => (
                  <motion.div
                    key={`${activeCategory}-${project.title}-${shuffleKey}`}
                    custom={index}
                    variants={stackVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="photo-card"
                    onClick={index === 0 ? () => setFlippedCard(flippedCard === `${activeCategory}-current` ? null : `${activeCategory}-current`) : nextProject}
                    tabIndex={0}
                    role="button"
                    aria-label={index === 0 ? `Flip card to view details for ${project.title}` : `Navigate to ${project.title}`}
                  >
                    <div className="photo-card-inner">
                      
                      <div className={`card-flipper ${flippedCard === `${activeCategory}-current` && index === 0 ? 'flipped' : ''}`}>
                        
                        {/* Front Side */}
                        <div className="card-face card-front">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="card-image"
                            loading="lazy"
                          />
                          
                          {/* Polaroid-style bottom section */}
                          <div className="card-content">
                            <h3 className="card-title">{project.title}</h3>
                            <div className="card-tags">
                              {project.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className={`card-tag ${getTagClass(tag)}`}
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="card-tag overflow">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Back Side */}
                        <div className="card-face card-back">
                          <div>
                            <h3 className="back-title">{project.title}</h3>
                            <p className="back-description">{project.extendedDescription}</p>
                            <div className="back-tags">
                              {project.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  className={`card-tag ${getTagClass(tag)}`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="back-actions">
                            <a
                              href={project.github || project.link}
                              className="action-btn primary"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <svg className="action-icon" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              View Project
                            </a>
                            {project.website && (
                              <a
                                href={project.website}
                                className="action-btn secondary"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <svg className="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Visit Website
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.button
              onClick={nextProject}
              className="navigation-btn next"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next project"
            >
              <svg className="navigation-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Project Counter and Info */}
        <div className="project-counter">
          <div className="counter-badge">
            <span className="counter-text">
              {currentIndex[activeCategory] + 1} of {getCurrentProjects().length}
            </span>
            <div className="counter-divider"></div>
            
          </div>
        </div>

        {/* Enhanced Instructions */}
        
      </div>
    </section>
  );
};

export default Projects;