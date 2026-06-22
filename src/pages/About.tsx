import React from "react";
import { motion } from "framer-motion";
import { Code, Network, Target, Github, Linkedin, Mail, Instagram } from "lucide-react";

import { coreTeam, TeamMemberProps } from "../data/teamMembers";

const TeamMemberCard = ({
  member,
  onClick,
}: {
  member: TeamMemberProps;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300"
  >
    {/* Shine effect on entire card */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine pointer-events-none z-10"></div>
    
    {/* Image with hover zoom */}
    <div className="relative overflow-hidden aspect-square">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
      />
    </div>

    <div className="p-3 md:p-4 text-center relative z-20">
      <h4 className="text-white font-bold font-mono text-sm md:text-base uppercase">{member.name}</h4>
      <p className="text-white/90 text-xs md:text-sm mt-1">{member.role}</p>
    </div>
  </div>
);

export default function About() {


  const values = [
    {
      icon: Code,
      title: "Technical Innovation",
      description:
        "We leverage cutting-edge technologies to build scalable, future-proof solutions that drive business growth.",
    },
    {
      icon: Network,
      title: "Global Network",
      description:
        "Connect with a worldwide community of entrepreneurs, mentors, and investors who share your passion.",
    },
    {
      icon: Target,
      title: "Focused Execution",
      description:
        "We believe in turning ideas into action through structured guidance and measurable outcomes.",
    },
  ];

  const [selectedMember, setSelectedMember] = React.useState<TeamMemberProps | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const openModal = (member: TeamMemberProps) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen bg-black -mt-16">
      {/* Hero Section - Now properly matches Home page gradient with no black section */}
      <section className="relative pt-28 sm:pt-32 pb-10 sm:pb-14 overflow-hidden">
        {/* Multi-layer Gradient Background - matching home page exactly */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-500 to-teal-500"></div>
          {/* Radial dark overlay to create center darkness */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/40 to-gray-900/90"></div>
          {/* Dark bottom blend */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-gray-900/60 to-black"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 glow-text">
            Empowering Tomorrow's
            <span className="block mt-1">Tech Leaders</span>
          </h2>
          <p className="text-base sm:text-lg text-white leading-relaxed">
            E-Cell is a catalyst for innovation, transforming visionary ideas into successful enterprises.
          </p>
        </div>
      </section>

      {/* Core Values Section - Smoother transition */}
      <section className="py-2 sm:py-12 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-10 glow-text">Our Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {values.map(({ icon: Icon, title, description }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105 relative z-20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-3 md:gap-4 mb-4 relative z-10">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                  <h4 className="text-xl md:text-2xl font-bold text-white">{title}</h4>
                </div>
                <p className="text-white/90 text-sm md:text-base leading-relaxed relative z-10">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Section - Better gradient transition */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* Gradient background matching the theme */}
        <div className="absolute inset-0">
          {/* Dark blend from top */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-gray-900/70 to-transparent z-10"></div>
          {/* Main gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-500 via-purple-500 to-pink-400"></div>
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/20 to-transparent"></div>
          {/* Gradual bottom fade to match footer - taller and softer */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-gray-900/30 to-neutral-900"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 glow-text">Core Team 2025 - 26</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {coreTeam.map((member) => (
              <TeamMemberCard key={member.name} member={member} onClick={() => openModal(member)} />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl w-[90%] sm:w-[80%] md:w-[500px] lg:w-[650px] p-6 sm:p-8 md:p-10 text-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine pointer-events-none"></div>

            <button
              className="absolute top-3 right-3 text-white/70 hover:text-white text-xl z-20"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Image */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-52 lg:h-52 mx-auto rounded-xl overflow-hidden mb-4 z-20">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name & Role */}
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold font-mono z-20 uppercase">{selectedMember.name}</h3>
            <p className="text-white/80 text-sm sm:text-base md:text-lg">{selectedMember.role}</p>

            {/* Bio */}
            {selectedMember.bio && (
              <p className="text-white/70 mt-3 text-xs sm:text-sm md:text-base z-20">{selectedMember.bio}</p>
            )}

            {/* Social Icons */}
            <div className="flex justify-center gap-4 mt-4 z-20">
              {selectedMember.github && (
                <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <Github className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
              {selectedMember.linkedin && (
                <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
              {selectedMember.instagram && (
                <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                  <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
              {selectedMember.email && (
                <a href={`mailto:${selectedMember.email}`} className="text-white/70 hover:text-white">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .glow-text { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
        @keyframes shine { 0% { transform: translateX(-100%) skewX(-12deg); } 100% { transform: translateX(200%) skewX(-12deg); } }
        .animate-shine { animation: shine 3s ease-in-out infinite; }
        .bg-gradient-radial { background: radial-gradient(circle at center, var(--tw-gradient-stops)); }
      `}</style>
    </div>
  );
}