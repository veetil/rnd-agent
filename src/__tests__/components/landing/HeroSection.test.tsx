import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeroSection from '@/components/landing/HeroSection';

// Mock the AnimatedVisual component
jest.mock('@/components/landing/AnimatedVisual', () => {
  return function MockAnimatedVisual({ type }: { type?: string }) {
    return (
      <div 
        data-testid="animated-visual" 
        data-type={type} 
        data-playing="true"
      />
    );
  };
});

describe('HeroSection Component', () => {
  const defaultProps = {
    heading: 'Transform Research Into Results—Automatically',
    subheading: 'Discover and implement breakthrough improvements from cutting-edge research without the overhead.',
    ctaText: 'Join the Waitlist',
    ctaAction: jest.fn(),
    visualType: 'particles' as const,
  };
  
  it('renders heading and subheading', () => {
    const { getByText } = render(<HeroSection {...defaultProps} />);
    
    expect(getByText(defaultProps.heading)).toBeInTheDocument();
    expect(getByText(defaultProps.subheading)).toBeInTheDocument();
  });
  
  it('renders CTA button with correct text', () => {
    const { getByRole } = render(<HeroSection {...defaultProps} />);
    
    expect(getByRole('button', { name: defaultProps.ctaText })).toBeInTheDocument();
  });
  
  it('renders animated visual', () => {
    const { getByTestId } = render(<HeroSection {...defaultProps} />);
    
    expect(getByTestId('animated-visual')).toBeInTheDocument();
    expect(getByTestId('animated-visual')).toHaveAttribute('data-type', defaultProps.visualType);
  });
  
  it('calls ctaAction when CTA button is clicked', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<HeroSection {...defaultProps} />);
    
    await user.click(getByRole('button', { name: defaultProps.ctaText }));
    
    expect(defaultProps.ctaAction).toHaveBeenCalledTimes(1);
  });
  
  it('adapts to mobile viewport', () => {
    // Mock mobile viewport
    window.innerWidth = 375;
    window.innerHeight = 667;
    
    const { getByTestId } = render(<HeroSection {...defaultProps} />);
    
    // Test mobile-specific layout
    expect(getByTestId('hero-container')).toHaveClass('flex-col');
  });
  
  it('adapts to desktop viewport', () => {
    // Mock desktop viewport
    window.innerWidth = 1440;
    window.innerHeight = 900;
    
    const { getByTestId } = render(<HeroSection {...defaultProps} />);
    
    // Test desktop-specific layout
    expect(getByTestId('hero-container')).toHaveClass('md:flex-row');
  });
});