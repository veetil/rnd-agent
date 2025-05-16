'use client'

import React from 'react';

interface IconProps {
  name: 'rocket' | 'chart' | 'gear' | 'arrow' | 'check';
  size?: 'small' | 'medium' | 'large';
  color?: 'blue' | 'teal' | 'gray' | 'white';
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  color = 'blue',
  className = '',
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
  };
  
  const colorClasses = {
    blue: 'text-blue-600',
    teal: 'text-teal-500',
    gray: 'text-gray-600',
    white: 'text-white',
  };
  
  const renderIcon = () => {
    switch (name) {
      case 'rocket':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 3v18h18"></path>
            <path d="M18 17V9"></path>
            <path d="M13 17V5"></path>
            <path d="M8 17v-3"></path>
          </svg>
        );
      case 'gear':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
            <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
            <path d="M12 2v2"></path>
            <path d="M12 22v-2"></path>
            <path d="m17 20.66-1-1.73"></path>
            <path d="M11 10.27 7 3.34"></path>
            <path d="m20.66 17-1.73-1"></path>
            <path d="m3.34 7 1.73 1"></path>
            <path d="M14 12h8"></path>
            <path d="M2 12h2"></path>
            <path d="m20.66 7-1.73 1"></path>
            <path d="m3.34 17 1.73-1"></path>
            <path d="m17 3.34-1 1.73"></path>
            <path d="m7 20.66 1-1.73"></path>
          </svg>
        );
      case 'arrow':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        );
      case 'check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div 
      data-testid={`icon-${name}`}
      className={`icon icon-${size} ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      aria-hidden="true"
    >
      {renderIcon()}
    </div>
  );
};

export default Icon;