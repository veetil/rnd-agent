# TDD Implementation Guide for R&D Agent Store Landing Pages

This document provides a Test-Driven Development (TDD) implementation guide for both landing page alternatives: the Teaser Approach and the Technical Preview Approach.

## TDD Implementation Principles

The implementation of both landing page alternatives will follow these TDD principles:

1. **Write Tests First:** Create tests before implementing components
2. **Red-Green-Refactor:** Ensure tests fail initially, implement to pass, then refactor
3. **Isolated Testing:** Test components in isolation with mocked dependencies
4. **Comprehensive Coverage:** Test functionality, appearance, and behavior
5. **Accessibility Testing:** Include tests for accessibility requirements
6. **Responsive Testing:** Test components across different viewport sizes

## Implementation Workflow

For each component in both landing page alternatives, follow this workflow:

1. **Component Specification Review**
   - Review the component specifications from the respective documents
   - Identify props, states, behaviors, and requirements

2. **Test Case Definition**
   - Define test cases covering all requirements
   - Include edge cases and error states
   - Define accessibility test cases

3. **Test Implementation**
   - Implement tests using Jest and React Testing Library
   - Mock dependencies and external services
   - Set up test fixtures and helpers

4. **Component Implementation**
   - Implement the component to pass the tests
   - Focus on functionality first, then styling
   - Ensure accessibility requirements are met

5. **Refactoring**
   - Refactor the component for cleaner code
   - Ensure tests still pass after refactoring
   - Optimize for performance

6. **Integration Testing**
   - Test the component in context with other components
   - Verify interactions between components
   - Test responsive behavior

## Test Structure

### Component Test Structure

For each component, create a test file with the following structure:

```javascript
// ComponentName.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  // Rendering tests
  describe('rendering', () => {
    it('renders with default props', () => {
      // Test implementation
    });
    
    it('renders with custom props', () => {
      // Test implementation
    });
    
    // Additional rendering tests
  });
  
  // Behavior tests
  describe('behavior', () => {
    it('responds to user interactions', () => {
      // Test implementation
    });
    
    it('handles state changes', () => {
      // Test implementation
    });
    
    // Additional behavior tests
  });
  
  // Accessibility tests
  describe('accessibility', () => {
    it('has proper ARIA attributes', () => {
      // Test implementation
    });
    
    it('is keyboard navigable', () => {
      // Test implementation
    });
    
    // Additional accessibility tests
  });
  
  // Responsive tests
  describe('responsiveness', () => {
    it('adapts to mobile viewport', () => {
      // Test implementation with mocked viewport
    });
    
    it('adapts to desktop viewport', () => {
      // Test implementation with mocked viewport
    });
    
    // Additional responsive tests
  });
});
```

### Integration Test Structure

For integration tests, create test files that focus on component interactions:

```javascript
// SectionName.integration.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SectionName from './SectionName';

describe('SectionName Integration', () => {
  // Component interaction tests
  describe('component interactions', () => {
    it('child components interact correctly', () => {
      // Test implementation
    });
    
    // Additional interaction tests
  });
  
  // Data flow tests
  describe('data flow', () => {
    it('passes data correctly between components', () => {
      // Test implementation
    });
    
    // Additional data flow tests
  });
  
  // Event handling tests
  describe('event handling', () => {
    it('handles events correctly across components', () => {
      // Test implementation
    });
    
    // Additional event handling tests
  });
});
```

## Test Examples for Key Components

### Teaser Approach: HeroSection Component

