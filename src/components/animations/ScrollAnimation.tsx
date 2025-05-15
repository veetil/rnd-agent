import React, { ReactNode, useRef, useState, useEffect, CSSProperties } from 'react';
import { motion, Variants, useAnimation, AnimationControls } from 'framer-motion';
import { useAnimation as useAnimationContext } from './AnimationContext';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export type ScrollAnimationType =
  | 'fade'
  | 'fade-in'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip-up'
  | 'flip-down'
  | 'flip-left'
  | 'flip-right'
  | 'rotate'
  | 'bounce'
  | 'slide-up'
  | 'slide-left'
  | 'slide-right'
  | 'none';

export interface ScrollAnimationProps {
  /** The content to animate */
  children: ReactNode;
  /** The type of animation to apply */
  type?: ScrollAnimationType;
  /** The duration of the animation in seconds */
  duration?: number;
  /** Whether to disable the animation */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Custom variants for the animation */
  variants?: Variants;
  /** The threshold for triggering the animation (0-1) */
  threshold?: number;
  /** The root margin for the intersection observer */
  rootMargin?: string;
  /** Whether to animate only once */
  once?: boolean;
  /** The delay before the animation starts in seconds */
  delay?: number;
  /** The stagger delay for child elements in seconds */
  staggerDelay?: number;
  /** The easing function for the animation */
  easing?: string;
  /** The distance to animate in pixels */
  distance?: number;
  /** Whether to animate when the component mounts */
  animateOnMount?: boolean;
  /** Callback when animation starts */
  onAnimationStart?: () => void;
  /** Callback when animation completes */
  onAnimationComplete?: () => void;
  /** The origin point for scale animations */
  transformOrigin?: string;
  /** The animation direction for directional animations */
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  /** Whether to use will-change for better performance */
  useWillChange?: boolean;
}

/**
 * Component for scroll-triggered animations
 */
