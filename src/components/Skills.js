import React from 'react';
import { motion } from 'framer-motion';

const Skills = () => {
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
      ],
    },
    {
      title: 'Back End',
      icon: 'fas fa-server',
      skills: [
        { name: 'Python', level: 75 },
        { name: 'Java', level: 85 },
        { name: 'Database Management', level: 70 },
      ],
    },
    {
      title: 'Design',
      icon: 'fas fa-paint-brush',
      skills: [
        { name: 'UI/UX Design', level: 80 },
      ],
    },
    {
      title: 'Video Editing',
      icon: 'fas fa-video',
      skills: [
        { name: 'Adobe Photoshop+Premiere Pro', level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">My Skills</h2>
          <p className="text-lg">What I'm good at</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="card p-6"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <div className="text-center">
                <i className={`${category.icon} icon text-3xl mb-4`}></i>
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item mb-4">
                    <div className="skill-info flex justify-between mb-2">
                      <h4 className="text-base font-medium">{skill.name}</h4>
                      <h4 className="text-base">{skill.level}%</h4>
                    </div>
                    <div className="skill-progress bg-gray-700 h-2 rounded">
                      <motion.div
                        className="skill-progress-bar bg-cyan-400 h-2 rounded"
                        variants={progressBar}
                        initial="hidden"
                        animate="visible"
                        custom={skill.level}
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