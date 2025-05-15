import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicroInteraction } from '../animations/MicroInteraction';
import { ScrollAnimation } from '../animations/ScrollAnimation';
import { useAnimation } from '../animations/AnimationContext';
import { useAccessibility } from '../accessibility/AccessibilityContext';
import { usePersona } from '../user-journey/PersonaContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { announceToScreenReader } from '../../utils/accessibility';

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  features: {
    id: string;
    name: string;
    included: boolean;
    limit?: number;
    pricePerUnit?: number;
  }[];
  recommended?: boolean;
  popularWith?: string[];
}

export interface PricingVariable {
  id: string;
  name: string;
  description: string;
  min: number;
  max: number;
  default: number;
  step: number;
  unit: string;
  affectsPlans: string[];
}

interface PricingCalculatorProps {
  /** Title for the pricing calculator section */
  title: string;
  /** Subtitle or description for the pricing calculator section */
  subtitle?: string;
  /** Array of pricing plans */
  plans: PricingPlan[];
  /** Array of pricing variables that affect the calculation */
  variables: PricingVariable[];
  /** Currency symbol */
  currencySymbol?: string;
  /** Billing period (e.g., "monthly", "annually") */
  billingPeriod?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Interactive Pricing Calculator component
 * Provides real-time calculation and visualization of pricing
 * with interactive sliders and side-by-side plan comparison
 */
export function PricingCalculator({
  title,
  subtitle,
  plans,
  variables,
  currencySymbol = '$',
  billingPeriod = 'monthly',
  className = ''
}: PricingCalculatorProps) {
  const [variableValues, setVariableValues] = useState<Record<string, number>>({});
  const [calculatedPrices, setCalculatedPrices] = useState<Record<string, number>>({});
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparedPlans, setComparedPlans] = useState<string[]>([]);
  
  const sliderRefs = useRef<Record<string, HTMLInputElement | null>>({});
  
  const { animationsEnabled, animationSpeed } = useAnimation();
  const { highContrast, fontSizeMultiplier } = useAccessibility();
  const { persona } = usePersona();
  const prefersReducedMotion = useReducedMotion();
  
  // Initialize variable values
  useEffect(() => {
    const initialValues: Record<string, number> = {};
    variables.forEach(variable => {
      initialValues[variable.id] = variable.default;
    });
    setVariableValues(initialValues);
  }, [variables]);
  
  // Calculate prices based on variable values
  useEffect(() => {
    if (Object.keys(variableValues).length === 0) return;
    
    const prices: Record<string, number> = {};
    
    plans.forEach(plan => {
      let totalPrice = plan.basePrice;
      
      // Add variable-based costs
      variables.forEach(variable => {
        if (variable.affectsPlans.includes(plan.id)) {
          const value = variableValues[variable.id] || 0;
          
          // Find features affected by this variable
          plan.features.forEach(feature => {
            if (feature.pricePerUnit && feature.included) {
              // If the feature has a per-unit price, calculate the additional cost
              const additionalCost = value * feature.pricePerUnit;
              totalPrice += additionalCost;
            }
          });
        }
      });
      
      prices[plan.id] = totalPrice;
    });
    
    setCalculatedPrices(prices);
  }, [variableValues, plans, variables]);
  
  // Initialize selected plan and comparison plans
  useEffect(() => {
    if (plans.length > 0 && !selectedPlanId) {
      // Find recommended plan or use the first one
      const recommendedPlan = plans.find(plan => plan.recommended);
      setSelectedPlanId(recommendedPlan ? recommendedPlan.id : plans[0].id);
      
      // Initialize compared plans with the first two plans
      if (plans.length >= 2) {
        setComparedPlans([plans[0].id, plans[1].id]);
      } else if (plans.length === 1) {
        setComparedPlans([plans[0].id]);
      }
    }
  }, [plans, selectedPlanId]);
  
  // Handle variable value change
  const handleVariableChange = (variableId: string, value: number) => {
    setVariableValues(prev => {
      const newValues = { ...prev, [variableId]: value };
      
      // Announce significant changes to screen readers
      const variable = variables.find(v => v.id === variableId);
      if (variable) {
        announceToScreenReader(`${variable.name} set to ${value} ${variable.unit}`);
      }
      
      return newValues;
    });
  };
  
