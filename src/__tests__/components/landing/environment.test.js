describe('Test Environment', () => {
  it('should have Jest configured correctly', () => {
    expect(1 + 1).toBe(2);
  });
  
  it('should have React Testing Library configured correctly', () => {
    const { render } = require('@testing-library/react');
    const element = document.createElement('div');
    element.textContent = 'Test Element';
    const { getByText } = render(element);
    expect(getByText('Test Element')).toBeInTheDocument();
  });
});