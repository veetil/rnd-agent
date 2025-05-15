import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MobileNavigation, NavigationItem } from '../../../components/user-journey/MobileNavigation';
import { AnimationProvider } from '../../../components/animations/AnimationContext';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, animate, initial, variants, exit, transition, onClick, ...props }: any) => (
        <div
          data-testid="motion-div"
          data-animate={animate}
          data-initial={initial}
          onClick={onClick}
          {...props}
        >
          {children}
        </div>
      ),
      header: ({ children, animate, initial, variants, exit, transition, ...props }: any) => (
        <header
          data-testid="motion-header"
          data-animate={animate}
          data-initial={initial}
          {...props}
        >
          {children}
        </header>
      )
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

// Mock window scroll events
const simulateScroll = (scrollY: number) => {
  Object.defineProperty(window, 'scrollY', { value: scrollY, configurable: true });
  window.dispatchEvent(new Event('scroll'));
};

// Mock touch events
const simulateTouchStart = (element: Element, clientX: number, clientY: number) => {
  const touchStartEvent = new TouchEvent('touchstart', {
    bubbles: true,
    touches: [new Touch({ identifier: 0, target: element, clientX, clientY })]
  });
  element.dispatchEvent(touchStartEvent);
};

const simulateTouchEnd = (element: Element, clientX: number, clientY: number) => {
  const touchEndEvent = new TouchEvent('touchend', {
    bubbles: true,
    changedTouches: [new Touch({ identifier: 0, target: element, clientX, clientY })]
  });
  element.dispatchEvent(touchEndEvent);
};

