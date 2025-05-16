# IdeaCode.ai Deployment Guide

This document provides instructions for deploying the IdeaCode.ai website to Vercel and configuring the custom domain.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Deployment Options](#deployment-options)
- [Environment Variables](#environment-variables)
- [Custom Domain Setup](#custom-domain-setup)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Access to the GitHub repository
3. Supabase project credentials
4. Access to domain DNS settings for ideacode.ai

## Deployment Options

### Option 1: Using the Deployment Script (Recommended)

We've created a deployment script to automate the process:

```bash
# Make the script executable (if not already)
chmod +x deploy.sh

# Run the deployment script
./deploy.sh
```

The script will:
- Check for Vercel CLI and install if needed
- Run tests to ensure everything works
- Build the project locally to check for errors
- Deploy to Vercel production environment

### Option 2: Manual Deployment via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
4. Configure environment variables (see below)
5. Click "Deploy"

### Option 3: Manual Deployment via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy from your project directory:
   ```bash
   vercel --prod
   ```

## Environment Variables

The following environment variables must be set in Vercel:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

You can set these in the Vercel dashboard under Project Settings > Environment Variables.

## Custom Domain Setup

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Domains"
3. Add your domain: `ideacode.ai`
4. Follow Vercel's instructions for DNS configuration:
   
   ### If using Vercel DNS:
   - Transfer or delegate your domain to Vercel
   
   ### If using external DNS:
   - Add the provided A record pointing to Vercel's servers
   - Add the provided CNAME record for www subdomain
   - Optionally, add the TXT record for domain verification

5. Wait for DNS propagation (can take up to 48 hours, but usually much faster)

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are properly installed
   - Verify Next.js configuration is correct

2. **Environment Variables**
   - Confirm all required variables are set in Vercel
   - Check for typos in variable names
   - Ensure values are correctly formatted

3. **Domain Issues**
   - Verify DNS configuration is correct
   - Check for DNS propagation (may take time)
   - Ensure SSL certificate is provisioned

4. **Supabase Connection Issues**
   - Verify Supabase credentials are correct
   - Check Supabase service status
   - Ensure database tables are properly set up

### Getting Help

If you encounter issues not covered here, refer to:

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)

For more detailed deployment instructions, see the [vercel-deployment-guide.md](./vercel-deployment-guide.md) file.