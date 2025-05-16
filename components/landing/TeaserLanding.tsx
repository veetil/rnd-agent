'use client'

import React, { useState } from 'react';
import Header from './Header';
import Button from './Button';
import Logo from './Logo';
import HeroSection from './HeroSection';
import ValuePropositionSection from './ValuePropositionSection';
import WaitlistForm from './WaitlistForm';
import Footer from './Footer';

const TeaserLanding: React.FC = () => {
  const [showWaitlistForm, setShowWaitlistForm] = useState(false);
  
  const handleWaitlistSignup = () => {
    setShowWaitlistForm(true);
    // Scroll to the waitlist form section
    document.getElementById('waitlist-section')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleWaitlistSubmit = async (email: string): Promise<void> => {
    // In a real implementation, this would send the email to a backend API
    console.log('Submitting email to waitlist:', email);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  };

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Benefits', href: '#benefits' },
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
        {/* Hero Section with animated visuals */}
        <HeroSection
          heading="Transform Research into Code"
          subheading="The R&D Agent Store automates the journey from research insights to production-ready code."
          ctaText="Join Waitlist"
          ctaAction={handleWaitlistSignup}
          visualType="particles"
        />
        
        {/* Value Proposition Section */}
        <ValuePropositionSection
          heading="Key Benefits"
          cards={[
            {
              icon: 'rocket',
              heading: 'Accelerate Innovation',
              description: 'Implement cutting-edge techniques that would take months to discover manually. Stay ahead of the curve without the research overhead.'
            },
            {
              icon: 'chart',
              heading: 'Amplify Performance',
              description: 'Achieve measurable improvements across your tech stack. Our customers see an average 30% performance boost within weeks.'
            },
            {
              icon: 'gear',
              heading: 'Automate Optimization',
              description: 'Set it and forget it. Continuous optimization adapts to your changing needs without constant attention.'
            }
          ]}
        />
        
        {/* Waitlist Form Section */}
        <section id="waitlist-section" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Join Our Exclusive Waitlist
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Be among the first to experience the future of research-driven development.
              </p>
            </div>
            
            <WaitlistForm
              onSubmit={handleWaitlistSubmit}
              className="mt-8"
            />
          </div>
        </section>
      </main>
      
      <Footer
        companyName="R&D Agent Store"
        copyrightYear={2025}
        companyInfo="The R&D Agent Store automates the journey from research insights to production-ready code, helping product teams accelerate innovation."
        links={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
          { label: 'Contact', href: '/contact' }
        ]}
        socialLinks={[
          { platform: 'twitter', href: 'https://twitter.com/rndagentstore' },
          { platform: 'github', href: 'https://github.com/ideacode/rnd-agent-store' },
          { platform: 'linkedin', href: 'https://linkedin.com/company/rnd-agent-store' }
        ]}
      />
    </div>
  );
};

export default TeaserLanding;