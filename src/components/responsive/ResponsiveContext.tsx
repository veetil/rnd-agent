import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { 
  useBreakpoint, 
  useCurrentBreakpoint, 
  useMobileDetect, 
  useHoverCapability, 
  usePortraitOrientation,
  useViewportSize,
  breakpoints
} from '../../hooks/useMediaQuery';

interface ResponsiveContextType {
  /** Current breakpoint (xs, sm, md, lg, xl) */
  breakpoint: keyof typeof breakpoints;
  /** Whether the viewport is at least small (sm) */
  isSmUp: boolean;
  /** Whether the viewport is at least medium (md) */
  isMdUp: boolean;
  /** Whether the viewport is at least large (lg) */
  isLgUp: boolean;
  /** Whether the viewport is at least extra large (xl) */
  isXlUp: boolean;
  /** Whether the device is mobile */
  isMobile: boolean;
  /** Whether the device supports hover */
  hasHoverCapability: boolean;
  /** Whether the device is in portrait orientation */
  isPortrait: boolean;
  /** Current viewport width */
  viewportWidth: number;
  /** Current viewport height */
  viewportHeight: number;
  /** Whether the component is being server-side rendered */
  isSSR: boolean;
}

const defaultContext: ResponsiveContextType = {
  breakpoint: 'md',
  isSmUp: true,
  isMdUp: true,
  isLgUp: false,
  isXlUp: false,
  isMobile: false,
  hasHoverCapability: true,
  isPortrait: false,
  viewportWidth: 1024,
  viewportHeight: 768,
  isSSR: true
};

const ResponsiveContext = createContext<ResponsiveContextType>(defaultContext);

/**
 * Hook to access responsive context
 */
export const useResponsive = () => useContext(ResponsiveContext);

interface ResponsiveProviderProps {
  children: ReactNode;
}

/**
 * Provider component for responsive design
 * Provides viewport and device information for responsive components
 */
export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const [isSSR, setIsSSR] = useState(true);
  
  // Get current breakpoint and related values
  const breakpoint = useCurrentBreakpoint();
  const isSmUp = useBreakpoint('sm');
  const isMdUp = useBreakpoint('md');
  const isLgUp = useBreakpoint('lg');
  const isXlUp = useBreakpoint('xl');
  
  // Get device capabilities
  const isMobile = useMobileDetect();
  const hasHoverCapability = useHoverCapability();
  const isPortrait = usePortraitOrientation();
  
  // Get viewport dimensions
  const { width: viewportWidth, height: viewportHeight } = useViewportSize();
  
  // Update SSR state on mount
  useEffect(() => {
    setIsSSR(false);
  }, []);
  
  const value = {
    breakpoint,
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    isMobile,
    hasHoverCapability,
    isPortrait,
    viewportWidth,
    viewportHeight,
    isSSR
  };
  
  // Create a wrapper element with data attributes for testing
  const wrappedChildren = (
    <div
      data-responsive-wrapper="true"
      data-viewport={breakpoint}
      data-is-mobile={isMobile.toString()}
      data-has-hover={hasHoverCapability.toString()}
      data-is-portrait={isPortrait.toString()}
      style={{
        display: 'contents', // This makes the div not affect layout
      }}
    >
      {children}
    </div>
  );

  return (
    <ResponsiveContext.Provider value={value}>
      {wrappedChildren}
    </ResponsiveContext.Provider>
  );
}

/**
 * Component that renders different content based on breakpoint
 */
interface ResponsiveRenderProps {
  /** Content for extra small devices */
  xs?: ReactNode;
  /** Content for small devices */
  sm?: ReactNode;
  /** Content for medium devices */
  md?: ReactNode;
  /** Content for large devices */
  lg?: ReactNode;
  /** Content for extra large devices */
  xl?: ReactNode;
  /** Default content (fallback) */
  fallback: ReactNode;
}

export function ResponsiveRender({
  xs,
  sm,
  md,
  lg,
  xl,
  fallback
}: ResponsiveRenderProps) {
  const { breakpoint, isSSR } = useResponsive();
  
  // During SSR, render the fallback
  if (isSSR) {
    return <>{fallback}</>;
  }
  
  // Render based on current breakpoint
  switch (breakpoint) {
    case 'xs':
      return <>{xs || fallback}</>;
    case 'sm':
      return <>{sm || fallback}</>;
    case 'md':
      return <>{md || fallback}</>;
    case 'lg':
      return <>{lg || fallback}</>;
    case 'xl':
      return <>{xl || fallback}</>;
    default:
      return <>{fallback}</>;
  }
}

/**
 * Component that renders content only at specified breakpoints
 */
interface BreakpointVisibilityProps {
  /** The content to render */
  children: ReactNode;
  /** Show on extra small devices */
  xs?: boolean;
  /** Show on small devices */
  sm?: boolean;
  /** Show on medium devices */
  md?: boolean;
  /** Show on large devices */
  lg?: boolean;
  /** Show on extra large devices */
  xl?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function BreakpointVisibility({
  children,
  xs = false,
  sm = false,
  md = false,
  lg = false,
  xl = false,
  className = ''
}: BreakpointVisibilityProps) {
  const { breakpoint, isSSR } = useResponsive();
  
  // During SSR, use CSS-based visibility
  if (isSSR) {
    const visibilityClasses = [
      xs ? 'visible-xs' : 'hidden-xs',
      sm ? 'visible-sm' : 'hidden-sm',
      md ? 'visible-md' : 'hidden-md',
      lg ? 'visible-lg' : 'hidden-lg',
      xl ? 'visible-xl' : 'hidden-xl'
    ].join(' ');
    
    return <div className={`${visibilityClasses} ${className}`}>{children}</div>;
  }
  
  // Check if current breakpoint should be visible
  const isVisible = (
    (breakpoint === 'xs' && xs) ||
    (breakpoint === 'sm' && sm) ||
    (breakpoint === 'md' && md) ||
    (breakpoint === 'lg' && lg) ||
    (breakpoint === 'xl' && xl)
  );
  
  if (!isVisible) {
    return null;
  }
  
  return <div className={className}>{children}</div>;
}

/**
 * Component that provides a responsive container with max-width based on breakpoint
 */
interface ResponsiveContainerProps {
  /** The content to render */
  children: ReactNode;
  /** Whether to use fluid width (100%) */
  fluid?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether to center the container */
  center?: boolean;
}

export function ResponsiveContainer({
  children,
  fluid = false,
  className = '',
  center = true
}: ResponsiveContainerProps) {
  return (
    <div 
      className={`
        responsive-container 
        ${fluid ? 'container-fluid' : 'container'} 
        ${center ? 'mx-auto' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}