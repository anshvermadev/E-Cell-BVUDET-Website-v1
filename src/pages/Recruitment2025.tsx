import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Upload, Check, X, CheckCircle, AlertTriangle, Clock, Users, Mail } from 'lucide-react';

// Mock PageTransition component
const PageTransition = ({ children, className }) => (
  <div className={className}>{children}</div>
);

// API function
const submitRecruitmentForm = async (form, resumeFile) => {
  try {
    const formData = new FormData();

    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('contactNo', form.contactNo);
    formData.append('branch', form.branch);
    formData.append('year', form.year);
    formData.append('positions', form.positions.join(', '));
    formData.append('whyJoin', form.whyJoin);
    formData.append('pastExperience', form.pastExperience || '');

    if (resumeFile) {
      const base64 = await convertFileToBase64(resumeFile);
      formData.append('resume', base64);
    }

    const GOOGLE_SCRIPT_URL = '';
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.status !== 'success') {
      throw new Error(result.message || 'Failed to submit recruitment form');
    }

    return { success: true, result };
  } catch (error) {
    throw error;
  }
};

// Helper function to convert File to base64
function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Custom Dropdown Component
const CustomDropdown = ({ value, onChange, options, placeholder, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-900/80 border border-white/20 rounded-xl px-4 py-4 pr-12 text-left text-white focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:border-white/30 flex items-center justify-between"
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl overflow-hidden">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className="w-full px-4 py-3 text-left text-white hover:bg-white/10 transition-colors duration-200 border-b border-white/10 last:border-b-0"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Recruitment2025() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    contactNo: '',
    branch: '',
    year: '',
    positions: [],
    whyJoin: '',
    pastExperience: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const positionsList = [
    'President (Third Year Preferred)',
    'Vice President (Third Year Preferred)',
    'Technical Head',
    'Design Head',
    'Social Media Head',
    'PR Head',
    'Event Management Head',
  ];

  const branches = [
    { value: 'CSE', label: 'Computer Science Engineering' },
    { value: 'AIML', label: 'Artificial Intelligence & Machine Learning' },
    { value: 'IT', label: 'Information Technology' },
    { value: 'CSBS', label: 'Computer Science & Business Systems' },
  ];

  const years = [
    { value: 'Second Year', label: 'Second Year' },
    { value: 'Third Year', label: 'Third Year' },
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePositionToggle(position) {
    setForm((prev) => {
      const selected = new Set(prev.positions);
      if (selected.has(position)) {
        selected.delete(position);
      } else if (selected.size < 3) {
        selected.add(position);
      }
      return { ...prev, positions: Array.from(selected) };
    });
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size <= 10 * 1024 * 1024) {
        setResumeFile(file);
      } else {
        setError('File size must be less than 10 MB');
      }
    }
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10 MB');
      return;
    }
    setResumeFile(file);
  }

  function removeFile() {
    setResumeFile(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    // Validation
    const requiredFields = ['name', 'email', 'contactNo', 'branch', 'year', 'whyJoin'];
    const missingFields = requiredFields.filter(field => !form[field]);
    
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (form.positions.length === 0) {
      setError('Please select at least one position');
      return;
    }

    if (resumeFile && resumeFile.size > 10 * 1024 * 1024) {
      setError('Resume file is too large. Max 10 MB.');
      return;
    }

    try {
      setSubmitting(true);
      await submitRecruitmentForm(form, resumeFile);
      setSubmitSuccess(true);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Reset form
      setForm({
        name: '',
        email: '',
        contactNo: '',
        branch: '',
        year: '',
        positions: [],
        whyJoin: '',
        pastExperience: '',
      });
      setResumeFile(null);
    } catch (err) {
      setError(err?.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Success State Component
  if (submitSuccess) {
    return (
      <PageTransition className="py-24 bg-gradient-to-br from-gray-900 to-black min-h-[calc(100vh-4rem)]">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl border border-gray-800 shadow-lg">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Application Submitted Successfully!</h3>
              <p className="text-gray-400 mb-4">Thank you for applying to join the E-Cell Core Team!</p>
              <p className="text-gray-500 text-sm mb-6">We'll review your application and get back to you soon with the next steps.</p>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Go to Home Page
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="pt-12 pb-24 bg-gradient-to-br from-gray-900 to-black min-h-[calc(100vh-4rem)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent leading-tight">
            E-Cell Core Team Recruitment 2025-26
          </h1>
          <div className="inline-flex items-center gap-3 bg-red-600/10 border border-red-500/30 rounded-full px-6 py-3">
            <Clock className="w-6 h-6 text-red-400" />
            <span className="text-red-300 font-semibold text-lg">Applications Closed</span>
          </div>
        </div>

        {/* Interview Announcement */}
        <div className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-500/30 rounded-2xl p-8 md:p-10 mb-12 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600/20 rounded-full mb-6">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-green-300 mb-4">
              📢 E-CELL 2025-26 Core Team Interviews 🚀
            </h2>
            
            <div className="bg-gray-900/60 border border-white/20 rounded-xl p-6 mb-6 max-w-2xl">
              <p className="text-white font-semibold mb-4">Interviews will be held for the following positions:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-200">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Technical Head
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Design Head
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Social Media Head
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      PR Head
                  </div>
                  <div className="flex items-center gap-2 text-gray-200">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Event Management Head
                  </div>
              </div>
            </div>

            <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-yellow-500/20 rounded-full mt-1">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <p className="text-yellow-200 text-sm">
                    <span className="font-semibold">📌 Important:</span> Applicants for <span className="font-semibold">President & Vice President</span> are requested to meet the Faculty Coordinator directly (<span className="font-semibold">Prof. Deepika Sharma</span>).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 justify-center mb-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-blue-200 font-semibold">Schedule & Venue</span>
              </div>
              <p className="text-blue-100 text-lg font-medium">30th August, 2025 at Lab 107 from 9:00 AM Onwards</p>
            </div>

            <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-purple-200 font-medium">📑 Don't forget to bring a copy of your resume.</span>
              </div>
            </div>

            <p className="text-lg text-green-200 font-medium">
              Bring your energy, creativity, and ideas—we can't wait to meet you! 💡🔥
            </p>
          </div>
        </div>

        {/* Main Message Card */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          <div className="text-center">
            {/* Contact Information */}
            <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-6">
              <div className="text-center">
                <h3 className="text-blue-200 font-semibold mb-2">Have Questions?</h3>
                <p className="text-blue-100/90 text-sm mb-6">
                  If you have any questions about the recruitment process or need assistance, feel free to reach out to us.
                </p>
                
                {/* Contact Links */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {/* Email Link */}
                  <a 
                    href="mailto:ecellbvudet@gmail.com" 
                    className="flex items-center gap-3 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-600/50 hover:border-gray-500/50 rounded-xl px-6 py-3 transition-all duration-300 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="p-2 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                      <Mail className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                    </div>
                    <div className="text-left">
                      <div className="text-white text-sm font-medium">Email Us</div>
                      <div className="text-gray-400 text-xs">ecellbvudet@gmail.com</div>
                    </div>
                  </a>

                  {/* Instagram Link */}
                  <a 
                    href="hhttps://www.instagram.com/ecell_bvdu_det" 
                    className="flex items-center gap-3 bg-gray-800/60 hover:bg-gray-700/60 border border-gray-600/50 hover:border-gray-500/50 rounded-xl px-6 py-3 transition-all duration-300 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="p-2 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-colors">
                      <svg className="w-5 h-5 text-pink-400 group-hover:text-pink-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-white text-sm font-medium">Follow Us</div>
                      <div className="text-gray-400 text-xs">@ecell_bvdu_det</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Commented out form section */}
        {/*
        <div className="space-y-8 bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Name<span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-900/80 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:border-white/30"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Email<span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-gray-900/80 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:border-white/30"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Contact No<span className="text-red-400 ml-1">*</span>
            </label>
            <input
              type="tel"
              name="contactNo"
              value={form.contactNo}
              onChange={handleChange}
              className="w-full bg-gray-900/80 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:border-white/30"
              placeholder="10-digit phone number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Branch<span className="text-red-400 ml-1">*</span>
            </label>
            <CustomDropdown
              name="branch"
              value={form.branch}
              onChange={handleChange}
              options={branches}
              placeholder="Select your branch"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Year<span className="text-red-400 ml-1">*</span>
            </label>
            <CustomDropdown
              name="year"
              value={form.year}
              onChange={handleChange}
              options={years}
              placeholder="Select your year"
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-200">
              Interested Positions<span className="text-red-400 ml-1">*</span>
              <span className="text-gray-400 font-normal ml-2">({form.positions.length}/2 selected)</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {positionsList.map((pos) => {
                const isSelected = form.positions.includes(pos);
                const isDisabled = !isSelected && form.positions.length >= 2;
                
                return (
                  <div key={pos}>
                    <label 
                      className={`group relative flex items-center space-x-4 border rounded-xl px-5 py-4 transition-all duration-200 ${
                        isDisabled 
                          ? 'bg-gray-900/30 border-white/10 cursor-not-allowed opacity-50' 
                          : isSelected
                          ? 'bg-green-600/20 border-green-500/40 cursor-pointer hover:bg-green-600/30 hover:border-green-500/60'
                          : 'bg-gray-900/60 border-white/20 cursor-pointer hover:bg-gray-900/80 hover:border-white/30'
                      }`}
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handlePositionToggle(pos)}
                          disabled={isDisabled}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                          isSelected 
                            ? 'bg-green-500 border-green-500' 
                            : isDisabled
                            ? 'border-white/20'
                            : 'border-white/40 group-hover:border-white/60'
                        }`}>
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>
                      <span className={`text-sm font-medium flex-1 ${
                        isDisabled ? 'text-gray-500' : 'text-gray-200'
                      }`}>{pos}</span>
                    </label>
                    {isSelected && (pos === 'President (Third Year Preferred)' || pos === 'Vice President (Third Year Preferred)') && (
                      <div className="mt-2 p-3 rounded-xl bg-yellow-600/10 border border-yellow-500/30 text-yellow-200 backdrop-blur-sm">
                        <div className="flex items-start space-x-2">
                          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs leading-relaxed">President/Vice President applicants must not hold a President or Vice President or Head role in any other college club.</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {form.positions.length === 2 && (
              <div className="mt-3 flex items-center gap-3 border-l-4 border-red-500 text-red-700 px-3 py-2 rounded-md shadow-sm">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <span className="text-sm font-medium">
                  You can select up to 2 positions maximum.
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Why do you want to join E-CELL?<span className="text-red-400 ml-1">*</span>
            </label>
            <textarea
              name="whyJoin"
              value={form.whyJoin}
              onChange={handleChange}
              className="w-full bg-gray-900/80 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:border-white/30 min-h-[140px] resize-vertical"
              placeholder="Share your motivation and what you hope to contribute..."
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-200">
              Resume <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            
            {!resumeFile ? (
              <div
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-white/60 bg-white/5' 
                    : 'border-white/30 hover:border-white/50 hover:bg-white/5'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white/10 rounded-full">
                    <Upload className="w-8 h-8 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">Drop your resume here or click to browse</p>
                    <p className="text-gray-400 text-sm">Supports PDF, DOC, DOCX, PNG, JPG, JPEG (Max 10 MB)</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900/60 border border-white/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <Upload className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{resumeFile.name}</p>
                    <p className="text-gray-400 text-sm">{formatFileSize(resumeFile.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Share your past clubs experience <span className="text-gray-400 font-normal">(if any)</span>
            </label>
            <textarea
              name="pastExperience"
              value={form.pastExperience}
              onChange={handleChange}
              className="w-full bg-gray-900/80 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:border-white/30 min-h-[120px] resize-vertical"
              placeholder="Tell us about your previous experience with clubs and organizations..."
            />
          </div>

          <div className="pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
            >
              {submitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Submitting Application...</span>
                </div>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </div>
        */}
      </div>
    </PageTransition>
  );
}