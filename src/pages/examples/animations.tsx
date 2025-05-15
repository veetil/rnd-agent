import { useState } from 'react';
import { AppProviders } from '../../components';
import { ScrollAnimation, StaggeredScrollAnimation } from '../../components/animations/ScrollAnimation';
import { MicroInteraction, AnimatedButton } from '../../components/animations/MicroInteraction';
import { PageTransition, SectionTransition } from '../../components/animations/PageTransition';
import { LoadingAnimation } from '../../components/animations/LoadingAnimation';

/**
 * Example page demonstrating the Animation components for Phase 2
 * This page showcases various animation components and their capabilities
 */
export default function AnimationsExamplePage() {
  const [activeSection, setActiveSection] = useState('scroll');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleErrorDemo = () => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsError(true);
    }, 2000);
  };

  return (
    <AppProviders
      initialAnimationSettings={{
        animationsEnabled: true,
        animationSpeed: 1
      }}
      initialAccessibilitySettings={{
        highContrast: false,
        fontSizeMultiplier: 1,
        focusIndicatorsVisible: true
      }}
      initialPersona="general"
    >
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <ScrollAnimation type="fade-in" threshold={0.1}>
            <h1 className="text-3xl font-bold mb-2">Animation Components</h1>
            <p className="text-lg text-gray-600">
              This page demonstrates the animation components implemented for Phase 2.
            </p>
          </ScrollAnimation>
        </header>
        
        <nav className="mb-8">
          <ul className="flex flex-wrap gap-2">
            {['scroll', 'micro', 'page', 'loading'].map((section) => (
              <li key={section}>
                <button
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-md ${
                    activeSection === section
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  <MicroInteraction type="hover-scale">
                    {section.charAt(0).toUpperCase() + section.slice(1)} Animations
                  </MicroInteraction>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <main>
          <SectionTransition
            transitionKey={activeSection}
            type="fade-in"
            duration={0.3}
          >
            {activeSection === 'scroll' && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Scroll Animations</h2>
                
                <div className="space-y-12">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Basic Scroll Animations</h3>
                    
                    <div className="space-y-8">
                      <ScrollAnimation type="fade-in" threshold={0.1}>
                        <div className="p-4 bg-blue-100 rounded">
                          <p className="font-medium">Fade In Animation</p>
                          <p className="text-gray-600">This element fades in when scrolled into view.</p>
                        </div>
                      </ScrollAnimation>
                      
                      <ScrollAnimation type="fade-up" threshold={0.1}>
                        <div className="p-4 bg-green-100 rounded">
                          <p className="font-medium">Fade Up Animation</p>
                          <p className="text-gray-600">This element fades in and moves up when scrolled into view.</p>
                        </div>
                      </ScrollAnimation>
                      
                      <ScrollAnimation type="fade-down" threshold={0.1}>
                        <div className="p-4 bg-yellow-100 rounded">
                          <p className="font-medium">Fade Down Animation</p>
                          <p className="text-gray-600">This element fades in and moves down when scrolled into view.</p>
                        </div>
                      </ScrollAnimation>
                      
                      <ScrollAnimation type="fade-left" threshold={0.1}>
                        <div className="p-4 bg-purple-100 rounded">
                          <p className="font-medium">Fade Left Animation</p>
                          <p className="text-gray-600">This element fades in and moves from the left when scrolled into view.</p>
                        </div>
                      </ScrollAnimation>
                      
                      <ScrollAnimation type="fade-right" threshold={0.1}>
                        <div className="p-4 bg-red-100 rounded">
                          <p className="font-medium">Fade Right Animation</p>
                          <p className="text-gray-600">This element fades in and moves from the right when scrolled into view.</p>
                        </div>
                      </ScrollAnimation>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Staggered Animations</h3>
                    
                    <StaggeredScrollAnimation
                      type="fade-up"
                      staggerDelay={0.1}
                      threshold={0.1}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="p-4 bg-indigo-100 rounded">
                          <p className="font-medium">Item {item}</p>
                          <p className="text-gray-600">This item appears with a staggered delay.</p>
                        </div>
                      ))}
                    </StaggeredScrollAnimation>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'micro' && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Micro-Interactions</h2>
                
                <div className="space-y-12">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Hover Interactions</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <MicroInteraction type="hover-scale" className="p-4 bg-blue-100 rounded text-center cursor-pointer">
                        <p className="font-medium">Hover Scale</p>
                        <p className="text-gray-600">Scales up on hover</p>
                      </MicroInteraction>
                      
                      <MicroInteraction type="hover-lift" className="p-4 bg-green-100 rounded text-center cursor-pointer">
                        <p className="font-medium">Hover Lift</p>
                        <p className="text-gray-600">Lifts up on hover</p>
                      </MicroInteraction>
                      
                      <MicroInteraction type="hover-glow" color="#6366f1" className="p-4 bg-purple-100 rounded text-center cursor-pointer">
                        <p className="font-medium">Hover Glow</p>
                        <p className="text-gray-600">Glows on hover</p>
                      </MicroInteraction>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Button Interactions</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <AnimatedButton
                        text="Click Ripple"
                        type="click-ripple"
                        variant="primary"
                        onClick={() => alert('Button clicked!')}
                      />
                      
                      <AnimatedButton
                        text="Click Bounce"
                        type="click-bounce"
                        variant="secondary"
                        onClick={() => alert('Button clicked!')}
                      />
                      
                      <AnimatedButton
                        text="Focus Outline"
                        type="focus-outline"
                        variant="outline"
                        onClick={() => alert('Button clicked!')}
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">State Interactions</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <AnimatedButton
                        text="Loading State"
                        type="loading-spinner"
                        variant="primary"
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        isError={isError}
                        onClick={handleLoadingDemo}
                      />
                      
                      <AnimatedButton
                        text="Success State"
                        type="success-checkmark"
                        variant="success"
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        isError={isError}
                        onClick={handleLoadingDemo}
                      />
                      
                      <AnimatedButton
                        text="Error State"
                        type="error-shake"
                        variant="danger"
                        isLoading={isLoading}
                        isSuccess={isSuccess}
                        isError={isError}
                        onClick={handleErrorDemo}
                      />
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'page' && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Page Transitions</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Section Transitions</h3>
                    
                    <p className="mb-4">
                      Click the buttons below to see different section transitions:
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {['fade-in', 'slide-up', 'slide-down', 'scale', 'flip'].map((transitionType) => (
                        <button
                          key={transitionType}
                          onClick={() => {
                            setActiveSection('page');
                            // Force re-render of the section with a new key
                            setTimeout(() => {
                              const element = document.getElementById('transition-demo');
                              if (element) {
                                element.setAttribute('data-transition', transitionType);
                              }
                            }, 0);
                          }}
                          className="px-3 py-1 bg-blue-100 rounded hover:bg-blue-200"
                        >
                          {transitionType}
                        </button>
                      ))}
                    </div>
                    
                    <div id="transition-demo" data-transition="fade-in" className="p-4 bg-gray-100 rounded">
                      <p>This content transitions when you click the buttons above.</p>
                      <p>The current transition type is shown in the data-transition attribute.</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Page Navigation</h3>
                    
                    <p className="mb-4">
                      The PageTransition component is used at the layout level to animate between pages.
                      Navigate to different pages to see the transition effect.
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <a href="/examples/phase2" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Go to Phase 2 Example
                      </a>
                      <a href="/" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                        Go to Home Page
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'loading' && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Loading Animations</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Loading Indicators</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="flex flex-col items-center">
                        <LoadingAnimation type="spinner" size="md" />
                        <p className="mt-2 text-center">Spinner</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <LoadingAnimation type="dots" size="md" />
                        <p className="mt-2 text-center">Dots</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <LoadingAnimation type="pulse" size="md" />
                        <p className="mt-2 text-center">Pulse</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Loading Sizes</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="flex flex-col items-center">
                        <LoadingAnimation type="spinner" size="sm" />
                        <p className="mt-2 text-center">Small</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <LoadingAnimation type="spinner" size="md" />
                        <p className="mt-2 text-center">Medium</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <LoadingAnimation type="spinner" size="lg" />
                        <p className="mt-2 text-center">Large</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Loading Colors</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="flex flex-col items-center">
                        <LoadingAnimation type="spinner" size="md" color="blue" />
                        <p className="mt-2 text-center">Blue</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <LoadingAnimation type="spinner" size="md" color="green" />
                        <p className="mt-2 text-center">Green</p>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <LoadingAnimation type="spinner" size="md" color="red" />
                        <p className="mt-2 text-center">Red</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </SectionTransition>
        </main>
        
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            These animation components provide enhanced user experience for Phase 2.
          </p>
        </footer>
      </div>
    </AppProviders>
  );
}