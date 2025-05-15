import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the available personas
export type Persona = 'general' | 'business-stakeholder' | 'engineering-leader' | 'technical-developer' | 'returning-user' | string;

// Define the context interface
interface PersonaContextType {
  persona: Persona;
  setPersona: (persona: Persona) => void;
  isReturningUser: boolean;
  setIsReturningUser: (isReturning: boolean) => void;
  userPreferences: Record<string, any>;
  setUserPreferences: (preferences: Record<string, any>) => void;
  userHistory: {
    visitedPages: string[];
    interactions: Record<string, number>;
    lastVisit: Date | null;
  };
  addPageVisit: (page: string) => void;
  addInteraction: (type: string) => void;
  resetHistory: () => void;
}

// Create the context with default values
const PersonaContext = createContext<PersonaContextType>({
  persona: 'general',
  setPersona: () => {},
  isReturningUser: false,
  setIsReturningUser: () => {},
  userPreferences: {},
  setUserPreferences: () => {},
  userHistory: {
    visitedPages: [],
    interactions: {},
    lastVisit: null
  },
  addPageVisit: () => {},
  addInteraction: () => {},
  resetHistory: () => {}
});

// Define the provider props
interface PersonaProviderProps {
  children: ReactNode;
  initialPersona?: Persona;
  storageKey?: string;
}

/**
 * Provider component for persona context
 * Manages user persona and preferences
 */
export function PersonaProvider({
  children,
  initialPersona = 'general',
  storageKey = 'ideacode-persona'
}: PersonaProviderProps) {
  // Initialize state
  const [persona, setPersonaState] = useState<Persona>(initialPersona);
  const [isReturningUser, setIsReturningUser] = useState<boolean>(false);
  const [userPreferences, setUserPreferences] = useState<Record<string, any>>({});
  const [userHistory, setUserHistory] = useState<{
    visitedPages: string[];
    interactions: Record<string, number>;
    lastVisit: Date | null;
  }>({
    visitedPages: [],
    interactions: {},
    lastVisit: null
  });

  // Load persona data from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem(storageKey);
        
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          
          // Set persona if available
          if (parsedData.persona) {
            setPersonaState(parsedData.persona);
          }
          
          // Set user preferences if available
          if (parsedData.userPreferences) {
            setUserPreferences(parsedData.userPreferences);
          }
          
          // Set user history if available
          if (parsedData.userHistory) {
            setUserHistory(parsedData.userHistory);
          }
          
          // Check if this is a returning user
          if (parsedData.userHistory?.lastVisit) {
            const lastVisit = new Date(parsedData.userHistory.lastVisit);
            const now = new Date();
            
            // If last visit was more than 1 hour ago, consider as returning user
            if ((now.getTime() - lastVisit.getTime()) > (60 * 60 * 1000)) {
              setIsReturningUser(true);
            }
          }
        }
      } catch (error) {
        console.error('Error loading persona data from localStorage:', error);
      }
    }
  }, [storageKey]);

  // Save persona data to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          persona,
          userPreferences,
          userHistory
        }));
      } catch (error) {
        console.error('Error saving persona data to localStorage:', error);
      }
    }
  }, [persona, userPreferences, userHistory, storageKey]);

  // Update persona
  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona);
  };

  // Add page visit to history
  const addPageVisit = (page: string) => {
    setUserHistory(prev => {
      const visitedPages = [...prev.visitedPages];
      
      // Add page if not already in history
      if (!visitedPages.includes(page)) {
        visitedPages.push(page);
      }
      
      return {
        ...prev,
        visitedPages,
        lastVisit: new Date()
      };
    });
  };

  // Add interaction to history
  const addInteraction = (type: string) => {
    setUserHistory(prev => {
      const interactions = { ...prev.interactions };
      
      // Increment interaction count
      interactions[type] = (interactions[type] || 0) + 1;
      
      return {
        ...prev,
        interactions,
        lastVisit: new Date()
      };
    });
  };

  // Reset user history
  const resetHistory = () => {
    setUserHistory({
      visitedPages: [],
      interactions: {},
      lastVisit: null
    });
    setIsReturningUser(false);
  };

  // Create context value
  const contextValue: PersonaContextType = {
    persona,
    setPersona,
    isReturningUser,
    setIsReturningUser,
    userPreferences,
    setUserPreferences,
    userHistory,
    addPageVisit,
    addInteraction,
    resetHistory
  };

  return (
    <PersonaContext.Provider value={contextValue}>
      {children}
    </PersonaContext.Provider>
  );
}

