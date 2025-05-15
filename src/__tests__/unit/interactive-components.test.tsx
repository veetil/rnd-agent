import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FeatureHighlight, FeatureItem } from '../../components/interactive/FeatureHighlight';
import { ExpandableFAQ, FAQItem } from '../../components/interactive/ExpandableFAQ';
import { PricingCalculator, PricingPlan, PricingVariable } from '../../components/interactive/PricingCalculator';
import { ProductDemo, DemoStep, ComparisonView } from '../../components/interactive/ProductDemo';
import { AnimationProvider } from '../../components/animations/AnimationContext';
import { AccessibilityProvider } from '../../components/accessibility/AccessibilityContext';
import { PersonaProvider } from '../../components/user-journey/PersonaContext';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
        <div data-testid="motion-div" {...props}>{children}</div>,
      span: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
        <span data-testid="motion-span" {...props}>{children}</span>,
      path: ({ ...props }: { [key: string]: any }) => 
        <path data-testid="motion-path" {...props} />,
      header: ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => 
        <header data-testid="motion-header" {...props}>{children}</header>
    },
    AnimatePresence: ({ children, mode }: { children: React.ReactNode; mode?: string }) => <>{children}</>,
    useAnimation: () => ({
      start: jest.fn().mockResolvedValue(null)
    })
  };
});

// Mock announceToScreenReader
jest.mock('../../utils/accessibility', () => ({
  announceToScreenReader: jest.fn(),
  getTabAttributes: () => ({
    role: 'tab',
    'aria-selected': true,
    'aria-controls': 'test-panel'
  }),
  getTabPanelAttributes: () => ({
    role: 'tabpanel',
    'aria-labelledby': 'test-tab'
  })
}));

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

// Wrapper component with all required providers
function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AnimationProvider>
      <AccessibilityProvider>
        <PersonaProvider>
          {children}
        </PersonaProvider>
      </AccessibilityProvider>
    </AnimationProvider>
  );
}

