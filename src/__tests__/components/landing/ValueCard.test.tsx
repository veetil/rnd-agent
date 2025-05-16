import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ValueCard from '@/components/landing/ValueCard';

// Mock the Icon component
jest.mock('@/components/landing/Icon', () => {
  return function MockIcon({ name }: { name: string }) {
    return <div data-testid={`icon-${name}`} />;
  };
});

describe('ValueCard Component', () => {
  const defaultProps = {
    icon: 'rocket' as const,
    heading: 'Accelerate Innovation',
    description: 'Implement cutting-edge techniques that would take months to discover manually. Stay ahead of the curve without the research overhead.',
    animationDelay: 0.2,
  };
  
  it('renders icon, heading, and description', () => {
    const { getByTestId, getByRole, getByText } = render(<ValueCard {...defaultProps} />);
    
    expect(getByTestId(`icon-${defaultProps.icon}`)).toBeInTheDocument();
    expect(getByRole('heading', { name: defaultProps.heading })).toBeInTheDocument();
    expect(getByText(defaultProps.description)).toBeInTheDocument();
  });
  
  it('applies animation delay style', () => {
    const { getByTestId } = render(<ValueCard {...defaultProps} />);
    
    const card = getByTestId('value-card');
    expect(card.style.transitionDelay).toBe(`${defaultProps.animationDelay}s`);
  });
  
  it('applies hover effect on mouse enter', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<ValueCard {...defaultProps} />);
    
    const card = getByTestId('value-card');
    
    // Initially not hovered
    expect(card).not.toHaveClass('is-hovered');
    
    // Hover
    await user.hover(card);
    
    // Should have hovered class
    expect(card).toHaveClass('is-hovered');
    
    // Unhover
    await user.unhover(card);
    
    // Should not have hovered class
    expect(card).not.toHaveClass('is-hovered');
  });
  
  it('triggers entrance animation when visible', () => {
    // Mock Intersection Observer
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
    
    const { getByTestId } = render(<ValueCard {...defaultProps} />);
    
    const card = getByTestId('value-card');
    
    // Initially not visible
    expect(card).not.toHaveClass('is-visible');
    
    // Simulate intersection
    const intersectionCallback = mockIntersectionObserver.mock.calls[0][0];
    intersectionCallback([{ isIntersecting: true }]);
    
    // Should have visible class
    expect(card).toHaveClass('is-visible');
  });
});