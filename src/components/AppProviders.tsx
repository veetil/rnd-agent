import { ReactNode } from 'react';
import { AnimationProvider } from './animations/AnimationContext';
import { AccessibilityProvider } from './accessibility/AccessibilityContext';
import { PersonaProvider } from './user-journey/PersonaContext';
import { ResponsiveProvider } from './responsive/ResponsiveContext';

interface AppProvidersProps {
  children: ReactNode;
  /** Initial animation settings */
  initialAnimationSettings?: {
    animationsEnabled?: boolean;
    animationSpeed?: number;
  };
  /** Initial accessibility settings */
  initialAccessibilitySettings?: {
    highContrast?: boolean;
    fontSizeMultiplier?: number;
    focusIndicatorsVisible?: boolean;
  };
  /** Initial persona */
  initialPersona?: any; // Using 'any' here to avoid circular dependency with UserPersona type
}

/**
 * Combined provider component that includes all context providers
 * This is the recommended way to integrate all Phase 2 components
 */
export function AppProviders({
  children,
  initialAnimationSettings,
  initialAccessibilitySettings,
  initialPersona
}: AppProvidersProps) {
  return (
    <AccessibilityProvider initialSettings={initialAccessibilitySettings}>
      <AnimationProvider initialSettings={initialAnimationSettings}>
        <ResponsiveProvider>
          <PersonaProvider initialPersona={initialPersona}>
            {children}
          </PersonaProvider>
        </ResponsiveProvider>
      </AnimationProvider>
    </AccessibilityProvider>
  );
}

// Export from index.ts
export default AppProviders;