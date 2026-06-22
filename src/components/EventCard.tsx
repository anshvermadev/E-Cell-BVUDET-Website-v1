import React from 'react';

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  onClick?: () => void;  // Add onClick prop
}

export default function EventCard({ title, date, image, onClick }: EventCardProps) {
  return (
    <div 
      onClick={onClick}  // Add onClick handler
      className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 cursor-pointer"  // Add cursor-pointer
    >
      {/* Continuous shine effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine pointer-events-none z-10"
      ></div>
      
      {/* Subtle glow on hover */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"></div>
      
      {/* Image with 1.91:1 aspect ratio */}
      <div className="relative overflow-hidden aspect-[1.91/1]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 md:p-6">
        <div className="text-center">
          <h4 className="text-lg md:text-xl font-bold text-white line-clamp-2 mb-2">{title}</h4>
          <p className="text-white/80 text-sm md:text-base">{date}</p>
        </div>
      </div>

      <style jsx>{`
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