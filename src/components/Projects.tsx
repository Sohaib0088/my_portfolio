import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, X, Play, Star } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: string;
  featured: boolean;
  stats: {
    stars: number;
    forks: number;
    views: string;
  };
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution with real-time inventory and Stripe integration.',
      longDescription: 'A comprehensive e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payment processing with Stripe, user authentication, and a responsive admin dashboard. The platform handles thousands of products and supports multiple payment methods.',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Socket.io'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Full Stack',
      featured: true,
      stats: { stars: 124, forks: 45, views: '2.3k' }
    },
    {
      id: 2,
      title: 'AI Content Generator',
      description: 'AI-powered tool for generating high-quality written content using advanced language models.',
      longDescription: 'An innovative AI content generation platform that leverages OpenAI\'s GPT models to create high-quality written content. Features include content templates, tone adjustment, SEO optimization, and collaborative editing capabilities.',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      technologies: ['Next.js', 'OpenAI API', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'AI/ML',
      featured: true,
      stats: { stars: 89, forks: 23, views: '1.8k' }
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates and team features.',
      longDescription: 'A comprehensive task management application with real-time collaboration features, drag-and-drop functionality, team workspaces, time tracking, and detailed analytics. Built for teams of all sizes.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
      technologies: ['React', 'TypeScript', 'Socket.io', 'Express', 'PostgreSQL'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Web App',
      featured: false,
      stats: { stars: 67, forks: 18, views: '1.2k' }
    },
    {
      id: 4,
      title: 'Fitness Tracking Mobile App',
      description: 'Cross-platform mobile app for fitness tracking with social features.',
      longDescription: 'A comprehensive fitness tracking application with workout plans, progress monitoring, social features, and integration with wearable devices. Includes nutrition tracking and personalized recommendations.',
      image: 'https://images.pexels.com/photos/4753986/pexels-photo-4753986.jpeg',
      technologies: ['React Native', 'Firebase', 'Redux', 'Charts.js'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Mobile',
      featured: false,
      stats: { stars: 156, forks: 34, views: '3.1k' }
    },
    {
      id: 5,
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for complex data visualization with real-time updates.',
      longDescription: 'An advanced data visualization platform featuring interactive charts, real-time data streaming, customizable dashboards, and export capabilities. Perfect for business intelligence and analytics.',
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg',
      technologies: ['D3.js', 'React', 'Express.js', 'WebSocket', 'MongoDB'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Data Viz',
      featured: true,
      stats: { stars: 203, forks: 67, views: '4.2k' }
    },
    {
      id: 6,
      title: 'Real Estate Platform',
      description: 'Comprehensive platform with property listings and virtual tours.',
      longDescription: 'A full-featured real estate platform with property listings, virtual tours, mortgage calculator, agent matching system, and advanced search filters. Includes both web and mobile applications.',
      image: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
      technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'AWS'],
      githubUrl: '#',
      liveUrl: '#',
      category: 'Full Stack',
      featured: false,
      stats: { stars: 78, forks: 29, views: '1.9k' }
    }
  ];

  const categories = ['All', 'Full Stack', 'AI/ML', 'Web App', 'Mobile', 'Data Viz'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Featured Work</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Selected
            <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            A showcase of my recent work, spanning web applications, mobile apps, and innovative solutions
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"
          />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              variants={itemVariants}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -10 }}
                className={`group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative overflow-hidden h-64">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center"
                  >
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
                      initial={{ scale: 0, rotate: -180 }}
                      whileHover={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Play className="w-4 h-4" />
                      <span>View Details</span>
                    </motion.button>
                  </motion.div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {project.stats.stars}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <motion.a
                        href={project.githubUrl}
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        <span className="text-sm">Code</span>
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">Live</span>
                      </motion.a>
                    </div>
                    
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="flex items-center space-x-1 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">Details</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedProject.title}
                    </h3>
                    <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
                      {selectedProject.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{selectedProject.stats.stars}</span>
                    </div>
                    <div>👁️ {selectedProject.stats.views}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {selectedProject.longDescription}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  <motion.a
                    href={selectedProject.githubUrl}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github size={20} />
                    <span>View Code</span>
                  </motion.a>
                  <motion.a
                    href={selectedProject.liveUrl}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;