import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { FaWhatsapp, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 rounded-[3rem] border border-neutral-700 p-8 sm:p-10 shadow-xl bg-neutral-900">
          <div className="grid grid-cols-1 md:grid-cols-7 lg:grid-cols-12 gap-8 md:gap-12 mb-12">
            {/* Brand and mission */}
            <div className="md:col-span-3 lg:col-span-5">
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src="E-cell Logo.svg"
                  alt="E-Cell BVUDET"
                  className="h-20"
                />
              </div>
              <p className="text-gray-300 mb-6">
                E-Cell BVUDET is dedicated to fostering entrepreneurship and innovation among students. We provide a platform for aspiring entrepreneurs to learn, connect, and grow their ideas into successful ventures.
              </p>
              <div className="flex space-x-5">
                <a
                  href="mailto:ecellbvudet@gmail.com"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Mail className="size-8" />
                </a>
                <a
                  href="https://www.linkedin.com/company/e-cell-bvdu-det-nm/"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="size-8" />
                </a>
                <a
                  href="https://www.instagram.com/ecell_bvdu_det"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="size-8" />
                </a>
                <a
                  href="https://chat.whatsapp.com/IkcrAZkAVxJ7Ppuv7FDtYq"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="size-8" />
                </a>
                <a
                  href="https://twitter.com/ecelldetnm?s=11"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="size-8" />
                </a>
              </div>
            </div>

            {/* Contact Us */}
            <div className="md:col-span-4 lg:col-span-3">
              <h3 className="text-white font-semibold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Address</h4>
                    <p className="text-gray-300 text-sm">
                      BVUDET NM
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-gray-300 text-sm">ecellbvudet@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white">Phone</h4>
                    <p className="text-gray-300 text-sm">+91 9769006387</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-4 lg:col-span-2">
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profiles"
                    className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
                  >
                    Profiles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <a
                    href="/past-events"
                    className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
                  >
                    Past Events
                  </a>
                </li>
                <li>
                  <a
                    href="upcoming-events"
                    className="text-gray-300 hover:text-purple-400 text-sm transition-colors"
                  >
                    Upcoming Events
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-t border-neutral-700 pt-6 mt-2 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} E-Cell BVUDET. All rights reserved.
            </p>
          </div>
        </div>

        {/* Large background text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="w-full overflow-visible pointer-events-none h-16 sm:h-24 md:h-44 lg:h-48 px-2 mt-8 sm:mt-12 md:-mt-2">
            <p className="relative -bottom-0 sm:-bottom-2 md:-bottom-2 lg:-bottom-3 text-gray-300 text-center font-extrabold opacity-20 select-none whitespace-nowrap tracking-tighter" 
               style={{ fontSize: 'clamp(2rem, 10vw, 12rem)', letterSpacing: '-0.04em' }}>
              E-CELL BVUDET NM
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}