  // Handle plan selection
  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    
    // Announce to screen readers
    const plan = plans.find(p => p.id === planId);
    if (plan) {
      announceToScreenReader(`Selected plan: ${plan.name}`);
    }
  };
  
  // Toggle comparison mode
  const toggleComparisonMode = () => {
    setComparisonMode(prev => !prev);
    
    // Announce to screen readers
    announceToScreenReader(comparisonMode ? 'Exited comparison mode' : 'Entered comparison mode');
  };
  
  // Toggle plan in comparison
  const togglePlanComparison = (planId: string) => {
    setComparedPlans(prev => {
      if (prev.includes(planId)) {
        // Remove plan if already in comparison
        const newPlans = prev.filter(id => id !== planId);
        
        // Announce to screen readers
        const plan = plans.find(p => p.id === planId);
        if (plan) {
          announceToScreenReader(`Removed ${plan.name} from comparison`);
        }
        
        return newPlans;
      } else {
        // Add plan if not in comparison (limit to 3 plans)
        if (prev.length < 3) {
          const newPlans = [...prev, planId];
          
          // Announce to screen readers
          const plan = plans.find(p => p.id === planId);
          if (plan) {
            announceToScreenReader(`Added ${plan.name} to comparison`);
          }
          
          return newPlans;
        }
        
        // If already at limit, announce and return unchanged
        announceToScreenReader('Cannot compare more than 3 plans at once');
        return prev;
      }
    });
  };
  
  // Format price for display
  const formatPrice = (price: number) => {
    return `${currencySymbol}${price.toFixed(2)}`;
  };
  
  // Determine if a plan is suitable for the current persona
  const isPlanRecommendedForPersona = (plan: PricingPlan) => {
    if (!persona || !plan.popularWith) return false;
    
    switch (persona) {
      case 'business-stakeholder':
        return plan.popularWith.includes('business');
      case 'engineering-leader':
        return plan.popularWith.includes('engineering');
      case 'technical-developer':
        return plan.popularWith.includes('developer');
      default:
        return false;
    }
  };
  
  // Determine contrast classes
  const contrastClasses = highContrast
    ? 'bg-white text-black border-2 border-black'
    : 'bg-white shadow-lg text-gray-800 border border-gray-200';
  
  return (
    <section className={`pricing-calculator ${className}`}>
      <ScrollAnimation
        type="fade-in"
        threshold={0.1}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
      </ScrollAnimation>
      
      {/* Calculator Controls */}
      <div className={`calculator-controls p-6 rounded-lg mb-8 ${contrastClasses}`}>
        <h3 className="text-xl font-bold mb-4">Customize Your Plan</h3>
        
        <div className="variables-container space-y-6">
          {variables.map(variable => (
            <div key={variable.id} className="variable-control">
              <div className="flex justify-between items-center mb-2">
                <label 
                  htmlFor={`variable-${variable.id}`} 
                  className="font-medium"
                  style={{ fontSize: `${fontSizeMultiplier}rem` }}
                >
                  {variable.name}
                </label>
                <div className="value-display">
                  <motion.span
                    key={variableValues[variable.id]}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 / animationSpeed }}
                    className={`
                      inline-block px-3 py-1 rounded-full
                      ${highContrast 
                        ? 'bg-black text-white' 
                        : 'bg-primary-100 text-primary-800'}
                    `}
                  >
                    {variableValues[variable.id] || variable.default} {variable.unit}
                  </motion.span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm">{variable.min}</span>
                <div className="flex-grow">
                  <input
                    id={`variable-${variable.id}`}
                    ref={(el: HTMLInputElement | null) => {
                      sliderRefs.current[variable.id] = el;
                    }}
                    type="range"
                    min={variable.min}
                    max={variable.max}
                    step={variable.step}
                    value={variableValues[variable.id] || variable.default}
                    onChange={(e) => handleVariableChange(variable.id, Number(e.target.value))}
                    className={`
                      w-full h-2 rounded-lg appearance-none cursor-pointer
                      ${highContrast 
                        ? 'bg-gray-300 accent-black' 
                        : 'bg-gray-200 accent-primary-600'}
                    `}
                    aria-valuemin={variable.min}
                    aria-valuemax={variable.max}
                    aria-valuenow={variableValues[variable.id] || variable.default}
                    aria-valuetext={`${variableValues[variable.id] || variable.default} ${variable.unit}`}
                  />
                </div>
                <span className="text-sm">{variable.max}</span>
              </div>
              
              <p className="text-sm mt-1 text-gray-600">{variable.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Comparison Toggle */}
      <div className="comparison-toggle mb-6 flex justify-center">
        <button
          onClick={toggleComparisonMode}
          className={`
            px-4 py-2 rounded-lg
            ${comparisonMode 
              ? highContrast 
                ? 'bg-black text-white border-2 border-black' 
                : 'bg-primary-600 text-white' 
              : highContrast 
                ? 'bg-white text-black border-2 border-black' 
                : 'bg-gray-200 text-gray-800'}
          `}
          aria-pressed={comparisonMode}
        >
          <MicroInteraction type="hover">
            <span>{comparisonMode ? 'Exit Comparison Mode' : 'Compare Plans'}</span>
          </MicroInteraction>
        </button>
      </div>
      
      {/* Plans Display */}
      <AnimatePresence mode="wait">
        {comparisonMode ? (
          <motion.div
            key="comparison-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 / animationSpeed }}
          >
            {/* Plan Comparison View */}
            <div className={`plan-comparison p-6 rounded-lg ${contrastClasses}`}>
              <h3 className="text-xl font-bold mb-4">Plan Comparison</h3>
              
              {/* Plan Selection */}
              <div className="plan-selection mb-6 flex flex-wrap gap-2">
                {plans.map(plan => (
                  <button
                    key={plan.id}
                    onClick={() => togglePlanComparison(plan.id)}
                    className={`
                      px-3 py-1 rounded-full text-sm
                      ${comparedPlans.includes(plan.id) 
                        ? highContrast 
                          ? 'bg-black text-white border-2 border-black' 
                          : 'bg-primary-600 text-white' 
                        : highContrast 
                          ? 'bg-white text-black border-2 border-black' 
                          : 'bg-gray-200 text-gray-800'}
                    `}
                    aria-pressed={comparedPlans.includes(plan.id)}
                  >
                    <MicroInteraction type="hover">
                      <span>{plan.name}</span>
                    </MicroInteraction>
                  </button>
                ))}
              </div>
              
              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className={`w-full border-collapse ${highContrast ? 'border-2 border-black' : 'border border-gray-200'}`}>
                  <thead>
                    <tr className={highContrast ? 'bg-black text-white' : 'bg-gray-100'}>
                      <th className="p-3 text-left">Feature</th>
                      {comparedPlans.map(planId => {
                        const plan = plans.find(p => p.id === planId);
                        return plan ? (
                          <th key={planId} className="p-3 text-center">
                            <div className="font-bold">{plan.name}</div>
                            <div className="mt-1">
                              <motion.div
                                key={calculatedPrices[planId]}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: prefersReducedMotion ? 0 : 0.3 / animationSpeed }}
                                className={`
                                  inline-block px-2 py-1 rounded
                                  ${highContrast 
                                    ? 'bg-white text-black border border-white' 
                                    : 'bg-primary-100 text-primary-800'}
                                `}
                              >
                                {formatPrice(calculatedPrices[planId] || plan.basePrice)}/{billingPeriod}
                              </motion.div>
                            </div>
                          </th>
                        ) : null;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Combine all features from all compared plans */}
                    {Array.from(new Set(
                      comparedPlans.flatMap(planId => {
                        const plan = plans.find(p => p.id === planId);
                        return plan ? plan.features.map(f => f.id) : [];
                      })
                    )).map(featureId => {
                      // Find feature details from the first plan that has it
                      const featureDetails = plans
                        .find(p => p.features.some(f => f.id === featureId))
                        ?.features.find(f => f.id === featureId);
                      
                      if (!featureDetails) return null;
                      
                      return (
                        <tr 
                          key={featureId}
                          className={`
                            border-t
                            ${highContrast ? 'border-black' : 'border-gray-200'}
                          `}
                        >
                          <td className="p-3">{featureDetails.name}</td>
                          {comparedPlans.map(planId => {
                            const plan = plans.find(p => p.id === planId);
                            const feature = plan?.features.find(f => f.id === featureId);
                            
                            return (
                              <td key={`${planId}-${featureId}`} className="p-3 text-center">
                                {feature ? (
                                  feature.included ? (
                                    feature.limit ? (
                                      <span>
                                        Up to {feature.limit} {feature.limit === 1 ? 'unit' : 'units'}
                                      </span>
                                    ) : (
                                      <svg 
                                        className={`w-6 h-6 mx-auto ${highContrast ? 'text-black' : 'text-green-500'}`} 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24" 
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path 
                                          strokeLinecap="round" 
                                          strokeLinejoin="round" 
                                          strokeWidth={2} 
                                          d="M5 13l4 4L19 7" 
                                        />
                                      </svg>
                                    )
                                  ) : (
                                    <svg 
                                      className={`w-6 h-6 mx-auto ${highContrast ? 'text-black' : 'text-red-500'}`} 
                                      fill="none" 
                                      stroke="currentColor" 
                                      viewBox="0 0 24 24" 
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M6 18L18 6M6 6l12 12" 
                                      />
                                    </svg>
                                  )
                                ) : (
                                  <span className="text-gray-400">—</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="plans-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 / animationSpeed }}
          >
            {/* Individual Plans View */}
            <div className="plans-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map(plan => (
                <MicroInteraction
                  key={plan.id}
                  type="hover-lift"
                  className={`
                    plan-card rounded-lg overflow-hidden
                    ${selectedPlanId === plan.id 
                      ? highContrast 
                        ? 'border-4 border-black' 
                        : 'ring-2 ring-primary-500 border border-primary-300' 
                      : contrastClasses}
                    ${plan.recommended && !highContrast ? 'border-t-4 border-t-primary-500' : ''}
                  `}
                >
                  <div 
                    className={`
                      plan-header p-6
                      ${plan.recommended && !highContrast ? 'bg-primary-50' : ''}
                    `}
                  >
                    {plan.recommended && (
                      <div className="recommended-badge mb-2">
                        <span className={`
                          inline-block px-2 py-1 text-xs rounded-full
                          ${highContrast 
                            ? 'bg-black text-white' 
                            : 'bg-primary-100 text-primary-800'}
                        `}>
                          Recommended
                        </span>
                      </div>
                    )}
                    
                    {isPlanRecommendedForPersona(plan) && (
                      <div className="persona-badge mb-2">
                        <span className={`
                          inline-block px-2 py-1 text-xs rounded-full
                          ${highContrast 
                            ? 'bg-gray-800 text-white' 
                            : 'bg-blue-100 text-blue-800'}
                        `}>
                          Recommended for {persona === 'business-stakeholder'
                            ? 'Business Leaders'
                            : persona === 'engineering-leader'
                              ? 'Engineering Leaders'
                              : 'Developers'}
                        </span>
                      </div>
                    )}
                    
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-gray-600 mt-1">{plan.description}</p>
                    
                    <div className="price-display mt-4">
                      <motion.div
                        key={calculatedPrices[plan.id]}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.3 / animationSpeed }}
                      >
                        <span className="text-3xl font-bold">
                          {formatPrice(calculatedPrices[plan.id] || plan.basePrice)}
                        </span>
                        <span className="text-gray-600">/{billingPeriod}</span>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="plan-features p-6 border-t border-gray-200">
                    <ul className="space-y-3">
                      {plan.features.map(feature => (
                        <li key={feature.id} className="flex items-start">
                          {feature.included ? (
                            <svg 
                              className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${highContrast ? 'text-black' : 'text-green-500'}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                              />
                            </svg>
                          ) : (
                            <svg 
                              className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${highContrast ? 'text-black' : 'text-red-500'}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                              />
                            </svg>
                          )}
                          <span>
                            {feature.name}
                            {feature.included && feature.limit && (
                              <span className="text-gray-600">
                                {' '}(Up to {feature.limit})
                              </span>
                            )}
                            {feature.included && feature.pricePerUnit && (
                              <span className="text-gray-600">
                                {' '}({formatPrice(feature.pricePerUnit)} per {variables.find(v => 
                                  v.affectsPlans.includes(plan.id))?.unit || 'unit'})
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="plan-actions p-6 border-t border-gray-200">
                    <button
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`
                        w-full py-2 rounded-lg
                        ${selectedPlanId === plan.id 
                          ? highContrast 
                            ? 'bg-black text-white' 
                            : 'bg-primary-600 text-white' 
                          : highContrast 
                            ? 'bg-white text-black border-2 border-black' 
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
                      `}
                      aria-pressed={selectedPlanId === plan.id}
                    >
                      {selectedPlanId === plan.id ? 'Selected' : 'Select Plan'}
                    </button>
                  </div>
                </MicroInteraction>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}