# Interactive Components

This module provides a set of interactive components that enhance the user experience by leveraging the animation framework, accessibility infrastructure, persona detection system, and responsive foundation.

## Components Overview

### 1. FeatureHighlight

The `FeatureHighlight` component displays key features with animations on scroll. It's designed to showcase product features in an engaging way.

**Key Features:**
- Staggered animation effects for feature lists
- Hover/focus interactions for feature cards
- Support for different layouts (grid, list, alternating)
- Persona-specific content display
- Respects reduced motion preferences
- High contrast mode support

**Usage Example:**
```tsx
import { FeatureHighlight, FeatureItem } from '../components/interactive';

const features: FeatureItem[] = [
  {
    id: 'feature-1',
    title: 'Intuitive Design',
    description: 'Our platform features an intuitive interface that makes complex tasks simple.',
    icon: <YourIconComponent />,
    technicalDetails: 'Built with React and Framer Motion for smooth animations.',
    businessValue: 'Reduces training time by 45% and increases user adoption rates.',
    engineeringValue: 'Modular architecture allows for easy customization and extension.'
  },
  // More features...
];

function YourComponent() {
  return (
    <FeatureHighlight
      title="Key Platform Features"
      subtitle="Discover what makes our platform unique"
      features={features}
      layout="alternating"
    />
  );
}
```

### 2. ProductDemo

The `ProductDemo` component provides an interactive step-by-step walkthrough of a product or feature. It includes interactive code examples, animated diagrams, and comparison views.

**Key Features:**
- Step-by-step walkthrough with navigation
- Interactive code examples that users can modify
- Animated diagrams showing product workflows
- Before/after comparison views
- Keyboard navigation support
- Accessibility features including screen reader announcements
- Responsive design for all device sizes

**Usage Example:**
```tsx
import { ProductDemo, DemoStep, ComparisonView } from '../components/interactive';

const steps: DemoStep[] = [
  {
    id: 'step-1',
    title: 'Create Your Project',
    description: 'Start by creating a new project and configuring basic settings.',
    content: <YourStepContent />,
    codeExample: `// Your code example here`,
    diagramSrc: "/path/to/diagram.svg"
  },
  // More steps...
];

const comparison: ComparisonView = {
  before: {
    title: 'Traditional Approach',
    content: <BeforeContent />
  },
  after: {
    title: 'With Our Solution',
    content: <AfterContent />
  }
};

function YourComponent() {
  return (
    <ProductDemo
      title="How It Works"
      subtitle="Follow these steps to get started with our platform"
      steps={steps}
      comparisonView={comparison}
    />
  );
}
```

### 3. ExpandableFAQ

The `ExpandableFAQ` component displays frequently asked questions with smooth expand/collapse animations, search/filter functionality, and keyboard navigation.

**Key Features:**
- Smooth expand/collapse animations
- Search functionality to filter FAQs
- Category-based filtering
- Keyboard navigation for accessibility
- Visual indicators for categories
- Screen reader announcements
- Responsive design

**Usage Example:**
```tsx
import { ExpandableFAQ, FAQItem } from '../components/interactive';

const faqs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I get started?',
    answer: 'Getting started is easy! Simply sign up for an account and follow our tutorial.',
    category: 'Getting Started'
  },
  // More FAQs...
];

const categories = ['Getting Started', 'Technical', 'Pricing', 'Support'];

function YourComponent() {
  return (
    <ExpandableFAQ
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about our platform"
      faqs={faqs}
      categories={categories}
    />
  );
}
```

### 4. PricingCalculator

The `PricingCalculator` component allows users to calculate pricing based on their specific needs with interactive sliders and plan comparison.

**Key Features:**
- Interactive sliders for adjusting variables
- Real-time calculation and visualization of pricing
- Side-by-side plan comparison
- Animation for value changes and selection
- Persona-specific recommendations
- Accessibility features including keyboard navigation
- Responsive design for all device sizes

**Usage Example:**
```tsx
import { PricingCalculator, PricingPlan, PricingVariable } from '../components/interactive';

const plans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Perfect for individuals and small projects',
    basePrice: 29,
    features: [
      { id: 'storage', name: 'Storage', included: true, limit: 10, pricePerUnit: 1 },
      // More features...
    ],
    popularWith: ['developer']
  },
  // More plans...
];

const variables: PricingVariable[] = [
  {
    id: 'storage',
    name: 'Storage',
    description: 'Amount of storage space needed for your projects',
    min: 10,
    max: 1000,
    default: 50,
    step: 10,
    unit: 'GB',
    affectsPlans: ['basic', 'pro', 'enterprise']
  },
  // More variables...
];

function YourComponent() {
  return (
    <PricingCalculator
      title="Pricing Calculator"
      subtitle="Customize your plan to fit your needs"
      plans={plans}
      variables={variables}
      currencySymbol="$"
      billingPeriod="monthly"
    />
  );
}
```

## Integration with Foundation Components

These interactive components are built on top of the foundation components:

1. **Animation Framework**: Uses the `AnimationContext`, `MicroInteraction`, and `ScrollAnimation` components to provide smooth, consistent animations throughout the interface.

2. **Accessibility Infrastructure**: Integrates with the `AccessibilityContext` to support high contrast mode, font size adjustments, and screen reader announcements.

3. **Persona Detection System**: Leverages the `PersonaContext` to display content tailored to different user personas (business stakeholders, engineering leaders, technical developers).

4. **Responsive Foundation**: Built with a mobile-first approach and uses the `ResponsiveContext` and `useMediaQuery` hook to adapt to different screen sizes.

## Best Practices

When using these components, follow these best practices:

1. **Provide Complete Data**: Ensure you provide all required data for each component, including persona-specific content where applicable.

2. **Respect Accessibility**: Test with screen readers and keyboard navigation to ensure all components are accessible.

3. **Optimize Performance**: Large lists or complex animations can impact performance. Use pagination or virtualization for large data sets.

4. **Consistent Styling**: Maintain consistent styling across components by using the same color scheme, typography, and spacing.

5. **Responsive Testing**: Test components on various device sizes to ensure they adapt correctly.

## Example Page

An example page showcasing all interactive components is available at:

```
/examples/interactive-components
```

This page demonstrates how to use all components together and provides example data structures for each component.