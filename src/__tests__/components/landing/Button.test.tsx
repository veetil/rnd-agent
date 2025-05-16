import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Button from '@/components/landing/Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    const { container } = render(<Button>Click Me</Button>);
    
    const button = container.querySelector('button');
    expect(button).toHaveTextContent('Click Me');
  });
  
  it('calls onClick handler when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    const { container } = render(<Button onClick={handleClick}>Click Me</Button>);
    
    const button = container.querySelector('button');
    if (button) {
      await user.click(button);
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
  
  it('renders as disabled when disabled prop is true', () => {
    const { container } = render(<Button disabled={true}>Click Me</Button>);
    
    const button = container.querySelector('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-60');
    expect(button).toHaveClass('cursor-not-allowed');
  });
  
  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    const { container } = render(
      <Button onClick={handleClick} disabled={true}>Click Me</Button>
    );
    
    const button = container.querySelector('button');
    if (button) {
      await user.click(button);
    }
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});