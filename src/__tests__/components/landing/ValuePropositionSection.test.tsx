import { render } from '@testing-library/react';
import ValuePropositionSection from '@/components/landing/ValuePropositionSection';

// Mock the ValueCard component
jest.mock('@/components/landing/ValueCard', () => {
  return function MockValueCard({ icon, heading, description, animationDelay }: any) {
    return (
      <div 
        data-testid="value-card" 
        data-icon={icon} 
        data-heading={heading} 
        data-description={description}
        style={{ transitionDelay: `${animationDelay}s` }}
        className="is-visible"
      />
    );
  };
});

describe('ValuePropositionSection Component', () => {
  const defaultProps = {
    heading: 'Key Benefits',
    cards: [
      {
        icon: 'rocket' as const,
        heading: 'Accelerate Innovation',
        description: 'Implement cutting-edge techniques that would take months to discover manually. Stay ahead of the curve without the research overhead.',
      },
      {
        icon: 'chart' as const,
        heading: 'Amplify Performance',
        description: 'Achieve measurable improvements across your tech stack. Our customers see an average 30% performance boost within weeks.',
      },
      {
        icon: 'gear' as const,
        heading: 'Automate Optimization',
        description: 'Set it and forget it. Continuous optimization adapts to your changing needs without constant attention.',
      },
    ],
  };
  
  it('renders section heading', () => {
    const { getByRole } = render(<ValuePropositionSection {...defaultProps} />);
    
    expect(getByRole('heading', { name: defaultProps.heading })).toBeInTheDocument();
  });
  
  it('renders all value cards', () => {
    const { getAllByTestId } = render(<ValuePropositionSection {...defaultProps} />);
    
    const cards = getAllByTestId('value-card');
    expect(cards).toHaveLength(defaultProps.cards.length);
    
    cards.forEach((card: HTMLElement, index: number) => {
      expect(card).toHaveAttribute('data-heading', defaultProps.cards[index].heading);
      expect(card).toHaveAttribute('data-description', defaultProps.cards[index].description);
      expect(card).toHaveAttribute('data-icon', defaultProps.cards[index].icon);
    });
  });
  
  it('uses single column layout on mobile', () => {
    // Mock mobile viewport
    window.innerWidth = 375;
    window.innerHeight = 667;
    
    const { getByTestId } = render(<ValuePropositionSection {...defaultProps} />);
    
    const container = getByTestId('value-cards-container');
    
    expect(container).toHaveClass('grid-cols-1');
  });
  
  it('uses multi-column layout on desktop', () => {
    // Mock desktop viewport
    window.innerWidth = 1440;
    window.innerHeight = 900;
    
    const { getByTestId } = render(<ValuePropositionSection {...defaultProps} />);
    
    const container = getByTestId('value-cards-container');
    
    expect(container).toHaveClass('md:grid-cols-3');
  });
  
  it('applies staggered animation delays to cards', () => {
    const { getAllByTestId } = render(<ValuePropositionSection {...defaultProps} />);
    
    const cards = getAllByTestId('value-card');
    
    // Check that each card has a different animation delay
    cards.forEach((card: HTMLElement, index: number) => {
      expect(card.style.transitionDelay).toBe(`${index * 0.1}s`);
    });
  });
});