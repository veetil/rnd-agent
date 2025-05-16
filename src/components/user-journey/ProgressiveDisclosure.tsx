import { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePersona } from './PersonaContext';
import { MicroInteraction } from '../animations/MicroInteraction';

export interface ProgressiveDisclosureProps {
  /** The title or summary of the content */
  title: ReactNode;
  /** The detailed content to progressively disclose */
  children: ReactNode;
  /** Initial expanded state */
  defaultExpanded?: boolean;
  /** Whether to expand based on user persona */
  expandForPersonas?: string[];
  /** The level of technical detail (1-5, where 5 is most technical) */
  technicalLevel?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to animate the expansion/collapse */
  animate?: boolean;
  /** The animation duration in seconds */
  duration?: number;
  /** Whether to show an icon indicator */
  showIcon?: boolean;
  /** Custom expand icon */
  expandIcon?: ReactNode;
  /** Custom collapse icon */
  collapseIcon?: ReactNode;
  /** Whether to persist expanded state in localStorage */
  persistState?: boolean;
  /** Storage key for persisting state */
  storageKey?: string;
  /** Whether to show a "Read more" button instead of expanding the whole section */
  useReadMore?: boolean;
  /** Text for the "Read more" button */
  readMoreText?: string;
  /** Text for the "Read less" button */
  readLessText?: string;
  /** Whether to show a tooltip with a preview on hover */
  showTooltipPreview?: boolean;
  /** Maximum length of the tooltip preview */
  tooltipPreviewLength?: number;
  /** Whether to highlight new or important information */
  highlightImportant?: boolean;
  /** Text to show when content is collapsed */
  collapsedPreview?: ReactNode;
  /** Maximum height when collapsed (in pixels) */
  collapsedHeight?: number;
  /** Callback when expanded state changes */
  onToggle?: (expanded: boolean) => void;
  /** Whether to disable the component */
  disabled?: boolean;
}

/**
 * Component for progressive disclosure of complex information
 * Allows users to expand and collapse sections as needed
 */
