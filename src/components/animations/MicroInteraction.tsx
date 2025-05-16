import { ReactNode, CSSProperties } from 'react';
import { motion, MotionProps, Variants } from 'framer-motion';
import { useAnimation as useAnimationContext } from './AnimationContext';

export type MicroInteractionType =
  | 'hover'
  | 'hover-scale'
  | 'hover-lift'
  | 'hover-glow'
  | 'hover-color'
  | 'click-ripple'
  | 'click-bounce'
  | 'focus-outline'
  | 'loading-pulse'
  | 'loading-dots'
  | 'loading-spinner'
  | 'success-checkmark'
  | 'error-shake'
  | 'none';

export interface MicroInteractionProps extends Omit<MotionProps, 'variants'> {
  /** The content to animate */
  children: ReactNode;
  /** The type of micro-interaction to apply */
  type?: MicroInteractionType;
  /** Whether the interaction is active */
  isActive?: boolean;
  /** The duration of the animation in seconds */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Custom variants for the animation */
  variants?: Variants;
  /** Whether to disable the animation */
  disabled?: boolean;
  /** The color for hover-color and hover-glow interactions */
  color?: string;
  /** The scale factor for hover-scale interaction */
  scale?: number;
  /** The lift distance for hover-lift interaction in pixels */
  liftDistance?: number;
  /** The glow intensity for hover-glow interaction */
  glowIntensity?: number;
  /** Whether the element is in a loading state */
  isLoading?: boolean;
  /** Whether the element is in a success state */
  isSuccess?: boolean;
  /** Whether the element is in an error state */
  isError?: boolean;
  /** Callback when animation starts */
  onAnimationStart?: () => void;
  /** Callback when animation completes */
  onAnimationComplete?: () => void;
}

/**
 * Component for micro-interactions on buttons and interactive elements
 */
