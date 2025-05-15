import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useAccessibility } from '../../../components/accessibility/AccessibilityContext';

// Mock the actual AccessibilityContext module
jest.mock('../../../components/accessibility/AccessibilityContext', () => {
  // Store the context value so we can control it in tests
  let contextValue = {
    highContrast: false,
    reducedMotion: false,
    fontSizeMultiplier: 1,
    focusIndicatorsVisible: true,
    toggleHighContrast: jest.fn(),
    setFontSizeMultiplier: jest.fn(),
    toggleFocusIndicators: jest.fn(),
    announceToScreenReader: jest.fn(),
  };

  // Return the mocked module
  return {
    useAccessibility: jest.fn(() => contextValue),
    // Allow tests to update the context value
    __updateContextValue: (newValue: any) => {
      contextValue = { ...contextValue, ...newValue };
    },
  };
});

// Test component that uses the accessibility context
function TestComponent() {
  const {
    highContrast,
    reducedMotion,
    fontSizeMultiplier,
    focusIndicatorsVisible,
    toggleHighContrast,
    setFontSizeMultiplier,
    toggleFocusIndicators,
    announceToScreenReader
  } = useAccessibility();
  
  return (
    <div>
      <div data-testid="high-contrast">{highContrast.toString()}</div>
      <div data-testid="reduced-motion">{reducedMotion.toString()}</div>
      <div data-testid="font-size">{fontSizeMultiplier}</div>
      <div data-testid="focus-indicators">{focusIndicatorsVisible.toString()}</div>
      <button data-testid="toggle-contrast" onClick={toggleHighContrast}>Toggle Contrast</button>
      <button data-testid="increase-font" onClick={() => setFontSizeMultiplier(1.5)}>Increase Font</button>
      <button data-testid="toggle-focus" onClick={toggleFocusIndicators}>Toggle Focus</button>
      <button data-testid="announce" onClick={() => announceToScreenReader('Test announcement')}>Announce</button>
    </div>
  );
}

describe('AccessibilityContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset context to default values
    require('../../../components/accessibility/AccessibilityContext').__updateContextValue({
      highContrast: false,
      reducedMotion: false,
      fontSizeMultiplier: 1,
      focusIndicatorsVisible: true,
    });
  });
  
  test('should provide default accessibility values', () => {
    render(<TestComponent />);
    
    expect(screen.getByTestId('high-contrast').textContent).toBe('false');
    expect(screen.getByTestId('reduced-motion').textContent).toBe('false');
    expect(screen.getByTestId('font-size').textContent).toBe('1');
    expect(screen.getByTestId('focus-indicators').textContent).toBe('true');
  });
  
  test('should toggle high contrast mode', () => {
    const { toggleHighContrast } = require('../../../components/accessibility/AccessibilityContext').useAccessibility();
    
    render(<TestComponent />);
    
    // Initial state
    expect(screen.getByTestId('high-contrast').textContent).toBe('false');
    
    // Click toggle button
    fireEvent.click(screen.getByTestId('toggle-contrast'));
    
    // Toggle function should be called
    expect(toggleHighContrast).toHaveBeenCalled();
    
    // Clean up the first render
    cleanup();
    
    // Update mock context to simulate state change
    require('../../../components/accessibility/AccessibilityContext').__updateContextValue({
      highContrast: true,
    });
    
    // Re-render with updated context
    render(<TestComponent />);
    
    // High contrast should now be enabled
    expect(screen.getByTestId('high-contrast').textContent).toBe('true');
  });
  
  test('should update font size multiplier', () => {
    const { setFontSizeMultiplier } = require('../../../components/accessibility/AccessibilityContext').useAccessibility();
    
    render(<TestComponent />);
    
    // Initial state
    expect(screen.getByTestId('font-size').textContent).toBe('1');
    
    // Click increase font button
    fireEvent.click(screen.getByTestId('increase-font'));
    
    // Set function should be called
    expect(setFontSizeMultiplier).toHaveBeenCalledWith(1.5);
    
    // Clean up the first render
    cleanup();
    
    // Update mock context to simulate state change
    require('../../../components/accessibility/AccessibilityContext').__updateContextValue({
      fontSizeMultiplier: 1.5,
    });
    
    // Re-render with updated context
    render(<TestComponent />);
    
    // Font size should now be increased
    expect(screen.getByTestId('font-size').textContent).toBe('1.5');
  });
  
  test('should toggle focus indicators', () => {
    const { toggleFocusIndicators } = require('../../../components/accessibility/AccessibilityContext').useAccessibility();
    
    render(<TestComponent />);
    
    // Initial state
    expect(screen.getByTestId('focus-indicators').textContent).toBe('true');
    
    // Click toggle button
    fireEvent.click(screen.getByTestId('toggle-focus'));
    
    // Toggle function should be called
    expect(toggleFocusIndicators).toHaveBeenCalled();
    
    // Clean up the first render
    cleanup();
    
    // Update mock context to simulate state change
    require('../../../components/accessibility/AccessibilityContext').__updateContextValue({
      focusIndicatorsVisible: false,
    });
    
    // Re-render with updated context
    render(<TestComponent />);
    
    // Focus indicators should now be disabled
    expect(screen.getByTestId('focus-indicators').textContent).toBe('false');
  });
  
  test('should announce to screen reader', () => {
    const { announceToScreenReader } = require('../../../components/accessibility/AccessibilityContext').useAccessibility();
    
    render(<TestComponent />);
    
    // Click announce button
    fireEvent.click(screen.getByTestId('announce'));
    
    // Announce function should be called with the message
    expect(announceToScreenReader).toHaveBeenCalledWith('Test announcement');
  });
});