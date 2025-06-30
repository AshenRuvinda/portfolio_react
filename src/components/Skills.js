import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/App.css';

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once when section enters view
    threshold: 0.2, // Trigger when 20% of section is visible
  });

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
        { name: 'JavaScript', level: 90 },
        { name: 'React', level: 85 },
        { name: 'React Native', level: 80 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Java', level: 85 },
      ],
    },
    {
      title: 'Back End',
      icon: 'fas fa-server',
      skills: [
        { name: 'Python', level: 75 },
        { name: 'SQL', level: 70 },
        { name: 'PHP', level: 80 },
        { name: 'Firebase', level: 85 },
      ],
    },
    {
      title: 'Design',
      icon: 'fas fa-paint-brush',
      skills: [
        { name: 'UI/UX Design', level: 70 },
        { name: 'Adobe Photoshop', level: 80 },
        { name: 'Adobe XD', level: 80 },
      ],
    },
    {
      title: 'Video Editing',
      icon: 'fas fa-video',
      skills: [
        { name: 'Adobe Premiere Pro', level: 70 },
        { name: 'Capcut', level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="section" ref={ref}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-category"
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
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item mb-6">
                    <div className="skill-info flex justify-between mb-2">
                      <h4 className="text-base font-medium">{skill.name}</h4>
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
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;