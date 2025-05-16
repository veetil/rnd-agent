import React from 'react';

interface LogoProps {
  src: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ src, size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-6',
    medium: 'h-8',
    large: 'h-10',
  };
  
  return (
    <div data-testid="logo-container" className={`logo-${size}`}>
      <img 
        src={src} 
        alt="R&D Agent Store" 
        className={sizeClasses[size]}
      />
    </div>
  );
};

export default Logo;