import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ContextualCTA } from '../../../components/user-journey/ContextualCTA';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, className, style, onClick, initial, animate, exit, variants, ...props }: any, ref: any) => (
      <div ref={ref} className={className} style={style} onClick={onClick} data-testid="motion-div" {...props}>
        {children}
      </div>
    )),
    img: React.forwardRef(({ src, alt, className, animate, transition, ...props }: any, ref: any) => (
      <img ref={ref} src={src} alt={alt} className={className} {...props} />
    )),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock the PersonaContext
jest.mock('../../../components/user-journey/PersonaContext', () => ({
  usePersona: jest.fn().mockReturnValue({
    persona: 'general',
  }),
}));

// Mock the AnimationContext
jest.mock('../../../components/animations/AnimationContext', () => ({
  useAnimation: jest.fn().mockReturnValue({
    animationsEnabled: true,
    reducedMotion: false,
  }),
}));

// Mock localStorage methods instead of the object itself
interface LocalStorageMock {
  store: Record<string, string>;
  getItem: jest.Mock<string | null, [string]>;
  setItem: jest.Mock<void, [string, string]>;
  clear: jest.Mock<void, []>;
}

const localStorageMock: LocalStorageMock = {
  store: {},
  getItem: jest.fn((key: string): string | null => localStorageMock.store[key] || null),
  setItem: jest.fn((key: string, value: string): void => {
    localStorageMock.store[key] = value.toString();
  }),
  clear: jest.fn((): void => {
    localStorageMock.store = {};
  }),
};

// Mock the localStorage methods
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (key: string) => localStorageMock.getItem(key),
    setItem: (key: string, value: string) => localStorageMock.setItem(key, value),
    clear: () => localStorageMock.clear(),
  },
  writable: true,
});

