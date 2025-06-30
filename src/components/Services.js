import React from 'react';
import { motion } from 'framer-motion';

const Services = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const services = [
    {
      icon: 'fas fa-code',
      title: 'Web Development',
      description: 'Building responsive, modern websites and web applications using the latest technologies and frameworks.',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile App Development',
      description: 'Creating cross-platform mobile applications that provide seamless user experiences across devices.',
    },
    {
      icon: 'fas fa-database',
      title: 'Database Design',
      description: 'Designing efficient and scalable database architectures to support your applications.',
    },
    {
      icon: 'fas fa-server',
      title: 'Backend Development',
      description: 'Building robust server-side applications and APIs that power your web and mobile applications.',
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'Digital Design',
      description: 'Creating visually engaging digital assets including UI/UX designs, branding, and multimedia content.',
    },
    {
      icon: 'fas fa-video',
      title: 'Video Editing',
      description: 'Professional editing of video content for social media, marketing, and storytelling using modern editing tools.',
    },
  ];

  return (
    <section id="services" className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">My Services</h2>
          <p className="text-lg">What I can do for you</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="card p-6 text-center"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <div className="service-icon mb-4">
                <i className={`${service.icon} icon text-3xl`}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;