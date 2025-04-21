'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full px-4 sm:px-6 lg:px-8 py-4 bg-[#F0EBE8] shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex bg-[#F0EBE8] justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <img src="/logo.png" alt="CollabSphere Logo" className="h-8" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex  items-center space-x-4">
          <Link href="/login">
            <span className="px-5 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              Login
            </span>
          </Link>
          <Link href="/signup">
            <span className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg hover:opacity-90 transition shadow-sm">
              Sign Up Free
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col space-y-4 px-2 pb-3">
            <Link href="/login">
              <span className="text-gray-600 hover:text-blue-600 transition-colors font-medium block px-3 py-2">Login</span>
            </Link>
            <Link href="/signup">
              <span className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg hover:opacity-90 transition w-full inline-block text-center">Sign Up Free</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}