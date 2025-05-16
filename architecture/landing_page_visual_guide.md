# Visual Design Guide for R&D Agent Store Landing Pages

This document provides detailed visual design specifications for both landing page alternatives: the Teaser Approach and the Technical Preview Approach. It serves as a reference for implementing the visual aspects of each design.

## Shared Design Principles

Both landing page alternatives share these core design principles:

1. **Clean, Minimal Aesthetic:** Focus on content with minimal visual noise
2. **Technical Appeal:** Design elements that resonate with technical audiences
3. **Clear Hierarchy:** Visual hierarchy that guides users through the content
4. **Responsive Design:** Seamless experience across all device sizes
5. **Accessibility:** High contrast, readable typography, and accessible interactions

## Shared Design Elements

### Grid System

Both designs use a 12-column grid system with the following specifications:

- **Container Width:** Max 1280px
- **Gutters:** 24px (desktop), 16px (tablet), 12px (mobile)
- **Margins:** 
  - Desktop: 80px
  - Tablet: 40px
  - Mobile: 24px

### Spacing System

Consistent spacing using an 8px base unit:

- **4px:** Minimal spacing (between related elements)
- **8px:** Extra small spacing
- **16px:** Small spacing
- **24px:** Medium spacing
- **32px:** Large spacing
- **48px:** Extra large spacing
- **64px:** Section spacing
- **80px:** Major section spacing

### Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 1023px
- **Desktop:** 1024px - 1279px
- **Large Desktop:** ≥ 1280px

### Shared UI Components

1. **Buttons**
   - Primary: Filled background, high contrast
   - Secondary: Outlined, medium contrast
   - Tertiary: Text-only, subtle hover effect
   - Sizes: Small (32px height), Medium (40px height), Large (48px height)
   - Border Radius: 4px
   - States: Default, Hover, Focus, Active, Disabled

2. **Form Elements**
   - Input Height: 40px
   - Border Radius: 4px
   - Border: 1px solid
   - States: Default, Focus, Error, Disabled
   - Label Position: Above input
   - Error Message: Below input, red text

3. **Cards**
   - Border Radius: 8px
   - Shadow: Subtle elevation
   - Padding: 24px
   - Border: Optional 1px solid or borderless

4. **Section Containers**
   - Padding: 64px 0
   - Background: White or light gray
   - Optional Dividers: 1px solid light gray

## Teaser Approach Visual Design

### Color Palette

1. **Primary Colors**
   - Deep Blue: #1E3A8A (Primary brand color)
   - Vibrant Teal: #0D9488 (Secondary brand color)

2. **Secondary Colors**
   - Light Gray: #F1F5F9 (Background, cards)
   - Dark Gray: #1E293B (Text, icons)

3. **Accent Colors**
   - Bright Orange: #F97316 (CTAs, highlights)
   - Soft Purple: #7C3AED (Secondary accents)

4. **Functional Colors**
   - Success Green: #10B981
   - Error Red: #EF4444
   - Warning Yellow: #F59E0B
   - Info Blue: #3B82F6

5. **Gradient**
   - Primary Gradient: Linear gradient from #1E3A8A to #0D9488
   - Used for hero background and key visual elements

### Typography

1. **Font Families**
   - Headings: Inter, sans-serif
   - Body: Inter, sans-serif

2. **Font Sizes**
   - H1: 3.5rem (desktop), 3rem (tablet), 2.5rem (mobile)
   - H2: 2.5rem (desktop), 2.25rem (tablet), 2rem (mobile)
   - H3: 2rem (desktop), 1.75rem (tablet), 1.5rem (mobile)
   - H4: 1.5rem (desktop), 1.25rem (tablet), 1.125rem (mobile)
   - Body Large: 1.125rem
   - Body: 1rem
   - Body Small: 0.875rem
   - Caption: 0.75rem

3. **Font Weights**
   - Headings: Bold (700)
   - Subheadings: Semi-bold (600)
   - Body: Regular (400)
   - Emphasis: Medium (500)

4. **Line Heights**
   - Headings: 1.2
   - Body: 1.5
   - Tight: 1.25
   - Loose: 1.75

### Visual Elements

1. **Hero Visual**
   - Abstract particle animation
   - Flowing data visualization
   - Subtle gradient background
   - Animated elements that respond to scroll/mouse

2. **Icons**
   - Line style with 2px stroke
   - Rounded corners
   - Consistent 24x24px sizing
   - Optional subtle color accents

3. **Illustrations**
   - Abstract, geometric style
   - Limited color palette
   - Focus on data and optimization concepts
   - Subtle animations on hover/scroll

