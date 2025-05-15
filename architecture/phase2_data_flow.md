# IdeaCode Website Phase 2: Data Flow Architecture

This document outlines the data flow architecture for Phase 2 of the IdeaCode website, focusing on how data moves through the enhanced user experience components.

## 1. High-Level Data Flow

```mermaid
graph TD
    subgraph "User Interactions"
        Visit[Page Visit]
        Scroll[Page Scroll]
        Click[User Click/Tap]
        Hover[User Hover]
        Input[User Input]
    end
    
    subgraph "Data Processing"
        PersonaDetection[Persona Detection]
        JourneyTracking[Journey Tracking]
        ContentSelection[Content Selection]
        AnimationTrigger[Animation Triggering]
        InteractionHandling[Interaction Handling]
    end
    
    subgraph "Data Storage"
        UserPreferences[User Preferences]
        JourneyState[Journey State]
        InteractionState[Interaction State]
        AnimationState[Animation State]
        FormData[Form Data]
    end
    
    subgraph "Output"
        AnimatedContent[Animated Content]
        PersonalizedContent[Personalized Content]
        InteractiveElements[Interactive Elements]
        ContextualCTAs[Contextual CTAs]
        ProgressiveContent[Progressive Content]
    end
    
    Visit --> PersonaDetection
    Scroll --> AnimationTrigger
    Click --> InteractionHandling
    Hover --> InteractionHandling
    Input --> InteractionHandling
    
    PersonaDetection --> UserPreferences
    PersonaDetection --> JourneyTracking
    JourneyTracking --> JourneyState
    AnimationTrigger --> AnimationState
    InteractionHandling --> InteractionState
    InteractionHandling --> FormData
    
    UserPreferences --> ContentSelection
    JourneyState --> ContentSelection
    
    ContentSelection --> PersonalizedContent
    ContentSelection --> ContextualCTAs
    ContentSelection --> ProgressiveContent
    
    AnimationState --> AnimatedContent
    InteractionState --> InteractiveElements
```

## 2. Persona Detection and User Journey Flow

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant PersonaDetector
    participant JourneyTracker
    participant ContentAdapter
    participant Analytics
    
    User->>Browser: Initial Visit
    Browser->>PersonaDetector: Page Visit Event
    PersonaDetector->>PersonaDetector: Analyze UTM, Referrer, Path
    
    alt Has Explicit Persona Selection
        PersonaDetector->>Browser: Retrieve Stored Persona
    else No Explicit Selection
        PersonaDetector->>PersonaDetector: Apply Detection Rules
    end
    
    PersonaDetector->>JourneyTracker: Identified Persona
    JourneyTracker->>JourneyTracker: Determine Journey Stage
    JourneyTracker->>ContentAdapter: Persona + Journey Stage
    ContentAdapter->>Browser: Personalized Content
    Browser->>User: Display Adapted Experience
    
    User->>Browser: Interact with Content
    Browser->>JourneyTracker: Track Interaction
    JourneyTracker->>JourneyTracker: Update Journey Stage
    JourneyTracker->>ContentAdapter: Updated Journey Context
    ContentAdapter->>Browser: Updated CTAs & Content
    Browser->>User: Display Updated Experience
    
    Browser->>Analytics: Log Journey Progress
    Analytics->>PersonaDetector: Refine Persona Model
```

## 3. Interactive Components Data Flow

### 3.1 Animated Feature Highlights

```mermaid
graph TD
    subgraph "Input Events"
        Scroll[Page Scroll]
        Hover[Mouse Hover]
        Click[User Click]
    end
    
    subgraph "Processing"
        IntersectionObserver[Intersection Observer]
        AnimationController[Animation Controller]
        ExpandController[Expansion Controller]
    end
    
    subgraph "State"
        VisibilityState[Visibility State]
        HoverState[Hover State]
        ExpandedState[Expanded State]
    end
    
    subgraph "Output"
        EntryAnimation[Entry Animation]
        HoverEffect[Hover Effect]
        ExpandedContent[Expanded Content]
    end
    
    Scroll --> IntersectionObserver
    IntersectionObserver --> VisibilityState
    VisibilityState --> AnimationController
    AnimationController --> EntryAnimation
    
    Hover --> HoverState
    HoverState --> HoverEffect
    
    Click --> ExpandController
    ExpandController --> ExpandedState
    ExpandedState --> ExpandedContent
