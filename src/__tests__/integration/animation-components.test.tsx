import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AppProviders } from '../../components/AppProviders';
import { ScrollAnimation } from '../../components/animations/ScrollAnimation';
import { MicroInteraction } from '../../components/animations/MicroInteraction';
import { PageTransition } from '../../components/animations/PageTransition';
import { LoadingAnimation } from '../../components/animations/LoadingAnimation';
import { AnimationProvider, useAnimation } from '../../components/animations/AnimationContext';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => (
        <div data-testid="motion-div" {...props}>
          {children}
        </div>
      ),
      section: ({ children, ...props }: any) => (
        <section data-testid="motion-section" {...props}>
          {children}
        </section>
      ),
      span: ({ children, ...props }: any) => (
        <span data-testid="motion-span" {...props}>
          {children}
        </span>
      )
    },
    AnimatePresence: ({ children }: any) => (
      <div data-testid="animate-presence">{children}</div>
    )
  };
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  private _callback: IntersectionObserverCallback;
  
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.root = options?.root && options.root instanceof Element ? options.root : null;
    this.rootMargin = options?.rootMargin || '0px';
    this.thresholds = Array.isArray(options?.threshold) ? options.threshold : [options?.threshold || 0];
    this._callback = callback;
  }
  
  observe() {
    // Trigger the callback with mock entries
    setTimeout(() => {
      const mockEntry = {
        isIntersecting: true,
        target: document.createElement('div'),
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRatio: 1,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: Date.now()
      };
      
      this._callback([mockEntry as IntersectionObserverEntry], this);
    }, 0);
  }
  
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

global.IntersectionObserver = MockIntersectionObserver as any;

