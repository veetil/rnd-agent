import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../../../../components/landing/Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click Me</Button>);
    
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
  });
  
  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    await userEvent.click(screen.getByRole('button', { name: 'Click Me' }));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('renders with primary variant by default', () => {
    render(<Button>Click Me</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('btn-primary');
  });
  
  it('renders with secondary variant when specified', () => {
    render(<Button variant="secondary">Click Me</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('btn-secondary');
  });

  it('renders with outline variant when specified', () => {
    render(<Button variant="outline">Click Me</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('btn-outline');
  });

  it('renders with correct size class', () => {
    render(<Button size="large">Click Me</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('text-lg px-6 py-3');
  });

  it('applies additional className when provided', () => {
    render(<Button className="custom-class">Click Me</Button>);
    
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});