export function MicroInteraction({
  children,
  type = 'hover-scale',
  isActive = false,
  duration = 0.2,
  className = '',
  style = {},
  variants,
  disabled = false,
  color = '#3b82f6', // blue-500
  scale = 1.05,
  liftDistance = 2,
  glowIntensity = 0.3,
  isLoading = false,
  isSuccess = false,
  isError = false,
  onAnimationStart,
  onAnimationComplete,
  ...motionProps
}: MicroInteractionProps) {
  const { animationsEnabled, reducedMotion, animationSpeed } = useAnimationContext();
  
  // If animations are disabled or reduced motion is preferred, render without animations
  if (!animationsEnabled || reducedMotion || disabled || type === 'none') {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  // Adjust duration based on animation speed
  const adjustedDuration = duration / animationSpeed;

  // Define default variants based on interaction type
  const getDefaultVariants = (): Variants => {
    const initial: Record<string, any> = {};
    const hover: Record<string, any> = {};
    const tap: Record<string, any> = {};
    const focus: Record<string, any> = {};
    const loading: Record<string, any> = {};
    const success: Record<string, any> = {};
    const error: Record<string, any> = {};
    
    switch (type) {
      case 'hover-scale':
        hover.scale = scale;
        tap.scale = scale * 0.95;
        break;
      case 'hover-lift':
        hover.y = -liftDistance;
        hover.boxShadow = `0 ${liftDistance * 2}px ${liftDistance * 3}px rgba(0, 0, 0, 0.1)`;
        tap.y = -liftDistance / 2;
        break;
      case 'hover-glow':
        hover.boxShadow = `0 0 ${glowIntensity * 15}px ${color}`;
        break;
      case 'hover-color':
        hover.backgroundColor = color;
        hover.color = '#ffffff';
        break;
      case 'click-ripple':
        tap.scale = 0.95;
        break;
      case 'click-bounce':
        tap.scale = 0.9;
        break;
      case 'focus-outline':
        focus.boxShadow = `0 0 0 2px ${color}`;
        break;
      case 'loading-pulse':
        loading.opacity = [1, 0.6, 1];
        loading.transition = {
          repeat: Infinity,
          duration: adjustedDuration * 2
        };
        break;
      case 'loading-dots':
        // This is handled in the render function
        break;
      case 'loading-spinner':
        // This is handled in the render function
        break;
      case 'success-checkmark':
        success.scale = 1.05;
        success.backgroundColor = '#10b981'; // green-500
        success.color = '#ffffff';
        break;
      case 'error-shake':
        error.x = [0, -5, 5, -5, 5, 0];
        error.transition = {
          duration: adjustedDuration,
          ease: 'easeInOut'
        };
        error.backgroundColor = '#ef4444'; // red-500
        error.color = '#ffffff';
        break;
      default:
        break;
    }
    
    return {
      initial,
      hover,
      tap,
      focus,
      loading,
      success,
      error
    };
  };

  // Use custom variants if provided, otherwise use default
  const animationVariants = variants || getDefaultVariants();

  // Determine the initial animation state
  const getInitialState = () => {
    if (isLoading) return 'loading';
    if (isSuccess) return 'success';
    if (isError) return 'error';
    if (isActive) return 'hover';
    return 'initial';
  };

  // Render loading spinner
  const renderLoadingSpinner = () => {
    if (type !== 'loading-spinner' || !isLoading) return null;
    
    return (
      <motion.div
        className="loading-spinner absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: adjustedDuration / 2 }}
      >
        <motion.div
          className="spinner"
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderTopColor: '#ffffff',
            boxSizing: 'border-box'
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.div>
    );
  };

  // Render loading dots
  const renderLoadingDots = () => {
    if (type !== 'loading-dots' || !isLoading) return null;
    
    return (
      <motion.div
        className="loading-dots absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: adjustedDuration / 2 }}
      >
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="dot"
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                backgroundColor: '#ffffff'
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </motion.div>
    );
  };

  // Render success checkmark
  const renderSuccessCheckmark = () => {
    if (type !== 'success-checkmark' || !isSuccess) return null;
    
    return (
      <motion.div
        className="success-checkmark absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: adjustedDuration }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.3334 4L6.00002 11.3333L2.66669 8"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    );
  };

  // Render error icon
  const renderErrorIcon = () => {
    if (type !== 'error-shake' || !isError) return null;
    
    return (
      <motion.div
        className="error-icon absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: adjustedDuration / 2 }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 5V8M8 11H8.01M15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    );
  };

  // Determine if content should be hidden during loading/success/error states
  const shouldHideContent = () => {
    return (
      (isLoading && (type === 'loading-spinner' || type === 'loading-dots')) ||
      (isSuccess && type === 'success-checkmark') ||
      (isError && type === 'error-shake')
    );
  };

  // Filter out Framer Motion specific props from motionProps to avoid DOM warnings
  const {
    whileHover,
    whileTap,
    whileFocus,
    whileDrag,
    whileInView,
    ...filteredMotionProps
  } = motionProps;

  return (
    <motion.div
      className={`micro-interaction ${className}`}
      style={{
        ...style,
        position: 'relative',
        display: 'inline-block',
        cursor: disabled ? 'default' : 'pointer',
        willChange: 'transform, opacity, box-shadow',
        transition: `all ${adjustedDuration}s ease`
      }}
      initial="initial"
      animate={getInitialState()}
      whileHover={!disabled && !isLoading && !isSuccess && !isError ? 'hover' : undefined}
      whileTap={!disabled && !isLoading && !isSuccess && !isError ? 'tap' : undefined}
      whileFocus={!disabled && !isLoading && !isSuccess && !isError ? 'focus' : undefined}
      variants={animationVariants}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      data-testid="micro-interaction"
      data-state={isActive ? 'hover' : 'normal'}
      data-reduced-motion={reducedMotion ? 'true' : 'false'}
      {...filteredMotionProps}
    >
      <div style={{ opacity: shouldHideContent() ? 0 : 1 }}>
        {children}
      </div>
      
      {renderLoadingSpinner()}
      {renderLoadingDots()}
      {renderSuccessCheckmark()}
      {renderErrorIcon()}
      
      {type === 'click-ripple' && (
        <motion.div
          className="ripple-effect"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none'
          }}
          initial={{ opacity: 0 }}
          whileTap={{
            opacity: 0.3,
            scale: 1.1,
            transition: { duration: adjustedDuration }
          }}
        />
      )}
    </motion.div>
  );
}

