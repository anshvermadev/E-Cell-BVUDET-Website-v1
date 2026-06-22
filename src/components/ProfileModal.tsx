import React, { useEffect, useRef } from 'react';
import { X, Linkedin, Instagram } from 'lucide-react';

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

interface ProfileModalProps {
  profile: Profile;
  onClose: () => void;
}

export default function ProfileModal({ profile, onClose }: ProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Sample profile data for demonstration
  const sampleProfile = {
    id: 1,
    name: "Sarah Johnson",
    role: "Senior Software Engineer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&h=687",
    story: "Sarah is a passionate software engineer with over 8 years of experience in full-stack development. She specializes in React, Node.js, and cloud architecture. When she's not coding, she enjoys hiking, photography, and mentoring junior developers. Sarah believes in building inclusive tech communities and has spoken at multiple conferences about diversity in tech.",
    email: "sarah.johnson@example.com",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    instagram: "https://instagram.com/sarahcodes"
  };

  const displayProfile = profile || sampleProfile;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div 
        ref={modalRef}
        className="relative bg-white/5 backdrop-blur-xl border border-white/30 rounded-xl max-w-2xl w-full max-h-[90vh] shadow-2xl overflow-hidden"
      >
        {/* Continuous shine effect - on top of everything */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine pointer-events-none z-50"
        ></div>
        
        {/* Enhanced glow layers */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] pointer-events-none"></div>
        
        {/* Content wrapper with scroll */}
        <div className="relative z-20 max-h-[90vh] overflow-y-auto overflow-x-hidden">
          <div className="relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-white/70 hover:text-white z-10 bg-black/50 backdrop-blur-sm rounded-full p-1 border border-white/20 transition-all duration-200 hover:bg-white/20"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={displayProfile.image}
              alt={displayProfile.name}
              className="w-full object-contain rounded-t-xl"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white">{displayProfile.name}</h2>
            <p className="text-white/90 mt-1">{displayProfile.role}</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-2">Story</h3>
              <p className="text-white/80 leading-relaxed">{displayProfile.story}</p>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-white/70">Email:</span>
                <a href={`mailto:${displayProfile.email}`} className="text-white/90 hover:text-white transition-colors">
                  {displayProfile.email}
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <a 
                  href={displayProfile.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn Profile</span>
                </a>
                {displayProfile.instagram && (
                  <a 
                    href={displayProfile.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
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
        `}</style>
      </div>
    </div>
  );
}