import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'john.doe@example.com',
      href: 'mailto:john.doe@example.com',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'San Francisco, CA',
      href: '#',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-900 dark:hover:text-white' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
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

  return (
    <section id="contact" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.1),transparent_50%)]" />
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
            <MessageCircle className="w-4 h-4" />
            <span>Get In Touch</span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Let's Work
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Together
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Ready to bring your ideas to life? Let's discuss your project and create something amazing together.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
            >
              Get in Touch
            </motion.h3>
            
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group flex items-center space-x-6 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
              >
                <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${info.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <info.icon size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                    {info.title}
                  </h4>
                  {info.href.startsWith('#') ? (
                    <p className="text-gray-600 dark:text-gray-300">{info.content}</p>
                  ) : (
                    <a
                      href={info.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {info.content}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div variants={itemVariants} className="pt-8">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-6">
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`w-14 h-14 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:shadow-lg`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 p-8 rounded-3xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="relative">
                  <motion.label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'name' || formData.name
                        ? 'top-2 text-xs text-blue-600 dark:text-blue-400'
                        : 'top-4 text-base text-gray-500 dark:text-gray-400'
                    }`}
                    animate={{
                      y: focusedField === 'name' || formData.name ? -8 : 0,
                      scale: focusedField === 'name' || formData.name ? 0.85 : 1,
                    }}
                  >
                    Your Name
                  </motion.label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 pt-6 pb-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                      >
                        <AlertCircle size={14} />
                        <span>{errors.name}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <motion.label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'email' || formData.email
                        ? 'top-2 text-xs text-blue-600 dark:text-blue-400'
                        : 'top-4 text-base text-gray-500 dark:text-gray-400'
                    }`}
                    animate={{
                      y: focusedField === 'email' || formData.email ? -8 : 0,
                      scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                    }}
                  >
                    Email Address
                  </motion.label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 pt-6 pb-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    }`}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                      >
                        <AlertCircle size={14} />
                        <span>{errors.email}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Subject Field */}
              <div className="relative">
                <motion.label
                  htmlFor="subject"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'subject' || formData.subject
                      ? 'top-2 text-xs text-blue-600 dark:text-blue-400'
                      : 'top-4 text-base text-gray-500 dark:text-gray-400'
                  }`}
                  animate={{
                    y: focusedField === 'subject' || formData.subject ? -8 : 0,
                    scale: focusedField === 'subject' || formData.subject ? 0.85 : 1,
                  }}
                >
                  Subject
                </motion.label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 pt-6 pb-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white ${
                    errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  }`}
                />
                <AnimatePresence>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                    >
                      <AlertCircle size={14} />
                      <span>{errors.subject}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Message Field */}
              <div className="relative">
                <motion.label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === 'message' || formData.message
                      ? 'top-2 text-xs text-blue-600 dark:text-blue-400'
                      : 'top-4 text-base text-gray-500 dark:text-gray-400'
                  }`}
                  animate={{
                    y: focusedField === 'message' || formData.message ? -8 : 0,
                    scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                  }}
                >
                  Message
                </motion.label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  className={`w-full px-4 pt-6 pb-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                  }`}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                    >
                      <AlertCircle size={14} />
                      <span>{errors.message}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-2xl text-green-700 dark:text-green-400 flex items-center space-x-2"
                  >
                    <CheckCircle size={20} />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2 relative overflow-hidden group"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                
                <span className="relative z-10 flex items-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;