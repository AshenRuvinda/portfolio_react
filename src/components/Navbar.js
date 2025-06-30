import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = ['Home', 'About', 'Skills', 'Services', 'Projects', 'Resume', 'Contact'];

  return (
    <nav className="fixed top-0 w-full z-50 navbar py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold flex items-center">
          <i className="fas fa-code mr-2"></i> Ashen's Portfolio
        </h1>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map(section => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className="text-white hover:text-cyan-400 transition-colors duration-300 hover:scale-110"
              aria-label={`Navigate to ${section} section`}
            >
              {section}
            </a>
          ))}
        </div>
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } overflow-y-auto bg-black bg-opacity-90 backdrop-blur-md`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
          {navItems.map(section => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className="text-white hover:text-cyan-400 transition-colors duration-300 text-base py-2 border-b border-gray-700 hover:border-cyan-400"
              onClick={() => setIsOpen(false)}
              aria-label={`Navigate to ${section} section`}
            >
              {section}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;