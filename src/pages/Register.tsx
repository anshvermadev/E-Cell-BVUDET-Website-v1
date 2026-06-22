import React from 'react';
import PageTransition from '../components/PageTransition';
import RegistrationForm from '../components/RegistrationForm';

export default function Register() {
  return (
    <PageTransition className="min-h-screen -mt-16">
      {/* Hero Section with Gradient matching Home page */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-28 pb-0 overflow-hidden">
        {/* Multi-layer Gradient Background - Same as Home */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-teal-500"></div>
          {/* Radial dark overlay to create center darkness */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/40 to-gray-900/90"></div>
          {/* Dark bottom blend */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-gray-900/60 to-black"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-[#8d72e0] via-[#FFFFFF] to-[#77e2d8] bg-clip-text text-transparent">
              Join Our Community
            </span>
          </h2>
          
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 md:mb-4 text-white">
            Are you a student passionate about entrepreneurship?
          </h3>
          
          <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed mb-0 text-center max-w-4xl mx-auto px-4">
            Register now for exclusive resources, mentorship, and a community of innovators. 
            Whether you have an idea or just want to learn, we're here to support you!
          </p>
        </div>
      </section>
      
      {/* Form Section with Black Background and Bottom Gradient */}
      <section className="py-2 md:py-3 relative overflow-hidden bg-black">
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RegistrationForm />
        </div>
      </section>
      
      {/* Styles */}
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </PageTransition>
  );
}