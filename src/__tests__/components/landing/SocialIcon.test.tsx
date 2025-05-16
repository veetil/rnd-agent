import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import SocialIcon from '@/components/landing/SocialIcon';

// Mock the Icon component
jest.mock('@/components/landing/Icon', () => {
  return function MockIcon({ name, className }: any) {
    return <div data-testid={`mock-icon-${name}`} className={className}>Icon</div>;
  };
});

describe('SocialIcon Component', () => {
  it('renders Twitter icon correctly', () => {
    const { getByTestId } = render(<SocialIcon platform="twitter" />);
    expect(getByTestId('mock-icon-rocket')).toBeInTheDocument();
  });

  it('renders GitHub icon correctly', () => {
    const { getByTestId } = render(<SocialIcon platform="github" />);
    expect(getByTestId('mock-icon-gear')).toBeInTheDocument();
  });

  it('renders LinkedIn icon correctly', () => {
    const { getByTestId } = render(<SocialIcon platform="linkedin" />);
    expect(getByTestId('mock-icon-chart')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-icon-class';
    const { getByTestId } = render(<SocialIcon platform="twitter" className={customClass} />);
    expect(getByTestId('mock-icon-rocket').className).toContain(customClass);
  });
});