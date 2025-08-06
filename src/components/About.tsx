import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../../WhatsApp Image 2025-08-06 at 17.27.08_80918c78.jpg';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            I'm Sohaib Khan, a passionate Full Stack Developer with a knack for crafting engaging digital experiences. I love working with modern web technologies and bringing creative ideas to life.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 mb-6">
            <li>5+ years of experience in web development</li>
            <li>Expertise in React, TypeScript, Node.js, and design systems</li>
            <li>Strong focus on performance, accessibility, and UX</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex-1 flex justify-center"
        >
          <div className="w-56 h-56 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 p-1 shadow-lg">
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
              <img
                src={profileImg}
                alt="Sohaib Khan profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;