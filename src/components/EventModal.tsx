import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function EventModal({ event, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % event.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + event.images.length) % event.images.length);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60 p-4"
      onClick={handleBackdropClick}
    >
      {/* Modal Container - matching team member style */}
      <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl w-[95%] sm:w-[90%] md:w-[600px] lg:w-[700px] max-h-[90vh] overflow-hidden p-6 sm:p-8 md:p-10">
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine pointer-events-none z-10"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors duration-200 z-20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Slider */}
        <div className="relative w-full mb-4 z-20 mt-4">
          {/* Image Container */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3">
            <img
              src={event.images[currentImageIndex]}
              alt={`${event.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Navigation Controls - Below Image */}
          {event.images.length > 1 && (
            <div className="flex items-center justify-center gap-4">
              {/* Slider Dots */}
              <div className="flex gap-2">
                {event.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      idx === currentImageIndex
                        ? 'bg-white w-6'
                        : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              {/* Arrow Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={prevImage}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="text-center z-20 relative">
          <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold">{event.title}</h3>
          <p className="text-white/70 text-sm sm:text-base md:text-lg font-medium mt-2">{event.date}</p>
          <p className="text-white/70 mt-3 text-xs sm:text-sm md:text-base leading-relaxed">{event.description}</p>
        </div>
      </div>

      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}