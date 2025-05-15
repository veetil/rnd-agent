import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollAnimation, StaggeredScrollAnimation } from '../../components/animations/ScrollAnimation';
import { MicroInteraction } from '../../components/animations/MicroInteraction';
import { PageTransition } from '../../components/animations/PageTransition';
import { LoadingAnimation } from '../../components/animations/LoadingAnimation';
import { AnimationProvider, useAnimation } from '../../components/animations/AnimationContext';
import { AccessibilityProvider } from '../../components/accessibility/AccessibilityContext';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
        <div data-testid="motion-div" {...props}>{children}</div>,
      span: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
        <span data-testid="motion-span" {...props}>{children}</span>,
      path: ({ ...props }: { [key: string]: any }) => 
        <path data-testid="motion-path" {...props} />,
      header: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
        <header data-testid="motion-header" {...props}>{children}</header>,
      svg: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
        <svg data-testid="motion-svg" {...props}>{children}</svg>,
      circle: ({ ...props }: { [key: string]: any }) => 
        <circle data-testid="motion-circle" {...props} />
    },
    AnimatePresence: ({ children, mode }: { children: React.ReactNode; mode?: string }) => <>{children}</>,
    useAnimation: () => ({
      start: jest.fn().mockResolvedValue(null)
    })
  };
});

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock matchMedia for reduced motion
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false, // Default to no reduced motion
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Wrapper component with all required providers
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AccessibilityProvider>
      <AnimationProvider>
        {children}
      </AnimationProvider>
    </AccessibilityProvider>
  );
}

