import { useState, useEffect } from 'react';
import { AppProviders } from '../../components';
import { ScrollAnimation } from '../../components/animations/ScrollAnimation';
import { MicroInteraction } from '../../components/animations/MicroInteraction';
import { PageTransition } from '../../components/animations/PageTransition';
import { LoadingAnimation, Skeleton, ContentPlaceholder } from '../../components/animations/LoadingAnimation';
import { useAnimation } from '../../components/animations/AnimationContext';

/**
 * Example page demonstrating the Animation components for Phase 2
 * This page showcases various animation enhancements for improved user experience
 */
export default function AnimationComponentsPage() {
  const [activeSection, setActiveSection] = useState('scroll-animations');
  const [isLoading, setIsLoading] = useState(false);
  const [showPageTransition, setShowPageTransition] = useState(false);
  const { animationsEnabled, toggleAnimations, reducedMotion, animationSpeed } = useAnimation();

  // Simulate loading for demo purposes
  const simulateLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AppProviders>
      <div className="min-h-screen pb-20">
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <h1 className="text-xl font-bold">Animation Components</h1>
              
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
                  <input
                    type="checkbox"
                    checked={reducedMotion}
                    onChange={() => {}} // This is read-only, controlled by system preferences
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span>Reduced Motion</span>
                </label>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 pt-24 pb-8">
          <nav className="mb-8 sticky top-20 bg-white z-10 py-2 border-b border-gray-200">
            <ul className="flex flex-wrap gap-2">
              {['scroll-animations', 'micro-interactions', 'page-transitions', 'loading-animations'].map((section) => (
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
            {activeSection === 'scroll-animations' && (
              <section id="scroll-animations" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Scroll-Triggered Animations</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Fade In Animation</h3>
                    
                    <div className="space-y-6">
                      <ScrollAnimation
                        type="fade"
                        delay={0.2}
                        duration={0.8}
                        once={false}
                        threshold={0.2}
                      >
                        <div className="p-6 bg-blue-50 border border-blue-200 rounded">
                          <h4 className="font-bold text-blue-800">Fade In</h4>
                          <p className="text-blue-700">
                            This content fades in when it enters the viewport.
                            Scroll down and back up to see it animate again.
                          </p>
                        </div>
                      </ScrollAnimation>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Slide Animation</h3>
                    
                    <div className="space-y-6">
                      <ScrollAnimation
                        type="slide-up"
                        delay={0.2}
                        duration={0.8}
                        once={false}
                        threshold={0.2}
                      >
                        <div className="p-6 bg-green-50 border border-green-200 rounded">
                          <h4 className="font-bold text-green-800">Slide Up</h4>
                          <p className="text-green-700">
                            This content slides up when it enters the viewport.
                            Scroll down and back up to see it animate again.
                          </p>
                        </div>
                      </ScrollAnimation>
                      
                      <ScrollAnimation
                        type="slide-right"
                        delay={0.3}
                        duration={0.8}
                        once={false}
                        threshold={0.2}
                      >
                        <div className="p-6 bg-green-50 border border-green-200 rounded">
                          <h4 className="font-bold text-green-800">Slide Right</h4>
                          <p className="text-green-700">
                            This content slides in from the left when it enters the viewport.
                            Scroll down and back up to see it animate again.
                          </p>
                        </div>
                      </ScrollAnimation>
                      
                      <ScrollAnimation
                        type="slide-left"
                        delay={0.4}
                        duration={0.8}
                        once={false}
                        threshold={0.2}
                      >
                        <div className="p-6 bg-green-50 border border-green-200 rounded">
                          <h4 className="font-bold text-green-800">Slide Left</h4>
                          <p className="text-green-700">
                            This content slides in from the right when it enters the viewport.
                            Scroll down and back up to see it animate again.
                          </p>
                        </div>
                      </ScrollAnimation>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Scale Animation</h3>
                    
                    <div className="space-y-6">
                      <ScrollAnimation
                        type="zoom-in"
                        delay={0.2}
                        duration={0.8}
                        once={false}
                        threshold={0.2}
                      >
                        <div className="p-6 bg-purple-50 border border-purple-200 rounded">
                          <h4 className="font-bold text-purple-800">Scale</h4>
                          <p className="text-purple-700">
                            This content scales up when it enters the viewport.
                            Scroll down and back up to see it animate again.
                          </p>
                        </div>
                      </ScrollAnimation>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Staggered Animation</h3>
                    
                    <div className="space-y-6">
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
                              <h4 className="font-bold text-yellow-800">Item {item}</h4>
                              <p className="text-yellow-700">
                                This item appears with a staggered delay.
                              </p>
                            </div>
                          </ScrollAnimation>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'micro-interactions' && (
              <section id="micro-interactions" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Micro-Interactions</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Button Animations</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Hover Effects</h4>
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
                          
                          <MicroInteraction
                            type="hover-lift"
                            isActive={false}
                          >
                            <button className="px-4 py-2 bg-green-600 text-white rounded">
                              Lift on Hover
                            </button>
                          </MicroInteraction>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3">Click Effects</h4>
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
                          
                          <MicroInteraction
                            type="click-bounce"
                            isActive={false}
                          >
                            <button className="px-4 py-2 bg-green-600 text-white rounded">
                              Bounce Effect
                            </button>
                          </MicroInteraction>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Form Element Animations</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Input Focus Effects</h4>
                        <div className="space-y-4">
                          <MicroInteraction
                            type="focus-outline"
                            isActive={false}
                          >
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Highlight on Focus"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                              />
                            </div>
                          </MicroInteraction>
                          
                          <MicroInteraction
                            type="hover-scale"
                            isActive={false}
                            scale={1.1}
                          >
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Expand on Focus"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                              />
                            </div>
                          </MicroInteraction>
                          
                          <MicroInteraction
                            type="hover-color"
                            isActive={false}
                          >
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Float Label on Focus"
                                className="w-full px-4 py-2 border border-gray-300 rounded"
                              />
                            </div>
                          </MicroInteraction>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Tooltip Animations</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Hover Tooltips</h4>
                        <div className="flex flex-wrap gap-4">
                          <MicroInteraction
                            type="hover-scale"
                            isActive={false}
                          >
                            <button className="px-4 py-2 bg-blue-600 text-white rounded">
                              Fade Tooltip
                            </button>
                          </MicroInteraction>
                          
                          <MicroInteraction
                            type="hover-scale"
                            isActive={false}
                          >
                            <button className="px-4 py-2 bg-purple-600 text-white rounded">
                              Scale Tooltip
                            </button>
                          </MicroInteraction>
                          
                          <MicroInteraction
                            type="hover-scale"
                            isActive={false}
                          >
                            <button className="px-4 py-2 bg-green-600 text-white rounded">
                              Slide Tooltip
                            </button>
                          </MicroInteraction>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'page-transitions' && (
              <section id="page-transitions" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Page Transitions</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Transition Effects</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Fade Transition</h4>
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() => setShowPageTransition(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                          >
                            Show Transition
                          </button>
                        </div>
                        
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
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Transition Types</h3>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded text-center">
                          <h4 className="font-bold mb-2">Fade</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Simple fade in/out transition
                          </p>
                          <button
                            onClick={() => {
                              setShowPageTransition(true);
                            }}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                          >
                            Preview
                          </button>
                        </div>
                        
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded text-center">
                          <h4 className="font-bold mb-2">Slide</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Slide in/out transition
                          </p>
                          <button
                            onClick={() => {
                              setShowPageTransition(true);
                            }}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                          >
                            Preview
                          </button>
                        </div>
                        
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded text-center">
                          <h4 className="font-bold mb-2">Scale</h4>
                          <p className="text-sm text-gray-600 mb-4">
                            Scale in/out transition
                          </p>
                          <button
                            onClick={() => {
                              setShowPageTransition(true);
                            }}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                          >
                            Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
            
            {activeSection === 'loading-animations' && (
              <section id="loading-animations" className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Loading State Animations</h2>
                
                <div className="space-y-8">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Loading Spinners</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Spinner Variants</h4>
                        <div className="flex flex-wrap gap-8">
                          <div className="text-center">
                            <LoadingAnimation type="spinner" size="sm" />
                            <p className="mt-2 text-sm text-gray-600">Small</p>
                          </div>
                          
                          <div className="text-center">
                            <LoadingAnimation type="spinner" size="md" />
                            <p className="mt-2 text-sm text-gray-600">Medium</p>
                          </div>
                          
                          <div className="text-center">
                            <LoadingAnimation type="spinner" size="lg" />
                            <p className="mt-2 text-sm text-gray-600">Large</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3">Pulse Loader</h4>
                        <div className="flex flex-wrap gap-8">
                          <div className="text-center">
                            <LoadingAnimation type="pulse" size="sm" />
                            <p className="mt-2 text-sm text-gray-600">Small</p>
                          </div>
                          
                          <div className="text-center">
                            <LoadingAnimation type="pulse" size="md" />
                            <p className="mt-2 text-sm text-gray-600">Medium</p>
                          </div>
                          
                          <div className="text-center">
                            <LoadingAnimation type="pulse" size="lg" />
                            <p className="mt-2 text-sm text-gray-600">Large</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3">Dots Loader</h4>
                        <div className="flex flex-wrap gap-8">
                          <div className="text-center">
                            <LoadingAnimation type="dots" size="sm" />
                            <p className="mt-2 text-sm text-gray-600">Small</p>
                          </div>
                          
                          <div className="text-center">
                            <LoadingAnimation type="dots" size="md" />
                            <p className="mt-2 text-sm text-gray-600">Medium</p>
                          </div>
                          
                          <div className="text-center">
                            <LoadingAnimation type="dots" size="lg" />
                            <p className="mt-2 text-sm text-gray-600">Large</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Skeleton Loaders</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Skeleton Variants</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[1, 2, 3].map((i) => (
                            <Skeleton 
                                key={i} 
                                variant="rounded" 
                                width="100%" 
                                height={200} 
                              />
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3">Content Placeholders</h4>
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
                      
                      <div>
                        <h4 className="font-bold mb-3">Text Placeholders</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-bold mb-2">Loading State</h5>
                            <ContentPlaceholder
                              type="skeleton"
                              isLoading={true}
                              lines={3}
                            >
                              <div>
                                <h5 className="font-bold">Text Content</h5>
                                <p>
                                  This is the first line of text content.
                                </p>
                                <p>
                                  This is the second line of text content.
                                </p>
                              </div>
                            </ContentPlaceholder>
                          </div>
                          
                          <div>
                            <h5 className="font-bold mb-2">Loaded State</h5>
                            <ContentPlaceholder
                              type="skeleton"
                              isLoading={false}
                              lines={3}
                            >
                              <div>
                                <h5 className="font-bold">Text Content</h5>
                                <p>
                                  This is the first line of text content.
                                </p>
                                <p>
                                  This is the second line of text content.
                                </p>
                              </div>
                            </ContentPlaceholder>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-3">Image Placeholders</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-bold mb-2">Loading State</h5>
                            <ContentPlaceholder
                              type="blur"
                              isLoading={true}
                              width="100%"
                              height={200}
                            >
                              <img
                                src="https://via.placeholder.com/400x200"
                                alt="Placeholder"
                                className="w-full h-auto rounded"
                              />
                            </ContentPlaceholder>
                          </div>
                          
                          <div>
                            <h5 className="font-bold mb-2">Loaded State</h5>
                            <ContentPlaceholder
                              type="blur"
                              isLoading={false}
                              width="100%"
                              height={200}
                            >
                              <img
                                src="https://via.placeholder.com/400x200"
                                alt="Placeholder"
                                className="w-full h-auto rounded"
                              />
                            </ContentPlaceholder>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Loading Button</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Button with Loading State</h4>
                        <div className="flex flex-wrap gap-4">
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