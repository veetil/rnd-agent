/**
 * Utility functions for accessibility
 */

/**
 * Focus the first focusable element within a container
 * @param container - The container element to search within
 * @param focusableSelector - CSS selector for focusable elements
 * @returns Whether an element was successfully focused
 */
export function focusFirstElement(
  container: HTMLElement | null,
  focusableSelector: string = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
): boolean {
  if (!container) return false;
  
  const focusableElements = container.querySelectorAll<HTMLElement>(focusableSelector);
  
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
    return true;
  }
  
  return false;
}

/**
 * Trap focus within a container (for modals, dialogs, etc.)
 * @param container - The container element to trap focus within
 * @param focusableSelector - CSS selector for focusable elements
 * @returns A cleanup function to remove the trap
 */
export function trapFocus(
  container: HTMLElement | null,
  focusableSelector: string = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
): () => void {
  if (!container) return () => {};
  
  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector)
  ).filter(el => !el.hasAttribute('disabled'));
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  // Focus the first element initially
  firstElement.focus();
  
  // Handle tab key to cycle through focusable elements
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab') return;
    
    // Shift + Tab
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } 
    // Tab
    else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  };
  
  document.addEventListener('keydown', handleKeyDown);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}

/**
 * Create a keyboard navigation handler for a list of items
 * @param options - Configuration options
 * @returns A keyboard event handler function
 */
export function createKeyboardNavigation({
  itemSelector,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onEnter,
  onSpace,
  onHome,
  onEnd,
  onEscape,
  preventDefaultOnMatch = true
}: {
  itemSelector: string;
  onArrowUp?: (event: KeyboardEvent, currentIndex: number) => void;
  onArrowDown?: (event: KeyboardEvent, currentIndex: number) => void;
  onArrowLeft?: (event: KeyboardEvent, currentIndex: number) => void;
  onArrowRight?: (event: KeyboardEvent, currentIndex: number) => void;
  onEnter?: (event: KeyboardEvent, currentIndex: number) => void;
  onSpace?: (event: KeyboardEvent, currentIndex: number) => void;
  onHome?: (event: KeyboardEvent, currentIndex: number) => void;
  onEnd?: (event: KeyboardEvent, currentIndex: number) => void;
  onEscape?: (event: KeyboardEvent) => void;
  preventDefaultOnMatch?: boolean;
}) {
  return (event: KeyboardEvent) => {
    // Find all items matching the selector
    const items = Array.from(document.querySelectorAll<HTMLElement>(itemSelector));
    
    // Find the currently focused item
    const currentItem = document.activeElement as HTMLElement;
    const currentIndex = items.indexOf(currentItem);
    
    // Only proceed if we have a valid current item
    if (currentIndex === -1 && event.key !== 'Escape') return;
    
    let handled = false;
    
    switch (event.key) {
      case 'ArrowUp':
        if (onArrowUp) {
          onArrowUp(event, currentIndex);
          handled = true;
        }
        break;
        
      case 'ArrowDown':
        if (onArrowDown) {
          onArrowDown(event, currentIndex);
          handled = true;
        }
        break;
        
      case 'ArrowLeft':
        if (onArrowLeft) {
          onArrowLeft(event, currentIndex);
          handled = true;
        }
        break;
        
      case 'ArrowRight':
        if (onArrowRight) {
          onArrowRight(event, currentIndex);
          handled = true;
        }
        break;
        
      case 'Enter':
        if (onEnter) {
          onEnter(event, currentIndex);
          handled = true;
        }
        break;
        
      case ' ':
        if (onSpace) {
          onSpace(event, currentIndex);
          handled = true;
        }
        break;
        
      case 'Home':
        if (onHome) {
          onHome(event, currentIndex);
          handled = true;
        }
        break;
        
      case 'End':
        if (onEnd) {
          onEnd(event, currentIndex);
          handled = true;
        }
        break;
        
      case 'Escape':
        if (onEscape) {
          onEscape(event);
          handled = true;
        }
        break;
    }
    
    if (handled && preventDefaultOnMatch) {
      event.preventDefault();
    }
  };
}

/**
 * Announce a message to screen readers
 * @param message - The message to announce
 * @param assertive - Whether to use assertive (true) or polite (false) announcement
 */
export function announceToScreenReader(message: string, assertive = false): void {
  if (typeof document === 'undefined') return;
  
  // Create or get the live region element
  let liveRegion = document.getElementById(
    assertive ? 'a11y-assertive-announcer' : 'a11y-polite-announcer'
  );
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = assertive ? 'a11y-assertive-announcer' : 'a11y-polite-announcer';
    liveRegion.setAttribute('aria-live', assertive ? 'assertive' : 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    document.body.appendChild(liveRegion);
  }
  
  // Clear the live region first (for some screen readers)
  liveRegion.textContent = '';
  
  // Set the message after a small delay
  setTimeout(() => {
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  }, 50);
}

/**
 * Check if reduced motion is preferred
 * @returns Whether reduced motion is preferred
 */
export function checkReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get the appropriate ARIA attributes for a disclosure widget
 * @param isExpanded - Whether the disclosure is expanded
 * @param id - The ID of the content element
 * @returns ARIA attributes object
 */
export function getDisclosureAttributes(isExpanded: boolean, id: string) {
  return {
    'aria-expanded': isExpanded,
    'aria-controls': id,
  };
}

/**
 * Get the appropriate ARIA attributes for a tab
 * @param isSelected - Whether the tab is selected
 * @param id - The ID of the tab panel
 * @returns ARIA attributes object
 */
export function getTabAttributes(isSelected: boolean, id: string) {
  return {
    role: 'tab',
    'aria-selected': isSelected,
    'aria-controls': id,
    tabIndex: isSelected ? 0 : -1,
  };
}

/**
 * Get the appropriate ARIA attributes for a tab panel
 * @param id - The ID of the tab panel
 * @param tabId - The ID of the tab
 * @returns ARIA attributes object
 */
export function getTabPanelAttributes(id: string, tabId: string) {
  return {
    role: 'tabpanel',
    id,
    'aria-labelledby': tabId,
    tabIndex: 0,
  };
}