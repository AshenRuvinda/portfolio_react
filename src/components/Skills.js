import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/App.css';

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once when section enters view
    threshold: 0.2, // Trigger when 20% of section is visible
  });

  const scrollRef = useRef(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const progressBar = {
    hidden: { width: 0 },
    visible: (width) => ({
      width: `${width}%`,
      transition: { duration: 1, ease: 'easeOut' },
    }),
  };

  const skillCategories = [
    {
      title: 'Front End',
      icon: 'fas fa-code',
      skills: [
        { name: 'JavaScript', level: 90, icon: 'fab fa-js' },
        { name: 'React', level: 85, icon: 'fab fa-react' },
        { name: 'React Native', level: 80, icon: 'fab fa-react' },
        { name: 'HTML/CSS', level: 95, icon: 'fab fa-html5' },
        { name: 'Java', level: 85, icon: 'fab fa-java' },
        { name: 'Dart', level: 85, icon: 'fab fa-android' },
      ],
    },
    {
      title: 'Back End',
      icon: 'fas fa-server',
      skills: [
        { name: 'Python', level: 75, icon: 'fab fa-python' },
        { name: 'SQL', level: 70, icon: 'fas fa-database' },
        { name: 'PHP', level: 80, icon: 'fab fa-php' },
        { name: 'Firebase', level: 85, icon: 'fas fa-fire' },
        { name: 'NodeJS', level: 85, icon: 'fab fa-node-js' },
      ],
    },
    {
      title: 'Design',
      icon: 'fas fa-paint-brush',
      skills: [
        { name: 'UI/UX Design', level: 70, icon: 'fas fa-pen-nib' },
        { name: 'Adobe Photoshop', level: 80, icon: 'fas fa-image' },
        { name: 'Adobe XD', level: 80, icon: 'fas fa-pen-square' },
      ],
    },
    {
      title: 'Video Editing',
      icon: 'fas fa-video',
      skills: [
        { name: 'Adobe Premiere Pro', level: 70, icon: 'fas fa-video' },
        { name: 'Capcut', level: 85, icon: 'fas fa-video' },
      ],
    },
    {
      title: 'Version Control',
      icon: 'fas fa-code-branch',
      skills: [
        { name: 'Git', level: 90, icon: 'fab fa-git' },
        { name: 'GitHub', level: 85, icon: 'fab fa-github' },
        
      ],
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.8; // Scroll 80% of container width
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="skills" className="section" ref={ref} aria-label="Skills carousel">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold mb-2"
            variants={fadeIn}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            My Skills
          </motion.h2>
          <motion.p
            className="text-lg text-gray-300"
            variants={fadeIn}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
          >
            What I'm good at
          </motion.p>
        </div>
        <div className="relative">
          <button
            className="carousel-button left-0"
            onClick={() => scroll('left')}
            aria-label="Scroll skills carousel left"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div
            className="carousel-container flex overflow-x-auto scroll-smooth"
            ref={scrollRef}
            role="group"
            aria-label="Skill categories"
          >
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                className="skill-category w-[280px] mx-3"
                variants={fadeIn}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-center">
                  <motion.i
                    className={`${category.icon} icon text-3xl mb-4`}
                    whileHover={{ scale: 1.2, color: '#3b82f6' }}
                    aria-label={category.title}
                  ></motion.i>
                  <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                  <ul>
                    {category.skills.map((skill, idx) => (
                      <li key={idx} className="skill-item mb-6">
                        <div className="skill-info flex justify-between mb-2">
                          <div className="flex items-center">
                            <i
                              className={`${skill.icon} tech-logo mr-2 text-lg`}
                              aria-hidden="true"
                            ></i>
                            <h4 className="text-base font-medium">{skill.name}</h4>
                          </div>
                          <h4 className="text-base">{skill.level}%</h4>
                        </div>
                        <div className="skill-progress bg-slate-700 h-2 rounded">
                          <motion.div
                            className="skill-progress-bar h-2 rounded"
                            variants={progressBar}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            custom={skill.level}
                            aria-valuenow={skill.level}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            role="progressbar"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          <button
            className="carousel-button right-0"
            onClick={() => scroll('right')}
            aria-label="Scroll skills carousel right"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;