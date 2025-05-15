import { useState, useEffect } from 'react';
import { AppProviders } from '../../components';
import { usePersona } from '../../components/user-journey/PersonaContext';
import { ContextualCTA } from '../../components/user-journey/ContextualCTA';
import { GuidedTour, TourButton } from '../../components/user-journey/GuidedTour';
import { MobileNavigation, CompactHeader } from '../../components/user-journey/MobileNavigation';
import { PersonaContent, ProgressiveDisclosure } from '../../components/user-journey/PersonaContext';

/**
 * Example page demonstrating the User Journey components for Phase 2
 * This page showcases various user journey optimization components
 */
export default function UserJourneyComponentsPage() {
  const [activeSection, setActiveSection] = useState('contextual-cta');
  const [isTourActive, setIsTourActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { persona, setPersona } = usePersona();

  // Track scroll position for demo purposes
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Example tour steps
  const tourSteps = [
    {
      target: '#contextual-cta',
      title: 'Contextual CTAs',
      content: 'Contextual CTAs display relevant actions based on user behavior and context.',
      position: 'bottom' as const,
      highlight: true,
      relevantPersonas: ['business-stakeholder', 'engineering-leader']
    },
    {
      target: '#guided-tours',
      title: 'Guided Tours',
      content: 'Guided tours provide step-by-step guidance for users.',
      position: 'bottom' as const,
      highlight: true,
      relevantPersonas: ['technical-developer', 'engineering-leader']
    },
    {
      target: '#progressive-disclosure',
      title: 'Progressive Disclosure',
      content: 'Progressive disclosure reveals information gradually based on user needs.',
      position: 'bottom' as const,
      highlight: true,
      relevantPersonas: ['business-stakeholder', 'technical-developer', 'engineering-leader']
    },
    {
      target: '#mobile-navigation',
      title: 'Mobile Navigation',
      content: 'Mobile navigation provides optimized navigation for mobile users.',
      position: 'top' as const,
      highlight: true,
      relevantPersonas: ['technical-developer', 'engineering-leader']
    }
  ];

  // Example navigation items
  const navigationItems = [
    {
      label: 'Home',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
      isActive: true
    },
    {
      label: 'Search',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    {
      label: 'Notifications',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      ),
      badge: '3',
      badgeColor: 'bg-red-500'
    },
    {
      label: 'Profile',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    }
  ];

  return (
    <AppProviders
      initialPersona="general"
    >
      <div className="min-h-screen pb-20">
        <CompactHeader
          logo={
            <div className="text-xl font-bold">IdeaCode</div>
          }
          items={[
            { label: 'Home', href: '#', isActive: true },
            { label: 'Features', href: '#' },
            { label: 'Pricing', href: '#' },
            { label: 'Documentation', href: '#' },
            { label: 'Contact', href: '#' }
          ]}
          transformOnScroll={true}
          scrollThreshold={50}
          showMenuButton={true}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
          isMenuOpen={isMenuOpen}
          zIndex={50}
        >
          <div className="py-4">
            <p className="text-gray-600">Additional header content that collapses on scroll</p>
          </div>
        </CompactHeader>

        <div className="container mx-auto px-4 pt-32 pb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">User Journey Components</h1>
            <p className="text-gray-600 mb-4">
              Demonstration of user journey optimization components for enhanced user experience
            </p>

            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Current Persona: {persona}</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPersona('general')}
                  className={`px-3 py-1 rounded ${
                    persona === 'general'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setPersona('business-stakeholder')}
                  className={`px-3 py-1 rounded ${
                    persona === 'business-stakeholder'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Business Stakeholder
                </button>
                <button
                  onClick={() => setPersona('engineering-leader')}
                  className={`px-3 py-1 rounded ${
                    persona === 'engineering-leader'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Engineering Leader
                </button>
                <button
                  onClick={() => setPersona('technical-developer')}
                  className={`px-3 py-1 rounded ${
                    persona === 'technical-developer'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Technical Developer
                </button>
                <button
                  onClick={() => setPersona('returning-user')}
                  className={`px-3 py-1 rounded ${
                    persona === 'returning-user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Returning User
                </button>
              </div>
            </div>
          </div>

          <nav className="mb-8 sticky top-20 bg-white z-10 py-2 border-b border-gray-200">
            <ul className="flex flex-wrap gap-2">
              {['contextual-cta', 'guided-tours', 'progressive-disclosure', 'mobile-navigation'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className={`px-4 py-2 rounded-md ${
                      activeSection === section
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <main>
            {activeSection === 'contextual-cta' && (
              <section id="contextual-cta" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Contextual Call-to-Action Elements</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Inline CTAs</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Basic CTA</h4>
                        <ContextualCTA
                          title="Get Started with IdeaCode"
                          description="Sign up for a free account and start building your next project."
                          actions={[
                            { label: 'Sign Up', isPrimary: true },
                            { label: 'Learn More' }
                          ]}
                          position="inline"
                          variant="primary"
                        />
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3">Persona-Specific CTA</h4>
                        <PersonaContent
                          businessStakeholder={
                            <ContextualCTA
                              title="Reduce Development Costs"
                              description="Learn how IdeaCode can help your business reduce development costs by up to 40%."
                              actions={[
                                { label: 'View ROI Calculator', isPrimary: true },
                                { label: 'Schedule Demo' }
                              ]}
                              position="inline"
                              variant="success"
                            />
                          }
                          engineeringLeader={
                            <ContextualCTA
                              title="Streamline Your Development Process"
                              description="Discover how IdeaCode can help your team ship faster with fewer bugs."
                              actions={[
                                { label: 'View Case Studies', isPrimary: true },
                                { label: 'Try Free Demo' }
                              ]}
                              position="inline"
                              variant="info"
                            />
                          }
                          technicalDeveloper={
                            <ContextualCTA
                              title="Powerful Developer Tools"
                              description="Access our comprehensive API documentation and SDKs."
                              actions={[
                                { label: 'View Documentation', isPrimary: true },
                                { label: 'Join Discord' }
                              ]}
                              position="inline"
                              variant="primary"
                            />
                          }
                          general={
                            <ContextualCTA
                              title="Discover IdeaCode"
                              description="The platform for building modern applications."
                              actions={[
                                { label: 'Learn More', isPrimary: true },
                                { label: 'Sign Up' }
                              ]}
                              position="inline"
                              variant="secondary"
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Floating CTAs</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Scroll-Triggered CTA</h4>
                        <p>This CTA appears when you scroll down the page.</p>
                        <ContextualCTA
                          title="Like what you see?"
                          description="Sign up for our newsletter to get the latest updates."
                          actions={[
                            { label: 'Subscribe', isPrimary: true },
                            { label: 'No Thanks' }
                          ]}
                          position="floating"
                          variant="primary"
                          trigger="scroll"
                          scrollThreshold={0.3}
                          showCloseButton={true}
                        />
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3">Time-Delayed CTA</h4>
                        <p>This CTA appears after a few seconds on the page.</p>
                        <ContextualCTA
                          title="Special Offer"
                          description="Get 20% off your first year when you sign up today."
                          actions={[
                            { label: 'Claim Offer', isPrimary: true },
                            { label: 'Remind Me Later' }
                          ]}
                          position="floating"
                          variant="warning"
                          trigger="time"
                          timeDelay={5}
                          showCloseButton={true}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Modal CTAs</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Exit Intent CTA</h4>
                        <p>This CTA appears when you try to leave the page (move your mouse to the top of the browser).</p>
                        <ContextualCTA
                          title="Wait, Don't Go!"
                          description="Sign up for our newsletter and get a free e-book."
                          actions={[
                            { label: 'Get Free E-Book', isPrimary: true },
                            { label: 'No Thanks' }
                          ]}
                          position="modal"
                          variant="danger"
                          trigger="exit-intent"
                          showCloseButton={true}
                        />
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3">Inactivity CTA</h4>
                        <p>This CTA appears after a period of inactivity.</p>
                        <ContextualCTA
                          title="Still There?"
                          description="We noticed you've been inactive for a while. Need help finding something?"
                          actions={[
                            { label: 'Contact Support', isPrimary: true },
                            { label: 'Continue Browsing' }
                          ]}
                          position="modal"
                          variant="info"
                          trigger="inactivity"
                          inactivityTime={10}
                          showCloseButton={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'guided-tours' && (
              <section id="guided-tours" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Guided Tours</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Tour Button</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Start a Tour</h4>
                        <p className="mb-4">Click the button below to start a guided tour of this page.</p>
                        
                        <TourButton
                          tourId="user-journey-demo"
                          steps={tourSteps}
                          text="Start Guided Tour"
                          variant="primary"
                          showOnce={false}
                          onStart={() => setIsTourActive(true)}
                          onComplete={() => setIsTourActive(false)}
                        />
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3">Tour Button Variants</h4>
                        <div className="flex flex-wrap gap-3">
                          <TourButton
                            tourId="primary-tour"
                            steps={tourSteps}
                            text="Primary"
                            variant="primary"
                            showOnce={false}
                          />
                          
                          <TourButton
                            tourId="secondary-tour"
                            steps={tourSteps}
                            text="Secondary"
                            variant="secondary"
                            showOnce={false}
                          />
                          
                          <TourButton
                            tourId="outline-tour"
                            steps={tourSteps}
                            text="Outline"
                            variant="outline"
                            showOnce={false}
                          />
                          
                          <TourButton
                            tourId="ghost-tour"
                            steps={tourSteps}
                            text="Ghost"
                            variant="ghost"
                            showOnce={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Persona-Specific Tours</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Filtered Tour Steps</h4>
                        <p className="mb-4">
                          This tour shows different steps based on your selected persona.
                          Try changing your persona above and starting the tour again.
                        </p>
                        
                        <GuidedTour
                          steps={tourSteps}
                          isActive={isTourActive}
                          tourId="persona-specific-tour"
                          showOnce={false}
                          onClose={() => setIsTourActive(false)}
                          onComplete={() => setIsTourActive(false)}
                          showProgress={true}
                          showStepNumbers={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'progressive-disclosure' && (
              <section id="progressive-disclosure" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Progressive Disclosure of Complex Information</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Persona-Specific Content</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Content Targeting</h4>
                        <p className="mb-4">
                          The content below changes based on your selected persona.
                          Try changing your persona above to see different content.
                        </p>
                        
                        <PersonaContent
                          businessStakeholder={
                            <div className="p-4 bg-green-50 border border-green-200 rounded">
                              <h5 className="font-bold text-green-800">Business Value</h5>
                              <p className="text-green-700">
                                IdeaCode reduces development costs by 40% and time-to-market by 60%.
                                Our platform helps you maximize ROI on your technology investments.
                              </p>
                            </div>
                          }
                          engineeringLeader={
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                              <h5 className="font-bold text-blue-800">Engineering Efficiency</h5>
                              <p className="text-blue-700">
                                IdeaCode streamlines your development workflow with automated CI/CD,
                                code quality checks, and team collaboration tools.
                              </p>
                            </div>
                          }
                          technicalDeveloper={
                            <div className="p-4 bg-purple-50 border border-purple-200 rounded">
                              <h5 className="font-bold text-purple-800">Technical Capabilities</h5>
                              <p className="text-purple-700">
                                IdeaCode provides a robust API, comprehensive SDKs, and extensive
                                documentation to help you build powerful applications.
                              </p>
                            </div>
                          }
                          general={
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                              <h5 className="font-bold text-gray-800">IdeaCode Platform</h5>
                              <p className="text-gray-700">
                                IdeaCode is a comprehensive platform for building modern applications
                                with powerful tools and features for teams of all sizes.
                              </p>
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Progressive Disclosure</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Technical Details</h4>
                        
                        <div className="space-y-4">
                          <p>
                            IdeaCode is built on a modern tech stack with performance and scalability in mind.
                          </p>
                          
                          <ProgressiveDisclosure
                            targetPersona={['technical-developer', 'engineering-leader']}
                            summary={
                              <div className="p-3 bg-gray-50 border border-gray-200 rounded cursor-pointer hover:bg-gray-100">
                                <p className="font-medium">View Technical Architecture Details</p>
                              </div>
                            }
                          >
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                              <h5 className="font-bold mb-2">Technical Architecture</h5>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>React and Next.js frontend with TypeScript</li>
                                <li>Node.js and Express backend services</li>
                                <li>GraphQL API with Apollo Server</li>
                                <li>PostgreSQL database with Prisma ORM</li>
                                <li>Redis for caching and real-time features</li>
                                <li>Containerized with Docker and orchestrated with Kubernetes</li>
                                <li>CI/CD pipeline with GitHub Actions</li>
                              </ul>
                            </div>
                          </ProgressiveDisclosure>
                          
                          <ProgressiveDisclosure
                            targetPersona={['business-stakeholder']}
                            summary={
                              <div className="p-3 bg-gray-50 border border-gray-200 rounded cursor-pointer hover:bg-gray-100">
                                <p className="font-medium">View Business Benefits</p>
                              </div>
                            }
                          >
                            <div className="p-4 bg-gray-50 border border-gray-200 rounded">
                              <h5 className="font-bold mb-2">Business Benefits</h5>
                              <ul className="list-disc pl-5 space-y-1">
                                <li>Reduce development costs by up to 40%</li>
                                <li>Accelerate time-to-market by 60%</li>
                                <li>Improve application quality and reliability</li>
                                <li>Scale seamlessly as your business grows</li>
                                <li>Pay only for what you use with flexible pricing</li>
                                <li>Enterprise-grade security and compliance</li>
                              </ul>
                            </div>
                          </ProgressiveDisclosure>
                          
                          <ProgressiveDisclosure
                            targetPersona="general"
                            hideCompletely={false}
                          >
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                              <h5 className="font-bold mb-2">Getting Started</h5>
                              <p>
                                Ready to get started with IdeaCode? Sign up for a free account
                                and follow our quick start guide to build your first application.
                              </p>
                              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Sign Up Free
                              </button>
                            </div>
                          </ProgressiveDisclosure>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'mobile-navigation' && (
              <section id="mobile-navigation" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Mobile Navigation Experience</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Bottom Navigation</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Mobile Navigation Bar</h4>
                        <p className="mb-4">
                          This navigation bar is visible on mobile devices.
                          Resize your browser to see it in action.
                        </p>
                        
                        <MobileNavigation
                          items={navigationItems}
                          position="bottom"
                          showLabels={true}
                          hideOnScroll={false}
                          transformOnScroll={false}
                          useGestures={true}
                          backgroundColor="white"
                          textColor="text-gray-600"
                          activeColor="text-blue-600"
                          breakpoint="md"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Compact Header</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Transforming Header</h4>
                        <p className="mb-4">
                          This header transforms as you scroll down the page.
                          Current scroll position: {scrollPosition}px
                        </p>
                        
                        <div className="border border-gray-200 rounded p-4">
                          <p>
                            The compact header at the top of this page demonstrates
                            the transforming header component. Scroll up and down to
                            see it in action.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Side Navigation</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Left Side Navigation</h4>
                        <p className="mb-4">
                          This navigation appears on the left side of the screen on mobile devices.
                          Resize your browser to see it in action.
                        </p>
                        
                        <MobileNavigation
                          items={navigationItems}
                          position="left"
                          showLabels={true}
                          hideOnScroll={false}
                          transformOnScroll={false}
                          useGestures={true}
                          backgroundColor="white"
                          textColor="text-gray-600"
                          activeColor="text-blue-600"
                          breakpoint="md"
                          showBackdrop={true}
                          showHandle={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </AppProviders>
  );
}