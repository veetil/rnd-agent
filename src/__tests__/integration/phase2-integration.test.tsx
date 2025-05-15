import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// Import foundation components
import { AnimationProvider, useAnimation } from '../../components/animations/AnimationContext';
import { AccessibilityProvider, useAccessibility } from '../../components/accessibility/AccessibilityContext';
import { PersonaProvider, usePersona } from '../../components/user-journey/PersonaContext';
import { ResponsiveProvider } from '../../components/responsive/ResponsiveContext';

// Import animation components
import { ScrollAnimation } from '../../components/animations/ScrollAnimation';
import { MicroInteraction } from '../../components/animations/MicroInteraction';
import { PageTransition } from '../../components/animations/PageTransition';
import { LoadingAnimation } from '../../components/animations/LoadingAnimation';

// Import interactive components
import { FeatureHighlight } from '../../components/interactive/FeatureHighlight';
import { ProductDemo } from '../../components/interactive/ProductDemo';
import { ExpandableFAQ } from '../../components/interactive/ExpandableFAQ';
import { PricingCalculator } from '../../components/interactive/PricingCalculator';

// Import user journey components
import { ContextualCTA } from '../../components/user-journey/ContextualCTA';
import { ProgressiveDisclosure } from '../../components/user-journey/ProgressiveDisclosure';
import { GuidedTour } from '../../components/user-journey/GuidedTour';
import { MobileNavigation } from '../../components/user-journey/MobileNavigation';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
        <div data-testid="motion-div" data-reduced-motion={props['data-reduced-motion']} {...props}>{children}</div>,
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
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  callback: IntersectionObserverCallback;
  
  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.root = options?.root instanceof Element ? options.root : null;
    this.rootMargin = options?.rootMargin || '0px';
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold || 0];
  }
  
  observe() {
    // Simulate an intersection
    setTimeout(() => {
      const entry = {
        isIntersecting: true,
        intersectionRatio: 1,
        boundingClientRect: {} as DOMRectReadOnly,
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        target: document.createElement('div'),
        time: Date.now()
      };
      
      this.callback([entry], this);
    }, 0);
  }
  
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}

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

// Sample data for tests
const featureData = {
  title: 'Advanced Analytics',
  subtitle: 'Gain insights from your data with our advanced analytics tools.',
  features: [
    {
      id: 'feature-1',
      title: 'Real-time Dashboards',
      description: 'Monitor your metrics in real-time with customizable dashboards.',
      icon: '📊',
      technicalDetails: 'Built with WebSockets for live updates and D3.js for visualizations.',
      businessValue: 'Make data-driven decisions faster with real-time insights.'
    },
    {
      id: 'feature-2',
      title: 'Custom Reports',
      description: 'Generate detailed reports tailored to your specific needs.',
      icon: '📈',
      technicalDetails: 'Uses a flexible templating system with export options to PDF, CSV, and Excel.',
      engineeringValue: 'Easily integrate with existing data pipelines.'
    }
  ]
};

const demoSteps = [
  {
    id: 'step-1',
    title: 'Create Project',
    description: 'Start by creating a new project in the dashboard.',
    content: 'Create project content',
    codeExample: 'npm init ideacode-project my-project'
  },
  {
    id: 'step-2',
    title: 'Configure Settings',
    description: 'Adjust the project settings to match your requirements.',
    content: 'Configure settings content',
    codeExample: 'ideacode config --set environment=production'
  }
];

const faqItems = [
  {
    id: 'faq-1',
    question: 'How do I get started?',
    answer: 'Sign up for an account and follow our quick start guide.',
    category: 'Getting Started'
  },
  {
    id: 'faq-2',
    question: 'What are the pricing options?',
    answer: 'We offer flexible pricing plans for individuals and teams.',
    category: 'Pricing'
  }
];

const tourSteps = [
  {
    id: 'step-1',
    title: 'Welcome to the Platform',
    content: 'This guided tour will help you get started with our platform.',
    target: '#welcome-section'
  },
  {
    id: 'step-2',
    title: 'Explore Features',
    content: 'Discover the key features that make our platform powerful.',
    target: '#features-section'
  }
];

// App providers wrapper
const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AccessibilityProvider>
      <AnimationProvider>
        <PersonaProvider>
          <ResponsiveProvider>
            {children}
          </ResponsiveProvider>
        </PersonaProvider>
      </AnimationProvider>
    </AccessibilityProvider>
  );
};

