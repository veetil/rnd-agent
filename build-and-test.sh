#!/bin/bash

# Build and Test Script for Agentic App Store Landing Page
# This script automates the process of building and testing the landing page

# Text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Agentic App Store Landing Page Build & Test ===${NC}"
echo -e "${BLUE}=================================================${NC}"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}Error: pnpm is not installed.${NC}"
    echo "Please install pnpm first:"
    echo "npm install -g pnpm"
    exit 1
fi

# Install dependencies
echo -e "\n${GREEN}Step 1: Installing dependencies...${NC}"
pnpm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Failed to install dependencies.${NC}"
    exit 1
fi
echo -e "${GREEN}Dependencies installed successfully.${NC}"

# Run linting
echo -e "\n${GREEN}Step 2: Running linting...${NC}"
pnpm lint
if [ $? -ne 0 ]; then
    echo -e "${RED}Warning: Linting found issues. Review the output above.${NC}"
    read -p "Continue anyway? (y/n): " continue_linting
    if [ "$continue_linting" != "y" ]; then
        echo "Build process stopped."
        exit 1
    fi
fi

# Development build
echo -e "\n${GREEN}Step 3: Starting development server...${NC}"
echo "The development server will start at http://localhost:3000"
echo "Press Ctrl+C to stop the server when you're done testing."
echo -e "${BLUE}------------------------------------------------${NC}"
echo -e "Testing checklist:"
echo "✓ Check that all components render correctly"
echo "✓ Test responsive design on different screen sizes"
echo "✓ Verify that animations and transitions work"
echo "✓ Test all links and buttons"
echo "✓ Check performance and loading speed"
echo -e "${BLUE}------------------------------------------------${NC}"
echo -e "Starting server now...\n"

# Start the development server
pnpm dev

# Note: The script will stop here until the user presses Ctrl+C to stop the server

# This part will execute after the user stops the development server
echo -e "\n${GREEN}Development server stopped.${NC}"

# Ask if user wants to build for production
echo -e "\n${BLUE}Would you like to create a production build? (y/n)${NC}"
read -p "> " build_prod
if [ "$build_prod" = "y" ]; then
    echo -e "\n${GREEN}Step 4: Creating production build...${NC}"
    pnpm build
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: Production build failed.${NC}"
        exit 1
    fi
    echo -e "${GREEN}Production build created successfully.${NC}"
    
    echo -e "\n${BLUE}Would you like to start the production server? (y/n)${NC}"
    read -p "> " start_prod
    if [ "$start_prod" = "y" ]; then
        echo -e "\n${GREEN}Step 5: Starting production server...${NC}"
        echo "The production server will start at http://localhost:3000"
        echo "Press Ctrl+C to stop the server when you're done testing."
        pnpm start
        echo -e "\n${GREEN}Production server stopped.${NC}"
    fi
fi

echo -e "\n${GREEN}Build and test process completed.${NC}"
echo -e "${BLUE}==================================================${NC}"