# IdeaCode Website Phase 2: Domain Model

## Core Entities

### 1. Interactive Component Entities

#### 1.1 AnimatedFeature
- **Description**: A feature highlight with animated elements
- **Attributes**:
  - `id`: Unique identifier
  - `title`: Feature title
  - `description`: Feature description
  - `icon`: Icon or illustration
  - `animationType`: Type of animation to apply
  - `animationTrigger`: What triggers the animation
  - `animationDuration`: Duration of the animation
  - `animationDelay`: Delay before animation starts
  - `detailContent`: Additional content shown on interaction
  - `linkUrl`: URL to feature detail page
- **Behaviors**:
  - `animate()`: Trigger the animation
  - `showDetail()`: Show additional detail content
  - `hideDetail()`: Hide additional detail content

#### 1.2 ProductDemonstration
- **Description**: Interactive demonstration of the product's capabilities
- **Attributes**:
  - `id`: Unique identifier
  - `title`: Demonstration title
  - `description`: Demonstration description
  - `scenarios`: Collection of demonstration scenarios
  - `currentScenario`: Currently active scenario
  - `annotations`: Explanatory annotations
  - `interactionPoints`: Points where users can interact
- **Behaviors**:
  - `changeScenario(scenarioId)`: Switch to a different scenario
  - `triggerInteraction(interactionId)`: Trigger a specific interaction
  - `showAnnotation(annotationId)`: Display a specific annotation
  - `hideAnnotation(annotationId)`: Hide a specific annotation
  - `reset()`: Reset the demonstration to its initial state

#### 1.3 DemonstrationScenario
- **Description**: A specific scenario within the product demonstration
- **Attributes**:
  - `id`: Unique identifier
  - `title`: Scenario title
  - `description`: Scenario description
  - `differentiator`: Associated key differentiator
  - `steps`: Sequence of steps in the scenario
  - `currentStep`: Currently active step
  - `visualElements`: Visual elements used in the scenario
- **Behaviors**:
  - `start()`: Start the scenario
  - `nextStep()`: Advance to the next step
  - `previousStep()`: Return to the previous step
  - `goToStep(stepId)`: Go to a specific step
  - `complete()`: Complete the scenario

#### 1.4 FAQSection
- **Description**: Collection of frequently asked questions
- **Attributes**:
  - `id`: Unique identifier
  - `title`: Section title
  - `description`: Section description
  - `categories`: FAQ categories
  - `questions`: Collection of FAQ items
  - `searchQuery`: Current search query
  - `expandedQuestions`: Currently expanded questions
- **Behaviors**:
  - `search(query)`: Search for questions matching the query
  - `filterByCategory(categoryId)`: Filter questions by category
  - `expandQuestion(questionId)`: Expand a specific question
  - `collapseQuestion(questionId)`: Collapse a specific question
  - `expandAll()`: Expand all questions
  - `collapseAll()`: Collapse all questions

#### 1.5 FAQItem
- **Description**: Individual frequently asked question
- **Attributes**:
  - `id`: Unique identifier
  - `question`: The question text
  - `answer`: The answer text
  - `category`: Question category
  - `tags`: Associated tags for searching
  - `isExpanded`: Whether the question is expanded
  - `userSegments`: Relevant user segments for this question
- **Behaviors**:
  - `expand()`: Expand the question
  - `collapse()`: Collapse the question
  - `isRelevantForSegment(segmentId)`: Check if relevant for a user segment

#### 1.6 PricingCalculator
- **Description**: Interactive tool for estimating pricing
- **Attributes**:
  - `id`: Unique identifier
  - `pricingTiers`: Available pricing tiers
  - `pricingFactors`: Factors affecting pricing
  - `userInputs`: Current user inputs
  - `calculatedResults`: Calculated pricing results
  - `comparisonMode`: Whether comparison mode is active
  - `comparisonTiers`: Tiers being compared
- **Behaviors**:
  - `calculatePrice()`: Calculate price based on inputs
  - `updateInput(factorId, value)`: Update a specific input
  - `compareOptions()`: Compare different pricing options
  - `generateSummary()`: Generate a shareable summary
  - `reset()`: Reset all inputs to defaults

### 2. Animation Entities