```javascript
// HeroSection.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  const defaultProps = {
    heading: 'Transform Research Into Results—Automatically',
    subheading: 'Discover and implement breakthrough improvements from cutting-edge research without the overhead.',
    ctaText: 'Join the Waitlist',
    ctaAction: jest.fn(),
    visualType: 'particles',
  };

  // Rendering tests
  describe('rendering', () => {
    it('renders heading and subheading', () => {
      render(<HeroSection {...defaultProps} />);
      
      expect(screen.getByRole('heading', { name: defaultProps.heading })).toBeInTheDocument();
      expect(screen.getByText(defaultProps.subheading)).toBeInTheDocument();
    });
    
    it('renders CTA button with correct text', () => {
      render(<HeroSection {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: defaultProps.ctaText })).toBeInTheDocument();
    });
    
    it('renders animated visual', () => {
      render(<HeroSection {...defaultProps} />);
      
      expect(screen.getByTestId('hero-animation')).toBeInTheDocument();
    });
  });
  
  // Behavior tests
  describe('behavior', () => {
    it('calls ctaAction when CTA button is clicked', async () => {
      render(<HeroSection {...defaultProps} />);
      
      await userEvent.click(screen.getByRole('button', { name: defaultProps.ctaText }));
      
      expect(defaultProps.ctaAction).toHaveBeenCalledTimes(1);
    });
    
    it('plays animation when component mounts', () => {
      render(<HeroSection {...defaultProps} />);
      
      const animation = screen.getByTestId('hero-animation');
      
      expect(animation).toHaveAttribute('data-playing', 'true');
    });
  });
  
  // Accessibility tests
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<HeroSection {...defaultProps} />);
      
      const results = await axe(container);
      
      expect(results).toHaveNoViolations();
    });
    
    it('respects reduced motion preferences', () => {
      // Mock prefers-reduced-motion media query
      window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));
      
      render(<HeroSection {...defaultProps} />);
      
      const animation = screen.getByTestId('hero-animation');
      
      expect(animation).toHaveAttribute('data-reduced-motion', 'true');
    });
  });
  
  // Responsive tests
  describe('responsiveness', () => {
    it('adapts to mobile viewport', () => {
      // Mock mobile viewport
      window.innerWidth = 375;
      window.innerHeight = 667;
      
      render(<HeroSection {...defaultProps} />);
      
      // Test mobile-specific layout
      expect(screen.getByTestId('hero-container')).toHaveClass('mobile-layout');
    });
    
    it('adapts to desktop viewport', () => {
      // Mock desktop viewport
      window.innerWidth = 1440;
      window.innerHeight = 900;
      
      render(<HeroSection {...defaultProps} />);
      
      // Test desktop-specific layout
      expect(screen.getByTestId('hero-container')).toHaveClass('desktop-layout');
    });
  });
});
```

### Technical Preview Approach: ImprovementCard Component