/**
 * Hook for using persona context
 * @returns PersonaContextType
 */
export function usePersona(): PersonaContextType {
  const context = useContext(PersonaContext);
  
  if (!context) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  
  return context;
}

interface PersonaContentProps {
  /** Content for business stakeholders */
  businessStakeholder?: ReactNode;
  /** Content for engineering leaders */
  engineeringLeader?: ReactNode;
  /** Content for technical developers */
  technicalDeveloper?: ReactNode;
  /** Content for returning users */
  returningUser?: ReactNode;
  /** Content for general users */
  general?: ReactNode;
  /** Content for any other persona */
  [key: string]: ReactNode;
}

/**
 * Component for rendering persona-specific content
 * Shows different content based on the current persona
 */
export function PersonaContent({
  businessStakeholder,
  engineeringLeader,
  technicalDeveloper,
  returningUser,
  general,
  ...otherPersonas
}: PersonaContentProps) {
  const { persona, isReturningUser } = usePersona();
  
  // If user is returning and returningUser content is provided, show that
  if (isReturningUser && returningUser) {
    return <>{returningUser}</>;
  }
  
  // Otherwise, show content based on persona
  switch (persona) {
    case 'business-stakeholder':
      return <>{businessStakeholder || general || null}</>;
    case 'engineering-leader':
      return <>{engineeringLeader || general || null}</>;
    case 'technical-developer':
      return <>{technicalDeveloper || general || null}</>;
    case 'general':
      return <>{general || null}</>;
    default:
      // Check if content exists for this persona
      if (otherPersonas[persona]) {
        return <>{otherPersonas[persona]}</>;
      }
      
      // Fallback to general content
      return <>{general || null}</>;
  }
}

interface ProgressiveDisclosureProps {
  /** The content to show */
  children: ReactNode;
  /** The summary or trigger element */
  summary?: ReactNode;
  /** Whether the content is initially expanded */
  initiallyExpanded?: boolean;
  /** The target persona(s) for this content */
  targetPersona?: Persona | Persona[];
  /** Whether to hide completely if not for target persona */
  hideCompletely?: boolean;
  /** The animation duration in seconds */
  animationDuration?: number;
  /** Whether to disable the animation */
  disableAnimation?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** The ID for the disclosure */
  id?: string;
  /** The callback when the disclosure is expanded */
  onExpand?: () => void;
  /** The callback when the disclosure is collapsed */
  onCollapse?: () => void;
}

/**
 * Component for progressive disclosure of complex information
 * Reveals details progressively based on user needs
 */
export function ProgressiveDisclosure({
  children,
  summary,
  initiallyExpanded = false,
  targetPersona,
  hideCompletely = true,
  animationDuration = 0.3,
  disableAnimation = false,
  className = '',
  id,
  onExpand,
  onCollapse
}: ProgressiveDisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded);
  const { persona } = usePersona();
  
  // Check if this disclosure is relevant for the current persona
  const isRelevant = () => {
    if (!targetPersona) return true;
    
    const personas = Array.isArray(targetPersona) 
      ? targetPersona 
      : [targetPersona];
    
    return personas.includes(persona) || personas.includes('general');
  };
  
  // Toggle expanded state
  const toggleExpanded = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    if (newState && onExpand) {
      onExpand();
    } else if (!newState && onCollapse) {
      onCollapse();
    }
  };
  
  // If not relevant and hideCompletely is true, don't render anything
  if (!isRelevant() && hideCompletely) {
    return null;
  }
  
  // If not relevant but hideCompletely is false, just show the content
  if (!isRelevant() && !hideCompletely) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <div className={`progressive-disclosure ${className}`} id={id}>
      {summary && (
        <div 
          className="progressive-disclosure-summary"
          onClick={toggleExpanded}
          style={{ cursor: 'pointer' }}
        >
          {summary}
        </div>
      )}
      
      <div
        className="progressive-disclosure-content"
        style={{
          overflow: 'hidden',
          maxHeight: isExpanded ? '1000px' : '0',
          opacity: isExpanded ? 1 : 0,
          transition: disableAnimation 
            ? 'none' 
            : `max-height ${animationDuration}s ease-in-out, opacity ${animationDuration}s ease-in-out`,
          display: isExpanded ? 'block' : 'none'
        }}
      >
        {children}
      </div>
    </div>
  );
}