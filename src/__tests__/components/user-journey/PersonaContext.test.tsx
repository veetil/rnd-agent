import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PersonaProvider, usePersona } from '../../../components/user-journey/PersonaContext';

// Create a test component that uses the PersonaContext
const TestComponent = () => {
  const {
    persona,
    setPersona,
    isReturningUser,
    setIsReturningUser,
    userPreferences,
    setUserPreferences,
    userHistory,
    addPageVisit,
    addInteraction,
    resetHistory
  } = usePersona();
  
  return (
    <div>
      <div data-testid="current-persona">{persona}</div>
      <div data-testid="is-returning">{isReturningUser ? 'returning' : 'new'}</div>
      <div data-testid="visited-pages">{userHistory.visitedPages.join(',')}</div>
      <div data-testid="interactions">{Object.keys(userHistory.interactions).join(',')}</div>
      
      <button onClick={() => setPersona('business-stakeholder')}>Set Business</button>
      <button onClick={() => setPersona('engineering-leader')}>Set Engineering</button>
      <button onClick={() => setPersona('technical-developer')}>Set Developer</button>
      <button onClick={() => setPersona('general')}>Set General</button>
      
      <button onClick={() => setIsReturningUser(true)}>Set Returning</button>
      <button onClick={() => addPageVisit('/test-page')}>Add Page Visit</button>
      <button onClick={() => addInteraction('click')}>Add Interaction</button>
      <button onClick={resetHistory}>Reset History</button>
      
      <button onClick={() => setUserPreferences({ theme: 'dark' })}>Set Preferences</button>
    </div>
  );
};

describe('PersonaContext', () => {
  test('should provide default values', () => {
    render(
      <PersonaProvider>
        <TestComponent />
      </PersonaProvider>
    );
    
    // Initially, persona should be set to 'general'
    expect(screen.getByTestId('current-persona')).toHaveTextContent('general');
    expect(screen.getByTestId('is-returning')).toHaveTextContent('new');
    expect(screen.getByTestId('visited-pages')).toHaveTextContent('');
    expect(screen.getByTestId('interactions')).toHaveTextContent('');
  });
  
  test('should update persona when setPersona is called', () => {
    render(
      <PersonaProvider>
        <TestComponent />
      </PersonaProvider>
    );
    
    // Set persona to business-stakeholder
    fireEvent.click(screen.getByText('Set Business'));
    
    // Persona should now be business-stakeholder
    expect(screen.getByTestId('current-persona')).toHaveTextContent('business-stakeholder');
    
    // Set persona to engineering-leader
    fireEvent.click(screen.getByText('Set Engineering'));
    
    // Persona should now be engineering-leader
    expect(screen.getByTestId('current-persona')).toHaveTextContent('engineering-leader');
    
    // Set persona to technical-developer
    fireEvent.click(screen.getByText('Set Developer'));
    
    // Persona should now be technical-developer
    expect(screen.getByTestId('current-persona')).toHaveTextContent('technical-developer');
    
    // Set persona to general
    fireEvent.click(screen.getByText('Set General'));
    
    // Persona should now be general
    expect(screen.getByTestId('current-persona')).toHaveTextContent('general');
  });
  
  test('should track user history', () => {
    render(
      <PersonaProvider>
        <TestComponent />
      </PersonaProvider>
    );
    
    // Add a page visit
    fireEvent.click(screen.getByText('Add Page Visit'));
    
    // Visited pages should include the new page
    expect(screen.getByTestId('visited-pages')).toHaveTextContent('/test-page');
    
    // Add an interaction
    fireEvent.click(screen.getByText('Add Interaction'));
    
    // Interactions should include the new interaction
    expect(screen.getByTestId('interactions')).toHaveTextContent('click');
    
    // Reset history
    fireEvent.click(screen.getByText('Reset History'));
    
    // History should be cleared
    expect(screen.getByTestId('visited-pages')).toHaveTextContent('');
    expect(screen.getByTestId('interactions')).toHaveTextContent('');
  });
  test('should update returning user status', () => {
    render(
      <PersonaProvider>
        <TestComponent />
      </PersonaProvider>
    );
    
    // Initially, user should not be returning
    expect(screen.getByTestId('is-returning')).toHaveTextContent('new');
    
    // Set user as returning
    fireEvent.click(screen.getByText('Set Returning'));
    
    // User should now be marked as returning
    expect(screen.getByTestId('is-returning')).toHaveTextContent('returning');
  });
  
  test('should update user preferences', () => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    
    // Mock localStorage.getItem to return null initially
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <PersonaProvider>
        <TestComponent />
      </PersonaProvider>
    );
    
    // Set user preferences
    fireEvent.click(screen.getByText('Set Preferences'));
    
    // localStorage.setItem should be called
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });
  
  test('should load data from localStorage on initialization', () => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    
    // Mock localStorage.getItem to return stored data
    localStorageMock.getItem.mockReturnValue(JSON.stringify({
      persona: 'engineering-leader',
      userPreferences: { theme: 'dark' },
      userHistory: {
        visitedPages: ['/home', '/about'],
        interactions: { click: 5, scroll: 3 },
        lastVisit: new Date().toISOString()
      }
    }));
    
    render(
      <PersonaProvider>
        <TestComponent />
      </PersonaProvider>
    );
    
    // Data should be loaded from localStorage
    expect(screen.getByTestId('current-persona')).toHaveTextContent('engineering-leader');
    expect(screen.getByTestId('visited-pages')).toHaveTextContent('/home,/about');
    expect(screen.getByTestId('interactions')).toHaveTextContent('click,scroll');
  });
  
  test('should handle localStorage errors gracefully', () => {
    // Mock localStorage to throw an error
    Object.defineProperty(window, 'localStorage', {
      get: () => {
        throw new Error('localStorage is not available');
      },
    });
    
    // This should not throw an error
    render(
      <PersonaProvider>
        <TestComponent />
      </PersonaProvider>
    );
    
    // Component should render with default values
    expect(screen.getByTestId('current-persona')).toHaveTextContent('general');
  });
  
  test('should use custom initial persona when provided', () => {
    render(
      <PersonaProvider initialPersona="technical-developer">
        <TestComponent />
      </PersonaProvider>
    );
    
    // Persona should be the provided initial value
    expect(screen.getByTestId('current-persona')).toHaveTextContent('technical-developer');
  });
  
  test('should use custom storage key when provided', () => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
    
    // Mock localStorage.getItem to return null
    localStorageMock.getItem.mockReturnValue(null);
    
    render(
      <PersonaProvider storageKey="custom-storage-key">
        <TestComponent />
      </PersonaProvider>
    );
    
    // Set persona to trigger localStorage.setItem
    fireEvent.click(screen.getByText('Set Business'));
    
    // localStorage.getItem should be called with the custom key
    expect(localStorageMock.getItem).toHaveBeenCalledWith('custom-storage-key');
  });
});