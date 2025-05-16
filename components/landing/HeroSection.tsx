'use client'

import React, { useEffect, useState } from 'react';
import Button from './Button';
import AnimatedVisual from './AnimatedVisual';

interface HeroSectionProps {
  heading: string;
  subheading: string;
  ctaText: string;
  ctaAction: () => void;
  visualType?: 'particles' | 'gradient' | 'dataFlow';
}

const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subheading,
  ctaText,
  ctaAction,
  visualType = 'particles',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Trigger entrance animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          data-testid="hero-container"
          className={`flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          } transition-all duration-1000`}
        >
          {/* Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
              style={{ 
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
              }}
            >
              {heading}
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0"
              style={{ 
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
              }}
            >
              {subheading}
            </p>
            
            <div
              style={{ 
                opacity: isVisible ? 1 : 0, 
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
              }}
            >
              <Button 
                size="large" 
                onClick={ctaAction}
                className="animate-bounce-subtle"
              >
                {ctaText}
              </Button>
            </div>
          </div>
          
          {/* Visual */}
          <div 
            className="w-full md:w-1/2 h-64 md:h-96 relative"
            style={{ 
              opacity: isVisible ? 1 : 0, 
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
            }}
          >
            <AnimatedVisual type={visualType} />
          </div>
        </div>
      </div>
      
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-50 to-teal-50 rounded-bl-full -z-10 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-to-tr from-blue-50 to-teal-50 rounded-tr-full -z-10 opacity-70"></div>
    </section>
  );
};

export default HeroSection;