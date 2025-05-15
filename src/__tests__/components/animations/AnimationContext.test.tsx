import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AnimationProvider, useAnimation } from '../../../components/animations/AnimationContext';

// Mock the useReducedMotion hook
jest.mock('../../../hooks/useReducedMotion', () => ({
  useReducedMotion: jest.fn().mockReturnValue(false)
}));

// Use the global localStorage mock from jest.setup.js

// Test component that uses the animation context
function TestComponent() {
  const { 
    animationsEnabled, 
    reducedMotion, 
    animationSpeed, 
    toggleAnimations, 
    setAnimationSpeed 
  } = useAnimation();
  
  return (
    <div>
      <div data-testid="animations-enabled">{animationsEnabled.toString()}</div>
      <div data-testid="reduced-motion">{reducedMotion.toString()}</div>
      <div data-testid="animation-speed">{animationSpeed}</div>
      <button data-testid="toggle-button" onClick={toggleAnimations}>Toggle</button>
      <button data-testid="speed-button" onClick={() => setAnimationSpeed(1.5)}>Set Speed</button>
    </div>
  );
}

describe('AnimationContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });
  
  test('should provide default animation values', () => {
    render(
      <AnimationProvider>
        <TestComponent />
      </AnimationProvider>
    );
    
    expect(screen.getByTestId('animations-enabled').textContent).toBe('true');
    expect(screen.getByTestId('reduced-motion').textContent).toBe('false');
    expect(screen.getByTestId('animation-speed').textContent).toBe('1');
  });
  
  test('should toggle animations when toggleAnimations is called', () => {
    render(
      <AnimationProvider>
        <TestComponent />
      </AnimationProvider>
    );
    
    // Initial state
    expect(screen.getByTestId('animations-enabled').textContent).toBe('true');
    
    // Toggle animations
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // Animations should be disabled
    expect(screen.getByTestId('animations-enabled').textContent).toBe('false');
    
    // Toggle animations again
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // Animations should be enabled again
    expect(screen.getByTestId('animations-enabled').textContent).toBe('true');
  });
  
  test('should update animation speed when setAnimationSpeed is called', () => {
    render(
      <AnimationProvider>
        <TestComponent />
      </AnimationProvider>
    );
    
    // Initial speed
    expect(screen.getByTestId('animation-speed').textContent).toBe('1');
    
    // Set new speed
    fireEvent.click(screen.getByTestId('speed-button'));
    
    // Speed should be updated
    expect(screen.getByTestId('animation-speed').textContent).toBe('1.5');
  });
  
  test('should clamp animation speed between 0.1 and 2', () => {
    const TestSpeedComponent = () => {
      const { animationSpeed, setAnimationSpeed } = useAnimation();
      return (
        <div>
          <div data-testid="animation-speed">{animationSpeed}</div>
          <button data-testid="too-slow" onClick={() => setAnimationSpeed(0.05)}>Too Slow</button>
          <button data-testid="too-fast" onClick={() => setAnimationSpeed(2.5)}>Too Fast</button>
        </div>
      );
    };
    
    render(
      <AnimationProvider>
        <TestSpeedComponent />
      </AnimationProvider>
    );
    
    // Try to set speed too low
    fireEvent.click(screen.getByTestId('too-slow'));
    expect(screen.getByTestId('animation-speed').textContent).toBe('0.1');
    
    // Try to set speed too high
    fireEvent.click(screen.getByTestId('too-fast'));
    expect(screen.getByTestId('animation-speed').textContent).toBe('2');
  });
  
  test('should load settings from localStorage if available', () => {
    // Set values in localStorage before rendering
    localStorage.setItem('animationsEnabled', 'false');
    localStorage.setItem('animationSpeed', '1.5');
    
    render(
      <AnimationProvider>
        <TestComponent />
      </AnimationProvider>
    );
    
    // Should use values from localStorage
    expect(screen.getByTestId('animations-enabled').textContent).toBe('false');
    expect(screen.getByTestId('animation-speed').textContent).toBe('1.5');
  });
  
  test('should save settings to localStorage when they change', () => {
    // Clear localStorage before test
    localStorage.clear();
    
    render(
      <AnimationProvider>
        <TestComponent />
      </AnimationProvider>
    );
    
    // Toggle animations
    fireEvent.click(screen.getByTestId('toggle-button'));
    
    // Check localStorage value directly
    expect(localStorage.getItem('animationsEnabled')).toBe('false');
    
    // Set animation speed
    fireEvent.click(screen.getByTestId('speed-button'));
    
    // Check localStorage value directly
    expect(localStorage.getItem('animationSpeed')).toBe('1.5');
  });
  
  test('should accept initial settings', () => {
    render(
      <AnimationProvider initialSettings={{ animationsEnabled: false, animationSpeed: 0.5 }}>
        <TestComponent />
      </AnimationProvider>
    );
    
    expect(screen.getByTestId('animations-enabled').textContent).toBe('false');
    expect(screen.getByTestId('animation-speed').textContent).toBe('0.5');
  });
});