```javascript
// ImprovementCard.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import ImprovementCard from './ImprovementCard';

describe('ImprovementCard', () => {
  const defaultProps = {
    title: 'Polyhedral-Based Auto-Parallelization',
    metricValue: '7x',
    metricUnit: 'speedup',
    description: 'Automatically restructures loop nests to expose parallelism and improve locality, particularly valuable for compute-intensive applications.',
    useCases: ['Compute-Intensive Applications', 'Scientific Computing', 'Data Processing'],
    domainTags: ['Performance', 'Parallelization'],
    improvementType: 'Compiler Optimization',
  };

  // Rendering tests
  describe('rendering', () => {
    it('renders title and metric', () => {
      render(<ImprovementCard {...defaultProps} />);
      
      expect(screen.getByRole('heading', { name: defaultProps.title })).toBeInTheDocument();
      expect(screen.getByText(`Up to ${defaultProps.metricValue}`)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.metricUnit)).toBeInTheDocument();
    });
    
    it('renders description', () => {
      render(<ImprovementCard {...defaultProps} />);
      
      expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    });
    
    it('renders use case tags', () => {
      render(<ImprovementCard {...defaultProps} />);
      
      defaultProps.useCases.forEach(useCase => {
        expect(screen.getByText(useCase)).toBeInTheDocument();
      });
    });
  });
  
  // Behavior tests
  describe('behavior', () => {
    it('expands to show more details on click', async () => {
      render(<ImprovementCard {...defaultProps} />);
      
      const card = screen.getByTestId('improvement-card');
      
      // Initially not expanded
      expect(card).not.toHaveAttribute('data-expanded', 'true');
      
      // Click to expand
      await userEvent.click(card);
      
      // Now expanded
      expect(card).toHaveAttribute('data-expanded', 'true');
      
      // Additional details visible
      expect(screen.getByText(defaultProps.improvementType)).toBeVisible();
      defaultProps.domainTags.forEach(tag => {
        expect(screen.getByText(tag)).toBeVisible();
      });
    });
    
    it('animates entrance when visible', () => {
      // Mock Intersection Observer
      const mockIntersectionObserver = jest.fn();
      mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
      });
      window.IntersectionObserver = mockIntersectionObserver;
      
      render(<ImprovementCard {...defaultProps} />);
      
      const card = screen.getByTestId('improvement-card');
      
      // Simulate intersection
      const intersectionCallback = mockIntersectionObserver.mock.calls[0][0];
      intersectionCallback([{ isIntersecting: true }]);
      
      expect(card).toHaveClass('animate-in');
    });
  });
  
  // Accessibility tests
  describe('accessibility', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<ImprovementCard {...defaultProps} />);
      
      const results = await axe(container);
      
      expect(results).toHaveNoViolations();
    });
    
    it('has proper ARIA attributes for expandable content', async () => {
      render(<ImprovementCard {...defaultProps} />);
      
      const card = screen.getByTestId('improvement-card');
      const expandableContent = screen.getByTestId('expandable-content');
      
      expect(card).toHaveAttribute('aria-expanded', 'false');
      expect(card).toHaveAttribute('aria-controls', expandableContent.id);
      
      // Expand the card
      await userEvent.click(card);
      
      expect(card).toHaveAttribute('aria-expanded', 'true');
    });
  });
  
  // Filtering tests
  describe('filtering', () => {
    it('applies correct filter classes based on props', () => {
      render(<ImprovementCard {...defaultProps} />);
      
      const card = screen.getByTestId('improvement-card');
      
      // Check domain filter classes
      defaultProps.domainTags.forEach(tag => {
        expect(card).toHaveClass(`domain-${tag.toLowerCase().replace(/\s+/g, '-')}`);
      });
      
      // Check improvement type filter class
      expect(card).toHaveClass(`type-${defaultProps.improvementType.toLowerCase().replace(/\s+/g, '-')}`);
    });
  });
});
```

## Integration Test Examples

### Teaser Approach: ValuePropositionSection Integration

```javascript
// ValuePropositionSection.integration.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ValuePropositionSection from './ValuePropositionSection';

describe('ValuePropositionSection Integration', () => {
  const defaultProps = {
    heading: 'Key Benefits',
    cards: [
      {
        icon: 'rocket',
        heading: 'Accelerate Innovation',
        description: 'Implement cutting-edge techniques that would take months to discover manually. Stay ahead of the curve without the research overhead.',
      },
      {
        icon: 'chart',
        heading: 'Amplify Performance',
        description: 'Achieve measurable improvements across your tech stack. Our customers see an average 30% performance boost within weeks.',
      },
      {
        icon: 'gear',
        heading: 'Automate Optimization',
        description: 'Set it and forget it. Continuous optimization adapts to your changing needs without constant attention.',
      },
    ],
  };

  // Component interaction tests
  describe('component interactions', () => {
    it('renders all value cards with correct content', () => {
      render(<ValuePropositionSection {...defaultProps} />);
      
      // Check section heading
      expect(screen.getByRole('heading', { name: defaultProps.heading })).toBeInTheDocument();
      
      // Check all cards are rendered with correct content
      defaultProps.cards.forEach(card => {
        expect(screen.getByRole('heading', { name: card.heading })).toBeInTheDocument();
        expect(screen.getByText(card.description)).toBeInTheDocument();
        expect(screen.getByTestId(`icon-${card.icon}`)).toBeInTheDocument();
      });
    });
    
    it('animates cards with staggered timing', () => {
      // Mock Intersection Observer
      const mockIntersectionObserver = jest.fn();
      mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
      });
      window.IntersectionObserver = mockIntersectionObserver;
      
      render(<ValuePropositionSection {...defaultProps} />);
      
      const cards = screen.getAllByTestId('value-card');
      
      // Simulate intersection
      const intersectionCallback = mockIntersectionObserver.mock.calls[0][0];
      intersectionCallback([{ isIntersecting: true }]);
      
      // Check staggered animation classes
      cards.forEach((card, index) => {
        expect(card).toHaveStyle(`animation-delay: ${index * 0.1}s`);
      });
    });
  });
  
  // Responsive layout tests
  describe('responsive layout', () => {
    it('uses single column layout on mobile', () => {
      // Mock mobile viewport
      window.innerWidth = 375;
      window.innerHeight = 667;
      
      render(<ValuePropositionSection {...defaultProps} />);
      
      const container = screen.getByTestId('value-cards-container');
      
      expect(container).toHaveClass('grid-cols-1');
    });
    
    it('uses multi-column layout on desktop', () => {
      // Mock desktop viewport
      window.innerWidth = 1440;
      window.innerHeight = 900;
      
      render(<ValuePropositionSection {...defaultProps} />);
      
      const container = screen.getByTestId('value-cards-container');
      
      expect(container).toHaveClass('grid-cols-3');
    });
  });
});
```

