'use client'

import React from 'react';
import Header from './Header';
import Button from './Button';
import Logo from './Logo';

const TeaserLanding: React.FC = () => {
  const handleWaitlistSignup = () => {
    console.log('Waitlist signup clicked');
    // In a real implementation, this would open a modal or redirect to a signup form
  };

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        logoSrc="/logo.svg"
        navigationItems={navigationItems}
        ctaText="Join Waitlist"
        ctaAction={handleWaitlistSignup}
      />
      
      <main className="flex-grow pt-24">
        {/* Hero Section - Will be implemented in Step 2 */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transform Research into Code
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              The R&D Agent Store automates the journey from research insights to production-ready code.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="large" onClick={handleWaitlistSignup}>
                Join Waitlist
              </Button>
              <Button size="large" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>
        
        {/* Placeholder for future sections */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Coming Soon</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're working on bringing you the most advanced AI-powered research-to-code platform.
              Join our waitlist to be the first to know when we launch.
            </p>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-lg font-semibold">R&D Agent Store</p>
              <p className="text-gray-400">© 2025 IdeaCode. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TeaserLanding;