import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AccessibilityProvider } from '../../components/accessibility/AccessibilityContext';
import { ResponsiveProvider } from '../../components/responsive/ResponsiveContext';
import { PersonaProvider } from '../../components/user-journey/PersonaContext';
import { AnimationProvider } from '../../components/animations/AnimationContext';
import { AppProviders } from '../../components/AppProviders';

// Mock window resize events
const resizeWindow = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, configurable: true });
  window.dispatchEvent(new Event('resize'));
};

describe('Foundation Components Integration', () => {
  beforeEach(() => {
    // Reset localStorage
    localStorage.clear();
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  
  test('AccessibilityContext provides accessibility settings', () => {
    render(
      <AccessibilityProvider>
        <div data-testid="test-component">
          <button data-testid="toggle-high-contrast">Toggle High Contrast</button>
          <button data-testid="increase-font-size">Increase Font Size</button>
          <button data-testid="decrease-font-size">Decrease Font Size</button>
          <button data-testid="toggle-screen-reader">Toggle Screen Reader</button>
        </div>
      </AccessibilityProvider>
    );
    
    // Get accessibility context elements
    const testComponent = screen.getByTestId('test-component');
    const toggleHighContrastButton = screen.getByTestId('toggle-high-contrast');
    const increaseFontSizeButton = screen.getByTestId('increase-font-size');
    const decreaseFontSizeButton = screen.getByTestId('decrease-font-size');
    const toggleScreenReaderButton = screen.getByTestId('toggle-screen-reader');
    
    // Test high contrast toggle
    fireEvent.click(toggleHighContrastButton);
    expect(testComponent).toHaveAttribute('data-high-contrast', 'true');
    
    // Test font size increase
    fireEvent.click(increaseFontSizeButton);
    expect(testComponent).toHaveAttribute('data-font-size-multiplier', '1.1');
    
    // Test font size decrease
    fireEvent.click(decreaseFontSizeButton);
    expect(testComponent).toHaveAttribute('data-font-size-multiplier', '1');
    
    // Test screen reader toggle
    fireEvent.click(toggleScreenReaderButton);
    expect(testComponent).toHaveAttribute('data-screen-reader-enabled', 'true');
  });
  
  test('ResponsiveContext detects viewport changes', () => {
    render(
      <ResponsiveProvider>
        <div data-testid="responsive-component"></div>
      </ResponsiveProvider>
    );
    
    const responsiveComponent = screen.getByTestId('responsive-component');
    
    // Initial viewport (desktop)
    expect(responsiveComponent).toHaveAttribute('data-viewport', 'desktop');
    
    // Resize to tablet
    act(() => {
      resizeWindow(768, 1024);
    });
    
    // Need to wait for resize event to be processed
    act(() => {
      jest.runAllTimers();
    });
    
    expect(responsiveComponent).toHaveAttribute('data-viewport', 'tablet');
    
    // Resize to mobile
    act(() => {
      resizeWindow(375, 667);
    });
    
    // Need to wait for resize event to be processed
    act(() => {
      jest.runAllTimers();
    });
    
    expect(responsiveComponent).toHaveAttribute('data-viewport', 'mobile');
  });
  
  test('PersonaContext allows changing user persona', () => {
    render(
      <PersonaProvider>
        <div data-testid="persona-component"></div>
      </PersonaProvider>
    );
    
    const personaComponent = screen.getByTestId('persona-component');
    
    // Initial persona (general)
    expect(personaComponent).toHaveAttribute('data-persona', 'general');
    
    // Change to business stakeholder
    fireEvent.click(screen.getByText('Set Business'));
    expect(personaComponent).toHaveAttribute('data-persona', 'business-stakeholder');
    
    // Change to engineering leader
    fireEvent.click(screen.getByText('Set Engineering'));
    expect(personaComponent).toHaveAttribute('data-persona', 'engineering-leader');
    
    // Change to technical developer
    fireEvent.click(screen.getByText('Set Developer'));
    expect(personaComponent).toHaveAttribute('data-persona', 'technical-developer');
  });
  
  test('AnimationContext controls animation settings', () => {
    render(
      <AnimationProvider>
        <div data-testid="animation-component"></div>
      </AnimationProvider>
    );
    
    const animationComponent = screen.getByTestId('animation-component');
    
    // Initial animation settings
    expect(animationComponent).toHaveAttribute('data-animations-enabled', 'true');
    expect(animationComponent).toHaveAttribute('data-animation-speed', '1');
    
    // Toggle animations
    fireEvent.click(screen.getByText('Toggle Animations'));
    expect(animationComponent).toHaveAttribute('data-animations-enabled', 'false');
    
    // Toggle animations back on
    fireEvent.click(screen.getByText('Toggle Animations'));
    expect(animationComponent).toHaveAttribute('data-animations-enabled', 'true');
    
    // Change animation speed
    fireEvent.click(screen.getByText('Toggle Speed'));
    expect(animationComponent).toHaveAttribute('data-animation-speed', '0.5');
    
    // Change animation speed again
    fireEvent.click(screen.getByText('Toggle Speed'));
    expect(animationComponent).toHaveAttribute('data-animation-speed', '2');
    
    // Change animation speed back to default
    fireEvent.click(screen.getByText('Toggle Speed'));
    expect(animationComponent).toHaveAttribute('data-animation-speed', '1');
  });
  
  test('all foundation components work together', () => {
    render(
      <AppProviders>
        <div data-testid="app-component">
          <div data-testid="content">Test Content</div>
        </div>
      </AppProviders>
    );
    
    const appComponent = screen.getByTestId('app-component');
    
    // Test accessibility features
    fireEvent.click(screen.getByText('Toggle High Contrast'));
    expect(appComponent).toHaveAttribute('data-high-contrast', 'true');
    
    // Test persona changes
    fireEvent.click(screen.getByText('Set Developer'));
    expect(appComponent).toHaveAttribute('data-persona', 'technical-developer');
    
    // Test animation settings
    fireEvent.click(screen.getByText('Toggle Animations'));
    expect(appComponent).toHaveAttribute('data-animations-enabled', 'false');
    
    // Test responsive behavior
    act(() => {
      resizeWindow(375, 667);
    });
    
    // Need to wait for resize event to be processed
    act(() => {
      jest.runAllTimers();
    });
    
    expect(appComponent).toHaveAttribute('data-viewport', 'mobile');
    
    // Test that all settings persist together
    expect(appComponent).toHaveAttribute('data-high-contrast', 'true');
    expect(appComponent).toHaveAttribute('data-persona', 'technical-developer');
    expect(appComponent).toHaveAttribute('data-animations-enabled', 'false');
    expect(appComponent).toHaveAttribute('data-viewport', 'mobile');
  });
  
  test('foundation components persist settings in localStorage', () => {
    // First render to set settings
    const { unmount } = render(
      <AppProviders>
        <div data-testid="app-component">Test Content</div>
      </AppProviders>
    );
    
    // Change settings
    fireEvent.click(screen.getByText('Toggle High Contrast'));
    fireEvent.click(screen.getByText('Set Developer'));
    fireEvent.click(screen.getByText('Toggle Animations'));
    
    // Unmount component
    unmount();
    
    // Re-render component
    render(
      <AppProviders>
        <div data-testid="app-component">Test Content</div>
      </AppProviders>
    );
    
    const appComponent = screen.getByTestId('app-component');
    
    // Check that settings were persisted
    expect(appComponent).toHaveAttribute('data-high-contrast', 'true');
    expect(appComponent).toHaveAttribute('data-persona', 'technical-developer');
    expect(appComponent).toHaveAttribute('data-animations-enabled', 'false');
  });
});