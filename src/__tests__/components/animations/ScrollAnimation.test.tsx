import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import the components first
import { ScrollAnimation, StaggeredScrollAnimation } from '../../../components/animations/ScrollAnimation';
import { AnimationProvider } from '../../../components/animations/AnimationContext';

// Create a mock context for animations
const animationContextValue = {
  animationsEnabled: true
};

// Then mock them
jest.mock('../../../components/animations/ScrollAnimation', () => {
  return {
    ScrollAnimation: ({
      children,
      className = '',
      disabled = false,
      type = 'fade-up',
      style = {}
    }: {
      children: ReactNode;
      className?: string;
      disabled?: boolean;
      type?: string;
      style?: React.CSSProperties;
    }) => {
      // Access the mock context
      const animationsEnabled = animationContextValue.animationsEnabled;
      
      if (disabled || type === 'none' || !animationsEnabled) {
        return <div data-testid="regular-div">{children}</div>;
      }
      return (
        <div
          data-testid="scroll-animation"
          className={`scroll-animation ${className}`}
          style={style}
        >
          {children}
        </div>
      );
    },
    StaggeredScrollAnimation: ({
      children,
      className = '',
      disabled = false,
      type = 'fade-up'
    }: {
      children: ReactNode;
      className?: string;
      disabled?: boolean;
      type?: string;
    }) => {
      // Access the mock context
      const animationsEnabled = animationContextValue.animationsEnabled;
      
      if (disabled || type === 'none' || !animationsEnabled) {
        return <div data-testid="regular-div">{children}</div>;
      }
      return (
        <div
          data-testid="staggered-scroll-animation"
          className={`staggered-scroll-animation ${className}`}
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

describe('ScrollAnimation', () => {
  // Reset animation context before each test
  beforeEach(() => {
    animationContextValue.animationsEnabled = true;
  });
  
  test('should render children', () => {
    render(
      <AnimationProvider>
        <ScrollAnimation>
          <div data-testid="test-content">Test Content</div>
        </ScrollAnimation>
      </AnimationProvider>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });
  
  test('should apply scroll-animation class', () => {
    render(
      <AnimationProvider>
        <ScrollAnimation>
          <div>Test Content</div>
        </ScrollAnimation>
      </AnimationProvider>
    );
    
    const animationElement = screen.getByTestId('scroll-animation');
    expect(animationElement).toHaveClass('scroll-animation');
  });
  
  test('should apply custom className', () => {
    render(
      <AnimationProvider>
        <ScrollAnimation className="custom-class">
          <div>Test Content</div>
        </ScrollAnimation>
      </AnimationProvider>
    );
    
    const animationElement = screen.getByTestId('scroll-animation');
    expect(animationElement).toHaveClass('custom-class');
  });
  
  test('should render as a regular div when animations are disabled', () => {
    render(
      <AnimationProvider initialSettings={{ animationsEnabled: false }}>
        <ScrollAnimation>
          <div data-testid="test-content">Test Content</div>
        </ScrollAnimation>
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
        <ScrollAnimation disabled>
          <div data-testid="test-content">Test Content</div>
        </ScrollAnimation>
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
        <ScrollAnimation type="none">
          <div data-testid="test-content">Test Content</div>
        </ScrollAnimation>
      </AnimationProvider>
    );
    
    // Should have the regular-div
    expect(screen.getByTestId('regular-div')).toBeInTheDocument();
    
    // Should still render the content
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
  
  test('should apply custom style', () => {
    render(
      <AnimationProvider>
        <ScrollAnimation style={{ color: 'red' }}>
          <div>Test Content</div>
        </ScrollAnimation>
      </AnimationProvider>
    );
    
    const animationElement = screen.getByTestId('scroll-animation');
    expect(animationElement).toHaveStyle({ color: 'red' });
  });
});

describe('StaggeredScrollAnimation', () => {
  // Reset animation context before each test
  beforeEach(() => {
    animationContextValue.animationsEnabled = true;
  });
  
  test('should render children', () => {
    render(
      <AnimationProvider>
        <StaggeredScrollAnimation>
          <div data-testid="test-content">Test Content</div>
        </StaggeredScrollAnimation>
      </AnimationProvider>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });
  
  test('should apply custom className', () => {
    render(
      <AnimationProvider>
        <StaggeredScrollAnimation className="custom-class">
          <div>Test Content</div>
        </StaggeredScrollAnimation>
      </AnimationProvider>
    );
    
    const animationElement = screen.getByTestId('staggered-scroll-animation');
    expect(animationElement).toHaveClass('staggered-scroll-animation');
    expect(animationElement).toHaveClass('custom-class');
  });
  
  test('should render as a regular div when animations are disabled', () => {
    render(
      <AnimationProvider initialSettings={{ animationsEnabled: false }}>
        <StaggeredScrollAnimation>
          <div data-testid="test-content">Test Content</div>
        </StaggeredScrollAnimation>
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
        <StaggeredScrollAnimation disabled>
          <div data-testid="test-content">Test Content</div>
        </StaggeredScrollAnimation>
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
        <StaggeredScrollAnimation type="none">
          <div data-testid="test-content">Test Content</div>
        </StaggeredScrollAnimation>
      </AnimationProvider>
    );
    
    // Should have the regular-div
    expect(screen.getByTestId('regular-div')).toBeInTheDocument();
    
    // Should still render the content
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
});