```

### 3.2 Interactive Product Demonstration

```mermaid
graph TD
    subgraph "Input Events"
        ScenarioSelect[Scenario Selection]
        PlayControl[Play/Pause Control]
        StepNavigation[Step Navigation]
        InteractionPoint[Interaction Point Click]
    end
    
    subgraph "Processing"
        ScenarioController[Scenario Controller]
        PlaybackController[Playback Controller]
        StepController[Step Controller]
        InteractionController[Interaction Controller]
    end
    
    subgraph "State"
        CurrentScenario[Current Scenario]
        PlaybackState[Playback State]
        CurrentStep[Current Step]
        VisibleAnnotations[Visible Annotations]
    end
    
    subgraph "Output"
        ScenarioVisuals[Scenario Visuals]
        StepIndicators[Step Indicators]
        Annotations[Annotations]
        ScenarioDescription[Scenario Description]
    end
    
    ScenarioSelect --> ScenarioController
    ScenarioController --> CurrentScenario
    CurrentScenario --> ScenarioVisuals
    CurrentScenario --> ScenarioDescription
    
    PlayControl --> PlaybackController
    PlaybackController --> PlaybackState
    PlaybackState --> StepController
    
    StepNavigation --> StepController
    StepController --> CurrentStep
    CurrentStep --> StepIndicators
    CurrentStep --> ScenarioVisuals
    
    InteractionPoint --> InteractionController
    InteractionController --> VisibleAnnotations
    VisibleAnnotations --> Annotations
```

### 3.3 Expandable FAQ Sections

```mermaid
graph TD
    subgraph "Input Events"
        Search[Search Input]
        CategorySelect[Category Selection]
        QuestionClick[Question Click]
        ExpandAll[Expand/Collapse All]
    end
    
    subgraph "Processing"
        SearchFilter[Search Filter]
        CategoryFilter[Category Filter]
        PersonaFilter[Persona Filter]
        ExpansionController[Expansion Controller]
    end
    
    subgraph "State"
        SearchQuery[Search Query]
        ActiveCategory[Active Category]
        UserPersona[User Persona]
        ExpandedQuestions[Expanded Questions]
    end
    
    subgraph "Output"
        FilteredQuestions[Filtered Questions]
        QuestionList[Question List]
        ExpandedAnswers[Expanded Answers]
        RelatedQuestions[Related Questions]
    end
    
    Search --> SearchFilter
    SearchFilter --> SearchQuery
    
    CategorySelect --> CategoryFilter
    CategoryFilter --> ActiveCategory
    
    UserPersona --> PersonaFilter
    
    SearchQuery --> FilteredQuestions
    ActiveCategory --> FilteredQuestions
    UserPersona --> FilteredQuestions
    
    FilteredQuestions --> QuestionList
    
    QuestionClick --> ExpansionController
    ExpandAll --> ExpansionController
    ExpansionController --> ExpandedQuestions
    
    ExpandedQuestions --> ExpandedAnswers
    ExpandedAnswers --> RelatedQuestions