4. **Animations**
   - Subtle entrance animations
   - Smooth transitions between states
   - Micro-interactions on hover/focus
   - Performance-optimized animations

### Section-Specific Design

1. **Hero Section**
   - Full-width gradient background
   - Large, bold heading
   - Animated particle visualization
   - Prominent CTA button
   - Optional floating geometric shapes

2. **Value Proposition Cards**
   - White background
   - Subtle shadow
   - Icon in brand color
   - Hover effect: slight elevation
   - Optional subtle border

3. **How It Works Section**
   - Numbered steps with connecting lines
   - Icons for each step
   - Alternating layout (left/right)
   - Subtle background pattern

4. **Impact Showcase**
   - Large numbers with animations
   - Circular progress indicators
   - Abstract data visualization
   - Subtle grid background

5. **Social Proof Section**
   - Quote marks for testimonials
   - Avatar placeholders
   - Company logos in grayscale
   - Cards with subtle shadows

6. **Waitlist Form**
   - Contained in a prominent card
   - Subtle pattern background
   - Large CTA button
   - Success state animation

### Mobile Adaptations

1. **Navigation**
   - Hamburger menu on mobile
   - Simplified header
   - Sticky CTA at bottom

2. **Layout Changes**
   - Single column layout
   - Reduced spacing
   - Smaller typography
   - Simplified animations

3. **Touch Optimizations**
   - Larger touch targets (min 44x44px)
   - Swipe gestures for carousels
   - Reduced hover dependencies
   - Tap-friendly interactions

## Technical Preview Visual Design

### Color Palette

1. **Primary Colors**
   - Deep Purple: #4C1D95 (Primary brand color)
   - Electric Blue: #2563EB (Secondary brand color)

2. **Secondary Colors**
   - Light Gray: #F8FAFC (Background, cards)
   - Dark Gray: #0F172A (Text, code)

3. **Accent Colors**
   - Bright Green: #10B981 (CTAs, metrics)
   - Vivid Cyan: #06B6D4 (Secondary accents)

4. **Functional Colors**
   - Success Green: #10B981
   - Error Red: #EF4444
   - Warning Yellow: #F59E0B
   - Info Blue: #3B82F6

5. **Code Syntax Colors**
   - Background: #1E293B
   - Text: #E2E8F0
   - Keywords: #93C5FD
   - Strings: #86EFAC
   - Numbers: #FCA5A5
   - Comments: #94A3B8

### Typography

1. **Font Families**
   - Headings: Space Grotesk, sans-serif
   - Body: Inter, sans-serif
   - Code: JetBrains Mono, monospace

2. **Font Sizes**
   - H1: 3rem (desktop), 2.5rem (tablet), 2rem (mobile)
   - H2: 2.25rem (desktop), 2rem (tablet), 1.75rem (mobile)
   - H3: 1.75rem (desktop), 1.5rem (tablet), 1.5rem (mobile)
   - H4: 1.5rem (desktop), 1.25rem (tablet), 1.125rem (mobile)
   - Body Large: 1.125rem
   - Body: 1rem
   - Body Small: 0.875rem
   - Code: 0.875rem
   - Caption: 0.75rem

3. **Font Weights**
   - Headings: Bold (700)
   - Subheadings: Medium (500)
   - Body: Regular (400)
   - Code: Regular (400)

4. **Line Heights**
   - Headings: 1.2
   - Body: 1.5
   - Code: 1.7
   - Tight: 1.25

### Visual Elements

1. **Technical Diagrams**
   - Clean, precise lines
   - Labeled components
   - Directional arrows
   - Color-coded elements

2. **Data Visualizations**
   - Bar charts, line graphs
   - Precise data labels
   - Grid backgrounds
   - Comparison indicators

3. **Code Blocks**
   - Syntax highlighting
   - Line numbers
   - Copy button
   - Optional diff highlighting

4. **Technical Icons**
   - Outlined style
   - Technical symbols
   - Consistent 24x24px sizing
   - Functional rather than decorative

### Section-Specific Design

1. **Hero Section**
   - Technical visualization background
   - Precise, metric-focused heading
   - Interactive element showing optimization
   - CTA with technical focus

2. **Key Metrics Section**
   - Large, precise numbers
   - Unit labels
   - Comparison indicators (up/down)
   - Grid layout with equal sizing

3. **Improvements Showcase**
   - Card grid with filtering controls
   - Metric highlight in accent color
   - Technical tags for categorization
   - Expandable details

4. **Technical Architecture Section**
   - Interactive diagram
   - Component highlighting
   - Connection lines with labels
   - Detailed component information on interaction

5. **Implementation Process Section**
   - Timeline visualization
   - Step numbers
   - Technical considerations in separate panels
   - Progress indicators

