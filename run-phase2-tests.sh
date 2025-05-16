#!/bin/bash

# Phase 2 Testing Script
# This script runs all tests for Phase 2 components and generates a report

# Set colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Phase 2 Testing & Integration ===${NC}"
echo "Running all tests for Phase 2 components..."
echo ""

# Create reports directory if it doesn't exist
mkdir -p test-reports

# Run unit tests
echo -e "${YELLOW}Running Unit Tests...${NC}"
echo "Animation Components..."
npx jest src/__tests__/components/animations/AnimationContext.test.tsx --json --outputFile=test-reports/animation-context.json
npx jest src/__tests__/components/animations/LoadingAnimation.test.tsx --json --outputFile=test-reports/loading-animation.json
npx jest src/__tests__/components/animations/MicroInteraction.test.tsx --json --outputFile=test-reports/micro-interaction.json
npx jest src/__tests__/components/animations/PageTransition.test.tsx --json --outputFile=test-reports/page-transition.json
npx jest src/__tests__/components/animations/ScrollAnimation.test.tsx --json --outputFile=test-reports/scroll-animation.json

echo "Accessibility Components..."
npx jest src/__tests__/components/accessibility/AccessibilityContext.test.tsx --json --outputFile=test-reports/accessibility-context.json

echo "User Journey Components..."
npx jest src/__tests__/components/user-journey/ContextualCTA.test.tsx --json --outputFile=test-reports/contextual-cta.json
npx jest src/__tests__/components/user-journey/GuidedTour.test.tsx --json --outputFile=test-reports/guided-tour.json
npx jest src/__tests__/components/user-journey/MobileNavigation.test.tsx --json --outputFile=test-reports/mobile-navigation.json
npx jest src/__tests__/components/user-journey/PersonaContext.test.tsx --json --outputFile=test-reports/persona-context.json
npx jest src/__tests__/components/user-journey/ProgressiveDisclosure.test.tsx --json --outputFile=test-reports/progressive-disclosure.json

echo "Responsive Components..."
npx jest src/__tests__/components/responsive/ResponsiveContext.test.tsx --json --outputFile=test-reports/responsive-context.json

echo "Interactive Components..."
npx jest src/__tests__/components/interactive/ExpandableFAQ.test.tsx --json --outputFile=test-reports/expandable-faq.json
npx jest src/__tests__/components/interactive/FeatureHighlight.test.tsx --json --outputFile=test-reports/feature-highlight.json
npx jest src/__tests__/components/interactive/PricingCalculator.test.tsx --json --outputFile=test-reports/pricing-calculator.json
npx jest src/__tests__/components/interactive/ProductDemo.test.tsx --json --outputFile=test-reports/product-demo.json

# Run integration tests
echo -e "${YELLOW}Running Integration Tests...${NC}"
npx jest src/__tests__/integration/animation-components.test.tsx --json --outputFile=test-reports/animation-integration.json
npx jest src/__tests__/integration/accessibility-compliance.test.tsx --json --outputFile=test-reports/accessibility-integration.json
npx jest src/__tests__/integration/user-journey-components.test.tsx --json --outputFile=test-reports/user-journey-integration.json
npx jest src/__tests__/integration/interactive-components.test.tsx --json --outputFile=test-reports/interactive-integration.json
npx jest src/__tests__/integration/foundation-components.test.tsx --json --outputFile=test-reports/foundation-integration.json
npx jest src/__tests__/integration/phase2-integration.test.tsx --json --outputFile=test-reports/phase2-integration.json

# Run coverage report
echo -e "${YELLOW}Generating Coverage Report...${NC}"
npx jest --coverage

# Generate HTML report
echo -e "${YELLOW}Generating Test Report...${NC}"
npx jest-html-reporter --json=test-reports/ --output=test-reports/phase2-test-report.html

# Run accessibility audit
echo -e "${YELLOW}Running Accessibility Audit...${NC}"
npx axe --stdout > test-reports/accessibility-audit.txt

# Run performance tests
echo -e "${YELLOW}Running Performance Tests...${NC}"
npx lighthouse http://localhost:3000 --output=json --output-path=test-reports/performance-report.json --chrome-flags="--headless"

# Generate final report
echo -e "${YELLOW}Generating Final Report...${NC}"
COVERAGE_PCT=$(grep -r '"lines":{"total"' coverage/coverage-summary.json | head -1 | awk -F'pct":' '{print $2}' | awk -F'}' '{print $1}')
cat << EOF > test-reports/phase2-summary.md
# Phase 2 Testing Summary

## Test Results
- Unit Tests: $(grep -r '"numPassedTests"' test-reports/*.json | awk -F: '{sum += $2} END {print sum}') passed, $(grep -r '"numFailedTests"' test-reports/*.json | awk -F: '{sum += $2} END {print sum}') failed
- Integration Tests: $(grep -r '"numPassedTests"' test-reports/*-integration.json | awk -F: '{sum += $2} END {print sum}') passed, $(grep -r '"numFailedTests"' test-reports/*-integration.json | awk -F: '{sum += $2} END {print sum}') failed
- Test Coverage: ${COVERAGE_PCT}%
- Accessibility Compliance: See accessibility-audit.txt for details
- Performance: See performance-report.json for details

## Next Steps
1. Fix any failing tests
2. Address accessibility issues
3. Optimize performance bottlenecks
4. Proceed with page integration

## Integration Status
- Homepage: Not started
- Solutions Page: Not started
- Documentation Page: Not started
- Platform Page: Not started

EOF

echo -e "${GREEN}Testing complete! Reports available in the test-reports directory.${NC}"
echo "Summary report: test-reports/phase2-summary.md"
echo "Detailed HTML report: test-reports/phase2-test-report.html"