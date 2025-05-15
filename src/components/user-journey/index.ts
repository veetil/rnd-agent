// Export all user journey components

// Persona Context
export {
  PersonaProvider,
  usePersona,
  PersonaContent,
  ProgressiveDisclosure,
  type Persona
} from './PersonaContext';

// Contextual CTA
export {
  ContextualCTA,
  type CTAPosition,
  type CTATrigger,
  type CTAVariant,
  type CTAAction
} from './ContextualCTA';

// Guided Tour
export {
  GuidedTour,
  TourButton,
  type TourStep,
  type TourStepPosition,
  type GuidedTourProps,
  type TourButtonProps
} from './GuidedTour';

// Mobile Navigation
export {
  MobileNavigation,
  CompactHeader,
  type NavigationItem,
  type MobileNavigationProps,
  type CompactHeaderProps
} from './MobileNavigation';