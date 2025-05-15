/**
 * Animation Components
 *
 * This module exports components for animations and transitions
 */

// Export AnimationContext
export {
  AnimationProvider,
  useAnimation
} from './AnimationContext';

// Export ScrollAnimation components
export {
  ScrollAnimation,
  StaggeredScrollAnimation,
  ParallaxScrollAnimation
} from './ScrollAnimation';

// Export MicroInteraction components
export {
  MicroInteraction,
  AnimatedButton,
  AnimatedIcon
} from './MicroInteraction';

// Export PageTransition components
export {
  PageTransition,
  SectionTransition,
  AppRouterPageTransition
} from './PageTransition';

// Export LoadingAnimation components
export {
  LoadingAnimation,
  ContentPlaceholder,
  Skeleton
} from './LoadingAnimation';

// Export types
export type {
  ScrollAnimationType,
  ScrollAnimationProps,
  StaggeredScrollAnimationProps,
  ParallaxScrollAnimationProps
} from './ScrollAnimation';

export type {
  MicroInteractionType,
  MicroInteractionProps,
  AnimatedButtonProps,
  AnimatedIconProps
} from './MicroInteraction';

export type {
  TransitionType,
  PageTransitionProps,
  SectionTransitionProps,
  AppRouterPageTransitionProps
} from './PageTransition';

export type {
  LoadingAnimationType,
  LoadingAnimationProps,
  ContentPlaceholderProps,
  SkeletonProps
} from './LoadingAnimation';