6. **Case Studies Section**
   - Tabbed interface
   - Before/after code comparison
   - Performance metrics visualization
   - Technical challenge/solution format

7. **FAQ Section**
   - Categorized questions
   - Expandable answers
   - Code snippets where relevant
   - Links to technical resources

8. **Technical Waitlist Form**
   - Structured form with multiple fields
   - Role selection dropdown
   - Technical background fields
   - Clear explanation of process

### Mobile Adaptations

1. **Technical Visualizations**
   - Simplified diagrams
   - Vertical layouts
   - Touch-friendly interactive elements
   - Progressive disclosure of complex information

2. **Code Display**
   - Horizontally scrollable code blocks
   - Reduced line numbers
   - Optimized syntax highlighting
   - Tap to expand full view

3. **Data Presentation**
   - Stacked rather than side-by-side comparisons
   - Simplified charts
   - Progressive loading of data
   - Optimized for portrait orientation

## Implementation Guidelines

### CSS Architecture

1. **Utility-First Approach**
   - Use Tailwind CSS for utility classes
   - Create custom utilities for brand-specific needs
   - Maintain consistent naming conventions

2. **Component-Specific Styles**
   - Isolate component styles
   - Use CSS modules or styled-components
   - Maintain consistent component structure

3. **Theming System**
   - CSS variables for colors, spacing, etc.
   - Theme switching capability
   - Dark mode support (optional)

### Animation Implementation

1. **Performance Considerations**
   - Use CSS transforms and opacity for animations
   - Leverage will-change for complex animations
   - Throttle scroll-based animations
   - Respect reduced motion preferences

2. **Animation Libraries**
   - Framer Motion for React components
   - GSAP for complex sequences
   - Lottie for pre-rendered animations

3. **Animation Timing**
   - Entrance: 300-500ms
   - Hover: 150-200ms
   - Page Transitions: 200-300ms
   - Stagger: 50-100ms between items

### Asset Optimization

1. **Images**
   - Format: WebP with fallbacks
   - Responsive images with srcset
   - Lazy loading for below-fold images
   - Appropriate compression

2. **SVGs**
   - Optimize with SVGO
   - Inline critical SVGs
   - Use sprites for multiple icons
   - Animate with CSS or SMIL

3. **Fonts**
   - Subset fonts to include only needed characters
   - Use font-display: swap
   - Preload critical fonts
   - Limit font weights and styles

### Accessibility Implementation

1. **Color Contrast**
   - Minimum 4.5:1 for normal text
   - Minimum 3:1 for large text
   - Test with color blindness simulators
   - Provide alternative indicators beyond color

2. **Keyboard Navigation**
   - Visible focus states
   - Logical tab order
   - Skip links
   - Keyboard shortcuts for complex interactions

3. **Screen Reader Support**
   - Proper ARIA roles and labels
   - Meaningful alt text
   - Live regions for dynamic content
   - Test with screen readers

## Design Deliverables

1. **Component Library**
   - UI components with variants
   - Documentation of props and usage
   - Accessibility guidelines
   - Responsive behavior

2. **Design Tokens**
   - Colors
   - Typography
   - Spacing
   - Shadows
   - Border radii

3. **Page Templates**
   - Desktop, tablet, and mobile layouts
   - Component placement
   - Spacing guidelines
   - Grid implementation

4. **Animation Specifications**
   - Timing and easing
   - Interaction states
   - Entrance animations
   - Micro-interactions

5. **Asset Package**
   - Optimized images
   - SVG icons
   - Illustrations
   - Animation files

## Design-to-Development Handoff

1. **Design System Documentation**
   - Component specifications
   - Design tokens
   - Usage guidelines
   - Accessibility requirements

2. **Interactive Prototypes**
   - Key interactions
   - Animation examples
   - Responsive behavior
   - User flows

3. **Design Specs**
   - Precise measurements
   - Color values
   - Typography details
   - Asset references

4. **Implementation Notes**
   - Technical considerations
   - Performance optimizations
   - Browser compatibility
   - Progressive enhancement strategies

## Conclusion

This visual design guide provides comprehensive specifications for implementing both the Teaser Approach and Technical Preview Approach landing pages. By following these guidelines, developers can create visually consistent, accessible, and engaging experiences that effectively communicate the value of the R&D Agent Store to the target audience.

The two approaches offer distinct visual strategies while maintaining a cohesive brand identity. The Teaser Approach uses more emotive, abstract visuals to create excitement, while the Technical Preview Approach employs precise, data-driven visuals to build technical credibility. Both are designed to appeal to product teams in tech companies while maintaining a sleek, minimal UI that drives waitlist signups.