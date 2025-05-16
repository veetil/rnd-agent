import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from '../../../../components/landing/Logo';

describe('Logo Component', () => {
  it('renders logo image with correct alt text', () => {
    const { container } = render(<Logo src="/logo.svg" />);
    
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', 'R&D Agent Store');
    expect(img).toHaveAttribute('src', '/logo.svg');
  });
  
  it('renders with correct size', () => {
    const { container } = render(<Logo src="/logo.svg" size="large" />);
    
    const logoContainer = container.querySelector('[data-testid="logo-container"]');
    expect(logoContainer).toHaveClass('logo-large');
  });

  it('renders with medium size by default', () => {
    const { container } = render(<Logo src="/logo.svg" />);
    
    const logoContainer = container.querySelector('[data-testid="logo-container"]');
    expect(logoContainer).toHaveClass('logo-medium');
  });

  it('applies correct size class to image', () => {
    const { container, rerender } = render(<Logo src="/logo.svg" size="small" />);
    
    let img = container.querySelector('img');
    expect(img).toHaveClass('h-6');
    
    rerender(<Logo src="/logo.svg" size="medium" />);
    img = container.querySelector('img');
    expect(img).toHaveClass('h-8');
    
    rerender(<Logo src="/logo.svg" size="large" />);
    img = container.querySelector('img');
    expect(img).toHaveClass('h-10');
  });
});