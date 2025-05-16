import { render } from '@testing-library/react';
import Icon from '@/components/landing/Icon';

describe('Icon Component', () => {
  it('renders rocket icon', () => {
    const { getByTestId } = render(<Icon name="rocket" />);
    
    expect(getByTestId('icon-rocket')).toBeInTheDocument();
  });
  
  it('renders chart icon', () => {
    const { getByTestId } = render(<Icon name="chart" />);
    
    expect(getByTestId('icon-chart')).toBeInTheDocument();
  });
  
  it('renders gear icon', () => {
    const { getByTestId } = render(<Icon name="gear" />);
    
    expect(getByTestId('icon-gear')).toBeInTheDocument();
  });
  
  it('applies custom size', () => {
    const { getByTestId } = render(<Icon name="rocket" size="large" />);
    
    const icon = getByTestId('icon-rocket');
    expect(icon).toHaveClass('icon-large');
  });
  
  it('applies custom color', () => {
    const { getByTestId } = render(<Icon name="rocket" color="blue" />);
    
    const icon = getByTestId('icon-rocket');
    expect(icon).toHaveClass('text-blue-600');
  });
});