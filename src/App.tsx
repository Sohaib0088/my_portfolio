import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAdmin(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowAdmin(false);
  };

  const toggleAdmin = () => {
    if (isLoggedIn) {
      setShowAdmin(!showAdmin);
    } else {
      setShowLoginModal(true);
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {showAdmin ? (
        <AdminDashboard onLogout={handleLogout} onBackToPortfolio={() => setShowAdmin(false)} />
      ) : (
        <>
          <Navigation onAdminClick={toggleAdmin} isLoggedIn={isLoggedIn} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
          </main>
          
          {/* Admin Login Modal */}
          {showLoginModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full mx-4 relative"
              >
                <button
                  onClick={closeLoginModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
                <Login onLoginSuccess={handleLoginSuccess} />
              </motion.div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
