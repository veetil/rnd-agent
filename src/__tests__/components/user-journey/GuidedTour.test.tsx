import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GuidedTour, TourButton } from '../../../components/user-journey/GuidedTour';
import { PersonaProvider } from '../../../components/user-journey/PersonaContext';
import { AnimationProvider } from '../../../components/animations/AnimationContext';

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

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
  length: 0
};

// Mock getBoundingClientRect for target elements
Element.prototype.getBoundingClientRect = jest.fn(() => ({
  width: 100,
  height: 50,
  top: 100,
  left: 100,
  bottom: 150,
  right: 200,
  x: 100,
  y: 100,
  toJSON: () => {},
}));

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock querySelector to return a div for target elements
document.querySelector = jest.fn(() => {
  const div = document.createElement('div');
  div.id = 'target-element';
  return div;
});

// Default props for testing
const defaultSteps = [
  {
    target: '#step-1',
    title: 'Step 1',
    content: 'This is step 1 content',
    position: 'bottom' as const,
  },
  {
    target: '#step-2',
    title: 'Step 2',
    content: 'This is step 2 content',
    position: 'top' as const,
  },
  {
    target: '#step-3',
    title: 'Step 3',
    content: 'This is step 3 content',
    position: 'left' as const,
  },
];

const defaultProps = {
  steps: defaultSteps,
  isActive: true,
  tourId: 'test-tour',
};

// Wrapper component with providers
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <AnimationProvider>
    <PersonaProvider>
      {children}
    </PersonaProvider>
  </AnimationProvider>
);

describe('GuidedTour', () => {
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
    
    // Set up window dimensions for tests
    Object.defineProperty(window, 'innerWidth', { value: 1024 });
    Object.defineProperty(window, 'innerHeight', { value: 768 });
  });

  test('should render the first step when active', () => {
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} />
      </Wrapper>
    );

    // Check if the first step is rendered
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('This is step 1 content')).toBeInTheDocument();
    
    // Check if the navigation buttons are rendered
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
    
    // Previous button should not be visible on the first step
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
  });

  test('should not render when not active', () => {
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} isActive={false} />
      </Wrapper>
    );

    // Check that no step is rendered
    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
  });

  test('should navigate to the next step when clicking Next', () => {
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} />
      </Wrapper>
    );

    // Click the Next button
    fireEvent.click(screen.getByText('Next'));

    // Check if the second step is rendered
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('This is step 2 content')).toBeInTheDocument();
    
    // Previous button should now be visible
    expect(screen.getByText('Previous')).toBeInTheDocument();
  });

  test('should navigate to the previous step when clicking Previous', () => {
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} />
      </Wrapper>
    );

    // Go to the second step
    fireEvent.click(screen.getByText('Next'));
    
    // Check if the second step is rendered
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    
    // Go back to the first step
    fireEvent.click(screen.getByText('Previous'));
    
    // Check if the first step is rendered again
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('This is step 1 content')).toBeInTheDocument();
  });

  test('should close the tour when clicking Skip', () => {
    const onCloseMock = jest.fn();
    
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} onClose={onCloseMock} />
      </Wrapper>
    );

    // Click the Skip button
    fireEvent.click(screen.getByText('Skip'));
    
    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('should complete the tour when reaching the last step and clicking Done', () => {
    const onCompleteMock = jest.fn();
    
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} onComplete={onCompleteMock} />
      </Wrapper>
    );

    // Go to the last step
    fireEvent.click(screen.getByText('Next')); // Step 2
    fireEvent.click(screen.getByText('Next')); // Step 3
    
    // Check if the last step is rendered
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    
    // The Next button should now say "Done"
    expect(screen.getByText('Done')).toBeInTheDocument();
    
    // Click the Done button
    fireEvent.click(screen.getByText('Done'));
    
    // Check if onComplete was called
    expect(onCompleteMock).toHaveBeenCalled();
    
    // Check if the tour was marked as completed in localStorage
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('completedTours', JSON.stringify(['test-tour']));
  });

  test('should not show the tour if it has been completed before and showOnce is true', () => {
    // Mock localStorage to return that the tour has been completed
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(['test-tour']));
    
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} showOnce={true} />
      </Wrapper>
    );

    // Check that no step is rendered
    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
  });

  test('should show the tour even if it has been completed before when showOnce is false', () => {
    // Mock localStorage to return that the tour has been completed
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(['test-tour']));
    
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} showOnce={false} />
      </Wrapper>
    );

    // Check that the first step is rendered
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  test('should filter steps based on persona', () => {
    const stepsWithPersona = [
      ...defaultSteps,
      {
        target: '#step-4',
        title: 'Step 4',
        content: 'This is step 4 content',
        position: 'right' as const,
        relevantPersonas: 'developer',
      },
    ];
    
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} steps={stepsWithPersona} />
      </Wrapper>
    );

    // Go through all steps
    fireEvent.click(screen.getByText('Next')); // Step 2
    fireEvent.click(screen.getByText('Next')); // Step 3
    
    // Step 4 should not be visible because the default persona is not 'developer'
    expect(screen.getByText('Done')).toBeInTheDocument(); // We should see Done at Step 3
    
    // Click Done to complete the tour
    fireEvent.click(screen.getByText('Done'));
    
    // Check that the tour was marked as completed
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('completedTours', JSON.stringify(['test-tour']));
  });

  test('should call onStepShown when a step is shown', () => {
    const onStepShownMock = jest.fn();
    
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} onStepShown={onStepShownMock} />
      </Wrapper>
    );

    // Check if onStepShown was called for the first step
    expect(onStepShownMock).toHaveBeenCalledWith(defaultSteps[0], 0);
    
    // Go to the second step
    fireEvent.click(screen.getByText('Next'));
    
    // Check if onStepShown was called for the second step
    expect(onStepShownMock).toHaveBeenCalledWith(defaultSteps[1], 1);
  });

  test('should call onStepHidden when a step is hidden', () => {
    const onStepHiddenMock = jest.fn();
    
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} onStepHidden={onStepHiddenMock} />
      </Wrapper>
    );

    // Go to the second step
    fireEvent.click(screen.getByText('Next'));
    
    // Check if onStepHidden was called for the first step
    expect(onStepHiddenMock).toHaveBeenCalledWith(defaultSteps[0], 0);
  });

  test('should use custom render function when provided', () => {
    const customRenderMock = jest.fn(() => <div>Custom Step Content</div>);
    const stepsWithCustomRender = [
      {
        ...defaultSteps[0],
        render: customRenderMock,
      },
    ];
    
    render(
      <Wrapper>
        <GuidedTour {...defaultProps} steps={stepsWithCustomRender} />
      </Wrapper>
    );

    // Check if the custom render function was called
    expect(customRenderMock).toHaveBeenCalled();
    
    // Check if the custom content is rendered
    expect(screen.getByText('Custom Step Content')).toBeInTheDocument();
  });
});

