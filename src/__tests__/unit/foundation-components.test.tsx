import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useAnimation, AnimationProvider } from '../../components/animations/AnimationContext';
import { useAccessibility, AccessibilityProvider } from '../../components/accessibility/AccessibilityContext';
import { usePersona, PersonaProvider } from '../../components/user-journey/PersonaContext';
import { useResponsive, ResponsiveProvider } from '../../components/responsive/ResponsiveContext';
import { AppProviders } from '../../components/AppProviders';

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
      ),
      button: ({ children, ...props }: any) => (
        <button data-testid="motion-button" {...props}>
          {children}
        </button>
      )
    },
    AnimatePresence: ({ children }: any) => (
      <div data-testid="animate-presence">{children}</div>
    )
  };
});

describe('Foundation Components', () => {
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
  
  describe('AnimationContext', () => {
    test('provides animation settings and allows toggling animations', () => {
      const TestComponent = () => {
        const { animationsEnabled, toggleAnimations, animationSpeed, setAnimationSpeed } = useAnimation();
        
        return (
          <div>
            <div data-testid="animations-status">{animationsEnabled ? 'enabled' : 'disabled'}</div>
            <div data-testid="animation-speed">{animationSpeed}</div>
            <button onClick={() => toggleAnimations()}>Toggle Animations</button>
            <button onClick={() => setAnimationSpeed(2)}>Set Speed to 2x</button>
          </div>
        );
      };
      
      render(
        <AnimationProvider>
          <TestComponent />
        </AnimationProvider>
      );
      
      // Check default values
      expect(screen.getByTestId('animations-status')).toHaveTextContent('enabled');
      expect(screen.getByTestId('animation-speed')).toHaveTextContent('1');
      
      // Toggle animations
      fireEvent.click(screen.getByText('Toggle Animations'));
      expect(screen.getByTestId('animations-status')).toHaveTextContent('disabled');
      
      // Change animation speed
      fireEvent.click(screen.getByText('Set Speed to 2x'));
      expect(screen.getByTestId('animation-speed')).toHaveTextContent('2');
    });
  });
  
  describe('AccessibilityContext', () => {
    test('provides accessibility settings and allows toggling high contrast', () => {
      const TestComponent = () => {
        const { highContrast, toggleHighContrast, fontSizeMultiplier, setFontSizeMultiplier } = useAccessibility();
        
        // Create helper functions for increasing/decreasing font size
        const increaseFontSize = () => setFontSizeMultiplier(fontSizeMultiplier + 0.1);
        const decreaseFontSize = () => setFontSizeMultiplier(fontSizeMultiplier - 0.1);
        
        return (
          <div>
            <div data-testid="contrast-status">{highContrast ? 'high' : 'normal'}</div>
            <div data-testid="font-size">{fontSizeMultiplier}</div>
            <button onClick={() => toggleHighContrast()}>Toggle Contrast</button>
            <button onClick={() => increaseFontSize()}>Increase Font</button>
            <button onClick={() => decreaseFontSize()}>Decrease Font</button>
          </div>
        );
      };
      
      render(
        <AccessibilityProvider>
          <TestComponent />
        </AccessibilityProvider>
      );
      
      // Check default values
      expect(screen.getByTestId('contrast-status')).toHaveTextContent('normal');
      expect(screen.getByTestId('font-size')).toHaveTextContent('1');
      
      // Toggle high contrast
      fireEvent.click(screen.getByText('Toggle Contrast'));
      expect(screen.getByTestId('contrast-status')).toHaveTextContent('high');
      
      // Increase font size
      fireEvent.click(screen.getByText('Increase Font'));
      expect(screen.getByTestId('font-size')).toHaveTextContent('1.1');
      
      // Decrease font size
      fireEvent.click(screen.getByText('Decrease Font'));
      expect(screen.getByTestId('font-size')).toHaveTextContent('1');
    });
  });
  
  describe('PersonaContext', () => {
    test('provides persona settings and allows changing persona', () => {
      const TestComponent = () => {
        const { persona, setPersona } = usePersona();
        
        return (
          <div>
            <div data-testid="current-persona">{persona || 'none'}</div>
            <button onClick={() => setPersona('technical-developer')}>Set Developer</button>
            <button onClick={() => setPersona('business-stakeholder')}>Set Business</button>
            <button onClick={() => setPersona('engineering-leader')}>Set Leader</button>
          </div>
        );
      };
      
      render(
        <PersonaProvider>
          <TestComponent />
        </PersonaProvider>
      );
      
      // Check default value
      expect(screen.getByTestId('current-persona')).toHaveTextContent('none');
      
      // Change persona
      fireEvent.click(screen.getByText('Set Developer'));
      expect(screen.getByTestId('current-persona')).toHaveTextContent('developer');
      
      // Change to another persona
      fireEvent.click(screen.getByText('Set Business'));
      expect(screen.getByTestId('current-persona')).toHaveTextContent('business');
    });
  });
  
  describe('ResponsiveContext', () => {
    test('provides responsive settings based on screen size', () => {
      // Mock matchMedia to simulate different screen sizes
      const mockMatchMedia = (matches: boolean) => {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation(() => ({
            matches,
            media: '',
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });
      };
      
      const TestComponent = () => {
        const { isMobile, isMdUp, isLgUp } = useResponsive();
        
        return (
          <div>
            <div data-testid="is-mobile">{isMobile ? 'true' : 'false'}</div>
            <div data-testid="is-tablet">{isMdUp ? 'true' : 'false'}</div>
            <div data-testid="is-desktop">{isLgUp ? 'true' : 'false'}</div>
          </div>
        );
      };
      
      // Test mobile view
      mockMatchMedia(true);
      
      const { rerender, unmount } = render(
        <ResponsiveProvider>
          <TestComponent />
        </ResponsiveProvider>
      );
      
      expect(screen.getByTestId('is-mobile')).toHaveTextContent('true');
      
      // Cleanup and test desktop view
      unmount();
      mockMatchMedia(false);
      
      rerender(
        <ResponsiveProvider>
          <TestComponent />
        </ResponsiveProvider>
      );
      
      expect(screen.getByTestId('is-mobile')).toHaveTextContent('false');
    });
  });
  
  describe('AppProviders', () => {
    test('combines all foundation providers', () => {
      const TestComponent = () => {
        const { animationsEnabled } = useAnimation();
        const { highContrast } = useAccessibility();
        const { persona } = usePersona();
        const { isMobile } = useResponsive();
        
        return (
          <div>
            <div data-testid="animations-enabled">{animationsEnabled ? 'true' : 'false'}</div>
            <div data-testid="high-contrast">{highContrast ? 'true' : 'false'}</div>
            <div data-testid="persona">{persona || 'none'}</div>
            <div data-testid="is-mobile">{isMobile ? 'true' : 'false'}</div>
          </div>
        );
      };
      
      render(
        <AppProviders>
          <TestComponent />
        </AppProviders>
      );
      
      // Check that all contexts are provided
      expect(screen.getByTestId('animations-enabled')).toBeInTheDocument();
      expect(screen.getByTestId('high-contrast')).toBeInTheDocument();
      expect(screen.getByTestId('persona')).toBeInTheDocument();
      expect(screen.getByTestId('is-mobile')).toBeInTheDocument();
    });
  });
});