export function ScrollAnimation({
  children,
  type = 'fade-up',
  duration = 0.6,
  disabled = false,
  className = '',
  style = {},
  variants,
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  delay = 0,
  staggerDelay = 0.1,
  easing = 'easeOut',
  distance = 50,
  animateOnMount = false,
  onAnimationStart,
  onAnimationComplete,
  transformOrigin = 'center',
  direction = 'normal',
  useWillChange = true
}: ScrollAnimationProps) {
  const controls = useAnimation();
  const { animationsEnabled, reducedMotion, animationSpeed } = useAnimationContext();
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Use the useScrollAnimation hook to detect when the element is in view
  const [ref, isInView] = useScrollAnimation({
    threshold,
    rootMargin,
    once,
    delay: delay * 1000 // Convert to milliseconds
  });
  
  // If animations are disabled or reduced motion is preferred, render without animations
  if (!animationsEnabled || reducedMotion || disabled || type === 'none' || (once && hasAnimated)) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Adjust duration based on animation speed
  const adjustedDuration = duration / animationSpeed;
  const adjustedDelay = delay / animationSpeed;
  const adjustedStaggerDelay = staggerDelay / animationSpeed;

  // Define default variants based on animation type
  const getDefaultVariants = (): Variants => {
    switch (type) {
      case 'fade':
        return {
          hidden: {
            opacity: 0
          },
          visible: {
            opacity: 1,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'slide-up':
        return {
          hidden: {
            opacity: 0,
            y: distance
          },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'slide-left':
        return {
          hidden: {
            opacity: 0,
            x: -distance
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'slide-right':
        return {
          hidden: {
            opacity: 0,
            x: distance
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'fade-in':
        return {
          hidden: { 
            opacity: 0 
          },
          visible: { 
            opacity: 1,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'fade-up':
        return {
          hidden: { 
            opacity: 0, 
            y: distance 
          },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'fade-down':
        return {
          hidden: { 
            opacity: 0, 
            y: -distance 
          },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'fade-left':
        return {
          hidden: { 
            opacity: 0, 
            x: -distance 
          },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'fade-right':
        return {
          hidden: { 
            opacity: 0, 
            x: distance 
          },
          visible: { 
            opacity: 1, 
            x: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'zoom-in':
        return {
          hidden: { 
            opacity: 0, 
            scale: 0.8 
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'zoom-out':
        return {
          hidden: { 
            opacity: 0, 
            scale: 1.2 
          },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'flip-up':
        return {
          hidden: { 
            opacity: 0, 
            rotateX: 90,
            y: distance / 2
          },
          visible: { 
            opacity: 1, 
            rotateX: 0,
            y: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'flip-down':
        return {
          hidden: { 
            opacity: 0, 
            rotateX: -90,
            y: -distance / 2
          },
          visible: { 
            opacity: 1, 
            rotateX: 0,
            y: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'flip-left':
        return {
          hidden: { 
            opacity: 0, 
            rotateY: -90,
            x: -distance / 2
          },
          visible: { 
            opacity: 1, 
            rotateY: 0,
            x: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'flip-right':
        return {
          hidden: { 
            opacity: 0, 
            rotateY: 90,
            x: distance / 2
          },
          visible: { 
            opacity: 1, 
            rotateY: 0,
            x: 0,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'rotate':
        return {
          hidden: { 
            opacity: 0, 
            rotate: direction === 'reverse' ? -90 : 90,
            scale: 0.8
          },
          visible: { 
            opacity: 1, 
            rotate: 0,
            scale: 1,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
      case 'bounce':
        return {
          hidden: { 
            opacity: 0, 
            y: distance,
            scale: 0.8
          },
          visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 300,
              damping: 15,
              delay: adjustedDelay
            }
          }
        };
      default:
        return {
          hidden: { 
            opacity: 0 
          },
          visible: { 
            opacity: 1,
            transition: {
              duration: adjustedDuration,
              ease: easing,
              delay: adjustedDelay
            }
          }
        };
    }
  };

  // Use custom variants if provided, otherwise use default
  const animationVariants = variants || getDefaultVariants();

  // Trigger animation when element is in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
        .then(() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
          setHasAnimated(true);
        });
      
      if (onAnimationStart) {
        onAnimationStart();
      }
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once, onAnimationStart, onAnimationComplete]);

  // Trigger animation on mount if specified
  useEffect(() => {
    if (animateOnMount) {
      controls.start('visible')
        .then(() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
          setHasAnimated(true);
        });
      
      if (onAnimationStart) {
        onAnimationStart();
      }
    }
  }, [animateOnMount, controls, onAnimationStart, onAnimationComplete]);

  return (
    <motion.div
      ref={ref}
      className={`scroll-animation ${className}`}
      style={{
        ...style,
        transformOrigin,
        willChange: useWillChange ? 'opacity, transform' : 'auto'
      }}
      initial="hidden"
      animate={controls}
      variants={animationVariants}
    >
      {children}
    </motion.div>
  );
}

/**
 * Component for staggered scroll animations
 */
export interface StaggeredScrollAnimationProps extends Omit<ScrollAnimationProps, 'staggerDelay'> {
  /** The stagger delay for child elements in seconds */
  staggerDelay?: number;
  /** The stagger direction */
  staggerDirection?: 'forward' | 'reverse' | 'center' | 'edges';
  /** The stagger children selector */
  childSelector?: string;
}

/**
 * Component for staggered scroll animations
 */
export function StaggeredScrollAnimation({
  children,
  type = 'fade-up',
  duration = 0.6,
  disabled = false,
  className = '',
  style = {},
  variants,
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
  delay = 0,
  staggerDelay = 0.1,
  staggerDirection = 'forward',
  childSelector = '*',
  easing = 'easeOut',
  distance = 50,
  animateOnMount = false,
  onAnimationStart,
  onAnimationComplete,
  transformOrigin = 'center',
  direction = 'normal',
  useWillChange = true
}: StaggeredScrollAnimationProps) {
  const controls = useAnimation();
  const { animationsEnabled, reducedMotion, animationSpeed } = useAnimationContext();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [childElements, setChildElements] = useState<Element[]>([]);
  
  // Use the useScrollAnimation hook to detect when the element is in view
  const [ref, isInView] = useScrollAnimation({
    threshold,
    rootMargin,
    once,
    delay: delay * 1000 // Convert to milliseconds
  });
  
  // If animations are disabled or reduced motion is preferred, render without animations
  if (!animationsEnabled || reducedMotion || disabled || type === 'none' || (once && hasAnimated)) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Adjust duration based on animation speed
  const adjustedDuration = duration / animationSpeed;
  const adjustedDelay = delay / animationSpeed;
  const adjustedStaggerDelay = staggerDelay / animationSpeed;

  // Get child elements for staggering
  useEffect(() => {
    if (ref.current) {
      const elements = Array.from(ref.current.querySelectorAll(childSelector));
      setChildElements(elements);
    }
  }, [childSelector, children]);

  // Define default variants based on animation type
  const getDefaultVariants = (): Variants => {
    const baseVariant = {
      hidden: {
        opacity: 0,
        y: type.includes('up') ? distance : type.includes('down') ? -distance : 0,
        x: type.includes('left') ? -distance : type.includes('right') ? distance : 0,
        scale: type.includes('zoom-in') ? 0.8 : type.includes('zoom-out') ? 1.2 : 1,
        rotate: type.includes('rotate') ? (direction === 'reverse' ? -90 : 90) : 0,
        rotateX: type.includes('flip-up') ? 90 : type.includes('flip-down') ? -90 : 0,
        rotateY: type.includes('flip-left') ? -90 : type.includes('flip-right') ? 90 : 0
      },
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        rotateX: 0,
        rotateY: 0,
        transition: {
          duration: adjustedDuration,
          ease: easing,
          delay: adjustedDelay
        }
      }
    };

    return {
      hidden: {
        opacity: 0
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: adjustedStaggerDelay,
          staggerDirection: staggerDirection === 'reverse' ? -1 : 1,
          delayChildren: adjustedDelay
        }
      }
    };
  };

  // Use custom variants if provided, otherwise use default
  const containerVariants = variants || getDefaultVariants();

  // Create item variants for children
  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: adjustedDuration,
        ease: easing
      }
    }
  };

  // Trigger animation when element is in view
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
        .then(() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
          setHasAnimated(true);
        });
      
      if (onAnimationStart) {
        onAnimationStart();
      }
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once, onAnimationStart, onAnimationComplete]);

  // Trigger animation on mount if specified
  useEffect(() => {
    if (animateOnMount) {
      controls.start('visible')
        .then(() => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
          setHasAnimated(true);
        });
      
      if (onAnimationStart) {
        onAnimationStart();
      }
    }
  }, [animateOnMount, controls, onAnimationStart, onAnimationComplete]);

  // Render children with staggered animations
  const renderStaggeredChildren = () => {
    // If children is a single element or not an array, wrap it in a motion.div
    if (!Array.isArray(children) && typeof children !== 'object') {
      return (
        <motion.div variants={itemVariants}>
          {children}
        </motion.div>
      );
    }

    // If children is an array or React fragment, map over the children
    return React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      // Calculate delay based on stagger direction
      let staggerIndex = index;
      const childCount = React.Children.count(children);
      
      if (staggerDirection === 'center') {
        // Start from the center and move outward
        staggerIndex = Math.abs(index - Math.floor(childCount / 2));
      } else if (staggerDirection === 'edges') {
        // Start from the edges and move inward
        staggerIndex = Math.min(index, childCount - index - 1);
      } else if (staggerDirection === 'reverse') {
        // Start from the end and move backward
        staggerIndex = childCount - index - 1;
      }

      return (
        <motion.div
          key={index}
          variants={itemVariants}
          style={{
            transformOrigin,
            willChange: useWillChange ? 'opacity, transform' : 'auto'
          }}
          custom={staggerIndex}
        >
          {child}
        </motion.div>
      );
    });
  };

  return (
    <motion.div
      ref={ref}
      className={`staggered-scroll-animation ${className}`}
      style={{
        ...style,
        willChange: useWillChange ? 'opacity, transform' : 'auto'
      }}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {renderStaggeredChildren()}
    </motion.div>
  );
}

/**
 * Component for scroll-triggered parallax animations
 */
export interface ParallaxScrollAnimationProps {
  /** The content to animate */
  children: ReactNode;
  /** The speed of the parallax effect (1 = normal, 0.5 = half speed, 2 = double speed) */
  speed?: number;
  /** The direction of the parallax effect */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Whether to disable the animation */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** The easing function for the animation */
  easing?: string;
  /** Whether to use will-change for better performance */
  useWillChange?: boolean;
}

/**
 * Component for scroll-triggered parallax animations
 */
export function ParallaxScrollAnimation({
  children,
  speed = 0.5,
  direction = 'up',
  disabled = false,
  className = '',
  style = {},
  easing = 'linear',
  useWillChange = true
}: ParallaxScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { animationsEnabled, reducedMotion } = useAnimationContext();
  const [scrollY, setScrollY] = useState(0);
  
  // If animations are disabled or reduced motion is preferred, render without animations
  if (!animationsEnabled || reducedMotion || disabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate parallax offset
  const getParallaxOffset = () => {
    if (!ref.current) return 0;
    
    const rect = ref.current.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    return distanceFromCenter * speed;
  };

  // Get transform style based on direction and offset
  const getTransformStyle = () => {
    const offset = getParallaxOffset();
    
    switch (direction) {
      case 'up':
        return `translateY(${-offset}px)`;
      case 'down':
        return `translateY(${offset}px)`;
      case 'left':
        return `translateX(${-offset}px)`;
      case 'right':
        return `translateX(${offset}px)`;
      default:
        return `translateY(${-offset}px)`;
    }
  };

  return (
    <div
      ref={ref}
      className={`parallax-scroll-animation ${className}`}
      style={{
        ...style,
        transform: getTransformStyle(),
        transition: `transform 0.1s ${easing}`,
        willChange: useWillChange ? 'transform' : 'auto'
      }}
    >
      {children}
    </div>
  );
}