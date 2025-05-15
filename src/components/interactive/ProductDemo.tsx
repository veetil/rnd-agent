import { ReactNode, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicroInteraction } from '../animations/MicroInteraction';
import { ScrollAnimation } from '../animations/ScrollAnimation';
import { useAnimation } from '../animations/AnimationContext';
import { useAccessibility } from '../accessibility/AccessibilityContext';
import { usePersona } from '../user-journey/PersonaContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { getTabAttributes, getTabPanelAttributes, announceToScreenReader } from '../../utils/accessibility';

export interface DemoStep {
  id: string;
  title: string;
  description: string;
  content: ReactNode;
  codeExample?: string;
  diagramSrc?: string;
}

export interface ComparisonView {
  before: {
    title: string;
    content: ReactNode;
  };
  after: {
    title: string;
    content: ReactNode;
  };
}

interface ProductDemoProps {
  /** Title for the product demo section */
  title: string;
  /** Subtitle or description for the product demo section */
  subtitle?: string;
  /** Array of demo steps */
  steps: DemoStep[];
  /** Optional comparison view */
  comparisonView?: ComparisonView;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Interactive Product Demonstration component
 * Provides step-by-step walkthrough, interactive code examples,
 * animated diagrams, and comparison views
 */
export function ProductDemo({
  title,
  subtitle,
  steps,
  comparisonView,
  className = ''
}: ProductDemoProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [codeValue, setCodeValue] = useState(steps[0]?.codeExample || '');
  const [showComparison, setShowComparison] = useState(false);
  
  const { animationsEnabled, animationSpeed } = useAnimation();
  const { highContrast, fontSizeMultiplier } = useAccessibility();
  const { persona } = usePersona();
  const prefersReducedMotion = useReducedMotion();
  
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);
  
  // Update code value when active step changes
  useEffect(() => {
    if (!isEditing && steps[activeStep]?.codeExample) {
      setCodeValue(steps[activeStep].codeExample || '');
    }
  }, [activeStep, isEditing, steps]);
  