### Technical Preview Approach: TechnicalArchitectureSection Integration

```javascript
// TechnicalArchitectureSection.integration.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TechnicalArchitectureSection from './TechnicalArchitectureSection';

describe('TechnicalArchitectureSection Integration', () => {
  const defaultProps = {
    heading: 'Technical Architecture',
    components: [
      {
        id: 'component-1',
        name: 'Research Ingestion',
        function: 'Processes and indexes research papers',
        details: 'Uses NLP to extract key findings and implementation details.',
      },
      {
        id: 'component-2',
        name: 'Optimization Engine',
        function: 'Identifies applicable optimizations',
        details: 'Matches research techniques to codebase characteristics.',
      },
      {
        id: 'component-3',
        name: 'Implementation Generator',
        function: 'Creates implementation code',
        details: 'Generates optimized code based on research findings.',
      },
    ],
    connections: [
      { from: 'component-1', to: 'component-2', label: 'Research data' },
      { from: 'component-2', to: 'component-3', label: 'Optimization plan' },
    ],
  };

  // Component interaction tests
  describe('component interactions', () => {
    it('renders architecture diagram with all components', () => {
      render(<TechnicalArchitectureSection {...defaultProps} />);
      
      // Check section heading
      expect(screen.getByRole('heading', { name: defaultProps.heading })).toBeInTheDocument();
      
      // Check all components are rendered
      defaultProps.components.forEach(component => {
        expect(screen.getByText(component.name)).toBeInTheDocument();
      });
      
      // Check connections are rendered
      defaultProps.connections.forEach(connection => {
        expect(screen.getByText(connection.label)).toBeInTheDocument();
      });
    });
    
    it('shows component details when component is clicked', async () => {
      render(<TechnicalArchitectureSection {...defaultProps} />);
      
      // Initially, detailed info is not visible
      expect(screen.queryByText(defaultProps.components[0].details)).not.toBeVisible();
      
      // Click on a component
      await userEvent.click(screen.getByText(defaultProps.components[0].name));
      
      // Now detailed info should be visible
      expect(screen.getByText(defaultProps.components[0].details)).toBeVisible();
      
      // Function should also be visible
      expect(screen.getByText(defaultProps.components[0].function)).toBeVisible();
    });
    
    it('highlights connected components on hover', async () => {
      render(<TechnicalArchitectureSection {...defaultProps} />);
      
      const component1 = screen.getByTestId(`diagram-component-${defaultProps.components[0].id}`);
      const component2 = screen.getByTestId(`diagram-component-${defaultProps.components[1].id}`);
      const connection = screen.getByTestId(`connection-${defaultProps.connections[0].from}-${defaultProps.connections[0].to}`);
      
      // Hover over component
      await userEvent.hover(component1);
      
      // Connected component and connection should be highlighted
      expect(component2).toHaveClass('connected-highlight');
      expect(connection).toHaveClass('highlight');
    });
  });
  
  // Responsive behavior tests
  describe('responsive behavior', () => {
    it('simplifies diagram on mobile', () => {
      // Mock mobile viewport
      window.innerWidth = 375;
      window.innerHeight = 667;
      
      render(<TechnicalArchitectureSection {...defaultProps} />);
      
      const diagram = screen.getByTestId('architecture-diagram');
      
      expect(diagram).toHaveClass('simplified');
      
      // Check vertical layout
      const diagramContainer = screen.getByTestId('diagram-container');
      expect(diagramContainer).toHaveClass('flex-col');
    });
    
    it('shows full interactive diagram on desktop', () => {
      // Mock desktop viewport
      window.innerWidth = 1440;
      window.innerHeight = 900;
      
      render(<TechnicalArchitectureSection {...defaultProps} />);
      
      const diagram = screen.getByTestId('architecture-diagram');
      
      expect(diagram).not.toHaveClass('simplified');
      expect(diagram).toHaveClass('interactive');
      
      // Check horizontal layout
      const diagramContainer = screen.getByTestId('diagram-container');
      expect(diagramContainer).toHaveClass('flex-row');
    });
  });
});
```

