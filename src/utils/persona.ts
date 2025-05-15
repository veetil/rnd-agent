/**
 * Utility functions for user persona detection and management
 */

export type UserPersona = 
  | 'business-stakeholder'
  | 'engineering-leader'
  | 'technical-developer'
  | 'general'
  | 'returning-user';

export interface PersonaTraits {
  /** Technical expertise level (0-100) */
  technicalExpertise: number;
  /** Business focus level (0-100) */
  businessFocus: number;
  /** Decision-making authority level (0-100) */
  decisionAuthority: number;
  /** Implementation focus level (0-100) */
  implementationFocus: number;
}

/**
 * Default traits for each persona
 */
export const personaTraits: Record<UserPersona, PersonaTraits> = {
  'business-stakeholder': {
    technicalExpertise: 30,
    businessFocus: 90,
    decisionAuthority: 80,
    implementationFocus: 20
  },
  'engineering-leader': {
    technicalExpertise: 70,
    businessFocus: 60,
    decisionAuthority: 70,
    implementationFocus: 50
  },
  'technical-developer': {
    technicalExpertise: 90,
    businessFocus: 30,
    decisionAuthority: 30,
    implementationFocus: 90
  },
  'general': {
    technicalExpertise: 50,
    businessFocus: 50,
    decisionAuthority: 50,
    implementationFocus: 50
  },
  'returning-user': {
    technicalExpertise: 60,
    businessFocus: 60,
    decisionAuthority: 60,
    implementationFocus: 60
  }
};

/**
 * Detect user persona based on referral source
 * @param referrer - The referrer URL
 * @returns The detected persona or null if no match
 */
export function detectPersonaFromReferrer(referrer: string): UserPersona | null {
  if (!referrer) return null;
  
  const referrerLower = referrer.toLowerCase();
  
  // Technical sources
  if (
    referrerLower.includes('github.com') ||
    referrerLower.includes('stackoverflow.com') ||
    referrerLower.includes('dev.to') ||
    referrerLower.includes('hackernews') ||
    referrerLower.includes('medium.com/engineering')
  ) {
    return 'technical-developer';
  }
  
  // Engineering leadership sources
  if (
    referrerLower.includes('linkedin.com') ||
    referrerLower.includes('techcrunch.com') ||
    referrerLower.includes('infoq.com') ||
    referrerLower.includes('cio.com') ||
    referrerLower.includes('medium.com/leadership')
  ) {
    return 'engineering-leader';
  }
  
  // Business sources
  if (
    referrerLower.includes('forbes.com') ||
    referrerLower.includes('hbr.org') ||
    referrerLower.includes('wsj.com') ||
    referrerLower.includes('businessinsider.com') ||
    referrerLower.includes('entrepreneur.com')
  ) {
    return 'business-stakeholder';
  }
  
  return null;
}

/**
 * Detect user persona based on URL path
 * @param path - The current URL path
 * @returns The detected persona or null if no match
 */
export function detectPersonaFromPath(path: string): UserPersona | null {
  if (!path) return null;
  
  const pathLower = path.toLowerCase();
  
  // Technical paths
  if (
    pathLower.includes('/docs') ||
    pathLower.includes('/api') ||
    pathLower.includes('/technical') ||
    pathLower.includes('/developer') ||
    pathLower.includes('/sdk')
  ) {
    return 'technical-developer';
  }
  
  // Engineering leadership paths
  if (
    pathLower.includes('/solutions/engineering-leaders') ||
    pathLower.includes('/case-studies/engineering') ||
    pathLower.includes('/platform')
  ) {
    return 'engineering-leader';
  }
  
  // Business paths
  if (
    pathLower.includes('/solutions/business') ||
    pathLower.includes('/pricing') ||
    pathLower.includes('/enterprise') ||
    pathLower.includes('/roi')
  ) {
    return 'business-stakeholder';
  }
  
  return null;
}

/**
 * Track user behavior to refine persona detection
 * @param behavior - Object containing behavior metrics
 * @returns The updated persona based on behavior
 */
