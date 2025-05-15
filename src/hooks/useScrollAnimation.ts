import { useState, useEffect, useRef, RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Options for the useScrollAnimation hook
 */
export interface ScrollAnimationOptions {
  /** Threshold for when the animation should trigger (0-1) */
  threshold?: number;
  /** Whether the animation should only trigger once */
  once?: boolean;
  /** Root margin for the intersection observer */
  rootMargin?: string;
  /** Delay in milliseconds before the animation starts after intersection */
  delay?: number;
}

/**
 * Hook to trigger animations when an element enters the viewport
 * Respects user's reduced motion preferences
 * 
 * @param options - Configuration options for the scroll animation
 * @returns [ref, isVisible] - Ref to attach to the element and whether it's visible
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
): [RefObject<T>, boolean] {
  const {
    threshold = 0.1,
    once = true,
    rootMargin = '0px',
    delay = 0
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use setTimeout to add delay if specified
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          
          if (once && element) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, once, rootMargin, delay, prefersReducedMotion]);
  
  return [ref, isVisible];
}