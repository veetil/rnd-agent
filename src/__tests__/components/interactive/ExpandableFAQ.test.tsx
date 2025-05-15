import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExpandableFAQ } from '../../../components/interactive/ExpandableFAQ';

// Mock the animations
jest.mock('../../../components/animations/MicroInteraction', () => ({
  MicroInteraction: ({ children }: any) => <div data-testid="micro-interaction">{children}</div>,
}));

jest.mock('../../../components/animations/ScrollAnimation', () => ({
  ScrollAnimation: ({ children }: any) => <div data-testid="scroll-animation">{children}</div>,
}));

// Mock the animation context
jest.mock('../../../components/animations/AnimationContext', () => ({
  useAnimation: jest.fn().mockReturnValue({
    animationsEnabled: true,
    animationSpeed: 1,
  }),
}));

// Mock the accessibility context
jest.mock('../../../components/accessibility/AccessibilityContext', () => ({
  useAccessibility: jest.fn().mockReturnValue({
    highContrast: false,
    reducedMotion: false,
    fontSizeMultiplier: 1,
  }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock the useReducedMotion hook
jest.mock('../../../hooks/useReducedMotion', () => ({
  useReducedMotion: jest.fn().mockReturnValue(false),
}));

// Mock the announceToScreenReader function
jest.mock('../../../utils/accessibility', () => ({
  announceToScreenReader: jest.fn(),
}));

describe('ExpandableFAQ', () => {
  const defaultProps = {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions',
    categories: ['General', 'Pricing', 'Technical'],
    faqs: [
      {
        id: 'faq1',
        question: 'What is IdeaCode?',
        answer: 'IdeaCode is a platform for developers.',
        category: 'General',
      },
      {
        id: 'faq2',
        question: 'How much does it cost?',
        answer: 'Pricing starts at $10/month.',
        category: 'Pricing',
      },
      {
        id: 'faq3',
        question: 'What technologies are supported?',
        answer: 'We support React, Angular, Vue, and more.',
        category: 'Technical',
      },
    ],
  };

  test('should render title and subtitle', () => {
    render(<ExpandableFAQ {...defaultProps} />);
    
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('Find answers to common questions')).toBeInTheDocument();
  });

  test('should render all FAQ items', () => {
    render(<ExpandableFAQ {...defaultProps} />);
    
    expect(screen.getByText('What is IdeaCode?')).toBeInTheDocument();
    expect(screen.getByText('How much does it cost?')).toBeInTheDocument();
    expect(screen.getByText('What technologies are supported?')).toBeInTheDocument();
  });

  test('should expand FAQ item when clicked', () => {
    render(<ExpandableFAQ {...defaultProps} />);
    
    // Initially, the answer should not be visible
    expect(screen.queryByText('IdeaCode is a platform for developers.')).not.toBeInTheDocument();
    
    // Click on the question
    fireEvent.click(screen.getByText('What is IdeaCode?'));
    
    // Now the answer should be visible
    expect(screen.getByText('IdeaCode is a platform for developers.')).toBeInTheDocument();
  });

  test('should collapse expanded FAQ item when clicked again', () => {
    render(<ExpandableFAQ {...defaultProps} />);
    
    // Click to expand
    fireEvent.click(screen.getByText('What is IdeaCode?'));
    expect(screen.getByText('IdeaCode is a platform for developers.')).toBeInTheDocument();
    
    // Click again to collapse
    fireEvent.click(screen.getByText('What is IdeaCode?'));
    
    // The answer should no longer be visible
    // Note: Due to the AnimatePresence mock, the element might still be in the DOM
    // but we can check the aria-expanded attribute
    const faqItem = screen.getByText('What is IdeaCode?').closest('[role="button"]');
    expect(faqItem).toHaveAttribute('aria-expanded', 'false');
  });

  test('should filter FAQs by search query', () => {
    render(<ExpandableFAQ {...defaultProps} />);
    
    // Type in the search box
    fireEvent.change(screen.getByPlaceholderText('Type to search...'), {
      target: { value: 'pricing' },
    });
    
    // Only the pricing FAQ should be visible
    expect(screen.getByText('How much does it cost?')).toBeInTheDocument();
    expect(screen.queryByText('What is IdeaCode?')).not.toBeInTheDocument();
    expect(screen.queryByText('What technologies are supported?')).not.toBeInTheDocument();
    
    // Results summary should show 1 of 3 FAQs
    expect(screen.getByText(/Showing 1 of 3 FAQs/)).toBeInTheDocument();
  });

  test('should filter FAQs by category', () => {
    render(<ExpandableFAQ {...defaultProps} />);
    
    // Select the Technical category
    fireEvent.change(screen.getByLabelText('Filter by Category'), {
      target: { value: 'Technical' },
    });
    
    // Only the technical FAQ should be visible
    expect(screen.getByText('What technologies are supported?')).toBeInTheDocument();
    expect(screen.queryByText('What is IdeaCode?')).not.toBeInTheDocument();
    expect(screen.queryByText('How much does it cost?')).not.toBeInTheDocument();
    
    // Results summary should show 1 of 3 FAQs in category "Technical"
    expect(screen.getByText('Showing 1 of 3 FAQs in category "Technical"')).toBeInTheDocument();
  });

  test('should clear filters when clear button is clicked', () => {
    render(<ExpandableFAQ {...defaultProps} />);
    
    // Apply a filter
    fireEvent.change(screen.getByLabelText('Filter by Category'), {
      target: { value: 'Technical' },
    });
    
    // Only one FAQ should be visible
    expect(screen.getByText(/Showing 1 of 3 FAQs/)).toBeInTheDocument();
    
    // Click the clear filters button
    fireEvent.click(screen.getByText('Clear Filters'));
    
    // All FAQs should be visible again
    expect(screen.getByText('What is IdeaCode?')).toBeInTheDocument();
    expect(screen.getByText('How much does it cost?')).toBeInTheDocument();
    expect(screen.getByText('What technologies are supported?')).toBeInTheDocument();
    
    // Results summary should show all FAQs
    expect(screen.getByText('Showing 3 of 3 FAQs')).toBeInTheDocument();
  });

  test('should handle keyboard navigation', () => {
    render(<ExpandableFAQ {...defaultProps} />);
    
    // Get the first FAQ item
    const firstFaqItem = screen.getByText('What is IdeaCode?').closest('[role="button"]') as HTMLElement;
    
    // Focus on the first FAQ item
    if (firstFaqItem) {
      firstFaqItem.focus();
      
      // Press Enter to expand
      fireEvent.keyDown(firstFaqItem, { key: 'Enter' });
      expect(firstFaqItem).toHaveAttribute('aria-expanded', 'true');
      
      // Press Enter again to collapse
      fireEvent.keyDown(firstFaqItem, { key: 'Enter' });
      expect(firstFaqItem).toHaveAttribute('aria-expanded', 'false');
      
      // Press Space to expand
      fireEvent.keyDown(firstFaqItem, { key: ' ' });
      expect(firstFaqItem).toHaveAttribute('aria-expanded', 'true');
    }
  });

  test('should apply custom className', () => {
    render(<ExpandableFAQ {...defaultProps} className="custom-faq" />);
    
    const faqSection = document.querySelector('.expandable-faq');
    expect(faqSection).toHaveClass('custom-faq');
  });

  test('should show no results message when search has no matches', () => {
    render(<ExpandableFAQ {...defaultProps} />);
    
    // Search for something that doesn't exist
    fireEvent.change(screen.getByPlaceholderText('Type to search...'), {
      target: { value: 'nonexistent' },
    });
    
    // No results message should be shown
    expect(screen.getByText('No FAQs match your search criteria.')).toBeInTheDocument();
  });
});