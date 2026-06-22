import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Profiles from './pages/Profiles';
import Register from './pages/Register';
import Recruitment2025 from './pages/Recruitment2025';
import PastEvents from './pages/PastEvents';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import UpcomingEvents from './pages/UpcomingEvents';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        {/* <Route path="/recruitment-2025" element={<Recruitment2025 />} /> */}
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-black">
        <Navigation />
        <main className="flex-grow pt-16">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


{/* Mega Events Section */}
      {/* <section className="py-10 sm:py-14 bg-black/30 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 glow-text">Upcoming Events</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {megaEvents.map(({ date, title, description, stats }) => (
              <div key={title} className="relative group">
                <div className="feature-card h-full">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 text-white mr-2" />
                    <div className="text-white font-semibold text-xs sm:text-sm">{date}</div>
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-2">{title}</h4>
                  <p className="text-gray-200 text-xs sm:text-sm mb-2">{description}</p>
                  <div className="text-xs text-gray-300 bg-white/5 rounded-lg px-2 py-1 backdrop-blur-sm">
                    {stats}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}