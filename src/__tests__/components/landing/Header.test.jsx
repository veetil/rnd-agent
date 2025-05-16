import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../../../components/landing/Header';

describe('Header Component', () => {
  const defaultProps = {
    logoSrc: '/logo.svg',
    navigationItems: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' }
    ],
    ctaText: 'Join Waitlist',
    ctaAction: jest.fn()
  };
  
  it('renders logo and navigation items', () => {
    render(<Header {...defaultProps} />);
    
    expect(screen.getByAltText('R&D Agent Store')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
  
  it('renders CTA button with correct text', () => {
    render(<Header {...defaultProps} />);
    
    expect(screen.getByRole('button', { name: defaultProps.ctaText })).toBeInTheDocument();
  });

  it('calls ctaAction when CTA button is clicked', async () => {
    render(<Header {...defaultProps} />);
    
    await userEvent.click(screen.getByRole('button', { name: defaultProps.ctaText }));
    
    expect(defaultProps.ctaAction).toHaveBeenCalledTimes(1);
  });

  it('toggles mobile menu on hamburger click', async () => {
    // Mock window width for mobile view
    window.innerWidth = 500;
    
    render(<Header {...defaultProps} />);
    
    // Mobile menu should be hidden initially
    expect(screen.queryByTestId('mobile-menu')).not.toBeVisible();
    
    // Click hamburger icon
    await userEvent.click(screen.getByTestId('hamburger-icon'));
    
    // Mobile menu should now be visible
    expect(screen.getByTestId('mobile-menu')).toBeVisible();
  });

  it('applies sticky class on scroll', () => {
    render(<Header {...defaultProps} />);
    
    // Initially not scrolled
    expect(screen.getByTestId('header')).not.toHaveClass('scrolled');
    
    // Simulate scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    
    // Should have scrolled class
    expect(screen.getByTestId('header')).toHaveClass('scrolled');
  });
});