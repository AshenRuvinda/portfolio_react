import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import BackToTop from './BackToTop';

const Footer = () => {
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const [isVisible, setIsVisible] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const socialLinks = [
    { icon: 'fab fa-github', href: 'https://github.com/AshenRuvinda', label: 'GitHub' },
    { icon: 'fab fa-linkedin-in', href: 'https://www.linkedin.com/in/ashen-ruvinda-929b83345?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app', label: 'LinkedIn' },
    { icon: 'fab fa-twitter', href: '#', label: 'Twitter' },
    { icon: 'fab fa-facebook', href: 'https://www.facebook.com/share/14wTa8fj3W/?mibextid=wwXIfr', label: 'Facebook' },
  ];

  const quickLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Contact', to: 'contact' },
  ];

  const techStack = [
    { name: 'React', icon: 'fab fa-react' },
    { name: 'Node.js', icon: 'fab fa-node' },
    { name: 'Python', icon: 'fab fa-python' },
    { name: 'JavaScript', icon: 'fab fa-js' },
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ message: 'Subscribing...', type: 'loading' });

    // Simulate API call for newsletter subscription
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Mock delay
      setFormStatus({ message: 'Thank you for subscribing!', type: 'success' });
      e.target.reset();
    } catch (error) {
      setFormStatus({ message: 'Subscription failed. Please try again.', type: 'error' });
    }

    // Clear message after 3 seconds
    setTimeout(() => setFormStatus({ message: '', type: '' }), 3000);
  };

  // Toggle BackToTop visibility based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className="footer bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* About Section */}
          <motion.div className="footer-about" variants={itemVariants}>
            <motion.a
              href="#"
              className="footer-logo text-3xl font-bold mb-4 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Ashen Ruvinda Portfolio"
            >
              <span className="text-teal-400">&lt;</span>
              AshenRuvinda
              <span className="text-teal-400">&gt;</span>
            </motion.a>
            <p className="footer-text text-gray-300 text-sm mb-6">
              Crafting innovative software solutions with passion and precision. Specializing in full-stack development and cutting-edge technologies.
            </p>
            <div className="footer-social flex gap-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-teal-400 transition-all duration-300"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  title={link.label}
                  aria-label={`Visit my ${link.label}`}
                >
                  <i className={`${link.icon} text-2xl`}></i>
                </motion.a>
              ))}
            </div>
            <motion.p
              className="mt-4 text-sm text-gray-300"
              variants={itemVariants}
            >
              <a
                href="mailto:your.email@example.com"
                className="hover:text-teal-400 transition-colors duration-300"
                aria-label="Email Ashen Ruvinda"
              >
                maaruvinda@students.nsbm.ac.lk
              </a>
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="footer-links" variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 8, color: '#2dd4bf' }}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="text-gray-300 text-sm hover:text-teal-400 transition-colors duration-300 cursor-pointer"
                    aria-label={`Navigate to ${link.name} section`}
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div className="footer-tech-stack" variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Tech Stack</h4>
            <div className="grid grid-cols-2 gap-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                  variants={itemVariants}
                  whileHover={{ x: 8, color: '#2dd4bf' }}
                >
                  <i className={`${tech.icon} text-xl`}></i>
                  <span className="text-sm">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div className="footer-newsletter" variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-4 text-teal-400">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get updates on my latest projects and tech insights.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
              <label htmlFor="email-input" className="sr-only">
                Email address
              </label>
              <input
                id="email-input"
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:border-teal-400 transition-colors duration-300"
                required
                aria-required="true"
              />
              <motion.button
                type="submit"
                className="bg-teal-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-teal-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={formStatus.type === 'loading'}
                aria-label="Subscribe to newsletter"
              >
                {formStatus.type === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
              {formStatus.message && (
                <p
                  className={`text-sm mt-2 text-center ${
                    formStatus.type === 'success' ? 'text-teal-400' : 'text-red-400'
                  }`}
                  role="status"
                >
                  {formStatus.message}
                </p>
              )}
            </form>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="footer-bottom text-center mt-12 pt-6 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            © 2025 AshenRuvinda. Built with{' '}
            <span className="text-teal-400">ReactJS</span>.
          </p>
        </div>

        {/* Back to Top Button */}
        {isVisible && <BackToTop />}
      </div>
    </footer>
  );
};

export default Footer;