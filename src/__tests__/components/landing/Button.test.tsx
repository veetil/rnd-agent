import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from '../../../../components/landing/Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    const { container } = render(<Button>Click Me</Button>);
    
    const button = container.querySelector('button');
    expect(button).toHaveTextContent('Click Me');
  });
  
  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const { container } = render(<Button onClick={handleClick}>Click Me</Button>);
    
    const button = container.querySelector('button');
    if (button) {
      await userEvent.click(button);
    }
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('renders with primary variant by default', () => {
    const { container } = render(<Button>Click Me</Button>);
    
    const button = container.querySelector('button');
    expect(button).toHaveClass('btn-primary');
  });
  
  it('renders with secondary variant when specified', () => {
    const { container } = render(<Button variant="secondary">Click Me</Button>);
    
    const button = container.querySelector('button');
    expect(button).toHaveClass('btn-secondary');
  });

  it('renders with outline variant when specified', () => {
    const { container } = render(<Button variant="outline">Click Me</Button>);
    
    const button = container.querySelector('button');
    expect(button).toHaveClass('btn-outline');
  });

  it('renders with different sizes', () => {
    const { container, rerender } = render(<Button size="small">Click Me</Button>);
    let button = container.querySelector('button');
    expect(button).toHaveClass('text-sm');
    
    rerender(<Button size="medium">Click Me</Button>);
    button = container.querySelector('button');
    expect(button).toHaveClass('text-base');
    
    rerender(<Button size="large">Click Me</Button>);
    button = container.querySelector('button');
    expect(button).toHaveClass('text-lg');
  });

  it('applies custom className when provided', () => {
    const { container } = render(<Button className="custom-class">Click Me</Button>);
    
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });
});