describe('Animation Components Integration', () => {
  beforeEach(() => {
    // Reset localStorage
    localStorage.clear();
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  
  test('ScrollAnimation renders and triggers animation on scroll', async () => {
    render(
      <AppProviders>
        <ScrollAnimation
          type="fade-in"
          duration={0.5}
          delay={0.1}
          threshold={0.1}
        >
          <div>Animated Content</div>
        </ScrollAnimation>
      </AppProviders>
    );
    
    // Check that the component is rendered
    expect(screen.getByText('Animated Content')).toBeInTheDocument();
    
    // Check that the motion div is rendered
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
    
    // Wait for the animation to be triggered by the IntersectionObserver
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    // Check that the animation is triggered
    expect(screen.getByTestId('motion-div')).toHaveAttribute('data-animate', 'true');
  });
  
  test('MicroInteraction renders and triggers animation on interaction', () => {
    render(
      <AppProviders>
        <MicroInteraction
          type="hover-scale"
          duration={0.3}
        >
          <button>Hover Me</button>
        </MicroInteraction>
      </AppProviders>
    );
    
    // Check that the component is rendered
    expect(screen.getByText('Hover Me')).toBeInTheDocument();
    
    // Check that the motion div is rendered
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
    
    // Trigger the hover interaction
    fireEvent.mouseEnter(screen.getByText('Hover Me'));
    
    // Check that the animation is triggered
    expect(screen.getByTestId('motion-div')).toHaveAttribute('data-state', 'hover');
    
    // Trigger the mouseLeave interaction
    fireEvent.mouseLeave(screen.getByText('Hover Me'));
    
    // Check that the animation is reset
    expect(screen.getByTestId('motion-div')).toHaveAttribute('data-state', 'normal');
  });
  
  test('PageTransition renders and animates page transitions', () => {
    render(
      <AppProviders>
        <PageTransition>
          <div>Page Content</div>
        </PageTransition>
      </AppProviders>
    );
    
    // Check that the component is rendered
    expect(screen.getByText('Page Content')).toBeInTheDocument();
    
    // Check that the AnimatePresence is rendered
    expect(screen.getByTestId('animate-presence')).toBeInTheDocument();
    
    // Check that the motion div is rendered
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });
  
  test('LoadingAnimation renders and shows loading state', () => {
    render(
      <AppProviders>
        <LoadingAnimation
          isLoading={true}
          type="spinner"
          color="blue"
          size="md"
        >
          <div>Content After Loading</div>
        </LoadingAnimation>
      </AppProviders>
    );
    
    // Check that the loading animation is rendered
    expect(screen.getByTestId('motion-div')).toHaveAttribute('data-loading', 'true');
    expect(screen.getByTestId('motion-div')).toHaveAttribute('data-type', 'spinner');
    
    // Content should not be visible while loading
    expect(screen.queryByText('Content After Loading')).not.toBeVisible();
    
    // Update to not loading
    render(
      <AppProviders>
        <LoadingAnimation
          isLoading={false}
          type="spinner"
          color="blue"
          size="md"
        >
          <div>Content After Loading</div>
        </LoadingAnimation>
      </AppProviders>
    );
    
    // Check that the content is now visible
    expect(screen.getByText('Content After Loading')).toBeVisible();
  });
  
  test('AnimationContext provides animation settings and controls', () => {
    // Create a test component that uses the animation context
    const TestComponent = () => {
      const {
        animationsEnabled,
        toggleAnimations,
        reducedMotion,
        animationSpeed,
        setAnimationSpeed
      } = useAnimation();
      
      return (
        <div>
          <div data-testid="animations-enabled">{animationsEnabled.toString()}</div>
          <div data-testid="reduced-motion">{reducedMotion.toString()}</div>
          <div data-testid="animation-speed">{animationSpeed}</div>
          <button onClick={() => toggleAnimations()}>
            Toggle Animations
          </button>
          <button onClick={() => setAnimationSpeed(animationSpeed === 1 ? 0.5 : 1)}>
            Toggle Speed
          </button>
        </div>
      );
    };
    
    render(
      <AnimationProvider>
        <TestComponent />
      </AnimationProvider>
    );
    
    // Check initial values
    expect(screen.getByTestId('animations-enabled')).toHaveTextContent('true');
    expect(screen.getByTestId('reduced-motion')).toHaveTextContent('false');
    expect(screen.getByTestId('animation-speed')).toHaveTextContent('1');
    
    // Toggle animations
    fireEvent.click(screen.getByText('Toggle Animations'));
    expect(screen.getByTestId('animations-enabled')).toHaveTextContent('false');
    
    // Toggle speed
    fireEvent.click(screen.getByText('Toggle Speed'));
    expect(screen.getByTestId('animation-speed')).toHaveTextContent('0.5');
  });
  
  test('all animation components work together', () => {
    render(
      <AppProviders>
        <div data-testid="animation-container">
          <ScrollAnimation
            type="fade-in"
            duration={0.5}
            delay={0.1}
            threshold={0.1}
          >
            <MicroInteraction
              type="hover-scale"
              duration={0.3}
            >
              <button>Interactive Button</button>
            </MicroInteraction>
          </ScrollAnimation>
          
          <PageTransition>
            <LoadingAnimation
              isLoading={false}
              type="spinner"
              color="blue"
              size="md"
            >
              <div>Page Content</div>
            </LoadingAnimation>
          </PageTransition>
        </div>
      </AppProviders>
    );
    
    // Check that all components are rendered
    expect(screen.getByText('Interactive Button')).toBeInTheDocument();
    expect(screen.getByText('Page Content')).toBeInTheDocument();
    
    // Trigger the hover interaction
    fireEvent.mouseEnter(screen.getByText('Interactive Button'));
    
    // Check that the animation is triggered
    expect(screen.getByText('Interactive Button').closest('[data-testid="motion-div"]')).toHaveAttribute('data-state', 'hover');
  });
  
  test('animation components respect reduced motion preferences', () => {
    // Mock reduced motion preference
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
      <AppProviders>
        <div data-testid="animation-container">
          <ScrollAnimation
            type="fade-in"
            duration={0.5}
            delay={0.1}
            threshold={0.1}
          >
            <div>Animated Content</div>
          </ScrollAnimation>
          
          <MicroInteraction
            type="hover-scale"
            duration={0.3}
          >
            <button>Interactive Button</button>
          </MicroInteraction>
        </div>
      </AppProviders>
    );
    
    // Check that reduced motion is applied
    expect(screen.getByTestId('animation-container').closest('div')).toHaveAttribute('data-reduced-motion', 'true');
    
    // Check that animations are disabled or simplified
    expect(screen.getByText('Animated Content').closest('[data-testid="motion-div"]')).toHaveAttribute('data-reduced-motion', 'true');
    expect(screen.getByText('Interactive Button').closest('[data-testid="motion-div"]')).toHaveAttribute('data-reduced-motion', 'true');
  });
});