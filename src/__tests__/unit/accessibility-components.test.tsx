import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AccessibilityProvider, useAccessibility } from '../../components/accessibility/AccessibilityContext';

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

describe('Accessibility Components', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Reset localStorage
    window.localStorage.clear();
    
    // Reset document body
    document.body.innerHTML = '';
    
    // Reset document classes
    document.documentElement.className = '';
    document.documentElement.style.cssText = '';
  });
  
  describe('AccessibilityProvider', () => {
    test('provides accessibility context with default values', () => {
      const TestComponent = () => {
        const { 
          highContrast, 
          reducedMotion, 
          fontSizeMultiplier, 
          focusIndicatorsVisible, 
          toggleHighContrast 
        } = useAccessibility();
        
        return (
          <div>
            <div data-testid="high-contrast">{highContrast.toString()}</div>
            <div data-testid="reduced-motion">{reducedMotion.toString()}</div>
            <div data-testid="font-size-multiplier">{fontSizeMultiplier}</div>
            <div data-testid="focus-indicators-visible">{focusIndicatorsVisible.toString()}</div>
            <button onClick={toggleHighContrast}>Toggle High Contrast</button>
          </div>
        );
      };
      
      render(
        <AccessibilityProvider>
          <TestComponent />
        </AccessibilityProvider>
      );
      
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('false');
      expect(screen.getByTestId('reduced-motion')).toHaveTextContent('false');
      expect(screen.getByTestId('font-size-multiplier')).toHaveTextContent('1');
      expect(screen.getByTestId('focus-indicators-visible')).toHaveTextContent('true');
      
      // Test toggling high contrast
      fireEvent.click(screen.getByText('Toggle High Contrast'));
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
      
      // Check if the high-contrast class was added to the document
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
    });
    
    test('initializes with provided settings', () => {
      const TestComponent = () => {
        const { highContrast, fontSizeMultiplier, focusIndicatorsVisible } = useAccessibility();
        return (
          <div>
            <div data-testid="high-contrast">{highContrast.toString()}</div>
            <div data-testid="font-size-multiplier">{fontSizeMultiplier}</div>
            <div data-testid="focus-indicators-visible">{focusIndicatorsVisible.toString()}</div>
          </div>
        );
      };
      
      render(
        <AccessibilityProvider 
          initialSettings={{ 
            highContrast: true, 
            fontSizeMultiplier: 1.5, 
            focusIndicatorsVisible: false 
          }}
        >
          <TestComponent />
        </AccessibilityProvider>
      );
      
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
      expect(screen.getByTestId('font-size-multiplier')).toHaveTextContent('1.5');
      expect(screen.getByTestId('focus-indicators-visible')).toHaveTextContent('false');
      
      // Check if the high-contrast class was added to the document
      expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
      
      // Check if the hide-focus-indicators class was added to the document
      expect(document.documentElement.classList.contains('hide-focus-indicators')).toBe(true);
      
      // Check if the font-size-multiplier CSS variable was set
      expect(document.documentElement.style.getPropertyValue('--font-size-multiplier')).toBe('1.5');
    });
    
    test('loads settings from localStorage', () => {
      // Set values in localStorage
      localStorage.setItem('highContrast', 'true');
      localStorage.setItem('fontSizeMultiplier', '1.2');
      localStorage.setItem('focusIndicatorsVisible', 'false');
      
      const TestComponent = () => {
        const { highContrast, fontSizeMultiplier, focusIndicatorsVisible } = useAccessibility();
        return (
          <div>
            <div data-testid="high-contrast">{highContrast.toString()}</div>
            <div data-testid="font-size-multiplier">{fontSizeMultiplier}</div>
            <div data-testid="focus-indicators-visible">{focusIndicatorsVisible.toString()}</div>
          </div>
        );
      };
      
      render(
        <AccessibilityProvider>
          <TestComponent />
        </AccessibilityProvider>
      );
      
      expect(screen.getByTestId('high-contrast')).toHaveTextContent('true');
      expect(screen.getByTestId('font-size-multiplier')).toHaveTextContent('1.2');
      expect(screen.getByTestId('focus-indicators-visible')).toHaveTextContent('false');
    });
    
    test('saves settings to localStorage when changed', () => {
      const TestComponent = () => {
        const { 
          toggleHighContrast, 
          setFontSizeMultiplier, 
          toggleFocusIndicators 
        } = useAccessibility();
        
        return (
          <div>
            <button onClick={toggleHighContrast}>Toggle High Contrast</button>
            <button onClick={() => setFontSizeMultiplier(1.5)}>Increase Font Size</button>
            <button onClick={toggleFocusIndicators}>Toggle Focus Indicators</button>
          </div>
        );
      };
      
      render(
        <AccessibilityProvider>
          <TestComponent />
        </AccessibilityProvider>
      );
      
      // Initially, localStorage should be empty or have default values
      expect(localStorage.getItem('highContrast')).toBe('false');
      
      // Toggle high contrast
      fireEvent.click(screen.getByText('Toggle High Contrast'));
      expect(localStorage.getItem('highContrast')).toBe('true');
      
      // Increase font size
      fireEvent.click(screen.getByText('Increase Font Size'));
      expect(localStorage.getItem('fontSizeMultiplier')).toBe('1.5');
      
      // Toggle focus indicators
      fireEvent.click(screen.getByText('Toggle Focus Indicators'));
      expect(localStorage.getItem('focusIndicatorsVisible')).toBe('false');
    });
    
    test('clamps font size multiplier to valid range', () => {
      const TestComponent = () => {
        const { fontSizeMultiplier, setFontSizeMultiplier } = useAccessibility();
        return (
          <div>
            <div data-testid="font-size-multiplier">{fontSizeMultiplier}</div>
            <button onClick={() => setFontSizeMultiplier(0.5)}>Too Small</button>
            <button onClick={() => setFontSizeMultiplier(2.5)}>Too Large</button>
          </div>
        );
      };
      
      render(
        <AccessibilityProvider>
          <TestComponent />
        </AccessibilityProvider>
      );
      
      // Try to set font size too small
      fireEvent.click(screen.getByText('Too Small'));
      expect(screen.getByTestId('font-size-multiplier')).toHaveTextContent('0.8'); // Should be clamped to 0.8
      
      // Try to set font size too large
      fireEvent.click(screen.getByText('Too Large'));
      expect(screen.getByTestId('font-size-multiplier')).toHaveTextContent('2'); // Should be clamped to 2
    });
    
    test('announces messages to screen readers', () => {
      const TestComponent = () => {
        const { announceToScreenReader } = useAccessibility();
        return (
          <div>
            <button onClick={() => announceToScreenReader('Polite announcement')}>
              Announce Polite
            </button>
            <button onClick={() => announceToScreenReader('Assertive announcement', true)}>
              Announce Assertive
            </button>
          </div>
        );
      };
      
      render(
        <AccessibilityProvider>
          <TestComponent />
        </AccessibilityProvider>
      );
      
      // Announce polite message
      fireEvent.click(screen.getByText('Announce Polite'));
      
      // Check if the polite live region was created
      const politeRegion = document.getElementById('a11y-polite-announcer');
      expect(politeRegion).not.toBeNull();
      expect(politeRegion?.getAttribute('aria-live')).toBe('polite');
      
      // Announce assertive message
      fireEvent.click(screen.getByText('Announce Assertive'));
      
      // Check if the assertive live region was created
      const assertiveRegion = document.getElementById('a11y-assertive-announcer');
      expect(assertiveRegion).not.toBeNull();
      expect(assertiveRegion?.getAttribute('aria-live')).toBe('assertive');
    });
    
    test('applies reduced motion preference from system', () => {
      // Mock matchMedia to simulate a user with reduced motion preference
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }));
      
      const TestComponent = () => {
        const { reducedMotion } = useAccessibility();
        return (
          <div>
            <div data-testid="reduced-motion">{reducedMotion.toString()}</div>
          </div>
        );
      };
      
      render(
        <AccessibilityProvider>
          <TestComponent />
        </AccessibilityProvider>
      );
      
      expect(screen.getByTestId('reduced-motion')).toHaveTextContent('true');
    });
  });
});