import { render, screen } from '@testing-library/react';
import Logo from '../../../../components/landing/Logo';

describe('Logo Component', () => {
  it('renders logo image with correct alt text', () => {
    render(<Logo src="/logo.svg" />);
    
    expect(screen.getByAltText('R&D Agent Store')).toBeInTheDocument();
    expect(screen.getByAltText('R&D Agent Store')).toHaveAttribute('src', '/logo.svg');
  });
  
  it('renders with correct size', () => {
    render(<Logo src="/logo.svg" size="large" />);
    
    expect(screen.getByTestId('logo-container')).toHaveClass('logo-large');
  });

  it('renders with medium size by default', () => {
    render(<Logo src="/logo.svg" />);
    
    expect(screen.getByTestId('logo-container')).toHaveClass('logo-medium');
  });

  it('renders with small size when specified', () => {
    render(<Logo src="/logo.svg" size="small" />);
    
    expect(screen.getByTestId('logo-container')).toHaveClass('logo-small');
  });

  it('applies correct size class to the image', () => {
    render(<Logo src="/logo.svg" size="large" />);
    
    expect(screen.getByAltText('R&D Agent Store')).toHaveClass('h-10');
  });
});