```

### 3.4 Interactive Pricing Calculator

```mermaid
graph TD
    subgraph "Input Events"
        UserInputs[User Inputs]
        TierToggle[Tier Toggle]
        BillingToggle[Billing Cycle Toggle]
        CompareToggle[Compare Toggle]
    end
    
    subgraph "Processing"
        InputProcessor[Input Processor]
        PriceCalculator[Price Calculator]
        TierRecommender[Tier Recommender]
        ComparisonEngine[Comparison Engine]
    end
    
    subgraph "State"
        InputValues[Input Values]
        CalculatedPrices[Calculated Prices]
        SelectedTiers[Selected Tiers]
        BillingCycle[Billing Cycle]
    end
    
    subgraph "Output"
        PricingDisplay[Pricing Display]
        PriceBreakdown[Price Breakdown]
        TierRecommendation[Tier Recommendation]
        ComparisonView[Comparison View]
    end
    
    UserInputs --> InputProcessor
    InputProcessor --> InputValues
    
    InputValues --> PriceCalculator
    BillingCycle --> PriceCalculator
    PriceCalculator --> CalculatedPrices
    
    TierToggle --> SelectedTiers
    BillingToggle --> BillingCycle
    
    InputValues --> TierRecommender
    TierRecommender --> TierRecommendation
    
    CalculatedPrices --> PricingDisplay
    CalculatedPrices --> PriceBreakdown
    
    CompareToggle --> ComparisonEngine
    SelectedTiers --> ComparisonEngine
    CalculatedPrices --> ComparisonEngine
    ComparisonEngine --> ComparisonView
```

## 4. Animation System Data Flow

```mermaid
graph TD
    subgraph "Triggers"
        Scroll[Page Scroll]
        ViewportEntry[Element Enters Viewport]
        UserInteraction[User Interaction]
        RouteChange[Route Change]
        AsyncOperation[Async Operation]
    end
    
    subgraph "Controllers"
        ScrollObserver[Scroll Observer]
        InteractionController[Interaction Controller]
        RouterEvents[Router Events]
        LoadingController[Loading Controller]
        MotionPreferences[Motion Preferences]
    end
    
    subgraph "Animation State"
        ElementVisibility[Element Visibility]
        InteractionState[Interaction State]
        TransitionState[Transition State]
        LoadingState[Loading State]
        ReducedMotion[Reduced Motion]
    end
    
    subgraph "Animation Output"
        ScrollAnimations[Scroll Animations]
        MicroInteractions[Micro-Interactions]
        PageTransitions[Page Transitions]
        LoadingAnimations[Loading Animations]
    end
    
    Scroll --> ScrollObserver
    ViewportEntry --> ScrollObserver
    ScrollObserver --> ElementVisibility
    ElementVisibility --> ScrollAnimations
    
    UserInteraction --> InteractionController
    InteractionController --> InteractionState
    InteractionState --> MicroInteractions
    
    RouteChange --> RouterEvents
    RouterEvents --> TransitionState
    TransitionState --> PageTransitions
    
    AsyncOperation --> LoadingController
    LoadingController --> LoadingState
    LoadingState --> LoadingAnimations
    
    MotionPreferences --> ReducedMotion
    ReducedMotion --> ScrollAnimations
    ReducedMotion --> MicroInteractions
    ReducedMotion --> PageTransitions
    ReducedMotion --> LoadingAnimations
```

## 5. Progressive Disclosure Data Flow

```mermaid
graph TD
    subgraph "Input Factors"
        UserPersona[User Persona]
        JourneyStage[Journey Stage]
        UserInteraction[User Interaction]
        ViewportSize[Viewport Size]
    end
    
    subgraph "Processing"
        DisclosureController[Disclosure Controller]
        ContentSelector[Content Selector]
        ComplexityCalculator[Complexity Calculator]
    end
    
    subgraph "State"
        DisclosureLevel[Disclosure Level]
        ExpandedSections[Expanded Sections]
        ContentComplexity[Content Complexity]
    end
    
    subgraph "Output"
        SummaryContent[Summary Content]
        DetailedContent[Detailed Content]
        TechnicalContent[Technical Content]
        ExpandIndicators[Expand Indicators]
    end
    
    UserPersona --> ComplexityCalculator
    JourneyStage --> ComplexityCalculator
    ComplexityCalculator --> ContentComplexity
    
    UserInteraction --> DisclosureController
    ViewportSize --> DisclosureController
    DisclosureController --> DisclosureLevel
    DisclosureController --> ExpandedSections
    
    ContentComplexity --> ContentSelector
    DisclosureLevel --> ContentSelector
    ExpandedSections --> ContentSelector
    
    ContentSelector --> SummaryContent
    ContentSelector --> DetailedContent
    ContentSelector --> TechnicalContent
    ContentSelector --> ExpandIndicators
