import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import TeaserLanding from '@/components/landing/TeaserLanding';

// Mock the components used in TeaserLanding
jest.mock('@/components/landing/Footer', () => {
  return function MockFooter(props: any) {
    return (
      <footer data-testid="mock-footer">
        <div>Footer Component</div>
      </footer>
    );
  };
});

jest.mock('@/components/landing/Header', () => {
  return function MockHeader({ logoSrc, navigationItems, ctaText, ctaAction }: any) {
    return (
      <header data-testid="mock-header">
        <button onClick={ctaAction} data-testid="header-cta">{ctaText}</button>
      </header>
    );
  };
});

jest.mock('@/components/landing/HeroSection', () => {
  return function MockHeroSection({ heading, subheading, ctaText, ctaAction, visualType }: any) {
    return (
      <div data-testid="mock-hero-section">
        <h1>{heading}</h1>
        <p>{subheading}</p>
        <button onClick={ctaAction} data-testid="hero-cta">{ctaText}</button>
      </div>
    );
  };
});

jest.mock('@/components/landing/ValuePropositionSection', () => {
  return function MockValuePropositionSection({ heading, cards }: any) {
    return (
      <div data-testid="mock-value-proposition">
        <h2>{heading}</h2>
        <div data-testid="value-cards">
          {cards.map((card: any, index: number) => (
            <div key={index} data-testid={`value-card-${index}`}>
              {card.heading}
            </div>
          ))}
        </div>
      </div>
    );
  };
});

jest.mock('@/components/landing/WaitlistForm', () => {
  return function MockWaitlistForm({ onSubmit }: any) {
    return (
      <form 
        data-testid="mock-waitlist-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit('test@example.com');
        }}
      >
        <input type="email" placeholder="Your email address" />
        <button type="submit">Join Waitlist</button>
      </form>
    );
  };
});

describe('TeaserLanding Component', () => {
  it('renders all sections', () => {
    const { getByTestId } = render(<TeaserLanding />);
    
    expect(getByTestId('mock-header')).toBeInTheDocument();
    expect(getByTestId('mock-hero-section')).toBeInTheDocument();
    expect(getByTestId('mock-value-proposition')).toBeInTheDocument();
    expect(getByTestId('mock-waitlist-form')).toBeInTheDocument();
    expect(getByTestId('mock-footer')).toBeInTheDocument();
  });
  
  it('renders the waitlist section with proper heading', () => {
    const { getByText } = render(<TeaserLanding />);
    
    expect(getByText('Join Our Exclusive Waitlist')).toBeInTheDocument();
    expect(getByText(/be among the first to experience/i)).toBeInTheDocument();
  });
  
  it('scrolls to waitlist section when CTA is clicked', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<TeaserLanding />);
    
    // Mock scrollIntoView
    const mockScrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = mockScrollIntoView;
    
    // Click the CTA in the header
    await user.click(getByTestId('header-cta'));
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
  
  it('handles waitlist form submission', async () => {
    const user = userEvent.setup();
    const { getByTestId } = render(<TeaserLanding />);
    
    // Mock console.log
    const originalConsoleLog = console.log;
    const mockConsoleLog = jest.fn();
    console.log = mockConsoleLog;
    
    // Submit the form
    const form = getByTestId('mock-waitlist-form');
    await user.click(form.querySelector('button')!);
    
    // Check if the submission was logged
    expect(mockConsoleLog).toHaveBeenCalledWith(
      'Submitting email to waitlist:',
      'test@example.com'
    );
    
    // Restore console.log
    console.log = originalConsoleLog;
  });
});