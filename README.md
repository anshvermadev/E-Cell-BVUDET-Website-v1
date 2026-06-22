# E-Cell BVUDET Website (v1)

[![React](https://img.shields.io/badge/React-v18.3-blue.svg?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v5.4-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3.4-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.5-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Deployment](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](vercel.json)

Welcome to the **E-Cell BVUDET Website (v1)** repository! This is the official web application for the Entrepreneurship Cell (E-Cell) at Bharati Vidyapeeth Deemed University (BVUDET). 

This platform is designed to foster innovation, connect student-led startups with mentors, showcase success stories, handle team recruitments, and host entrepreneurship events.

---

## Table of Contents

- [What the Project Does](#what-the-project-does)
- [Key Features & Benefits](#key-features--benefits)
- [Technology Stack](#technology-stack)
- [How to Get Started](#how-to-get-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Local Development](#local-development)
  - [Production Build](#production-build)
- [Google Apps Script Backend Integration](#google-apps-script-backend-integration)
- [Deployment](#deployment)

---

## What the Project Does

The **E-Cell BVUDET Website (v1)** serves as a digital hub for aspiring student entrepreneurs. It provides:
1. **Resources & Registration**: A streamlined portal where students submit their startup ideas to join the E-Cell community, request funding reviews, or report progress.
2. **Core Team Recruitment**: An intake portal that handles applications for E-Cell core team positions.
3. **Success Showcases**: Profiles of successful student entrepreneurs to inspire the college community.
4. **Events Hub**: An interactive directory of past events and upcoming competitions (like *PitchX 2026*).

---

## Key Features & Benefits

- **Interactive Startup Registration**: Form with support for uploading verification documents (e.g. College IDs) converted directly to Base64 payloads.
- **Recruitment Application**: Core team registration with resume upload integration.
- **Vibrant & Glassmorphic UI**: Built with modern HSL color gradients, 3D floating canvas elements, smooth micro-animations using Framer Motion, and responsive styling for desktop and mobile.
- **Serverless Integration**: Connects directly to Google Sheets via Google Apps Script (custom script configuration included).
- **Single-Page Application (SPA)**: Fast client-side page routing using React Router DOM.

---

## Technology Stack

- **Frontend Core**: [React.js](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Hosting/Deployment**: [Vercel](https://vercel.com/) (configured via [vercel.json](vercel.json))
- **Database/Backend**: [Google Apps Script](https://developers.google.com/apps-script) & [Google Sheets](https://www.google.com/sheets/about/)

---

## How to Get Started

### Prerequisites

Make sure you have Node.js and npm installed:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ECELL-BVUDET-WEBSITE.git
   cd ECELL-BVUDET-WEBSITE
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Local Development

To run the application locally on a development server:

```bash
npm run dev
```

By default, the server will start at: [http://localhost:5173](http://localhost:5173)

### Production Build

To compile the TypeScript code and generate static files for production hosting:

```bash
npm run build
```

The output files will be built in the `dist` directory. You can preview the production bundle locally with:

```bash
npm run preview
```

---

## Google Apps Script Backend Integration

The website forms submit data directly to Google Sheets. The logic is handled by Google Apps Script web apps, which convert Base64 file uploads (Resumes and College IDs) and store them in Google Drive folders while writing metadata to a Google Sheet.

The repository includes two pre-configured Google Apps Script files:
- [Registrations_google-apps-script.js](Registrations_google-apps-script.js) — Processes general student entrepreneur registrations.
- [Recruitment_2025_app_script.js](Recruitment_2025_app_script.js) — Processes core team member recruitment applications.

### Setup Instructions:

1. **Create a Google Sheet**: Create a new spreadsheet in Google Sheets.
2. **Access Extensions**: Go to `Extensions` > `Apps Script`.
3. **Copy Code**: Replace the default code with either script from this repository:
   - For general registrations, copy contents from [Registrations_google-apps-script.js](Registrations_google-apps-script.js).
   - For recruitment, copy contents from [Recruitment_2025_app_script.js](Recruitment_2025_app_script.js).
4. **Configure Spreadsheet IDs**: Update the placeholder spreadsheet IDs inside the Apps Script code:
   ```javascript
   const RECRUITMENT_SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
   const REGISTRATION_SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
   ```
5. **Deploy the Script**:
   - Click **Deploy** > **New deployment**.
   - Select **Web app**.
   - Set **Execute as**: *Me (your Google account)*.
   - Set **Who has access**: *Anyone*.
   - Copy the generated Web App URL.
6. **Update API Endpoint**: Paste this Web App URL into `GOOGLE_SCRIPT_URL` inside the frontend code at [src/lib/api.ts](src/lib/api.ts#L3).

---

## Deployment

The repository contains a [vercel.json](vercel.json) file configured to support clean client-side routing on Vercel. 

To deploy to Vercel:
1. Push your code to GitHub.
2. Link your repository in the Vercel Dashboard.
3. Keep default settings (Vercel automatically detects the Vite React framework).
4. Click **Deploy**.