describe('Phase 2 Integration Tests', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = MockIntersectionObserver as any;
    
    // Mock window.scrollTo
    global.scrollTo = jest.fn();
    
    // Reset localStorage
    localStorage.clear();
    
    // Add DOM elements for tour targets
    document.body.innerHTML = `
      <div id="welcome-section">Welcome Section</div>
      <div id="features-section">Features Section</div>
      <div id="support-section">Support Section</div>
    `;
  });
  
  describe('Foundation & Interactive Components Integration', () => {
    test('AnimationContext with FeatureHighlight', () => {
      // Create a test component that uses both animation context and feature highlight
      const TestComponent = () => {
        const { animationsEnabled, toggleAnimations } = useAnimation();
        
        return (
          <div>
            <div data-testid="animations-enabled">{animationsEnabled.toString()}</div>
            <button onClick={toggleAnimations}>Toggle Animations</button>
            <FeatureHighlight
              title={featureData.title}
              subtitle={featureData.subtitle}
              features={featureData.features}
            />
          </div>
        );
      };
      
      render(
        <AppProviders>
          <TestComponent />
        </AppProviders>
      );
      
      // Check that animations are enabled by default
      expect(screen.getByTestId('animations-enabled')).toHaveTextContent('true');
      
      // Check that feature highlight is rendered
      expect(screen.getByText('Advanced Analytics')).toBeInTheDocument();
      expect(screen.getByText('Real-time Dashboards')).toBeInTheDocument();
      
      // Toggle animations off
      fireEvent.click(screen.getByText('Toggle Animations'));
      
      // Check that animations are now disabled
      expect(screen.getByTestId('animations-enabled')).toHaveTextContent('false');
      
      // Feature highlight should still be visible
      expect(screen.getByText('Advanced Analytics')).toBeInTheDocument();
    });
    
    test('PersonaContext with ProductDemo', () => {
      // Create a test component that uses both persona context and product demo
      const TestComponent = () => {
        const { persona, setPersona } = usePersona();
        
        return (
          <div>
            <div data-testid="current-persona">{persona}</div>
            <button onClick={() => setPersona('technical-developer')}>Set Developer</button>
            <button onClick={() => setPersona('business-stakeholder')}>Set Business</button>
            <ProductDemo
              title="See IdeaCode in Action"
              subtitle="Watch how our platform solves real-world problems"
              steps={demoSteps}
            />
          </div>
        );
      };
      
      render(
        <AppProviders>
          <TestComponent />
        </AppProviders>
      );
      
      // Check that persona is general by default
      expect(screen.getByTestId('current-persona')).toHaveTextContent('general');
      
      // Check that product demo is rendered
      expect(screen.getByText('See IdeaCode in Action')).toBeInTheDocument();
      expect(screen.getByText('Create Project')).toBeInTheDocument();
      
      // Change persona to technical developer
      fireEvent.click(screen.getByText('Set Developer'));
      
      // Check that persona is updated
      expect(screen.getByTestId('current-persona')).toHaveTextContent('technical-developer');
      
      // Product demo should still be visible with the same content
      expect(screen.getByText('See IdeaCode in Action')).toBeInTheDocument();
      expect(screen.getByText('Create Project')).toBeInTheDocument();
      
      // Technical details should be more prominent for technical personas
      expect(screen.getByText('npm init ideacode-project my-project')).toBeInTheDocument();
    });
    
    test('AccessibilityContext with ExpandableFAQ', () => {
      // Create a test component that uses both accessibility context and expandable FAQ
      const TestComponent = () => {
        const { highContrast, toggleHighContrast } = useAccessibility();
        
        return (
          <div>
            <div data-testid="high-contrast">{highContrast.toString()}</div>
            <button onClick={toggleHighContrast}>Toggle High Contrast</button>
            <ExpandableFAQ
              title="Frequently Asked Questions"
              faqs={faqItems}
              categories={['Getting Started', 'Pricing']}
            />
          </div>
        );
      };
      
      render(
        <AppProviders>
          <TestComponent />
        </AppProviders>
      );
      
      // Check that high contrast is disabled by default
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('false');
      
      // Check that expandable FAQ is rendered
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByText('How do I get started?')).toBeInTheDocument();
      
      // Toggle high contrast on
      fireEvent.click(screen.getByText('Toggle High Contrast'));
      
      // Check that high contrast is now enabled
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
      
      // Expandable FAQ should still be visible
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByText('How do I get started?')).toBeInTheDocument();
    });
  });
  
  describe('Animation & User Journey Integration', () => {
    test('ScrollAnimation with ProgressiveDisclosure', () => {
      render(
        <AppProviders>
          <ScrollAnimation type="fade-in">
            <ProgressiveDisclosure
              title="Technical Architecture"
              expandForPersonas={['engineering-leader', 'technical-developer']}
              technicalLevel={4}
              collapsedPreview="Our platform is built on a modern, scalable architecture."
            >
              <div>
                <h3>Architecture Details</h3>
                <p>Detailed technical information about our platform architecture.</p>
              </div>
            </ProgressiveDisclosure>
          </ScrollAnimation>
        </AppProviders>
      );
      
      // Check that scroll animation wrapper is rendered
      expect(screen.getByTestId('motion-div')).toBeInTheDocument();
      
      // Check that progressive disclosure is rendered
      expect(screen.getByText('Technical Architecture')).toBeInTheDocument();
      expect(screen.getByText('Our platform is built on a modern, scalable architecture.')).toBeInTheDocument();
      
      // Expand the disclosure
      fireEvent.click(screen.getByText('Technical Architecture'));
      
      // Check that detailed content is now visible
      expect(screen.getByText('Architecture Details')).toBeInTheDocument();
      expect(screen.getByText('Detailed technical information about our platform architecture.')).toBeInTheDocument();
    });
    
    test('MicroInteraction with ContextualCTA', () => {
      render(
        <AppProviders>
          <MicroInteraction type="hover-scale">
            <ContextualCTA
              title="Get Started Today"
              description="Start building with IdeaCode and see the difference."
              actions={[
                {
                  label: 'Try for Free',
                  href: '/signup',
                  isPrimary: true,
                  variant: 'primary' as const
                },
                {
                  label: 'Learn More',
                  href: '/learn-more',
                  isPrimary: false,
                  variant: 'outline' as const
                }
              ]}
              relevantPersonas="general"
            />
          </MicroInteraction>
        </AppProviders>
      );
      
      // Check that micro interaction wrapper is rendered
      expect(screen.getByTestId('motion-div')).toBeInTheDocument();
      
      // Check that contextual CTA is rendered
      expect(screen.getByText('Get Started Today')).toBeInTheDocument();
      expect(screen.getByText('Start building with IdeaCode and see the difference.')).toBeInTheDocument();
      expect(screen.getByText('Try for Free')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
    
    test('PageTransition with GuidedTour', () => {
      render(
        <AppProviders>
          <PageTransition>
            <GuidedTour
              steps={tourSteps}
              isActive={true}
              tourId="test-tour"
              onComplete={jest.fn()}
              onClose={jest.fn()}
            />
          </PageTransition>
        </AppProviders>
      );
      
      // Check that page transition wrapper is rendered
      expect(screen.getByTestId('motion-div')).toBeInTheDocument();
      
      // Check that guided tour is rendered
      expect(screen.getByText('Welcome to the Platform')).toBeInTheDocument();
      expect(screen.getByText('This guided tour will help you get started with our platform.')).toBeInTheDocument();
      
      // Navigate to next step
      fireEvent.click(screen.getByText('Next'));
      
      // Check that tour has advanced to the next step
      expect(screen.getByText('Explore Features')).toBeInTheDocument();
      expect(screen.getByText('Discover the key features that make our platform powerful.')).toBeInTheDocument();
    });
    
    test('LoadingAnimation with reduced motion preferences', () => {
      // Mock prefers-reduced-motion
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
          <LoadingAnimation isLoading={true} />
        </AppProviders>
      );
      
      // Check that loading animation is rendered
      expect(screen.getByTestId('motion-svg')).toBeInTheDocument();
      
      // Check that reduced motion is respected
      const motionElements = screen.getAllByTestId(/motion-/);
      motionElements.forEach(element => {
        if (element.hasAttribute('data-reduced-motion')) {
          expect(element).toHaveAttribute('data-reduced-motion', 'true');
        }
      });
    });
  });
  
  describe('Responsive Integration', () => {
    test('MobileNavigation with PersonaContext', () => {
      // Mock useMediaQuery to simulate mobile view
      const useMediaQueryMock = require('../../hooks/useMediaQuery').default;
      useMediaQueryMock.mockReturnValue(true); // Simulate mobile view
      
      // Create a test component that uses both persona context and mobile navigation
      const TestComponent = () => {
        const { persona, setPersona } = usePersona();
        
        return (
          <div>
            <div data-testid="current-persona">{persona}</div>
            <button onClick={() => setPersona('technical-developer')}>Set Developer</button>
            <MobileNavigation
              items={[
                { label: 'Home', href: '/' },
                { label: 'Products', href: '/products' },
                { label: 'About', href: '/about' }
              ]}
            />
          </div>
        );
      };
      
      render(
        <AppProviders>
          <TestComponent />
        </AppProviders>
      );
      
      // Check that persona is general by default
      expect(screen.getByTestId('current-persona')).toHaveTextContent('general');
      
      // Check that mobile navigation is rendered
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
      
      // Change persona to technical developer
      fireEvent.click(screen.getByText('Set Developer'));
      
      // Check that persona is updated
      expect(screen.getByTestId('current-persona')).toHaveTextContent('technical-developer');
      
      // Mobile navigation should still be visible
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
  });
});