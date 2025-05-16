import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AccessibilityContextType {
  /** Whether high contrast mode is enabled */
  highContrast: boolean;
  /** Whether reduced motion is preferred */
  reducedMotion: boolean;
  /** Current font size multiplier (1 is normal) */
  fontSizeMultiplier: number;
  /** Whether focus indicators should be visible */
  focusIndicatorsVisible: boolean;
  /** Toggle high contrast mode */
  toggleHighContrast: () => void;
  /** Set font size multiplier */
  setFontSizeMultiplier: (size: number) => void;
  /** Toggle focus indicators visibility */
  toggleFocusIndicators: () => void;
  /** Announce a message to screen readers */
  announceToScreenReader: (message: string, assertive?: boolean) => void;
}

const defaultContext: AccessibilityContextType = {
  highContrast: false,
  reducedMotion: false,
  fontSizeMultiplier: 1,
  focusIndicatorsVisible: true,
  toggleHighContrast: () => {},
  setFontSizeMultiplier: () => {},
  toggleFocusIndicators: () => {},
  announceToScreenReader: () => {},
};

const AccessibilityContext = createContext<AccessibilityContextType>(defaultContext);

/**
 * Hook to access accessibility context
 */
export const useAccessibility = () => useContext(AccessibilityContext);

interface AccessibilityProviderProps {
  children: ReactNode;
  /** Initial accessibility settings */
  initialSettings?: {
    highContrast?: boolean;
    fontSizeMultiplier?: number;
    focusIndicatorsVisible?: boolean;
  };
}

/**
 * Provider component for accessibility settings
 * Manages global accessibility state and preferences
 */
export function AccessibilityProvider({
  children,
  initialSettings = {},
}: AccessibilityProviderProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const [highContrast, setHighContrast] = useState(
    initialSettings.highContrast ?? false
  );
  
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(
    initialSettings.fontSizeMultiplier ?? 1
  );
  
  const [focusIndicatorsVisible, setFocusIndicatorsVisible] = useState(
    initialSettings.focusIndicatorsVisible ?? true
  );

  // Effect to check for stored preferences in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHighContrast = localStorage.getItem('highContrast');
      const storedFontSizeMultiplier = localStorage.getItem('fontSizeMultiplier');
      const storedFocusIndicatorsVisible = localStorage.getItem('focusIndicatorsVisible');
      
      if (storedHighContrast !== null) {
        setHighContrast(storedHighContrast === 'true');
      }
      
      if (storedFontSizeMultiplier !== null) {
        setFontSizeMultiplier(parseFloat(storedFontSizeMultiplier));
      }
      
      if (storedFocusIndicatorsVisible !== null) {
        setFocusIndicatorsVisible(storedFocusIndicatorsVisible === 'true');
      }
    }
  }, []);

  // Effect to store preferences in localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('highContrast', String(highContrast));
      localStorage.setItem('fontSizeMultiplier', String(fontSizeMultiplier));
      localStorage.setItem('focusIndicatorsVisible', String(focusIndicatorsVisible));
    }
  }, [highContrast, fontSizeMultiplier, focusIndicatorsVisible]);

  // Effect to apply high contrast mode to the document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (highContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    }
  }, [highContrast]);

  // Effect to apply font size multiplier to the document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--font-size-multiplier', String(fontSizeMultiplier));
    }
  }, [fontSizeMultiplier]);

  // Effect to apply focus indicators visibility to the document
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (focusIndicatorsVisible) {
        document.documentElement.classList.remove('hide-focus-indicators');
      } else {
        document.documentElement.classList.add('hide-focus-indicators');
      }
    }
  }, [focusIndicatorsVisible]);

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const handleSetFontSizeMultiplier = (size: number) => {
    // Ensure size is between 0.8 and 2
    const clampedSize = Math.max(0.8, Math.min(2, size));
    setFontSizeMultiplier(clampedSize);
  };

  const toggleFocusIndicators = () => {
    setFocusIndicatorsVisible(prev => !prev);
  };

  /**
   * Announce a message to screen readers
   * @param message - The message to announce
   * @param assertive - Whether to use assertive (true) or polite (false) announcement
   */
  const announceToScreenReader = (message: string, assertive = false) => {
    if (typeof document !== 'undefined') {
      // Create or get the live region element
      let liveRegion = document.getElementById(
        assertive ? 'a11y-assertive-announcer' : 'a11y-polite-announcer'
      );
      
      if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = assertive ? 'a11y-assertive-announcer' : 'a11y-polite-announcer';
        liveRegion.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
      }
      
      // Clear the live region first (for some screen readers)
      liveRegion.textContent = '';
      
      // Set the message after a small delay
      setTimeout(() => {
        if (liveRegion) {
          liveRegion.textContent = message;
        }
      }, 50);
    }
  };

  const value = {
    highContrast,
    reducedMotion: prefersReducedMotion,
    fontSizeMultiplier,
    focusIndicatorsVisible,
    toggleHighContrast,
    setFontSizeMultiplier: handleSetFontSizeMultiplier,
    toggleFocusIndicators,
    announceToScreenReader,
  };

  // Create a wrapper element with data attributes for testing
  const wrappedChildren = (
    <div
      data-accessibility-wrapper="true"
      data-font-size-multiplier={fontSizeMultiplier}
      {...(highContrast && { 'data-high-contrast': 'true' })}
      {...(focusIndicatorsVisible === false && { 'data-focus-indicators-hidden': 'true' })}
      {...(prefersReducedMotion && { 'data-reduced-motion': 'true' })}
      {...(focusIndicatorsVisible === false && { 'data-screen-reader-enabled': 'true' })}
      style={{
        display: 'contents', // This makes the div not affect layout
      }}
    >
      {children}
    </div>
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {wrappedChildren}
      {/* Add global styles for accessibility */}
      {typeof document !== 'undefined' && (
        <style jsx global>{`
          :root {
            --font-size-multiplier: ${fontSizeMultiplier};
          }
          
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
          
          .high-contrast {
            --contrast-text: #000;
            --contrast-bg: #fff;
            --contrast-border: #000;
            color: var(--contrast-text);
            background-color: var(--contrast-bg);
          }
          
          .hide-focus-indicators *:focus {
            outline: none !important;
          }
        `}</style>
      )}
    </AccessibilityContext.Provider>
  );
}