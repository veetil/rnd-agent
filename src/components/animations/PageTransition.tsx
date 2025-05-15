import { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { useAnimation as useAnimationContext } from './AnimationContext';

export type TransitionType =
  | 'fade'
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'flip'
  | 'rotate'
  | 'none';

export interface PageTransitionProps {
  /** The content to animate */
  children: ReactNode;
  /** The type of transition to apply */
  type?: TransitionType;
  /** The duration of the animation in seconds */
  duration?: number;
  /** Whether to disable the animation */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether to maintain scroll position */
  maintainScroll?: boolean;
  /** Whether to show a loading indicator */
  showLoading?: boolean;
  /** Custom loading component */
  loadingComponent?: ReactNode;
  /** Custom variants for the animation */
  variants?: Variants;
  /** Whether to animate on initial load */
  animateOnMount?: boolean;
  /** Callback when animation starts */
  onAnimationStart?: () => void;
  /** Callback when animation completes */
  onAnimationComplete?: () => void;
  /** Whether to skip the exit animation */
  skipExit?: boolean;
  /** The easing function for the animation */
  easing?: string;
  /** The delay before the animation starts in seconds */
  delay?: number;
}

/**
 * Component for smooth page transitions
 */
export function PageTransition({
  children,
  type = 'fade',
  duration = 0.3,
  disabled = false,
  className = '',
  maintainScroll = true,
  showLoading = true,
  loadingComponent,
  variants,
  animateOnMount = true,
  onAnimationStart,
  onAnimationComplete,
  skipExit = false,
  easing = 'easeInOut',
  delay = 0
}: PageTransitionProps) {
  const router = useRouter();
  const { animationsEnabled, reducedMotion, animationSpeed } = useAnimationContext();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [prevPath, setPrevPath] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mounted, setMounted] = useState(false);
  
  // If animations are disabled or reduced motion is preferred, render without animations
  if (!animationsEnabled || reducedMotion || disabled || type === 'none') {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // Adjust duration based on animation speed
  const adjustedDuration = duration / animationSpeed;
  const adjustedDelay = delay / animationSpeed;

  // Set up router event listeners
  useEffect(() => {
    const handleRouteChangeStart = (url: string) => {
      // Save current scroll position if maintaining scroll
      if (maintainScroll) {
        setScrollPosition(window.scrollY);
      }
      
      // Set route changing state
      setIsRouteChanging(true);
      setPrevPath(router.asPath);
      
      // Trigger animation start callback
      if (onAnimationStart) {
        onAnimationStart();
      }
    };
    
    const handleRouteChangeComplete = (url: string) => {
      // Set route changing state
      setIsRouteChanging(false);
      
      // Restore scroll position if maintaining scroll
      if (maintainScroll && prevPath !== url) {
        window.scrollTo(0, scrollPosition);
      }
      
      // Trigger animation complete callback
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    };
    
    // Set mounted state
    setMounted(true);
    
    // Add router event listeners
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    
    // Remove router event listeners on cleanup
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [
    router, 
    maintainScroll, 
    prevPath, 
    scrollPosition, 
    onAnimationStart, 
    onAnimationComplete
  ]);

  // Define default variants based on transition type
  const getDefaultVariants = (): Variants => {
    const distance = 50;
    
    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1 } : { 
            opacity: 0,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-up':
        return {
          initial: { opacity: 0, y: distance },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, y: 0 } : { 
            opacity: 0, 
            y: -distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-down':
        return {
          initial: { opacity: 0, y: -distance },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, y: 0 } : { 
            opacity: 0, 
            y: distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-left':
        return {
          initial: { opacity: 0, x: distance },
          animate: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, x: 0 } : { 
            opacity: 0, 
            x: -distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-right':
        return {
          initial: { opacity: 0, x: -distance },
          animate: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, x: 0 } : { 
            opacity: 0, 
            x: distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, scale: 1 } : { 
            opacity: 0, 
            scale: 1.1,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'flip':
        return {
          initial: { opacity: 0, rotateY: 90 },
          animate: { 
            opacity: 1, 
            rotateY: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, rotateY: 0 } : { 
            opacity: 0, 
            rotateY: -90,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'rotate':
        return {
          initial: { opacity: 0, rotate: -5 },
          animate: { 
            opacity: 1, 
            rotate: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, rotate: 0 } : { 
            opacity: 0, 
            rotate: 5,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1 } : { 
            opacity: 0,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
    }
  };

  // Use custom variants if provided, otherwise use default
  const animationVariants = variants || getDefaultVariants();

  // Render loading indicator
  const renderLoading = () => {
    if (!showLoading || !isRouteChanging) return null;
    
    if (loadingComponent) {
      return loadingComponent;
    }
    
    return (
      <div className="page-transition-loading fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-blue-500">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {renderLoading()}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
          className={`page-transition ${className}`}
          initial={animateOnMount || mounted ? 'initial' : false}
          animate="animate"
          exit="exit"
          variants={animationVariants}
          onAnimationStart={onAnimationStart}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

/**
 * Component for section transitions within a page
 */
export interface SectionTransitionProps {
  /** The content to animate */
  children: ReactNode;
  /** The type of transition to apply */
  type?: TransitionType;
  /** The duration of the animation in seconds */
  duration?: number;
  /** Whether to disable the animation */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom variants for the animation */
  variants?: Variants;
  /** The easing function for the animation */
  easing?: string;
  /** The delay before the animation starts in seconds */
  delay?: number;
  /** The key to trigger the animation */
  transitionKey: string | number;
}

/**
 * Component for section transitions within a page
 */
export function SectionTransition({
  children,
  type = 'fade-in',
  duration = 0.3,
  disabled = false,
  className = '',
  variants,
  easing = 'easeInOut',
  delay = 0,
  transitionKey
}: SectionTransitionProps) {
  const { animationsEnabled, reducedMotion, animationSpeed } = useAnimationContext();
  
  // If animations are disabled or reduced motion is preferred, render without animations
  if (!animationsEnabled || reducedMotion || disabled || type === 'none') {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // Adjust duration based on animation speed
  const adjustedDuration = duration / animationSpeed;
  const adjustedDelay = delay / animationSpeed;

  // Define default variants based on transition type
  const getDefaultVariants = (): Variants => {
    const distance = 30;
    
    switch (type) {
      case 'fade':
      case 'fade-in':
      case 'fade-in':
      case 'fade-in':
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: { 
            opacity: 0,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-up':
        return {
          initial: { opacity: 0, y: distance },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: { 
            opacity: 0, 
            y: -distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-down':
        return {
          initial: { opacity: 0, y: -distance },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: { 
            opacity: 0, 
            y: distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-left':
        return {
          initial: { opacity: 0, x: distance },
          animate: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: { 
            opacity: 0, 
            x: -distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-right':
        return {
          initial: { opacity: 0, x: -distance },
          animate: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: { 
            opacity: 0, 
            x: distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: { 
            opacity: 0, 
            scale: 1.05,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: { 
            opacity: 0,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
    }
  };

  // Use custom variants if provided, otherwise use default
  const animationVariants = variants || getDefaultVariants();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        className={`section-transition ${className}`}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animationVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Component for smooth page transitions with Next.js App Router
 */
export interface AppRouterPageTransitionProps extends Omit<PageTransitionProps, 'maintainScroll'> {
  /** The content to animate */
  children: ReactNode;
}

/**
 * Component for smooth page transitions with Next.js App Router
 */
export function AppRouterPageTransition({
  children,
  type = 'fade-in',
  duration = 0.3,
  disabled = false,
  className = '',
  showLoading = true,
  loadingComponent,
  variants,
  animateOnMount = true,
  onAnimationStart,
  onAnimationComplete,
  skipExit = false,
  easing = 'easeInOut',
  delay = 0
}: AppRouterPageTransitionProps) {
  const pathname = usePathname();
  const { animationsEnabled, reducedMotion, animationSpeed } = useAnimationContext();
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // If animations are disabled or reduced motion is preferred, render without animations
  if (!animationsEnabled || reducedMotion || disabled || type === 'none') {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  // Adjust duration based on animation speed
  const adjustedDuration = duration / animationSpeed;
  const adjustedDelay = delay / animationSpeed;

  // Set up effects
  useEffect(() => {
    // Set mounted state
    setMounted(true);
    
    // Simulate route change start
    setIsRouteChanging(true);
    
    // Trigger animation start callback
    if (onAnimationStart) {
      onAnimationStart();
    }
    
    // Simulate route change complete after a short delay
    const timer = setTimeout(() => {
      setIsRouteChanging(false);
      
      // Trigger animation complete callback
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, adjustedDuration * 1000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [pathname, adjustedDuration, onAnimationStart, onAnimationComplete]);

  // Define default variants based on transition type
  const getDefaultVariants = (): Variants => {
    const distance = 50;
    
    switch (type) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1 } : { 
            opacity: 0,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-up':
        return {
          initial: { opacity: 0, y: distance },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, y: 0 } : { 
            opacity: 0, 
            y: -distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-down':
        return {
          initial: { opacity: 0, y: -distance },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, y: 0 } : { 
            opacity: 0, 
            y: distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-left':
        return {
          initial: { opacity: 0, x: distance },
          animate: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, x: 0 } : { 
            opacity: 0, 
            x: -distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'slide-right':
        return {
          initial: { opacity: 0, x: -distance },
          animate: { 
            opacity: 1, 
            x: 0,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, x: 0 } : { 
            opacity: 0, 
            x: distance,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      case 'scale':
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1, scale: 1 } : { 
            opacity: 0, 
            scale: 1.1,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { 
            opacity: 1,
            transition: { 
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          },
          exit: skipExit ? { opacity: 1 } : { 
            opacity: 0,
            transition: { 
              duration: adjustedDuration / 2,
              ease: easing
            }
          }
        };
    }
  };

  // Use custom variants if provided, otherwise use default
  const animationVariants = variants || getDefaultVariants();

  // Render loading indicator
  const renderLoading = () => {
    if (!showLoading || !isRouteChanging) return null;
    
    if (loadingComponent) {
      return loadingComponent;
    }
    
    return (
      <div className="page-transition-loading fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-blue-500">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      {renderLoading()}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className={`page-transition ${className}`}
          initial={animateOnMount || mounted ? 'initial' : false}
          animate="animate"
          exit="exit"
          variants={animationVariants}
          onAnimationStart={onAnimationStart}
          onAnimationComplete={onAnimationComplete}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}