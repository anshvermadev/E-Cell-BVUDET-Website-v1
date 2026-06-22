import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, UserCircle, CalendarDays, Calendar,CalendarClock, UserPlus, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
    @media (min-width: 1024px) and (max-width: 1244px) {
      .nav-button {
        font-size: 0.8125rem; /* 13px */
        line-height: 1.125rem; /* 18px */
      }
      .nav-button svg {
        width: 0.8125rem; /* 13px */
        height: 0.8125rem; /* 13px */
        margin-right: 0.125rem !important; /* 2px */
      }
      .apply-now-btn {
        padding: 0.375rem 0.75rem !important; /* 6px 12px */
      }
      .apply-now-btn span {
        font-size: 0.8125rem; /* 13px */
      }
      .apply-now-btn svg {
        width: 0.875rem; /* 14px */
        height: 0.875rem; /* 14px */
      }
      .hidden.lg\:flex.items-center.space-x-6 > *:not(:first-child) {
        margin-left: 0.25rem !important; /* 4px */
      }
    }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed w-full z-50 will-change-transform [transform:translateZ(0)] pt-6 px-4 sm:px-6 lg:px-8">
        {/* Main navigation */}
        <div className="relative bg-white/10 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 rounded-full max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="relative z-10">
                  <img 
                    src="E-cell Logo.svg" 
                    alt="E-Cell BVUDET" 
                    className="h-14 w-auto"
                  />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 relative z-10">
                <Link
                  to="/"
                  className={`nav-button ${isActive('/') ? 'text-white' : 'text-white/80 hover:text-white'}`}
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`nav-button ${isActive('/about') ? 'text-white' : 'text-white/80 hover:text-white'}`}
                >
                  <Users className="w-4 h-4 mr-1" />
                  About Us
                </Link>
                <Link
                  to="/profiles"
                  className={`nav-button ${isActive('/profiles') ? 'text-white' : 'text-white/80 hover:text-white'}`}
                >
                  <UserCircle className="w-4 h-4 mr-1" />
                  Profiles
                </Link>
                <Link
                  to="/upcoming-events"
                  className={`nav-button ${isActive('/upcoming-events') ? 'text-white' : 'text-white/80 hover:text-white'}`}
                >
                  <CalendarClock className="w-4 h-4 mr-1" />
                  Upcoming Events
                </Link>
                <Link
                  to="/past-events"
                  className={`nav-button ${isActive('/past-events') ? 'text-white' : 'text-white/80 hover:text-white'}`}
                >
                  <CalendarDays className="w-4 h-4 mr-1" />
                  Past Events
                </Link>

                {/* 🔥 Recruitment CTA Button (Desktop) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="relative"
                >
                  <Link
                    to="/register"
                    className="apply-now-btn group relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 
                              hover:from-gray-700 hover:via-gray-600 hover:to-gray-800 text-white font-bold 
                              py-3 px-6 rounded-2xl transition-all duration-700 transform hover:scale-110 hover:-translate-y-1 
                              shadow-2xl flex items-center justify-center border border-gray-600/30"
                    style={{
                      boxShadow:
                        '0 0 40px rgba(255, 255, 255, 0.15), 0 0 80px rgba(156, 163, 175, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                      animation:
                        'etherealGlow 4s ease-in-out infinite alternate, float 3s ease-in-out infinite',
                    }}
                  >
                    <span className="relative z-10 text-sm sm:text-base font-bold tracking-wider 
                      bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent 
                      group-hover:from-white group-hover:via-white group-hover:to-gray-100 
                      transition-all duration-500">
                      Launchpad Registrations
                    </span>

                    <Zap className="relative z-10 ml-2 w-5 h-5 text-white group-hover:rotate-12 
                      group-hover:scale-125 group-hover:text-gray-100 transition-all duration-500 drop-shadow-lg" />

                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-gray-300/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
                    <div className="absolute inset-0 rounded-2xl bg-white blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-300 to-white blur-xl opacity-10 group-hover:opacity-25 transition-opacity duration-500"></div>
                    <div className="absolute inset-1 rounded-xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/20 rounded-tl-2xl group-hover:border-white/40 transition-colors duration-500"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/20 rounded-br-2xl group-hover:border-white/40 transition-colors duration-500"></div>
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Navigation Toggle */}
              <div className="lg:hidden flex items-center relative z-10">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute top-full left-0 right-0 mt-2 px-4"
              >
                <div className="relative bg-white/10 backdrop-blur-lg shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 rounded-3xl">
                  <div className="px-2 py-3 space-y-1">
                    {/* Navigation Links */}
                    <Link
                      to="/"
                      className={`mobile-nav-button flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive('/') ? 'text-white bg-white/15' : 'text-white/80'
                      } hover:text-white hover:bg-white/10`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Home className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">Home</span>
                    </Link>
                    
                    <Link
                      to="/about"
                      className={`mobile-nav-button flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive('/about') ? 'text-white bg-white/15' : 'text-white/80'
                      } hover:text-white hover:bg-white/10`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Users className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">About Us</span>
                    </Link>
                    
                    <Link
                      to="/profiles"
                      className={`mobile-nav-button flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive('/profiles') ? 'text-white bg-white/15' : 'text-white/80'
                      } hover:text-white hover:bg-white/10`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">Profiles</span>
                    </Link>
                    
                    <Link
                      to="/upcoming-events"
                      className={`mobile-nav-button flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive('/upcoming-events') ? 'text-white bg-white/15' : 'text-white/80'
                      } hover:text-white hover:bg-white/10`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CalendarClock className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">Upcoming Events</span>
                    </Link>
                    
                    <Link
                      to="/past-events"
                      className={`mobile-nav-button flex items-center px-4 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive('/past-events') ? 'text-white bg-white/15' : 'text-white/80'
                      } hover:text-white hover:bg-white/10`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <CalendarDays className="w-5 h-5 mr-3 flex-shrink-0" />
                      <span className="text-sm font-medium">Past Events</span>
                    </Link>

                    {/* Divider */}
                    <div className="h-px bg-white/10 my-2"></div>

                    {/* 🔥 Recruitment CTA Button (Mobile) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="relative px-2 pt-1 pb-2"
                    >
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="apply-now-btn group relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 
                                  hover:from-gray-700 hover:via-gray-600 hover:to-gray-800 text-white font-bold 
                                  py-3 px-6 rounded-2xl transition-all duration-700 transform hover:scale-110 hover:-translate-y-1 
                                  shadow-2xl flex items-center justify-center border border-gray-600/30 w-full"
                        style={{
                          boxShadow:
                            '0 0 40px rgba(255, 255, 255, 0.15), 0 0 80px rgba(156, 163, 175, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                          animation:
                            'etherealGlow 4s ease-in-out infinite alternate, float 3s ease-in-out infinite',
                        }}
                      >
                        <span className="relative z-10 text-sm sm:text-base font-bold tracking-wider 
                          bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent 
                          group-hover:from-white group-hover:via-white group-hover:to-gray-100 
                          transition-all duration-500">
                          Launchpad Registrations
                        </span>

                        <Zap className="relative z-10 ml-2 w-5 h-5 text-white group-hover:rotate-12 
                          group-hover:scale-125 group-hover:text-gray-100 transition-all duration-500 drop-shadow-lg" />

                        {/* Background effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-gray-300/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
                        <div className="absolute inset-0 rounded-2xl bg-white blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-300 to-white blur-xl opacity-10 group-hover:opacity-25 transition-opacity duration-500"></div>
                        <div className="absolute inset-1 rounded-xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/20 rounded-tl-2xl group-hover:border-white/40 transition-colors duration-500"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/20 rounded-br-2xl group-hover:border-white/40 transition-colors duration-500"></div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 🔥 Animations */}
        <style jsx>{`
          @keyframes etherealGlow {
            0% {
              box-shadow:
                0 0 30px rgba(255, 255, 255, 0.15),
                0 0 60px rgba(156, 163, 175, 0.1),
                0 0 90px rgba(209, 213, 219, 0.05),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            100% {
              box-shadow:
                0 0 50px rgba(255, 255, 255, 0.25),
                0 0 100px rgba(156, 163, 175, 0.2),
                0 0 150px rgba(209, 213, 219, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.2);
            }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(1deg); }
          }
        `}</style>
      </nav>

      {/* Blur Backdrop Overlay for Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden backdrop-blur-md bg-black/40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}