export function refinePersonaFromBehavior(
  currentPersona: UserPersona,
  behavior: {
    technicalPageViews?: number;
    businessPageViews?: number;
    documentationTimeSpent?: number;
    pricingTimeSpent?: number;
    apiExplorerUsed?: boolean;
    caseStudiesViewed?: number;
  }
): UserPersona {
  let technicalScore = 0;
  let businessScore = 0;
  let leadershipScore = 0;
  
  // Technical indicators
  if (behavior.technicalPageViews) {
    technicalScore += behavior.technicalPageViews * 10;
  }
  
  if (behavior.documentationTimeSpent) {
    technicalScore += Math.min(behavior.documentationTimeSpent / 10, 50);
  }
  
  if (behavior.apiExplorerUsed) {
    technicalScore += 30;
  }
  
  // Business indicators
  if (behavior.businessPageViews) {
    businessScore += behavior.businessPageViews * 10;
  }
  
  if (behavior.pricingTimeSpent) {
    businessScore += Math.min(behavior.pricingTimeSpent / 5, 50);
  }
  
  // Leadership indicators
  if (behavior.caseStudiesViewed) {
    leadershipScore += behavior.caseStudiesViewed * 15;
  }
  
  // Determine the strongest signal
  const maxScore = Math.max(technicalScore, businessScore, leadershipScore);
  
  if (maxScore < 30) {
    // Not enough signal to change persona
    return currentPersona;
  }
  
  if (technicalScore === maxScore) {
    return 'technical-developer';
  } else if (businessScore === maxScore) {
    return 'business-stakeholder';
  } else if (leadershipScore === maxScore) {
    return 'engineering-leader';
  }
  
  return currentPersona;
}

/**
 * Get content priority for a given persona
 * @param persona - The user persona
 * @returns Object with content type priorities (0-100)
 */
export function getContentPriorityForPersona(persona: UserPersona): Record<string, number> {
  switch (persona) {
    case 'business-stakeholder':
      return {
        'roi-metrics': 90,
        'case-studies': 85,
        'pricing': 80,
        'enterprise-features': 75,
        'testimonials': 70,
        'integration-options': 60,
        'technical-details': 30,
        'api-documentation': 20
      };
      
    case 'engineering-leader':
      return {
        'scalability': 90,
        'security': 85,
        'integration-options': 80,
        'team-collaboration': 75,
        'case-studies': 70,
        'pricing': 65,
        'technical-details': 60,
        'api-documentation': 50
      };
      
    case 'technical-developer':
      return {
        'api-documentation': 90,
        'technical-details': 85,
        'code-examples': 80,
        'sdk-information': 75,
        'integration-options': 70,
        'developer-tools': 65,
        'pricing': 40,
        'case-studies': 30
      };
      
    case 'returning-user':
      return {
        'new-features': 90,
        'updates': 85,
        'personalized-content': 80,
        'previously-viewed': 75,
        'recommended-content': 70,
        'technical-details': 60,
        'pricing': 50,
        'case-studies': 50
      };
      
    case 'general':
    default:
      return {
        'overview': 90,
        'key-features': 80,
        'testimonials': 70,
        'case-studies': 60,
        'pricing': 60,
        'technical-details': 50,
        'api-documentation': 40,
        'integration-options': 50
      };
  }
}

/**
 * Save persona to localStorage
 * @param persona - The user persona to save
 */
export function savePersona(persona: UserPersona): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userPersona', persona);
    localStorage.setItem('personaTimestamp', Date.now().toString());
  }
}

/**
 * Load persona from localStorage
 * @param maxAgeMs - Maximum age of the stored persona in milliseconds
 * @returns The stored persona or null if not found or expired
 */
export function loadPersona(maxAgeMs = 7 * 24 * 60 * 60 * 1000): UserPersona | null {
  if (typeof window === 'undefined') return null;
  
  const persona = localStorage.getItem('userPersona') as UserPersona | null;
  const timestamp = localStorage.getItem('personaTimestamp');
  
  if (!persona || !timestamp) return null;
  
  const age = Date.now() - parseInt(timestamp, 10);
  
  if (age > maxAgeMs) return null;
  
  return persona;
}

/**
 * Set a cookie with the user persona
 * @param persona - The user persona to save
 * @param days - Number of days until the cookie expires
 */
export function setPersonaCookie(persona: UserPersona, days = 7): void {
  if (typeof document === 'undefined') return;
  
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  
  document.cookie = `userPersona=${persona}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
}

/**
 * Get the user persona from cookies
 * @returns The stored persona or null if not found
 */
export function getPersonaCookie(): UserPersona | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    
    if (name === 'userPersona') {
      return value as UserPersona;
    }
  }
  
  return null;
}