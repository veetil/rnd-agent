import { ReactNode, CSSProperties } from 'react';
import { motion, Variants } from 'framer-motion';
import { useAnimation as useAnimationContext } from './AnimationContext';

export type LoadingAnimationType = 
  | 'spinner' 
  | 'dots' 
  | 'pulse' 
  | 'skeleton' 
  | 'progress' 
  | 'bounce' 
  | 'wave' 
  | 'fade' 
  | 'blur' 
  | 'none';

export interface LoadingAnimationProps {
  /** The type of loading animation to apply */
  type?: LoadingAnimationType;
  /** Whether the animation is active */
  isLoading?: boolean;
  /** The content to show when not loading */
  children?: ReactNode;
  /** The duration of the animation in seconds */
  duration?: number;
  /** The color of the animation */
  color?: string;
  /** The size of the animation */
  size?: 'sm' | 'md' | 'lg' | number;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** Custom variants for the animation */
  variants?: Variants;
  /** Whether to disable the animation */
  disabled?: boolean;
  /** The text to display with the loading animation */
  loadingText?: string;
  /** Whether to show the loading text */
  showText?: boolean;
  /** The width of the skeleton or progress bar */
  width?: string | number;
  /** The height of the skeleton or progress bar */
  height?: string | number;
  /** The progress value for progress bar (0-100) */
  progress?: number;
  /** Whether to show the progress value */
  showProgressValue?: boolean;
  /** The number of skeleton lines */
  lines?: number;
  /** The number of dots in the dots animation */
  dotCount?: number;
  /** Whether to show the animation in a container */
  container?: boolean;
  /** The border radius of the container */
  borderRadius?: string | number;
  /** The background color of the container */
  backgroundColor?: string;
  /** The easing function for the animation */
  easing?: string;
  /** The delay before the animation starts in seconds */
  delay?: number;
}

/**
 * Component for loading animations
 */
