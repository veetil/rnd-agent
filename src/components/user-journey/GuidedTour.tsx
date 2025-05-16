import { ReactNode, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from './PersonaContext';
import { useAnimation } from '../animations/AnimationContext';

export type TourStepPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TourStep {
  /** The target element selector */
  target: string;
  /** The title of the step */
  title: string;
  /** The content of the step */
  content: string;
  /** The position of the step */
  position?: TourStepPosition;
  /** Whether to highlight the target element */
  highlight?: boolean;
  /** The personas this step is relevant for */
  relevantPersonas?: string | string[];
  /** The delay before showing this step in seconds */
  delay?: number;
  /** Whether to scroll to this step */
  scrollTo?: boolean;
  /** The offset for the step position */
  offset?: { x?: number; y?: number };
  /** The width of the step */
  width?: number | string;
  /** The z-index of the step */
  zIndex?: number;
  /** Whether to show the step */
  show?: boolean;
  /** Custom render function for the step */
  render?: (step: TourStep, onNext: () => void, onPrev: () => void, onClose: () => void) => ReactNode;
}

export interface GuidedTourProps {
  /** The steps of the tour */
  steps: TourStep[];
  /** Whether the tour is active */
  isActive?: boolean;
  /** The ID of the tour */
  tourId: string;
  /** Whether to show the tour only once */
  showOnce?: boolean;
  /** The callback when the tour is closed */
  onClose?: () => void;
  /** The callback when the tour is completed */
  onComplete?: () => void;
  /** The callback when a step is shown */
  onStepShown?: (step: TourStep, index: number) => void;
  /** The callback when a step is hidden */
  onStepHidden?: (step: TourStep, index: number) => void;
  /** Whether to show the progress indicator */
  showProgress?: boolean;
  /** Whether to show step numbers */
  showStepNumbers?: boolean;
  /** The labels for the tour */
  labels?: {
    next?: string;
    prev?: string;
    skip?: string;
    done?: string;
  };
  /** The theme of the tour */
  theme?: 'light' | 'dark' | 'auto';
  /** The z-index of the tour */
  zIndex?: number;
  /** Whether to mask the rest of the page */
  mask?: boolean;
  /** The mask color */
  maskColor?: string;
  /** The mask opacity */
  maskOpacity?: number;
  /** The highlight color */
  highlightColor?: string;
  /** The highlight padding */
  highlightPadding?: number;
  /** The animation duration in seconds */
  animationDuration?: number;
  /** Whether to disable the animation */
  disableAnimation?: boolean;
  /** Whether to close the tour when clicking outside */
  closeOnClickOutside?: boolean;
  /** Whether to close the tour when pressing escape */
  closeOnEsc?: boolean;
  /** Whether to disable body scroll when the tour is active */
  disableBodyScroll?: boolean;
  /** Whether to show the tour on mobile */
  showOnMobile?: boolean;
  /** The breakpoint for mobile */
  mobileBreakpoint?: number;
  /** The offset for the step position */
  stepOffset?: number;
  /** The class name for the tour */
  className?: string;
  /** The class name for the step */
  stepClassName?: string;
  /** The class name for the highlight */
  highlightClassName?: string;
  /** The class name for the mask */
  maskClassName?: string;
}

export interface TourButtonProps {
  /** The ID of the tour */
  tourId: string;
  /** The steps of the tour */
  steps: TourStep[];
  /** The text of the button */
  text?: string;
  /** The icon of the button */
  icon?: ReactNode;
  /** The variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** The size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the button only once */
  showOnce?: boolean;
  /** The callback when the tour is started */
  onStart?: () => void;
  /** The callback when the tour is completed */
  onComplete?: () => void;
  /** The callback when the tour is closed */
  onClose?: () => void;
  /** The class name for the button */
  className?: string;
  /** Whether to disable the button */
  disabled?: boolean;
  /** The tooltip text */
  tooltip?: string;
  /** Whether to show the tooltip */
  showTooltip?: boolean;
  /** The position of the tooltip */
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** The personas this button is relevant for */
  relevantPersonas?: string | string[];
}

/**
 * Component for guided tours
 * Provides step-by-step guidance for users
 */
export function GuidedTour({
  steps,
  isActive = false,
  tourId,
  showOnce = true,
  onClose,
  onComplete,
  onStepShown,
  onStepHidden,
  showProgress = true,
  showStepNumbers = true,
  labels = {
    next: 'Next',
    prev: 'Previous',
    skip: 'Skip',
    done: 'Done'
  },
  theme = 'light',
  zIndex = 1000,
  mask = true,
  maskColor = '#000000',
  maskOpacity = 0.5,
  highlightColor = '#3b82f6',
  highlightPadding = 8,
  animationDuration = 0.3,
  disableAnimation = false,
  closeOnClickOutside = true,
  closeOnEsc = true,
  disableBodyScroll = true,
  showOnMobile = true,
  mobileBreakpoint = 768,
  stepOffset = 12,
  className = '',
  stepClassName = '',
  highlightClassName = '',
  maskClassName = ''
}: GuidedTourProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);
  const [targetElement, setTargetElement] = useState<Element | null>(null);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });
  const tourRef = useRef<HTMLDivElement>(null);
  const { persona } = usePersona();
  const { animationsEnabled, reducedMotion } = useAnimation();

  // Check if the tour has been completed before
  useEffect(() => {
    if (typeof window !== 'undefined' && showOnce) {
      const completedTours = localStorage.getItem('completedTours');
      if (completedTours) {
        const tours = JSON.parse(completedTours);
        if (tours.includes(tourId)) {
          setHasCompletedTour(true);
        }
      }
    }
  }, [showOnce, tourId]);

  // Check if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [mobileBreakpoint]);

  // Disable body scroll when the tour is active
  useEffect(() => {
    if (typeof document !== 'undefined' && disableBodyScroll) {
      if (isActive) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (typeof document !== 'undefined' && disableBodyScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [isActive, disableBodyScroll]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isActive && closeOnEsc) {
        handleClose();
      }
    };

    if (typeof window !== 'undefined' && isActive) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [isActive, closeOnEsc]);

  // Filter steps based on persona
  const filteredSteps = steps.filter(step => {
    if (!step.relevantPersonas) return true;
    
    const relevantPersonas = Array.isArray(step.relevantPersonas) 
      ? step.relevantPersonas 
      : [step.relevantPersonas];
    
    return relevantPersonas.includes(persona) || relevantPersonas.includes('general');
  });

  // Get current step
  const currentStep = filteredSteps[currentStepIndex];

  // Find target element and calculate its position
  useEffect(() => {
    if (isActive && currentStep && typeof document !== 'undefined') {
      const element = document.querySelector(currentStep.target);
      if (element) {
        setTargetElement(element);
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);

        // Scroll to element if needed
        if (currentStep.scrollTo !== false && typeof element.scrollIntoView === 'function') {
          try {
            element.scrollIntoView({
              behavior: reducedMotion ? 'auto' : 'smooth',
              block: 'center'
            });
          } catch (error) {
            console.warn('Failed to scroll to element:', error);
          }
        }

        // Call onStepShown callback
        if (onStepShown) {
          onStepShown(currentStep, currentStepIndex);
        }
      }
    }
  }, [isActive, currentStep, currentStepIndex, onStepShown, reducedMotion]);

  // Update target element position on scroll and resize
  useEffect(() => {
    const updateTargetRect = () => {
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setTargetRect(rect);
      }
    };

    if (typeof window !== 'undefined' && isActive && targetElement) {
      window.addEventListener('scroll', updateTargetRect);
      window.addEventListener('resize', updateTargetRect);
      return () => {
        window.removeEventListener('scroll', updateTargetRect);
        window.removeEventListener('resize', updateTargetRect);
      };
    }
  }, [isActive, targetElement]);

  // Handle next step
  const handleNext = () => {
    if (currentStepIndex < filteredSteps.length - 1) {
      // Call onStepHidden callback
      if (onStepHidden && currentStep) {
        onStepHidden(currentStep, currentStepIndex);
      }
      
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      handleComplete();
    }
  };

  // Handle previous step
  const handlePrev = () => {
    if (currentStepIndex > 0) {
      // Call onStepHidden callback
      if (onStepHidden && currentStep) {
        onStepHidden(currentStep, currentStepIndex);
      }
      
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // Handle close
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  // Handle complete
  const handleComplete = () => {
    // Mark tour as completed
    if (typeof window !== 'undefined' && showOnce) {
      const completedTours = localStorage.getItem('completedTours');
      if (completedTours) {
        const tours = JSON.parse(completedTours);
        if (!tours.includes(tourId)) {
          tours.push(tourId);
          localStorage.setItem('completedTours', JSON.stringify(tours));
        }
      } else {
        localStorage.setItem('completedTours', JSON.stringify([tourId]));
      }
      setHasCompletedTour(true);
    }

    if (onComplete) {
      onComplete();
    }
  };

  // Calculate step position
  const getStepPosition = () => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const position = currentStep?.position || 'bottom';
    const offset = currentStep?.offset || { x: 0, y: 0 };
    const offsetX = offset.x || 0;
    const offsetY = offset.y || 0;

    switch (position) {
      case 'top':
        return {
          bottom: `${window.innerHeight - targetRect.top + stepOffset + offsetY}px`,
          left: `${targetRect.left + targetRect.width / 2 + offsetX}px`,
          transform: 'translateX(-50%)'
        };
      case 'bottom':
        return {
          top: `${targetRect.bottom + stepOffset + offsetY}px`,
          left: `${targetRect.left + targetRect.width / 2 + offsetX}px`,
          transform: 'translateX(-50%)'
        };
      case 'left':
        return {
          top: `${targetRect.top + targetRect.height / 2 + offsetY}px`,
          right: `${window.innerWidth - targetRect.left + stepOffset + offsetX}px`,
          transform: 'translateY(-50%)'
        };
      case 'right':
        return {
          top: `${targetRect.top + targetRect.height / 2 + offsetY}px`,
          left: `${targetRect.right + stepOffset + offsetX}px`,
          transform: 'translateY(-50%)'
        };
      default:
        return {
          top: `${targetRect.bottom + stepOffset + offsetY}px`,
          left: `${targetRect.left + targetRect.width / 2 + offsetX}px`,
          transform: 'translateX(-50%)'
        };
    }
  };

  // Calculate highlight position
  const getHighlightPosition = () => {
    if (!targetRect) return { top: 0, left: 0, width: 0, height: 0 };

    return {
      top: targetRect.top - highlightPadding,
      left: targetRect.left - highlightPadding,
      width: targetRect.width + highlightPadding * 2,
      height: targetRect.height + highlightPadding * 2
    };
  };

  // Get animation variants
  const getAnimationVariants = () => {
    if (disableAnimation || !animationsEnabled || reducedMotion) {
      return {
        hidden: {},
        visible: {}
      };
    }

    return {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: animationDuration }
      }
    };
  };

  // If the tour is not active or has been completed, don't render anything
  if (!isActive || (showOnce && hasCompletedTour) || !showOnMobile && isMobile) {
    return null;
  }

  // If there are no steps or no current step, don't render anything
  if (!filteredSteps.length || !currentStep) {
    return null;
  }

  return (
    <div 
      className={`guided-tour ${className}`}
      style={{ zIndex }}
      ref={tourRef}
    >
      {/* Mask */}
      {mask && (
        <div 
          className={`guided-tour-mask ${maskClassName}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: maskColor,
            opacity: maskOpacity,
            zIndex: zIndex - 2
          }}
          onClick={closeOnClickOutside ? handleClose : undefined}
        />
      )}

      {/* Highlight */}
      {currentStep.highlight && targetRect && (
        <div 
          className={`guided-tour-highlight ${highlightClassName}`}
          style={{
            position: 'fixed',
            ...getHighlightPosition(),
            boxShadow: `0 0 0 9999px ${maskColor}${Math.round(maskOpacity * 255).toString(16).padStart(2, '0')}`,
            borderRadius: '4px',
            border: `2px solid ${highlightColor}`,
            zIndex: zIndex - 1,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Step */}
      <AnimatePresence>
        <motion.div 
          className={`guided-tour-step ${stepClassName}`}
          style={{
            position: 'fixed',
            ...getStepPosition(),
            zIndex,
            maxWidth: currentStep.width || '300px',
            backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
            color: theme === 'dark' ? 'white' : '#1f2937',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '1rem',
            width: isMobile ? 'calc(100% - 2rem)' : 'auto',
            maxHeight: isMobile ? 'calc(100% - 6rem)' : 'auto',
            overflowY: 'auto'
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={getAnimationVariants()}
          key={`step-${currentStepIndex}`}
        >
          {/* Custom render function */}
          {currentStep.render ? (
            currentStep.render(currentStep, handleNext, handlePrev, handleClose)
          ) : (
            <>
              {/* Header */}
              <div className="guided-tour-step-header" style={{ marginBottom: '0.5rem' }}>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: 'bold',
                  margin: 0,
                  padding: 0
                }}>
                  {showStepNumbers && (
                    <span style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '1.5rem',
                      height: '1.5rem',
                      backgroundColor: highlightColor,
                      color: 'white',
                      borderRadius: '50%',
                      fontSize: '0.875rem',
                      marginRight: '0.5rem'
                    }}>
                      {currentStepIndex + 1}
                    </span>
                  )}
                  {currentStep.title}
                </h3>
              </div>

              {/* Content */}
              <div className="guided-tour-step-content" style={{ marginBottom: '1rem' }}>
                <p style={{ margin: 0, padding: 0 }}>{currentStep.content}</p>
              </div>

              {/* Footer */}
              <div 
                className="guided-tour-step-footer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                {/* Progress */}
                {showProgress && (
                  <div className="guided-tour-step-progress">
                    <span style={{ fontSize: '0.875rem', color: theme === 'dark' ? '#9ca3af' : '#6b7280' }}>
                      {currentStepIndex + 1} / {filteredSteps.length}
                    </span>
                  </div>
                )}

                {/* Buttons */}
                <div 
                  className="guided-tour-step-buttons"
                  style={{
                    display: 'flex',
                    gap: '0.5rem'
                  }}
                >
                  {currentStepIndex > 0 && (
                    <button
                      onClick={handlePrev}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.25rem',
                        backgroundColor: 'transparent',
                        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 500
                      }}
                    >
                      {labels.prev}
                    </button>
                  )}

                  <button
                    onClick={handleClose}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      backgroundColor: 'transparent',
                      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    {labels.skip}
                  </button>

                  <button
                    onClick={handleNext}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.25rem',
                      backgroundColor: highlightColor,
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: 500
                    }}
                  >
                    {currentStepIndex === filteredSteps.length - 1 ? labels.done : labels.next}
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/**
 * Component for tour button
 * Provides a button to start a guided tour
 */
export function TourButton({
  tourId,
  steps,
  text = 'Start Tour',
  icon,
  variant = 'primary',
  size = 'md',
  showOnce = true,
  onStart,
  onComplete,
  onClose,
  className = '',
  disabled = false,
  tooltip,
  showTooltip = false,
  tooltipPosition = 'top',
  relevantPersonas
}: TourButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const [hasCompletedTour, setHasCompletedTour] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const { persona } = usePersona();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Check if the tour has been completed before
  useEffect(() => {
    if (typeof window !== 'undefined' && showOnce) {
      const completedTours = localStorage.getItem('completedTours');
      if (completedTours) {
        const tours = JSON.parse(completedTours);
        if (tours.includes(tourId)) {
          setHasCompletedTour(true);
        }
      }
    }
  }, [showOnce, tourId]);

  // Check if the button should be shown based on persona
  const shouldShow = () => {
    if (!relevantPersonas) return true;
    
    const personas = Array.isArray(relevantPersonas) 
      ? relevantPersonas 
      : [relevantPersonas];
    
    return personas.includes(persona) || personas.includes('general');
  };

  // Handle start
  const handleStart = () => {
    setIsActive(true);
    if (onStart) {
      onStart();
    }
  };

  // Handle complete
  const handleComplete = () => {
    setIsActive(false);
    if (onComplete) {
      onComplete();
    }
  };

  // Handle close
  const handleClose = () => {
    setIsActive(false);
    if (onClose) {
      onClose();
    }
  };

  // Get button styles
  const getButtonStyles = () => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      borderRadius: '0.25rem',
      fontWeight: 500,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'all 0.2s ease-in-out'
    };

    // Size styles
    const sizeStyles = {
      sm: {
        padding: '0.375rem 0.75rem',
        fontSize: '0.875rem'
      },
      md: {
        padding: '0.5rem 1rem',
        fontSize: '1rem'
      },
      lg: {
        padding: '0.625rem 1.25rem',
        fontSize: '1.125rem'
      }
    };

    // Variant styles
    const variantStyles = {
      primary: {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        ':hover': {
          backgroundColor: '#2563eb'
        }
      },
      secondary: {
        backgroundColor: '#9ca3af',
        color: 'white',
        border: 'none',
        ':hover': {
          backgroundColor: '#6b7280'
        }
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#3b82f6',
        border: '1px solid #3b82f6',
        ':hover': {
          backgroundColor: '#eff6ff'
        }
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#3b82f6',
        border: 'none',
        ':hover': {
          backgroundColor: '#eff6ff'
        }
      }
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant]
    };
  };

  // If the tour has been completed and showOnce is true, don't render the button
  if (showOnce && hasCompletedTour) {
    return null;
  }

  // If the button should not be shown based on persona, don't render it
  if (!shouldShow()) {
    return null;
  }

  return (
    <>
      <button
        ref={buttonRef}
        className={`tour-button ${className}`}
        onClick={handleStart}
        disabled={disabled}
        style={getButtonStyles()}
        onMouseEnter={() => showTooltip && setIsTooltipVisible(true)}
        onMouseLeave={() => showTooltip && setIsTooltipVisible(false)}
        aria-label={text}
      >
        {icon && <span className="tour-button-icon">{icon}</span>}
        <span className="tour-button-text">{text}</span>
      </button>

      {/* Tooltip */}
      {showTooltip && isTooltipVisible && tooltip && (
        <div
          className="tour-button-tooltip"
          style={{
            position: 'absolute',
            backgroundColor: '#1f2937',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.875rem',
            zIndex: 1000,
            maxWidth: '200px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            // Position based on tooltipPosition
            ...(tooltipPosition === 'top' && {
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%) translateY(-8px)'
            }),
            ...(tooltipPosition === 'bottom' && {
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%) translateY(8px)'
            }),
            ...(tooltipPosition === 'left' && {
              right: '100%',
              top: '50%',
              transform: 'translateY(-50%) translateX(-8px)'
            }),
            ...(tooltipPosition === 'right' && {
              left: '100%',
              top: '50%',
              transform: 'translateY(-50%) translateX(8px)'
            })
          }}
        >
          {tooltip}
        </div>
      )}

      {/* Tour */}
      <GuidedTour
        steps={steps}
        isActive={isActive}
        tourId={tourId}
        showOnce={showOnce}
        onClose={handleClose}
        onComplete={handleComplete}
      />
    </>
  );
}