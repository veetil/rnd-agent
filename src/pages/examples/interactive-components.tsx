import React from 'react';
import { 
  FeatureHighlight, 
  ProductDemo, 
  ExpandableFAQ, 
  PricingCalculator,
  FeatureItem,
  DemoStep,
  ComparisonView,
  FAQItem,
  PricingPlan,
  PricingVariable
} from '../../components/interactive';
import { AppProviders } from '../../components/AppProviders';

/**
 * Example page showcasing all interactive components
 */
export default function InteractiveComponentsExample() {
  // Example data for FeatureHighlight
  const featureItems: FeatureItem[] = [
    {
      id: 'feature-1',
      title: 'Intuitive Design',
      description: 'Our platform features an intuitive interface that makes complex tasks simple.',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      technicalDetails: 'Built with React and Framer Motion for smooth animations and transitions.',
      businessValue: 'Reduces training time by 45% and increases user adoption rates.',
      engineeringValue: 'Modular architecture allows for easy customization and extension.'
    },
    {
      id: 'feature-2',
      title: 'Advanced Analytics',
      description: 'Gain insights with our powerful analytics dashboard and reporting tools.',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      technicalDetails: 'Utilizes D3.js for visualizations and a custom data processing pipeline.',
      businessValue: 'Provides actionable insights that have increased revenue by 23% for our clients.',
      engineeringValue: 'RESTful API allows for integration with existing data sources and tools.'
    },
    {
      id: 'feature-3',
      title: 'Seamless Integration',
      description: 'Easily integrate with your existing tools and workflows.',
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      technicalDetails: 'Supports OAuth 2.0, webhooks, and provides SDKs for major programming languages.',
      businessValue: 'Reduces implementation time by 60% compared to competitors.',
      engineeringValue: 'Comprehensive API documentation and testing tools for rapid development.'
    }
  ];

  // Example data for ProductDemo
  const demoSteps: DemoStep[] = [
    {
      id: 'step-1',
      title: 'Create Your Project',
      description: 'Start by creating a new project and configuring basic settings.',
      content: (
        <div className="text-center">
          <img 
            src="https://via.placeholder.com/600x300?text=Create+Project+Screenshot" 
            alt="Create Project Interface" 
            className="mx-auto rounded shadow-lg"
          />
        </div>
      ),
      codeExample: `// Initialize a new project
const project = new IdeaCodeProject({
  name: 'My Awesome Project',
  template: 'web-application',
  settings: {
    framework: 'react',
    styling: 'tailwind',
    testing: 'jest'
  }
});

// Save the project configuration
await project.save();`,
      diagramSrc: "https://via.placeholder.com/800x400?text=Project+Creation+Workflow"
    },
    {
      id: 'step-2',
      title: 'Define Components',
      description: 'Create reusable components for your application.',
      content: (
        <div className="text-center">
          <img 
            src="https://via.placeholder.com/600x300?text=Component+Builder+Screenshot" 
            alt="Component Builder Interface" 
            className="mx-auto rounded shadow-lg"
          />
        </div>
      ),
      codeExample: `// Define a new component
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
  }
  
  render() {
    const { label, onClick, type = 'primary' } = this.props;
    return (
      <button 
        className={\`btn btn-\${type}\`}
        onClick={onClick}
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}
      >
        {label}
      </button>
    );
  }
}`,
      diagramSrc: "https://via.placeholder.com/800x400?text=Component+Architecture"
    },
    {
      id: 'step-3',
      title: 'Deploy Your Application',
      description: 'Deploy your application to production with just a few clicks.',
      content: (
        <div className="text-center">
          <img 
            src="https://via.placeholder.com/600x300?text=Deployment+Dashboard+Screenshot" 
            alt="Deployment Dashboard" 
            className="mx-auto rounded shadow-lg"
          />
        </div>
      ),
      codeExample: `// Deploy to production
const deployment = await project.deploy({
  environment: 'production',
  region: 'us-west-2',
  scaling: {
    minInstances: 2,
    maxInstances: 10,
    autoScale: true
  },
  monitoring: {
    enabled: true,
    alertThreshold: 0.8
  }
});

console.log(\`Deployment successful! URL: \${deployment.url}\`);`,
      diagramSrc: "https://via.placeholder.com/800x400?text=Deployment+Process"
    }
  ];

  const comparisonView: ComparisonView = {
    before: {
      title: 'Traditional Development',
      content: (
        <div className="space-y-2">
          <p>❌ Weeks of setup and configuration</p>
          <p>❌ Manual deployment processes</p>
          <p>❌ Complex integration requirements</p>
          <p>❌ Limited scalability options</p>
          <p>❌ Separate monitoring tools</p>
        </div>
      )
    },
    after: {
      title: 'With IdeaCode',
      content: (
        <div className="space-y-2">
          <p>✅ Setup in minutes, not weeks</p>
          <p>✅ One-click deployments</p>
          <p>✅ Built-in integrations</p>
          <p>✅ Automatic scaling</p>
          <p>✅ Integrated monitoring and alerts</p>
        </div>
      )
    }
  };

  // Example data for ExpandableFAQ
  const faqItems: FAQItem[] = [
    {
      id: 'faq-1',
      question: 'How do I get started with IdeaCode?',
      answer: 'Getting started is easy! Simply sign up for an account, create a new project, and follow our interactive tutorial. You can have your first application up and running in less than 10 minutes.',
      category: 'Getting Started'
    },
    {
      id: 'faq-2',
      question: 'What programming languages are supported?',
      answer: 'IdeaCode supports a wide range of programming languages including JavaScript/TypeScript, Python, Ruby, Java, Go, and PHP. Our platform is designed to be language-agnostic, allowing you to use the best tool for the job.',
      category: 'Technical'
    },
    {
      id: 'faq-3',
      question: 'How much does IdeaCode cost?',
      answer: 'IdeaCode offers flexible pricing plans starting from $29/month for the Basic plan. We also offer a free tier for personal projects and open-source development. Enterprise plans with custom features and dedicated support are available - contact our sales team for details.',
      category: 'Pricing'
    },
    {
      id: 'faq-4',
      question: 'Can I migrate my existing project to IdeaCode?',
      answer: 'Yes! We provide migration tools and documentation to help you move your existing projects to IdeaCode. Our platform supports standard project structures and can adapt to your existing codebase with minimal changes.',
      category: 'Getting Started'
    },
    {
      id: 'faq-5',
      question: 'How does IdeaCode handle security?',
      answer: 'Security is our top priority. IdeaCode implements industry-standard security practices including encryption at rest and in transit, regular security audits, vulnerability scanning, and compliance with SOC 2, GDPR, and HIPAA requirements. We also offer features like 2FA, SSO, and role-based access control.',
      category: 'Security'
    },
    {
      id: 'faq-6',
      question: 'What kind of support does IdeaCode offer?',
      answer: 'All plans include access to our comprehensive documentation, community forums, and email support. Premium and Enterprise plans include priority support with guaranteed response times, dedicated support channels, and optional on-boarding and training sessions.',
      category: 'Support'
    }
  ];

  const faqCategories = ['Getting Started', 'Technical', 'Pricing', 'Security', 'Support'];

  // Example data for PricingCalculator
  const pricingPlans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Perfect for individuals and small projects',
      basePrice: 29,
      features: [
        { id: 'projects', name: 'Up to 3 projects', included: true, limit: 3 },
        { id: 'storage', name: 'Storage', included: true, limit: 10, pricePerUnit: 1 },
        { id: 'bandwidth', name: 'Bandwidth', included: true, limit: 100, pricePerUnit: 0.5 },
        { id: 'users', name: 'Team members', included: true, limit: 5, pricePerUnit: 5 },
        { id: 'support', name: 'Email support', included: true },
        { id: 'ci-cd', name: 'CI/CD pipelines', included: false },
        { id: 'custom-domain', name: 'Custom domains', included: false },
        { id: 'priority-support', name: 'Priority support', included: false }
      ],
      popularWith: ['developer']
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Ideal for teams and growing businesses',
      basePrice: 79,
      features: [
        { id: 'projects', name: 'Up to 10 projects', included: true, limit: 10 },
        { id: 'storage', name: 'Storage', included: true, limit: 50, pricePerUnit: 0.8 },
        { id: 'bandwidth', name: 'Bandwidth', included: true, limit: 500, pricePerUnit: 0.4 },
        { id: 'users', name: 'Team members', included: true, limit: 15, pricePerUnit: 4 },
        { id: 'support', name: 'Email support', included: true },
        { id: 'ci-cd', name: 'CI/CD pipelines', included: true },
        { id: 'custom-domain', name: 'Custom domains', included: true },
        { id: 'priority-support', name: 'Priority support', included: false }
      ],
      recommended: true,
      popularWith: ['engineering', 'developer']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Advanced features for large organizations',
      basePrice: 299,
      features: [
        { id: 'projects', name: 'Unlimited projects', included: true },
        { id: 'storage', name: 'Storage', included: true, limit: 500, pricePerUnit: 0.5 },
        { id: 'bandwidth', name: 'Bandwidth', included: true, limit: 5000, pricePerUnit: 0.2 },
        { id: 'users', name: 'Team members', included: true, limit: 50, pricePerUnit: 3 },
        { id: 'support', name: 'Email support', included: true },
        { id: 'ci-cd', name: 'CI/CD pipelines', included: true },
        { id: 'custom-domain', name: 'Custom domains', included: true },
        { id: 'priority-support', name: 'Priority support', included: true }
      ],
      popularWith: ['business', 'engineering']
    }
  ];

  const pricingVariables: PricingVariable[] = [
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
    {
      id: 'bandwidth',
      name: 'Bandwidth',
      description: 'Monthly data transfer for your applications',
      min: 100,
      max: 10000,
      default: 500,
      step: 100,
      unit: 'GB',
      affectsPlans: ['basic', 'pro', 'enterprise']
    },
    {
      id: 'users',
      name: 'Team Members',
      description: 'Number of users who need access to the platform',
      min: 1,
      max: 100,
      default: 5,
      step: 1,
      unit: 'users',
      affectsPlans: ['basic', 'pro', 'enterprise']
    }
  ];

  return (
    <AppProviders>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Interactive Components</h1>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="space-y-16">
              {/* FeatureHighlight Component */}
              <section id="feature-highlight" className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Feature Highlight Component</h2>
                <p className="mb-6 text-gray-600">
                  The FeatureHighlight component displays key features with animations on scroll.
                  It supports different layouts, persona-specific content, and accessibility features.
                </p>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <FeatureHighlight
                    title="Key Platform Features"
                    subtitle="Discover what makes our platform unique"
                    features={featureItems}
                    layout="alternating"
                  />
                </div>
              </section>
              
              {/* ProductDemo Component */}
              <section id="product-demo" className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Product Demo Component</h2>
                <p className="mb-6 text-gray-600">
                  The ProductDemo component provides an interactive step-by-step walkthrough
                  with code examples, animated diagrams, and comparison views.
                </p>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <ProductDemo
                    title="How It Works"
                    subtitle="Follow these steps to get started with our platform"
                    steps={demoSteps}
                    comparisonView={comparisonView}
                  />
                </div>
              </section>
              
              {/* ExpandableFAQ Component */}
              <section id="expandable-faq" className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Expandable FAQ Component</h2>
                <p className="mb-6 text-gray-600">
                  The ExpandableFAQ component displays frequently asked questions with
                  smooth expand/collapse animations, search/filter functionality, and keyboard navigation.
                </p>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <ExpandableFAQ
                    title="Frequently Asked Questions"
                    subtitle="Find answers to common questions about our platform"
                    faqs={faqItems}
                    categories={faqCategories}
                  />
                </div>
              </section>
              
              {/* PricingCalculator Component */}
              <section id="pricing-calculator" className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold mb-4 text-gray-900">Pricing Calculator Component</h2>
                <p className="mb-6 text-gray-600">
                  The PricingCalculator component allows users to calculate pricing based on
                  their specific needs with interactive sliders and plan comparison.
                </p>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <PricingCalculator
                    title="Pricing Calculator"
                    subtitle="Customize your plan to fit your needs"
                    plans={pricingPlans}
                    variables={pricingVariables}
                    currencySymbol="$"
                    billingPeriod="monthly"
                  />
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </AppProviders>
  );
}