export function LoadingAnimation({
  type = 'spinner',
  isLoading = true,
  children,
  duration = 1.2,
  color = '#3b82f6', // blue-500
  size = 'md',
  className = '',
  style = {},
  variants,
  disabled = false,
  loadingText = 'Loading...',
  showText = false,
  width = '100%',
  height,
  progress = 0,
  showProgressValue = false,
  lines = 3,
  dotCount = 3,
  container = false,
  borderRadius = '0.375rem',
  backgroundColor = 'transparent',
  easing = 'easeInOut',
  delay = 0
}: LoadingAnimationProps) {
  const { animationsEnabled, reducedMotion, animationSpeed } = useAnimationContext();
  
  // If animations are disabled or reduced motion is preferred, show a simple loading state
  if (!animationsEnabled || reducedMotion || disabled) {
    if (!isLoading) {
      return <>{children}</>;
    }
    
    return (
      <div 
        className={`loading-animation-simple ${className}`}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color
        }}
      >
        {loadingText}
      </div>
    );
  }

  // If not loading, show children
  if (!isLoading) {
    return <>{children}</>;
  }

  // Adjust duration based on animation speed
  const adjustedDuration = duration / animationSpeed;
  const adjustedDelay = delay / animationSpeed;

  // Get size in pixels
  const getSize = (): number => {
    if (typeof size === 'number') {
      return size;
    }
    
    switch (size) {
      case 'sm':
        return 16;
      case 'md':
        return 24;
      case 'lg':
        return 40;
      default:
        return 24;
    }
  };

  // Get container styles
  const getContainerStyles = (): CSSProperties => {
    if (!container) {
      return {};
    }
    
    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '1rem',
      borderRadius,
      backgroundColor,
      width,
      height: height || 'auto'
    };
  };

  // Render spinner animation
  const renderSpinner = () => {
    const spinnerSize = getSize();
    
    return (
      <div 
        className="loading-spinner"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...getContainerStyles()
        }}
      >
        <motion.div
          style={{
            width: spinnerSize,
            height: spinnerSize,
            borderRadius: '50%',
            border: `2px solid ${color}`,
            borderTopColor: 'transparent',
            boxSizing: 'border-box'
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: adjustedDuration,
            repeat: Infinity,
            ease: 'linear',
            delay: adjustedDelay
          }}
        />
        
        {showText && (
          <div 
            className="loading-text"
            style={{
              marginTop: '0.5rem',
              color,
              fontSize: spinnerSize * 0.5,
              textAlign: 'center'
            }}
          >
            {loadingText}
          </div>
        )}
      </div>
    );
  };

  // Render dots animation
  const renderDots = () => {
    const dotSize = getSize() / 4;
    
    return (
      <div 
        className="loading-dots"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...getContainerStyles()
        }}
      >
        <div style={{ display: 'flex', gap: dotSize / 2 }}>
          {Array.from({ length: dotCount }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                backgroundColor: color
              }}
              animate={{ y: [0, -dotSize * 1.5, 0] }}
              transition={{
                duration: adjustedDuration,
                repeat: Infinity,
                delay: (i * adjustedDuration) / dotCount + adjustedDelay,
                ease: easing
              }}
            />
          ))}
        </div>
        
        {showText && (
          <div 
            className="loading-text"
            style={{
              marginTop: '0.5rem',
              color,
              fontSize: dotSize * 2,
              textAlign: 'center'
            }}
          >
            {loadingText}
          </div>
        )}
      </div>
    );
  };

  // Render pulse animation
  const renderPulse = () => {
    const pulseSize = getSize();
    
    return (
      <div 
        className="loading-pulse"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...getContainerStyles()
        }}
      >
        <motion.div
          style={{
            width: pulseSize,
            height: pulseSize,
            borderRadius: '50%',
            backgroundColor: color
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{
            duration: adjustedDuration,
            repeat: Infinity,
            ease: easing,
            delay: adjustedDelay
          }}
        />
        
        {showText && (
          <div 
            className="loading-text"
            style={{
              marginTop: '0.5rem',
              color,
              fontSize: pulseSize * 0.5,
              textAlign: 'center'
            }}
          >
            {loadingText}
          </div>
        )}
      </div>
    );
  };

  // Render skeleton animation
  const renderSkeleton = () => {
    const skeletonHeight = typeof height === 'number' ? height : 16;
    
    return (
      <div 
        className="loading-skeleton"
        style={{
          width,
          ...getContainerStyles()
        }}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              width: typeof width === 'number' ? 
                `${Math.max(40, 100 - i * 15)}%` : 
                width,
              height: typeof height === 'number' ? 
                skeletonHeight : 
                '1rem',
              borderRadius: '0.25rem',
              backgroundColor: `${color}33`, // 20% opacity
              marginBottom: i < lines - 1 ? '0.5rem' : 0
            }}
            animate={{
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: adjustedDuration,
              repeat: Infinity,
              ease: easing,
              delay: (i * 0.1) + adjustedDelay
            }}
          />
        ))}
        
        {showText && (
          <div 
            className="loading-text"
            style={{
              marginTop: '0.5rem',
              color,
              fontSize: '0.875rem',
              textAlign: 'center'
            }}
          >
            {loadingText}
          </div>
        )}
      </div>
    );
  };

  // Render progress animation
  const renderProgress = () => {
    const progressHeight = typeof height === 'number' ? height : 4;
    const clampedProgress = Math.min(100, Math.max(0, progress));
    
    return (
      <div 
        className="loading-progress"
        style={{
          width,
          ...getContainerStyles()
        }}
      >
        <div
          style={{
            width: '100%',
            height: progressHeight,
            backgroundColor: `${color}33`, // 20% opacity
            borderRadius: progressHeight / 2,
            overflow: 'hidden'
          }}
        >
          <motion.div
            style={{
              height: '100%',
              backgroundColor: color,
              width: `${clampedProgress}%`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${clampedProgress}%` }}
            transition={{
              duration: 0.3,
              ease: 'easeOut'
            }}
          />
        </div>
        
        {showText && (
          <div 
            className="loading-text"
            style={{
              marginTop: '0.5rem',
              color,
              fontSize: '0.875rem',
              textAlign: 'center'
            }}
          >
            {showProgressValue ? `${Math.round(clampedProgress)}% ${loadingText}` : loadingText}
          </div>
        )}
      </div>
    );
  };

  // Render bounce animation
  const renderBounce = () => {
    const bounceSize = getSize() / 3;
    
    return (
      <div 
        className="loading-bounce"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...getContainerStyles()
        }}
      >
        <div style={{ display: 'flex', gap: bounceSize / 2 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: bounceSize,
                height: bounceSize,
                borderRadius: '50%',
                backgroundColor: color
              }}
              animate={{
                y: [0, -20, 0],
                scaleY: [1, 0.8, 1]
              }}
              transition={{
                duration: adjustedDuration / 2,
                repeat: Infinity,
                delay: (i * 0.15) + adjustedDelay,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
        
        {showText && (
          <div 
            className="loading-text"
            style={{
              marginTop: '0.5rem',
              color,
              fontSize: bounceSize * 1.5,
              textAlign: 'center'
            }}
          >
            {loadingText}
          </div>
        )}
      </div>
    );
  };

  // Render wave animation
  const renderWave = () => {
    const waveWidth = typeof width === 'number' ? width : 100;
    const waveHeight = typeof height === 'number' ? height : 40;
    
    return (
      <div 
        className="loading-wave"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...getContainerStyles()
        }}
      >
        <svg
          width={waveWidth}
          height={waveHeight}
          viewBox={`0 0 ${waveWidth} ${waveHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d={`M 0 ${waveHeight / 2} Q ${waveWidth / 4} 0, ${waveWidth / 2} ${waveHeight / 2} T ${waveWidth} ${waveHeight / 2}`}
            stroke={color}
            strokeWidth="2"
            fill="transparent"
            animate={{
              d: [
                `M 0 ${waveHeight / 2} Q ${waveWidth / 4} 0, ${waveWidth / 2} ${waveHeight / 2} T ${waveWidth} ${waveHeight / 2}`,
                `M 0 ${waveHeight / 2} Q ${waveWidth / 4} ${waveHeight}, ${waveWidth / 2} ${waveHeight / 2} T ${waveWidth} ${waveHeight / 2}`,
                `M 0 ${waveHeight / 2} Q ${waveWidth / 4} 0, ${waveWidth / 2} ${waveHeight / 2} T ${waveWidth} ${waveHeight / 2}`
              ]
            }}
            transition={{
              duration: adjustedDuration,
              repeat: Infinity,
              ease: easing,
              delay: adjustedDelay
            }}
          />
        </svg>
        
        {showText && (
          <div 
            className="loading-text"
            style={{
              marginTop: '0.5rem',
              color,
              fontSize: '0.875rem',
              textAlign: 'center'
            }}
          >
            {loadingText}
          </div>
        )}
      </div>
    );
  };

  // Render fade animation
  const renderFade = () => {
    const fadeSize = getSize();
    
    return (
      <div 
        className="loading-fade"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...getContainerStyles()
        }}
      >
        <motion.div
          style={{
            width: fadeSize,
            height: fadeSize,
            borderRadius: '50%',
            backgroundColor: color
          }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{
            duration: adjustedDuration,
            repeat: Infinity,
            ease: easing,
            delay: adjustedDelay
          }}
        />
        
        {showText && (
          <div 
            className="loading-text"
            style={{
              marginTop: '0.5rem',
              color,
              fontSize: fadeSize * 0.5,
              textAlign: 'center'
            }}
          >
            {loadingText}
          </div>
        )}
      </div>
    );
  };

  // Render blur animation
  const renderBlur = () => {
    const blurSize = getSize();
    
    return (
      <div 
        className="loading-blur"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ...getContainerStyles()
        }}
      >
        <motion.div
          style={{
            width: blurSize,
            height: blurSize,
            borderRadius: '50%',
            backgroundColor: color
          }}
          animate={{ 
            filter: ['blur(0px)', `blur(${blurSize / 4}px)`, 'blur(0px)']
          }}
          transition={{
            duration: adjustedDuration,
            repeat: Infinity,
            ease: easing,
            delay: adjustedDelay
          }}
        />
        
        {showText && (
          <div 
            className="loading-text"
            style={{
              marginTop: '0.5rem',
              color,
              fontSize: blurSize * 0.5,
              textAlign: 'center'
            }}
          >
            {loadingText}
          </div>
        )}
      </div>
    );
  };

  // Render the appropriate animation based on type
  const renderAnimation = () => {
    switch (type) {
      case 'spinner':
        return renderSpinner();
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'skeleton':
        return renderSkeleton();
      case 'progress':
        return renderProgress();
      case 'bounce':
        return renderBounce();
      case 'wave':
        return renderWave();
      case 'fade':
        return renderFade();
      case 'blur':
        return renderBlur();
      case 'none':
        return (
          <div className="loading-none">
            {showText && loadingText}
          </div>
        );
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`loading-animation ${className}`} style={style}>
      {renderAnimation()}
    </div>
  );
}

