import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FeatureHighlight } from '../../../components/interactive/FeatureHighlight';

// Mock the animations
jest.mock('../../../components/animations/MicroInteraction', () => ({
  MicroInteraction: ({ children, onHoverStart, onHoverEnd }: any) => (
    <div 
      data-testid="micro-interaction"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      {children}
    </div>
  ),
}));

jest.mock('../../../components/animations/ScrollAnimation', () => ({
  ScrollAnimation: ({ children, type, className }: any) => (
    <div data-testid={`scroll-animation-${type || 'default'}`} className={className}>
      {children}
    </div>
  ),
  StaggeredScrollAnimation: ({ children, className }: any) => (
    <div data-testid="staggered-animation" className={className}>
      {children}
    </div>
  ),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    img: ({ src, alt, className, animate, transition, children, ...props }: any) => (
      <img src={src} alt={alt} className={className} {...props} />
    ),
  },
}));

// Mock the useReducedMotion hook
jest.mock('../../../hooks/useReducedMotion', () => ({
  useReducedMotion: jest.fn().mockReturnValue(false),
}));

// Mock the accessibility context
jest.mock('../../../components/accessibility/AccessibilityContext', () => ({
  useAccessibility: jest.fn().mockReturnValue({
    highContrast: false,
  }),
}));

// Mock the PersonaContext component
jest.mock('../../../components/user-journey/PersonaContext', () => ({
  PersonaContent: ({ 
    businessStakeholder, 
    engineeringLeader, 
    technicalDeveloper, 
    general 
  }: any) => (
    <div data-testid="persona-content">
      {businessStakeholder && (
        <div data-testid="business-content">{businessStakeholder}</div>
      )}
      {engineeringLeader && (
        <div data-testid="engineering-content">{engineeringLeader}</div>
      )}
      {technicalDeveloper && (
        <div data-testid="technical-content">{technicalDeveloper}</div>
      )}
      {general && (
        <div data-testid="general-content">{general}</div>
      )}
    </div>
  ),
}));

describe('FeatureHighlight', () => {
  const defaultProps = {
    title: 'Key Features',
    subtitle: 'Discover what makes our platform unique',
    features: [
      {
        id: 'feature1',
        title: 'Feature 1',
        description: 'Description of feature 1',
        icon: <span>🚀</span>,
        technicalDetails: 'Built with React and TypeScript',
        businessValue: 'Increases conversion by 25%',
        engineeringValue: 'Reduces development time by 30%',
      },
      {
        id: 'feature2',
        title: 'Feature 2',
        description: 'Description of feature 2',
        image: '/images/feature2.jpg',
      },
    ],
  };

  test('should render title and subtitle', () => {
    render(<FeatureHighlight {...defaultProps} />);
    
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    expect(screen.getByText('Discover what makes our platform unique')).toBeInTheDocument();
  });

  test('should render all feature items', () => {
    render(<FeatureHighlight {...defaultProps} />);
    
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Description of feature 1')).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
    
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Description of feature 2')).toBeInTheDocument();
    expect(screen.getByAltText('Feature 2 illustration')).toBeInTheDocument();
  });

  test('should render with grid layout by default', () => {
    render(<FeatureHighlight {...defaultProps} />);
    
    const staggeredAnimation = screen.getByTestId('staggered-animation');
    expect(staggeredAnimation).toHaveClass('grid');
    expect(staggeredAnimation).toHaveClass('grid-cols-1');
    expect(staggeredAnimation).toHaveClass('md:grid-cols-2');
    expect(staggeredAnimation).toHaveClass('lg:grid-cols-3');
  });

  test('should render with list layout when specified', () => {
    render(<FeatureHighlight {...defaultProps} layout="list" />);
    
    const staggeredAnimation = screen.getByTestId('staggered-animation');
    expect(staggeredAnimation).toHaveClass('flex');
    expect(staggeredAnimation).toHaveClass('flex-col');
    expect(staggeredAnimation).toHaveClass('space-y-6');
  });

  test('should render with alternating layout when specified', () => {
    render(<FeatureHighlight {...defaultProps} layout="alternating" />);
    
    const staggeredAnimation = screen.getByTestId('staggered-animation');
    expect(staggeredAnimation).toHaveClass('flex');
    expect(staggeredAnimation).toHaveClass('flex-col');
    expect(staggeredAnimation).toHaveClass('space-y-12');
  });

  test('should render persona-specific content', () => {
    render(<FeatureHighlight {...defaultProps} />);
    
    // Check for persona-specific content containers
    const personaContents = screen.getAllByTestId('persona-content');
    expect(personaContents.length).toBe(2); // One for each feature
    
    // Check for technical details
    expect(screen.getByText('Technical Details')).toBeInTheDocument();
    expect(screen.getByText('Built with React and TypeScript')).toBeInTheDocument();
    
    // Check for business value
    expect(screen.getByText('Business Impact')).toBeInTheDocument();
    expect(screen.getByText('Increases conversion by 25%')).toBeInTheDocument();
    
    // Check for engineering value
    expect(screen.getByText('Engineering Value')).toBeInTheDocument();
    expect(screen.getByText('Reduces development time by 30%')).toBeInTheDocument();
  });

  test('should apply custom className', () => {
    render(<FeatureHighlight {...defaultProps} className="custom-features" />);
    
    const featureSection = document.querySelector('.feature-highlight');
    expect(featureSection).toHaveClass('custom-features');
  });

  test('should handle hover interactions', () => {
    // Mock the useReducedMotion hook to return false for this test
    require('../../../hooks/useReducedMotion').useReducedMotion.mockReturnValue(false);
    
    render(<FeatureHighlight {...defaultProps} />);
    
    const microInteractions = screen.getAllByTestId('micro-interaction');
    
    // Simulate hover on the first feature
    fireEvent.mouseEnter(microInteractions[0]);
    fireEvent.mouseLeave(microInteractions[0]);
    
    // We can't easily test the actual animation effect since we've mocked framer-motion,
    // but we can verify that the hover handlers don't throw errors
    expect(true).toBeTruthy();
  });

  test('should render with high contrast mode when enabled', () => {
    // Mock the useAccessibility hook to return highContrast: true
    require('../../../components/accessibility/AccessibilityContext').useAccessibility.mockReturnValue({
      highContrast: true,
    });
    
    render(<FeatureHighlight {...defaultProps} />);
    
    // In high contrast mode, we should have specific styling
    const scrollAnimations = screen.getAllByTestId(/^scroll-animation/);
    
    // The first scroll animation is for the title, so we check the ones for the features
    expect(scrollAnimations[1]).toHaveClass('feature-card');
    expect(scrollAnimations[1]).toHaveClass('border-2');
    expect(scrollAnimations[1]).toHaveClass('border-black');
    expect(scrollAnimations[1]).toHaveClass('bg-white');
    expect(scrollAnimations[1]).toHaveClass('text-black');
  });
});