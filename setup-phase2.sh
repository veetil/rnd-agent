#!/bin/bash

# Setup script for Phase 2 Enhanced User Experience components

echo "Setting up Phase 2 Enhanced User Experience components..."

# Install dependencies
echo "Installing dependencies..."
npm install framer-motion@latest

# Create necessary directories if they don't exist
echo "Creating directory structure..."
mkdir -p src/components/animations
mkdir -p src/components/accessibility
mkdir -p src/components/user-journey
mkdir -p src/components/responsive
mkdir -p src/hooks
mkdir -p src/utils

echo "Setup complete! The following components are now available:"
echo "- Animation Framework"
echo "- Accessibility Infrastructure"
echo "- Persona Detection System"
echo "- Responsive Foundation"
echo ""
echo "To use these components, import them from 'src/components'"
echo "For example: import { AnimationProvider, MicroInteraction } from 'src/components'"