describe('TourButton', () => {
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

  test('should render the button with text', () => {
    render(
      <Wrapper>
        <TourButton tourId="test-tour" steps={defaultSteps} text="Start Tour" />
      </Wrapper>
    );

    // Check if the button is rendered with the correct text
    expect(screen.getByText('Start Tour')).toBeInTheDocument();
  });

  test('should start the tour when clicked', () => {
    const onStartMock = jest.fn();
    
    render(
      <Wrapper>
        <TourButton
          tourId="test-tour"
          steps={defaultSteps}
          text="Start Tour"
          onStart={onStartMock}
        />
      </Wrapper>
    );

    // Click the button
    fireEvent.click(screen.getByText('Start Tour'));
    
    // Check if onStart was called
    expect(onStartMock).toHaveBeenCalled();
    
    // Check if the tour is now visible
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  test('should not render the button if the tour has been completed and showOnce is true', () => {
    // Mock localStorage to return that the tour has been completed
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(['test-tour']));
    
    render(
      <Wrapper>
        <TourButton
          tourId="test-tour"
          steps={defaultSteps}
          text="Start Tour"
          showOnce={true}
        />
      </Wrapper>
    );

    // Check that the button is not rendered
    expect(screen.queryByText('Start Tour')).not.toBeInTheDocument();
  });

  test('should render the button with an icon', () => {
    render(
      <Wrapper>
        <TourButton 
          tourId="test-tour" 
          steps={defaultSteps} 
          text="Start Tour" 
          icon={<span data-testid="tour-icon">🔍</span>} 
        />
      </Wrapper>
    );

    // Check if the icon is rendered
    expect(screen.getByTestId('tour-icon')).toBeInTheDocument();
  });

  test('should show tooltip on hover when showTooltip is true', () => {
    render(
      <Wrapper>
        <TourButton 
          tourId="test-tour" 
          steps={defaultSteps} 
          text="Start Tour" 
          tooltip="Click to start the tour" 
          showTooltip={true} 
        />
      </Wrapper>
    );

    // Hover over the button
    fireEvent.mouseEnter(screen.getByText('Start Tour'));
    
    // Check if the tooltip is shown
    expect(screen.getByText('Click to start the tour')).toBeInTheDocument();
    
    // Mouse leave
    fireEvent.mouseLeave(screen.getByText('Start Tour'));
    
    // Check if the tooltip is hidden
    expect(screen.queryByText('Click to start the tour')).not.toBeInTheDocument();
  });

  test('should not render the button if relevantPersonas does not include current persona', () => {
    render(
      <Wrapper>
        <TourButton 
          tourId="test-tour" 
          steps={defaultSteps} 
          text="Start Tour" 
          relevantPersonas="developer" 
        />
      </Wrapper>
    );

    // Check that the button is not rendered (default persona is not 'developer')
    expect(screen.queryByText('Start Tour')).not.toBeInTheDocument();
  });
});