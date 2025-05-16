'use client'

import React from 'react';
import Icon from './Icon';

interface SocialIconProps {
  platform: string;
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ platform, className = '' }) => {
  // Map social media platforms to available icons
  const getIconName = () => {
    switch (platform.toLowerCase()) {
      case 'twitter':
        return 'rocket';
      case 'github':
        return 'gear';
      case 'linkedin':
        return 'chart';
      case 'facebook':
        return 'check';
      default:
        return 'arrow';
    }
  };

  return (
    <Icon 
      name={getIconName()} 
      className={className}
      color="white"
    />
  );
};

export default SocialIcon;