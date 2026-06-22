import React from 'react';
import PageTransition from '../components/PageTransition';
import EventCard from '../components/EventCard';
import EventModal from '../components/EventModal';
import { useState } from 'react';

const Events = [
  {
    title: 'LAUNCHPAD 2025',
    date: 'October 2025',
    image: 'https://i.ibb.co/B5xqCP78/launchpad-insta-700-x-400-px.png',
    images: [
      '/launchpad1.jpg',
      '/launchpad2.jpg',
      '/launchpad3.jpg',
    ],

    description: 'An exciting workshop on development with AI technologies.'
  },
  {
    title: 'DEV WITH AI',
    date: 'April 2025',
    image: 'https://i.ibb.co/pjHWsVNM/Presents-700-x-400-px.png',
    images: [
      '/dev1.jpg',
      '/dev2.jpg',
      '/dev3.jpg',
    ],

    description: 'An exciting workshop on development with AI technologies.'
  },
  {
    title: 'Spark Tank',
    date: 'August 2025',
    image: 'https://i.ibb.co/nNQmZ4Yh/spark.png',
    images: [
      '/spark1.jpg',
      '/spark2.jpg',
    ],
    description: 'Creative innovation showcase and competition.'
  },
  {
    title: 'YSF 2024',
    date: 'January 2025',
    image: 'https://i.ibb.co/3yXG4bv5/SANJEEV-JAIN.png',
    images: [
      'https://i.ibb.co/3yXG4bv5/SANJEEV-JAIN.png',
    ],
    description: 'Young Startup Forum bringing together innovators and entrepreneurs.'
  },
  {
    title: 'Shark Tank',
    date: 'February 2025',
    image: 'https://i.ibb.co/5x5QMqNq/shark-tank-magazine-Presentation.png',
    images: [
      'https://i.ibb.co/5x5QMqNq/shark-tank-magazine-Presentation.png',
    ],
    description: 'Pitch competition featuring innovative startup ideas.'
  },
  
];

export default function PastEvents() {
  const [selectedEvent, setSelectedEvent] = useState<typeof Events[0] | null>(null);

  return (
    <>
      <div className="min-h-screen bg-black -mt-16">
        {/* Hero Section - Compact like Profiles page */}
        <section className="relative pt-28 sm:pt-32 pb-6 sm:pb-8 overflow-hidden">
          {/* Multi-layer Gradient Background - matching Profiles page exactly */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-teal-500"></div>
            {/* Radial dark overlay to create center darkness */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/40 to-gray-900/90"></div>
            {/* Dark bottom blend */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-gray-900/60 to-black"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold glow-text">
              Past Events
            </h2>
            <p className="text-gray-300 mt-2 sm:mt-3 text-sm sm:text-base">
              A glimpse into our recent happenings and community moments.
            </p>
          </div>
        </section>

        {/* Events Grid Section - on black background */}
        <section className="relative py-6 sm:py-8 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
              {Events.map((ev) => (
                <EventCard
                  key={ev.title}
                  title={ev.title}
                  date={ev.date}
                  image={ev.image}
                  onClick={() => setSelectedEvent(ev)}
                />
              ))}
            </div>
          </div>

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
        </section>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <style>{`
        .glow-text { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
        .bg-gradient-radial { background: radial-gradient(circle at center, var(--tw-gradient-stops)); }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