## E2E Testing Strategy

In addition to component and integration tests, implement end-to-end tests to verify the complete user journey:

1. **User Journey Tests**
   - Test the complete flow from landing on the page to submitting the waitlist form
   - Verify all interactions work as expected
   - Test form validation and submission

2. **Performance Tests**
   - Measure load time and performance metrics
   - Test animations and interactions for smoothness
   - Verify responsive behavior across devices

3. **Accessibility Tests**
   - Test keyboard navigation through the entire page
   - Verify screen reader compatibility
   - Check color contrast and other accessibility requirements

## Implementation Plan

### Phase 1: Core Components

1. **Shared Components**
   - Header
   - Footer
   - Button
   - Form elements
   - Section container

2. **Teaser Approach Core Components**
   - HeroSection
   - ValueCard
   - WaitlistForm

3. **Technical Preview Core Components**
   - TechnicalHeroSection
   - MetricCard
   - ImprovementCard
   - TechnicalWaitlistForm

### Phase 2: Section Implementation

1. **Teaser Approach Sections**
   - ValuePropositionSection
   - HowItWorksSection
   - ImpactShowcaseSection
   - SocialProofSection

2. **Technical Preview Sections**
   - KeyMetricsSection
   - ImprovementsShowcaseSection
   - TechnicalArchitectureSection
   - ImplementationProcessSection

### Phase 3: Interactive Elements

1. **Teaser Approach Interactions**
   - Animations
   - Hover effects
   - Scroll animations

2. **Technical Preview Interactions**
   - Interactive visualizations
   - Filtering and sorting
   - Tabbed interfaces
   - Code comparison

### Phase 4: Integration and Optimization

1. **Page Integration**
   - Assemble all sections
   - Implement page transitions
   - Add analytics tracking

2. **Performance Optimization**
   - Optimize images and assets
   - Implement lazy loading
   - Optimize animations

3. **Accessibility Improvements**
   - Fix any accessibility issues
   - Enhance keyboard navigation
   - Improve screen reader support

### Phase 5: Testing and Refinement

1. **Comprehensive Testing**
   - Run all unit and integration tests
   - Conduct E2E tests
   - Perform accessibility audits

2. **User Testing**
   - Gather feedback from representative users
   - Identify usability issues
   - Implement improvements

3. **Final Refinements**
   - Polish visual design
   - Fix any remaining issues
   - Prepare for launch

## Conclusion

This TDD implementation guide provides a structured approach to building both landing page alternatives. By following the TDD principles and implementation plan outlined in this document, the development team can create high-quality, well-tested landing pages that meet all requirements and provide an excellent user experience.

The Teaser Approach and Technical Preview Approach offer different strategies for engaging with the target audience, and both can be implemented using the same TDD methodology. The choice between them should be based on the specific goals and target audience for the R&D Agent Store launch.