import { ReactNode, useState, useEffect } from 'react';
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
  const [isVisible, setIsVisible] = useState(initialShow !== undefined ? initialShow : true);
  const { persona } = usePersona();
  const { animationsEnabled, reducedMotion } = useAnimation();

  // Handle external show prop changes
  useEffect(() => {
    if (initialShow !== undefined) {
      setIsVisible(initialShow);
    }
  }, [initialShow]);

  // Handle close
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  // Handle action click
  const handleActionClick = (action: CTAAction) => {
    if (action.onClick) {
      action.onClick();
    }
    
    if (onActionClick) {
      onActionClick(action);
    }
  };

  // Simplified version for testing
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <div className={`contextual-cta ${className}`} data-testid="contextual-cta">
          <div className="contextual-cta-content">
            <h3>{title}</h3>
            {description && <p>{description}</p>}
            <div className="contextual-cta-actions">
              {actions.map((action, index) => (
                action.href ? (
                  <a
                    key={index}
                    href={action.href}
                    onClick={() => handleActionClick(action)}
                    className={`contextual-cta-action ${action.isPrimary ? 'primary' : 'secondary'}`}
                    role="link"
                  >
                    {action.label}
                  </a>
                ) : (
                  <button
                    key={index}
                    onClick={() => handleActionClick(action)}
                    className={`contextual-cta-action ${action.isPrimary ? 'primary' : 'secondary'}`}
                  >
                    {action.label}
                  </button>
                )
              ))}
            </div>
            {showCloseButton && (
              <button 
                className="contextual-cta-close" 
                onClick={handleClose}
                aria-label="Close"
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}