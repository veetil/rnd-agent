import { useState } from 'react';
import { AppProviders } from '../../components';
import { ContextualCTA } from '../../components/user-journey/ContextualCTA';
import { GuidedTour, TourButton } from '../../components/user-journey/GuidedTour';
import { MobileNavigation, CompactHeader } from '../../components/user-journey/MobileNavigation';
import { ProgressiveDisclosure } from '../../components/user-journey/PersonaContext';
import { ScrollAnimation } from '../../components/animations/ScrollAnimation';

/**
 * Example page demonstrating the User Journey components for Phase 2
 * This page showcases various user journey optimization components
 */
export default function UserJourneyExamplePage() {
  const [activeSection, setActiveSection] = useState('contextual-cta');
  const [isTourActive, setIsTourActive] = useState(false);

  // Sample navigation items for mobile navigation
  const navigationItems = [
    {
      label: 'Home',
      href: '#home',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
    },
    {
      label: 'Features',
      href: '#features',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      ),
    },
    {
      label: 'Pricing',
      href: '#pricing',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      label: 'Contact',
      href: '#contact',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      ),
      badge: '3',
      badgeColor: 'bg-green-500',
    },
  ];

  // Sample tour steps
  const tourSteps = [
    {
      target: '#contextual-cta-section',
      title: 'Contextual CTAs',
      content: 'Contextual CTAs appear based on user behavior and persona.',
      position: 'bottom' as const,
      highlight: true,
    },
    {
      target: '#progressive-disclosure-section',
      title: 'Progressive Disclosure',
      content: 'Information is revealed progressively based on user needs.',
      position: 'bottom' as const,
      highlight: true,
    },
    {
      target: '#mobile-navigation-section',
      title: 'Mobile Navigation',
      content: 'Optimized navigation for mobile users with gestures and transformations.',
      position: 'top' as const,
      highlight: true,
    },
    {
      target: '#guided-tour-section',
      title: 'Guided Tours',
      content: 'Interactive tours guide users through the interface.',
      position: 'top' as const,
      highlight: true,
    },
  ];

  return (
    <AppProviders
      initialAnimationSettings={{
        animationsEnabled: true,
        animationSpeed: 1,
      }}
      initialAccessibilitySettings={{
        highContrast: false,
        fontSizeMultiplier: 1,
        focusIndicatorsVisible: true,
      }}
      initialPersona="general"
    >
      <div className="min-h-screen pb-20">
        {/* Compact Header Example */}
        <CompactHeader
          logo={
            <div className="text-xl font-bold text-blue-600">IdeaCode</div>
          }
          items={navigationItems}
          transformOnScroll={true}
          scrollThreshold={50}
          className="border-b border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Optimized user journeys for better experiences
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Get Started
            </button>
          </div>
        </CompactHeader>

        <div className="container mx-auto px-4 pt-24 pb-8">
          <header className="mb-8">
            <ScrollAnimation type="fade-in" threshold={0.1}>
              <h1 className="text-3xl font-bold mb-2">User Journey Optimizations</h1>
              <p className="text-lg text-gray-600">
                This page demonstrates the user journey optimization components implemented for Phase 2.
              </p>
            </ScrollAnimation>
          </header>

          <nav className="mb-8">
            <ul className="flex flex-wrap gap-2">
              {['contextual-cta', 'progressive-disclosure', 'guided-tour', 'mobile-navigation'].map((section) => (
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
              <section id="contextual-cta-section" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Contextual Call-to-Action Elements</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Inline CTAs</h3>
                    
                    <div className="space-y-4">
                      <ContextualCTA
                        title="Get Started with IdeaCode"
                        description="Sign up now to access all features and start building your next project."
                        actions={[
                          { label: 'Sign Up', isPrimary: true },
                          { label: 'Learn More' },
                        ]}
                        position="inline"
                        variant="primary"
                        show={true}
                      />
                      
                      <ContextualCTA
                        title="Limited Time Offer"
                        description="Get 20% off your first year subscription when you sign up today."
                        actions={[
                          { label: 'Claim Offer', isPrimary: true },
                          { label: 'View Plans' },
                        ]}
                        position="inline"
                        variant="success"
                        show={true}
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Floating CTAs</h3>
                    
                    <div className="space-y-4">
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        onClick={() => {
                          const ctaElement = document.getElementById('floating-cta-example');
                          if (ctaElement) {
                            ctaElement.setAttribute('data-visible', 'true');
                          }
                        }}
                      >
                        Show Floating CTA
                      </button>
                      
                      <div id="floating-cta-example" data-visible="false">
                        {document.getElementById('floating-cta-example')?.getAttribute('data-visible') === 'true' && (
                          <ContextualCTA
                            title="Need Help?"
                            description="Our support team is available 24/7 to assist you."
                            actions={[
                              { label: 'Chat Now', isPrimary: true },
                              { label: 'Email Support' },
                            ]}
                            position="floating"
                            variant="info"
                            show={true}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Trigger-Based CTAs</h3>
                    
                    <div className="space-y-4">
                      <p className="mb-2">Scroll down to see a scroll-triggered CTA:</p>
                      
                      <div className="h-64 overflow-y-auto border border-gray-200 p-4">
                        <div className="space-y-4">
                          <p>Scroll down to see the CTA...</p>
                          {Array.from({ length: 10 }).map((_, i) => (
                            <p key={i} className="text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                              aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                            </p>
                          ))}
                          
                          <ContextualCTA
                            title="You've Scrolled a Lot!"
                            description="Would you like to save your progress?"
                            actions={[
                              { label: 'Save Progress', isPrimary: true },
                              { label: 'No Thanks' },
                            ]}
                            position="inline"
                            variant="warning"
                            trigger="scroll"
                            scrollThreshold={0.5}
                            show={false}
                          />
                          
                          {Array.from({ length: 5 }).map((_, i) => (
                            <p key={i} className="text-gray-600">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                              aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'progressive-disclosure' && (
              <section id="progressive-disclosure-section" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Progressive Disclosure of Complex Information</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Persona-Based Content</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-100 rounded">
                        <h4 className="font-bold mb-2">API Documentation</h4>
                        
                        <ProgressiveDisclosure
                          targetPersona="technical-developer"
                          className="mb-4"
                          summary={
                            <div className="p-4 bg-blue-50 rounded border border-blue-200">
                              <p className="font-medium">Technical API details available</p>
                              <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-sm rounded">
                                Show Technical Details
                              </button>
                            </div>
                          }
                        >
                          <div className="p-4 bg-gray-50 rounded border border-gray-200 font-mono text-sm">
                            <p className="mb-2">// Example API request</p>
                            <p>const response = await fetch('https://api.ideacode.dev/v1/projects', {'{'}</p>
                            <p>  method: 'POST',</p>
                            <p>  headers: {'{'}</p>
                            <p>    'Content-Type': 'application/json',</p>
                            <p>    'Authorization': `Bearer ${'{'}apiKey{'}'}`</p>
                            <p>  {'}'},</p>
                            <p>  body: JSON.stringify({'{'}</p>
                            <p>    name: 'My Project',</p>
                            <p>    description: 'A new project'</p>
                            <p>  {'}'})</p>
                            <p>{'}'});</p>
                          </div>
                        </ProgressiveDisclosure>
                        
                        <ProgressiveDisclosure
                          targetPersona="business-stakeholder"
                          className="mb-4"
                          summary={
                            <div className="p-4 bg-green-50 rounded border border-green-200">
                              <p className="font-medium">Business value information available</p>
                              <button className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded">
                                Show Business Value
                              </button>
                            </div>
                          }
                        >
                          <div className="p-4 bg-gray-50 rounded border border-gray-200">
                            <h5 className="font-bold mb-2">Business Value</h5>
                            <p className="mb-2">Our API integration can help your business:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Reduce development time by 40%</li>
                              <li>Save $150,000 in annual development costs</li>
                              <li>Increase customer satisfaction by 25%</li>
                              <li>Achieve ROI within 3 months</li>
                            </ul>
                          </div>
                        </ProgressiveDisclosure>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Expandable Sections</h3>
                    
                    <div className="space-y-4">
                      {['What is IdeaCode?', 'How does it work?', 'Pricing details', 'Technical requirements'].map((title, index) => (
                        <div key={index} className="border border-gray-200 rounded">
                          <button
                            className="w-full flex justify-between items-center p-4 text-left font-medium hover:bg-gray-50"
                            onClick={(e) => {
                              const content = e.currentTarget.nextElementSibling;
                              if (content) {
                                content.classList.toggle('hidden');
                              }
                            }}
                          >
                            {title}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="transform transition-transform"
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </button>
                          <div className="hidden p-4 border-t border-gray-200">
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                              aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'guided-tour' && (
              <section id="guided-tour-section" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Guided Tours for First-Time Visitors</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Feature Tour</h3>
                    
                    <div className="space-y-4">
                      <p className="mb-4">
                        Guided tours help users understand the interface and features of the application.
                        Click the button below to start a tour of this page:
                      </p>
                      
                      <TourButton
                        tourId="user-journey-example"
                        steps={tourSteps}
                        text="Start Page Tour"
                        variant="primary"
                      />
                      
                      <button
                        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                        onClick={() => setIsTourActive(true)}
                      >
                        Start Manual Tour
                      </button>
                      
                      <GuidedTour
                        steps={tourSteps}
                        isActive={isTourActive}
                        tourId="manual-tour"
                        showOnce={false}
                        onClose={() => setIsTourActive(false)}
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Persona-Specific Tours</h3>
                    
                    <div className="space-y-4">
                      <p className="mb-4">
                        Different tours can be shown based on user persona:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded border border-blue-200">
                          <h4 className="font-bold mb-2">Developer Tour</h4>
                          <p className="text-sm mb-3">
                            A tour focused on technical features and API integration.
                          </p>
                          <TourButton
                            tourId="developer-tour"
                            steps={[
                              {
                                target: '#contextual-cta-section',
                                title: 'Developer Features',
                                content: 'Explore our API documentation and SDKs.',
                                position: 'bottom' as const,
                                relevantPersonas: ['technical-developer'],
                              },
                            ]}
                            text="Start Developer Tour"
                            variant="outline"
                            size="sm"
                          />
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded border border-green-200">
                          <h4 className="font-bold mb-2">Business Tour</h4>
                          <p className="text-sm mb-3">
                            A tour focused on business value and ROI.
                          </p>
                          <TourButton
                            tourId="business-tour"
                            steps={[
                              {
                                target: '#progressive-disclosure-section',
                                title: 'Business Value',
                                content: 'See how our solution can save you money and time.',
                                position: 'bottom' as const,
                                relevantPersonas: ['business-stakeholder'],
                              },
                            ]}
                            text="Start Business Tour"
                            variant="outline"
                            size="sm"
                          />
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded border border-purple-200">
                          <h4 className="font-bold mb-2">General Tour</h4>
                          <p className="text-sm mb-3">
                            A general overview tour for all users.
                          </p>
                          <TourButton
                            tourId="general-tour"
                            steps={tourSteps}
                            text="Start General Tour"
                            variant="outline"
                            size="sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'mobile-navigation' && (
              <section id="mobile-navigation-section" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Improved Mobile Navigation Experience</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Mobile Navigation Demo</h3>
                    
                    <div className="space-y-4">
                      <p className="mb-4">
                        This demonstrates how the mobile navigation works. Resize your browser to see it in action.
                      </p>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="text-center text-gray-500 mb-4">
                          Mobile Navigation Preview
                        </div>
                        
                        <div className="relative h-96 border border-gray-300 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 bg-gray-100 flex flex-col">
                            <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                              <div className="font-bold text-blue-600">IdeaCode</div>
                              <button className="text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <line x1="3" y1="12" x2="21" y2="12"></line>
                                  <line x1="3" y1="6" x2="21" y2="6"></line>
                                  <line x1="3" y1="18" x2="21" y2="18"></line>
                                </svg>
                              </button>
                            </div>
                            
                            <div className="flex-1 p-4">
                              <p className="text-center text-gray-500">
                                Page content would go here
                              </p>
                            </div>
                            
                            <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-around px-4">
                              {navigationItems.map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                  <div className={`${index === 0 ? 'text-blue-600' : 'text-gray-600'}`}>
                                    {item.icon}
                                  </div>
                                  <span className="text-xs mt-1">{item.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-center text-sm text-gray-500">
                          This is a static preview. The actual component is responsive and interactive.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Navigation Features</h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 bg-blue-50 rounded border border-blue-200">
                          <h4 className="font-bold mb-2">Gesture Navigation</h4>
                          <p>
                            Swipe left or right to navigate between pages. The navigation responds to touch gestures
                            for a more native-like experience on mobile devices.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded border border-green-200">
                          <h4 className="font-bold mb-2">Transforming Header</h4>
                          <p>
                            The header transforms as you scroll, becoming more compact to maximize screen space
                            while maintaining navigation access.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded border border-purple-200">
                          <h4 className="font-bold mb-2">Bottom Navigation</h4>
                          <p>
                            Key actions are accessible via bottom navigation, making them easy to reach with your thumb
                            on mobile devices.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
                          <h4 className="font-bold mb-2">Context-Aware Navigation</h4>
                          <p>
                            Navigation adapts based on the current context and user persona, highlighting the most
                            relevant actions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
        
        {/* Mobile Navigation Example */}
        <MobileNavigation
          items={navigationItems}
          position="bottom"
          showLabels={true}
          hideOnScroll={true}
          transformOnScroll={true}
          useGestures={true}
        />
      </div>
    </AppProviders>
  );
}