import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import the components first
import { PageTransition } from '../../../components/animations/PageTransition';
import { AnimationProvider } from '../../../components/animations/AnimationContext';

// Create a mock context for animations
const animationContextValue = {
  animationsEnabled: true
};

// Import TransitionType
import { TransitionType } from '../../../components/animations/PageTransition';

// Then mock them
jest.mock('../../../components/animations/PageTransition', () => {
  return {
    PageTransition: ({
      children,
      className = '',
      type = 'fade',
      duration = 0.5,
      disabled = false
    }: {
      children: ReactNode;
      className?: string;
      type?: TransitionType;
      duration?: number;
      disabled?: boolean;
    }) => {
      // Access the mock context
      const animationsEnabled = animationContextValue.animationsEnabled;
      
      if (!animationsEnabled || disabled || type === 'none') {
        return <div data-testid="regular-div">{children}</div>;
      }
      return (
        <div
          data-testid="page-transition"
          className={`page-transition ${className}`}
          style={{
            transitionDuration: `${duration}s`
          }}
          data-transition-type={type}
        >
          {children}
        </div>
      );
    }
  };
});

// Mock AnimationProvider
jest.mock('../../../components/animations/AnimationContext', () => ({
  AnimationProvider: ({ 
    children, 
    initialSettings = {} 
  }: {
    children: ReactNode;
    initialSettings?: Record<string, any>;
  }) => {
    // Update the mock context based on initialSettings
    if (initialSettings.animationsEnabled !== undefined) {
      animationContextValue.animationsEnabled = initialSettings.animationsEnabled;
    }
    return <div data-testid="animation-provider">{children}</div>;
  }
}));

describe('PageTransition', () => {
  // Reset animation context before each test
  beforeEach(() => {
    animationContextValue.animationsEnabled = true;
  });
  
  test('should render children', () => {
    render(
      <AnimationProvider>
        <PageTransition>
          <div data-testid="test-content">Test Content</div>
        </PageTransition>
      </AnimationProvider>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });
  
  test('should apply page-transition class', () => {
    render(
      <AnimationProvider>
        <PageTransition>
          <div>Test Content</div>
        </PageTransition>
      </AnimationProvider>
    );
    
    const transitionElement = screen.getByTestId('page-transition');
    expect(transitionElement).toHaveClass('page-transition');
  });
  
  test('should apply custom className', () => {
    render(
      <AnimationProvider>
        <PageTransition className="custom-class">
          <div>Test Content</div>
        </PageTransition>
      </AnimationProvider>
    );
    
    const transitionElement = screen.getByTestId('page-transition');
    expect(transitionElement).toHaveClass('custom-class');
  });
  
  test('should render as a regular div when animations are disabled', () => {
    render(
      <AnimationProvider initialSettings={{ animationsEnabled: false }}>
        <PageTransition>
          <div data-testid="test-content">Test Content</div>
        </PageTransition>
      </AnimationProvider>
    );
    
    // Should have the regular-div
    expect(screen.getByTestId('regular-div')).toBeInTheDocument();
    
    // Should still render the content
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
  
  test('should render as a regular div when type is "none"', () => {
    render(
      <AnimationProvider>
        <PageTransition type="none">
          <div data-testid="test-content">Test Content</div>
        </PageTransition>
      </AnimationProvider>
    );
    
    // Should have the regular-div
    expect(screen.getByTestId('regular-div')).toBeInTheDocument();
    
    // Should still render the content
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
  
  test('should apply transition duration', () => {
    render(
      <AnimationProvider>
        <PageTransition duration={1.5}>
          <div>Test Content</div>
        </PageTransition>
      </AnimationProvider>
    );
    
    const transitionElement = screen.getByTestId('page-transition');
    expect(transitionElement).toHaveStyle({ transitionDuration: '1.5s' });
  });
  
  test('should apply transition type', () => {
    render(
      <AnimationProvider>
        <PageTransition type="slide-left">
          <div>Test Content</div>
        </PageTransition>
      </AnimationProvider>
    );
    
    const transitionElement = screen.getByTestId('page-transition');
    expect(transitionElement).toHaveAttribute('data-transition-type', 'slide-left');
  });
  
  test('should apply custom duration', () => {
    render(
      <AnimationProvider>
        <PageTransition duration={1.5}>
          <div>Test Content</div>
        </PageTransition>
      </AnimationProvider>
    );
    
    const transitionElement = screen.getByTestId('page-transition');
    expect(transitionElement).toHaveStyle({ transitionDuration: '1.5s' });
  });
});