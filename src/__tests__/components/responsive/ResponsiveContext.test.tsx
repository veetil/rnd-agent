import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ResponsiveProvider, useResponsive } from '../../../components/responsive/ResponsiveContext';
import { breakpoints } from '../../../hooks/useMediaQuery';

// Mock the useMediaQuery hooks
jest.mock('../../../hooks/useMediaQuery', () => {
  const originalModule = jest.requireActual('../../../hooks/useMediaQuery');
  
  return {
    ...originalModule,
    useMediaQuery: jest.fn().mockReturnValue(false),
    useBreakpoint: jest.fn().mockReturnValue(true),
    useCurrentBreakpoint: jest.fn().mockReturnValue('md'),
    useMobileDetect: jest.fn().mockReturnValue(false),
    useHoverCapability: jest.fn().mockReturnValue(true),
    usePortraitOrientation: jest.fn().mockReturnValue(false),
    useViewportSize: jest.fn().mockReturnValue({ width: 1024, height: 768 }),
  };
});

// Test component that uses the responsive context
function TestComponent() {
  const {
    breakpoint,
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,
    isMobile,
    hasHoverCapability,
    isPortrait,
    viewportWidth,
    viewportHeight,
    isSSR
  } = useResponsive();
  
  return (
    <div>
      <div data-testid="breakpoint">{breakpoint}</div>
      <div data-testid="is-sm-up">{isSmUp.toString()}</div>
      <div data-testid="is-md-up">{isMdUp.toString()}</div>
      <div data-testid="is-lg-up">{isLgUp.toString()}</div>
      <div data-testid="is-xl-up">{isXlUp.toString()}</div>
      <div data-testid="is-mobile">{isMobile.toString()}</div>
      <div data-testid="has-hover">{hasHoverCapability.toString()}</div>
      <div data-testid="is-portrait">{isPortrait.toString()}</div>
      <div data-testid="viewport-width">{viewportWidth}</div>
      <div data-testid="viewport-height">{viewportHeight}</div>
      <div data-testid="is-ssr">{isSSR.toString()}</div>
    </div>
  );
}

