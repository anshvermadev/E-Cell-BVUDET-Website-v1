import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Network,
  Target,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
} from "lucide-react";

// TeamMemberProps Interface
interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio?: string;
  expertise?: string[];
  github?: string;
  linkedin?: string;
  email?: string;
}

// TeamMemberCard Component
const TeamMemberCard = ({
  member,
  onClick,
}: {
  member: TeamMemberProps;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-105"
  >
    {/* Shine effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine pointer-events-none"></div>

    {/* Subtle hover glow */}
    <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <div className="relative overflow-hidden aspect-[3/4]">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="relative z-10 p-3 md:p-4 text-center">
      <h4 className="text-white font-bold text-sm md:text-base">{member.name}</h4>
      <p className="text-white/90 text-xs md:text-sm mt-1">{member.role}</p>
    </div>
  </div>
);

export default function About() {
  // Team Data (example)
  const technicalTeam: TeamMemberProps[] = [
    {
      name: "Siddhesh Rane",
      role: "President",
      image: "https://i.ibb.co/jkqJcVmx/5b9216c4bb58.png",
      github: "https://github.com/SiddheshRane049",
      linkedin: "https://www.linkedin.com/in/siddhesh-rane-26471621a",
      email: "technicalsid49@gmail.com",
      bio: "Leading the team to create innovative solutions and mentoring young entrepreneurs.",
      expertise: ["Leadership", "Strategy", "Tech Innovation"],
    },
    {
      name: "Kishan Verma",
      role: "Vice President",
      image: "https://i.ibb.co/jPJdP1TZ/6da2cd9bfc64.jpg",
      github: "https://github.com/SimpleGamez",
      linkedin: "https://www.linkedin.com/in/kishan-verma",
      email: "kv20050705@gmail.com",
      bio: "Focused on technical excellence and team coordination.",
      expertise: ["Web Development", "AI Integration", "Mentorship"],
    },
    // Add more members here...
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
    <div className="min-h-screen bg-black p-6">
      <h2 className="text-3xl text-white font-bold text-center mb-10 glow-text">
        Core Team 2025-26
      </h2>

      {/* Team Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {technicalTeam.map((member) => (
          <TeamMemberCard key={member.name} member={member} onClick={() => openModal(member)} />
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedMember && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/60"
          onClick={closeModal} // close modal on background click
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl max-w-md w-full p-6 text-center relative"
            onClick={(e) => e.stopPropagation()} // prevent modal click from closing
          >
            <button
              className="absolute top-3 right-3 text-white/70 hover:text-white text-xl"
              onClick={closeModal}
            >
              &times;
            </button>

            <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden mb-4">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-white text-xl font-bold">{selectedMember.name}</h3>
            <p className="text-white/80">{selectedMember.role}</p>

            {selectedMember.bio && (
              <p className="text-white/70 mt-3 text-sm">{selectedMember.bio}</p>
            )}

            {selectedMember.expertise && (
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {selectedMember.expertise.map((exp) => (
                  <span
                    key={exp}
                    className="text-white/80 bg-white/10 px-2 py-1 rounded-md text-xs"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-center gap-4 mt-4">
              {selectedMember.github && (
                <a
                  href={selectedMember.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {selectedMember.linkedin && (
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {selectedMember.email && (
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="text-white/70 hover:text-white"
                >
                  <Mail className="w-5 h-5" />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CSS for glow text and shine animation */}
      <style>{`
        .glow-text {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
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
