import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import PageTransition from '../components/PageTransition';

export default function NotFound() {
  return (
    <PageTransition className="py-24 bg-gradient-to-br from-gray-900 to-black min-h-[calc(100vh-4rem)]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-gray-900 to-black p-10 rounded-2xl border border-gray-800 shadow-xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-600/15 border border-red-500/30 mb-6">
            <AlertTriangle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">404 - Page Not Found</h1>
          <p className="text-gray-400 mb-8">The page you're looking for doesn’t exist or has been moved.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <Home className="w-5 h-5" />
            Go back Home
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}