describe('Animation Components', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Reset document body
    document.body.innerHTML = '';
  });
  
  describe('AnimationContext', () => {
    // Test component that uses the animation context
    const TestComponent = () => {
      const { 
        animationsEnabled, 
        animationSpeed, 
        toggleAnimations, 
        setAnimationSpeed 
      } = useAnimation();
      
      return (
        <div>
          <div data-testid="animations-enabled">{animationsEnabled.toString()}</div>
          <div data-testid="animation-speed">{animationSpeed}</div>
          <button onClick={toggleAnimations}>Toggle Animations</button>
          <button onClick={() => setAnimationSpeed(2)}>Speed Up</button>
          <button onClick={() => setAnimationSpeed(0.5)}>Slow Down</button>
        </div>
      );
    };
    
    test('provides animation context with default values', () => {
      render(
        <AnimationProvider>
          <TestComponent />
        </AnimationProvider>
      );
      
      expect(screen.getByTestId('animations-enabled')).toHaveTextContent('true');
      expect(screen.getByTestId('animation-speed')).toHaveTextContent('1');
    });
    
    test('toggles animations', () => {
      render(
        <AnimationProvider>
          <TestComponent />
        </AnimationProvider>
      );
      
      // Initially enabled
      expect(screen.getByTestId('animations-enabled')).toHaveTextContent('true');
      
      // Toggle animations
      act(() => {
        screen.getByText('Toggle Animations').click();
      });
      
      // Should now be disabled
      expect(screen.getByTestId('animations-enabled')).toHaveTextContent('false');
    });
    
    test('changes animation speed', () => {
      render(
        <AnimationProvider>
          <TestComponent />
        </AnimationProvider>
      );
      
      // Initial speed
      expect(screen.getByTestId('animation-speed')).toHaveTextContent('1');
      
      // Speed up
      act(() => {
        screen.getByText('Speed Up').click();
      });
      
      // Should now be faster
      expect(screen.getByTestId('animation-speed')).toHaveTextContent('2');
      
      // Slow down
      act(() => {
        screen.getByText('Slow Down').click();
      });
      
      // Should now be slower
      expect(screen.getByTestId('animation-speed')).toHaveTextContent('0.5');
    });
  });
  
  describe('ScrollAnimation', () => {
    test('renders children with motion div', () => {
      render(
        <TestWrapper>
          <ScrollAnimation type="fade-in">
            <p>Test content</p>
          </ScrollAnimation>
        </TestWrapper>
      );
      
      const motionDiv = screen.getByTestId('motion-div');
      expect(motionDiv).toBeInTheDocument();
      expect(motionDiv).toHaveTextContent('Test content');
    });
    
    test('applies custom className', () => {
      render(
        <TestWrapper>
          <ScrollAnimation type="fade-in" className="custom-class">
            <p>Test content</p>
          </ScrollAnimation>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('motion-div')).toHaveClass('custom-class');
    });
    
    test('sets up intersection observer', () => {
      render(
        <TestWrapper>
          <ScrollAnimation type="fade-in">
            <p>Test content</p>
          </ScrollAnimation>
        </TestWrapper>
      );
      
      // IntersectionObserver should be created
      expect(mockIntersectionObserver).toHaveBeenCalled();
    });
    
    test('cleans up intersection observer on unmount', () => {
      const { unmount } = render(
        <TestWrapper>
          <ScrollAnimation type="fade-in">
            <p>Test content</p>
          </ScrollAnimation>
        </TestWrapper>
      );
      
      // Get the mock instance
      const observerInstance = mockIntersectionObserver.mock.results[0].value;
      
      // Unmount the component
      unmount();
      
      // Disconnect should be called
      expect(observerInstance.disconnect).toHaveBeenCalled();
    });
  });
  
  describe('StaggeredScrollAnimation', () => {
    test('renders children with motion div', () => {
      render(
        <TestWrapper>
          <StaggeredScrollAnimation type="fade-in">
            <div>Item 1</div>
            <div>Item 2</div>
            <div>Item 3</div>
          </StaggeredScrollAnimation>
        </TestWrapper>
      );
      
      const motionDiv = screen.getByTestId('motion-div');
      expect(motionDiv).toBeInTheDocument();
      expect(motionDiv).toHaveTextContent('Item 1');
      expect(motionDiv).toHaveTextContent('Item 2');
      expect(motionDiv).toHaveTextContent('Item 3');
    });
    
    test('applies custom className', () => {
      render(
        <TestWrapper>
          <StaggeredScrollAnimation type="fade-in" className="staggered-items">
            <div>Item 1</div>
            <div>Item 2</div>
          </StaggeredScrollAnimation>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('motion-div')).toHaveClass('staggered-items');
    });
    
    test('sets up intersection observer', () => {
      render(
        <TestWrapper>
          <StaggeredScrollAnimation type="fade-in">
            <div>Item 1</div>
            <div>Item 2</div>
          </StaggeredScrollAnimation>
        </TestWrapper>
      );
      
      // IntersectionObserver should be created
      expect(mockIntersectionObserver).toHaveBeenCalled();
    });
  });
  
  describe('MicroInteraction', () => {
    test('renders children with motion div', () => {
      render(
        <TestWrapper>
          <MicroInteraction type="hover">
            <p>Hover me</p>
          </MicroInteraction>
        </TestWrapper>
      );
      
      const motionDiv = screen.getByTestId('motion-div');
      expect(motionDiv).toBeInTheDocument();
      expect(motionDiv).toHaveTextContent('Hover me');
    });
    
    test('applies custom className', () => {
      render(
        <TestWrapper>
          <MicroInteraction type="hover" className="interactive-element">
            <p>Hover me</p>
          </MicroInteraction>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('motion-div')).toHaveClass('interactive-element');
    });
    
    test('renders with disabled state', () => {
      render(
        <TestWrapper>
          <MicroInteraction type="hover" disabled={true}>
            <p>Disabled interaction</p>
          </MicroInteraction>
        </TestWrapper>
      );
      
      // When disabled, it should still render the content
      expect(screen.getByText('Disabled interaction')).toBeInTheDocument();
    });
  });
  
  describe('PageTransition', () => {
    test('renders children with motion div', () => {
      render(
        <TestWrapper>
          <PageTransition>
            <div>Page content</div>
          </PageTransition>
        </TestWrapper>
      );
      
      const motionDiv = screen.getByTestId('motion-div');
      expect(motionDiv).toBeInTheDocument();
      expect(motionDiv).toHaveTextContent('Page content');
    });
    
    test('applies custom className', () => {
      render(
        <TestWrapper>
          <PageTransition className="page-wrapper">
            <div>Page content</div>
          </PageTransition>
        </TestWrapper>
      );
      
      expect(screen.getByTestId('motion-div')).toHaveClass('page-wrapper');
    });
  });
  
  describe('LoadingAnimation', () => {
    test('renders loading animation', () => {
      render(
        <TestWrapper>
          <LoadingAnimation />
        </TestWrapper>
      );
      
      // Should render the SVG container
      expect(screen.getByTestId('motion-svg')).toBeInTheDocument();
      
      // Should render the circles
      const circles = screen.getAllByTestId('motion-circle');
      expect(circles.length).toBeGreaterThan(0);
    });
    
    test('applies custom size', () => {
      render(
        <TestWrapper>
          <LoadingAnimation size={60} />
        </TestWrapper>
      );
      
      const svg = screen.getByTestId('motion-svg');
      expect(svg).toHaveAttribute('width', '60');
      expect(svg).toHaveAttribute('height', '60');
    });
    
    test('applies custom color', () => {
      render(
        <TestWrapper>
          <LoadingAnimation color="#FF0000" />
        </TestWrapper>
      );
      
      // The circles should have the custom color
      const circles = screen.getAllByTestId('motion-circle');
      circles.forEach(circle => {
        expect(circle).toHaveAttribute('stroke', '#FF0000');
      });
    });
    
    test('renders with text', () => {
      render(
        <TestWrapper>
          <LoadingAnimation loadingText="Loading data..." showText={true} />
        </TestWrapper>
      );
      
      expect(screen.getByText('Loading data...')).toBeInTheDocument();
    });
  });
});