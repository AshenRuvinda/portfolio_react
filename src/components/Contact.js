import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus(null), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Contact Me</h2>
          <ReactTyped
            strings={['Get in touch', 'Let\'s Connect', 'Reach Out', 'Say Hello']}
            typeSpeed={50}
            backSpeed={30}
            loop
            className="text-lg text-teal-400"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            className="contact-info"
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="contact-info-item card p-4 mb-4 flex items-start"
              variants={itemVariants}
            >
              <div className="contact-info-icon mr-4">
                <motion.i
                  className="fas fa-map-marker-alt text-teal-400 text-2xl"
                  whileHover={{ scale: 1.2, color: '#1e3a8a' }}
                ></motion.i>
              </div>
              <div className="contact-info-content">
                <h4 className="text-lg font-semibold mb-1">Location</h4>
                <p className="text-sm">Homagama, Colombo, Sri Lanka</p>
              </div>
            </motion.div>
            <motion.div
              className="contact-info-item card p-4 mb-4 flex items-start"
              variants={itemVariants}
            >
              <div className="contact-info-icon mr-4">
                <motion.i
                  className="fas fa-envelope text-teal-400 text-2xl"
                  whileHover={{ scale: 1.2, color: '#1e3a8a' }}
                ></motion.i>
              </div>
              <div className="contact-info-content">
                <h4 className="text-lg font-semibold mb-1">Email</h4>
                <p className="text-sm">
                  <a href="mailto:maaruvinda@students.nsbm.ac.lk">maaruvinda@students.nsbm.ac.lk</a>
                </p>
              </div>
            </motion.div>
            <motion.div
              className="contact-info-item card p-4 mb-4 flex items-start"
              variants={itemVariants}
            >
              <div className="contact-info-icon mr-4">
                <motion.i
                  className="fas fa-phone text-teal-400 text-2xl"
                  whileHover={{ scale: 1.2, color: '#1e3a8a' }}
                ></motion.i>
              </div>
              <div className="contact-info-content">
                <h4 className="text-lg font-semibold mb-1">Phone</h4>
                <p className="text-sm">
                  <a href="tel:+94761511231">076 1511 231</a>
                </p>
              </div>
            </motion.div>
            <motion.div
              className="contact-info-item card p-4 mb-4 flex items-start"
              variants={itemVariants}
            >
              <div className="contact-info-icon mr-4">
                <motion.i
                  className="fas fa-clock text-teal-400 text-2xl"
                  whileHover={{ scale: 1.2, color: '#1e3a8a' }}
                ></motion.i>
              </div>
              <div className="contact-info-content">
                <h4 className="text-lg font-semibold mb-1">Working Hours</h4>
                <p className="text-sm">Mon - Fri: 9 AM - 6 PM</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="contact-form card p-6"
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
          >
            <form onSubmit={handleSubmit} action="https://formspree.io/f/mzzrovvy" method="POST">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                  required
                />
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  name="subject"
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              {formStatus === 'success' && (
                <motion.div
                  className="form-message text-green-400 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Message sent successfully!
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div
                  className="form-message text-red-400 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Failed to send message. Please try again.
                </motion.div>
              )}
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;