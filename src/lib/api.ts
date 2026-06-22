// SEPARATE GOOGLE SCRIPT URLs FOR DIFFERENT FORMS (if you want completely separate deployments)
// OR use the same URL with different spreadsheet IDs configured in the script
const GOOGLE_SCRIPT_URL = '';

// Alternative: Separate URLs for each form type
// const REGISTRATION_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_REGISTRATION_SCRIPT_ID/exec';
// const RECRUITMENT_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_RECRUITMENT_SCRIPT_ID/exec';

export interface FormData {
  name: string;
  email: string;
  phone: string;
  graduationYear: string;
  businessIdea: string;
  funding: 'no-funding' | 'seed' | 'series-a' | 'series-b';
  progress: 'idea' | 'prototype' | 'mvp' | 'launched';
  timestamp?: string;
}

export interface RecruitmentFormData {
  name: string;
  email: string;
  contactNo: string;
  branch: 'CSE' | 'AIML' | 'IT' | 'CSBS' | '';
  year: 'Second Year' | 'Third Year' | '';
  positions: string[];
  whyJoin: string;
  pastExperience?: string;
}

// Helper function to convert File to base64
function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

// Regular registration form submission (goes to REGISTRATION_SPREADSHEET_ID)
export async function submitForm(data: FormData, file: File | null) {
  try {
    const formData = new FormData();
    
    // Add all form fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Add the file if it exists
    if (file) {
      const base64 = await convertFileToBase64(file);
      formData.append('collegeId', base64);
    }

    console.log('Submitting regular registration form...');

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    if (result.status !== 'success') {
      throw new Error(result.message || 'Failed to submit form');
    }

    console.log('Registration form submitted successfully:', {
      sheet: result.sheet,
      spreadsheetId: result.spreadsheetId,
      formType: result.formType
    });
    
    return { success: true, result };
  } catch (error) {
    console.error('Registration form submission error:', error);
    throw new Error('Failed to submit registration form. Please try again.');
  }
}

// Recruitment form submission (goes to RECRUITMENT_SPREADSHEET_ID)
export async function submitRecruitmentForm(data: RecruitmentFormData, resume: File | null) {
  try {
    const formData = new FormData();

    // Map fields to match Google Apps Script expectations
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('contactNo', data.contactNo);
    formData.append('branch', data.branch);
    formData.append('year', data.year);
    formData.append('positions', data.positions.join(', '));
    formData.append('whyJoin', data.whyJoin);
    formData.append('pastExperience', data.pastExperience || '');

    // Add resume if provided
    if (resume) {
      const base64 = await convertFileToBase64(resume);
      formData.append('resume', base64);
    }

    console.log('Submitting recruitment form...', {
      name: data.name,
      email: data.email,
      contactNo: data.contactNo,
      branch: data.branch,
      year: data.year,
      positions: data.positions.join(', '),
      hasResume: !!resume
    });

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

    console.log('Recruitment form submitted successfully:', {
      sheet: result.sheet,
      spreadsheetId: result.spreadsheetId,
      formType: result.formType
    });
    
    return { success: true, result };
  } catch (error) {
    console.error('Recruitment form submission error:', error);
    throw new Error('Failed to submit recruitment form. Please try again.');
  }
}

// Alternative: If you want completely separate Google Apps Scripts
export async function submitRecruitmentFormSeparateScript(data: RecruitmentFormData, resume: File | null) {
  try {
    // Use a separate script URL for recruitment forms
    const RECRUITMENT_SCRIPT_URL = '';
    
    const formData = new FormData();

    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('contactNo', data.contactNo);
    formData.append('branch', data.branch);
    formData.append('year', data.year);
    formData.append('positions', data.positions.join(', '));
    formData.append('whyJoin', data.whyJoin);
    formData.append('pastExperience', data.pastExperience || '');

    if (resume) {
      const base64 = await convertFileToBase64(resume);
      formData.append('resume', base64);
    }

    console.log('Submitting to separate recruitment script...');

    const response = await fetch(RECRUITMENT_SCRIPT_URL, {
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

    console.log('Recruitment form submitted to separate script successfully');
    return { success: true, result };
  } catch (error) {
    console.error('Recruitment form submission error:', error);
    throw new Error('Failed to submit recruitment form. Please try again.');
  }
}

// Utility function to test form detection
export async function testFormDetection() {
  try {
    const testRecruitmentData = new FormData();
    testRecruitmentData.append('name', 'Test Recruitment');
    testRecruitmentData.append('email', 'test@recruitment.com');
    testRecruitmentData.append('contactNo', '1234567890');
    testRecruitmentData.append('branch', 'CSE');
    testRecruitmentData.append('year', 'Third Year');
    testRecruitmentData.append('positions', 'Technical Head');
    testRecruitmentData.append('whyJoin', 'Test reason');

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: testRecruitmentData,
    });

    const result = await response.json();
    console.log('Form detection test result:', result);
    return result;
  } catch (error) {
    console.error('Form detection test error:', error);
    throw error;
  }
}