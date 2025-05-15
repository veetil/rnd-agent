import { useState, useEffect } from 'react';

/**
 * Standard breakpoints for the application
 */
export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};

/**
 * Hook to check if a media query matches
 * @param query - The media query to check
 * @returns Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Default to false for SSR
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query);
      
      // Set initial value
      setMatches(mediaQuery.matches);
      
      // Define listener function
      const handleChange = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };
      
      // Add listener for changes
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => {
          mediaQuery.removeEventListener('change', handleChange);
        };
      } else if (mediaQuery.addListener) {
        // For older browsers
        mediaQuery.addListener(handleChange);
        return () => {
          mediaQuery.removeListener(handleChange);
        };
      }
    }
  }, [query]);
  
  return matches;
}

/**
 * Hook to check if the viewport is at least a certain breakpoint
 * @param breakpoint - The breakpoint to check (xs, sm, md, lg, xl)
 * @returns Whether the viewport is at least the specified breakpoint
 */
export function useBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  const minWidth = breakpoints[breakpoint];
  return useMediaQuery(`(min-width: ${minWidth}px)`);
}

/**
 * Hook to get the current breakpoint
 * @returns The current breakpoint (xs, sm, md, lg, xl)
 */
export function useCurrentBreakpoint(): keyof typeof breakpoints {
  const isXs = useMediaQuery(`(max-width: ${breakpoints.sm - 1}px)`);
  const isSm = useMediaQuery(`(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`);
  const isMd = useMediaQuery(`(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`);
  const isLg = useMediaQuery(`(min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`);
  const isXl = useMediaQuery(`(min-width: ${breakpoints.xl}px)`);
  
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
}

/**
 * Hook to check if the device is mobile
 * @returns Whether the device is mobile
 */
export function useMobileDetect(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/**
 * Hook to check if the device supports hover
 * @returns Whether the device supports hover
 */
export function useHoverCapability(): boolean {
  return useMediaQuery('(hover: hover)');
}

/**
 * Hook to check if the device is in portrait orientation
 * @returns Whether the device is in portrait orientation
 */
export function usePortraitOrientation(): boolean {
  return useMediaQuery('(orientation: portrait)');
}

/**
 * Hook to get the current viewport dimensions
 * @returns The current viewport width and height
 */
export function useViewportSize(): { width: number; height: number } {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return size;
}