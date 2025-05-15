# IdeaCode Website Phase 2: Technical Implementation Guide

This document provides detailed technical guidance for implementing the Phase 2 enhanced user experience components of the IdeaCode website.

## 1. Project Structure and Organization

### 1.1 Directory Structure

```
src/
├── components/
│   ├── animations/            # Animation utilities and components
│   │   ├── ScrollAnimation.tsx
│   │   ├── MicroInteraction.tsx
│   │   ├── PageTransition.tsx
│   │   ├── LoadingAnimation.tsx
│   │   └── hooks/             # Animation hooks
│   │
│   ├── interactive/           # Interactive components
│   │   ├── FeatureHighlight/
│   │   ├── ProductDemo/
│   │   ├── FAQSection/
│   │   └── PricingCalculator/
│   │
│   ├── user-journey/          # User journey components
│   │   ├── PersonaDetector.tsx
│   │   ├── JourneyTracker.tsx
│   │   ├── ProgressiveDisclosure.tsx
│   │   └── ContextualCTA.tsx
│   │
│   └── responsive/            # Responsive components
│       ├── MobileNavigation.tsx
│       ├── AdaptiveLayout.tsx
│       └── TouchOptimized.tsx
│
├── hooks/                     # Custom hooks
│   ├── useScrollAnimation.ts
│   ├── usePersona.ts
│   ├── useJourney.ts
│   └── useMediaQuery.ts
│
├── store/                     # State management
│   ├── personaStore.ts
│   ├── journeyStore.ts
│   ├── animationStore.ts
│   └── uiStore.ts
│
├── utils/                     # Utility functions
│   ├── animations.ts
│   ├── persona.ts
│   ├── journey.ts
│   └── accessibility.ts
│
└── styles/                    # Global styles and animations
    ├── animations.css
    └── transitions.css
```

### 1.2 Component Organization Pattern

Each interactive component should follow this organization pattern:

```
ComponentName/
├── index.tsx                  # Main component export
├── ComponentName.tsx          # Component implementation
├── ComponentName.module.css   # Component-specific styles
├── hooks/                     # Component-specific hooks
│   └── useComponentLogic.ts
├── types.ts                   # TypeScript interfaces and types
└── utils/                     # Component-specific utilities
    └── helpers.ts
```

## 2. Animation System Implementation

### 2.1 Scroll Animation Hook

```typescript
// hooks/useScrollAnimation.ts

import { useState, useEffect, useRef, RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface ScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
  delay?: number;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
): [RefObject<T>, boolean] {
  const {
    threshold = 0.1,
    once = true,
    rootMargin = '0px',
    delay = 0
  } = options;
  
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Use setTimeout to add delay if specified
        if (entry.isIntersecting) {
          if (delay) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          
          if (once && element) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, once, rootMargin, delay, prefersReducedMotion]);
  
  return [ref, isVisible];
}
```

### 2.2 Framer Motion Animation Component

```typescript
// components/animations/ScrollAnimation.tsx

import { ReactNode } from 'react';
import { motion, Variant } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

type AnimationType = 'fade' | 'slide-up' | 'slide-right' | 'slide-left' | 'scale';

interface AnimationVariants {
  hidden: Variant;
  visible: Variant;
}

const animations: Record<AnimationType, AnimationVariants> = {
  'fade': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'slide-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  'slide-right': {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  'slide-left': {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  'scale': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
};

interface ScrollAnimationProps {
  children: ReactNode;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function ScrollAnimation({
  children,
  type = 'fade',
  duration = 0.5,
  delay = 0,
  threshold = 0.1,
  once = true,
  className
}: ScrollAnimationProps) {
  const [ref, isVisible] = useScrollAnimation({
    threshold,
    once,
    delay: 0 // We'll handle delay in Framer Motion
  });
  
  const variants = animations[type];
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration, delay: delay / 1000 }}
      className={className}
    >
## 3. Interactive Components Implementation

### 3.1 Animated Feature Highlight

```typescript
// components/interactive/FeatureHighlight/FeatureHighlight.tsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import styles from './FeatureHighlight.module.css';

