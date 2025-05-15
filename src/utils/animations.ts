import { Variant, Variants } from 'framer-motion';

/**
 * Animation types supported by the animation system
 */
export type AnimationType =
  | 'fade'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'scale-up'
  | 'scale-down'
  | 'rotate'
  | 'flip'
  | 'blur'
  | 'bounce'
  | 'swing'
  | 'fade-stagger'
  | 'slide-stagger';

/**
 * Interface for animation variants (hidden and visible states)
 */
export interface AnimationVariants extends Variants {
  hidden: Variant;
  visible: Variant;
}

/**
 * Predefined animation variants for common animations
 */
export const animations: Record<AnimationType, AnimationVariants> = {
  'fade': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'slide-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-down': {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-left': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  'slide-right': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  'scale': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  },
  'scale-down': {
    hidden: { opacity: 0, scale: 1.2, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  },
  'rotate': {
    hidden: { opacity: 0, rotate: -15 },
    visible: { opacity: 1, rotate: 0 }
  },
  'flip': {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0 }
  },
  'blur': {
    hidden: { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' }
  },
  'bounce': {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10
      }
    }
  },
  'swing': {
    hidden: { opacity: 0, rotate: -5 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  },
  'fade-stagger': {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  'slide-stagger': {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

/**
 * Default transition settings for animations
 */
export const defaultTransition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier easing
};

/**
 * Staggered children animation settings
 */
export const staggeredChildren = {
  staggerChildren: 0.1,
  delayChildren: 0.1,
};

/**
 * Staggered animation variants for child elements
 */
export const staggeredItemVariants: Record<string, AnimationVariants> = {
  'fade': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'slide-up': {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-down': {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-left': {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  },
  'slide-right': {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  'scale': {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
};

/**
 * Easing presets for animations
 */
export const easingPresets = {
  smooth: [0.25, 0.1, 0.25, 1.0], // cubic-bezier easing
  bounce: [0.175, 0.885, 0.32, 1.275], // cubic-bezier with bounce
  gentle: [0.4, 0.0, 0.2, 1], // ease-out
  sharp: [0.4, 0.0, 0.6, 1], // ease-in-out
  anticipate: [0.5, -0.5, 0.5, 1.5] // anticipation effect
};

/**
 * Throttle function for performance optimization
 * Limits the rate at which a function can fire
 * 
 * @param func - The function to throttle
 * @param limit - The time limit in milliseconds
 * @returns A throttled function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T, 
  limit: number
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let inThrottle: boolean = false;
  let lastResult: ReturnType<T>;
  
  return function(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    if (!inThrottle) {
      lastResult = func.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
    
    return lastResult;
  };
}

/**
 * Debounce function for performance optimization
 * Ensures a function is only called after a certain amount of time has passed
 * 
 * @param func - The function to debounce
 * @param wait - The time to wait in milliseconds
 * @returns A debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(later, wait);
  };
}