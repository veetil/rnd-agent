'use client'

import React, { useEffect, useRef, useState } from 'react';
import ValueCard from './ValueCard';

interface ValueCardData {
  icon: 'rocket' | 'chart' | 'gear' | 'arrow' | 'check';
  heading: string;
  description: string;
}

interface ValuePropositionSectionProps {
  heading: string;
  cards: ValueCardData[];
}

const ValuePropositionSection: React.FC<ValuePropositionSectionProps> = ({
  heading,
  cards,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-16 md:py-24 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <h2 
          className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {heading}
        </h2>
        
        <div 
          data-testid="value-cards-container"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card, index) => (
            <ValueCard
              key={index}
              icon={card.icon}
              heading={card.heading}
              description={card.description}
              animationDelay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionSection;