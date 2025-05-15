import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PersonaProvider, usePersona, PersonaContent } from '../../components/user-journey/PersonaContext';
import { ContextualCTA } from '../../components/user-journey/ContextualCTA';
import { ProgressiveDisclosure } from '../../components/user-journey/ProgressiveDisclosure';
import { MobileNavigation } from '../../components/user-journey/MobileNavigation';
import { GuidedTour } from '../../components/user-journey/GuidedTour';
import { AnimationProvider } from '../../components/animations/AnimationContext';
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
        <header data-testid="motion-header" {...props}>{children}</header>
    },
    AnimatePresence: ({ children, mode }: { children: React.ReactNode; mode?: string }) => <>{children}</>,
    useAnimation: () => ({
      start: jest.fn().mockResolvedValue(null)
    })
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock announceToScreenReader
jest.mock('../../utils/accessibility', () => ({
  announceToScreenReader: jest.fn()
}));

// Mock useMediaQuery hook
jest.mock('../../hooks/useMediaQuery', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue(false) // Default to desktop view
}));

// Wrapper component with all required providers
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AccessibilityProvider>
      <AnimationProvider>
        <PersonaProvider>
          {children}
        </PersonaProvider>
      </AnimationProvider>
    </AccessibilityProvider>
  );
}

describe('User Journey Components', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Reset localStorage
    window.localStorage.clear();
    
    // Reset document body
    document.body.innerHTML = '';
  });
  
  describe('PersonaContext', () => {
    // Test component that uses the persona context
    const TestComponent = () => {
      const { persona, setPersona } = usePersona();
      const isPersonaSet = persona !== 'general';
      
      return (
        <div>
          <div data-testid="current-persona">{persona === 'general' ? 'none' : persona}</div>
          <div data-testid="has-persona">{isPersonaSet.toString()}</div>
          <button onClick={() => setPersona('business-stakeholder')}>Set Business</button>
          <button onClick={() => setPersona('engineering-leader')}>Set Engineering</button>
          <button onClick={() => setPersona('technical-developer')}>Set Developer</button>
          <button onClick={() => setPersona('general')}>Clear Persona</button>
        </div>
      );
    };
    
    test('provides persona context with default values', () => {
      render(
        <PersonaProvider>
          <TestComponent />
        </PersonaProvider>
      );
      
      expect(screen.getByTestId('current-persona')).toHaveTextContent('none');
      expect(screen.getByTestId('has-persona')).toHaveTextContent('false');
    });
    
    test('updates persona when set', () => {
      render(
        <PersonaProvider>
          <TestComponent />
        </PersonaProvider>
      );
      
      // Set persona to business stakeholder
      fireEvent.click(screen.getByText('Set Business'));
      
      expect(screen.getByTestId('current-persona')).toHaveTextContent('business-stakeholder');
      expect(screen.getByTestId('has-persona')).toHaveTextContent('true');
      
      // Change persona to engineering leader
      fireEvent.click(screen.getByText('Set Engineering'));
      
      expect(screen.getByTestId('current-persona')).toHaveTextContent('engineering-leader');
      expect(screen.getByTestId('has-persona')).toHaveTextContent('true');
      
      // Clear persona
      fireEvent.click(screen.getByText('Clear Persona'));
      
      expect(screen.getByTestId('current-persona')).toHaveTextContent('none');
      expect(screen.getByTestId('has-persona')).toHaveTextContent('false');
    });
    
    test('saves persona to localStorage', () => {
      render(
        <PersonaProvider>
          <TestComponent />
        </PersonaProvider>
      );
      
      // Set persona
      fireEvent.click(screen.getByText('Set Developer'));
      
      // Check localStorage
      expect(localStorage.getItem('userPersona')).toBe('technical-developer');
    });
    
    test('loads persona from localStorage', () => {
      // Set value in localStorage
      localStorage.setItem('userPersona', 'engineering-leader');
      
      render(
        <PersonaProvider>
          <TestComponent />
        </PersonaProvider>
      );
      
      // Should load from localStorage
      expect(screen.getByTestId('current-persona')).toHaveTextContent('engineering-leader');
      expect(screen.getByTestId('has-persona')).toHaveTextContent('true');
    });
  });
  
  describe('PersonaContent', () => {
    test('renders content for business stakeholder persona', () => {
      render(
        <TestWrapper>
          <PersonaProvider initialPersona="business-stakeholder">
            <PersonaContent
              businessStakeholder={<div>Business content</div>}
              engineeringLeader={<div>Engineering content</div>}
              technicalDeveloper={<div>Developer content</div>}
              general={<div>General content</div>}
            />
          </PersonaProvider>
        </TestWrapper>
      );
      
      expect(screen.getByText('Business content')).toBeInTheDocument();
      expect(screen.queryByText('Engineering content')).not.toBeInTheDocument();
      expect(screen.queryByText('Developer content')).not.toBeInTheDocument();
      expect(screen.queryByText('General content')).not.toBeInTheDocument();
    });
    
    test('renders content for engineering leader persona', () => {
      render(
        <TestWrapper>
          <PersonaProvider initialPersona="engineering-leader">
            <PersonaContent
              businessStakeholder={<div>Business content</div>}
              engineeringLeader={<div>Engineering content</div>}
              technicalDeveloper={<div>Developer content</div>}
              general={<div>General content</div>}
            />
          </PersonaProvider>
        </TestWrapper>
      );
      
      expect(screen.queryByText('Business content')).not.toBeInTheDocument();
      expect(screen.getByText('Engineering content')).toBeInTheDocument();
      expect(screen.queryByText('Developer content')).not.toBeInTheDocument();
      expect(screen.queryByText('General content')).not.toBeInTheDocument();
    });
    
    test('renders content for technical developer persona', () => {
      render(
        <TestWrapper>
          <PersonaProvider initialPersona="technical-developer">
            <PersonaContent
              businessStakeholder={<div>Business content</div>}
              engineeringLeader={<div>Engineering content</div>}
              technicalDeveloper={<div>Developer content</div>}
              general={<div>General content</div>}
            />
          </PersonaProvider>
        </TestWrapper>
      );
      
      expect(screen.queryByText('Business content')).not.toBeInTheDocument();
      expect(screen.queryByText('Engineering content')).not.toBeInTheDocument();
      expect(screen.getByText('Developer content')).toBeInTheDocument();
      expect(screen.queryByText('General content')).not.toBeInTheDocument();
    });
    
    test('renders general content when no persona is set', () => {
      render(
        <TestWrapper>
          <PersonaProvider initialPersona="general">
            <PersonaContent
              businessStakeholder={<div>Business content</div>}
              engineeringLeader={<div>Engineering content</div>}
              technicalDeveloper={<div>Developer content</div>}
              general={<div>General content</div>}
            />
          </PersonaProvider>
        </TestWrapper>
      );
      
      expect(screen.queryByText('Business content')).not.toBeInTheDocument();
      expect(screen.queryByText('Engineering content')).not.toBeInTheDocument();
      expect(screen.queryByText('Developer content')).not.toBeInTheDocument();
      expect(screen.getByText('General content')).toBeInTheDocument();
    });
    
    test('renders nothing when no content is provided for the current persona', () => {
      render(
        <TestWrapper>
          <PersonaProvider initialPersona="business-stakeholder">
            <PersonaContent
              engineeringLeader={<div>Engineering content</div>}
              technicalDeveloper={<div>Developer content</div>}
            />
          </PersonaProvider>
        </TestWrapper>
      );
      
      expect(screen.queryByText('Engineering content')).not.toBeInTheDocument();
      expect(screen.queryByText('Developer content')).not.toBeInTheDocument();
    });
  });
  
  describe('ContextualCTA', () => {
    test('renders CTA with default text', () => {
      render(
        <TestWrapper>
          <ContextualCTA
            title="Sign Up Now"
            actions={[
              { label: "Sign Up Now", href: "/signup", isPrimary: true }
            ]}
          />
        </TestWrapper>
      );
      
      const cta = screen.getByRole('link');
      expect(cta).toHaveAttribute('href', '/signup');
      expect(cta).toHaveTextContent('Sign Up Now');
    });
    
    test('renders persona-specific CTA text', () => {
      render(
        <TestWrapper>
          <PersonaProvider initialPersona="business-stakeholder">
            <ContextualCTA
              title="Sign Up Now"
              actions={[
                {
                  label: "Sign Up Now",
                  href: "/signup",
                  isPrimary: true
                }
              ]}
              relevantPersonas="business-stakeholder"
            />
          </PersonaProvider>
        </TestWrapper>
      );
      
      expect(screen.getByRole('link')).toHaveTextContent('Get Business Value');
    });
    
    test('applies custom styles and classes', () => {
      render(
        <TestWrapper>
          <ContextualCTA
            title="Sign Up Now"
            actions={[
              {
                label: "Sign Up Now",
                href: "/signup",
                isPrimary: true
              }
            ]}
            className="custom-cta"
            variant="primary"
          />
        </TestWrapper>
      );
      
      expect(screen.getByRole('link')).toHaveClass('custom-cta');
    });
  });
  
  describe('ProgressiveDisclosure', () => {
    test('renders summary content by default', () => {
      render(
        <TestWrapper>
          <ProgressiveDisclosure
            title="Summary content"
          >
            <div>Detailed content</div>
          </ProgressiveDisclosure>
        </TestWrapper>
      );
      
      expect(screen.getByText('Summary content')).toBeInTheDocument();
      expect(screen.queryByText('Detailed content')).not.toBeInTheDocument();
      expect(screen.getByText('Show more')).toBeInTheDocument();
    });
    
    test('expands to show details when clicked', () => {
      render(
        <TestWrapper>
          <ProgressiveDisclosure
            title={<div>Summary content</div>}
          >
            <div>Detailed content</div>
          </ProgressiveDisclosure>
        </TestWrapper>
      );
      
      // Click to expand
      fireEvent.click(screen.getByText('Show more'));
      
      expect(screen.getByText('Summary content')).toBeInTheDocument();
      expect(screen.getByText('Detailed content')).toBeInTheDocument();
      expect(screen.getByText('Show less')).toBeInTheDocument();
      
      // Click to collapse
      fireEvent.click(screen.getByText('Show less'));
      
      expect(screen.getByText('Summary content')).toBeInTheDocument();
      expect(screen.queryByText('Detailed content')).not.toBeInTheDocument();
      expect(screen.getByText('Show more')).toBeInTheDocument();
    });
    
    test('shows more details for technical personas by default', () => {
      render(
        <TestWrapper>
          <PersonaProvider initialPersona="technical-developer">
            <ProgressiveDisclosure
              title={<div>Summary content</div>}
              defaultExpanded={false}
              expandForPersonas={["technical-developer"]}
            >
              <div>Detailed content</div>
            </ProgressiveDisclosure>
          </PersonaProvider>
        </TestWrapper>
      );
      
      // Should be expanded by default for technical personas
      expect(screen.getByText('Summary content')).toBeInTheDocument();
      expect(screen.getByText('Detailed content')).toBeInTheDocument();
      expect(screen.getByText('Show less')).toBeInTheDocument();
    });
  });
  
  describe('MobileNavigation', () => {
    // Mock useMediaQuery to simulate mobile view
    beforeEach(() => {
      const useMediaQueryMock = require('../../hooks/useMediaQuery').default;
      useMediaQueryMock.mockReturnValue(true); // Simulate mobile view
    });
    
    test('renders mobile navigation', () => {
      render(
        <TestWrapper>
          <MobileNavigation
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: 'About', href: '/about' }
            ]}
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });
    
    test('highlights active item', () => {
      render(
        <TestWrapper>
          <MobileNavigation
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products', isActive: true },
              { label: 'About', href: '/about' }
            ]}
          />
        </TestWrapper>
      );
      
      // The Products item should have an active class or indicator
      const productsItem = screen.getByText('Products').closest('a');
      expect(productsItem).toHaveAttribute('aria-current', 'page');
    });
  });
  
  describe('GuidedTour', () => {
    const mockSteps = [
      { target: '#step1', content: 'This is step 1', title: 'Step 1' },
      { target: '#step2', content: 'This is step 2', title: 'Step 2' }
    ];
    
    beforeEach(() => {
      // Add target elements to the DOM
      document.body.innerHTML = `
        <div id="step1">Step 1 Target</div>
        <div id="step2">Step 2 Target</div>
      `;
    });
    
    test('renders guided tour', () => {
      render(
        <TestWrapper>
          <GuidedTour
            steps={mockSteps}
            isActive={true}
            tourId="test-tour"
            onClose={() => {}}
          />
        </TestWrapper>
      );
      
      // Should show the first step
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('This is step 1')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });
    
    test('navigates through tour steps', () => {
      const onCloseMock = jest.fn();
      
      render(
        <TestWrapper>
          <GuidedTour
            steps={mockSteps}
            isActive={true}
            tourId="test-tour"
            onClose={onCloseMock}
          />
        </TestWrapper>
      );
      
      // Initially on first step
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      
      // Navigate to next step
      fireEvent.click(screen.getByText('Next'));
      
      // Should show second step
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('This is step 2')).toBeInTheDocument();
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Finish')).toBeInTheDocument();
      
      // Finish the tour
      fireEvent.click(screen.getByText('Finish'));
      
      // Should call onClose
      expect(onCloseMock).toHaveBeenCalled();
    });
    
    test('skips tour when skip button is clicked', () => {
      const onCloseMock = jest.fn();
      
      render(
        <TestWrapper>
          <GuidedTour
            steps={mockSteps}
            isActive={true}
            tourId="test-tour"
            onClose={onCloseMock}
          />
        </TestWrapper>
      );
      
      // Skip the tour
      fireEvent.click(screen.getByText('Skip'));
      
      // Should call onClose
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});