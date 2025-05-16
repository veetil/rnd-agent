import { render, screen } from '@testing-library/react';
import AnimatedVisual from '@/components/landing/AnimatedVisual';

describe('AnimatedVisual Component', () => {
  it('renders with default type', () => {
    render(<AnimatedVisual />);
    
    expect(screen.getByTestId('animated-visual')).toBeInTheDocument();
  });
  
  it('renders with specified type', () => {
    render(<AnimatedVisual type="particles" />);
    
    expect(screen.getByTestId('animated-visual')).toHaveAttribute('data-type', 'particles');
  });
  
  it('respects reduced motion preferences', () => {
    // Mock prefers-reduced-motion media query
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }));
    
    render(<AnimatedVisual />);
    
    expect(screen.getByTestId('animated-visual')).toHaveAttribute('data-reduced-motion', 'true');
  });
});