import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppRouterPageTransition } from '../../../components/animations/PageTransition';
import { AnimationProvider } from '../../../components/animations/AnimationContext';

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/test-path')
}));

// Mock framer-motion
jest.mock('framer-motion', () => {
  return {
    motion: {
      div: ({ children, ...props }: any) => (
        <div data-testid="motion-div" {...props}>
          {children}
        </div>
      )
    },
    AnimatePresence: ({ children }: any) => (
      <div data-testid="animate-presence">{children}</div>
    )
  };
});

describe('AppRouterPageTransition', () => {
  test('should render children', () => {
    render(
      <AnimationProvider>
        <AppRouterPageTransition>
          <div data-testid="test-content">Test Content</div>
        </AppRouterPageTransition>
      </AnimationProvider>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
  });
  
  test('should apply animation based on pathname', () => {
    render(
      <AnimationProvider>
        <AppRouterPageTransition>
          <div>Test Content</div>
        </AppRouterPageTransition>
      </AnimationProvider>
    );
    
    expect(screen.getAllByTestId('motion-div')[0]).toBeInTheDocument();
    expect(screen.getByTestId('animate-presence')).toBeInTheDocument();
  });
  
  test('should render as a regular div when animations are disabled', () => {
    render(
      <AnimationProvider initialSettings={{ animationsEnabled: false }}>
        <AppRouterPageTransition>
          <div data-testid="test-content">Test Content</div>
        </AppRouterPageTransition>
      </AnimationProvider>
    );
    
    // Should not have the motion-div
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
    
    // Should still render the content
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
  
  test('should trigger animation callbacks', async () => {
    const onAnimationStart = jest.fn();
    const onAnimationComplete = jest.fn();
    
    render(
      <AnimationProvider>
        <AppRouterPageTransition
          onAnimationStart={onAnimationStart}
          onAnimationComplete={onAnimationComplete}
        >
          <div>Test Content</div>
        </AppRouterPageTransition>
      </AnimationProvider>
    );
    
    // Wait for animation to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
    });
    
    expect(onAnimationStart).toHaveBeenCalled();
    expect(onAnimationComplete).toHaveBeenCalled();
  });
  
  test('should respect reduced motion preference', () => {
    // Mock matchMedia for reduced motion
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    
    render(
      <AnimationProvider>
        <AppRouterPageTransition>
          <div data-testid="test-content">Test Content</div>
        </AppRouterPageTransition>
      </AnimationProvider>
    );
    
    // Should not have the motion-div when reduced motion is preferred
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
    
    // Should still render the content
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });
});