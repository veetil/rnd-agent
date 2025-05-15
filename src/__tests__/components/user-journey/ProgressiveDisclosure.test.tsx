import React, { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProgressiveDisclosure } from '../../../components/user-journey/ProgressiveDisclosure';
import { AnimationProvider } from '../../../components/animations/AnimationContext';

// Mock PersonaContext module
jest.mock('../../../components/user-journey/PersonaContext', () => ({
  PersonaProvider: ({ children }: { children: ReactNode }) => <>{children}</>,
  usePersona: jest.fn().mockReturnValue({ persona: '', setPersona: jest.fn() })
}));

// Import the mocked module
import { PersonaProvider, usePersona } from '../../../components/user-journey/PersonaContext';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: any) => <div data-testid="motion-div" {...props}>{children}</div>,
    },
  };
});

// Wrapper component for tests
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <AnimationProvider>
    <PersonaProvider>
      {children}
    </PersonaProvider>
  </AnimationProvider>
);

describe('ProgressiveDisclosure', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  const defaultProps = {
    title: 'Click to expand',
    children: <div>Expanded content</div>,
  };

  test('should render with summary text', () => {
    render(
      <Wrapper>
        <ProgressiveDisclosure {...defaultProps} />
      </Wrapper>
    );

    expect(screen.getByText('Click to expand')).toBeInTheDocument();
  });

  test('should not show content initially when defaultExpanded is false', () => {
    render(
      <Wrapper>
        <ProgressiveDisclosure {...defaultProps} defaultExpanded={false} />
      </Wrapper>
    );

    // When collapsed, the content might not be in the DOM at all
    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument();
  });

  test('should show content initially when defaultExpanded is true', () => {
    render(
      <Wrapper>
        <ProgressiveDisclosure {...defaultProps} defaultExpanded={true} />
      </Wrapper>
    );

    // When expanded, the content should be in the DOM
    expect(screen.getByText('Expanded content')).toBeInTheDocument();
  });

  test('should toggle content visibility when clicked', () => {
    render(
      <Wrapper>
        <ProgressiveDisclosure {...defaultProps} defaultExpanded={false} />
      </Wrapper>
    );

    // Content should be hidden initially
    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText('Click to expand'));
    expect(screen.getByText('Expanded content')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText('Click to expand'));
    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument();
  });

  test('should call onToggle when expanded state changes', () => {
    const onToggleMock = jest.fn();
    render(
      <Wrapper>
        <ProgressiveDisclosure 
          {...defaultProps} 
          defaultExpanded={false} 
          onToggle={onToggleMock} 
        />
      </Wrapper>
    );

    // Click to expand
    fireEvent.click(screen.getByText('Click to expand'));
    expect(onToggleMock).toHaveBeenCalledWith(true);

    // Click to collapse
    fireEvent.click(screen.getByText('Click to expand'));
    expect(onToggleMock).toHaveBeenCalledWith(false);
  });

  test('should apply custom className', () => {
    render(
      <Wrapper>
        <ProgressiveDisclosure
          {...defaultProps}
          className="custom-class"
        />
      </Wrapper>
    );

    // The component doesn't use data-testid, so we need to select by class
    const container = screen.getByText('Click to expand').closest('.progressive-disclosure');
    expect(container).toHaveClass('custom-class');
  });

  test('should expand content when expandForPersonas includes current persona', () => {
    // Set the mock return value for usePersona
    (usePersona as jest.Mock).mockReturnValue({
      persona: 'developer',
      setPersona: jest.fn()
    });

    render(
      <Wrapper>
        <ProgressiveDisclosure
          {...defaultProps}
          expandForPersonas={['developer']}
        />
      </Wrapper>
    );

    // Content should be expanded because the persona matches
    expect(screen.getByText('Expanded content')).toBeInTheDocument();
  });

  test('should not expand content when expandForPersonas does not include current persona', () => {
    // Set the mock return value for usePersona
    (usePersona as jest.Mock).mockReturnValue({
      persona: 'business',
      setPersona: jest.fn()
    });

    render(
      <Wrapper>
        <ProgressiveDisclosure
          {...defaultProps}
          expandForPersonas={['developer']}
        />
      </Wrapper>
    );

    // Content should not be expanded because the persona doesn't match
    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument();
  });

  test('should be disabled when disabled prop is true', () => {
    render(
      <Wrapper>
        <ProgressiveDisclosure
          {...defaultProps}
          disabled={true}
        />
      </Wrapper>
    );

    // Get the header element
    const header = screen.getByText('Click to expand').closest('.progressive-disclosure-header')!;
    
    // Click should not toggle the content
    fireEvent.click(header);
    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument();
  });

  // Mock localStorage for persistState tests
  const mockLocalStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    key: jest.fn(),
    length: 0
  };

  describe('with persistState', () => {
    // Save the original localStorage
    const originalLocalStorage = window.localStorage;

    beforeAll(() => {
      // Replace localStorage methods with our mocks
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      });
    });

    afterAll(() => {
      // Restore original localStorage
      Object.defineProperty(window, 'localStorage', {
        value: originalLocalStorage,
        writable: true
      });
    });

    beforeEach(() => {
      // Clear all mocks before each test
      jest.clearAllMocks();
      
      // Reset localStorage mock to default values
      mockLocalStorage.getItem.mockReturnValue(null);
    });

    test('should save expanded state to localStorage when persistState is true', () => {
      render(
        <Wrapper>
          <ProgressiveDisclosure
            {...defaultProps}
            persistState={true}
            storageKey="test-storage-key"
          />
        </Wrapper>
      );

      // Click to expand
      fireEvent.click(screen.getByText('Click to expand'));
      
      // Should save to localStorage
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        expect.stringContaining('test-storage-key'),
        'true'
      );
    });

    test('should load expanded state from localStorage when persistState is true', () => {
      // Mock localStorage to return expanded state
      mockLocalStorage.getItem.mockReturnValue('true');
      
      render(
        <Wrapper>
          <ProgressiveDisclosure
            {...defaultProps}
            persistState={true}
            storageKey="test-storage-key"
          />
        </Wrapper>
      );

      // Content should be expanded based on localStorage value
      expect(screen.getByText('Expanded content')).toBeVisible();
    });
  });

  test('should show read more button when useReadMore is true', () => {
    render(
      <Wrapper>
        <ProgressiveDisclosure
          {...defaultProps}
          useReadMore={true}
          readMoreText="Show more"
          readLessText="Show less"
        />
      </Wrapper>
    );

    // Should show the read more button
    expect(screen.getByText('Show more')).toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(screen.getByText('Show more'));
    
    // Should now show the read less button
    expect(screen.getByText('Show less')).toBeInTheDocument();
    
    // Content should be visible
    expect(screen.getByText('Expanded content')).toBeVisible();
  });
});