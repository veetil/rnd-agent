'use client'

import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

interface ValueCardProps {
  icon: 'rocket' | 'chart' | 'gear' | 'arrow' | 'check';
  heading: string;
  description: string;
  animationDelay?: number;
}

const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  heading,
  description,
  animationDelay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
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
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div
      ref={cardRef}
      data-testid="value-card"
      className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 
        ${isHovered ? 'is-hovered transform -translate-y-2 shadow-lg' : ''} 
        ${isVisible ? 'is-visible opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${animationDelay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`mb-4 p-3 rounded-full inline-block bg-blue-50 transition-all duration-300 ${isHovered ? 'bg-blue-100' : ''}`}>
        <Icon name={icon} size="large" />
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-gray-900">{heading}</h3>
      
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ValueCard;