export function ProgressiveDisclosure({
  title,
  children,
  defaultExpanded = false,
  expandForPersonas = [],
  technicalLevel = 3,
  className = '',
  animate = true,
  duration = 0.3,
  showIcon = true,
  expandIcon,
  collapseIcon,
  persistState = false,
  storageKey = 'progressive-disclosure',
  useReadMore = false,
  readMoreText = 'Read more',
  readLessText = 'Read less',
  showTooltipPreview = false,
  tooltipPreviewLength = 100,
  highlightImportant = false,
  collapsedPreview,
  collapsedHeight,
  onToggle,
  disabled = false
}: ProgressiveDisclosureProps) {
  const { persona } = usePersona();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const uniqueId = useRef(`pd-${Math.random().toString(36).substring(2, 9)}`);

  // Determine if content should be expanded based on persona
  useEffect(() => {
    if (expandForPersonas.includes(persona)) {
      setExpanded(true);
    }
  }, [persona, expandForPersonas]);

  // Load expanded state from localStorage
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      const key = `${storageKey}-${uniqueId.current}`;
      const storedState = localStorage.getItem(key);
      if (storedState !== null) {
        setExpanded(storedState === 'true');
      }
    }
  }, [persistState, storageKey]);

  // Save expanded state to localStorage
  useEffect(() => {
    if (persistState && typeof window !== 'undefined') {
      const key = `${storageKey}-${uniqueId.current}`;
      localStorage.setItem(key, expanded.toString());
    }
  }, [expanded, persistState, storageKey]);

  // Handle toggle
  const handleToggle = () => {
    if (disabled) return;
    
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    
    if (onToggle) {
      onToggle(newExpanded);
    }
  };

  // Get tooltip preview text
  const getTooltipPreview = () => {
    if (!contentRef.current) return '';
    
    const text = contentRef.current.textContent || '';
    if (text.length <= tooltipPreviewLength) return text;
    
    return text.substring(0, tooltipPreviewLength) + '...';
  };

  // Determine if content is appropriate for user's technical level
  const isContentAppropriate = persona === 'technical-developer' ||
                              persona === 'engineering-leader' ||
                              technicalLevel <= 2;

  // Render default icons
  const renderExpandIcon = () => {
    if (expandIcon) return expandIcon;
    return (
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
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    );
  };

  const renderCollapseIcon = () => {
    if (collapseIcon) return collapseIcon;
    return (
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
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    );
  };

  // Render tooltip
  const renderTooltip = () => {
    if (!showTooltipPreview || expanded) return null;
    
    return (
      <AnimatePresence>
        {tooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 p-2 mt-1 text-sm bg-gray-800 text-white rounded shadow-lg max-w-xs"
            style={{ top: '100%', left: '50%', transform: 'translateX(-50%)' }}
          >
            {getTooltipPreview()}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Render technical level indicator
  const renderTechnicalIndicator = () => {
    if (technicalLevel <= 1) return null;
    
    return (
      <div 
        className="technical-indicator ml-2 px-1.5 py-0.5 text-xs rounded"
        style={{ 
          backgroundColor: isContentAppropriate ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)',
          color: isContentAppropriate ? 'rgb(22, 101, 52)' : 'rgb(153, 27, 27)'
        }}
      >
        {isContentAppropriate ? 'Appropriate' : 'Advanced'}
      </div>
    );
  };

  // Render content
  const renderContent = () => {
    if (useReadMore) {
      return (
        <div className="progressive-disclosure-content">
          <div ref={contentRef}>
            {children}
          </div>
          
          <div className="mt-2">
            <MicroInteraction type="hover-scale">
              <button
                onClick={handleToggle}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                aria-expanded={expanded}
              >
                {expanded ? readLessText : readMoreText}
              </button>
            </MicroInteraction>
          </div>
        </div>
      );
    }
    
    return (
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={animate ? { height: 0, opacity: 0 } : undefined}
            animate={animate ? { height: 'auto', opacity: 1 } : undefined}
            exit={animate ? { height: 0, opacity: 0 } : undefined}
            transition={{ duration }}
            className="progressive-disclosure-content overflow-hidden"
            id={uniqueId.current}
          >
            <div ref={contentRef} className="pt-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Render collapsed preview
  const renderCollapsedPreview = () => {
    if (expanded || !collapsedPreview) return null;
    
    return (
      <div 
        className="progressive-disclosure-preview overflow-hidden"
        style={{ maxHeight: collapsedHeight ? `${collapsedHeight}px` : 'auto' }}
      >
        {collapsedPreview}
        {collapsedHeight && (
          <div className="fade-gradient" style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: '30px',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))'
          }} />
        )}
      </div>
    );
  };

  return (
    <div className={`progressive-disclosure ${className}`}>
      {/* Header/Title section */}
      <div
        className={`progressive-disclosure-header relative ${useReadMore ? '' : 'cursor-pointer'}`}
        onClick={useReadMore ? undefined : handleToggle}
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        role={useReadMore ? undefined : 'button'}
        aria-expanded={useReadMore ? undefined : expanded}
        tabIndex={useReadMore ? undefined : 0}
        aria-controls={useReadMore ? undefined : uniqueId.current}
        onKeyDown={useReadMore ? undefined : (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="progressive-disclosure-title font-medium">
              {title}
            </div>
            {renderTechnicalIndicator()}
            {highlightImportant && (
              <div className="ml-2 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded">
                New
              </div>
            )}
          </div>
          
          {!useReadMore && showIcon && (
            <div className="progressive-disclosure-icon ml-2">
              <MicroInteraction type="hover-scale">
                {expanded ? renderCollapseIcon() : renderExpandIcon()}
              </MicroInteraction>
            </div>
          )}
        </div>
        
        {renderTooltip()}
      </div>
      
      {/* Collapsed preview (if provided) */}
      {renderCollapsedPreview()}
      
      {/* Expandable content */}
      {renderContent()}
    </div>
  );
}

/**
 * Component for displaying a tooltip with additional information
 */
export interface ContextualTooltipProps {
  /** The content to show in the tooltip */
  tooltip: ReactNode;
  /** The element that triggers the tooltip */
  children: ReactNode;
  /** The position of the tooltip */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Additional CSS classes */
  className?: string;
  /** Whether to show an icon indicator */
  showIcon?: boolean;
  /** Custom icon */
  icon?: ReactNode;
  /** The delay before showing the tooltip (in milliseconds) */
  delay?: number;
  /** Whether to persist the tooltip visibility in localStorage */
  persistDismissal?: boolean;
  /** Storage key for persisting dismissal */
  storageKey?: string;
  /** Whether to highlight the tooltip as new */
  isNew?: boolean;
  /** The technical level of the tooltip content (1-5) */
  technicalLevel?: number;
  /** Whether to show the tooltip based on persona */
  showForPersonas?: string[];
}

/**
 * Component for displaying contextual tooltips with additional information
 */
export function ContextualTooltip({
  tooltip,
  children,
  position = 'top',
  className = '',
  showIcon = true,
  icon,
  delay = 200,
  persistDismissal = false,
  storageKey = 'contextual-tooltips',
  isNew = false,
  technicalLevel = 1,
  showForPersonas = []
}: ContextualTooltipProps) {
  const { persona } = usePersona();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showDelay, setShowDelay] = useState<NodeJS.Timeout | null>(null);
  const uniqueId = useRef(`tooltip-${Math.random().toString(36).substring(2, 9)}`);

  // Check if tooltip should be shown based on persona
  const shouldShowForPersona = showForPersonas.length === 0 || showForPersonas.includes(persona);
  
  // Check if tooltip is appropriate for user's technical level
  const isAppropriate = persona === 'technical-developer' ||
                        persona === 'engineering-leader' ||
                        technicalLevel <= 2;

  // Load dismissed state from localStorage
  useEffect(() => {
    if (persistDismissal && typeof window !== 'undefined') {
      const key = `${storageKey}-${uniqueId.current}`;
      const storedState = localStorage.getItem(key);
      if (storedState === 'dismissed') {
        setIsDismissed(true);
      }
    }
  }, [persistDismissal, storageKey]);

  // Save dismissed state to localStorage
  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    
    if (persistDismissal && typeof window !== 'undefined') {
      const key = `${storageKey}-${uniqueId.current}`;
      localStorage.setItem(key, 'dismissed');
    }
  };

  // Handle mouse events
  const handleMouseEnter = () => {
    if (isDismissed) return;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    setShowDelay(timer);
  };

  const handleMouseLeave = () => {
    if (showDelay) {
      clearTimeout(showDelay);
      setShowDelay(null);
    }
    
    setIsVisible(false);
  };

  // Default icon
  const defaultIcon = (
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
      className="text-gray-500"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );

  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-8px)'
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(8px)'
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(-8px)'
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%) translateX(8px)'
        };
      default:
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-8px)'
        };
    }
  };

  // If tooltip should not be shown for this persona or technical level, just render children
  if (!shouldShowForPersona || !isAppropriate) {
    return <>{children}</>;
  }

  return (
    <div 
      className={`contextual-tooltip-wrapper relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="contextual-tooltip-trigger inline-flex items-center">
        {children}
        {showIcon && (
          <span className="ml-1">
            {icon || defaultIcon}
            {isNew && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </span>
        )}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="contextual-tooltip absolute z-50 p-2 bg-gray-800 text-white text-sm rounded shadow-lg max-w-xs"
            style={{
              ...getPositionStyles(),
              whiteSpace: 'normal'
            }}
          >
            <div className="contextual-tooltip-content">
              {tooltip}
            </div>
            
            {persistDismissal && (
              <button 
                className="absolute top-1 right-1 text-gray-400 hover:text-white"
                onClick={handleDismiss}
                aria-label="Dismiss tooltip"
              >
                ×
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}