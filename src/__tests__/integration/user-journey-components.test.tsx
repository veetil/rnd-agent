import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AppProviders } from '../../components/AppProviders';
import { ContextualCTA } from '../../components/user-journey/ContextualCTA';
import { ProgressiveDisclosure } from '../../components/user-journey/ProgressiveDisclosure';
import { GuidedTour } from '../../components/user-journey/GuidedTour';
import { MobileNavigation } from '../../components/user-journey/MobileNavigation';
import { PersonaProvider, usePersona } from '../../components/user-journey/PersonaContext';

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

describe('User Journey Components Integration', () => {
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
    
    // Add DOM elements for tour targets
    document.body.innerHTML = `
      <div id="welcome-section">Welcome Section</div>
      <div id="features-section">Features Section</div>
      <div id="support-section">Support Section</div>
    `;
  });
  
  // Sample data for tests
  const ctaData = {
    title: 'Get Started Today',
    description: 'Start building with IdeaCode and see the difference.',
    actions: [
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
    ],
    relevantPersonas: ['technical-developer', 'engineering-leader']
  };

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

  const navigationItems = [
    {
      label: 'Home',
      href: '/',
      icon: '🏠'
    },
    {
      label: 'Features',
      href: '/features',
      icon: '✨'
    },
    {
      label: 'Pricing',
      href: '/pricing',
      icon: '💰'
    },
    {
      label: 'Documentation',
      href: '/docs',
      icon: '📚'
    }
  ];
  
  test('ContextualCTA renders and adapts to different personas', () => {
    render(
      <AppProviders>
        <ContextualCTA
          title={ctaData.title}
          description={ctaData.description}
          actions={ctaData.actions}
          relevantPersonas={ctaData.relevantPersonas}
        />
      </AppProviders>
    );
    
    // Check that the component is rendered
    expect(screen.getByText(ctaData.title)).toBeInTheDocument();
    expect(screen.getByText(ctaData.description)).toBeInTheDocument();
    
    // Check that actions are rendered
    expect(screen.getByText('Try for Free')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    
    // Initially, general persona
    expect(screen.getByText('Try for Free').closest('a')).toHaveAttribute('data-primary', 'true');
    
    // Change to technical developer persona
    fireEvent.click(screen.getByText('Set Developer'));
    
    // Check that the CTA is adapted for technical developers
    expect(screen.getByText('Try for Free').closest('a')).toHaveAttribute('data-relevant-for-persona', 'true');
    
    // Change to business stakeholder persona
    fireEvent.click(screen.getByText('Set Business'));
    
    // Check that the CTA is not highlighted for business stakeholders
    expect(screen.getByText('Try for Free').closest('a')).not.toHaveAttribute('data-relevant-for-persona', 'true');
  });
  
  test('ProgressiveDisclosure renders and shows/hides content based on persona', () => {
    render(
      <AppProviders>
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
      </AppProviders>
    );
    
    // Check that the component is rendered
    expect(screen.getByText('Technical Architecture')).toBeInTheDocument();
    
    // Initially, general persona, content should be collapsed
    expect(screen.getByText('Our platform is built on a modern, scalable architecture.')).toBeInTheDocument();
    expect(screen.queryByText('Architecture Details')).not.toBeInTheDocument();
    
    // Change to technical developer persona
    fireEvent.click(screen.getByText('Set Developer'));
    
    // Check that the content is expanded for technical developers
    expect(screen.queryByText('Our platform is built on a modern, scalable architecture.')).not.toBeInTheDocument();
    expect(screen.getByText('Architecture Details')).toBeInTheDocument();
    expect(screen.getByText('Detailed technical information about our platform architecture.')).toBeInTheDocument();
    
    // Change to business stakeholder persona
    fireEvent.click(screen.getByText('Set Business'));
    
    // Check that the content is collapsed for business stakeholders
    expect(screen.getByText('Our platform is built on a modern, scalable architecture.')).toBeInTheDocument();
    expect(screen.queryByText('Architecture Details')).not.toBeInTheDocument();
    
    // Manually expand the content
    fireEvent.click(screen.getByText('Technical Architecture'));
    
    // Check that the content is expanded
    expect(screen.queryByText('Our platform is built on a modern, scalable architecture.')).not.toBeInTheDocument();
    expect(screen.getByText('Architecture Details')).toBeInTheDocument();
  });
  
  test('GuidedTour renders and allows navigation through tour steps', () => {
    render(
      <AppProviders>
        <GuidedTour
          steps={tourSteps}
          isActive={true}
          tourId="test-tour"
          onComplete={jest.fn()}
          onClose={jest.fn()}
        />
      </AppProviders>
    );
    
    // Check that the tour is rendered
    expect(screen.getByText('Welcome to the Platform')).toBeInTheDocument();
    expect(screen.getByText('This guided tour will help you get started with our platform.')).toBeInTheDocument();
    
    // Check that navigation buttons are rendered
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
    
    // Navigate to the next step
    fireEvent.click(screen.getByText('Next'));
    
    // Check that the second step is shown
    expect(screen.getByText('Explore Features')).toBeInTheDocument();
    expect(screen.getByText('Discover the key features that make our platform powerful.')).toBeInTheDocument();
    
    // Check that navigation buttons are updated
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    
    // Navigate back to the first step
    fireEvent.click(screen.getByText('Previous'));
    
    // Check that the first step is shown again
    expect(screen.getByText('Welcome to the Platform')).toBeInTheDocument();
    
    // Skip the tour
    fireEvent.click(screen.getByText('Skip'));
    
    // Check that the tour is closed
    expect(screen.queryByText('Welcome to the Platform')).not.toBeInTheDocument();
  });
  
  test('MobileNavigation renders and allows navigation', () => {
    render(
      <AppProviders>
        <MobileNavigation
          items={navigationItems.map(item => ({
            ...item,
            isActive: item.href === '/'
          }))}
        />
      </AppProviders>
    );
    
    // Check that the navigation is rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    
    // Check that the current item is highlighted
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('data-active', 'true');
    
    // Navigate to another page
    fireEvent.click(screen.getByText('Features'));
    
    // Check that navigation would occur (we can't actually navigate in tests)
    expect(screen.getByText('Features').closest('a')).toHaveAttribute('href', '/features');
  });
  
  test('MobileNavigation adapts to different personas', () => {
    // Create a custom navigation with persona-specific items
    const personaNavigationItems = [
      ...navigationItems,
      {
        label: 'Developer Docs',
        href: '/dev-docs',
        icon: '👨‍💻',
        forPersonas: ['technical-developer']
      },
      {
        label: 'ROI Calculator',
        href: '/roi',
        icon: '📊',
        forPersonas: ['business-stakeholder']
      }
    ];
    
    render(
      <AppProviders>
        <MobileNavigation
          items={personaNavigationItems.map(item => ({
            ...item,
            isActive: item.href === '/'
          }))}
        />
      </AppProviders>
    );
    
    // Initially, general persona
    expect(screen.queryByText('Developer Docs')).not.toBeInTheDocument();
    expect(screen.queryByText('ROI Calculator')).not.toBeInTheDocument();
    
    // Change to technical developer persona
    fireEvent.click(screen.getByText('Set Developer'));
    
    // Check that developer-specific items are shown
    expect(screen.getByText('Developer Docs')).toBeInTheDocument();
    expect(screen.queryByText('ROI Calculator')).not.toBeInTheDocument();
    
    // Change to business stakeholder persona
    fireEvent.click(screen.getByText('Set Business'));
    
    // Check that business-specific items are shown
    expect(screen.queryByText('Developer Docs')).not.toBeInTheDocument();
    expect(screen.getByText('ROI Calculator')).toBeInTheDocument();
  });
  
  test('PersonaContext provides persona detection and switching', () => {
    // Create a test component that uses the persona context
    const TestComponent = () => {
      const { persona, setPersona } = usePersona();
      
      return (
        <div>
          <div data-testid="current-persona">{persona}</div>
          <button onClick={() => setPersona('technical-developer')}>Set Developer</button>
          <button onClick={() => setPersona('business-stakeholder')}>Set Business</button>
          <button onClick={() => setPersona('engineering-leader')}>Set Leader</button>
          <button onClick={() => setPersona('general')}>Reset Persona</button>
        </div>
      );
    };
    
    render(
      <PersonaProvider>
        <TestComponent />
      </PersonaProvider>
    );
    
    // Check initial persona
    expect(screen.getByTestId('current-persona')).toHaveTextContent('general');
    
    // Change persona
    fireEvent.click(screen.getByText('Set Developer'));
    expect(screen.getByTestId('current-persona')).toHaveTextContent('technical-developer');
    
    fireEvent.click(screen.getByText('Set Business'));
    expect(screen.getByTestId('current-persona')).toHaveTextContent('business-stakeholder');
    
    fireEvent.click(screen.getByText('Set Leader'));
    expect(screen.getByTestId('current-persona')).toHaveTextContent('engineering-leader');
    
    // Reset persona to general
    fireEvent.click(screen.getByText('Reset Persona'));
    expect(screen.getByTestId('current-persona')).toHaveTextContent('general');
  });
  
  test('all user journey components work together', () => {
    render(
      <AppProviders>
        <div data-testid="user-journey-container">
          <ContextualCTA
            title={ctaData.title}
            description={ctaData.description}
            actions={ctaData.actions}
            relevantPersonas={ctaData.relevantPersonas}
          />
          
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
          
          <GuidedTour
            steps={tourSteps}
            isActive={true}
            tourId="test-tour"
            onComplete={jest.fn()}
            onClose={jest.fn()}
          />
          
          <MobileNavigation
            items={navigationItems.map(item => ({
              ...item,
              isActive: item.href === '/'
            }))}
          />
        </div>
      </AppProviders>
    );
    
    // Check that all components are rendered
    expect(screen.getByText('Get Started Today')).toBeInTheDocument();
    expect(screen.getByText('Technical Architecture')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the Platform')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    
    // Change to technical developer persona
    fireEvent.click(screen.getByText('Set Developer'));
    
    // Check that all components adapt to the persona
    expect(screen.getByText('Try for Free').closest('a')).toHaveAttribute('data-relevant-for-persona', 'true');
    expect(screen.getByText('Architecture Details')).toBeInTheDocument();
    
    // Interact with the guided tour
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Explore Features')).toBeInTheDocument();
    
    // Change to business stakeholder persona
    fireEvent.click(screen.getByText('Set Business'));
    
    // Check that all components adapt to the new persona
    expect(screen.getByText('Try for Free').closest('a')).not.toHaveAttribute('data-relevant-for-persona', 'true');
    expect(screen.getByText('Our platform is built on a modern, scalable architecture.')).toBeInTheDocument();
  });
  
  test('user journey components respect accessibility preferences', () => {
    // Mock high contrast preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-contrast: more)',
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
        <div data-testid="user-journey-container">
          <ContextualCTA
            title={ctaData.title}
            description={ctaData.description}
            actions={ctaData.actions}
            relevantPersonas={ctaData.relevantPersonas}
          />
          
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
        </div>
      </AppProviders>
    );
    
    // Check that high contrast mode is applied
    expect(screen.getByTestId('user-journey-container').closest('div')).toHaveAttribute('data-high-contrast', 'true');
    
    // Check that CTA buttons have high contrast styles
    expect(screen.getByText('Try for Free').closest('a')).toHaveAttribute('data-high-contrast', 'true');
    expect(screen.getByText('Learn More').closest('a')).toHaveAttribute('data-high-contrast', 'true');
  });
});