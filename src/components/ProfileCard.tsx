import React from 'react';
import { Mail, Linkedin, Instagram } from 'lucide-react';

interface Profile {
  id: number;
  name: string;
  role: string;
  image: string;
  story: string;
  email: string;
  linkedin: string;
  instagram?: string;
}

interface ProfileCardProps {
  profile: Profile;
  onClick: (profile: Profile) => void;
}

export default function ProfileCard({ profile, onClick }: ProfileCardProps) {
  return (
    <div 
      onClick={() => onClick(profile)}
      className="group relative cursor-pointer h-full"
    >
      {/* Main card with glassmorphism */}
      <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 overflow-hidden h-full min-h-[180px]">
        
        {/* Continuous shine effect */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine pointer-events-none z-20"
          style={{
            animationDelay: `${profile.id * 0.5}s`
          }}
        ></div>
        
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Image with icon */}
          <div className="flex items-center gap-4 mb-4 flex-shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 flex-shrink-0">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-bold text-white truncate">{profile.name}</h3>
              <p className="text-white/90 text-sm md:text-base truncate">{profile.role}</p>
            </div>
          </div>
          
          {/* Story preview - fixed height */}
          <div className="flex-1 mb-4 min-h-[3rem]">
            <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
              {profile.story}
            </p>
          </div>
          
          {/* Social icons - stays at bottom */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <a 
              href={`mailto:${profile.email}`}
              onClick={(e) => e.stopPropagation()}
              className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            {profile.instagram && (
              <a 
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-white/70 hover:text-white transition-all duration-200 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
          </div>
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}