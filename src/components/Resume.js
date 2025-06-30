import React from 'react';
import { motion } from 'framer-motion';

const Resume = () => {
  const fadeIn = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const resumeItems = {
    education: [
      {
        year: '2022 - Present',
        title: 'BSc in Software Engineering',
        institution: 'NSBM Green University',
        description: 'I am a third year student at NSBM Green University. I am pursuing my studies in the Software Engineering department.',
      },
      {
        year: '2019 - 2020',
        title: 'GCE AL - Maths Stream',
        institution: 'R/Eheliyagoda Central College',
        description: 'I successfully sat and passed my General Certificate of Education Advanced Level examination.',
      },
    ],
    experience: [
      // {
      //   year: '2023 - Present',
      //   title: 'Junior Software Developer (Part-time)',
      //   institution: 'InnoTech Solutions',
      //   description: 'Working on web application development using React.js and Node.js. Contributing to agile development cycles and participating in code reviews.',
      // },
      // {
      //   year: '2022 - 2023',
      //   title: 'Software Development Intern',
      //   institution: 'GlobalTech Corp',
      //   description: 'Assisted in developing and testing frontend components using HTML, CSS, and JavaScript. Collaborated with senior developers on feature implementation.',
      // },
    ],
  };

  return (
    <section id="resume" className="section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">My Resume</h2>
          <p className="text-lg">Education & Experience</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Education</h3>
            {resumeItems.education.map((item, index) => (
              <motion.div
                key={index}
                className="resume-item card p-4 mb-4"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.2 }}
              >
                <span className="resume-year text-cyan-400">{item.year}</span>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <h4 className="text-lg mb-2">{item.institution}</h4>
                <p className="text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Experience</h3>
            {resumeItems.experience.length > 0 ? (
              resumeItems.experience.map((item, index) => (
                <motion.div
                  key={index}
                  className="resume-item card p-4 mb-4"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.2 }}
                >
                  <span className="resume-year text-cyan-400">{item.year}</span>
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <h4 className="text-lg mb-2">{item.institution}</h4>
                  <p className="text-sm">{item.description}</p>
                </motion.div>
              ))
            ) : (
              <p className="text-sm italic">No professional experience listed yet. Check out my projects to see my skills in action!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;