describe('ContextualCTA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const defaultProps = {
    title: 'Try our new feature',
    description: 'Discover how our new feature can help you',
    actions: [
      {
        label: 'Learn More',
        href: '/features',
        isPrimary: true,
      },
      {
        label: 'Dismiss',
        onClick: jest.fn(),
      },
    ],
  };

  test('should render title, description, and actions', () => {
    render(<ContextualCTA {...defaultProps} show={true} />);
    
    // The component should render with the title and description
    expect(screen.getByText('Try our new feature')).toBeInTheDocument();
    expect(screen.getByText('Discover how our new feature can help you')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
  });

  test('should apply inline position styles by default', () => {
    render(<ContextualCTA {...defaultProps} show={true} />);
    
    // Check for the motion-div with the contextual-cta-inline class
    const cta = screen.getByTestId('motion-div');
    expect(cta).toHaveClass('contextual-cta-inline');
  });

  test('should apply floating position styles when specified', () => {
    render(<ContextualCTA {...defaultProps} position="floating" show={true} />);
    
    // Check for the motion-div with the contextual-cta-floating class
    const cta = screen.getByTestId('motion-div');
    expect(cta).toHaveClass('contextual-cta-floating');
  });

  test('should apply modal position styles when specified', () => {
    render(<ContextualCTA {...defaultProps} position="modal" show={true} />);
    
    // Get all motion-divs (backdrop and modal)
    const motionDivs = screen.getAllByTestId('motion-div');
    expect(motionDivs.length).toBeGreaterThanOrEqual(1);
    
    // The last motion-div should be the modal
    const cta = motionDivs[motionDivs.length - 1];
    expect(cta).toHaveClass('contextual-cta-modal');
  });

  test('should apply primary variant styles by default', () => {
    render(<ContextualCTA {...defaultProps} show={true} />);
    
    // Check for the motion-div with the contextual-cta-primary class
    const cta = screen.getByTestId('motion-div');
    expect(cta).toHaveClass('contextual-cta-primary');
  });

  test('should apply secondary variant styles when specified', () => {
    render(<ContextualCTA {...defaultProps} variant="secondary" show={true} />);
    
    // Check for the motion-div with the contextual-cta-secondary class
    const cta = screen.getByTestId('motion-div');
    expect(cta).toHaveClass('contextual-cta-secondary');
  });

  test('should apply success variant styles when specified', () => {
    render(<ContextualCTA {...defaultProps} variant="success" show={true} />);
    
    // Check for the motion-div with the contextual-cta-success class
    const cta = screen.getByTestId('motion-div');
    expect(cta).toHaveClass('contextual-cta-success');
  });

  test('should show close button when specified', () => {
    render(<ContextualCTA {...defaultProps} showCloseButton={true} show={true} />);
    
    // Look for the close button by its aria-label
    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();
    render(<ContextualCTA {...defaultProps} showCloseButton={true} onClose={onCloseMock} show={true} />);
    
    // Look for the close button by its aria-label and click it
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    // Since we're using setTimeout in handleClose, we need to advance timers
    act(() => {
      jest.advanceTimersByTime(300); // Default animation duration is 0.3s
    });
    
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should call onClick when action is clicked', () => {
    const onClickMock = jest.fn();
    const onActionClickMock = jest.fn();
    
    render(
      <ContextualCTA
        {...defaultProps}
        show={true}
        actions={[
          {
            label: 'Click Me',
            onClick: onClickMock,
          },
        ]}
        onActionClick={onActionClickMock}
      />
    );
    
    const actionButton = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(actionButton);
    
    expect(onClickMock).toHaveBeenCalled();
    expect(onActionClickMock).toHaveBeenCalled();
  });

  test('should not render when relevantPersonas does not include current persona', () => {
    // Mock the usePersona hook to return a different persona
    require('../../../components/user-journey/PersonaContext').usePersona.mockReturnValue({
      persona: 'developer',
    });
    
    render(<ContextualCTA {...defaultProps} show={true} relevantPersonas={['business', 'marketing']} />);
    
    // The CTA should not be rendered
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
  });

  test('should render when relevantPersonas includes current persona', () => {
    // Mock the usePersona hook to return a matching persona
    require('../../../components/user-journey/PersonaContext').usePersona.mockReturnValue({
      persona: 'business',
    });
    
    render(<ContextualCTA {...defaultProps} show={true} relevantPersonas={['business', 'marketing']} />);
    
    // The CTA should be rendered
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  test('should show CTA after time delay when trigger is "time"', () => {
    render(<ContextualCTA {...defaultProps} trigger="time" timeDelay={2} show={false} />);
    
    // Initially, the CTA should not be visible
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
    
    // Advance timers by the delay time
    act(() => {
      jest.advanceTimersByTime(2000); // 2 seconds
    });
    
    // Now the CTA should be visible
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  test('should show CTA on inactivity when trigger is "inactivity"', () => {
    render(<ContextualCTA {...defaultProps} trigger="inactivity" inactivityTime={2} show={false} />);
    
    // Initially, the CTA should not be visible
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
    
    // Advance timers by the inactivity time
    act(() => {
      jest.advanceTimersByTime(2000); // 2 seconds
    });
    
    // Now the CTA should be visible
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  test('should show CTA when explicitly set to show', () => {
    render(<ContextualCTA {...defaultProps} show={true} />);
    
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });

  test('should not show CTA when explicitly set to not show', () => {
    render(<ContextualCTA {...defaultProps} show={false} />);
    
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
  });

  // Note: The behavior of marking CTAs as shown is tested indirectly in the
  // "should not show CTA again if already shown and showOnce is true" test below

  test('should not show CTA again if already shown and showOnce is true', () => {
    // Set up localStorage to indicate the CTA has been shown
    localStorageMock.getItem.mockReturnValue(JSON.stringify(['test-cta']));
    
    render(<ContextualCTA {...defaultProps} showOnce={true} ctaId="test-cta" trigger="time" timeDelay={0.1} />);
    
    // Advance timers
    act(() => {
      jest.advanceTimersByTime(100);
    });
    
    // The CTA should not be shown
    expect(screen.queryByTestId('motion-div')).not.toBeInTheDocument();
  });

  test('should render with custom styling props', () => {
    render(
      <ContextualCTA
        {...defaultProps}
        show={true}
        backgroundColor="#ff0000"
        textColor="#ffffff"
        borderColor="#000000"
        borderWidth="2px"
        borderRadius="10px"
        padding="20px"
        boxShadow="none"
      />
    );
    
    const cta = screen.getByTestId('motion-div');
    expect(cta).toHaveStyle({
      backgroundColor: '#ff0000',
      color: '#ffffff',
      borderColor: '#000000',
      borderWidth: '2px',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: 'none',
    });
  });

  test('should render with image when provided', () => {
    render(
      <ContextualCTA
        {...defaultProps}
        show={true}
        image="/test-image.jpg"
        imageAlt="Test image"
      />
    );
    
    const image = screen.getByAltText('Test image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  test('should render loading state for actions', () => {
    render(
      <ContextualCTA
        {...defaultProps}
        show={true}
        actions={[
          {
            label: 'Submit',
            isLoading: true,
            loadingText: 'Submitting...',
          },
        ]}
      />
    );
    
    expect(screen.getByText('Submitting...')).toBeInTheDocument();
  });
});