import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { AppProviders } from '../../components/AppProviders';
import { ExpandableFAQ } from '../../components/interactive/ExpandableFAQ';
import { FeatureHighlight } from '../../components/interactive/FeatureHighlight';
import { PricingCalculator } from '../../components/interactive/PricingCalculator';
import { ProductDemo } from '../../components/interactive/ProductDemo';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => (
        <div data-testid="motion-div" {...props}>
          {children}
        </div>
      ),
      section: ({ children, ...props }: any) => (
        <section data-testid="motion-section" {...props}>
          {children}
        </section>
      ),
      span: ({ children, ...props }: any) => (
        <span data-testid="motion-span" {...props}>
          {children}
        </span>
      ),
      button: ({ children, ...props }: any) => (
        <button data-testid="motion-button" {...props}>
          {children}
        </button>
      )
    },
    AnimatePresence: ({ children }: any) => (
      <div data-testid="animate-presence">{children}</div>
    )
  };
});

describe('Interactive Components Integration', () => {
  beforeEach(() => {
    // Reset localStorage
    localStorage.clear();
    
    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  
  describe('ExpandableFAQ', () => {
    const faqItems = [
      {
        question: 'What is IdeaCode?',
        answer: 'IdeaCode is a platform for developers to build and deploy applications quickly.'
      },
      {
        question: 'How much does it cost?',
        answer: 'We offer various pricing plans. Check our pricing page for details.'
      },
      {
        question: 'Is there a free trial?',
        answer: 'Yes, we offer a 14-day free trial with no credit card required.'
      }
    ];
    
    test('renders FAQ items and expands/collapses on click', () => {
      render(
        <AppProviders>
          <ExpandableFAQ
            faqs={faqItems.map((item, index) => ({
              id: `faq-${index}`,
              question: item.question,
              answer: item.answer,
              category: 'General'
            }))}
            categories={['General']}
            title="Frequently Asked Questions"
          />
        </AppProviders>
      );
      
      // Check that the title is rendered
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      
      // Check that all questions are rendered
      faqItems.forEach(item => {
        expect(screen.getByText(item.question)).toBeInTheDocument();
      });
      
      // Initially, answers should not be visible
      expect(screen.queryByText(faqItems[0].answer)).not.toBeVisible();
      
      // Click on the first question
      fireEvent.click(screen.getByText(faqItems[0].question));
      
      // The answer should now be visible
      expect(screen.getByText(faqItems[0].answer)).toBeVisible();
      
      // Click on the first question again to collapse
      fireEvent.click(screen.getByText(faqItems[0].question));
      
      // The answer should no longer be visible
      expect(screen.queryByText(faqItems[0].answer)).not.toBeVisible();
    });
    
    test('supports search functionality', () => {
      render(
        <AppProviders>
          <ExpandableFAQ
            faqs={faqItems.map((item, index) => ({
              id: `faq-${index}`,
              question: item.question,
              answer: item.answer,
              category: 'General'
            }))}
            categories={['General']}
            title="Frequently Asked Questions"
          />
        </AppProviders>
      );
      
      // Check that the search input is rendered
      const searchInput = screen.getByPlaceholderText(/search/i);
      expect(searchInput).toBeInTheDocument();
      
      // Search for "free"
      fireEvent.change(searchInput, { target: { value: 'free' } });
      
      // Only the matching question should be visible
      expect(screen.getByText('Is there a free trial?')).toBeInTheDocument();
      expect(screen.queryByText('What is IdeaCode?')).not.toBeInTheDocument();
      expect(screen.queryByText('How much does it cost?')).not.toBeInTheDocument();
      
      // Clear the search
      fireEvent.change(searchInput, { target: { value: '' } });
      
      // All questions should be visible again
      faqItems.forEach(item => {
        expect(screen.getByText(item.question)).toBeInTheDocument();
      });
    });
  });
  
  describe('FeatureHighlight', () => {
    const feature = {
      title: 'Advanced Analytics',
      description: 'Get insights into your application performance with our advanced analytics.',
      icon: 'chart',
      image: '/images/analytics.jpg',
      benefits: [
        'Real-time monitoring',
        'Custom dashboards',
        'Anomaly detection'
      ]
    };
    
    test('renders feature highlight with all content', () => {
      render(
        <AppProviders>
          <FeatureHighlight
            title={feature.title}
            subtitle={feature.description}
            features={[
              {
                id: "feature-1",
                title: feature.title,
                description: feature.description,
                icon: feature.icon,
                image: feature.image
              }
            ]}
          />
        </AppProviders>
      );
      
      // Check that the title and description are rendered
      expect(screen.getByText(feature.title)).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
      
      // Check that all benefits are rendered
      feature.benefits.forEach(benefit => {
        expect(screen.getByText(benefit)).toBeInTheDocument();
      });
      
      // Check that the CTA button is rendered
      expect(screen.getByText('Learn More')).toBeInTheDocument();
      
      // Check that the image is rendered
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', feature.image);
    });
    
    test('handles hover interactions', () => {
      render(
        <AppProviders>
          <FeatureHighlight
            title={feature.title}
            subtitle={feature.description}
            features={[
              {
                id: "feature-1",
                title: feature.title,
                description: feature.description,
                icon: feature.icon
              }
            ]}
          />
        </AppProviders>
      );
      
      // Find the feature highlight container
      const container = screen.getByTestId('motion-div');
      
      // Trigger hover
      fireEvent.mouseEnter(container);
      
      // Check that the hover effect is applied
      expect(container).toHaveAttribute('data-state', 'hover');
      
      // Trigger mouse leave
      fireEvent.mouseLeave(container);
      
      // Check that the hover effect is removed
      expect(container).toHaveAttribute('data-state', 'normal');
    });
  });
  
  describe('PricingCalculator', () => {
    const pricingOptions = {
      base: {
        name: 'Base Platform',
        price: 49,
        included: true
      },
      users: {
        name: 'Additional Users',
        price: 10,
        perUnit: true,
        defaultValue: 5
      },
      storage: {
        name: 'Storage (GB)',
        price: 0.5,
        perUnit: true,
        defaultValue: 100
      },
      support: {
        name: 'Premium Support',
        price: 99,
        included: false
      }
    };
    
    test('renders pricing calculator with all options', () => {
      render(
        <AppProviders>
          <PricingCalculator
            title="Calculate Your Price"
            subtitle="Customize your plan to fit your needs."
            plans={[
              {
                id: "base-plan",
                name: "Base Plan",
                description: "Basic features",
                basePrice: pricingOptions.base.price,
                features: [
                  {
                    id: "base-feature",
                    name: pricingOptions.base.name,
                    included: pricingOptions.base.included
                  },
                  {
                    id: "users-feature",
                    name: pricingOptions.users.name,
                    included: true,
                    pricePerUnit: pricingOptions.users.price
                  },
                  {
                    id: "storage-feature",
                    name: pricingOptions.storage.name,
                    included: true,
                    pricePerUnit: pricingOptions.storage.price
                  },
                  {
                    id: "support-feature",
                    name: pricingOptions.support.name,
                    included: pricingOptions.support.included
                  }
                ]
              }
            ]}
            variables={[
              {
                id: "users",
                name: pricingOptions.users.name,
                description: "Number of users",
                min: 1,
                max: 20,
                default: pricingOptions.users.defaultValue,
                step: 1,
                unit: "users",
                affectsPlans: ["base-plan"]
              },
              {
                id: "storage",
                name: pricingOptions.storage.name,
                description: "Storage amount",
                min: 10,
                max: 500,
                default: pricingOptions.storage.defaultValue,
                step: 10,
                unit: "GB",
                affectsPlans: ["base-plan"]
              }
            ]}
            currencySymbol="$"
          />
        </AppProviders>
      );
      
      // Check that the title and description are rendered
      expect(screen.getByText('Calculate Your Price')).toBeInTheDocument();
      expect(screen.getByText('Customize your plan to fit your needs.')).toBeInTheDocument();
      
      // Check that all pricing options are rendered
      Object.values(pricingOptions).forEach(option => {
        expect(screen.getByText(option.name)).toBeInTheDocument();
      });
      
      // Check that the total is calculated correctly
      // Base ($49) + 5 users ($50) + 100 GB storage ($50) = $149
      expect(screen.getByText(/\$149/)).toBeInTheDocument();
    });
    
    test('updates total when options change', () => {
      render(
        <AppProviders>
          <PricingCalculator
            title="Calculate Your Price"
            subtitle="Customize your plan to fit your needs."
            plans={[
              {
                id: "base-plan",
                name: "Base Plan",
                description: "Basic features",
                basePrice: pricingOptions.base.price,
                features: [
                  {
                    id: "base-feature",
                    name: pricingOptions.base.name,
                    included: pricingOptions.base.included
                  },
                  {
                    id: "users-feature",
                    name: pricingOptions.users.name,
                    included: true,
                    pricePerUnit: pricingOptions.users.price
                  },
                  {
                    id: "storage-feature",
                    name: pricingOptions.storage.name,
                    included: true,
                    pricePerUnit: pricingOptions.storage.price
                  },
                  {
                    id: "support-feature",
                    name: pricingOptions.support.name,
                    included: pricingOptions.support.included
                  }
                ]
              }
            ]}
            variables={[
              {
                id: "users",
                name: pricingOptions.users.name,
                description: "Number of users",
                min: 1,
                max: 20,
                default: pricingOptions.users.defaultValue,
                step: 1,
                unit: "users",
                affectsPlans: ["base-plan"]
              },
              {
                id: "storage",
                name: pricingOptions.storage.name,
                description: "Storage amount",
                min: 10,
                max: 500,
                default: pricingOptions.storage.defaultValue,
                step: 10,
                unit: "GB",
                affectsPlans: ["base-plan"]
              }
            ]}
            currencySymbol="$"
          />
        </AppProviders>
      );
      
      // Find the users input
      const usersInput = screen.getByLabelText(/Additional Users/i);
      
      // Change users to 10
      fireEvent.change(usersInput, { target: { value: '10' } });
      
      // Check that the total is updated
      // Base ($49) + 10 users ($100) + 100 GB storage ($50) = $199
      expect(screen.getByText(/\$199/)).toBeInTheDocument();
      
      // Find the premium support checkbox
      const supportCheckbox = screen.getByLabelText(/Premium Support/i);
      
      // Check the premium support option
      fireEvent.click(supportCheckbox);
      
      // Check that the total is updated
      // Base ($49) + 10 users ($100) + 100 GB storage ($50) + Premium Support ($99) = $298
      expect(screen.getByText(/\$298/)).toBeInTheDocument();
    });
  });
  
  describe('ProductDemo', () => {
    const demoSteps = [
      {
        title: 'Step 1: Create Project',
        description: 'Start by creating a new project in the dashboard.',
        image: '/images/step1.jpg'
      },
      {
        title: 'Step 2: Configure Settings',
        description: 'Configure your project settings according to your needs.',
        image: '/images/step2.jpg'
      },
      {
        title: 'Step 3: Deploy',
        description: 'Deploy your project with a single click.',
        image: '/images/step3.jpg'
      }
    ];
    
    test('renders product demo with all steps', () => {
      render(
        <AppProviders>
          <ProductDemo
            title="See How It Works"
            subtitle="Follow these steps to get started with IdeaCode."
            steps={demoSteps.map((step, index) => ({
              id: `step-${index + 1}`,
              title: step.title,
              description: step.description,
              content: <div className="demo-content">
                <img src={step.image} alt={step.title} />
              </div>
            }))}
          />
        </AppProviders>
      );
      
      // Check that the title and description are rendered
      expect(screen.getByText('See How It Works')).toBeInTheDocument();
      expect(screen.getByText('Follow these steps to get started with IdeaCode.')).toBeInTheDocument();
      
      // Initially, only the first step should be visible
      expect(screen.getByText(demoSteps[0].title)).toBeInTheDocument();
      expect(screen.getByText(demoSteps[0].description)).toBeInTheDocument();
      
      // The other steps should not be visible yet
      expect(screen.queryByText(demoSteps[1].title)).not.toBeInTheDocument();
      expect(screen.queryByText(demoSteps[2].title)).not.toBeInTheDocument();
    });
    
    test('navigates through demo steps', () => {
      render(
        <AppProviders>
          <ProductDemo 
            title="See How It Works"
            subtitle="Follow these steps to get started with IdeaCode."
            steps={demoSteps.map((step, index) => ({
              id: `step-${index + 1}`,
              title: step.title,
              description: step.description,
              content: <div className="demo-content">
                <img src={step.image} alt={step.title} />
              </div>
            }))}
          />
        </AppProviders>
      );
      
      // Find the next button
      const nextButton = screen.getByText(/next/i);
      
      // Click next to go to step 2
      fireEvent.click(nextButton);
      
      // Step 2 should now be visible
      expect(screen.getByText(demoSteps[1].title)).toBeInTheDocument();
      expect(screen.getByText(demoSteps[1].description)).toBeInTheDocument();
      
      // Click next to go to step 3
      fireEvent.click(nextButton);
      
      // Step 3 should now be visible
      expect(screen.getByText(demoSteps[2].title)).toBeInTheDocument();
      expect(screen.getByText(demoSteps[2].description)).toBeInTheDocument();
      
      // Find the previous button
      const prevButton = screen.getByText(/previous/i);
      
      // Click previous to go back to step 2
      fireEvent.click(prevButton);
      
      // Step 2 should now be visible again
      expect(screen.getByText(demoSteps[1].title)).toBeInTheDocument();
      expect(screen.getByText(demoSteps[1].description)).toBeInTheDocument();
    });
    
    test('supports auto-play functionality', () => {
      jest.useFakeTimers();
      
      render(
        <AppProviders>
          <ProductDemo
            title="See How It Works"
            subtitle="Follow these steps to get started with IdeaCode."
            steps={demoSteps.map((step, index) => ({
              id: `step-${index + 1}`,
              title: step.title,
              description: step.description,
              content: <div className="demo-content">
                <img src={step.image} alt={step.title} />
              </div>
            }))}
          />
        </AppProviders>
      );
      
      // Initially, step 1 should be visible
      expect(screen.getByText(demoSteps[0].title)).toBeInTheDocument();
      
      // Advance timers by 2 seconds
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      // Step 2 should now be visible
      expect(screen.getByText(demoSteps[1].title)).toBeInTheDocument();
      
      // Advance timers by 2 more seconds
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      // Step 3 should now be visible
      expect(screen.getByText(demoSteps[2].title)).toBeInTheDocument();
      
      // Advance timers by 2 more seconds (should loop back to step 1)
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      // Step 1 should be visible again
      expect(screen.getByText(demoSteps[0].title)).toBeInTheDocument();
      
      jest.useRealTimers();
    });
  });
  
  test('all interactive components work together', () => {
    const faqItems = [
      { question: 'FAQ 1', answer: 'Answer 1' },
      { question: 'FAQ 2', answer: 'Answer 2' }
    ];
    
    const feature = {
      title: 'Feature',
      description: 'Description',
      benefits: ['Benefit 1', 'Benefit 2']
    };
    
    const pricingOptions = {
      base: { name: 'Base', price: 10, included: true },
      addon: { name: 'Add-on', price: 5, included: false }
    };
    
    const demoSteps = [
      { title: 'Step 1', description: 'Description 1' },
      { title: 'Step 2', description: 'Description 2' }
    ];
    
    render(
      <AppProviders>
        <div data-testid="interactive-container">
          <ExpandableFAQ
            faqs={faqItems.map((item, index) => ({
              id: `faq-${index}`,
              question: item.question,
              answer: item.answer,
              category: 'General'
            }))}
            categories={['General']}
            title="FAQs"
          />
          
          <FeatureHighlight
            title={feature.title}
            subtitle={feature.description}
            features={[
              {
                id: "feature-1",
                title: feature.title,
                description: feature.description
              }
            ]}
          />
          
          <PricingCalculator
            title="Pricing"
            subtitle="Choose your plan"
            plans={[
              {
                id: "base-plan",
                name: "Base Plan",
                description: "Basic features",
                basePrice: pricingOptions.base.price,
                features: [
                  {
                    id: "base-feature",
                    name: pricingOptions.base.name,
                    included: pricingOptions.base.included
                  },
                  {
                    id: "addon-feature",
                    name: pricingOptions.addon.name,
                    included: pricingOptions.addon.included
                  }
                ]
              }
            ]}
            variables={[]}
            currencySymbol="$"
          />
          
          <ProductDemo
            title="Demo"
            subtitle="See how it works"
            steps={demoSteps.map((step, index) => ({
              id: `step-${index + 1}`,
              title: step.title,
              description: step.description,
              content: <div>{step.description}</div>
            }))}
          />
        </div>
      </AppProviders>
    );
    
    // Check that all components are rendered
    expect(screen.getByText('FAQs')).toBeInTheDocument();
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('Pricing')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
    
    // Interact with FAQ
    fireEvent.click(screen.getByText('FAQ 1'));
    expect(screen.getByText('Answer 1')).toBeVisible();
    
    // Interact with Feature Highlight
    const featureContainer = screen.getByText('Feature').closest('[data-testid="motion-div"]');
    fireEvent.mouseEnter(featureContainer!);
    expect(featureContainer).toHaveAttribute('data-state', 'hover');
    
    // Interact with Product Demo
    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);
    expect(screen.getByText('Step 2')).toBeInTheDocument();
  });
});