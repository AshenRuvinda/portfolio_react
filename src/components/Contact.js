import React from 'react';
import { motion } from 'framer-motion';
import { ReactTyped } from 'react-typed';
import { useForm, ValidationError } from '@formspree/react';
import '../styles/App.css';

const Contact = () => {
  const [state, handleSubmit] = useForm('mwpbzvvn');

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
            className="text-lg text-blue-400"
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
              className="contact-info-item mb-6 flex items-center"
              variants={itemVariants}
              transition={{ delay: 0.1 }}
            >
              <div className="contact-info-icon mr-4">
                <motion.i
                  className="fas fa-map-marker-alt text-blue-400 text-2xl"
                  whileHover={{ scale: 1.2, color: '#3b82f6' }}
                  aria-label="Location"
                ></motion.i>
              </div>
              <div className="contact-info-content">
                <h4 className="text-lg font-semibold mb-1">Location</h4>
                <p className="text-sm">Homagama, Colombo, Sri Lanka</p>
              </div>
            </motion.div>
            <motion.div
              className="contact-info-item mb-6 flex items-center"
              variants={itemVariants}
              transition={{ delay: 0.2 }}
            >
              <div className="contact-info-icon mr-4">
                <motion.i
                  className="fas fa-envelope text-blue-400 text-2xl"
                  whileHover={{ scale: 1.2, color: '#3b82f6' }}
                  aria-label="Email"
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
              className="contact-info-item mb-6 flex items-center"
              variants={itemVariants}
              transition={{ delay: 0.3 }}
            >
              <div className="contact-info-icon mr-4">
                <motion.i
                  className="fas fa-phone text-blue-400 text-2xl"
                  whileHover={{ scale: 1.2, color: '#3b82f6' }}
                  aria-label="Phone"
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
              className="contact-info-item mb-6 flex items-center"
              variants={itemVariants}
              transition={{ delay: 0.4 }}
            >
              <div className="contact-info-icon mr-4">
                <motion.i
                  className="fas fa-clock text-blue-400 text-2xl"
                  whileHover={{ scale: 1.2, color: '#3b82f6' }}
                  aria-label="Working Hours"
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
            {state.succeeded ? (
              <motion.div
                className="form-message text-emerald-400 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Thanks for your message!
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                    />
                  </div>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <input
                    name="subject"
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                  <ValidationError
                    prefix="Subject"
                    field="subject"
                    errors={state.errors}
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    id="message"
 editorial
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Your Message"
                    required
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={state.submitting}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;