/**
 * Component for content placeholders during loading
 */
export interface ContentPlaceholderProps {
  /** Whether the content is loading */
  isLoading?: boolean;
  /** The content to show when not loading */
  children: ReactNode;
  /** The type of placeholder to show */
  type?: 'skeleton' | 'blur' | 'fade';
  /** The width of the placeholder */
  width?: string | number;
  /** The height of the placeholder */
  height?: string | number;
  /** The number of skeleton lines */
  lines?: number;
  /** The color of the placeholder */
  color?: string;
  /** The border radius of the placeholder */
  borderRadius?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** The duration of the animation in seconds */
  duration?: number;
  /** Whether to disable the animation */
  disabled?: boolean;
}

/**
 * Component for content placeholders during loading
 */
export function ContentPlaceholder({
  isLoading = true,
  children,
  type = 'skeleton',
  width = '100%',
  height,
  lines = 3,
  color = '#3b82f6', // blue-500
  borderRadius = '0.375rem',
  className = '',
  style = {},
  duration = 1.2,
  disabled = false
}: ContentPlaceholderProps) {
  // If not loading, show children
  if (!isLoading) {
    return <>{children}</>;
  }
  
  // Map placeholder type to loading animation type
  const getLoadingType = (): LoadingAnimationType => {
    switch (type) {
      case 'skeleton':
        return 'skeleton';
      case 'blur':
        return 'blur';
      case 'fade':
        return 'fade';
      default:
        return 'skeleton';
    }
  };
  
  return (
    <LoadingAnimation
      type={getLoadingType()}
      isLoading={isLoading}
      width={width}
      height={height}
      lines={lines}
      color={color}
      borderRadius={borderRadius}
      className={className}
      style={style}
      duration={duration}
      disabled={disabled}
      container
    />
  );
}

