import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, BookOpen, UserPlus, ArrowRight, Zap } from 'lucide-react';

// Features data
const features = [
  {
    icon: Users,
    title: 'Expert Mentorship',
    description: 'Connect with industry veterans who provide personalized guidance to help you navigate challenges and accelerate growth.'
  },
  {
    icon: BookOpen,
    title: 'Resource Library',
    description: 'Access our comprehensive collection of tools, templates, and educational content designed for entrepreneurs.'
  },
  {
    icon: UserPlus,
    title: 'Community Network',
    description: 'Join a vibrant community of fellow entrepreneurs, share experiences, and build valuable connections.'
  }
];

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Completely disable parallax on mobile and tablets for better performance
    const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
    if (isSmallScreen) return;

    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const parallaxElements = document.querySelectorAll('.parallax');
          
          parallaxElements.forEach((el) => {
            const speed = parseFloat(el.getAttribute('data-speed') || '0.5');
            const yPos = scrollY * speed;
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
          });
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reduced motion preferences detection
  const prefersReducedMotion = typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  return (
    <div className="min-h-screen -mt-16">
      {/* Hero Section with Gradient */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Multi-layer Gradient Background - Top */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-teal-500"></div>
          {/* Radial dark overlay to create center darkness */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/40 to-gray-900/90"></div>
          {/* Dark bottom blend */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-gray-900/60 to-black"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.4 }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.img
            src="E - CELL LOGO.svg"
            alt="E-Cell Logo"
            className="mx-auto mb-4 md:mb-8 w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg ring-2 ring-white/20"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
          />
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-center">
            {/* First line — gradient that matches hero bg */}
            <span className="bg-gradient-to-r from-[#8d72e0] via-[#FFFFFF] to-[#77e2d8] bg-clip-text text-transparent">
              Transform Your Vision Into a
            </span>

            {/* Second line — plain white for clarity */}
            <span className="block mt-2 text-white">
              Thriving Business
            </span>
          </h1>

          
          <p className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 leading-relaxed px-4 max-w-4xl mx-auto">
            Join our community of innovators, access world-class resources, and get the support you need to build the next big thing.
          </p>
          
          {/* Apply Now Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-10"
          >
            <button
              onClick={() => navigate('/register')}
              className="apply-now-btn group relative overflow-hidden bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 hover:from-gray-700 hover:via-gray-600 hover:to-gray-800 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-700 transform hover:scale-110 hover:-translate-y-2 shadow-2xl mx-auto flex items-center justify-center border border-gray-600/30"
              style={{
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.15), 0 0 80px rgba(156, 163, 175, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                animation: 'etherealGlow 4s ease-in-out infinite alternate, float 3s ease-in-out infinite'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-gray-300/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out"></div>
              <div className="absolute inset-0 rounded-2xl bg-white blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-300 to-white blur-xl opacity-10 group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="absolute inset-1 rounded-xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="relative z-10 text-lg sm:text-xl font-bold tracking-wider bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent group-hover:from-white group-hover:via-white group-hover:to-gray-100 transition-all duration-500 whitespace-nowrap">
                Launchpad Registrations
              </span>
              <Zap className="relative z-10 ml-3 w-7 h-7 text-white group-hover:rotate-12 group-hover:scale-125 group-hover:text-gray-100 transition-all duration-500 drop-shadow-lg flex-shrink-0" />
              
              <div className="absolute top-3 right-8 w-3 h-3 bg-white rounded-full opacity-70 animate-ping shadow-lg"></div>
              <div className="absolute bottom-4 left-10 w-2 h-2 bg-gray-200 rounded-full opacity-80 animate-pulse delay-1000 shadow-md"></div>
              <div className="absolute top-6 left-1/3 w-1 h-1 bg-white rounded-full opacity-90 animate-ping delay-1500"></div>
              <div className="absolute bottom-6 right-1/4 w-1 h-1 bg-gray-300 rounded-full opacity-75 animate-pulse delay-500"></div>
              
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-2xl group-hover:border-white/40 transition-colors duration-500"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-2xl group-hover:border-white/40 transition-colors duration-500"></div>
            </button>
          </motion.div>
          
          {/* Navigation Buttons - Glassmorphism Style */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/register')}
              className="group w-full sm:w-auto min-w-[240px] flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 px-6 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105"
            >
              <span className="relative z-10 text-base md:text-lg">Start Your Journey</span>
              <ArrowRight className="relative z-10 ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigate('/about')}
              className="group w-full sm:w-auto min-w-[240px] flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 px-6 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105"
            >
              <span className="relative z-10 text-base md:text-lg">Learn About Us</span>
              <Users className="relative z-10 ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:rotate-12" />
            </button>

            <button
              onClick={() => navigate('/profiles')}
              className="group w-full sm:w-auto min-w-[240px] flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl py-3 px-6 text-white font-semibold shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105"
            >
              <span className="relative z-10 text-base md:text-lg">View Success Stories</span>
              <BookOpen className="relative z-10 ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 group-hover:scale-110" />
            </button>
          </div>

        </motion.div>
      </section>

      {/* Features Section with Gradient at Bottom */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-black">
        {/* Multi-layer Gradient Background - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[380px]">
          {/* Base gradient - reversed colors from top */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-purple-500 to-pink-400"></div>
          {/* Dark top blend */}
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-gray-900/70 to-transparent"></div>
          {/* Radial dark overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-gray-900/50 via-transparent to-transparent"></div>
          {/* Gradual bottom fade to match footer - taller and softer */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-gray-900/30 to-neutral-900"></div>
        </div>
        
        {/* 3D Elements positioned at the bottom like in reference */}
        <div className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none overflow-hidden">
          {/* Card 01 - Glass cube left */}
          <div className="absolute bottom-[8%] left-[8%] w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-40 animate-float-slow" style={{ perspective: '1000px' }}>
            <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(15deg) rotateY(-25deg)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-300/30 to-teal-500/20 backdrop-blur-md border border-white/30 rounded-lg shadow-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tl from-white/20 to-transparent rounded-lg"></div>
            </div>
          </div>
          
          {/* Card 02 - Glass prism center-left */}
          <div className="absolute bottom-[5%] left-[32%] w-24 h-40 md:w-28 md:h-48 lg:w-32 lg:h-56 opacity-35 animate-float-medium">
            <div className="w-full h-full bg-gradient-to-br from-purple-400/30 to-pink-500/20 backdrop-blur-md border border-white/25 shadow-2xl transform -rotate-12 skew-y-3 rounded-lg"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-lg"></div>
          </div>
          
          {/* Card 03 - Angular glass shape center-right */}
          <div className="absolute bottom-[10%] left-[55%] w-28 h-32 md:w-36 md:h-40 lg:w-44 lg:h-48 opacity-40 animate-float-slow-reverse">
            <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-10deg) rotateZ(15deg)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/25 to-purple-500/20 backdrop-blur-md border border-white/25 shadow-2xl" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}></div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}></div>
            </div>
          </div>
          
          {/* Card 04 - Pyramid right */}
          <div className="absolute bottom-[6%] right-[8%] w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 opacity-45 animate-float-medium-reverse">
            <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-15deg) rotateY(20deg)' }}>
              {/* Pyramid base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[90px] md:border-l-[110px] lg:border-l-[130px] border-r-[90px] md:border-r-[110px] lg:border-r-[130px] border-b-[120px] md:border-b-[145px] lg:border-b-[170px] border-l-transparent border-r-transparent border-b-gray-300/35 shadow-2xl"></div>
              {/* Highlight on pyramid */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[85px] md:border-l-[105px] lg:border-l-[125px] border-r-[85px] md:border-r-[105px] lg:border-r-[125px] border-b-[110px] md:border-b-[135px] lg:border-b-[160px] border-l-transparent border-r-transparent border-b-white/10"></div>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.6 }}
          viewport={{ once: true, margin: "-20%" }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-16 text-white">
            Why Choose E-Cell?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: prefersReducedMotion ? 0.1 : 0.5, 
                  delay: prefersReducedMotion ? 0 : index * 0.1 
                }}
                viewport={{ once: true, margin: "-10%" }}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 relative z-20 overflow-hidden"
              >
                {/* Continuous shine effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"
                  style={{
                    animationDelay: `${index * 0.5}s`
                  }}
                ></div>
                
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon and Title side by side */}
                <div className="flex items-center gap-3 md:gap-4 mb-4 relative z-10">
                  <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">{feature.title}</h3>
                </div>
                
                <p className="text-white/90 text-sm md:text-base leading-relaxed relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* Styles */}
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
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(12px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(-12deg) skewY(3deg); }
          50% { transform: translateY(-12px) rotate(-15deg) skewY(3deg); }
        }
        
        @keyframes float-medium-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-slow-reverse {
          animation: float-slow-reverse 7s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        
        .animate-float-medium-reverse {
          animation: float-medium-reverse 5.5s ease-in-out infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
        
        .apply-now-btn:hover {
          box-shadow: 
            0 0 60px rgba(255, 255, 255, 0.3), 
            0 0 120px rgba(156, 163, 175, 0.25),
            0 0 180px rgba(209, 213, 219, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
          filter: brightness(1.1) contrast(1.05);
        }
      `}</style>
    </div>
  );
}