describe('ResponsiveContext', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });
  
  test('should provide default responsive values', () => {
    render(
      <ResponsiveProvider>
        <TestComponent />
      </ResponsiveProvider>
    );
    
    // Check default values
    expect(screen.getByTestId('breakpoint').textContent).toBe('md');
    expect(screen.getByTestId('is-sm-up').textContent).toBe('true');
    expect(screen.getByTestId('is-md-up').textContent).toBe('true');
    expect(screen.getByTestId('is-lg-up').textContent).toBe('false');
    expect(screen.getByTestId('is-xl-up').textContent).toBe('false');
    expect(screen.getByTestId('is-mobile').textContent).toBe('false');
    expect(screen.getByTestId('has-hover').textContent).toBe('true');
    expect(screen.getByTestId('is-portrait').textContent).toBe('false');
    expect(screen.getByTestId('viewport-width').textContent).toBe('1024');
    expect(screen.getByTestId('viewport-height').textContent).toBe('768');
    expect(screen.getByTestId('is-ssr').textContent).toBe('true');
  });
  
  test('should update values for mobile viewport', () => {
    // Mock the hooks to return mobile values
    const { useCurrentBreakpoint, useBreakpoint, useMobileDetect, usePortraitOrientation, useViewportSize } = require('../../../hooks/useMediaQuery');
    
    useCurrentBreakpoint.mockReturnValue('xs');
    useBreakpoint.mockImplementation((size: keyof typeof breakpoints) => size === 'sm');
    useMobileDetect.mockReturnValue(true);
    usePortraitOrientation.mockReturnValue(true);
    useViewportSize.mockReturnValue({ width: 320, height: 568 });
    
    render(
      <ResponsiveProvider>
        <TestComponent />
      </ResponsiveProvider>
    );
    
    // Check mobile values
    expect(screen.getByTestId('breakpoint').textContent).toBe('xs');
    expect(screen.getByTestId('is-sm-up').textContent).toBe('true');
    expect(screen.getByTestId('is-md-up').textContent).toBe('false');
    expect(screen.getByTestId('is-lg-up').textContent).toBe('false');
    expect(screen.getByTestId('is-xl-up').textContent).toBe('false');
    expect(screen.getByTestId('is-mobile').textContent).toBe('true');
    expect(screen.getByTestId('is-portrait').textContent).toBe('true');
    expect(screen.getByTestId('viewport-width').textContent).toBe('320');
    expect(screen.getByTestId('viewport-height').textContent).toBe('568');
  });
  
  test('should update values for tablet viewport', () => {
    // Mock the hooks to return tablet values
    const { useCurrentBreakpoint, useBreakpoint, useMobileDetect, usePortraitOrientation, useViewportSize } = require('../../../hooks/useMediaQuery');
    
    useCurrentBreakpoint.mockReturnValue('sm');
    useBreakpoint.mockImplementation((size: keyof typeof breakpoints) => ['sm', 'md'].includes(size as string));
    useMobileDetect.mockReturnValue(false);
    usePortraitOrientation.mockReturnValue(true);
    useViewportSize.mockReturnValue({ width: 768, height: 1024 });
    
    render(
      <ResponsiveProvider>
        <TestComponent />
      </ResponsiveProvider>
    );
    
    // Check tablet values
    expect(screen.getByTestId('breakpoint').textContent).toBe('sm');
    expect(screen.getByTestId('is-sm-up').textContent).toBe('true');
    expect(screen.getByTestId('is-md-up').textContent).toBe('true');
    expect(screen.getByTestId('is-lg-up').textContent).toBe('false');
    expect(screen.getByTestId('is-xl-up').textContent).toBe('false');
    expect(screen.getByTestId('is-mobile').textContent).toBe('false');
    expect(screen.getByTestId('is-portrait').textContent).toBe('true');
    expect(screen.getByTestId('viewport-width').textContent).toBe('768');
    expect(screen.getByTestId('viewport-height').textContent).toBe('1024');
  });
  
  test('should update values for desktop viewport', () => {
    // Mock the hooks to return desktop values
    const { useCurrentBreakpoint, useBreakpoint, useViewportSize } = require('../../../hooks/useMediaQuery');
    
    useCurrentBreakpoint.mockReturnValue('lg');
    useBreakpoint.mockImplementation((size: keyof typeof breakpoints) => ['sm', 'md', 'lg'].includes(size as string));
    useViewportSize.mockReturnValue({ width: 1280, height: 800 });
    
    render(
      <ResponsiveProvider>
        <TestComponent />
      </ResponsiveProvider>
    );
    
    // Check desktop values
    expect(screen.getByTestId('breakpoint').textContent).toBe('lg');
    expect(screen.getByTestId('is-sm-up').textContent).toBe('true');
    expect(screen.getByTestId('is-md-up').textContent).toBe('true');
    expect(screen.getByTestId('is-lg-up').textContent).toBe('true');
    expect(screen.getByTestId('is-xl-up').textContent).toBe('false');
    expect(screen.getByTestId('viewport-width').textContent).toBe('1280');
    expect(screen.getByTestId('viewport-height').textContent).toBe('800');
  });
  
  test('should update SSR state after mount', () => {
    render(
      <ResponsiveProvider>
        <TestComponent />
      </ResponsiveProvider>
    );
    
    // Initially SSR should be true
    expect(screen.getByTestId('is-ssr').textContent).toBe('true');
    
    // After useEffect runs, SSR should be false
    act(() => {
      // Trigger useEffect cleanup and re-run
      jest.runAllTimers();
    });
    
    // Now SSR should be false
    expect(screen.getByTestId('is-ssr').textContent).toBe('false');
  });
  
  test('should provide breakpoint values', () => {
    render(
      <ResponsiveProvider>
        <div data-testid="test-component">
          <div data-testid="xs-breakpoint">{breakpoints.xs}</div>
          <div data-testid="sm-breakpoint">{breakpoints.sm}</div>
          <div data-testid="md-breakpoint">{breakpoints.md}</div>
          <div data-testid="lg-breakpoint">{breakpoints.lg}</div>
          <div data-testid="xl-breakpoint">{breakpoints.xl}</div>
        </div>
      </ResponsiveProvider>
    );
    
    // Check breakpoint values
    expect(screen.getByTestId('xs-breakpoint').textContent).toBe('0');
    expect(screen.getByTestId('sm-breakpoint').textContent).toBe('600');
    expect(screen.getByTestId('md-breakpoint').textContent).toBe('960');
    expect(screen.getByTestId('lg-breakpoint').textContent).toBe('1280');
    expect(screen.getByTestId('xl-breakpoint').textContent).toBe('1920');
  });
});