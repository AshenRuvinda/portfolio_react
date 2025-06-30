import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';

const BackToTop = ({ target = 'hero', className = '', fontFamily = 'inherit' }) => {
  return (
    <motion.div
      className={`back-to-top fixed bottom-8 right-8 bg-gray-800 p-3 rounded-full shadow-lg ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        to={target}
        smooth={true}
        duration={500}
        className="text-teal-400 text-xl hover:text-teal-300 transition-colors duration-300"
        style={{ fontFamily }}
      >
        <i className="fas fa-arrow-up"></i>
      </Link>
    </motion.div>
  );
};

export default BackToTop;