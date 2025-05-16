import { ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useAnimation as useAnimationContext } from './AnimationContext';

export interface AppRouterPageTransitionProps {
  /** The children to render */
  children: ReactNode;
  /** The className to apply to the wrapper */
  className?: string;
  /** The animation type */
  type?: 'fade' | 'slide' | 'scale' | 'none';
  /** The animation duration in seconds */
  duration?: number;
  /** Whether to disable the animation */
  disabled?: boolean;
}

/**
 * Page transition component for App Router
 * Provides smooth transitions between pages
 */
export function AppRouterPageTransition({
  children,
  className = '',
  type = 'fade',
  duration = 0.3,
  disabled = false
}: AppRouterPageTransitionProps) {
  const { animationsEnabled, reducedMotion } = useAnimationContext();

  // If animations are disabled or reduced motion is preferred, render without animations
  if (!animationsEnabled || reducedMotion || disabled || type === 'none') {
    return <>{children}</>;
  }

  // Define variants based on animation type
  let variants: Variants;
  
  switch (type) {
    case 'slide':
      variants = {
        hidden: { x: 20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration } },
        exit: { x: -20, opacity: 0, transition: { duration } }
      };
      break;
    case 'scale':
      variants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration } },
        exit: { scale: 0.9, opacity: 0, transition: { duration } }
      };
      break;
    case 'fade':
    default:
      variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration } },
        exit: { opacity: 0, transition: { duration } }
      };
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page-transition"
        className={className}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}