#### 2.1 ScrollAnimation
- **Description**: Animation triggered by scroll position
- **Attributes**:
  - `id`: Unique identifier
  - `targetElement`: Element to animate
  - `animationType`: Type of animation
  - `threshold`: Visibility threshold to trigger animation
  - `duration`: Animation duration
  - `delay`: Animation delay
  - `easing`: Animation easing function
  - `playState`: Current state of the animation
- **Behaviors**:
  - `observe()`: Start observing scroll position
  - `unobserve()`: Stop observing scroll position
  - `play()`: Play the animation
  - `pause()`: Pause the animation
  - `reset()`: Reset the animation to initial state

#### 2.2 MicroInteraction
- **Description**: Small animation triggered by user interaction
- **Attributes**:
  - `id`: Unique identifier
  - `targetElement`: Element with the interaction
  - `triggerEvent`: Event that triggers the interaction
  - `animationType`: Type of animation
  - `duration`: Animation duration
  - `feedback`: Type of feedback provided
  - `state`: Current state of the interaction
- **Behaviors**:
  - `attach()`: Attach the interaction to the target element
  - `detach()`: Detach the interaction from the target element
  - `trigger()`: Manually trigger the interaction
  - `reset()`: Reset the interaction to initial state

#### 2.3 PageTransition
- **Description**: Animation between page navigation
- **Attributes**:
  - `id`: Unique identifier
  - `fromRoute`: Source route
  - `toRoute`: Destination route
  - `transitionType`: Type of transition
  - `duration`: Transition duration
  - `preserveState`: Elements whose state should be preserved
  - `status`: Current status of the transition
- **Behaviors**:
  - `start()`: Start the transition
  - `complete()`: Complete the transition
  - `cancel()`: Cancel the transition
  - `isCompatible(fromRoute, toRoute)`: Check if transition is appropriate

#### 2.4 LoadingAnimation
- **Description**: Animation displayed during loading states
- **Attributes**:
  - `id`: Unique identifier
  - `animationType`: Type of animation
  - `duration`: Animation duration
  - `message`: Optional loading message
  - `progress`: Loading progress (0-100)
  - `isIndeterminate`: Whether progress is indeterminate
  - `status`: Current status of the loading operation
- **Behaviors**:
  - `show()`: Show the loading animation
  - `hide()`: Hide the loading animation
  - `updateProgress(value)`: Update the progress value
  - `setMessage(text)`: Update the loading message

### 3. User Journey Entities

#### 3.1 UserPersona
- **Description**: Representation of a user type
- **Attributes**:
  - `id`: Unique identifier
  - `name`: Persona name
  - `description`: Persona description
  - `primaryNeeds`: Primary user needs
  - `preferredContent`: Content types preferred by this persona
  - `technicalLevel`: Level of technical expertise
  - `detectionRules`: Rules for detecting this persona
- **Behaviors**:
  - `matchesUser(userData)`: Check if user matches this persona
  - `getRecommendedContent()`: Get content recommended for this persona
  - `getRecommendedJourney()`: Get recommended user journey

#### 3.2 UserJourney
- **Description**: Defined path through the website for a specific goal
- **Attributes**:
  - `id`: Unique identifier
  - `name`: Journey name
  - `description`: Journey description
  - `targetPersona`: Target user persona
  - `steps`: Sequence of steps in the journey
  - `entryPoints`: Possible entry points to this journey
  - `conversionGoal`: Ultimate goal of the journey
- **Behaviors**:
  - `start()`: Start tracking this journey
  - `advanceToStep(stepId)`: Advance to a specific step
  - `isComplete()`: Check if journey is complete
  - `getNextStep(currentStep)`: Get the recommended next step
  - `getProgress()`: Get progress through the journey

#### 3.3 JourneyStep
- **Description**: Individual step in a user journey
- **Attributes**:
  - `id`: Unique identifier
  - `title`: Step title
  - `description`: Step description
  - `route`: Associated route
  - `actions`: Actions to complete this step
  - `nextSteps`: Possible next steps
  - `cta`: Call-to-action for this step
- **Behaviors**:
  - `isComplete()`: Check if step is complete
  - `getRelevantContent()`: Get content relevant to this step
  - `getContextualCTA()`: Get contextual call-to-action

