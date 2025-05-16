import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimationContextType {
  /** Whether animations are enabled globally */
  animationsEnabled: boolean;
  /** Whether to use reduced motion (respects user preferences) */
  reducedMotion: boolean;
  /** Global animation speed multiplier (1 is normal speed) */
  animationSpeed: number;
  /** Toggle animations on/off */
  toggleAnimations: () => void;
  /** Set animation speed */
  setAnimationSpeed: (speed: number) => void;
}

const defaultContext: AnimationContextType = {
  animationsEnabled: true,
  reducedMotion: false,
  animationSpeed: 1,
  toggleAnimations: () => {},
  setAnimationSpeed: () => {},
};

const AnimationContext = createContext<AnimationContextType>(defaultContext);

/**
 * Hook to access animation context
 */
export const useAnimation = () => useContext(AnimationContext);

interface AnimationProviderProps {
  children: ReactNode;
  /** Initial animation settings */
  initialSettings?: {
    animationsEnabled?: boolean;
    animationSpeed?: number;
  };
}

/**
 * Provider component for animation settings
 * Manages global animation state and respects user preferences
 */
export function AnimationProvider({
  children,
  initialSettings = {},
}: AnimationProviderProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const [animationsEnabled, setAnimationsEnabled] = useState(
    initialSettings.animationsEnabled ?? true
  );
  
  const [animationSpeed, setAnimationSpeed] = useState(
    initialSettings.animationSpeed ?? 1
  );

  // Effect to check for stored preferences in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAnimationsEnabled = localStorage.getItem('animationsEnabled');
      const storedAnimationSpeed = localStorage.getItem('animationSpeed');
      
      if (storedAnimationsEnabled !== null) {
        setAnimationsEnabled(storedAnimationsEnabled === 'true');
      }
      
      if (storedAnimationSpeed !== null) {
        setAnimationSpeed(parseFloat(storedAnimationSpeed));
      }
    }
  }, []);

  // Effect to store preferences in localStorage when they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('animationsEnabled', String(animationsEnabled));
      localStorage.setItem('animationSpeed', String(animationSpeed));
    }
  }, [animationsEnabled, animationSpeed]);

  const toggleAnimations = () => {
    setAnimationsEnabled(prev => !prev);
  };

  const handleSetAnimationSpeed = (speed: number) => {
    // Ensure speed is between 0.1 and 2
    const clampedSpeed = Math.max(0.1, Math.min(2, speed));
    setAnimationSpeed(clampedSpeed);
  };

  const value = {
    animationsEnabled,
    reducedMotion: prefersReducedMotion,
    animationSpeed,
    toggleAnimations,
    setAnimationSpeed: handleSetAnimationSpeed,
  };

  // Create a wrapper element with data attributes for testing
  const wrappedChildren = (
    <div
      data-animation-wrapper="true"
      data-animations-enabled={animationsEnabled.toString()}
      data-animation-speed={animationSpeed}
      data-reduced-motion={prefersReducedMotion.toString()}
      style={{
        display: 'contents', // This makes the div not affect layout
      }}
    >
      {children}
    </div>
  );

  return (
    <AnimationContext.Provider value={value}>
      {wrappedChildren}
    </AnimationContext.Provider>
  );
}