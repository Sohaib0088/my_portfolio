import React from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Building, GraduationCap, Award, Briefcase } from 'lucide-react';

interface ExperienceItem {
  id: number;
  type: 'work' | 'education';
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  achievements?: string[];
}

const Experience: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences: ExperienceItem[] = [
    {
      id: 1,
      type: 'work',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA',
      period: '2022 - Present',
      description: 'Lead development of scalable web applications serving 100k+ users. Implemented microservices architecture and improved system performance by 40%. Mentored junior developers and established coding standards.',
      technologies: ['React', 'Node.js', 'AWS', 'TypeScript', 'PostgreSQL'],
      achievements: [
        'Reduced application load time by 60%',
        'Led team of 5 developers',
        'Implemented CI/CD pipeline'
      ]
    },
    {
      id: 2,
      type: 'work',
      title: 'Full Stack Developer',
      company: 'StartupHub Inc.',
      location: 'Austin, TX',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple client projects ranging from e-commerce platforms to data visualization dashboards. Collaborated with cross-functional teams to deliver high-quality solutions on time.',
      technologies: ['Vue.js', 'Python', 'Django', 'MongoDB', 'Docker'],
      achievements: [
        'Delivered 15+ client projects',
        'Improved code coverage to 90%',
        'Reduced deployment time by 50%'
      ]
    },
    {
      id: 3,
      type: 'education',
      title: 'Master of Science in Computer Science',
      company: 'University of Technology',
      location: 'Boston, MA',
      period: '2017 - 2019',
      description: 'Specialized in Software Engineering and Machine Learning. Completed thesis on "Optimizing Web Application Performance Using Modern JavaScript Frameworks". GPA: 3.8/4.0',
      technologies: ['Algorithms', 'Data Structures', 'Machine Learning', 'Software Engineering'],
      achievements: [
        'Magna Cum Laude',
        'Research Assistant',
        'Published 2 papers'
      ]
    },
    {
      id: 4,
      type: 'work',
      title: 'Frontend Developer',
      company: 'Creative Agency Co.',
      location: 'Remote',
      period: '2019 - 2020',
      description: 'Specialized in creating responsive, interactive websites for creative clients. Worked closely with designers to bring innovative concepts to life while ensuring optimal user experience across all devices.',
      technologies: ['React', 'Sass', 'JavaScript', 'Figma', 'Webpack'],
      achievements: [
        'Improved client satisfaction by 95%',
        'Created reusable component library',
        'Optimized SEO performance'
      ]
    },
    {
      id: 5,
      type: 'education',
      title: 'Bachelor of Science in Information Technology',
      company: 'State University',
      location: 'Seattle, WA',
      period: '2013 - 2017',
      description: 'Foundation in computer science fundamentals, web development, and database systems. Active member of the Programming Club and participated in multiple hackathons. Graduated Magna Cum Laude.',
      technologies: ['Java', 'C++', 'Web Development', 'Database Design', 'Networking'],
      achievements: [
        'Magna Cum Laude',
        'Programming Club President',
        'Won 3 hackathons'
      ]
    }
  ];

  const stats = [
    { number: '5+', label: 'Years Experience', icon: Calendar },
    { number: '50+', label: 'Projects Completed', icon: Briefcase },
    { number: '100%', label: 'Client Satisfaction', icon: Award },
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

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="experience" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium mb-6">
            <Briefcase className="w-4 h-4" />
            <span>Career Journey</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Experience &
            <span className="block bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Education
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            My professional journey and academic background in technology
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto rounded-full"
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
              }}
              className="text-center p-8 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white mb-4">
                <stat.icon size={24} />
              </div>
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 hidden lg:block"
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={timelineVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <motion.div
                    whileHover={{ 
                      scale: 1.02, 
                      y: -5,
                      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                    }}
                    className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
                  >
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      exp.type === 'work' 
                        ? 'from-blue-500/5 to-purple-500/5' 
                        : 'from-green-500/5 to-blue-500/5'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start space-x-4 mb-6">
                        <div className={`p-3 rounded-2xl ${
                          exp.type === 'work' 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                            : 'bg-gradient-to-r from-green-500 to-blue-500'
                        } text-white shadow-lg`}>
                          {exp.type === 'work' ? (
                            <Building size={24} />
                          ) : (
                            <GraduationCap size={24} />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            {exp.company}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 mb-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      {exp.achievements && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 text-sm font-medium rounded-full ${
                              exp.type === 'work'
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 my-8 lg:my-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className={`w-6 h-6 rounded-full border-4 ${
                      exp.type === 'work'
                        ? 'bg-blue-500 border-blue-200 dark:border-blue-800'
                        : 'bg-green-500 border-green-200 dark:border-green-800'
                    } shadow-lg`}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute w-8 h-8 rounded-full ${
                      exp.type === 'work' ? 'bg-blue-500/20' : 'bg-green-500/20'
                    }`}
                  />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;