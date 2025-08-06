import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navigation />
        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1.5\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"} />
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <div className="mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                  Sohaib Khan
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Crafting digital experiences with passion and precision. 
                  Let's build something amazing together.
                </p>
              </div>
              
              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400 text-sm">
                  © 2024 Sohaib Khan. All rights reserved. Built with React, TypeScript, Tailwind CSS, and Framer Motion.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;