import React, { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import { Link } from 'react-scroll';
import BackToTop from './BackToTop';
import './Footer.css';

const Footer = () => {
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const [isVisible, setIsVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentYear = new Date().getFullYear() || 2025;


  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.15,
        delayChildren: 0.1
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    },
  };

  const sectionHover = {
    scale: 1.02,
    rotateX: 2,
    rotateY: 2,
    transition: { duration: 0.4, ease: "easeInOut" },
  };

  const glowVariants = {
    initial: { boxShadow: "0 0 0 rgba(45, 212, 191, 0)" },
    hover: { 
      boxShadow: "0 10px 30px rgba(45, 212, 191, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  const socialLinks = [
    { 
      icon: 'fab fa-github', 
      href: 'https://github.com/AshenRuvinda', 
      label: 'GitHub', 
      color: '#333',
      hoverColor: '#24292e'
    },
    { 
      icon: 'fab fa-linkedin-in', 
      href: 'https://www.linkedin.com/in/ashen-ruvinda-929b83345', 
      label: 'LinkedIn', 
      color: '#0077b5',
      hoverColor: '#005885'
    },
    { 
      icon: 'fab fa-twitter', 
      href: '#', 
      label: 'Twitter', 
      color: '#1da1f2',
      hoverColor: '#1991db'
    },
    { 
      icon: 'fab fa-instagram', 
      href: '#', 
      label: 'Instagram', 
      color: '#e4405f',
      hoverColor: '#c13584'
    },
  ];

  const quickLinks = [
    { name: 'Home', to: 'hero', icon: 'fas fa-home' },
    { name: 'About', to: 'about', icon: 'fas fa-user' },
    { name: 'Projects', to: 'projects', icon: 'fas fa-briefcase' },
    { name: 'Skills', to: 'skills', icon: 'fas fa-code' },
    { name: 'Contact', to: 'contact', icon: 'fas fa-envelope-open' },
  ];

  const services = [
    { name: 'Web Development', to: 'services-web', icon: 'fas fa-globe' },
    { name: 'Mobile Apps', to: 'services-mobile', icon: 'fas fa-mobile-alt' },
    { name: 'UI/UX Design', to: 'services-uiux', icon: 'fas fa-paint-brush' },
    { name: 'Logo Design', to: 'services-cloud', icon: 'fas fa-cloud' },
    
  ];

  const contactInfo = [
    { 
      icon: 'fas fa-envelope', 
      text: 'maaruvinda@students.nsbm.ac.lk', 
      href: 'mailto:maaruvinda@students.nsbm.ac.lk', 
      label: 'Email' 
    },
    { 
      icon: 'fas fa-map-marker-alt', 
      text: 'Homagama, Sri Lanka', 
      href: '#', 
      label: 'Location' 
    },
    { 
      icon: 'fas fa-phone', 
      text: '+94 77 123 4567', 
      href: 'tel:+94761511231', 
      label: 'Phone' 
    },
  ];

  const stats = [
    { number: '8', label: 'Projects Completed' },
    { number: 'x', label: 'Years Experience' },
    { number: 'x', label: 'Happy Clients' },
    { number: 'xxx%', label: 'Client Satisfaction' },
  ];

  const validateForm = (name, email) => {
    if (name.trim().length < 2) {
      return { valid: false, message: 'Name must be at least 2 characters', type: 'error' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { valid: false, message: 'Invalid email address', type: 'error' };
    }
    return { valid: true };
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm(name, email);
    if (!validation.valid) {
      setFormStatus({ message: validation.message, type: validation.type });
      return;
    }

    setFormStatus({ message: 'Subscribing...', type: 'loading' });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus({ message: 'Welcome aboard! 🎉', type: 'success' });
      setName('');
      setEmail('');
    } catch (error) {
      setFormStatus({ message: 'Subscription failed. Try again.', type: 'error' });
    }

    setTimeout(() => setFormStatus({ message: '', type: '' }), 3000);
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
      setIsSticky(window.innerHeight + window.scrollY >= document.body.offsetHeight - 100);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Asia/Colombo'
    });
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "name": "Ashen Ruvinda",
              "jobTitle": "Full-stack Developer",
              "email": "maaruvinda@students.nsbm.ac.lk",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Homagama",
                "addressCountry": "LK"
              },
              "sameAs": [
                "https://github.com/AshenRuvinda",
                "https://www.linkedin.com/in/ashen-ruvinda-929b83345"
              ]
            },
            {
              "@type": "WebSite",
              "url": "https://ashenruvinda.com",
              "name": "Ashen Ruvinda Portfolio",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://ashenruvinda.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          ]
        })}
      </script>
      
      <footer className={`footer ${isSticky ? 'sticky' : ''}`} aria-label="Website footer">
        <div className="footer-bg-effects">
          <div className="floating-shapes">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`shape shape-${i + 1}`}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        <div className="footer-container">
          {/* Stats Section */}
          <motion.section 
            className="footer-stats"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.span 
                    className="stat-number"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {stat.number}
                  </motion.span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.div
            className="footer-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* About Section */}
            <motion.section
              className="footer-about"
              variants={itemVariants}
              whileHover={sectionHover}
              aria-label="About Ashen Ruvinda"
            >
              <motion.a
                href="#"
                className="footer-logo"
                whileHover={{ scale: 1.08, rotate: 3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Ashen Ruvinda Portfolio Home"
                variants={glowVariants}
                initial="initial"
                whileHover="hover"
              >
                <motion.span 
                  className="logo-accent"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  
                </motion.span>
                Ashen Ruvinda
                <motion.span 
                  className="logo-accent"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  
                </motion.span>
              </motion.a>
              
              <p className="footer-text">
                Passionate full-stack developer crafting innovative software solutions 
                with cutting-edge technologies and creative problem-solving.
              </p>

              <div className="location-time">
                <i className="fas fa-clock"></i>
                <span>Homagama, LK • {formatTime(currentTime)}</span>
              </div>
              
              <div className="footer-social">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="social-link"
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -3,
                      rotate: [0, -10, 10, 0],
                      color: link.hoverColor 
                    }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={() => setHoveredSocial(index)}
                    onHoverEnd={() => setHoveredSocial(null)}
                    aria-label={`Visit Ashen Ruvinda's ${link.label} profile`}
                  >
                    <motion.i 
                      className={`${link.icon} social-icon`}
                      style={{ color: hoveredSocial === index ? link.hoverColor : link.color }}
                      animate={hoveredSocial === index ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="social-tooltip">{link.label}</span>
                  </motion.a>
                ))}
              </div>
              
              <motion.div
                className="cta-section"
                variants={itemVariants}
              >
                <motion.div
                  className="cta-button"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                >
                  <Link
                    to="projects"
                    smooth={true}
                    duration={500}
                    className="cta-link"
                    aria-label="View Projects"
                  >
                    <i className="fas fa-rocket"></i>
                    View Projects
                  </Link>
                </motion.div>
                
                <motion.div
                  className="cta-button secondary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="contact"
                    smooth={true}
                    duration={500}
                    className="cta-link"
                    aria-label="Get in touch with Ashen Ruvinda"
                  >
                    <i className="fas fa-paper-plane"></i>
                    Get In Touch
                  </Link>
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Quick Links */}
            <motion.nav
              className="footer-links"
              variants={itemVariants}
              whileHover={sectionHover}
              aria-label="Footer navigation"
            >
              <h4 className="footer-section-title">
                <i className="fas fa-compass"></i>
                Navigation
              </h4>
              <ul className="links-list">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="nav-item"
                  >
                    <Link
                      to={link.to}
                      smooth={true}
                      duration={500}
                      className="nav-link"
                      aria-label={`Navigate to ${link.name} section of the website`}
                    >
                      <motion.i 
                        className={`${link.icon} nav-icon`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      />
                      <span>{link.name}</span>
                      <motion.div 
                        className="nav-arrow"
                        initial={{ x: -10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        →
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>

            {/* Services */}
            <motion.section
              className="footer-services"
              variants={itemVariants}
              whileHover={sectionHover}
              aria-label="Services offered"
            >
              <h4 className="footer-section-title">
                <i className="fas fa-tools"></i>
                Services
              </h4>
              <ul className="services-grid">
                {services.map((service, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="service-item"
                  >
                    <Link
                      to={service.to}
                      smooth={true}
                      duration={500}
                      className="service-link"
                      aria-label={`Learn more about ${service.name} services`}
                    >
                      <motion.i 
                        
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.4 }}
                      />
                      <span className="service-name">{service.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.section>

            {/* Contact & Newsletter */}
            <motion.section
              className="footer-contact"
              variants={itemVariants}
              whileHover={sectionHover}
              aria-label="Contact information and newsletter"
            >
              <h4 className="footer-section-title">
                <i className="fas fa-address-book"></i>
                Let's Connect
              </h4>
              
              <div className="contact-info">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.href}
                    className="contact-item"
                    variants={itemVariants}
                    whileHover={{ x: 8, scale: 1.02 }}
                    aria-label={info.label === 'Email' ? `Send email to ${info.text}` : `${info.label}: ${info.text}`}
                  >
                    <motion.i 
                      className={`${info.icon} contact-icon`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.4 }}
                    />
                    <span>{info.text}</span>
                  </motion.a>
                ))}
              </div>

              <div className="newsletter-section">
                <h5 className="newsletter-title">
                  <i className="fas fa-envelope-open-text"></i>
                  Stay Updated
                </h5>
                <p className="newsletter-subtitle">
                  Get the latest updates on new projects and tech insights
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="newsletter-form" aria-label="Newsletter subscription form">
                  <div className="form-group">
                    <label htmlFor="name-input" className="sr-only">Your name</label>
                    <motion.input
                      id="name-input"
                      type="text"
                      placeholder="Your name"
                      className="form-input name-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      aria-required="true"
                      aria-describedby="form-error"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email-input" className="sr-only">Email address</label>
                    <motion.input
                      id="email-input"
                      type="email"
                      placeholder="your.email@domain.com"
                      className="form-input email-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-required="true"
                      aria-describedby="form-error"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="subscribe-button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={formStatus.type === 'loading'}
                    aria-label="Subscribe to newsletter"
                    variants={glowVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    {formStatus.type === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <i className="fas fa-spinner"></i>
                      </motion.div>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Subscribe
                      </>
                    )}
                  </motion.button>
                  
                  {formStatus.message && (
                    <motion.p
                      id="form-error"
                      className={`form-status ${formStatus.type}`}
                      role="status"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {formStatus.message}
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.section>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div 
            className="footer-bottom"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="footer-divider">
              <motion.div 
                className="divider-line"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
            
            <div className="footer-bottom-content">
              <p className="footer-copyright">
                © {currentYear} Ashen Ruvinda. All Rights Reserved 
                <motion.span 
                  className="heart"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  
                </motion.span> 
                
              </p>
              
              <div className="footer-links-bottom">
                <a href="#" className="footer-link-bottom">Privacy Policy</a>
                <span className="separator">•</span>
                <a href="#" className="footer-link-bottom">Terms of Service</a>
                <span className="separator">•</span>
                <a href="#" className="footer-link-bottom">Sitemap</a>
              </div>
            </div>
          </motion.div>

          {/* Back to Top Button */}
          {isVisible && <BackToTop />}
        </div>
      </footer>
    </>
  );
};

export default Footer;