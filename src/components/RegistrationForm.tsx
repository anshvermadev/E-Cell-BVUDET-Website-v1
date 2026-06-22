import React, { useState, useRef, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, UserPlus, X, ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router-dom";

// Custom Glassmorphism Dropdown Component
const GlassDropdown = ({ value, onChange, options, placeholder = "Select", name }) => {
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

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border-2 ${
          isOpen ? 'border-white/50 shadow-lg shadow-white/20' : 'border-white/20'
        } rounded-lg text-white focus:outline-none text-left flex justify-between items-center hover:border-white/40 hover:shadow-md hover:shadow-white/10 transition-all duration-300 group`}
      >
        <span className={`${selectedOption ? 'text-white font-medium' : 'text-gray-300'} transition-colors`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <div className={`p-1 rounded-md bg-white/10 group-hover:bg-white/20 transition-all duration-300 ${isOpen ? 'bg-white/20' : ''}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white/80 backdrop-blur-2xl border-2 border-white/60 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden animate-slideDown" style={{ maxHeight: '182px' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>
          
          <div className="relative overflow-y-auto custom-scrollbar py-2" style={{ maxHeight: '182px' }}>
            {options.map((option, idx) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: option.value } });
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-gray-800 transition-all duration-200 relative group overflow-hidden ${
                  value === option.value 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 font-semibold' 
                    : 'hover:bg-black/5'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-purple-400/20 to-pink-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                
                <div className="relative z-10 flex justify-between items-center">
                  <span className="transition-all duration-200 text-black/70">{option.label}</span>
                  {value === option.value && (
                    <div className="animate-scaleIn">
                      <CheckCircle className="w-6 h-6 text-red-400 drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          margin: 8px 0;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2));
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4));
          background-clip: padding-box;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
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

// API function to submit registration form
const submitRegistrationForm = async (formData, teamMembers, pitchDeck) => {
  try {
    const data = new FormData();
    
    // Leader information
    data.append('leaderName', formData.leaderName);
    data.append('leaderEmail', formData.leaderEmail);
    data.append('leaderPhone', formData.leaderPhone);
    data.append('leaderCollege', formData.leaderCollege);
    data.append('leaderYear', formData.leaderYear);
    data.append('leaderLinkedin', formData.leaderLinkedin);
    data.append('leaderRole', formData.leaderRole);
    
    // Startup details
    data.append('startupName', formData.startupName);
    data.append('stage', formData.stage);
    data.append('industry', formData.industry);
    data.append('problemStatement', formData.problemStatement);
    data.append('solution', formData.solution);
    data.append('targetMarket', formData.targetMarket);
    data.append('usp', formData.usp);
    data.append('businessModel', formData.businessModel);
    
    // Team members (send as JSON string)
    const validTeamMembers = teamMembers.filter(m => m.name.trim() && m.role.trim() && m.linkedin.trim());
    data.append('teamMembers', JSON.stringify(validTeamMembers));
    
    // Pitch deck
    if (pitchDeck) {
      const base64 = await convertFileToBase64(pitchDeck);
      data.append('pitchDeck', base64);
    }
    
    // ⚠️ IMPORTANT: Replace with your deployed Google Apps Script web app URL
    const GOOGLE_SCRIPT_URL = '';
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: data,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.status !== 'success') {
      throw new Error(result.message || 'Failed to submit registration');
    }
    
    return { success: true, result };
  } catch (error) {
    throw error;
  }
};

export default function RegistrationForm() {
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 10 }, (_, i) => (currentYear-3) + i).map(y => ({ value: y.toString(), label: y.toString() }));
  const [pitchDeck, setPitchDeck] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [teamMembers, setTeamMembers] = useState([
    { name: '', role: '', linkedin: '', college: '', year: currentYear.toString() }
  ]);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderCollege: '',
    leaderYear: currentYear.toString(),
    leaderLinkedin: '',
    leaderRole: '',
    startupName: '',
    stage: 'ideation',
    industry: '',
    problemStatement: '',
    solution: '',
    targetMarket: '',
    usp: '',
    businessModel: ''
  });

  const sections = [
    { title: "Team Leader" },
    { title: "Startup Details" },
    { title: "Team & Pitch" }
  ];
  
  const industries = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'FinTech', label: 'FinTech' },
    { value: 'EdTech', label: 'EdTech' },
    { value: 'Social Enterprise', label: 'Social Enterprise' },
    { value: 'AgriTech', label: 'AgriTech' },
    { value: 'CleanTech', label: 'CleanTech' },
    { value: 'Food & Beverage', label: 'Food & Beverage' },
    { value: 'Other', label: 'Other' }
  ];
  
  const stages = [
    { value: 'ideation', label: 'Ideation (Just an idea)' },
    { value: 'prototype', label: 'Prototype/Proof of Concept' },
    { value: 'early-traction', label: 'Early Traction' },
    { value: 'revenue', label: 'Revenue-generating' },
    { value: 'registered', label: 'Registered Business' }
  ];

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: '', role: '', linkedin: '', college: '', year: currentYear.toString() }]);
  };

  const removeTeamMember = (index) => {
    if (teamMembers.length > 1) {
      setTeamMembers(teamMembers.filter((_, i) => i !== index));
    }
  };

  const updateTeamMember = (index, field, value) => {
    const updated = [...teamMembers];
    updated[index][field] = value;
    setTeamMembers(updated);
  };

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 0) {
      if (!formData.leaderName.trim()) {
        newErrors.leaderName = 'Name is required';
        isValid = false;
      }
      if (!formData.leaderEmail.trim()) {
        newErrors.leaderEmail = 'Email is required';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.leaderEmail)) {
        newErrors.leaderEmail = 'Invalid email';
        isValid = false;
      }
      if (!formData.leaderPhone.trim()) {
        newErrors.leaderPhone = 'Phone is required';
        isValid = false;
      }
      if (!formData.leaderCollege.trim()) {
        newErrors.leaderCollege = 'College is required';
        isValid = false;
      }
      if (!formData.leaderLinkedin.trim()) {
        newErrors.leaderLinkedin = 'LinkedIn is required';
        isValid = false;
      } else if (!isValidLinkedInUrl(formData.leaderLinkedin)) {
        newErrors.leaderLinkedin = 'Invalid LinkedIn URL format';
        isValid = false;
      }
      if (!formData.leaderRole.trim()) {
        newErrors.leaderRole = 'Role is required';
        isValid = false;
      }
    } else if (step === 1) {
      if (!formData.startupName.trim()) {
        newErrors.startupName = 'Startup name is required';
        isValid = false;
      }
      if (!formData.industry) {
        newErrors.industry = 'Industry is required';
        isValid = false;
      }
      if (!formData.problemStatement.trim()) {
        newErrors.problemStatement = 'Problem statement is required';
        isValid = false;
      }
      if (!formData.solution.trim()) {
        newErrors.solution = 'Solution is required';
        isValid = false;
      }
      if (!formData.targetMarket.trim()) {
        newErrors.targetMarket = 'Target market is required';
        isValid = false;
      }
      if (!formData.usp.trim()) {
        newErrors.usp = 'USP is required';
        isValid = false;
      }
      if (!formData.businessModel.trim()) {
        newErrors.businessModel = 'Business model is required';
        isValid = false;
      }
    } else if (step === 2) {
      const filledMembers = teamMembers.filter(m => m.name.trim() || m.role.trim() || m.linkedin.trim());
      for (const m of filledMembers) {
        if (!m.name.trim() || !m.role.trim() || !m.linkedin.trim()) {
          newErrors.teamMembers = 'Complete all team member fields';
          isValid = false;
          break;
        }
        if (!isValidLinkedInUrl(m.linkedin)) {
          newErrors.teamMembers = 'Invalid LinkedIn URL format for team members';
          isValid = false;
          break;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const isValidLinkedInUrl = (url) => {
    const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/;
    return linkedInPattern.test(url.trim());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPitchDeck(file);
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      const validTeamMembers = teamMembers.filter(m => m.name.trim() && m.role.trim() && m.linkedin.trim());
      
      await submitRegistrationForm(formData, validTeamMembers, pitchDeck);
      
      setSubmitSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setErrors({ submit: error?.message || 'Submission failed. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-[30vh] flex items-start justify-center pt-8 p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
          <div className="text-center relative z-10">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
            <p className="text-gray-100 mb-6">Thank you for registering. We'll contact you soon!</p>
            <button
              onClick={() => navigate("/")}
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-2 px-6 rounded-lg hover:bg-white/30 hover:scale-105 transition-all">
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 relative">
      {/* Global blur overlay when any dropdown is open */}
      {(currentStep === 0 || currentStep === 1 || currentStep === 2) && (
        <div id="dropdown-overlay-target"></div>
      )}
      
      <div className="max-w-4xl mx-auto relative z-10">    
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center relative z-10">Startup Registration</h2>
          
          {/* Progress */}
          <div className="mb-8 relative z-10">
            <div className="flex items-center justify-between mb-2">
              {sections.map((section, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 ${
                      currentStep === idx ? 'border-white bg-white/20 text-white' : 
                      currentStep > idx ? 'border-green-400 bg-green-400/20 text-green-400' : 
                      'border-gray-300/40 text-gray-300'
                    }`}>
                      {currentStep > idx ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span className="text-xs text-white mt-2 text-center whitespace-nowrap">{section.title}</span>
                  </div>
                  {idx < sections.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 mb-6 ${currentStep > idx ? 'bg-green-400' : 'bg-gray-300/40'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            {/* Step 0: Team Leader */}
            {currentStep === 0 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="leaderName"
                    value={formData.leaderName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                    placeholder="John Doe"
                  />
                  {errors.leaderName && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.leaderName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Email *</label>
                    <input
                      type="email"
                      name="leaderEmail"
                      value={formData.leaderEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                      placeholder="john@example.com"
                    />
                    {errors.leaderEmail && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.leaderEmail}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="leaderPhone"
                      value={formData.leaderPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                      placeholder="1234567890"
                    />
                    {errors.leaderPhone && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.leaderPhone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">College *</label>
                    <input
                      type="text"
                      name="leaderCollege"
                      value={formData.leaderCollege}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                      placeholder="Your College Name"
                    />
                    {errors.leaderCollege && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.leaderCollege}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Graduation Year</label>
                    <GlassDropdown
                      name="leaderYear"
                      value={formData.leaderYear}
                      onChange={handleInputChange}
                      options={graduationYears}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">LinkedIn *</label>
                  <input
                    type="url"
                    name="leaderLinkedin"
                    value={formData.leaderLinkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                  {errors.leaderLinkedin && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.leaderLinkedin}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Role in Startup *</label>
                  <input
                    type="text"
                    name="leaderRole"
                    value={formData.leaderRole}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                    placeholder="CEO, Founder, CTO"
                  />
                  {errors.leaderRole && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.leaderRole}</p>}
                </div>
              </>
            )}

            {/* Step 1: Startup */}
            {currentStep === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Startup Name *</label>
                  <input
                    type="text"
                    name="startupName"
                    value={formData.startupName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                    placeholder="Your Startup Name"
                  />
                  {errors.startupName && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.startupName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Stage</label>
                    <GlassDropdown
                      name="stage"
                      value={formData.stage}
                      onChange={handleInputChange}
                      options={stages}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Industry *</label>
                    <GlassDropdown
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      options={industries}
                      placeholder="Select Industry"
                    />
                    {errors.industry && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.industry}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Problem Statement *</label>
                  <textarea
                    name="problemStatement"
                    value={formData.problemStatement}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                    placeholder="What problem are you solving?"
                  />
                  {errors.problemStatement && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.problemStatement}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Solution *</label>
                  <textarea
                    name="solution"
                    value={formData.solution}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                    placeholder="How does your product solve it?"
                  />
                  {errors.solution && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.solution}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Target Market *</label>
                  <textarea
                    name="targetMarket"
                    value={formData.targetMarket}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                    placeholder="Who are your customers?"
                  />
                  {errors.targetMarket && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.targetMarket}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">USP *</label>
                  <textarea
                    name="usp"
                    value={formData.usp}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                    placeholder="What makes you different?"
                  />
                  {errors.usp && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.usp}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Business Model *</label>
                  <textarea
                    name="businessModel"
                    value={formData.businessModel}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white placeholder-gray-300 focus:ring-2 focus:ring-white/40 focus:outline-none"
                    placeholder="How will you make money?"
                  />
                  {errors.businessModel && <p className="mt-1 text-sm text-red-300 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{errors.businessModel}</p>}
                </div>
              </>
            )}

            {/* Step 2: Team & Pitch */}
            {currentStep === 2 && (
              <>
                {/* Leader Information */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    Team Leader
                  </h3>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"></div>
                    
                    <div className="space-y-3 relative z-10">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
                          <p className="text-white text-sm">{formData.leaderEmail}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">Phone</label>
                          <p className="text-white text-sm">{formData.leaderPhone}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">College</label>
                          <p className="text-white text-sm">{formData.leaderCollege}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">Year</label>
                          <p className="text-white text-sm">{formData.leaderYear}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Members */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white flex items-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                        <UserPlus className="w-5 h-5 text-white" />
                      </div>
                      Team Members
                    </h3>
                    <button
                      type="button"
                      onClick={addTeamMember}
                      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold py-2.5 px-5 rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 hover:scale-105 transition-all flex items-center shadow-lg"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Member
                    </button>
                  </div>

                  <div className="space-y-4">
                    {teamMembers.map((member, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-5 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine" style={{ animationDelay: `${idx * 0.3}s` }}></div>
                        
                        <div className="flex justify-between items-center mb-4 relative z-10">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center border border-white/20">
                              <span className="text-white font-bold text-sm">{idx + 1}</span>
                            </div>
                            <h4 className="text-base font-bold text-white">Member {idx + 1}</h4>
                          </div>
                          {teamMembers.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => removeTeamMember(idx)} 
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          )}
                        </div>

                        <div className="space-y-3 relative z-10">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1.5">Full Name *</label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={e => updateTeamMember(idx, 'name', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 focus:outline-none transition-all"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1.5">Role *</label>
                              <input
                                type="text"
                                value={member.role}
                                onChange={e => updateTeamMember(idx, 'role', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 focus:outline-none transition-all"
                                placeholder="Co-founder, CTO"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1.5">LinkedIn Profile *</label>
                            <input
                              type="url"
                              value={member.linkedin}
                              onChange={e => updateTeamMember(idx, 'linkedin', e.target.value)}
                              className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 focus:outline-none transition-all"
                              placeholder="https://linkedin.com/in/yourprofile"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1.5">College (Optional)</label>
                              <input
                                type="text"
                                value={member.college}
                                onChange={e => updateTeamMember(idx, 'college', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 focus:outline-none transition-all"
                                placeholder="Your College"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-300 mb-1.5">Graduation Year</label>
                              <GlassDropdown
                                name={`teamYear${idx}`}
                                value={member.year}
                                onChange={(e) => updateTeamMember(idx, 'year', e.target.value)}
                                options={graduationYears}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {errors.teamMembers && (
                    <p className="text-sm text-red-300 flex items-center mt-3">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.teamMembers}
                    </p>
                  )}
                </div>

                {/* Pitch Deck */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                    Pitch Deck (Optional)
                  </h3>
                  {!pitchDeck ? (
                    <div className="relative border-2 border-dashed border-white/30 rounded-xl hover:border-white/50 transition-all overflow-hidden bg-white/5">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"></div>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="py-12 text-center relative z-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-8 h-8 text-white" />
                        </div>
                        <p className="text-white text-base font-medium mb-1">
                          Drop your PDF here or <span className="text-blue-300 underline">browse</span>
                        </p>
                        <p className="text-gray-400 text-sm">Maximum file size: 10MB</p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-400/30 rounded-xl p-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"></div>
                      <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <p className="text-white text-base font-semibold">{pitchDeck.name}</p>
                            <p className="text-gray-300 text-sm">{(pitchDeck.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPitchDeck(null)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between relative z-10">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleBack();
                }}
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-2 px-6 rounded-lg hover:bg-white/30 hover:scale-105 transition-all"
              >
                Back
              </button>
            )}
            {currentStep < sections.length - 1 ? (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNext();
                }}
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-2 px-6 rounded-lg hover:bg-white/30 hover:scale-105 transition-all ml-auto"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e);
                }}
                disabled={isSubmitting}
                className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold py-2 px-6 rounded-lg hover:bg-white/30 hover:scale-105 transition-all ml-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>

          {errors.submit && (
            <p className="mt-4 text-sm text-red-300 flex items-center justify-center relative z-10">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.submit}
            </p>
          )}
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