/**
 * Component for skeleton loading placeholders
 */
export interface SkeletonProps {
  /** The variant of the skeleton */
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  /** The width of the skeleton */
  width?: string | number;
  /** The height of the skeleton */
  height?: string | number;
  /** Additional CSS classes */
  className?: string;
  /** Custom styles */
  style?: CSSProperties;
  /** The animation type */
  animation?: 'pulse' | 'wave' | 'none';
  /** The color of the skeleton */
  color?: string;
  /** Whether to disable the animation */
  disabled?: boolean;
}

/**
 * Component for skeleton loading placeholders
 */
export function Skeleton({
  variant = 'text',
  width = '100%',
  height,
  className = '',
  style = {},
  animation = 'pulse',
  color = '#e5e7eb', // gray-200
  disabled = false
}: SkeletonProps) {
  const { animationsEnabled, reducedMotion } = useAnimationContext();
  
  // Get default height based on variant
  const getDefaultHeight = (): string | number => {
    switch (variant) {
      case 'text':
        return '1rem';
      case 'circular':
        return typeof width === 'number' ? width : 40;
      case 'rectangular':
      case 'rounded':
        return '100px';
      default:
        return '1rem';
    }
  };

  // Get border radius based on variant
  const getBorderRadius = (): string | number => {
    switch (variant) {
      case 'text':
        return '0.25rem';
      case 'circular':
        return '50%';
      case 'rectangular':
        return 0;
      case 'rounded':
        return '0.5rem';
      default:
        return '0.25rem';
    }
  };

  // If animations are disabled or reduced motion is preferred, show a simple skeleton
  if (!animationsEnabled || reducedMotion || disabled || animation === 'none') {
    return (
      <div
        className={`skeleton ${className}`}
        style={{
          width,
          height: height || getDefaultHeight(),
          backgroundColor: color,
          borderRadius: getBorderRadius(),
          ...style
        }}
      />
    );
  }

  // Map animation type to loading animation type
  const getLoadingType = (): LoadingAnimationType => {
    switch (animation) {
      case 'pulse':
        return 'skeleton';
      case 'wave':
        return 'wave';
      default:
        return 'skeleton';
    }
  };
  
  return (
    <LoadingAnimation
      type={getLoadingType()}
      width={width}
      height={height || getDefaultHeight()}
      color={color}
      className={className}
      style={{
        ...style,
        borderRadius: getBorderRadius()
      }}
      lines={1}
    />
  );
}