import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Database, Wrench, Zap, Palette, Globe } from 'lucide-react';

const Skills: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'TypeScript', level: 90, icon: '🔷' },
        { name: 'Next.js', level: 88, icon: '▲' },
        { name: 'Vue.js', level: 82, icon: '💚' },
        { name: 'Tailwind CSS', level: 95, icon: '🎨' },
        { name: 'Framer Motion', level: 85, icon: '🎭' }
      ]
    },
    {
      title: 'Backend',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 92, icon: '🟢' },
        { name: 'Python', level: 88, icon: '🐍' },
        { name: 'Express.js', level: 90, icon: '🚂' },
        { name: 'Django', level: 82, icon: '🎸' },
        { name: 'PostgreSQL', level: 87, icon: '🐘' },
        { name: 'MongoDB', level: 85, icon: '🍃' }
      ]
    },
    {
      title: 'Tools & Cloud',
      icon: Wrench,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Docker', level: 85, icon: '🐳' },
        { name: 'AWS', level: 80, icon: '☁️' },
        { name: 'Git', level: 95, icon: '📚' },
        { name: 'Figma', level: 90, icon: '🎨' },
        { name: 'Jest', level: 88, icon: '🃏' },
        { name: 'GraphQL', level: 78, icon: '📊' }
      ]
    }
  ];

  const additionalSkills = [
    'Redux Toolkit', 'Zustand', 'Three.js', 'WebSocket', 'Redis', 'Prisma',
    'tRPC', 'Stripe API', 'Firebase', 'Vercel', 'Netlify', 'GitHub Actions',
    'ESLint', 'Prettier', 'Webpack', 'Vite', 'Storybook', 'Cypress'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="skills" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Technical Expertise</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Skills &
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Technologies
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            My technical expertise spans across frontend, backend, and modern development tools
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"
          />
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-12 mb-20"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="group"
            >
              {/* Category Header */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <category.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              
              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    className="group/skill"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl group-hover/skill:scale-110 transition-transform duration-300">
                          {skill.icon}
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${category.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ 
                          duration: 1.5, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                          ease: [0.4, 0.0, 0.2, 1]
                        }}
                      />
                      
                      {/* Animated Shine Effect */}
                      <motion.div
                        className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                        animate={{ x: [-32, 400] }}
                        transition={{ 
                          duration: 2, 
                          delay: categoryIndex * 0.2 + skillIndex * 0.1 + 1,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Cloud */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.h3 
            variants={itemVariants}
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Also Experienced With
          </motion.h3>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            {additionalSkills.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)"
                }}
                className="px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-default border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Interactive Skill Radar (Optional Enhancement) */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-200 dark:border-blue-800">
            <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              Always learning and exploring new technologies
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;