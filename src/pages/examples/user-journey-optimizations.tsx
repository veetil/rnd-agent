import { useState, useEffect } from 'react';
import { AppProviders } from '../../components';
import { ScrollAnimation } from '../../components/animations/ScrollAnimation';
import { MicroInteraction } from '../../components/animations/MicroInteraction';
import { useAnimation } from '../../components/animations/AnimationContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/**
 * Example page demonstrating the User Journey Optimization components for Phase 2
 * This page showcases various user journey optimizations for improved user experience
 */
export default function UserJourneyOptimizationsPage() {
  const [activeSection, setActiveSection] = useState('persona-pathways');
  const [activePanelIndex, setActivePanelIndex] = useState<number | null>(null);
  const [activePersona, setActivePersona] = useState<string | null>(null);
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const { animationsEnabled } = useAnimation();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Toggle expanded section
  const toggleSection = (sectionId: string) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter(id => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  // Start guided tour
  const startTour = (persona: string) => {
    setActivePersona(persona);
    setShowTour(true);
    setTourStep(0);
  };

  // Next tour step
  const nextTourStep = () => {
    if (tourStep < tourSteps.length - 1) {
      setTourStep(tourStep + 1);
    } else {
      setShowTour(false);
      setTourStep(0);
    }
  };

  // Tour steps based on persona
  const tourSteps = [
    {
      title: "Welcome to IdeaCode",
      content: `Welcome ${activePersona || 'User'}! Let's take a quick tour of the platform.`,
      target: "header"
    },
    {
      title: "Explore Solutions",
      content: "Discover how IdeaCode can help you achieve your goals.",
      target: "solutions"
    },
    {
      title: "Documentation",
      content: "Access comprehensive documentation to get started quickly.",
      target: "documentation"
    },
    {
      title: "Get Started",
      content: "Ready to begin? Sign up for a free account!",
      target: "cta"
    }
  ];

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
    },
    {
      id: "section-3",
      title: "Security Framework",
      summary: "Security features and compliance information",
      details: "Security is built into every layer of the IdeaCode platform. We implement industry-standard encryption for data in transit and at rest, role-based access control, multi-factor authentication, and regular security audits. The platform is compliant with SOC 2, GDPR, HIPAA, and other relevant standards depending on your industry."
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
    },
    {
      id: "cta-3",
      title: "Read Documentation",
      description: "Explore our technical guides",
      buttonText: "View Docs",
      icon: "📚",
      variant: "outline",
      forPersonas: ["engineering-leader", "technical-developer"]
    },
    {
      id: "cta-4",
      title: "Download SDK",
      description: "Get our developer tools",
      buttonText: "Download",
      icon: "💻",
      variant: "outline",
      forPersonas: ["technical-developer"]
    }
  ];

  // Render tour guide
  const renderTourGuide = () => {
    if (!showTour) return null;
    
    const currentStep = tourSteps[tourStep];
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{currentStep.title}</h3>
            <button 
              onClick={() => setShowTour(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <p className="mb-6">{currentStep.content}</p>
          <div className="flex justify-between">
            <button
              onClick={() => setShowTour(false)}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
            >
              Skip Tour
            </button>
            <button
              onClick={nextTourStep}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {tourStep < tourSteps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AppProviders>
      <div className="min-h-screen pb-20">
        {renderTourGuide()}
        
        <header id="header" className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-xl font-bold">User Journey Optimizations</h1>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <span>Current Persona:</span>
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
              {['persona-pathways', 'progressive-disclosure', 'contextual-cta', 'mobile-navigation'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`p-2 rounded-md ${
                    activeSection === section
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                >
                  {section === 'persona-pathways' && '👤'}
                  {section === 'progressive-disclosure' && '📖'}
                  {section === 'contextual-cta' && '🔔'}
                  {section === 'mobile-navigation' && '📱'}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 pt-24 pb-8">
          <nav className="mb-8 sticky top-20 bg-white z-10 py-2 border-b border-gray-200">
            <ul className="flex flex-wrap gap-2">
              {['persona-pathways', 'progressive-disclosure', 'contextual-cta', 'mobile-navigation'].map((section) => (
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
            {activeSection === 'persona-pathways' && (
              <section id="persona-pathways" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Clear Pathways for Different User Personas</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Persona-Specific Navigation</h3>
                    
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
                              <MicroInteraction type="hover-scale">
                                <button
                                  onClick={() => startTour(persona.id)}
                                  className="text-sm px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                                >
                                  Take Tour
                                </button>
                              </MicroInteraction>
                            </div>
                            <h4 className="text-lg font-bold mb-2">{persona.name}</h4>
                            <p className="text-gray-600 mb-4">{persona.description}</p>
                            <div>
                              <h5 className="font-medium mb-2">Key Interests:</h5>
                              <ul className="space-y-1">
                                {persona.interests.map((interest, index) => (
                                  <li key={index} className="flex items-center">
                                    <span className="mr-2">•</span>
                                    {interest}
                                  </li>
                                ))}
                              </ul>
                            </div>
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
            
            {activeSection === 'progressive-disclosure' && (
              <section id="progressive-disclosure" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Progressive Disclosure of Complex Information</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Collapsible/Expandable Sections</h3>
                    
                    <div className="space-y-4">
                      {complexContent.map((section) => (
                        <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full px-4 py-3 bg-gray-50 flex justify-between items-center hover:bg-gray-100"
                          >
                            <h4 className="font-bold">{section.title}</h4>
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
            
            {activeSection === 'contextual-cta' && (
              <section id="contextual-cta" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Contextual Call-to-Action Elements</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Persona-Based CTAs</h3>
                    
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
                                  <h4 className="font-bold">{cta.title}</h4>
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
            
            {activeSection === 'mobile-navigation' && (
              <section id="mobile-navigation" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Improved Mobile Navigation Experience</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Mobile-Optimized Navigation</h3>
                    
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        Resize your browser window to see the mobile navigation in action.
                        On small screens, a bottom navigation bar will appear.
                      </p>
                      
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Features:</h4>
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
          </main>
        </div>
      </div>
    </AppProviders>
  );
}