describe('MobileNavigation', () => {
  // Sample navigation items
  const navigationItems: NavigationItem[] = [
    { label: 'Home', href: '/', icon: <span>🏠</span>, isActive: true },
    { label: 'Products', href: '/products', icon: <span>🛒</span> },
    { label: 'About', href: '/about', icon: <span>ℹ️</span> },
    { label: 'Contact', href: '/contact', icon: <span>📞</span> }
  ];

  beforeEach(() => {
    // Reset window.scrollY
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    
    // Mock Element.prototype methods for touch events
    Element.prototype.addEventListener = jest.fn((event, callback) => {
      if (event === 'touchstart' || event === 'touchend') {
        (Element.prototype as any)[`on${event}`] = callback;
      }
    });
    
    Element.prototype.removeEventListener = jest.fn((event) => {
      if (event === 'touchstart' || event === 'touchend') {
        (Element.prototype as any)[`on${event}`] = null;
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(
      <AnimationProvider>
        <MobileNavigation items={navigationItems} />
      </AnimationProvider>
    );
    
    // Check if navigation is rendered
    const navigation = screen.getByTestId('motion-div');
    expect(navigation).toHaveClass('mobile-navigation');
    expect(navigation).toHaveClass('mobile-navigation-bottom');
    
    // Check if all items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    
    // Check if icons are rendered
    expect(screen.getByText('🏠')).toBeInTheDocument();
    expect(screen.getByText('🛒')).toBeInTheDocument();
    expect(screen.getByText('ℹ️')).toBeInTheDocument();
    expect(screen.getByText('📞')).toBeInTheDocument();
  });
  
  test('renders with top position', () => {
    render(
      <AnimationProvider>
        <MobileNavigation items={navigationItems} position="top" />
      </AnimationProvider>
    );
    
    const navigation = screen.getByTestId('motion-div');
    expect(navigation).toHaveClass('mobile-navigation-top');
  });
  
  test('renders with left position', () => {
    render(
      <AnimationProvider>
        <MobileNavigation items={navigationItems} position="left" />
      </AnimationProvider>
    );
    
    const navigation = screen.getByTestId('motion-div');
    expect(navigation).toHaveClass('mobile-navigation-left');
  });
  
  test('renders with right position', () => {
    render(
      <AnimationProvider>
        <MobileNavigation items={navigationItems} position="right" />
      </AnimationProvider>
    );
    
    const navigation = screen.getByTestId('motion-div');
    expect(navigation).toHaveClass('mobile-navigation-right');
  });
  
  test('hides navigation on scroll down', () => {
    render(
      <AnimationProvider>
        <MobileNavigation 
          items={navigationItems} 
          hideOnScroll={true}
          scrollThreshold={50}
        />
      </AnimationProvider>
    );
    
    // Initial state - visible
    const navigation = screen.getByTestId('motion-div');
    expect(navigation.getAttribute('data-animate')).toBe('visible');
    
    // Scroll down past threshold
    act(() => {
      simulateScroll(60);
    });
    
    // Should be hidden
    expect(navigation.getAttribute('data-animate')).toBe('hidden');
    
    // Scroll back up
    act(() => {
      simulateScroll(30);
    });
    
    // Should be visible again
    expect(navigation.getAttribute('data-animate')).toBe('visible');
  });
  
  test('transforms navigation on scroll', () => {
    const { container } = render(
      <AnimationProvider>
        <MobileNavigation 
          items={navigationItems} 
          transformOnScroll={true}
          scrollThreshold={50}
        />
      </AnimationProvider>
    );
    
    // Initial state - not compact
    expect(container.querySelector('.mobile-navigation-compact')).not.toBeInTheDocument();
    
    // Scroll down past threshold
    act(() => {
      simulateScroll(60);
    });
    
    // Should be compact
    expect(container.querySelector('.mobile-navigation-compact')).toBeInTheDocument();
    
    // Scroll back up
    act(() => {
      simulateScroll(30);
    });
    
    // Should not be compact
    expect(container.querySelector('.mobile-navigation-compact')).not.toBeInTheDocument();
  });
  
  test('handles item click', () => {
    const onItemClick = jest.fn();
    const itemOnClick = jest.fn();
    
    const itemsWithClick = [
      ...navigationItems.slice(0, 1),
      { ...navigationItems[1], onClick: itemOnClick },
      ...navigationItems.slice(2)
    ];
    
    render(
      <AnimationProvider>
        <MobileNavigation 
          items={itemsWithClick} 
          onItemClick={onItemClick}
        />
      </AnimationProvider>
    );
    
    // Click on item with onClick handler
    fireEvent.click(screen.getByText('Products'));
    
    // Both handlers should be called
    expect(itemOnClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onItemClick).toHaveBeenCalledWith(itemsWithClick[1]);
    
    // Click on item without onClick handler
    fireEvent.click(screen.getByText('Home'));
    
    // Only the onItemClick handler should be called
    expect(onItemClick).toHaveBeenCalledTimes(2);
    expect(onItemClick).toHaveBeenCalledWith(itemsWithClick[0]);
  });
  
  test('opens and closes side navigation', () => {
    const onOpen = jest.fn();
    const onClose = jest.fn();
    
    render(
      <AnimationProvider>
        <MobileNavigation 
          items={navigationItems} 
          position="left"
          onOpen={onOpen}
          onClose={onClose}
          showHandle={true}
        />
      </AnimationProvider>
    );
    
    // Initial state - closed
    const navigation = screen.getByTestId('motion-div');
    expect(navigation.getAttribute('data-animate')).toBe('hidden');
    
    // Click handle to open
    const handle = screen.getByRole('button', { name: /open navigation/i });
    fireEvent.click(handle);
    
    // Should be open
    expect(navigation.getAttribute('data-animate')).toBe('visible');
    expect(onOpen).toHaveBeenCalledTimes(1);
    
    // Click handle to close
    fireEvent.click(handle);
    
    // Should be closed
    expect(navigation.getAttribute('data-animate')).toBe('hidden');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  
  test('closes side navigation when backdrop is clicked', () => {
    const onClose = jest.fn();
    
    render(
      <AnimationProvider>
        <MobileNavigation 
          items={navigationItems} 
          position="left"
          onClose={onClose}
          showBackdrop={true}
          isOpen={true}
        />
      </AnimationProvider>
    );
    
    // Initial state - open
    const navigation = screen.getByTestId('motion-div');
    expect(navigation.getAttribute('data-animate')).toBe('visible');
    
    // Backdrop should be rendered
    const backdrop = screen.getAllByTestId('motion-div')[0]; // First motion-div is the backdrop
    
    // Click backdrop
    fireEvent.click(backdrop);
    
    // Should be closed
    expect(navigation.getAttribute('data-animate')).toBe('hidden');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  
  test('handles swipe gestures for side navigation', () => {
    const onClose = jest.fn();
    
    render(
      <AnimationProvider>
        <MobileNavigation 
          items={navigationItems} 
          position="left"
          onClose={onClose}
          useGestures={true}
          isOpen={true}
        />
      </AnimationProvider>
    );
    
    // Get navigation element
    const navigation = screen.getByTestId('motion-div');
    
    // Simulate swipe left (to close left navigation)
    act(() => {
      simulateTouchStart(navigation, 200, 200);
      simulateTouchEnd(navigation, 50, 200);
    });
    
    // Should be closed
    expect(navigation.getAttribute('data-animate')).toBe('hidden');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  
  test('handles swipe gestures for bottom navigation', () => {
    const onClose = jest.fn();
    
    render(
      <AnimationProvider>
        <MobileNavigation 
          items={navigationItems} 
          position="bottom"
          onClose={onClose}
          useGestures={true}
        />
      </AnimationProvider>
    );
    
    // Get navigation element
    const navigation = screen.getByTestId('motion-div');
    
    // Simulate swipe up (to close bottom navigation)
    act(() => {
      simulateTouchStart(navigation, 200, 200);
      simulateTouchEnd(navigation, 200, 50);
    });
    
    // Should be hidden
    expect(navigation.getAttribute('data-animate')).toBe('hidden');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  
  test('renders with custom styles', () => {
    render(
      <AnimationProvider>
        <MobileNavigation 
          items={navigationItems} 
          backgroundColor="#f0f0f0"
          textColor="text-blue-500"
          activeColor="text-red-500"
          borderColor="border-gray-300"
          zIndex={50}
          height="5rem"
          className="custom-class"
        />
      </AnimationProvider>
    );
    
    const navigation = screen.getByTestId('motion-div');
    
    // Check custom styles
    expect(navigation).toHaveStyle({
      backgroundColor: '#f0f0f0',
      zIndex: 50,
      height: '5rem'
    });
    
    // Check custom class
    expect(navigation).toHaveClass('custom-class');
    
    // Check text colors
    const activeItem = screen.getByText('Home').closest('a');
    expect(activeItem).toHaveClass('text-red-500');
    
    const inactiveItem = screen.getByText('Products').closest('a');
    expect(inactiveItem).toHaveClass('text-blue-500');
  });
  
  test('disables animation when specified', () => {
    render(
      <AnimationProvider>
        <MobileNavigation 
          items={navigationItems} 
          disableAnimation={true}
        />
      </AnimationProvider>
    );
    
    const navigation = screen.getByTestId('motion-div');
    const variants = JSON.parse(navigation.getAttribute('data-variants') || '{}');
    
    // Animation variants should be empty objects
    expect(variants.hidden).toEqual({});
    expect(variants.visible).toEqual({});
  });
});