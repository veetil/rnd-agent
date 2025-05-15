// Main provider component
export { AppProviders } from './AppProviders';

// Animation components
export { AnimationProvider, useAnimation } from './animations/AnimationContext';
export { MicroInteraction } from './animations/MicroInteraction';
export { PageTransition, AppRouterPageTransition } from './animations/PageTransition';
export { LoadingAnimation } from './animations/LoadingAnimation';

// Accessibility components
export { AccessibilityProvider, useAccessibility } from './accessibility/AccessibilityContext';

// User journey components
export {
  PersonaProvider,
  usePersona,
  PersonaContent,
  ProgressiveDisclosure
} from './user-journey/PersonaContext';

// Responsive components
export {
  ResponsiveProvider,
  useResponsive,
  ResponsiveRender,
  BreakpointVisibility,
  ResponsiveContainer
} from './responsive/ResponsiveContext';

// Hooks
export { useReducedMotion } from '../hooks/useReducedMotion';
export { 
  useMediaQuery,
  useBreakpoint,
  useCurrentBreakpoint,
  useMobileDetect,
  useHoverCapability,
  usePortraitOrientation,
  useViewportSize,
  breakpoints
} from '../hooks/useMediaQuery';

// Utilities
export {
  focusFirstElement,
  trapFocus,
  createKeyboardNavigation,
  announceToScreenReader,
  checkReducedMotion,
  getDisclosureAttributes,
  getTabAttributes,
  getTabPanelAttributes
} from '../utils/accessibility';

export type { UserPersona, PersonaTraits } from '../utils/persona';
export {
  personaTraits,
  detectPersonaFromReferrer,
  detectPersonaFromPath,
  refinePersonaFromBehavior,
  getContentPriorityForPersona,
  savePersona,
  loadPersona,
  setPersonaCookie,
  getPersonaCookie
} from '../utils/persona';

// Examples
export { ExampleComponent } from './examples/ExampleComponent';