#### 3.4 ProgressiveDisclosure
- **Description**: Content that reveals more detail progressively
- **Attributes**:
  - `id`: Unique identifier
  - `title`: Content title
  - `summaryContent`: High-level summary content
  - `detailedContent`: Detailed content
  - `technicalContent`: Technical details
  - `currentLevel`: Current disclosure level
  - `expandState`: Current expansion state
- **Behaviors**:
  - `showSummary()`: Show summary content
  - `showDetails()`: Show detailed content
  - `showTechnical()`: Show technical content
  - `setLevel(level)`: Set disclosure level
  - `expand()`: Expand the content
  - `collapse()`: Collapse the content

#### 3.5 ContextualCTA
- **Description**: Call-to-action tailored to context
- **Attributes**:
  - `id`: Unique identifier
  - `text`: CTA text
  - `action`: Action to perform
  - `relevantPersonas`: Personas this CTA is relevant for
  - `relevantJourneySteps`: Journey steps this CTA is relevant for
  - `priority`: Display priority
  - `variant`: Visual variant
- **Behaviors**:
  - `isRelevant(persona, journeyStep)`: Check if CTA is relevant
  - `render()`: Render the CTA
  - `track()`: Track interaction with the CTA
  - `getPriority(context)`: Get priority in current context

## Relationships

1. **AnimatedFeature** relates to **Differentiator** (from Phase 1)
   - Each AnimatedFeature represents a product Differentiator
   - AnimatedFeature enhances the visual presentation of a Differentiator

2. **ProductDemonstration** contains multiple **DemonstrationScenarios**
   - Each DemonstrationScenario showcases a specific aspect of the product
   - DemonstrationScenarios are organized within a ProductDemonstration

3. **FAQSection** contains multiple **FAQItems**
   - FAQItems are grouped into categories within an FAQSection
   - FAQItems can be filtered, searched, and expanded/collapsed

4. **UserPersona** influences **UserJourney**
   - Each UserJourney is designed for a specific UserPersona
   - UserPersona determines relevant content and actions in the journey

5. **UserJourney** consists of multiple **JourneySteps**
   - JourneySteps define the progression through a UserJourney
   - JourneySteps can have multiple entry and exit points

6. **JourneyStep** contains **ContextualCTAs**
   - ContextualCTAs are displayed at appropriate points in JourneySteps
   - ContextualCTAs guide users to the next appropriate action

7. **ProgressiveDisclosure** is used within **JourneyStep**
   - ProgressiveDisclosure controls content complexity in JourneySteps
   - ProgressiveDisclosure adapts to UserPersona technical level

8. **ScrollAnimation** is applied to **AnimatedFeature**
   - ScrollAnimation controls how AnimatedFeatures appear on the page
   - ScrollAnimation is triggered by scroll position

9. **MicroInteraction** is applied to interactive elements
   - MicroInteraction provides feedback on user actions
   - MicroInteraction enhances perceived responsiveness

10. **PageTransition** connects different **JourneySteps**
    - PageTransition maintains context between related JourneySteps
    - PageTransition enhances perceived continuity

11. **LoadingAnimation** is displayed during asynchronous operations
    - LoadingAnimation provides feedback during data loading
    - LoadingAnimation maintains user engagement during waits

## Data Structures

### 1. AnimatedFeature
```typescript
interface AnimatedFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  animationType: 'fade' | 'slide' | 'scale' | 'custom';
  animationTrigger: 'scroll' | 'hover' | 'click' | 'load';
  animationDuration: number;
  animationDelay: number;
  detailContent: string;
  linkUrl: string;
  differentiatorId: string;
}
```

### 2. ProductDemonstration
```typescript
interface ProductDemonstration {
  id: string;
  title: string;
  description: string;
  scenarios: DemonstrationScenario[];
  currentScenario: string;
  annotations: {
    id: string;
    text: string;
    position: { x: number, y: number };
    isVisible: boolean;
  }[];
  interactionPoints: {
    id: string;
    label: string;
    position: { x: number, y: number };
    action: string;
  }[];
}
```

### 3. DemonstrationScenario
```typescript
interface DemonstrationScenario {
  id: string;
  title: string;
  description: string;
  differentiatorId: string;
  steps: {
    id: string;
    title: string;
    description: string;
    visualState: any;
    duration: number;
  }[];
  currentStep: string;
  visualElements: {
    id: string;
    type: string;
    properties: any;
  }[];
}
```

