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
echo "Foundation Components..."
npx jest src/__tests__/unit/animation-components.test.tsx --json --outputFile=test-reports/animation-components.json
npx jest src/__tests__/unit/accessibility-components.test.tsx --json --outputFile=test-reports/accessibility-components.json
npx jest src/__tests__/unit/user-journey-components.test.tsx --json --outputFile=test-reports/user-journey-components.json
npx jest src/__tests__/unit/responsive-components.test.tsx --json --outputFile=test-reports/responsive-components.json

echo "Interactive Components..."
npx jest src/__tests__/unit/feature-highlight.test.tsx --json --outputFile=test-reports/feature-highlight.json
npx jest src/__tests__/unit/product-demo.test.tsx --json --outputFile=test-reports/product-demo.json
npx jest src/__tests__/unit/expandable-faq.test.tsx --json --outputFile=test-reports/expandable-faq.json
npx jest src/__tests__/unit/pricing-calculator.test.tsx --json --outputFile=test-reports/pricing-calculator.json

# Run integration tests
echo -e "${YELLOW}Running Integration Tests...${NC}"
npx jest src/__tests__/integration/animation-components.test.tsx --json --outputFile=test-reports/animation-integration.json
npx jest src/__tests__/integration/accessibility-compliance.test.tsx --json --outputFile=test-reports/accessibility-integration.json
npx jest src/__tests__/integration/user-journey-components.test.tsx --json --outputFile=test-reports/user-journey-integration.json
npx jest src/__tests__/integration/phase2-integration.test.tsx --json --outputFile=test-reports/phase2-integration.json

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
cat << EOF > test-reports/phase2-summary.md
# Phase 2 Testing Summary

## Test Results
- Unit Tests: $(grep -r '"numPassedTests"' test-reports/*.json | wc -l) passed, $(grep -r '"numFailedTests": [^0]' test-reports/*.json | wc -l) failed
- Integration Tests: $(grep -r '"numPassedTestSuites"' test-reports/phase2-integration.json | cut -d':' -f2 | tr -d ',' | xargs) passed, $(grep -r '"numFailedTestSuites"' test-reports/phase2-integration.json | cut -d':' -f2 | tr -d ',' | xargs) failed
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