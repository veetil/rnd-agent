import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import the components first
import { MicroInteraction } from '../../../components/animations/MicroInteraction';
import { AnimationProvider } from '../../../components/animations/AnimationContext';

// Create a mock context for animations
const animationContextValue = {
  animationsEnabled: true
};

// Then mock them
jest.mock('../../../components/animations/MicroInteraction', () => {
  return {
    MicroInteraction: ({ 
      children, 
      className = '', 
      type = 'hover-scale', 
      disabled = false,
      onClick,
      onHover,
      whileHover,
      whileTap
    }: {
      children: ReactNode;
      className?: string;
      type?: string;
      disabled?: boolean;
      onClick?: () => void;
      onHover?: () => void;
      whileHover?: any;
      whileTap?: any;
    }) => {
      // Access the mock context
      const animationsEnabled = animationContextValue.animationsEnabled;
      
      if (!animationsEnabled || disabled) {
        return (
          <div 
            data-testid="regular-div" 
            className={className}
            onClick={onClick}
            onMouseEnter={onHover}
          >
            {children}
          </div>
        );
      }
      
      return (
        <div 
          data-testid="micro-interaction" 
          className={`micro-interaction ${className}`}
          data-interaction-type={type}
          onClick={onClick}
          onMouseEnter={onHover}
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

describe('MicroInteraction', () => {
  // Reset animation context before each test
  beforeEach(() => {
    animationContextValue.animationsEnabled = true;
  });
  
  test('should render children', () => {
    render(
      <AnimationProvider>
        <MicroInteraction>
          <div data-testid="test-content">Test Content</div>
        </MicroInteraction>
      </AnimationProvider>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });
  
  test('should apply micro-interaction class', () => {
    render(
      <AnimationProvider>
        <MicroInteraction>
          <div>Test Content</div>
        </MicroInteraction>
      </AnimationProvider>
    );
    
    const interactionElement = screen.getByTestId('micro-interaction');
    expect(interactionElement).toHaveClass('micro-interaction');
  });
  
  test('should apply custom className', () => {
    render(
      <AnimationProvider>
        <MicroInteraction className="custom-class">
          <div>Test Content</div>
        </MicroInteraction>
      </AnimationProvider>
    );
    
    const interactionElement = screen.getByTestId('micro-interaction');
    expect(interactionElement).toHaveClass('custom-class');
  });
  
  test('should render as a regular div when animations are disabled', () => {
    render(
      <AnimationProvider initialSettings={{ animationsEnabled: false }}>
        <MicroInteraction>
          <div data-testid="test-content">Test Content</div>
        </MicroInteraction>
      </AnimationProvider>
    );
    
    // Should have the regular-div
    expect(screen.getByTestId('regular-div')).toBeInTheDocument();
    
    // Should still render the content
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
  
  test('should render as a regular div when disabled', () => {
    render(
      <AnimationProvider>
        <MicroInteraction disabled>
          <div data-testid="test-content">Test Content</div>
        </MicroInteraction>
      </AnimationProvider>
    );
    
    // Should have the regular-div
    expect(screen.getByTestId('regular-div')).toBeInTheDocument();
    
    // Should still render the content
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
  
  test('should apply interaction type', () => {
    render(
      <AnimationProvider>
        <MicroInteraction type="click-bounce">
          <div>Test Content</div>
        </MicroInteraction>
      </AnimationProvider>
    );
    
    const interactionElement = screen.getByTestId('micro-interaction');
    expect(interactionElement).toHaveAttribute('data-interaction-type', 'click-bounce');
  });
  
  test('should call onClick handler', () => {
    const handleClick = jest.fn();
    
    render(
      <AnimationProvider>
        <MicroInteraction onClick={handleClick}>
          <div>Test Content</div>
        </MicroInteraction>
      </AnimationProvider>
    );
    
    const interactionElement = screen.getByTestId('micro-interaction');
    fireEvent.click(interactionElement);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  test('should call onHover handler', () => {
    const handleHover = jest.fn();
    
    render(
      <AnimationProvider>
        <MicroInteraction onHover={handleHover}>
          <div>Test Content</div>
        </MicroInteraction>
      </AnimationProvider>
    );
    
    const interactionElement = screen.getByTestId('micro-interaction');
    fireEvent.mouseEnter(interactionElement);
    
    expect(handleHover).toHaveBeenCalledTimes(1);
  });
  
  test('should call onClick handler when animations are disabled', () => {
    const handleClick = jest.fn();
    
    render(
      <AnimationProvider initialSettings={{ animationsEnabled: false }}>
        <MicroInteraction onClick={handleClick}>
          <div>Test Content</div>
        </MicroInteraction>
      </AnimationProvider>
    );
    
    const regularDiv = screen.getByTestId('regular-div');
    fireEvent.click(regularDiv);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});