### 4. FAQSection
```typescript
interface FAQSection {
  id: string;
  title: string;
  description: string;
  categories: {
    id: string;
    name: string;
    description: string;
  }[];
  questions: FAQItem[];
  searchQuery: string;
  expandedQuestions: string[];
}
```

### 5. FAQItem
```typescript
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
  tags: string[];
  isExpanded: boolean;
  userSegments: string[];
}
```

### 6. PricingCalculator
```typescript
interface PricingCalculator {
  id: string;
  pricingTiers: {
    id: string;
    name: string;
    basePrice: number;
    features: string[];
    limits: Record<string, number>;
  }[];
  pricingFactors: {
    id: string;
    name: string;
    description: string;
    inputType: 'slider' | 'number' | 'select';
    options?: any[];
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    multiplier: number;
  }[];
  userInputs: Record<string, any>;
  calculatedResults: {
    tierId: string;
    monthlyPrice: number;
    annualPrice: number;
    breakdown: Record<string, number>;
  }[];
  comparisonMode: boolean;
  comparisonTiers: string[];
}
```

### 7. UserPersona
```typescript
interface UserPersona {
  id: string;
  name: string;
  description: string;
  primaryNeeds: string[];
  preferredContent: string[];
  technicalLevel: 'low' | 'medium' | 'high';
  detectionRules: {
    referrerPatterns: string[];
    utmParameters: Record<string, string>;
    behavioralSignals: Record<string, any>;
  };
}
```

### 8. UserJourney
```typescript
interface UserJourney {
  id: string;
  name: string;
  description: string;
  targetPersonaId: string;
  steps: JourneyStep[];
  entryPoints: {
    route: string;
    source: string;
    initialStepId: string;
  }[];
  conversionGoal: {
    type: string;
    value: string;
    route?: string;
  };
}
```

### 9. JourneyStep
```typescript
interface JourneyStep {
  id: string;
  title: string;
  description: string;
  route: string;
  actions: {
    id: string;
    description: string;
    isRequired: boolean;
    isCompleted: boolean;
  }[];
  nextSteps: {
    stepId: string;
    condition?: string;
    priority: number;
  }[];
  cta: ContextualCTA;
}
```

### 10. ContextualCTA
```typescript
interface ContextualCTA {
  id: string;
  text: string;
  action: {
    type: 'link' | 'scroll' | 'modal' | 'function';
    target: string;
  };
  relevantPersonas: string[];
  relevantJourneySteps: string[];
  priority: number;
  variant: 'primary' | 'secondary' | 'tertiary';
}
```

## Business Rules

1. **Animation Accessibility**
   - All animations must respect the user's `prefers-reduced-motion` setting
   - Animations must not interfere with screen reader functionality
   - Animations must not cause photosensitive epilepsy triggers

2. **Progressive Disclosure**
   - Technical content should be initially hidden for business stakeholders
   - Summary content should be shown first, with options to expand
   - Content complexity should match the detected or selected user persona

3. **User Persona Detection**
   - User persona should be inferred from referrer, UTM parameters, and behavior
   - Users should be able to explicitly select their persona
   - Persona selection should persist across sessions unless explicitly changed

4. **Journey Optimization**
   - CTAs should guide users to the next logical step in their journey
   - Related content should be suggested based on current content and persona
   - User progress through journeys should be tracked for optimization

5. **Performance Constraints**
   - Animations should not cause layout shifts after page load
   - Interactive components should be lazy-loaded when below the fold
   - Total JavaScript bundle size should not exceed performance budgets

6. **Mobile Adaptations**
   - Interactive demonstrations should adapt to simpler versions on mobile
   - Touch targets should be at least 44x44 pixels on mobile devices
   - Animations should be simplified on mobile to conserve battery

7. **Content Personalization**
   - FAQ items should be filtered based on relevance to user persona
   - CTAs should be personalized based on user journey and persona
   - Technical depth should adapt to user's detected technical level

8. **Pricing Calculator Rules**
   - Pricing estimates should be clearly labeled as estimates
   - All pricing factors should include explanatory tooltips
   - Comparison view should highlight differences between tiers