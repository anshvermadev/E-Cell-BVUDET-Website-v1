import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Users } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'PitchX 2026 - Entrepreneurship Pitch Competition',
    date: 'Jan 16, 2026',
    venue: 'BVUDET, Kharghar, Navi Mumbai',
    shortDesc: 'Showcase your entrepreneurial vision and compete for glory in this two-stage pitch competition.',
    fullDesc: 'PitchX 2026 is an exciting entrepreneurship pitch competition organized by E-CELL, Bharati Vidyapeeth Deemed University in association with StockGro. This two-stage competition invites undergraduate and postgraduate students from all streams to present their innovative startup ideas. Stage 1 features an online screening round (Jan 3-10) where teams submit pitch decks, followed by Stage 2 - an offline finale round (Jan 16) where shortlisted teams present live before a distinguished panel of judges. This is your opportunity to transform your entrepreneurial vision into reality, network with industry experts, and gain valuable feedback on your business ideas. All finalists receive participation certificates with additional prizes to be announced.',
    time: 'Finale: Jan 16, 2026',
    attendees: 'Registration Open',
    poster: 'https://i.ibb.co/zTc3gWXh/Pitch-X-2026.png',
    registrationLink: 'https://unstop.com/competitions/pitchx-2026-bharati-vidyapeeth-deemed-university-1617454'
  }
];

const EventCard = ({ event, onClick }) => {
  return (
    <div
      onClick={() => onClick(event)}
      className="group relative cursor-pointer h-full"
    >
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 overflow-hidden h-full">

        {/* Continuous shine effect - exactly like ProfileCard */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine pointer-events-none z-20"
          style={{
            animationDelay: `${event.id * 0.5}s`
          }}
        ></div>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          {/* Title */}
          <h3 className="text-lg font-bold text-white line-clamp-2 min-h-[3rem]">
            {event.title}
          </h3>

          {/* Date & Venue with Icons */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/80 flex-shrink-0" />
              <span className="text-white/90">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/80 flex-shrink-0" />
              <span className="text-white/90 line-clamp-1">{event.venue}</span>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-white/70 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
            {event.shortDesc}
          </p>

          {/* View Details Link */}
          <div className="pt-1">
            <span className="text-white text-sm font-semibold inline-flex items-center gap-1">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl max-h-[85vh] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Shine effect on modal */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine pointer-events-none z-20 rounded-2xl"></div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors border border-white/20"
          >
            <X className="w-5 h-5 text-purple-500" />
          </button>

          {/* Scrollable Content */}
          <div className="overflow-y-auto overflow-x-hidden flex-1">
            {/* Poster Image - 1.91:1 aspect ratio */}
            <div className="relative w-full" style={{ aspectRatio: '1.91/1' }}>
              <img
                src={event.poster}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 space-y-5">
              {/* Title */}
              <h2 className="text-2xl font-bold text-white">{event.title}</h2>

              {/* Event Details with Icons - Glassmorphism boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <Calendar className="w-5 h-5 text-white/90 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-white/60 text-xs">Date</p>
                    <p className="text-white font-medium text-sm break-words">{event.date}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <Clock className="w-5 h-5 text-white/90 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-white/60 text-xs">Time</p>
                    <p className="text-white font-medium text-sm break-words">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <MapPin className="w-5 h-5 text-white/90 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-white/60 text-xs">Venue</p>
                    <p className="text-white font-medium text-sm break-words">{event.venue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <Users className="w-5 h-5 text-white/90 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-white/60 text-xs">Status</p>
                    <p className="text-white font-medium text-sm break-words">{event.attendees}</p>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-base font-semibold text-white mb-2">About This Event</h3>
                <p className="text-white/80 text-sm leading-relaxed break-words">{event.fullDesc}</p>
              </div>

              {/* Registration Button */}
              <button
                onClick={() => window.open(event.registrationLink, '_blank')}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white text-center font-semibold rounded-lg transition-all duration-300"
              >
                Register Now
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <div className="min-h-screen bg-black -mt-16 flex flex-col">
        {/* Hero Section */}
        <section className="relative pt-28 sm:pt-32 pb-6 sm:pb-8 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-teal-500"></div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/40 to-gray-900/90"></div>
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-gray-900/60 to-black"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold glow-text text-white">
              Upcoming Events
            </h2>
          </div>
        </section>

        {/* Events Grid Section */}
        <section className="relative py-6 sm:py-8 bg-black overflow-hidden flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {events.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white/90 leading-relaxed max-w-3xl mx-auto">
                  We are planning exciting upcoming events.<br />
                  Will update here soon...
                </h3>
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {events.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                  >
                    <EventCard event={event} onClick={setSelectedEvent} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-[380px]">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-purple-500 to-pink-400"></div>
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-gray-900/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-radial from-gray-900/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-gray-900/30 to-neutral-900"></div>
          </div>
        </section>
      </div>

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}

      <style>{`
        .glow-text { 
          text-shadow: 0 0 20px rgba(255,255,255,0.5); 
        }
        .bg-gradient-radial { 
          background: radial-gradient(circle at center, var(--tw-gradient-stops)); 
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