```

## 6. Contextual CTA Data Flow

```mermaid
graph TD
    subgraph "Context Factors"
        UserPersona[User Persona]
        JourneyStage[Journey Stage]
        PageContent[Page Content]
        UserBehavior[User Behavior]
    end
    
    subgraph "Processing"
        CTASelector[CTA Selector]
        PriorityCalculator[Priority Calculator]
        PositionOptimizer[Position Optimizer]
    end
    
    subgraph "State"
        RelevantCTAs[Relevant CTAs]
        CTAPriorities[CTA Priorities]
        OptimalPositions[Optimal Positions]
    end
    
    subgraph "Output"
        PrimaryCTA[Primary CTA]
        SecondaryCTAs[Secondary CTAs]
        CTAVariants[CTA Variants]
        CTAPositioning[CTA Positioning]
    end
    
    UserPersona --> CTASelector
    JourneyStage --> CTASelector
    PageContent --> CTASelector
    CTASelector --> RelevantCTAs
    
    RelevantCTAs --> PriorityCalculator
    UserBehavior --> PriorityCalculator
    PriorityCalculator --> CTAPriorities
    
    CTAPriorities --> PositionOptimizer
    PageContent --> PositionOptimizer
    PositionOptimizer --> OptimalPositions
    
    RelevantCTAs --> PrimaryCTA
    RelevantCTAs --> SecondaryCTAs
    CTAPriorities --> PrimaryCTA
    CTAPriorities --> SecondaryCTAs
    
    UserPersona --> CTAVariants
    OptimalPositions --> CTAPositioning
```

## 7. Integration with Existing Systems

```mermaid
graph TD
    subgraph "Phase 1 Systems"
        DesignSystem[Design System]
        StateManagement[State Management]
        APILayer[API Layer]
        Analytics[Analytics]
    end
    
    subgraph "Phase 2 Components"
        AnimationSystem[Animation System]
        InteractiveComponents[Interactive Components]
        UserJourneySystem[User Journey System]
        ProgressiveDisclosure[Progressive Disclosure]
    end
    
    subgraph "Data Exchange"
        ComponentProps[Component Props]
        StateUpdates[State Updates]
        EventEmission[Event Emission]
        APIRequests[API Requests]
    end
    
    DesignSystem --> ComponentProps
    ComponentProps --> InteractiveComponents
    ComponentProps --> AnimationSystem
    
    InteractiveComponents --> StateUpdates
    UserJourneySystem --> StateUpdates
    StateUpdates --> StateManagement
    
    InteractiveComponents --> EventEmission
    UserJourneySystem --> EventEmission
    ProgressiveDisclosure --> EventEmission
    EventEmission --> Analytics
    
    InteractiveComponents --> APIRequests
    UserJourneySystem --> APIRequests
    APIRequests --> APILayer
