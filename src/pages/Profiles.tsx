import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import ProfileModal from '../components/ProfileModal';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const profiles = [
  {
    id: 1,
    name: 'Prajakta Bangale',
    role: 'Freelancer',
    image: "https://i.ibb.co/LDwQtHqt/workshop.png",
    story: 'Prajakta is a passionate freelance graphic designer, video editor, and content creator. As an entrepreneur and content strategist, she helps brands tell their stories in unique and engaging ways. With a strong talent for storytelling, she creates impactful content that connects with audiences and brings ideas to life.',
    email: 'bangaleprajakta31@gmail.com',
    linkedin: 'https://www.linkedin.com/in/prajakta-bangale-63b7b523a',
    instagram: 'https://www.instagram.com/prajaktabangale'
  },
  {
    id: 2,
    name: 'Fahim Khan',
    role: 'Owner, FK Jersey House',
    image: "https://i.ibb.co/wFqsdPCt/workshop-2.png",
    story: 'In just two years of starting his own jersey brand, Fahim has successfully reached an impressive milestone of generating ₹1.2 lakh in revenue. One of the most important skills Fahim has demonstrated is in the marketing and operation-friendly efficiency that he generated. Fahim developed a very low-cost selling model, which helped him not only streamline the operations but also keep profit margins intact.',
    email: 'fkjerseyhouse@gmail.com',
    linkedin: 'https://www.linkedin.com/in/fahim-khan-3a87a3229',
    instagram: 'https://www.instagram.com/fk_jerseyhouse_'
  },
  {
    id: 3,
    name: 'Adityaa Negi',
    role: 'Co-Founder, Fullstack Dev at Terabit Support',
    image: "https://i.ibb.co/fY3LQJzC/workshop-1.png",
    story: 'Growing up, football was my passion, and my dream was to be a football player. A serious hand injury shattered my aspirations and wrecked my athletic career. Surgery forced me to rethink my path, but rather than letting the setback define me, I channeled all the discipline and resilience that I developed on the field into a new passion: Technology. I was given an opportunity to start rebuilding myself from the ground up in full-stack development. Today, as a co-founder creating transformative digital solutions, I’m proof that even life’s toughest obstacles can spark new beginnings and greater dreams.',
    email: 'adityadeveloper8928@gmail.com',
    linkedin: 'https://www.linkedin.com/in/adityaa-negi-679804278',
    instagram: 'https://www.instagram.com/adityaa_negi/profilecard/?igsh=MW8xM2E1a3VvZTdhYw=='
  },
  {
    id:4,
    name: 'Ravikishan Singh',
    role: 'Creator of Beatsonmusic',
    image: "https://i.ibb.co/rfk7FSd6/7.png",
    story: 'Ravikishan is the faceless creator behind Beatsonmusic, a YouTube channel with 1M+ subscribers. He started during the lockdown with zero editing knowledge, using just a phone and simple tools. His Bollywood edits bring emotion, nostalgia, and cinematic storytelling to life. Known for being "felt by millions, known by none," his faceless identity allows emotions to take center stage and connect deeply with audiences.',
    email: '',
    linkedin: '',
    instagram: 'https://www.instagram.com/beatsonmusic'
  },
  {
    id:5,
    name: 'Omkar Padekar',
    role: 'Brand Positioning & Digital Strategy Agency',
    image: "https://i.ibb.co/60Z8SDky/5.png",
    story: 'BuildMyBrand helps creators, freelancers, founders, and agencies cut through the noise and get noticed online. They specialize in crafting bold positioning, personal branding systems, viral storytelling, memetic marketing, and platform-specific strategies. With psychology-driven methods and validated results, they empower individuals and brands to transform invisibility into influence, delivering real growth, visibility, and inbound opportunities.',
    email: '',
    linkedin: '',
    instagram: 'https://www.instagram.com/ooomeme_'
      },
  {
    id: 6,
    name: 'Shubham Gaikwad',
    role: 'Founder, CampHustle',
    image:"https://i.ibb.co/JXgpbG9/6.png",
    story: 'Shubham is the founder of CampHustle, a student-powered creative agency focused on helping cafes, salons, brands, and influencers grow their social media presence. With services like reels, photoshoots, Canva animations, nano-creator collaborations, and account strategy management, CampHustle provides affordable and impactful content solutions. Backed by a young and energetic team, they’ve worked with brands like RedBull, McCaffeine, Under25, Lions Club, and Britannia.',
    email: 'camphust25@gmail.com',
    linkedin: '',
    instagram: 'https://www.instagram.com/camphust25'
  },
];

export default function Profiles() {
  const [selectedProfile, setSelectedProfile] = useState<typeof profiles[0] | null>(null);

  return (
    <>
      <div className="min-h-screen bg-black -mt-16">
        {/* Hero Section - Compact like About page */}
        <section className="relative pt-28 sm:pt-32 pb-6 sm:pb-8 overflow-hidden">
          {/* Multi-layer Gradient Background - matching About page exactly */}
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
              Featured Entrepreneurs
            </h2>
          </div>
        </section>

        {/* Profiles Grid Section - on black background */}
        <section className="relative py-6 sm:py-8 bg-black overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              {profiles.map((profile) => (
                <motion.div
                  key={profile.id}
                  variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                >
                  <ProfileCard
                    profile={profile}
                    onClick={setSelectedProfile}
                  />
                </motion.div>
              ))}
            </motion.div>
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

      {selectedProfile && (
        <ProfileModal
          profile={selectedProfile}
          onClose={() => setSelectedProfile(null)}
        />
      )}

      <style>{`
        .glow-text { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
        .bg-gradient-radial { background: radial-gradient(circle at center, var(--tw-gradient-stops)); }
      `}</style>
    </>
  );
}