interface FeatureHighlightProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  animationType?: 'fade' | 'slide' | 'scale';
  animationDuration?: number;
  animationDelay?: number;
  detailContent: {
    preview: string;
    full: string;
  };
  linkUrl: string;
}

export function FeatureHighlight({
  id,
  title,
  description,
  icon,
  animationType = 'fade',
  animationDuration = 0.5,
  animationDelay = 0,
  detailContent,
  linkUrl
}: FeatureHighlightProps) {
  const [ref, isVisible] = useScrollAnimation({
    threshold: 0.3,
    once: true,
    delay: animationDelay
  });
  
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Animation variants based on type
  const getAnimationVariants = () => {
    switch (animationType) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'slide':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };
  
  return (
    <motion.div
      ref={ref}
      className={styles.featureHighlight}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={getAnimationVariants()}
      transition={{ duration: animationDuration }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className={styles.featureIcon}>
        {/* Render icon based on the icon prop */}
        <img src={icon} alt="" aria-hidden="true" />
      </div>
      
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDescription}>{description}</p>
      
      {isHovered && !isExpanded && (
        <motion.div
          className={styles.featureHoverContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p>{detailContent.preview}</p>
        </motion.div>
      )}
      
      {isExpanded && (
        <motion.div
          className={styles.featureExpandedContent}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <div className={styles.featureDetail}>{detailContent.full}</div>
          <Link href={linkUrl} className={styles.featureLink}>
            Learn more
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
```

### 3.2 Expandable FAQ Section

```typescript
// components/interactive/FAQSection/FAQSection.tsx

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { usePersona } from '@/hooks/usePersona';
import styles from './FAQSection.module.css';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  tags: string[];
  userSegments: string[];
  relatedQuestions?: string[];
}

interface FAQCategory {
  id: string;
  name: string;
  description: string;
}

interface FAQSectionProps {
  id: string;
  title: string;
  description: string;
  categories: FAQCategory[];
  questions: FAQItem[];
}

export function FAQSection({
  id,
  title,
  description,
  categories,
  questions
}: FAQSectionProps) {
  const router = useRouter();
  const { persona } = usePersona();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  
  // Filter questions based on search, category, and user segment
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      // Filter by search query
      const matchesSearch = searchQuery === '' || 
        question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter by category
      const matchesCategory = activeCategory === 'all' || question.categoryId === activeCategory;
      
      // Filter by user segment
      const matchesSegment = !persona || 
        question.userSegments.includes('all') || 
        question.userSegments.includes(persona);
      
      return matchesSearch && matchesCategory && matchesSegment;
    });
  }, [questions, searchQuery, activeCategory, persona]);
  
  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Handle category selection
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  // Toggle question expansion
  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions(prev => {
      if (prev.includes(questionId)) {
        return prev.filter(id => id !== questionId);
      } else {
        return [...prev, questionId];
      }
    });
  };
  
  // Expand all questions
  const expandAll = () => {
    setExpandedQuestions(filteredQuestions.map(q => q.id));
  };
  
  // Collapse all questions
  const collapseAll = () => {
    setExpandedQuestions([]);
  };
  
  // Check if a question is expanded
  const isExpanded = (questionId: string) => {
    return expandedQuestions.includes(questionId);
  };
  
  // Generate URL hash for direct linking
  const getQuestionHash = (questionId: string) => {
    return `faq-${id}-question-${questionId}`;
  };
  
  // Check URL hash on mount and expand relevant question
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const questionMatch = hash.match(/faq-(\w+)-question-(\w+)/);
    
    if (questionMatch && questionMatch[1] === id) {
      const questionId = questionMatch[2];
      setExpandedQuestions([questionId]);
      
      // Scroll to the question
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [id]);
  
  return (
    <div className={styles.faqSection} id={`faq-${id}`}>
      <div className={styles.faqHeader}>
        <h2>{title}</h2>
        <p>{description}</p>
        
        <div className={styles.faqSearch}>
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search frequently asked questions"
          />
        </div>
        
        <div className={styles.faqCategories} role="tablist">
          <button
            className={activeCategory === 'all' ? styles.active : ''}
            onClick={() => handleCategoryChange('all')}
            role="tab"
            aria-selected={activeCategory === 'all'}
          >
            All Categories
          </button>
          {categories.map(category => (
            <button
              key={category.id}
              className={activeCategory === category.id ? styles.active : ''}
              onClick={() => handleCategoryChange(category.id)}
              role="tab"
              aria-selected={activeCategory === category.id}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className={styles.faqControls}>
          <button onClick={expandAll}>Expand All</button>
          <button onClick={collapseAll}>Collapse All</button>
        </div>
      </div>
      
      <div className={styles.faqQuestions}>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map(question => (
            <div
              key={question.id}
              className={`${styles.faqItem} ${isExpanded(question.id) ? styles.expanded : ''}`}
              id={getQuestionHash(question.id)}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleQuestion(question.id)}
                aria-expanded={isExpanded(question.id)}
                aria-controls={`faq-answer-${question.id}`}
              >
                <h3>{question.question}</h3>
                <span className={styles.faqToggleIcon} aria-hidden="true">
                  {isExpanded(question.id) ? '−' : '+'}
                </span>
              </button>
              
              <AnimatePresence>
                {isExpanded(question.id) && (
                  <motion.div
                    id={`faq-answer-${question.id}`}
                    className={styles.faqAnswer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: question.answer }} />
                    
                    {question.relatedQuestions && question.relatedQuestions.length > 0 && (
                      <div className={styles.faqRelated}>
                        <h4>Related Questions</h4>
                        <ul>
                          {question.relatedQuestions.map(relatedId => {
                            const related = questions.find(q => q.id === relatedId);
                            return related ? (
                              <li key={relatedId}>
                                <button
                                  onClick={() => {
                                    toggleQuestion(relatedId);
                                    document.getElementById(getQuestionHash(relatedId))?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                >
                                  {related.question}
                                </button>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        ) : (
          <div className={styles.faqNoResults}>
            <p>No FAQs found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

### 3.3 Interactive Pricing Calculator

```typescript
// components/interactive/PricingCalculator/PricingCalculator.tsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './PricingCalculator.module.css';

interface PricingTier {
  id: string;
  name: string;
  basePrice: number;
  features: string[];
  limits: Record<string, number>;
}

interface PricingFactor {
  id: string;
  name: string;
  description: string;
  inputType: 'slider' | 'number' | 'select';
  options?: Array<{ value: string; label: string }>;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  multiplier: number;
}

interface PricingResult {
  tierId: string;
  monthlyPrice: number;
  annualPrice: number;
  breakdown: Record<string, number>;
}

interface PricingCalculatorProps {
  id: string;
  pricingTiers: PricingTier[];
  pricingFactors: PricingFactor[];
  defaultInputs?: Record<string, any>;
}

export function PricingCalculator({
  id,
  pricingTiers,
  pricingFactors,
  defaultInputs = {}
}: PricingCalculatorProps) {
  const [userInputs, setUserInputs] = useState<Record<string, any>>(defaultInputs);
  const [calculatedResults, setCalculatedResults] = useState<PricingResult[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonTiers, setComparisonTiers] = useState<string[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  // Initialize default inputs if not provided
  useEffect(() => {
    const initialInputs = { ...defaultInputs };
    
    // Set default values for any missing inputs
    pricingFactors.forEach(factor => {
      if (initialInputs[factor.id] === undefined) {
        if (factor.inputType === 'slider' || factor.inputType === 'number') {
          initialInputs[factor.id] = factor.min || 0;
        } else if (factor.inputType === 'select' && factor.options && factor.options.length > 0) {
          initialInputs[factor.id] = factor.options[0].value;
        }
      }
    });
    
    setUserInputs(initialInputs);
  }, [pricingFactors, defaultInputs]);
  
  // Calculate pricing whenever inputs change
  useEffect(() => {
    calculatePricing();
  }, [userInputs, billingCycle]);
  
  // Handle input changes
  const handleInputChange = (factorId: string, value: any) => {
    setUserInputs(prev => ({
      ...prev,
      [factorId]: value
    }));
  };
  
  // Toggle billing cycle
  const toggleBillingCycle = () => {
    setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly');
  };
  
  // Toggle comparison mode
  const toggleComparisonMode = () => {
    setComparisonMode(prev => !prev);
    if (!comparisonMode && calculatedResults.length > 0) {
      // Default to comparing the recommended tier and the next tier up
      const recommendedTier = getRecommendedTier();
      const tierIndex = pricingTiers.findIndex(tier => tier.id === recommendedTier);
      const nextTierIndex = Math.min(tierIndex + 1, pricingTiers.length - 1);
      
      if (tierIndex !== nextTierIndex) {
        setComparisonTiers([recommendedTier, pricingTiers[nextTierIndex].id]);
      } else {
        const prevTierIndex = Math.max(tierIndex - 1, 0);
        setComparisonTiers([recommendedTier, pricingTiers[prevTierIndex].id]);
      }
    }
  };
  
  // Toggle tier selection for comparison
  const toggleTierComparison = (tierId: string) => {
    setComparisonTiers(prev => {
      if (prev.includes(tierId)) {
        return prev.filter(id => id !== tierId);
      } else if (prev.length < 3) { // Limit to comparing 3 tiers at once
        return [...prev, tierId];
      }
      return prev;
    });
  };
  
  // Calculate pricing based on inputs
  const calculatePricing = () => {
    const results: PricingResult[] = pricingTiers.map(tier => {
      let monthlyPrice = tier.basePrice;
      const breakdown: Record<string, number> = {
        base: tier.basePrice
      };
      
      // Calculate additional costs based on factors
      pricingFactors.forEach(factor => {
        const value = userInputs[factor.id];
        if (value !== undefined) {
          let additionalCost = 0;
          
          if (factor.inputType === 'slider' || factor.inputType === 'number') {
            // Check if value exceeds tier limits
            const limit = tier.limits[factor.id] || Infinity;
            const usageValue = Math.min(value, limit);
            additionalCost = usageValue * factor.multiplier;
          } else if (factor.inputType === 'select') {
            const option = factor.options?.find(opt => opt.value === value);
            if (option) {
              additionalCost = Number(value) * factor.multiplier;
            }
          }
          
          breakdown[factor.id] = additionalCost;
          monthlyPrice += additionalCost;
        }
      });
      
      // Calculate annual price (usually with a discount)
      const annualDiscount = 0.1; // 10% discount for annual billing
      const annualPrice = monthlyPrice * 12 * (1 - annualDiscount);
      
      return {
        tierId: tier.id,
        monthlyPrice,
        annualPrice,
        breakdown
      };
    });
    
    setCalculatedResults(results);
  };
  
  // Get recommended tier based on calculated results
  const getRecommendedTier = (): string => {
    if (calculatedResults.length === 0) return '';
    
    // Simple recommendation logic - find the tier that offers the best value
    // This could be more sophisticated in a real implementation
    const userNeeds = Object.keys(userInputs).reduce((acc, key) => {
      const factor = pricingFactors.find(f => f.id === key);
      if (factor && (factor.inputType === 'slider' || factor.inputType === 'number')) {
        acc[key] = userInputs[key];
      }
      return acc;
    }, {} as Record<string, number>);
    
    // Find the tier that can accommodate the user's needs at the lowest price
    const viableTiers = pricingTiers.filter(tier => {
      return Object.entries(userNeeds).every(([factorId, value]) => {
        const limit = tier.limits[factorId] || 0;
        return value <= limit;
      });
    });
    
    if (viableTiers.length === 0) {
      // If no tier can accommodate all needs, recommend the highest tier
      return pricingTiers[pricingTiers.length - 1].id;
    }
    
    // Find the cheapest viable tier
    const cheapestTier = viableTiers.reduce((cheapest, tier) => {
      const tierResult = calculatedResults.find(result => result.tierId === tier.id);
      const cheapestResult = calculatedResults.find(result => result.tierId === cheapest.id);
      
      if (!tierResult || !cheapestResult) return cheapest;
      
      const tierPrice = billingCycle === 'monthly' ? tierResult.monthlyPrice : tierResult.annualPrice;
      const cheapestPrice = billingCycle === 'monthly' ? cheapestResult.monthlyPrice : cheapestResult.annualPrice;
      
      return tierPrice < cheapestPrice ? tier : cheapest;
    }, viableTiers[0]);
    
    return cheapestTier.id;
  };
  
  // Generate shareable summary
  const generateSummary = () => {
    // Implementation would depend on how you want to share (URL, email, etc.)
    const recommendedTier = getRecommendedTier();
    const tierResult = calculatedResults.find(result => result.tierId === recommendedTier);
    
    if (!tierResult) return;
    
    const summaryData = {
      inputs: userInputs,
      recommendedTier,
      price: billingCycle === 'monthly' ? tierResult.monthlyPrice : tierResult.annualPrice,
      billingCycle,
      breakdown: tierResult.breakdown
    };
    
    // Example: Generate a shareable URL with query parameters
    const queryParams = new URLSearchParams();
    queryParams.set('calculator', id);
    queryParams.set('tier', recommendedTier);
    queryParams.set('cycle', billingCycle);
    Object.entries(userInputs).forEach(([key, value]) => {
      queryParams.set(`input_${key}`, String(value));
    });
    
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${queryParams.toString()}`;
    
    // In a real implementation, you might copy to clipboard, open a share dialog, etc.
    console.log('Shareable URL:', shareableUrl);
    console.log('Summary Data:', summaryData);
    
    // For this example, we'll just return the URL
    return shareableUrl;
  };
  
  return (
    <div className={styles.pricingCalculator} id={id}>
      <div className={styles.calculatorInputs}>
        <h2>Customize Your Plan</h2>
        
        {pricingFactors.map(factor => (
          <div key={factor.id} className={styles.inputGroup}>
            <label htmlFor={`factor-${factor.id}`}>
              {factor.name}
              <span className={styles.description}>{factor.description}</span>
            </label>
            
            {factor.inputType === 'slider' && (
              <div className={styles.sliderInput}>
                <input
                  id={`factor-${factor.id}`}
                  type="range"
                  min={factor.min}
                  max={factor.max}
                  step={factor.step}
                  value={userInputs[factor.id] || factor.min}
                  onChange={(e) => handleInputChange(factor.id, Number(e.target.value))}
                />
                <div className={styles.sliderValue}>
                  {userInputs[factor.id] || factor.min} {factor.unit}
                </div>
              </div>
            )}
            
            {factor.inputType === 'number' && (
              <div className={styles.numberInput}>
                <input
                  id={`factor-${factor.id}`}
                  type="number"
                  min={factor.min}
                  max={factor.max}
                  step={factor.step}
                  value={userInputs[factor.id] || factor.min}
                  onChange={(e) => handleInputChange(factor.id, Number(e.target.value))}
                />
                {factor.unit && <span className={styles.unit}>{factor.unit}</span>}
              </div>
            )}
            
            {factor.inputType === 'select' && factor.options && (
              <div className={styles.selectInput}>
                <select
                  id={`factor-${factor.id}`}
                  value={userInputs[factor.id] || ''}
                  onChange={(e) => handleInputChange(factor.id, e.target.value)}
                >
                  {factor.options.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className={styles.calculatorControls}>
        <div className={styles.billingToggle}>
          <span className={billingCycle === 'monthly' ? styles.active : ''}>Monthly</span>
          <button
            className={styles.toggle}
            onClick={toggleBillingCycle}
            aria-pressed={billingCycle === 'annual'}
            aria-label={`Switch to ${billingCycle === 'monthly' ? 'annual' : 'monthly'} billing`}
          >
            <span className={styles.toggleHandle} />
          </button>
          <span className={billingCycle === 'annual' ? styles.active : ''}>Annual (Save 10%)</span>
        </div>
        
        <div className={styles.comparisonToggle}>
          <button
            className={comparisonMode ? styles.active : ''}
            onClick={toggleComparisonMode}
            aria-pressed={comparisonMode}
          >
            {comparisonMode ? 'Hide Comparison' : 'Compare Plans'}
          </button>
        </div>
        
        <div className={styles.shareButton}>
          <button onClick={generateSummary}>
            Share Pricing
          </button>
        </div>
      </div>
      
      <div className={styles.calculatorResults}>
        {comparisonMode ? (
          <div className={styles.comparisonView}>
            <div className={styles.comparisonHeader}>
              <div className={styles.emptyCell} />
              {pricingTiers.map(tier => (
                <div
                  key={tier.id}
                  className={`${styles.tierHeader} ${comparisonTiers.includes(tier.id) ? styles.selected : ''}`}
                  onClick={() => toggleTierComparison(tier.id)}
                >
                  <h3>{tier.name}</h3>
                  {tier.id === getRecommendedTier() && (
                    <span className={styles.recommended}>Recommended</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className={styles.comparisonBody}>
              <div className={styles.comparisonRow}>
                <div className={styles.rowLabel}>Price</div>
                {pricingTiers.map(tier => {
                  const result = calculatedResults.find(r => r.tierId === tier.id);
                  if (!result) return <div key={tier.id} className={styles.tierCell} />;
                  
                  const price = billingCycle === 'monthly' ? result.monthlyPrice : result.annualPrice;
                  const period = billingCycle === 'monthly' ? '/month' : '/year';
                  
                  return (
                    <div
                      key={tier.id}
                      className={`${styles.tierCell} ${comparisonTiers.includes(tier.id) ? styles.selected : ''}`}
                    >
                      <div className={styles.price}>
                        ${price.toFixed(2)}<span className={styles.period}>{period}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Features comparison rows */}
              {pricingTiers[0].features.map((_, index) => (
                <div key={index} className={styles.comparisonRow}>
                  <div className={styles.rowLabel}>
                    {pricingTiers.some(tier => tier.features[index]) ? pricingTiers.find(tier => tier.features[index])?.features[index] : ''}
                  </div>
                  {pricingTiers.map(tier => (
                    <div
                      key={tier.id}
                      className={`${styles.tierCell} ${comparisonTiers.includes(tier.id) ? styles.selected : ''}`}
                    >
                      {tier.features[index] ? '✓' : ''}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Limits comparison rows */}
              {Object.keys(pricingTiers[0].limits).map(limitKey => (
                <div key={limitKey} className={styles.comparisonRow}>
                  <div className={styles.rowLabel}>
                    {pricingFactors.find(f => f.id === limitKey)?.name || limitKey}
                  </div>
                  {pricingTiers.map(tier => (
                    <div
                      key={tier.id}
                      className={`${styles.tierCell} ${comparisonTiers.includes(tier.id) ? styles.selected : ''}`}
                    >
                      {tier.limits[limitKey] === Infinity ? 'Unlimited' : tier.limits[limitKey]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.tiersView}>
            {calculatedResults.map(result => {
              const tier = pricingTiers.find(t => t.id === result.tierId);
              if (!tier) return null;
              
              const price = billingCycle === 'monthly' ? result.monthlyPrice : result.annualPrice;
              const period = billingCycle === 'monthly' ? '/month' : '/year';
              const isRecommended = result.tierId === getRecommendedTier();
              
              return (
                <motion.div
                  key={result.tierId}
                  className={`${styles.tierCard} ${isRecommended ? styles.recommended : ''}`}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
                >
                  {isRecommended && (
                    <div className={styles.recommendedBadge}>Recommended</div>
                  )}
                  
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  
                  <div className={styles.tierPrice}>
                    <span className={styles.currency}>$</span>
                    <span className={styles.amount}>{price.toFixed(2)}</span>
                    <span className={styles.period}>{period}</span>
                  </div>
                  
                  <ul className={styles.tierFeatures}>
                    {tier.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  
                  <div className={styles.tierLimits}>
                    {Object.entries(tier.limits).map(([key, value]) => {
                      const factor = pricingFactors.find(f => f.id === key);
                      if (!factor) return null;
                      
                      return (
                        <div key={key} className={styles.limitItem}>
                          <span className={styles.limitName}>{factor.name}:</span>
                          <span className={styles.limitValue}>
                            {value === Infinity ? 'Unlimited' : `${value} ${factor.unit || ''}`}
                          </span>
                        </div>
                      );
      {children}
    </motion.div>
  );
}
```

### 2.3 Page Transition Implementation

```typescript
// components/animations/PageTransition.tsx

import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const { asPath } = useRouter();
  const prefersReducedMotion = useReducedMotion();
  
  const variants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -100 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: prefersReducedMotion ? 0 : 100 }
  };
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={asPath}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}