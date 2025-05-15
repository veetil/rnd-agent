import { ReactNode, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from '../animations/AnimationContext';

export interface NavigationItem {
  /** The label for the item */
  label: string;
  /** The URL to navigate to */
  href?: string;
  /** The icon for the item */
  icon?: ReactNode;
  /** Whether the item is active */
  isActive?: boolean;
  /** The onClick handler */
  onClick?: () => void;
  /** The badge text */
  badge?: string;
  /** The badge color */
  badgeColor?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** The subitems */
  subitems?: NavigationItem[];
}

export interface MobileNavigationProps {
  /** The navigation items */
  items: NavigationItem[];
  /** The position of the navigation */
  position?: 'bottom' | 'top' | 'left' | 'right';
  /** Whether to show labels */
  showLabels?: boolean;
  /** Whether to hide the navigation on scroll */
  hideOnScroll?: boolean;
  /** Whether to transform the navigation on scroll */
  transformOnScroll?: boolean;
  /** The scroll threshold for hiding/transforming */
  scrollThreshold?: number;
  /** Whether to use gestures for navigation */
  useGestures?: boolean;
  /** The background color */
  backgroundColor?: string;
  /** The text color */
  textColor?: string;
  /** The active color */
  activeColor?: string;
  /** The border color */
  borderColor?: string;
  /** The z-index */
  zIndex?: number;
  /** The height of the navigation (for top/bottom) */
  height?: string | number;
  /** The width of the navigation (for left/right) */
  width?: string | number;
  /** The breakpoint for showing the navigation */
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Whether to show a backdrop for side navigation */
  showBackdrop?: boolean;
  /** The backdrop color */
  backdropColor?: string;
  /** The backdrop opacity */
  backdropOpacity?: number;
  /** Whether to show a handle for side navigation */
  showHandle?: boolean;
  /** Whether the navigation is open (for side navigation) */
  isOpen?: boolean;
  /** The callback when the navigation is opened */
  onOpen?: () => void;
  /** The callback when the navigation is closed */
  onClose?: () => void;
  /** The callback when an item is clicked */
  onItemClick?: (item: NavigationItem) => void;
  /** Additional CSS classes */
  className?: string;
  /** The animation duration in seconds */
  animationDuration?: number;
  /** Whether to disable the animation */
  disableAnimation?: boolean;
}

export interface CompactHeaderProps {
  /** The logo component */
  logo: ReactNode;
  /** The navigation items */
  items: {
    label: string;
    href?: string;
    isActive?: boolean;
    onClick?: () => void;
  }[];
  /** Whether to transform the header on scroll */
  transformOnScroll?: boolean;
  /** The scroll threshold for transforming */
  scrollThreshold?: number;
  /** The height of the header */
  height?: string | number;
  /** The background color */
  backgroundColor?: string;
  /** The text color */
  textColor?: string;
  /** The active color */
  activeColor?: string;
  /** The border color */
  borderColor?: string;
  /** The z-index */
  zIndex?: number;
  /** Whether to show a menu button */
  showMenuButton?: boolean;
  /** Whether the menu is open */
  isMenuOpen?: boolean;
  /** The callback when the menu button is clicked */
  onMenuClick?: () => void;
  /** The children to render in the header */
  children?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** The animation duration in seconds */
  animationDuration?: number;
  /** Whether to disable the animation */
  disableAnimation?: boolean;
}

/**
 * Component for mobile navigation
 * Provides optimized navigation for mobile users
 */
export function MobileNavigation({
  items,
  position = 'bottom',
  showLabels = true,
  hideOnScroll = false,
  transformOnScroll = false,
  scrollThreshold = 50,
  useGestures = false,
  backgroundColor = 'white',
  textColor = 'text-gray-600',
  activeColor = 'text-blue-600',
  borderColor = 'border-gray-200',
  zIndex = 40,
  height = '4rem',
  width = '80%',
  breakpoint = 'md',
  showBackdrop = false,
  backdropColor = '#000000',
  backdropOpacity = 0.5,
  showHandle = false,
  isOpen: initialIsOpen = false,
  onOpen,
  onClose,
  onItemClick,
  className = '',
  animationDuration = 0.3,
  disableAnimation = false
}: MobileNavigationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isCompact, setIsCompact] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [isOpen, setIsOpen] = useState(initialIsOpen);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);
  const { animationsEnabled, reducedMotion } = useAnimation();

  // Update isOpen when initialIsOpen changes
  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      
      setScrollPosition(currentPosition);
      
      // Hide on scroll
      if (hideOnScroll) {
        if (currentPosition > lastScrollPosition && currentPosition > scrollThreshold) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      
      // Transform on scroll
      if (transformOnScroll) {
        setIsCompact(currentPosition > scrollThreshold);
      }
      
      setLastScrollPosition(currentPosition);
    };

    if (hideOnScroll || transformOnScroll) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [hideOnScroll, transformOnScroll, scrollThreshold, lastScrollPosition]);

  // Handle touch events for gestures
  useEffect(() => {
    if (!useGestures || !navRef.current) return;

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!e.changedTouches[0]) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Only handle horizontal swipes that are more horizontal than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (position === 'left' && deltaX < 0) {
          handleClose();
        } else if (position === 'right' && deltaX > 0) {
          handleClose();
        }
      }
      
      // Only handle vertical swipes that are more vertical than horizontal
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (position === 'bottom' && deltaY < 0) {
          handleClose();
        } else if (position === 'top' && deltaY > 0) {
          handleClose();
        }
      }
    };

    const element = navRef.current;
    
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [useGestures, position, touchStartX, touchStartY]);

  // Handle backdrop click
  const handleBackdropClick = () => {
    handleClose();
  };

  // Handle open
  const handleOpen = () => {
    setIsOpen(true);
    
    if (onOpen) {
      onOpen();
    }
  };

  // Handle close
  const handleClose = () => {
    setIsOpen(false);
    
    if (onClose) {
      onClose();
    }
  };

  // Handle item click
  const handleItemClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick();
    }
    
    if (onItemClick) {
      onItemClick(item);
    }
    
    // Close side navigation when an item is clicked
    if ((position === 'left' || position === 'right') && isOpen) {
      handleClose();
    }
  };

  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'bottom':
        return {
          bottom: 0,
          left: 0,
          right: 0,
          height,
          width: '100%',
          borderTop: `1px solid ${borderColor}`,
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)'
        };
      case 'top':
        return {
          top: 0,
          left: 0,
          right: 0,
          height,
          width: '100%',
          borderBottom: `1px solid ${borderColor}`,
          transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
        };
      case 'left':
        return {
          top: 0,
          left: 0,
          bottom: 0,
          width,
          height: '100%',
          borderRight: `1px solid ${borderColor}`,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)'
        };
      case 'right':
        return {
          top: 0,
          right: 0,
          bottom: 0,
          width,
          height: '100%',
          borderLeft: `1px solid ${borderColor}`,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)'
        };
      default:
        return {
          bottom: 0,
          left: 0,
          right: 0,
          height,
          width: '100%',
          borderTop: `1px solid ${borderColor}`,
          transform: isVisible ? 'translateY(0)' : 'translateY(100%)'
        };
    }
  };

  // Get breakpoint styles
  const getBreakpointStyles = () => {
    switch (breakpoint) {
      case 'sm':
        return { display: { sm: 'none' } };
      case 'md':
        return { display: { md: 'none' } };
      case 'lg':
        return { display: { lg: 'none' } };
      case 'xl':
        return { display: { xl: 'none' } };
      case '2xl':
        return { display: { '2xl': 'none' } };
      default:
        return { display: { md: 'none' } };
    }
  };

  // Get animation variants
  const getAnimationVariants = () => {
    if (disableAnimation || !animationsEnabled || reducedMotion) {
      return {
        hidden: {},
        visible: {}
      };
    }

    switch (position) {
      case 'bottom':
        return {
          hidden: { y: '100%' },
          visible: { 
            y: 0,
            transition: { duration: animationDuration }
          }
        };
      case 'top':
        return {
          hidden: { y: '-100%' },
          visible: { 
            y: 0,
            transition: { duration: animationDuration }
          }
        };
      case 'left':
        return {
          hidden: { x: '-100%' },
          visible: { 
            x: 0,
            transition: { duration: animationDuration }
          }
        };
      case 'right':
        return {
          hidden: { x: '100%' },
          visible: { 
            x: 0,
            transition: { duration: animationDuration }
          }
        };
      default:
        return {
          hidden: { y: '100%' },
          visible: { 
            y: 0,
            transition: { duration: animationDuration }
          }
        };
    }
  };

  // Determine if the navigation is horizontal or vertical
  const isHorizontal = position === 'top' || position === 'bottom';

  return (
    <>
      {/* Backdrop for side navigation */}
      {(position === 'left' || position === 'right') && showBackdrop && isOpen && (
        <motion.div
          className="mobile-navigation-backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: backdropColor,
            zIndex: zIndex - 1
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: backdropOpacity }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        />
      )}
      
      {/* Navigation */}
      <motion.div
        ref={navRef}
        className={`mobile-navigation mobile-navigation-${position} ${className}`}
        style={{
          position: 'fixed',
          backgroundColor,
          zIndex,
          ...getPositionStyles()
        }}
        initial="hidden"
        animate={
          (position === 'left' || position === 'right')
            ? isOpen ? 'visible' : 'hidden'
            : isVisible ? 'visible' : 'hidden'
        }
        variants={getAnimationVariants()}
      >
        {/* Handle for side navigation */}
        {(position === 'left' || position === 'right') && showHandle && (
          <div
            className="mobile-navigation-handle"
            style={{
              position: 'absolute',
              [position === 'left' ? 'right' : 'left']: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '60px',
              backgroundColor,
              borderRadius: position === 'left' ? '0 4px 4px 0' : '4px 0 0 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              border: `1px solid ${borderColor}`,
              borderLeft: position === 'left' ? 'none' : undefined,
              borderRight: position === 'right' ? 'none' : undefined
            }}
            onClick={isOpen ? handleClose : handleOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: isOpen 
                  ? `rotate(${position === 'left' ? '180' : '0'}deg)` 
                  : `rotate(${position === 'left' ? '0' : '180'}deg)`,
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
        )}
        
        {/* Items */}
        <div
          className="mobile-navigation-items"
          style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'row' : 'column',
            justifyContent: isHorizontal ? 'space-around' : 'flex-start',
            alignItems: isHorizontal ? 'center' : 'stretch',
            height: '100%',
            width: '100%',
            padding: isHorizontal ? '0' : '1rem'
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`mobile-navigation-item ${item.isActive ? 'mobile-navigation-item-active' : ''}`}
              style={{
                display: 'flex',
                flexDirection: isHorizontal ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: isHorizontal ? 'center' : 'flex-start',
                padding: isHorizontal ? '0.5rem' : '0.75rem',
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.6 : 1,
                position: 'relative',
                flex: isHorizontal ? '1' : undefined
              }}
              onClick={() => !item.disabled && handleItemClick(item)}
            >
              {/* Icon */}
              {item.icon && (
                <div
                  className="mobile-navigation-item-icon"
                  style={{
                    marginRight: isHorizontal ? 0 : '0.75rem',
                    marginBottom: isHorizontal ? '0.25rem' : 0,
                    color: item.isActive ? activeColor : textColor
                  }}
                >
                  {item.icon}
                </div>
              )}
              
              {/* Label */}
              {showLabels && (
                <div
                  className="mobile-navigation-item-label"
                  style={{
                    fontSize: isHorizontal ? '0.75rem' : '0.875rem',
                    fontWeight: item.isActive ? 500 : 400,
                    color: item.isActive ? activeColor : textColor
                  }}
                >
                  {item.label}
                </div>
              )}
              
              {/* Badge */}
              {item.badge && (
                <div
                  className="mobile-navigation-item-badge"
                  style={{
                    position: 'absolute',
                    top: isHorizontal ? '0.25rem' : '50%',
                    right: isHorizontal ? '50%' : '0.75rem',
                    transform: isHorizontal 
                      ? 'translateX(0.75rem)' 
                      : 'translateY(-50%)',
                    backgroundColor: item.badgeColor || 'rgb(239, 68, 68)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    padding: '0.125rem 0.375rem',
                    borderRadius: '9999px',
                    minWidth: '1.25rem',
                    textAlign: 'center'
                  }}
                >
                  {item.badge}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

/**
 * Component for compact header
 * Provides a header that transforms on scroll
 */
export function CompactHeader({
  logo,
  items,
  transformOnScroll = true,
  scrollThreshold = 50,
  height = 'auto',
  backgroundColor = 'white',
  textColor = 'text-gray-600',
  activeColor = 'text-blue-600',
  borderColor = 'border-gray-200',
  zIndex = 50,
  showMenuButton = false,
  isMenuOpen = false,
  onMenuClick,
  children,
  className = '',
  animationDuration = 0.3,
  disableAnimation = false
}: CompactHeaderProps) {
  const [isCompact, setIsCompact] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { animationsEnabled, reducedMotion } = useAnimation();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      
      setScrollPosition(currentPosition);
      
      // Transform on scroll
      if (transformOnScroll) {
        setIsCompact(currentPosition > scrollThreshold);
      }
    };

    if (transformOnScroll) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [transformOnScroll, scrollThreshold]);

  // Handle menu click
  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    }
  };

  // Get animation variants
  const getAnimationVariants = () => {
    if (disableAnimation || !animationsEnabled || reducedMotion) {
      return {
        expanded: {},
        compact: {}
      };
    }

    return {
      expanded: { 
        height: 'auto',
        transition: { duration: animationDuration }
      },
      compact: { 
        height: '4rem',
        transition: { duration: animationDuration }
      }
    };
  };

  return (
    <motion.header
      className={`compact-header ${className} ${isCompact ? 'compact-header-compact' : 'compact-header-expanded'}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor,
        borderBottom: `1px solid ${borderColor}`,
        zIndex,
        transition: disableAnimation || !animationsEnabled || reducedMotion
          ? 'none'
          : `height ${animationDuration}s ease-in-out, box-shadow ${animationDuration}s ease-in-out`,
        boxShadow: isCompact 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          : 'none'
      }}
      initial="expanded"
      animate={isCompact ? 'compact' : 'expanded'}
      variants={getAnimationVariants()}
    >
      <div
        className="compact-header-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          height: isCompact ? '4rem' : height,
          maxWidth: '1280px',
          margin: '0 auto',
          transition: disableAnimation || !animationsEnabled || reducedMotion
            ? 'none'
            : `height ${animationDuration}s ease-in-out`
        }}
      >
        {/* Logo */}
        <div className="compact-header-logo">
          {logo}
        </div>
        
        {/* Navigation */}
        <nav className="compact-header-nav">
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}
          >
            {items.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  style={{
                    color: item.isActive ? activeColor : textColor,
                    fontWeight: item.isActive ? 500 : 400,
                    textDecoration: 'none',
                    transition: 'color 0.2s ease-in-out'
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Menu Button */}
        {showMenuButton && (
          <button
            className="compact-header-menu-button"
            onClick={handleMenuClick}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: textColor,
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        )}
      </div>
      
      {/* Additional Content */}
      <AnimatePresence>
        {!isCompact && children && (
          <motion.div
            className="compact-header-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: animationDuration }}
            style={{
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                maxWidth: '1280px',
                margin: '0 auto',
                padding: '0 1.5rem'
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}