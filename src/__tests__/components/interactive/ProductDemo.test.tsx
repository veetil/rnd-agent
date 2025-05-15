import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductDemo } from '../../../components/interactive/ProductDemo';
import { AnimationProvider } from '../../../components/animations/AnimationContext';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, animate, initial, variants, exit, transition, ...props }: any) => (
        <div
          data-testid="motion-div"
          data-animate={animate}
          data-initial={initial}
          exit={exit}
          transition={transition}
          {...props}
        >
          {children}
        </div>
      )
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
  };
});

describe('ProductDemo', () => {
  // Create mock steps with string content instead of JSX
  const mockSteps = [
    {
      id: '1',
      title: 'Create Project',
      description: 'Start by creating a new project in the dashboard.',
      content: 'Create project content',
      codeExample: 'npm init ideacode-project my-project',
      diagramSrc: '/images/demo/step1-diagram.png'
    },
    {
      id: '2',
      title: 'Configure Settings',
      description: 'Adjust the project settings to match your requirements.',
      content: 'Configure settings content',
      codeExample: 'ideacode config --set environment=production'
    },
    {
      id: '3',
      title: 'Deploy Application',
      description: 'Deploy your application to the cloud with a single command.',
      content: 'Deploy application content',
      codeExample: 'ideacode deploy --target=cloud'
    }
  ];

  // Create mock comparison view with string content
  const mockComparisonView = {
    before: {
      title: 'Before IdeaCode',
      content: 'Complex deployment process'
    },
    after: {
      title: 'With IdeaCode',
      content: 'Simple one-command deployment'
    }
  };

  test('should render product demo title and subtitle', () => {
    render(
      <AnimationProvider>
        <ProductDemo
          title="Interactive Product Demo"
          subtitle="See how easy it is to use our platform"
          steps={mockSteps}
        />
      </AnimationProvider>
    );
    
    expect(screen.getByText('Interactive Product Demo')).toBeInTheDocument();
    expect(screen.getByText('See how easy it is to use our platform')).toBeInTheDocument();
  });
  
  test('should render the first demo step by default', () => {
    render(
      <AnimationProvider>
        <ProductDemo
          title="Interactive Product Demo"
          steps={mockSteps}
        />
      </AnimationProvider>
    );
    
    // First step should be visible
    expect(screen.getByRole('heading', { name: 'Create Project' })).toBeInTheDocument();
    expect(screen.getByText('Start by creating a new project in the dashboard.')).toBeInTheDocument();
    expect(screen.getByText('npm init ideacode-project my-project')).toBeInTheDocument();
    
    // Other steps should not be visible
    expect(screen.queryByRole('heading', { name: 'Configure Settings' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Deploy Application' })).not.toBeInTheDocument();
  });
  
  test('should navigate to next step when next button is clicked', () => {
    render(
      <AnimationProvider>
        <ProductDemo
          title="Interactive Product Demo"
          steps={mockSteps}
        />
      </AnimationProvider>
    );
    
    // Initially on first step
    expect(screen.getByRole('heading', { name: 'Create Project' })).toBeInTheDocument();
    
    // Click next button
    fireEvent.click(screen.getByLabelText('Next step'));
    
    // Should show second step
    expect(screen.getByRole('heading', { name: 'Configure Settings' })).toBeInTheDocument();
    expect(screen.getByText('Adjust the project settings to match your requirements.')).toBeInTheDocument();
    expect(screen.getByText('ideacode config --set environment=production')).toBeInTheDocument();
    
    // First step should not be visible anymore
    expect(screen.queryByText('Start by creating a new project in the dashboard.')).not.toBeInTheDocument();
  });
  
  test('should navigate to previous step when previous button is clicked', () => {
    render(
      <AnimationProvider>
        <ProductDemo
          title="Interactive Product Demo"
          steps={mockSteps}
        />
      </AnimationProvider>
    );
    
    // Go to second step
    fireEvent.click(screen.getByLabelText('Next step'));
    expect(screen.getByRole('heading', { name: 'Configure Settings' })).toBeInTheDocument();
    
    // Click previous button
    fireEvent.click(screen.getByLabelText('Previous step'));
    
    // Should show first step again
    expect(screen.getByRole('heading', { name: 'Create Project' })).toBeInTheDocument();
    expect(screen.getByText('Start by creating a new project in the dashboard.')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Configure Settings' })).not.toBeInTheDocument();
  });
  
  test('should disable previous button on first step', () => {
    render(
      <AnimationProvider>
        <ProductDemo
          title="Interactive Product Demo"
          steps={mockSteps}
        />
      </AnimationProvider>
    );
    
    // Previous button should be disabled on first step
    const prevButton = screen.getByLabelText('Previous step');
    expect(prevButton).toBeDisabled();
    
    // Go to second step
    fireEvent.click(screen.getByLabelText('Next step'));
    
    // Previous button should be enabled
    expect(prevButton).not.toBeDisabled();
  });
  
  test('should disable next button on last step', () => {
    render(
      <AnimationProvider>
        <ProductDemo
          title="Interactive Product Demo"
          steps={mockSteps}
        />
      </AnimationProvider>
    );
    
    // Next button should be enabled on first step
    const nextButton = screen.getByLabelText('Next step');
    expect(nextButton).not.toBeDisabled();
    
    // Go to last step
    fireEvent.click(nextButton); // to step 2
    fireEvent.click(nextButton); // to step 3
    
    // Next button should be disabled on last step
    expect(nextButton).toBeDisabled();
  });
  
  test('should jump to specific step when step indicator is clicked', () => {
    render(
      <AnimationProvider>
        <ProductDemo
          title="Interactive Product Demo"
          steps={mockSteps}
        />
      </AnimationProvider>
    );
    
    // Initially on first step
    expect(screen.getByRole('heading', { name: 'Create Project' })).toBeInTheDocument();
    
    // Click on third step indicator
    const stepIndicators = screen.getAllByRole('tab');
    fireEvent.click(stepIndicators[2]); // Third step indicator (0-indexed)
    
    // Should show third step
    expect(screen.getByRole('heading', { name: 'Deploy Application' })).toBeInTheDocument();
    expect(screen.getByText('Deploy your application to the cloud with a single command.')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Create Project' })).not.toBeInTheDocument();
  });
  
  test('should render comparison view when provided', () => {
    render(
      <AnimationProvider>
        <ProductDemo
          title="Interactive Product Demo"
          steps={mockSteps}
          comparisonView={mockComparisonView}
        />
      </AnimationProvider>
    );
    
    // Click show comparison button
    fireEvent.click(screen.getByText('Show Before/After Comparison'));
    
    // Comparison view should be visible
    expect(screen.getByText('Before/After Comparison')).toBeInTheDocument();
    expect(screen.getByText('Before IdeaCode')).toBeInTheDocument();
    expect(screen.getByText('With IdeaCode')).toBeInTheDocument();
    expect(screen.getByText('Complex deployment process')).toBeInTheDocument();
    expect(screen.getByText('Simple one-command deployment')).toBeInTheDocument();
  });
  
  test('should toggle code editing mode when edit button is clicked', () => {
    render(
      <AnimationProvider>
        <ProductDemo
          title="Interactive Product Demo"
          steps={mockSteps}
        />
      </AnimationProvider>
    );
    
    // Initially in view mode
    expect(screen.getByText('Edit Code')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    
    // Click edit button
    fireEvent.click(screen.getByText('Edit Code'));
    
    // Should switch to edit mode
    expect(screen.getByText('Apply Changes')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    
    // Click apply changes button
    fireEvent.click(screen.getByText('Apply Changes'));
    
    // Should switch back to view mode
    expect(screen.getByText('Edit Code')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
});