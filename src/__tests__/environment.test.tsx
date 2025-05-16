import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Test Environment', () => {
  it('should have Jest configured correctly', () => {
    expect(1 + 1).toBe(2);
  });
  
  it('should have React Testing Library configured correctly', () => {
    const element = document.createElement('div');
    element.textContent = 'Test Element';
    const { container } = render(<div>Test Element</div>);
    
    expect(container.textContent).toBe('Test Element');
  });
});