  // Handle step navigation
  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setActiveStep(index);
      setIsEditing(false);
      announceToScreenReader(`Step ${index + 1}: ${steps[index].title}`);
    }
  };
  
  // Handle code editing
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeValue(e.target.value);
  };
  
  const resetCode = () => {
    setCodeValue(steps[activeStep].codeExample || '');
    announceToScreenReader('Code reset to original example');
  };
  
  // Determine contrast classes
  const contrastClasses = highContrast
    ? 'bg-white text-black border-2 border-black'
    : 'bg-white shadow-lg text-gray-800 border border-gray-200';
  
  return (
    <section className={`product-demo ${className}`}>
      <ScrollAnimation
        type="fade-in"
        threshold={0.1}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
      </ScrollAnimation>
      
      {/* Step Navigation */}
      <div className="steps-navigation mb-8">
        <div className="flex overflow-x-auto pb-2 hide-scrollbar" role="tablist">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className="p-0 bg-transparent border-0"
              {...getTabAttributes(activeStep === index, `step-panel-${step.id}`)}
            >
              <MicroInteraction
                type="hover"
                className={`
                  flex-shrink-0 px-4 py-2 mx-1 rounded-t-lg cursor-pointer
                  transition-colors duration-200 text-center
                  ${activeStep === index
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}
                  ${highContrast && activeStep === index
                    ? 'bg-black text-white border-2 border-black'
                    : ''}
                  ${highContrast && activeStep !== index
                    ? 'bg-white text-black border-2 border-gray-500'
                    : ''}
                `}
              >
                <span className="font-medium">Step {index + 1}</span>
                <span className="hidden md:inline ml-2">{step.title}</span>
              </MicroInteraction>
            </button>
          ))}
        </div>
      </div>
      
      {/* Active Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`step-${activeStep}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: prefersReducedMotion ? 0 : 0.3 / animationSpeed,
            ease: 'easeInOut'
          }}
          className={`step-content p-6 rounded-lg mb-8 ${contrastClasses}`}
          {...getTabPanelAttributes(
            `step-panel-${steps[activeStep].id}`,
            `step-tab-${steps[activeStep].id}`
          )}
        >
          <h3 className="text-2xl font-bold mb-4">{steps[activeStep].title}</h3>
          <div className="mb-6">{steps[activeStep].description}</div>
          
          <div className="step-main-content">
            {steps[activeStep].content}
          </div>
          
          {/* Interactive Code Example */}
          {steps[activeStep].codeExample && (
            <div className="code-example mt-8">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">Interactive Code Example</h4>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`
                      px-3 py-1 rounded text-sm
                      ${isEditing
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 text-white'}
                      ${highContrast
                        ? 'border-2 border-black'
                        : ''}
                    `}
                    aria-pressed={isEditing}
                  >
                    <MicroInteraction type="hover">
                      <span>{isEditing ? 'Apply Changes' : 'Edit Code'}</span>
                    </MicroInteraction>
                  </button>
                  
                  {isEditing && (
                    <button
                      onClick={resetCode}
                      className={`
                        px-3 py-1 rounded text-sm bg-gray-600 text-white
                        ${highContrast ? 'border-2 border-black' : ''}
                      `}
                      aria-label="Reset code to original example"
                    >
                      <MicroInteraction type="hover">
                        <span>Reset</span>
                      </MicroInteraction>
                    </button>
                  )}
                </div>
              </div>
              
              <div className={`
                code-container p-4 rounded bg-gray-900 text-white overflow-auto
                ${highContrast ? 'border-2 border-white' : ''}
              `}>
                {isEditing ? (
                  <textarea
                    ref={codeEditorRef}
                    value={codeValue}
                    onChange={handleCodeChange}
                    className={`
                      w-full h-48 bg-gray-900 text-white font-mono p-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${highContrast ? 'border-2 border-white' : ''}
                    `}
                    style={{ fontSize: `${fontSizeMultiplier}rem` }}
                    aria-label="Code editor"
                  />
                ) : (
                  <pre className="font-mono whitespace-pre-wrap" style={{ fontSize: `${fontSizeMultiplier}rem` }}>
                    <code>{codeValue}</code>
                  </pre>
                )}
              </div>
            </div>
          )}
          
          {/* Animated Diagram */}
          {steps[activeStep].diagramSrc && (
            <div className="diagram mt-8">
              <h4 className="font-bold mb-2">Workflow Diagram</h4>
              <ScrollAnimation
                type="fade-in"
                className="diagram-container"
              >
                <img 
                  src={steps[activeStep].diagramSrc} 
                  alt={`Diagram for ${steps[activeStep].title}`}
                  className="w-full h-auto rounded"
                />
              </ScrollAnimation>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
      {/* Step Navigation Controls */}
      <div className="step-controls flex justify-between mb-8">
        <button
          onClick={() => goToStep(activeStep - 1)}
          disabled={activeStep === 0}
          className={`
            px-4 py-2 rounded
            ${activeStep === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 text-white'}
            ${highContrast
              ? 'border-2 border-black'
              : ''}
          `}
          aria-label="Previous step"
        >
          <MicroInteraction type="hover" disabled={activeStep === 0}>
            <span>Previous Step</span>
          </MicroInteraction>
        </button>
        
        <button
          onClick={() => goToStep(activeStep + 1)}
          disabled={activeStep === steps.length - 1}
          className={`
            px-4 py-2 rounded
            ${activeStep === steps.length - 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary-600 text-white'}
            ${highContrast
              ? 'border-2 border-black'
              : ''}
          `}
          aria-label="Next step"
        >
          <MicroInteraction type="hover" disabled={activeStep === steps.length - 1}>
            <span>Next Step</span>
          </MicroInteraction>
        </button>
      </div>
      
      {/* Comparison View */}
      {comparisonView && (
        <div className="comparison-view mt-8">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`
              px-4 py-2 rounded mb-4 w-full md:w-auto
              ${showComparison
                ? 'bg-purple-600 text-white'
                : 'bg-blue-600 text-white'}
              ${highContrast
                ? 'border-2 border-black'
                : ''}
            `}
            aria-expanded={showComparison}
            aria-controls="comparison-panel"
          >
            <MicroInteraction type="hover">
              <span>{showComparison ? 'Hide Comparison' : 'Show Before/After Comparison'}</span>
            </MicroInteraction>
          </button>
          
          <AnimatePresence>
            {showComparison && (
              <motion.div
                id="comparison-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.3 / animationSpeed }}
                className={`comparison-container ${contrastClasses} rounded-lg p-6`}
              >
                <h3 className="text-2xl font-bold mb-4">Before/After Comparison</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`
                    before-panel p-4 rounded
                    ${highContrast ? 'bg-gray-100 border-2 border-black' : 'bg-gray-50 border border-gray-200'}
                  `}>
                    <h4 className="text-lg font-bold mb-2">{comparisonView.before.title}</h4>
                    <div>{comparisonView.before.content}</div>
                  </div>
                  
                  <div className={`
                    after-panel p-4 rounded
                    ${highContrast ? 'bg-blue-100 border-2 border-black' : 'bg-blue-50 border border-blue-200'}
                  `}>
                    <h4 className="text-lg font-bold mb-2">{comparisonView.after.title}</h4>
                    <div>{comparisonView.after.content}</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}