```

## 8. Mobile-Specific Data Flow

```mermaid
graph TD
    subgraph "Mobile Inputs"
        Touch[Touch Events]
        Gesture[Gesture Events]
        Orientation[Orientation Change]
        ConnectionType[Connection Type]
    end
    
    subgraph "Processing"
        TouchHandler[Touch Handler]
        GestureRecognizer[Gesture Recognizer]
        OrientationAdapter[Orientation Adapter]
        ConnectionMonitor[Connection Monitor]
    end
    
    subgraph "State"
        TouchState[Touch State]
        GestureState[Gesture State]
        DeviceOrientation[Device Orientation]
        ConnectionQuality[Connection Quality]
    end
    
    subgraph "Output"
        TouchFeedback[Touch Feedback]
        GestureActions[Gesture Actions]
        LayoutAdaptation[Layout Adaptation]
        AssetOptimization[Asset Optimization]
    end
    
    Touch --> TouchHandler
    TouchHandler --> TouchState
    TouchState --> TouchFeedback
    
    Gesture --> GestureRecognizer
    GestureRecognizer --> GestureState
    GestureState --> GestureActions
    
    Orientation --> OrientationAdapter
    OrientationAdapter --> DeviceOrientation
    DeviceOrientation --> LayoutAdaptation
    
    ConnectionType --> ConnectionMonitor
    ConnectionMonitor --> ConnectionQuality
    ConnectionQuality --> AssetOptimization
```

## 9. Performance Monitoring Data Flow

```mermaid
graph TD
    subgraph "Performance Metrics"
        FCP[First Contentful Paint]
        LCP[Largest Contentful Paint]
        TTI[Time to Interactive]
        CLS[Cumulative Layout Shift]
        FID[First Input Delay]
        AnimationFPS[Animation FPS]
    end
    
    subgraph "Collection"
        WebVitals[Web Vitals]
        PerformanceObserver[Performance Observer]
        CustomMetrics[Custom Metrics]
    end
    
    subgraph "Analysis"
        ThresholdComparison[Threshold Comparison]
        TrendAnalysis[Trend Analysis]
        UserSegmentation[User Segmentation]
    end
    
    subgraph "Actions"
        OptimizationTriggers[Optimization Triggers]
        FeatureToggles[Feature Toggles]
        LoadingStrategies[Loading Strategies]
    end
    
    FCP --> WebVitals
    LCP --> WebVitals
    TTI --> WebVitals
    CLS --> WebVitals
    FID --> WebVitals
    
    AnimationFPS --> PerformanceObserver
    
    WebVitals --> CustomMetrics
    PerformanceObserver --> CustomMetrics
    
    CustomMetrics --> ThresholdComparison
    CustomMetrics --> TrendAnalysis
    CustomMetrics --> UserSegmentation
    
    ThresholdComparison --> OptimizationTriggers
    TrendAnalysis --> FeatureToggles
    UserSegmentation --> LoadingStrategies
```

## 10. Accessibility Data Flow

```mermaid
graph TD
    subgraph "User Preferences"
        ReducedMotion[Reduced Motion]
        HighContrast[High Contrast]
        FontSize[Font Size]
        ScreenReader[Screen Reader]
    end
    
    subgraph "Detection"
        PreferenceDetection[Preference Detection]
        DeviceCapabilities[Device Capabilities]
        AssistiveTech[Assistive Technology]
    end
    
    subgraph "Adaptation"
        AnimationAdapter[Animation Adapter]
        ContrastAdapter[Contrast Adapter]
        TextAdapter[Text Adapter]
        ARIAEnhancer[ARIA Enhancer]
    end
    
    subgraph "Output"
        ModifiedAnimations[Modified Animations]
        EnhancedContrast[Enhanced Contrast]
        ResizedText[Resized Text]
        ARIAAnnotations[ARIA Annotations]
    end
    
    ReducedMotion --> PreferenceDetection
    HighContrast --> PreferenceDetection
    FontSize --> PreferenceDetection
    
    ScreenReader --> AssistiveTech
    
    PreferenceDetection --> AnimationAdapter
    PreferenceDetection --> ContrastAdapter
    PreferenceDetection --> TextAdapter
    
    AssistiveTech --> ARIAEnhancer
    
    AnimationAdapter --> ModifiedAnimations
    ContrastAdapter --> EnhancedContrast
    TextAdapter --> ResizedText
    ARIAEnhancer --> ARIAAnnotations
```

This comprehensive data flow architecture illustrates how data moves through the Phase 2 components, from user interactions to visual output, while integrating with existing systems and accounting for performance, accessibility, and mobile considerations.