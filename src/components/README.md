# Phase 2: Enhanced User Experience Components

This directory contains the foundation components for the Phase 2 Enhanced User Experience implementation. These components provide the infrastructure for animations, accessibility, persona detection, and responsive design.

## Table of Contents

- [Installation](#installation)
- [Animation Framework](#animation-framework)
- [Accessibility Infrastructure](#accessibility-infrastructure)
- [Persona Detection System](#persona-detection-system)
- [Responsive Foundation](#responsive-foundation)
- [Usage Examples](#usage-examples)

## Installation

Run the setup script to install the required dependencies:

```bash
chmod +x setup-phase2.sh
./setup-phase2.sh
```

## Animation Framework

The animation framework provides components and utilities for creating smooth, consistent animations throughout the application.

### Components

- **AnimationProvider**: Context provider for global animation settings
- **MicroInteraction**: Component for subtle animations on interactive elements
- **PageTransition**: Component for smooth transitions between pages
- **LoadingAnimation**: Component for displaying loading state animations

### Example

```tsx
import { AnimationProvider, MicroInteraction, PageTransition } from 'src/components';

function App() {
  return (
    <AnimationProvider>
      <PageTransition pageKey="home" type="fade">
        <div>
          <h1>Welcome to IdeaCode</h1>
          <MicroInteraction type="hover-scale">
            <button>Get Started</button>
          </MicroInteraction>
        </div>
      </PageTransition>
    </AnimationProvider>
  );
}
```

## Accessibility Infrastructure

The accessibility infrastructure provides components and utilities for creating accessible user interfaces.

### Components

- **AccessibilityProvider**: Context provider for global accessibility settings
- **Utility Functions**: Focus management, keyboard navigation, and screen reader announcements

### Example

```tsx
import { AccessibilityProvider, useAccessibility } from 'src/components';
import { trapFocus, announceToScreenReader } from 'src/utils/accessibility';

function AccessibleModal({ isOpen, onClose, children }) {
  const { announceToScreenReader } = useAccessibility();
  
  useEffect(() => {
    if (isOpen) {
      announceToScreenReader('Modal opened', true);
      const modalElement = document.getElementById('modal');
      const cleanup = trapFocus(modalElement);
      return cleanup;
    }
  }, [isOpen, announceToScreenReader]);
  
  return (
    <div id="modal" role="dialog" aria-modal="true">
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

function App() {
  return (
    <AccessibilityProvider>
      {/* Your app content */}
    </AccessibilityProvider>
  );
}
```

## Persona Detection System

The persona detection system provides components and utilities for detecting and responding to different user personas.

### Components

- **PersonaProvider**: Context provider for user persona detection and management
- **PersonaContent**: Component that renders different content based on user persona
- **ProgressiveDisclosure**: Component that renders content with progressive disclosure based on user persona

### Example

```tsx
import { PersonaProvider, PersonaContent, ProgressiveDisclosure } from 'src/components';

function App() {
  return (
    <PersonaProvider>
      <PersonaContent
        businessStakeholder={<BusinessContent />}
        engineeringLeader={<EngineeringContent />}
        technicalDeveloper={<DeveloperContent />}
        general={<GeneralContent />}
      />
      
      <ProgressiveDisclosure targetPersona="technical-developer">
        <div>
          <h2>Advanced API Documentation</h2>
          <p>This content is primarily shown to technical developers.</p>
        </div>
      </ProgressiveDisclosure>
    </PersonaProvider>
  );
}
```

## Responsive Foundation

The responsive foundation provides components and utilities for creating responsive user interfaces.

### Components

- **ResponsiveProvider**: Context provider for responsive design
- **ResponsiveRender**: Component that renders different content based on breakpoint
- **BreakpointVisibility**: Component that renders content only at specified breakpoints
- **ResponsiveContainer**: Component that provides a responsive container with max-width based on breakpoint

### Example

```tsx
import { 
  ResponsiveProvider, 
  ResponsiveRender, 
  BreakpointVisibility,
  ResponsiveContainer
} from 'src/components';

function App() {
  return (
    <ResponsiveProvider>
      <ResponsiveContainer>
        <ResponsiveRender
          xs={<MobileHeader />}
          md={<DesktopHeader />}
          fallback={<DefaultHeader />}
        />
        
        <BreakpointVisibility xs sm>
          <MobileOnlyFeature />
        </BreakpointVisibility>
      </ResponsiveContainer>
    </ResponsiveProvider>
  );
}
```

## Usage Examples

### Combining All Components

Here's an example of how to combine all the components:

```tsx
// In your _app.tsx or layout.tsx file
import {
  AnimationProvider,
  AccessibilityProvider,
  PersonaProvider,
  ResponsiveProvider
} from 'src/components';

function AppLayout({ children }) {
  return (
    <AccessibilityProvider>
      <AnimationProvider>
        <ResponsiveProvider>
          <PersonaProvider>
            {children}
          </PersonaProvider>
        </ResponsiveProvider>
      </AnimationProvider>
    </AccessibilityProvider>
  );
}

export default AppLayout;
```

### Creating an Animated Button with Accessibility and Responsiveness

```tsx
import { 
  MicroInteraction, 
  useAccessibility, 
  useResponsive 
} from 'src/components';

function AnimatedButton({ onClick, children }) {
  const { reducedMotion } = useAccessibility();
  const { isMobile } = useResponsive();
  
  return (
    <MicroInteraction 
      type={reducedMotion ? 'none' : 'hover-scale'}
      disabled={isMobile}
    >
      <button 
        onClick={onClick}
        className={`btn ${isMobile ? 'btn-large' : 'btn-medium'}`}
      >
        {children}
      </button>
    </MicroInteraction>
  );
}
```

### Persona-Based Content with Animations

```tsx
import { 
  PersonaContent, 
  PageTransition, 
  useResponsive 
} from 'src/components';

function HomePage() {
  const { breakpoint } = useResponsive();
  
  return (
    <PageTransition 
      pageKey="home" 
      type={breakpoint === 'xs' ? 'fade' : 'slide-up'}
    >
      <PersonaContent
        businessStakeholder={
          <div>
            <h1>Streamline Your Business Processes</h1>
            <p>Discover how IdeaCode can help you achieve your business goals.</p>
          </div>
        }
        technicalDeveloper={
          <div>
            <h1>Powerful Developer Tools</h1>
            <p>Explore our comprehensive API and developer resources.</p>
          </div>
        }
        general={
          <div>
            <h1>Welcome to IdeaCode</h1>
            <p>The platform for innovative solutions.</p>
          </div>
        }
      />
    </PageTransition>
  );
}
```

These components provide a solid foundation for implementing the enhanced user experience in Phase 2. They can be extended and customized as needed to meet specific requirements.