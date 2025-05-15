import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicroInteraction } from '../animations/MicroInteraction';
import { ScrollAnimation } from '../animations/ScrollAnimation';
import { useAnimation } from '../animations/AnimationContext';
import { useAccessibility } from '../accessibility/AccessibilityContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { announceToScreenReader } from '../../utils/accessibility';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface ExpandableFAQProps {
  /** Title for the FAQ section */
  title: string;
  /** Subtitle or description for the FAQ section */
  subtitle?: string;
  /** Array of FAQ items */
  faqs: FAQItem[];
  /** Array of available categories */
  categories: string[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Expandable FAQ component with search/filter functionality
 * Includes smooth animations, keyboard navigation, and category-based organization
 */
export function ExpandableFAQ({
  title,
  subtitle,
  faqs,
  categories,
  className = ''
}: ExpandableFAQProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const faqRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const { animationsEnabled, animationSpeed } = useAnimation();
  const { highContrast, fontSizeMultiplier } = useAccessibility();
  const prefersReducedMotion = useReducedMotion();
  
  // Filter FAQs based on search query and active category
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    let filtered = faqs;
    
    // Apply category filter if active
    if (activeCategory) {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    
    // Apply search filter if query exists
    if (query) {
      filtered = filtered.filter(
        faq => 
          faq.question.toLowerCase().includes(query) || 
          faq.answer.toLowerCase().includes(query)
      );
    }
    
    setFilteredFaqs(filtered);
    
    // If there are filtered results and none are expanded, expand the first one
    if (filtered.length > 0 && expandedId && !filtered.some(faq => faq.id === expandedId)) {
      setExpandedId(null);
    }
  }, [searchQuery, activeCategory, faqs, expandedId]);
  
  // Handle toggling FAQ item expansion
  const toggleExpand = (id: string) => {
    setExpandedId(prevId => {
      const newId = prevId === id ? null : id;
      
      // Announce to screen readers
      if (newId) {
        const faq = faqs.find(f => f.id === newId);
        if (faq) {
          announceToScreenReader(`Expanded: ${faq.question}`);
        }
      }
      
      return newId;
    });
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, id: string) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        toggleExpand(id);
        break;
      case 'ArrowDown':
        e.preventDefault();
        focusNextFAQ(id);
        break;
      case 'ArrowUp':
        e.preventDefault();
        focusPreviousFAQ(id);
        break;
      case 'Home':
        e.preventDefault();
        focusFirstFAQ();
        break;
      case 'End':
        e.preventDefault();
        focusLastFAQ();
        break;
      default:
        break;
    }
  };
  
  // Focus management functions
  const focusNextFAQ = (currentId: string) => {
    const currentIndex = filteredFaqs.findIndex(faq => faq.id === currentId);
    if (currentIndex < filteredFaqs.length - 1) {
      const nextId = filteredFaqs[currentIndex + 1].id;
      faqRefs.current[nextId]?.focus();
    }
  };
  
  const focusPreviousFAQ = (currentId: string) => {
    const currentIndex = filteredFaqs.findIndex(faq => faq.id === currentId);
    if (currentIndex > 0) {
      const prevId = filteredFaqs[currentIndex - 1].id;
      faqRefs.current[prevId]?.focus();
    }
  };
  
  const focusFirstFAQ = () => {
    if (filteredFaqs.length > 0) {
      const firstId = filteredFaqs[0].id;
      faqRefs.current[firstId]?.focus();
    }
  };
  
  const focusLastFAQ = () => {
    if (filteredFaqs.length > 0) {
      const lastId = filteredFaqs[filteredFaqs.length - 1].id;
      faqRefs.current[lastId]?.focus();
    }
  };
  
  // Clear search and filters
  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    announceToScreenReader('Filters cleared');
  };
  
  // Determine contrast classes
  const contrastClasses = highContrast
    ? 'bg-white text-black border-2 border-black'
    : 'bg-white shadow-lg text-gray-800 border border-gray-200';
  
  return (
    <section className={`expandable-faq ${className}`}>
      <ScrollAnimation
        type="fade-in"
        threshold={0.1}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        {subtitle && <p className="text-xl text-gray-600">{subtitle}</p>}
      </ScrollAnimation>
      
      {/* Search and Filter Controls */}
      <div className={`search-filter-controls p-4 mb-6 rounded-lg ${contrastClasses}`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-grow">
            <label htmlFor="faq-search" className="block mb-2 font-medium">
              Search FAQs
            </label>
            <div className="relative">
              <input
                id="faq-search"
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search..."
                className={`
                  w-full p-2 pl-10 rounded
                  ${highContrast 
                    ? 'border-2 border-black' 
                    : 'border border-gray-300'}
                  focus:outline-none focus:ring-2 focus:ring-primary-500
                `}
                aria-label="Search frequently asked questions"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="md:w-1/3">
            <label htmlFor="category-filter" className="block mb-2 font-medium">
              Filter by Category
            </label>
            <select
              id="category-filter"
              value={activeCategory || ''}
              onChange={(e) => setActiveCategory(e.target.value || null)}
              className={`
                w-full p-2 rounded
                ${highContrast 
                  ? 'border-2 border-black' 
                  : 'border border-gray-300'}
                focus:outline-none focus:ring-2 focus:ring-primary-500
              `}
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Clear Filters Button */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className={`
                px-4 py-2 rounded
                ${highContrast 
                  ? 'bg-black text-white border-2 border-black' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
              `}
              aria-label="Clear all filters"
            >
              <MicroInteraction type="hover">
                <span>Clear Filters</span>
              </MicroInteraction>
            </button>
          </div>
        </div>
      </div>
      
      {/* Results Summary */}
      <div className="results-summary mb-4">
        <p className={`text-sm ${highContrast ? 'text-black' : 'text-gray-600'}`}>
          Showing {filteredFaqs.length} of {faqs.length} FAQs
          {activeCategory && ` in category "${activeCategory}"`}
          {searchQuery && ` matching "${searchQuery}"`}
        </p>
      </div>
      
      {/* FAQ Items */}
      {filteredFaqs.length > 0 ? (
        <div className="faq-items space-y-4">
          {filteredFaqs.map((faq) => (
            <div 
              key={faq.id}
              className={`faq-item rounded-lg overflow-hidden ${contrastClasses}`}
            >
              <div
                ref={(el: HTMLDivElement | null) => {
                  faqRefs.current[faq.id] = el;
                }}
                role="button"
                tabIndex={0}
                aria-expanded={expandedId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
                onClick={() => toggleExpand(faq.id)}
                onKeyDown={(e) => handleKeyDown(e, faq.id)}
                className={`
                  faq-question p-4 cursor-pointer flex justify-between items-center
                  ${expandedId === faq.id 
                    ? highContrast 
                      ? 'bg-black text-white' 
                      : 'bg-primary-50' 
                    : ''}
                  ${highContrast ? 'focus:ring-2 focus:ring-black' : 'focus:outline-none focus:ring-2 focus:ring-primary-500'}
                `}
              >
                <MicroInteraction type="hover">
                  <div className="flex-grow pr-4">
                    <h3 className={`text-lg font-medium ${expandedId === faq.id && !highContrast ? 'text-primary-700' : ''}`}>
                      {faq.question}
                    </h3>
                    <div className="category-badge mt-1">
                      <span className={`
                        inline-block px-2 py-1 text-xs rounded-full
                        ${highContrast 
                          ? 'bg-gray-200 text-black border border-black' 
                          : 'bg-gray-100 text-gray-700'}
                      `}>
                        {faq.category}
                      </span>
                    </div>
                  </div>
                </MicroInteraction>
                
                <div className="flex-shrink-0">
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${expandedId === faq.id ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 9l-7 7-7-7" 
                    />
                  </svg>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedId === faq.id && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ 
                      duration: prefersReducedMotion ? 0 : 0.3 / animationSpeed,
                      ease: 'easeInOut'
                    }}
                    className="faq-answer overflow-hidden"
                  >
                    <div 
                      className={`p-4 border-t ${highContrast ? 'border-black' : 'border-gray-200'}`}
                      style={{ fontSize: `${fontSizeMultiplier}rem` }}
                    >
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      ) : (
        <div className={`no-results p-8 text-center rounded-lg ${contrastClasses}`}>
          <p className="text-lg mb-4">No FAQs match your search criteria.</p>
          <button
            onClick={clearFilters}
            className={`
              px-4 py-2 rounded
              ${highContrast 
                ? 'bg-black text-white border-2 border-black' 
                : 'bg-primary-600 text-white hover:bg-primary-700'}
            `}
          >
            <MicroInteraction type="hover">
              <span>Clear Filters</span>
            </MicroInteraction>
          </button>
        </div>
      )}
    </section>
  );
}