/**
 * Component for button micro-interactions
 */
export interface AnimatedButtonProps extends Omit<MicroInteractionProps, 'children'> {
  /** The button text */
  text: string;
  /** The button icon */
  icon?: ReactNode;
  /** The button type */
  buttonType?: 'button' | 'submit' | 'reset';
  /** The button variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  /** The button size */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Whether the button is in a success state */
  isSuccess?: boolean;
  /** Whether the button is in an error state */
  isError?: boolean;
  /** The onClick handler */
  onClick?: () => void;
  /** The icon position */
  iconPosition?: 'left' | 'right';
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
}

/**
 * Component for animated buttons with micro-interactions
 */
export function AnimatedButton({
  text,
  icon,
  buttonType = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  isSuccess = false,
  isError = false,
  onClick,
  iconPosition = 'left',
  className = '',
  style = {},
  type = 'hover-scale',
  ...microInteractionProps
}: AnimatedButtonProps) {
  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      case 'outline':
        return 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50';
      case 'ghost':
        return 'bg-transparent hover:bg-gray-100 text-gray-700';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  // Get size-specific styles
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-3 py-1';
      case 'md':
        return 'text-base px-4 py-2';
      case 'lg':
        return 'text-lg px-6 py-3';
      default:
        return 'text-base px-4 py-2';
    }
  };

  return (
    <MicroInteraction
      type={type}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
      disabled={disabled}
      className={`
        animated-button
        ${getVariantStyles()}
        ${getSizeStyles()}
        rounded-md font-medium inline-flex items-center justify-center
        transition-colors duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={style}
      {...microInteractionProps}
    >
      <button
        type={buttonType}
        disabled={disabled || isLoading}
        onClick={onClick}
        className="flex items-center justify-center w-full h-full"
      >
        {iconPosition === 'left' && icon && (
          <span className="mr-2">{icon}</span>
        )}
        
        {text}
        
        {iconPosition === 'right' && icon && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    </MicroInteraction>
  );
}

/**
 * Component for animated icons with micro-interactions
 */
export interface AnimatedIconProps extends Omit<MicroInteractionProps, 'children'> {
  /** The icon to animate */
  icon: ReactNode;
  /** The icon size */
  size?: 'sm' | 'md' | 'lg' | number;
  /** Whether the icon is disabled */
  disabled?: boolean;
  /** The onClick handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
}

/**
 * Component for animated icons with micro-interactions
 */
export function AnimatedIcon({
  icon,
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  style = {},
  type = 'hover-scale',
  ...microInteractionProps
}: AnimatedIconProps) {
  // Get size-specific styles
  const getSizeStyles = () => {
    if (typeof size === 'number') {
      return {
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size}px`
      };
    }
    
    switch (size) {
      case 'sm':
        return {
          width: '16px',
          height: '16px',
          fontSize: '16px'
        };
      case 'md':
        return {
          width: '24px',
          height: '24px',
          fontSize: '24px'
        };
      case 'lg':
        return {
          width: '32px',
          height: '32px',
          fontSize: '32px'
        };
      default:
        return {
          width: '24px',
          height: '24px',
          fontSize: '24px'
        };
    }
  };

  return (
    <MicroInteraction
      type={type}
      disabled={disabled}
      className={`
        animated-icon
        inline-flex items-center justify-center
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{
        ...getSizeStyles(),
        ...style
      }}
      // @ts-ignore - onClick is a valid prop for motion.div
      onClick={disabled ? undefined : onClick}
      {...microInteractionProps}
    >
      {icon}
    </MicroInteraction>
  );
}