describe('Interactive Components', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Reset localStorage
    window.localStorage.clear();
    
    // Reset document body
    document.body.innerHTML = '';
  });
  
  describe('FeatureHighlight', () => {
    const mockFeatures: FeatureItem[] = [
      {
        id: 'feature1',
        title: 'Feature 1',
        description: 'Description for feature 1',
        icon: <span>🚀</span>,
        technicalDetails: 'Technical details for developers',
        businessValue: 'Business value information'
      },
      {
        id: 'feature2',
        title: 'Feature 2',
        description: 'Description for feature 2',
        image: '/images/feature2.jpg',
        engineeringValue: 'Engineering value information'
      }
    ];
    
    test('renders title and subtitle', () => {
      render(
        <TestWrapper>
          <FeatureHighlight 
            title="Our Features" 
            subtitle="Discover what we offer" 
            features={mockFeatures} 
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('Our Features')).toBeInTheDocument();
      expect(screen.getByText('Discover what we offer')).toBeInTheDocument();
    });
    
    test('renders all features', () => {
      render(
        <TestWrapper>
          <FeatureHighlight 
            title="Our Features" 
            features={mockFeatures} 
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Description for feature 1')).toBeInTheDocument();
      expect(screen.getByText('🚀')).toBeInTheDocument();
      
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
      expect(screen.getByText('Description for feature 2')).toBeInTheDocument();
      expect(screen.getByAltText('Feature 2 illustration')).toBeInTheDocument();
    });
    
    test('applies different layouts', () => {
      const { rerender } = render(
        <TestWrapper>
          <FeatureHighlight 
            title="Grid Layout" 
            features={mockFeatures} 
            layout="grid"
          />
        </TestWrapper>
      );
      
      expect(screen.getByTestId('motion-div')).toHaveClass('grid');
      
      rerender(
        <TestWrapper>
          <FeatureHighlight 
            title="List Layout" 
            features={mockFeatures} 
            layout="list"
          />
        </TestWrapper>
      );
      
      expect(screen.getByTestId('motion-div')).toHaveClass('flex');
    });
  });
  
  describe('ExpandableFAQ', () => {
    const mockFAQs: FAQItem[] = [
      {
        id: 'faq1',
        question: 'What is this product?',
        answer: 'This is a fantastic product that solves many problems.',
        category: 'General'
      },
      {
        id: 'faq2',
        question: 'How much does it cost?',
        answer: 'The pricing depends on your needs.',
        category: 'Pricing'
      },
      {
        id: 'faq3',
        question: 'How do I install it?',
        answer: 'Installation is simple and straightforward.',
        category: 'Technical'
      }
    ];
    
    const mockCategories = ['General', 'Pricing', 'Technical'];
    
    test('renders title and subtitle', () => {
      render(
        <TestWrapper>
          <ExpandableFAQ 
            title="Frequently Asked Questions" 
            subtitle="Find answers to common questions" 
            faqs={mockFAQs}
            categories={mockCategories}
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
      expect(screen.getByText('Find answers to common questions')).toBeInTheDocument();
    });
    
    test('renders all FAQs', () => {
      render(
        <TestWrapper>
          <ExpandableFAQ 
            title="FAQs" 
            faqs={mockFAQs}
            categories={mockCategories}
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('What is this product?')).toBeInTheDocument();
      expect(screen.getByText('How much does it cost?')).toBeInTheDocument();
      expect(screen.getByText('How do I install it?')).toBeInTheDocument();
    });
    
    test('expands FAQ when clicked', async () => {
      render(
        <TestWrapper>
          <ExpandableFAQ 
            title="FAQs" 
            faqs={mockFAQs}
            categories={mockCategories}
          />
        </TestWrapper>
      );
      
      // Initially, answers should not be visible
      expect(screen.queryByText('This is a fantastic product that solves many problems.')).not.toBeInTheDocument();
      
      // Click on the first FAQ
      fireEvent.click(screen.getByText('What is this product?'));
      
      // Answer should now be visible
      expect(screen.getByText('This is a fantastic product that solves many problems.')).toBeInTheDocument();
    });
    
    test('filters FAQs by search query', () => {
      render(
        <TestWrapper>
          <ExpandableFAQ 
            title="FAQs" 
            faqs={mockFAQs}
            categories={mockCategories}
          />
        </TestWrapper>
      );
      
      // Type in search box
      fireEvent.change(screen.getByPlaceholderText('Type to search...'), { target: { value: 'install' } });
      
      // Only the matching FAQ should be visible
      expect(screen.queryByText('What is this product?')).not.toBeInTheDocument();
      expect(screen.queryByText('How much does it cost?')).not.toBeInTheDocument();
      expect(screen.getByText('How do I install it?')).toBeInTheDocument();
    });
    
    test('filters FAQs by category', () => {
      render(
        <TestWrapper>
          <ExpandableFAQ 
            title="FAQs" 
            faqs={mockFAQs}
            categories={mockCategories}
          />
        </TestWrapper>
      );
      
      // Select category from dropdown
      fireEvent.change(screen.getByLabelText('Filter by category'), { target: { value: 'Pricing' } });
      
      // Only the matching FAQ should be visible
      expect(screen.queryByText('What is this product?')).not.toBeInTheDocument();
      expect(screen.getByText('How much does it cost?')).toBeInTheDocument();
      expect(screen.queryByText('How do I install it?')).not.toBeInTheDocument();
    });
    
    test('clears filters when button is clicked', () => {
      render(
        <TestWrapper>
          <ExpandableFAQ 
            title="FAQs" 
            faqs={mockFAQs}
            categories={mockCategories}
          />
        </TestWrapper>
      );
      
      // Apply filter
      fireEvent.change(screen.getByPlaceholderText('Type to search...'), { target: { value: 'install' } });
      
      // Only one FAQ should be visible
      expect(screen.queryByText('What is this product?')).not.toBeInTheDocument();
      
      // Clear filters
      fireEvent.click(screen.getByText('Clear Filters'));
      
      // All FAQs should be visible again
      expect(screen.getByText('What is this product?')).toBeInTheDocument();
      expect(screen.getByText('How much does it cost?')).toBeInTheDocument();
      expect(screen.getByText('How do I install it?')).toBeInTheDocument();
    });
  });
  
  describe('PricingCalculator', () => {
    const mockPlans: PricingPlan[] = [
      {
        id: 'basic',
        name: 'Basic',
        description: 'For individuals',
        basePrice: 9.99,
        features: [
          { id: 'feature1', name: 'Feature 1', included: true },
          { id: 'feature2', name: 'Feature 2', included: false },
          { id: 'feature3', name: 'API Calls', included: true, pricePerUnit: 0.001 }
        ]
      },
      {
        id: 'pro',
        name: 'Professional',
        description: 'For teams',
        basePrice: 29.99,
        features: [
          { id: 'feature1', name: 'Feature 1', included: true },
          { id: 'feature2', name: 'Feature 2', included: true },
          { id: 'feature3', name: 'API Calls', included: true, pricePerUnit: 0.0005 }
        ],
        recommended: true
      }
    ];
    
    const mockVariables: PricingVariable[] = [
      {
        id: 'apiCalls',
        name: 'API Calls',
        description: 'Number of API calls per month',
        min: 0,
        max: 10000,
        default: 1000,
        step: 100,
        unit: 'calls',
        affectsPlans: ['basic', 'pro']
      }
    ];
    
    test('renders title and subtitle', () => {
      render(
        <TestWrapper>
          <PricingCalculator 
            title="Pricing Calculator" 
            subtitle="Estimate your costs" 
            plans={mockPlans}
            variables={mockVariables}
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('Pricing Calculator')).toBeInTheDocument();
      expect(screen.getByText('Estimate your costs')).toBeInTheDocument();
    });
    
    test('renders all plans', () => {
      render(
        <TestWrapper>
          <PricingCalculator 
            title="Pricing Calculator" 
            plans={mockPlans}
            variables={mockVariables}
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('Basic')).toBeInTheDocument();
      expect(screen.getByText('For individuals')).toBeInTheDocument();
      expect(screen.getByText('Professional')).toBeInTheDocument();
      expect(screen.getByText('For teams')).toBeInTheDocument();
    });
    
    test('renders variable sliders', () => {
      render(
        <TestWrapper>
          <PricingCalculator 
            title="Pricing Calculator" 
            plans={mockPlans}
            variables={mockVariables}
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('API Calls')).toBeInTheDocument();
      expect(screen.getByText('Number of API calls per month')).toBeInTheDocument();
      
      const slider = screen.getByRole('slider');
      expect(slider).toHaveAttribute('min', '0');
      expect(slider).toHaveAttribute('max', '10000');
      expect(slider).toHaveAttribute('value', '1000');
    });
    
    test('toggles comparison mode', () => {
      render(
        <TestWrapper>
          <PricingCalculator 
            title="Pricing Calculator" 
            plans={mockPlans}
            variables={mockVariables}
          />
        </TestWrapper>
      );
      
      // Initially in plan view mode
      expect(screen.getByText('Compare Plans')).toBeInTheDocument();
      
      // Toggle to comparison mode
      fireEvent.click(screen.getByText('Compare Plans'));
      
      // Should now be in comparison mode
      expect(screen.getByText('Exit Comparison Mode')).toBeInTheDocument();
      expect(screen.getByText('Plan Comparison')).toBeInTheDocument();
    });
  });
  
  describe('ProductDemo', () => {
    const mockSteps: DemoStep[] = [
      {
        id: 'step1',
        title: 'Getting Started',
        description: 'First step in the demo',
        content: <div>Step 1 content</div>,
        codeExample: 'const example = "Step 1 code";'
      },
      {
        id: 'step2',
        title: 'Configuration',
        description: 'Second step in the demo',
        content: <div>Step 2 content</div>,
        codeExample: 'const config = { enabled: true };'
      }
    ];
    
    const mockComparison: ComparisonView = {
      before: {
        title: 'Before',
        content: <div>Before implementation</div>
      },
      after: {
        title: 'After',
        content: <div>After implementation</div>
      }
    };
    
    test('renders title and subtitle', () => {
      render(
        <TestWrapper>
          <ProductDemo 
            title="Product Demo" 
            subtitle="See how it works" 
            steps={mockSteps}
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('Product Demo')).toBeInTheDocument();
      expect(screen.getByText('See how it works')).toBeInTheDocument();
    });
    
    test('renders step navigation', () => {
      render(
        <TestWrapper>
          <ProductDemo 
            title="Product Demo" 
            steps={mockSteps}
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Getting Started')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Configuration')).toBeInTheDocument();
    });
    
    test('displays first step content by default', () => {
      render(
        <TestWrapper>
          <ProductDemo 
            title="Product Demo" 
            steps={mockSteps}
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('Getting Started')).toBeInTheDocument();
      expect(screen.getByText('First step in the demo')).toBeInTheDocument();
      expect(screen.getByText('Step 1 content')).toBeInTheDocument();
      
      // Code example should be displayed
      expect(screen.getByText('const example = "Step 1 code";')).toBeInTheDocument();
    });
    
    test('navigates between steps', () => {
      render(
        <TestWrapper>
          <ProductDemo 
            title="Product Demo" 
            steps={mockSteps}
          />
        </TestWrapper>
      );
      
      // Initially on step 1
      expect(screen.getByText('Step 1 content')).toBeInTheDocument();
      
      // Navigate to step 2
      fireEvent.click(screen.getByText('Next Step'));
      
      // Should now show step 2 content
      expect(screen.getByText('Step 2 content')).toBeInTheDocument();
      expect(screen.getByText('const config = { enabled: true };')).toBeInTheDocument();
      
      // Navigate back to step 1
      fireEvent.click(screen.getByText('Previous Step'));
      
      // Should show step 1 content again
      expect(screen.getByText('Step 1 content')).toBeInTheDocument();
    });
    
    test('allows code editing', () => {
      render(
        <TestWrapper>
          <ProductDemo 
            title="Product Demo" 
            steps={mockSteps}
          />
        </TestWrapper>
      );
      
      // Initially code is displayed but not editable
      expect(screen.getByText('const example = "Step 1 code";')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      
      // Click edit button
      fireEvent.click(screen.getByText('Edit Code'));
      
      // Should now have a textarea
      const textarea = screen.getByRole('textbox');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveValue('const example = "Step 1 code";');
      
      // Edit the code
      fireEvent.change(textarea, { target: { value: 'const newExample = "Modified";' } });
      expect(textarea).toHaveValue('const newExample = "Modified";');
      
      // Apply changes
      fireEvent.click(screen.getByText('Apply Changes'));
      
      // Should show the modified code
      expect(screen.getByText('const newExample = "Modified";')).toBeInTheDocument();
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
    
    test('toggles comparison view', () => {
      render(
        <TestWrapper>
          <ProductDemo 
            title="Product Demo" 
            steps={mockSteps}
            comparisonView={mockComparison}
          />
        </TestWrapper>
      );
      
      // Comparison view should not be visible initially
      expect(screen.getByText('Show Before/After Comparison')).toBeInTheDocument();
      expect(screen.queryByText('Before/After Comparison')).not.toBeInTheDocument();
      
      // Show comparison
      fireEvent.click(screen.getByText('Show Before/After Comparison'));
      
      // Comparison should now be visible
      expect(screen.getByText('Before/After Comparison')).toBeInTheDocument();
      expect(screen.getByText('Before')).toBeInTheDocument();
      expect(screen.getByText('After')).toBeInTheDocument();
      expect(screen.getByText('Before implementation')).toBeInTheDocument();
      expect(screen.getByText('After implementation')).toBeInTheDocument();
      
      // Hide comparison
      fireEvent.click(screen.getByText('Hide Comparison'));
      
      // Comparison should be hidden again
      expect(screen.queryByText('Before/After Comparison')).not.toBeInTheDocument();
    });
  });
});