import React from 'react';

interface LogoProps {
  src?: string; // Made optional since we'll use text
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ src, size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-3xl',
  };
  
  return (
    <div data-testid="logo-container" className={`logo-${size}`}>
      {src ? (
        <img
          src={src}
          alt="IdeaCode AI"
          className={`h-${size === 'small' ? '6' : size === 'medium' ? '8' : '10'}`}
        />
      ) : (
        <div className={`font-bold ${sizeClasses[size]} text-blue-600`}>
          <span>Idea</span>
          <span className="text-gray-800">Code</span>
          <span className="text-xs align-top ml-1">AI</span>
        </div>
      )}
    </div>
  );
};

export default Logo;