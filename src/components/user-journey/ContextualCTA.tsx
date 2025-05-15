import { ReactNode, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from './PersonaContext';
import { useAnimation } from '../animations/AnimationContext';

export type CTAPosition = 'inline' | 'floating' | 'modal';
export type CTATrigger = 'scroll' | 'time' | 'exit-intent' | 'inactivity' | 'click' | 'none';
export type CTAVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

export interface CTAAction {
  /** The label for the action */
  label: string;
  /** The URL to navigate to */
  href?: string;
  /** Whether the action is primary */
  isPrimary?: boolean;
  /** The onClick handler */
  onClick?: () => void;
  /** The icon for the action */
  icon?: ReactNode;
  /** The variant of the action */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** The size of the action */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Whether the action is loading */
  isLoading?: boolean;
  /** The loading text */
  loadingText?: string;
}

export interface ContextualCTAProps {
  /** The title of the CTA */
  title: string;
  /** The description of the CTA */
  description?: string;
  /** The actions for the CTA */
  actions: CTAAction[];
  /** The position of the CTA */
  position?: CTAPosition;
  /** The variant of the CTA */
  variant?: CTAVariant;
  /** The trigger for the CTA */
  trigger?: CTATrigger;
  /** The scroll threshold for the scroll trigger (0-1) */
  scrollThreshold?: number;
  /** The time delay for the time trigger in seconds */
  timeDelay?: number;
  /** The inactivity time for the inactivity trigger in seconds */
  inactivityTime?: number;
  /** Whether to show the CTA only once */
  showOnce?: boolean;
  /** The ID of the CTA */
  ctaId?: string;
  /** Whether to show a close button */
  showCloseButton?: boolean;
  /** The callback when the CTA is closed */
  onClose?: () => void;
  /** The callback when the CTA is shown */
  onShow?: () => void;
  /** The callback when an action is clicked */
  onActionClick?: (action: CTAAction) => void;
  /** The z-index of the CTA */
  zIndex?: number;
  /** Additional CSS classes */
  className?: string;
  /** The width of the CTA */
  width?: string | number;
  /** The maximum width of the CTA */
  maxWidth?: string | number;
  /** The animation duration in seconds */
  animationDuration?: number;
  /** Whether to disable the animation */
  disableAnimation?: boolean;
  /** The personas this CTA is relevant for */
  relevantPersonas?: string | string[];
  /** The position of the floating CTA */
  floatingPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  /** The offset for the floating CTA */
  floatingOffset?: { x?: number; y?: number };
  /** Whether to show a backdrop for the modal */
  showBackdrop?: boolean;
  /** The backdrop color */
  backdropColor?: string;
  /** The backdrop opacity */
  backdropOpacity?: number;
  /** Whether to close the modal when clicking outside */
  closeOnClickOutside?: boolean;
  /** Whether to close the modal when pressing escape */
  closeOnEsc?: boolean;
  /** Whether to disable body scroll when the modal is open */
  disableBodyScroll?: boolean;
  /** The icon for the CTA */
  icon?: ReactNode;
  /** The image for the CTA */
  image?: string;
  /** The image position */
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  /** The image width */
  imageWidth?: string | number;
  /** The image height */
  imageHeight?: string | number;
  /** The image alt text */
  imageAlt?: string;
  /** The background color */
  backgroundColor?: string;
  /** The text color */
  textColor?: string;
  /** The border color */
  borderColor?: string;
  /** The border width */
  borderWidth?: string | number;
  /** The border radius */
  borderRadius?: string | number;
  /** The padding */
  padding?: string | number;
  /** The margin */
  margin?: string | number;
  /** The box shadow */
  boxShadow?: string;
  /** Whether to show the CTA */
  show?: boolean;
}

/**
 * Component for contextual call-to-action elements
 * Provides relevant actions based on user behavior and context
 */
export function ContextualCTA({
  title,
  description,
  actions,
  position = 'inline',
  variant = 'primary',
  trigger = 'none',
  scrollThreshold = 0.5,
  timeDelay = 3,
  inactivityTime = 30,
  showOnce = false,
  ctaId = 'contextual-cta',
  showCloseButton = false,
  onClose,
  onShow,
  onActionClick,
  zIndex = 50,
  className = '',
  width,
  maxWidth = '400px',
  animationDuration = 0.3,
  disableAnimation = false,
  relevantPersonas,
  floatingPosition = 'bottom-right',
  floatingOffset = { x: 20, y: 20 },
  showBackdrop = true,
  backdropColor = '#000000',
  backdropOpacity = 0.5,
  closeOnClickOutside = true,
  closeOnEsc = true,
  disableBodyScroll = true,
  icon,
  image,
  imagePosition = 'top',
  imageWidth = '100%',
  imageHeight = 'auto',
  imageAlt = '',
  backgroundColor,
  textColor,
  borderColor,
  borderWidth,
  borderRadius = '0.375rem',
  padding = '1.5rem',
  margin,
  boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  show: initialShow
}: ContextualCTAProps) {
  const [isVisible, setIsVisible] = useState(initialShow !== undefined ? initialShow : false);
  const [hasShown, setHasShown] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const ctaRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { persona } = usePersona();
  const { animationsEnabled, reducedMotion } = useAnimation();

  // Check if the CTA has been shown before
  useEffect(() => {
    if (typeof window !== 'undefined' && showOnce) {
      const shownCTAs = localStorage.getItem('shownCTAs');
      if (shownCTAs) {
        const ctas = JSON.parse(shownCTAs);
        if (ctas.includes(ctaId)) {
          setHasShown(true);
        }
      }
    }
  }, [showOnce, ctaId]);

  // Handle external show prop changes
  useEffect(() => {
    if (initialShow !== undefined) {
      setIsVisible(initialShow);
    }
  }, [initialShow]);

  // Handle scroll trigger
  useEffect(() => {
    if (trigger === 'scroll' && !hasShown) {
      const handleScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentPosition = window.scrollY / scrollHeight;
        
        setScrollPosition(currentPosition);
        
        if (currentPosition >= scrollThreshold && !isVisible) {
          setIsVisible(true);
          markAsShown();
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [trigger, scrollThreshold, isVisible, hasShown]);

  // Handle time trigger
  useEffect(() => {
    if (trigger === 'time' && !hasShown && !isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        markAsShown();
      }, timeDelay * 1000);

      return () => clearTimeout(timer);
    }
  }, [trigger, timeDelay, isVisible, hasShown]);

  // Handle exit intent trigger
  useEffect(() => {
    if (trigger === 'exit-intent' && !hasShown && !isVisible) {
      const handleExitIntent = (e: MouseEvent) => {
        if (e.clientY <= 0 && !isVisible) {
          setIsVisible(true);
          markAsShown();
        }
      };

      document.addEventListener('mouseleave', handleExitIntent);
      return () => document.removeEventListener('mouseleave', handleExitIntent);
    }
  }, [trigger, isVisible, hasShown]);

  // Handle inactivity trigger
  useEffect(() => {
    if (trigger === 'inactivity' && !hasShown && !isVisible) {
      const resetInactivityTimer = () => {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
        
        setIsInactive(false);
        
        inactivityTimerRef.current = setTimeout(() => {
          setIsInactive(true);
          setIsVisible(true);
          markAsShown();
        }, inactivityTime * 1000);
      };

      // Reset timer on user activity
      const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
      
      activityEvents.forEach(event => {
        document.addEventListener(event, resetInactivityTimer);
      });

      // Initial timer
      resetInactivityTimer();

      return () => {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
        
        activityEvents.forEach(event => {
          document.removeEventListener(event, resetInactivityTimer);
        });
      };
    }
  }, [trigger, inactivityTime, isVisible, hasShown]);

  // Handle escape key for modal
  useEffect(() => {
    if (position === 'modal' && isVisible && closeOnEsc) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [position, isVisible, closeOnEsc]);

  // Handle body scroll for modal
  useEffect(() => {
    if (position === 'modal' && disableBodyScroll) {
      if (isVisible) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (position === 'modal' && disableBodyScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [position, isVisible, disableBodyScroll]);

  // Call onShow when CTA becomes visible
  useEffect(() => {
    if (isVisible && onShow) {
      onShow();
    }
  }, [isVisible, onShow]);

  // Mark CTA as shown
  const markAsShown = () => {
    if (typeof window !== 'undefined' && showOnce) {
      const shownCTAs = localStorage.getItem('shownCTAs');
      if (shownCTAs) {
        const ctas = JSON.parse(shownCTAs);
        if (!ctas.includes(ctaId)) {
          ctas.push(ctaId);
          localStorage.setItem('shownCTAs', JSON.stringify(ctas));
        }
      } else {
        localStorage.setItem('shownCTAs', JSON.stringify([ctaId]));
      }
      setHasShown(true);
    }
  };

  // Handle close
  const handleClose = () => {
    setIsExiting(true);
    
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      
      if (onClose) {
        onClose();
      }
    }, (disableAnimation || !animationsEnabled || reducedMotion) ? 0 : animationDuration * 1000);
  };

  // Handle action click
  const handleActionClick = (action: CTAAction) => {
    if (action.onClick) {
      action.onClick();
    }
    
    if (onActionClick) {
      onActionClick(action);
    }
    
    if (!action.href) {
      handleClose();
    }
  };

  // Check if the CTA should be shown based on persona
  const shouldShow = () => {
    if (!relevantPersonas) return true;
    
    const personas = Array.isArray(relevantPersonas) 
      ? relevantPersonas 
      : [relevantPersonas];
    
    return personas.includes(persona) || personas.includes('general');
  };

  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: backgroundColor || '#3b82f6',
          color: textColor || 'white',
          borderColor: borderColor || '#3b82f6'
        };
      case 'secondary':
        return {
          backgroundColor: backgroundColor || '#9ca3af',
          color: textColor || 'white',
          borderColor: borderColor || '#9ca3af'
        };
      case 'success':
        return {
          backgroundColor: backgroundColor || '#10b981',
          color: textColor || 'white',
          borderColor: borderColor || '#10b981'
        };
      case 'danger':
        return {
          backgroundColor: backgroundColor || '#ef4444',
          color: textColor || 'white',
          borderColor: borderColor || '#ef4444'
        };
      case 'warning':
        return {
          backgroundColor: backgroundColor || '#f59e0b',
          color: textColor || 'white',
          borderColor: borderColor || '#f59e0b'
        };
      case 'info':
        return {
          backgroundColor: backgroundColor || '#3b82f6',
          color: textColor || 'white',
          borderColor: borderColor || '#3b82f6'
        };
      default:
        return {
          backgroundColor: backgroundColor || '#3b82f6',
          color: textColor || 'white',
          borderColor: borderColor || '#3b82f6'
        };
    }
  };

  // Get position-specific styles
  const getPositionStyles = () => {
    switch (position) {
      case 'inline':
        return {
          position: 'relative' as const,
          width: width || '100%',
          maxWidth: maxWidth
        };
      case 'floating':
        return {
          position: 'fixed' as const,
          width: width || 'auto',
          maxWidth: maxWidth,
          ...getFloatingPositionStyles()
        };
      case 'modal':
        return {
          position: 'fixed' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: width || 'auto',
          maxWidth: maxWidth
        };
      default:
        return {
          position: 'relative' as const,
          width: width || '100%',
          maxWidth: maxWidth
        };
    }
  };

  // Get floating position styles
  const getFloatingPositionStyles = () => {
    const { x = 20, y = 20 } = floatingOffset;
    
    switch (floatingPosition) {
      case 'top-left':
        return {
          top: `${y}px`,
          left: `${x}px`
        };
      case 'top-right':
        return {
          top: `${y}px`,
          right: `${x}px`
        };
      case 'bottom-left':
        return {
          bottom: `${y}px`,
          left: `${x}px`
        };
      case 'bottom-right':
        return {
          bottom: `${y}px`,
          right: `${x}px`
        };
      case 'center':
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
      default:
        return {
          bottom: `${y}px`,
          right: `${x}px`
        };
    }
  };

  // Get animation variants
  const getAnimationVariants = () => {
    if (disableAnimation || !animationsEnabled || reducedMotion) {
      return {
        hidden: {},
        visible: {},
        exit: {}
      };
    }

    switch (position) {
      case 'inline':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: animationDuration }
          },
          exit: { 
            opacity: 0, 
            y: 20,
            transition: { duration: animationDuration / 2 }
          }
        };
      case 'floating':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: animationDuration }
          },
          exit: { 
            opacity: 0, 
            scale: 0.9,
            transition: { duration: animationDuration / 2 }
          }
        };
      case 'modal':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: animationDuration }
          },
          exit: { 
            opacity: 0, 
            scale: 0.8,
            transition: { duration: animationDuration / 2 }
          }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { duration: animationDuration }
          },
          exit: { 
            opacity: 0,
            transition: { duration: animationDuration / 2 }
          }
        };
    }
  };

  // Get button variant styles
  const getButtonVariantStyles = (action: CTAAction) => {
    const variant = action.variant || (action.isPrimary ? 'primary' : 'secondary');
    
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          ':hover': {
            backgroundColor: '#2563eb'
          }
        };
      case 'secondary':
        return {
          backgroundColor: '#9ca3af',
          color: 'white',
          border: 'none',
          ':hover': {
            backgroundColor: '#6b7280'
          }
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#3b82f6',
          border: '1px solid #3b82f6',
          ':hover': {
            backgroundColor: '#eff6ff'
          }
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '#3b82f6',
          border: 'none',
          ':hover': {
            backgroundColor: '#eff6ff'
          }
        };
      default:
        return {
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          ':hover': {
            backgroundColor: '#2563eb'
          }
        };
    }
  };

  // Get button size styles
  const getButtonSizeStyles = (action: CTAAction) => {
    const size = action.size || 'md';
    
    switch (size) {
      case 'sm':
        return {
          padding: '0.375rem 0.75rem',
          fontSize: '0.875rem'
        };
      case 'md':
        return {
          padding: '0.5rem 1rem',
          fontSize: '1rem'
        };
      case 'lg':
        return {
          padding: '0.625rem 1.25rem',
          fontSize: '1.125rem'
        };
      default:
        return {
          padding: '0.5rem 1rem',
          fontSize: '1rem'
        };
    }
  };

  // If the CTA should not be shown based on persona, don't render it
  if (!shouldShow()) {
    return null;
  }

  // If the CTA has been shown before and showOnce is true, don't render it
  if (showOnce && hasShown && trigger !== 'none') {
    return null;
  }

  // If the CTA is not visible, don't render it
  if (!isVisible && trigger !== 'none') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop for modal */}
          {position === 'modal' && showBackdrop && (
            <motion.div
              className="contextual-cta-backdrop"
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
              onClick={closeOnClickOutside ? handleClose : undefined}
            />
          )}
          
          {/* CTA */}
          <motion.div
            ref={ctaRef}
            className={`contextual-cta ${className} contextual-cta-${position} contextual-cta-${variant}`}
            style={{
              ...getPositionStyles(),
              ...getVariantStyles(),
              borderWidth: borderWidth || '0',
              borderStyle: 'solid',
              borderRadius,
              padding,
              margin,
              boxShadow,
              zIndex
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={getAnimationVariants()}
          >
            {/* Close Button */}
            {showCloseButton && (
              <button
                className="contextual-cta-close"
                onClick={handleClose}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'inherit',
                  fontSize: '1.25rem',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.7,
                  transition: 'opacity 0.2s ease-in-out'
                }}
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
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
            
            {/* Image */}
            {image && (
              <div 
                className="contextual-cta-image"
                style={{
                  marginBottom: imagePosition === 'top' ? '1rem' : 0,
                  marginTop: imagePosition === 'bottom' ? '1rem' : 0,
                  marginRight: imagePosition === 'left' ? '1rem' : 0,
                  marginLeft: imagePosition === 'right' ? '1rem' : 0,
                  order: 
                    imagePosition === 'top' ? -1 :
                    imagePosition === 'bottom' ? 1 :
                    0
                }}
              >
                <img
                  src={image}
                  alt={imageAlt}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    display: 'block',
                    maxWidth: '100%'
                  }}
                />
              </div>
            )}
            
            {/* Content */}
            <div className="contextual-cta-content">
              {/* Icon and Title */}
              <div 
                className="contextual-cta-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}
              >
                {icon && (
                  <div 
                    className="contextual-cta-icon"
                    style={{
                      marginRight: '0.5rem'
                    }}
                  >
                    {icon}
                  </div>
                )}
                
                <h3 
                  className="contextual-cta-title"
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: '1.25rem',
                    fontWeight: 'bold'
                  }}
                >
                  {title}
                </h3>
              </div>
              
              {/* Description */}
              {description && (
                <div 
                  className="contextual-cta-description"
                  style={{
                    marginBottom: '1rem'
                  }}
                >
                  <p style={{ margin: 0, padding: 0 }}>{description}</p>
                </div>
              )}
              
              {/* Actions */}
              <div 
                className="contextual-cta-actions"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '1rem'
                }}
              >
                {actions.map((action, index) => (
                  <button
                    key={index}
                    className={`contextual-cta-action ${action.isPrimary ? 'contextual-cta-action-primary' : 'contextual-cta-action-secondary'}`}
                    onClick={() => handleActionClick(action)}
                    disabled={action.disabled || action.isLoading}
                    style={{
                      ...getButtonVariantStyles(action),
                      ...getButtonSizeStyles(action),
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      borderRadius: '0.25rem',
                      fontWeight: 500,
                      cursor: action.disabled ? 'not-allowed' : 'pointer',
                      opacity: action.disabled ? 0.6 : 1,
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    {action.isLoading ? (
                      <>
                        <svg
                          className="animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 6v6l4 2"></path>
                        </svg>
                        <span>{action.loadingText || 'Loading...'}</span>
                      </>
                    ) : (
                      <>
                        {action.icon && <span className="contextual-cta-action-icon">{action.icon}</span>}
                        <span>{action.label}</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}