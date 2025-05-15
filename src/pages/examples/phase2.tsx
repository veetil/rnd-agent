import { useState, useEffect } from 'react';
import { AppProviders } from '../../components';
import { ScrollAnimation } from '../../components/animations/ScrollAnimation';
import { MicroInteraction } from '../../components/animations/MicroInteraction';
import { PageTransition } from '../../components/animations/PageTransition';
import { LoadingAnimation, Skeleton, ContentPlaceholder } from '../../components/animations/LoadingAnimation';
import { useAnimation } from '../../components/animations/AnimationContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/**
 * Example page demonstrating all Phase 2 enhancements
 * This page showcases animation enhancements and user journey optimizations
 */
export default function Phase2ExamplePage() {
  const [activeSection, setActiveSection] = useState('animation-enhancements');
  const [activeSubSection, setActiveSubSection] = useState('scroll-animations');
  const [isLoading, setIsLoading] = useState(false);
  const [showPageTransition, setShowPageTransition] = useState(false);
  const [activePersona, setActivePersona] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const { animationsEnabled, toggleAnimations, reducedMotion } = useAnimation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Simulate loading for demo purposes
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Toggle expanded section
  const toggleSection = (sectionId: string) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  // Personas
  const personas = [
    {
      id: "business-stakeholder",
      name: "Business Stakeholder",
      description: "Decision makers focused on ROI and business value",
      interests: ["Cost savings", "Efficiency", "Analytics"],
      icon: "💼"
    },
    {
      id: "engineering-leader",
      name: "Engineering Leader",
      description: "Technical leaders managing development teams",
      interests: ["Scalability", "Team productivity", "Integration"],
      icon: "👨‍💻"
    },
    {
      id: "technical-developer",
      name: "Technical Developer",
      description: "Hands-on developers implementing solutions",
      interests: ["API documentation", "SDKs", "Code examples"],
      icon: "🛠️"
    }
  ];

  // Progressive disclosure content
  const complexContent = [
    {
      id: "section-1",
      title: "Platform Architecture",
      summary: "Overview of the IdeaCode platform architecture",
      details: "The IdeaCode platform is built on a microservices architecture using containerized services orchestrated with Kubernetes. The platform consists of several key components including the API Gateway, Authentication Service, Core Processing Engine, Data Storage Layer, and Client SDKs."
    },
    {
      id: "section-2",
      title: "Integration Options",
      summary: "Ways to integrate with the IdeaCode platform",
      details: "IdeaCode offers multiple integration options including RESTful APIs, GraphQL endpoints, webhooks for event-driven architectures, and native SDKs for popular programming languages. Each integration method is designed to provide optimal performance and developer experience based on your specific use case."
    }
  ];

  // Contextual CTAs
  const contextualCTAs = [
    {
      id: "cta-1",
      title: "Get Started",
      description: "Create your free account",
      buttonText: "Sign Up Free",
      icon: "🚀",
      variant: "primary",
      forPersonas: ["business-stakeholder", "engineering-leader", "technical-developer"]
    },
    {
      id: "cta-2",
      title: "Schedule a Demo",
      description: "See the platform in action",
      buttonText: "Book Demo",
      icon: "📅",
      variant: "secondary",
      forPersonas: ["business-stakeholder", "engineering-leader"]
    }
  ];

  return (
    <AppProviders>
      <div className="min-h-screen pb-20">
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-xl font-bold">Phase 2: Enhanced User Experience</h1>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={animationsEnabled}
                    onChange={() => toggleAnimations()}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Animations Enabled</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <span>Persona:</span>
                  <select 
                    value={activePersona || ''} 
                    onChange={(e) => setActivePersona(e.target.value || null)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">None</option>
                    {personas.map(persona => (
                      <option key={persona.id} value={persona.id}>{persona.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
            <div className="flex justify-around py-2">
              {['animation-enhancements', 'user-journey-optimizations'].map((section) => (
                <button
                  key={section}
                  onClick={() => {
                    setActiveSection(section);
                    if (section === 'animation-enhancements') {
                      setActiveSubSection('scroll-animations');
                    } else {
                      setActiveSubSection('persona-pathways');
                    }
                  }}
                  className={`p-2 rounded-md ${
                    activeSection === section
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {section === 'animation-enhancements' && '✨'}
                  {section === 'user-journey-optimizations' && '👤'}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 pt-24 pb-8">
          <nav className="mb-8 sticky top-20 bg-white z-10 py-2 border-b border-gray-200">
            <ul className="flex flex-wrap gap-2">
              {['animation-enhancements', 'user-journey-optimizations'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() => {
                      setActiveSection(section);
                      if (section === 'animation-enhancements') {
                        setActiveSubSection('scroll-animations');
                      } else {
                        setActiveSubSection('persona-pathways');
                      }
                    }}
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

          {activeSection === 'animation-enhancements' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Animation Enhancements</h2>
              
              <div className="mb-6">
                <ul className="flex flex-wrap gap-2">
                  {['scroll-animations', 'micro-interactions', 'page-transitions', 'loading-animations'].map((subSection) => (
                    <li key={subSection}>
                      <button
                        onClick={() => setActiveSubSection(subSection)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          activeSubSection === subSection
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {subSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {activeSubSection === 'scroll-animations' && (
                <section className="mb-12">
                  <h3 className="text-xl font-bold mb-4">Scroll-Triggered Animations</h3>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Fade In Animation</h4>
                      
                      <ScrollAnimation
                        type="fade"
                        delay={0.2}
                        duration={0.8}
                        once={false}
                        threshold={0.2}
                      >
                        <div className="p-6 bg-blue-50 border border-blue-200 rounded">
                          <h5 className="font-bold text-blue-800">Fade In</h5>
                          <p className="text-blue-700">
                            This content fades in when it enters the viewport.
                            Scroll down and back up to see it animate again.
                          </p>
                        </div>
                      </ScrollAnimation>
                    </div>
                    
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Slide Animation</h4>
                      
                      <ScrollAnimation
                        type="slide-up"
                        delay={0.2}
                        duration={0.8}
                        once={false}
                        threshold={0.2}
                      >
                        <div className="p-6 bg-green-50 border border-green-200 rounded">
                          <h5 className="font-bold text-green-800">Slide Up</h5>
                          <p className="text-green-700">
                            This content slides up when it enters the viewport.
                            Scroll down and back up to see it animate again.
                          </p>
                        </div>
                      </ScrollAnimation>
                    </div>
                    
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Staggered Animation</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((item, index) => (
                          <ScrollAnimation
                            key={item}
                            type="fade"
                            delay={0.2 * (index + 1)}
                            duration={0.8}
                            once={false}
                            threshold={0.2}
                          >
                            <div className="p-6 bg-yellow-50 border border-yellow-200 rounded">
                              <h5 className="font-bold text-yellow-800">Item {item}</h5>
                              <p className="text-yellow-700">
                                This item appears with a staggered delay.
                              </p>
                            </div>
                          </ScrollAnimation>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}
              
              {activeSubSection === 'micro-interactions' && (
                <section className="mb-12">
                  <h3 className="text-xl font-bold mb-4">Micro-Interactions</h3>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Button Animations</h4>
                      
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-bold mb-3">Hover Effects</h5>
                          <div className="flex flex-wrap gap-4">
                            <MicroInteraction
                              type="hover-scale"
                              isActive={false}
                            >
                              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                                Scale on Hover
                              </button>
                            </MicroInteraction>
                            
                            <MicroInteraction
                              type="hover-glow"
                              isActive={false}
                            >
                              <button className="px-4 py-2 bg-purple-600 text-white rounded">
                                Glow on Hover
                              </button>
                            </MicroInteraction>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-bold mb-3">Click Effects</h5>
                          <div className="flex flex-wrap gap-4">
                            <MicroInteraction
                              type="click-ripple"
                              isActive={false}
                            >
                              <button className="px-4 py-2 bg-blue-600 text-white rounded">
                                Ripple Effect
                              </button>
                            </MicroInteraction>
                            
                            <MicroInteraction
                              type="loading-pulse"
                              isLoading={true}
                            >
                              <button className="px-4 py-2 bg-purple-600 text-white rounded">
                                Pulse Effect
                              </button>
                            </MicroInteraction>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              
              {activeSubSection === 'page-transitions' && (
                <section className="mb-12">
                  <h3 className="text-xl font-bold mb-4">Page Transitions</h3>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Transition Effects</h4>
                      
                      <div>
                        <button
                          onClick={() => setShowPageTransition(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                          Show Transition
                        </button>
                        
                        {showPageTransition && (
                          <PageTransition
                            type="fade"
                            duration={1}
                            onAnimationComplete={() => setShowPageTransition(false)}
                          >
                            <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                              <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">Page Content</h2>
                                <p className="mb-4">This is the new page content.</p>
                                <button
                                  onClick={() => setShowPageTransition(false)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </PageTransition>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}
              
              {activeSubSection === 'loading-animations' && (
                <section className="mb-12">
                  <h3 className="text-xl font-bold mb-4">Loading State Animations</h3>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Loading Spinners</h4>
                      
                      <div className="flex flex-wrap gap-8">
                        <div className="text-center">
                          <LoadingAnimation type="spinner" size="md" />
                          <p className="mt-2 text-sm text-gray-600">Spinner</p>
                        </div>
                        
                        <div className="text-center">
                          <LoadingAnimation type="pulse" size="md" />
                          <p className="mt-2 text-sm text-gray-600">Pulse</p>
                        </div>
                        
                        <div className="text-center">
                          <LoadingAnimation type="dots" size="md" />
                          <p className="mt-2 text-sm text-gray-600">Dots</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Content Placeholders</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-bold mb-2">Loading State</h5>
                          <ContentPlaceholder
                            type="skeleton"
                            isLoading={true}
                            width="100%"
                            height={200}
                          >
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                              <h5 className="font-bold text-blue-800">Content Title</h5>
                              <p className="text-blue-700">
                                This is the actual content that will be shown when loading is complete.
                              </p>
                            </div>
                          </ContentPlaceholder>
                        </div>
                        
                        <div>
                          <h5 className="font-bold mb-2">Loaded State</h5>
                          <ContentPlaceholder
                            type="skeleton"
                            isLoading={false}
                            width="100%"
                            height={200}
                          >
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                              <h5 className="font-bold text-blue-800">Content Title</h5>
                              <p className="text-blue-700">
                                This is the actual content that will be shown when loading is complete.
                              </p>
                            </div>
                          </ContentPlaceholder>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Loading Button</h4>
                      
                      <button
                        onClick={simulateLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded flex items-center"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <LoadingAnimation type="spinner" size="sm" className="mr-2" />
                            Loading...
                          </>
                        ) : (
                          'Click to Load'
                        )}
                      </button>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
          
          {activeSection === 'user-journey-optimizations' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">User Journey Optimizations</h2>
              
              <div className="mb-6">
                <ul className="flex flex-wrap gap-2">
                  {['persona-pathways', 'progressive-disclosure', 'contextual-cta', 'mobile-navigation'].map((subSection) => (
                    <li key={subSection}>
                      <button
                        onClick={() => setActiveSubSection(subSection)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          activeSubSection === subSection
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {subSection.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              {activeSubSection === 'persona-pathways' && (
                <section className="mb-12">
                  <h3 className="text-xl font-bold mb-4">Clear Pathways for Different User Personas</h3>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Persona-Specific Navigation</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {personas.map((persona) => (
                          <ScrollAnimation
                            key={persona.id}
                            type="fade"
                            delay={0.2}
                            duration={0.5}
                          >
                            <div 
                              className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                                activePersona === persona.id 
                                  ? 'border-blue-500 bg-blue-50' 
                                  : 'border-gray-200 bg-white hover:border-blue-300'
                              }`}
                            >
                              <div className="flex justify-between items-center mb-4">
                                <div className="text-3xl">{persona.icon}</div>
                              </div>
                              <h5 className="text-lg font-bold mb-2">{persona.name}</h5>
                              <p className="text-gray-600 mb-4">{persona.description}</p>
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <MicroInteraction type="hover-scale">
                                  <button
                                    onClick={() => setActivePersona(persona.id)}
                                    className={`w-full py-2 rounded-md text-center ${
                                      activePersona === persona.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                    }`}
                                  >
                                    {activePersona === persona.id ? 'Selected' : 'Select Persona'}
                                  </button>
                                </MicroInteraction>
                              </div>
                            </div>
                          </ScrollAnimation>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}
              
              {activeSubSection === 'progressive-disclosure' && (
                <section className="mb-12">
                  <h3 className="text-xl font-bold mb-4">Progressive Disclosure of Complex Information</h3>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Collapsible/Expandable Sections</h4>
                      
                      <div className="space-y-4">
                        {complexContent.map((section) => (
                          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleSection(section.id)}
                              className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center hover:bg-gray-100"
                            >
                              <h5 className="font-bold">{section.title}</h5>
                              <span>{expandedSections.includes(section.id) ? '−' : '+'}</span>
                            </button>
                            
                            {expandedSections.includes(section.id) ? (
                              <div className="p-4 bg-white">
                                <ScrollAnimation type="fade" duration={0.3}>
                                  <p>{section.details}</p>
                                </ScrollAnimation>
                              </div>
                            ) : (
                              <div className="p-4 bg-white">
                                <p className="text-gray-500">{section.summary}</p>
                                <MicroInteraction type="hover-scale">
                                  <button
                                    onClick={() => toggleSection(section.id)}
                                    className="mt-2 text-blue-600 text-sm hover:underline"
                                  >
                                    Read more
                                  </button>
                                </MicroInteraction>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}
              
              {activeSubSection === 'contextual-cta' && (
                <section className="mb-12">
                  <h3 className="text-xl font-bold mb-4">Contextual Call-to-Action Elements</h3>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Persona-Based CTAs</h4>
                      
                      <div className="space-y-6">
                        <p className="text-gray-700">
                          {activePersona 
                            ? `Showing relevant actions for ${personas.find(p => p.id === activePersona)?.name || activePersona}` 
                            : 'Select a persona to see relevant actions'}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {contextualCTAs
                            .filter(cta => !activePersona || cta.forPersonas.includes(activePersona))
                            .map((cta) => (
                              <ScrollAnimation
                                key={cta.id}
                                type="fade"
                                delay={0.2}
                                duration={0.5}
                              >
                                <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors duration-200">
                                  <div className="flex items-center mb-3">
                                    <span className="text-2xl mr-3">{cta.icon}</span>
                                    <h5 className="font-bold">{cta.title}</h5>
                                  </div>
                                  <p className="text-gray-600 mb-4">{cta.description}</p>
                                  <MicroInteraction type="hover-scale">
                                    <button
                                      className={`px-4 py-2 rounded ${
                                        cta.variant === 'primary'
                                          ? 'bg-blue-600 text-white'
                                          : cta.variant === 'secondary'
                                          ? 'bg-purple-600 text-white'
                                          : 'border border-gray-300 text-gray-700'
                                      }`}
                                    >
                                      {cta.buttonText}
                                    </button>
                                  </MicroInteraction>
                                </div>
                              </ScrollAnimation>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
              
              {activeSubSection === 'mobile-navigation' && (
                <section className="mb-12">
                  <h3 className="text-xl font-bold mb-4">Improved Mobile Navigation Experience</h3>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-white rounded-lg shadow-md">
                      <h4 className="text-lg font-bold mb-4">Mobile-Optimized Navigation</h4>
                      
                      <div className="space-y-6">
                        <p className="text-gray-700">
                          Resize your browser window to see the mobile navigation in action.
                          On small screens, a bottom navigation bar will appear.
                        </p>
                        
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <h5 className="font-bold mb-2">Features:</h5>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Compact header that transforms on scroll</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Bottom navigation for key actions</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Touch-friendly buttons and controls</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Optimized content layout for small screens</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </AppProviders>
  );
}