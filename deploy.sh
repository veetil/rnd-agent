#!/bin/bash

# IdeaCode.ai Deployment Script
# This script automates the deployment of the IdeaCode.ai website to Vercel
# and sets up the custom domain (ideacode.ai)

# Exit on error
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}   IdeaCode.ai Deployment Script        ${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
    echo -e "${GREEN}Vercel CLI installed successfully.${NC}"
else
    echo -e "${GREEN}Vercel CLI is already installed.${NC}"
fi

# Check if user is logged in to Vercel
echo -e "${BLUE}Checking Vercel login status...${NC}"
if ! vercel whoami &> /dev/null; then
    echo -e "${YELLOW}You are not logged in to Vercel. Please log in:${NC}"
    vercel login
else
    echo -e "${GREEN}You are already logged in to Vercel.${NC}"
fi

# Check for environment variables
echo -e "${BLUE}Checking for required environment variables...${NC}"
if [ -f .env ]; then
    echo -e "${GREEN}Found .env file.${NC}"
else
    echo -e "${YELLOW}No .env file found. Creating one...${NC}"
    echo "# Supabase Configuration" > .env
    echo "NEXT_PUBLIC_SUPABASE_URL=" >> .env
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=" >> .env
    
    echo -e "${YELLOW}Please enter your Supabase URL:${NC}"
    read supabase_url
    echo -e "${YELLOW}Please enter your Supabase Anon Key:${NC}"
    read supabase_anon_key
    
    # Update .env file
    sed -i '' "s|NEXT_PUBLIC_SUPABASE_URL=|NEXT_PUBLIC_SUPABASE_URL=$supabase_url|" .env
    sed -i '' "s|NEXT_PUBLIC_SUPABASE_ANON_KEY=|NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabase_anon_key|" .env
    
    echo -e "${GREEN}.env file created successfully.${NC}"
fi

# Check if Supabase service role key is available for migrations
if ! grep -q "SUPABASE_SERVICE_ROLE_KEY" .env; then
    echo -e "${YELLOW}SUPABASE_SERVICE_ROLE_KEY not found in .env file.${NC}"
    echo -e "${YELLOW}This is required to run database migrations.${NC}"
    echo -e "${YELLOW}Please enter your Supabase Service Role Key (leave empty to skip migrations):${NC}"
    read service_role_key
    
    if [ -n "$service_role_key" ]; then
        echo "SUPABASE_SERVICE_ROLE_KEY=$service_role_key" >> .env
        echo -e "${GREEN}Service role key added to .env file.${NC}"
        
        # Run migrations
        echo -e "${BLUE}Running database migrations...${NC}"
        source .env
        node scripts/apply-migrations.js
        echo -e "${GREEN}Migrations completed successfully.${NC}"
    else
        echo -e "${YELLOW}Skipping migrations.${NC}"
    fi
fi

# Create vercel.json if it doesn't exist
if [ ! -f vercel.json ]; then
    echo -e "${YELLOW}Creating vercel.json configuration file...${NC}"
    cat > vercel.json << EOL
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sfo1"],
  "rewrites": [
    { "source": "/", "destination": "/rnd-agent-store" }
  ]
}
EOL
    echo -e "${GREEN}vercel.json created successfully.${NC}"
else
    echo -e "${GREEN}vercel.json already exists.${NC}"
fi

# Run tests
echo -e "${BLUE}Running tests to ensure everything works...${NC}"
npm test || {
    echo -e "${RED}Tests failed. Please fix the issues before deploying.${NC}"
    exit 1
}
echo -e "${GREEN}All tests passed successfully.${NC}"

# Build the project locally to check for errors
echo -e "${BLUE}Building the project locally to check for errors...${NC}"
npm run build || {
    echo -e "${RED}Build failed. Please fix the issues before deploying.${NC}"
    exit 1
}
echo -e "${GREEN}Build completed successfully.${NC}"

# Deploy to Vercel
echo -e "${BLUE}Deploying to Vercel...${NC}"
vercel --prod

# Check if deployment was successful
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Deployment completed successfully!${NC}"
    
    # Ask about custom domain
    echo -e "${YELLOW}Do you want to set up the custom domain (ideacode.ai)? (y/n)${NC}"
    read setup_domain
    
    if [ "$setup_domain" = "y" ] || [ "$setup_domain" = "Y" ]; then
        echo -e "${BLUE}Setting up custom domain...${NC}"
        vercel domains add ideacode.ai
        
        echo -e "${GREEN}Custom domain setup initiated.${NC}"
        echo -e "${YELLOW}Please follow the instructions from Vercel to complete the DNS configuration.${NC}"
    else
        echo -e "${YELLOW}Skipping custom domain setup.${NC}"
    fi
else
    echo -e "${RED}Deployment failed. Please check the error messages above.${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}=========================================${NC}"
echo -e "${GREEN}Deployment process completed!${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""
echo -e "Next steps:"
echo -e "1. Visit your Vercel dashboard to check the deployment status"
echo -e "2. If you set up a custom domain, verify the DNS configuration"
echo -e "3. Test the website to ensure everything works as expected"
echo ""
echo -e "For more information, see the DEPLOYMENT.md file."