import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollAnimation, StaggeredScrollAnimation } from '../animations/ScrollAnimation';
import { MicroInteraction } from '../animations/MicroInteraction';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PersonaContent } from '../user-journey/PersonaContext';
import { useAccessibility } from '../accessibility/AccessibilityContext';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  technicalDetails?: string;
  businessValue?: string;
  engineeringValue?: string;
}

interface FeatureHighlightProps {
  /** Title for the feature section */
  title: string;
  /** Subtitle or description for the feature section */
  subtitle?: string;
  /** Array of feature items to display */
  features: FeatureItem[];
  /** Layout style for the features */
  layout?: 'grid' | 'list' | 'alternating';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Animated Feature Highlights component for homepage
 * Displays key features with animations on scroll
 * Supports persona-specific content and reduced motion preferences
 */
export function FeatureHighlight({
  title,
  subtitle,
  features,
  layout = 'grid',
  className = ''
}: FeatureHighlightProps) {
  const prefersReducedMotion = useReducedMotion();
  const { highContrast } = useAccessibility();
  
  // Determine the appropriate layout class
  const layoutClass = {
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    list: 'flex flex-col space-y-6',
    alternating: 'flex flex-col space-y-12'
  }[layout];
  
  return (
    <section className={`feature-highlight ${className}`}>
      <ScrollAnimation
        type="fade"
        threshold={0.1}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
      </ScrollAnimation>
      
      <StaggeredScrollAnimation
        staggerDelay={0.1}
        className={layoutClass}
        type="fade-up"
      >
        {features.map((feature, index) => (
          <FeatureCard 
            key={feature.id}
            feature={feature}
            index={index}
            layout={layout}
            highContrast={highContrast}
          />
        ))}
      </StaggeredScrollAnimation>
    </section>
  );
}

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
  layout: 'grid' | 'list' | 'alternating';
  highContrast: boolean;
}

function FeatureCard({ feature, index, layout, highContrast }: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Determine animation type based on layout and position
  const getAnimationType = () => {
    if (layout === 'alternating') {
      return index % 2 === 0 ? 'slide-right' : 'slide-left';
    }
    return 'slide-up';
  };
  
  // For alternating layout, determine the flex direction
  const alternatingClass = layout === 'alternating' 
    ? index % 2 === 0 
      ? 'md:flex-row' 
      : 'md:flex-row-reverse'
    : '';
  
  // High contrast mode styles
  const highContrastClass = highContrast 
    ? 'border-2 border-black bg-white text-black' 
    : 'bg-white shadow-lg hover:shadow-xl';
  
  return (
    <ScrollAnimation
      type={getAnimationType()}
      className={`feature-card ${highContrastClass}`}
    >
      <MicroInteraction 
        type="hover-lift"
        className={`
          rounded-lg p-6 transition-all duration-300
          ${layout === 'alternating' ? `flex flex-col ${alternatingClass} gap-6` : ''}
        `}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Image or Icon */}
        {(feature.icon || feature.image) && (
          <div className={`
            feature-media mb-4 
            ${layout === 'alternating' ? 'md:w-1/3 flex-shrink-0' : ''}
          `}>
            {feature.image ? (
              <motion.img 
                src={feature.image} 
                alt={`${feature.title} illustration`}
                className="w-full h-auto rounded"
                animate={isHovered && !prefersReducedMotion ? { scale: 1.05 } : {}}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="text-4xl text-primary-600 mb-2">
                {feature.icon}
              </div>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className={layout === 'alternating' ? 'md:w-2/3' : ''}>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          
          <p className="text-gray-600 mb-4">{feature.description}</p>
          
          {/* Persona-specific additional content */}
          <PersonaContent
            businessStakeholder={
              feature.businessValue ? (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-800">Business Impact</h4>
                  <p className="text-blue-700">{feature.businessValue}</p>
                </div>
              ) : null
            }
            engineeringLeader={
              feature.engineeringValue ? (
                <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <h4 className="font-semibold text-purple-800">Engineering Value</h4>
                  <p className="text-purple-700">{feature.engineeringValue}</p>
                </div>
              ) : null
            }
            technicalDeveloper={
              feature.technicalDetails ? (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-800">Technical Details</h4>
                  <p className="text-gray-700 font-mono text-sm">{feature.technicalDetails}</p>
                </div>
              ) : null
            }
            general={null}
          />
        </div>
      </MicroInteraction>
    </ScrollAnimation>
  );
}